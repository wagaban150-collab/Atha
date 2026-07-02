import fs from 'fs';
import path from 'path';
import { query } from '../config/database';
import logger from '../utils/logger';

interface Migration {
  name: string;
  version: number;
  executed: boolean;
}

export class MigrationRunner {
  private migrationsDir: string;

  constructor() {
    this.migrationsDir = path.join(__dirname, '.');
  }

  async createMigrationsTable(): Promise<void> {
    try {
      await query(`
        CREATE TABLE IF NOT EXISTS migrations (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL UNIQUE,
          version INTEGER NOT NULL,
          executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      logger.info('Migrations table created or already exists');
    } catch (error) {
      logger.error('Error creating migrations table:', error);
      throw error;
    }
  }

  async getExecutedMigrations(): Promise<Migration[]> {
    try {
      const result = await query('SELECT * FROM migrations ORDER BY version ASC');
      return result.rows;
    } catch (error) {
      logger.error('Error getting executed migrations:', error);
      throw error;
    }
  }

  async markMigrationAsExecuted(name: string, version: number): Promise<void> {
    try {
      await query(
        'INSERT INTO migrations (name, version) VALUES ($1, $2)',
        [name, version]
      );
      logger.info(`Migration marked as executed: ${name}`);
    } catch (error) {
      logger.error('Error marking migration as executed:', error);
      throw error;
    }
  }

  async runMigrations(): Promise<void> {
    try {
      await this.createMigrationsTable();

      const files = fs.readdirSync(this.migrationsDir)
        .filter(f => f.endsWith('.sql'))
        .sort();

      const executed = await this.getExecutedMigrations();
      const executedNames = new Set(executed.map(m => m.name));

      for (const file of files) {
        if (executedNames.has(file)) {
          logger.info(`Skipping already executed migration: ${file}`);
          continue;
        }

        const filePath = path.join(this.migrationsDir, file);
        const sql = fs.readFileSync(filePath, 'utf-8');
        const version = parseInt(file.split('_')[0], 10);

        try {
          logger.info(`Executing migration: ${file}`);
          await query(sql);
          await this.markMigrationAsExecuted(file, version);
          logger.info(`Successfully executed migration: ${file}`);
        } catch (error) {
          logger.error(`Error executing migration ${file}:`, error);
          throw error;
        }
      }

      logger.info('All migrations completed successfully');
    } catch (error) {
      logger.error('Error running migrations:', error);
      throw error;
    }
  }
}

if (require.main === module) {
  const runner = new MigrationRunner();
  runner.runMigrations().catch(error => {
    logger.error('Fatal error:', error);
    process.exit(1);
  });
}

export default MigrationRunner;
