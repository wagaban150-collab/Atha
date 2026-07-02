# Deployment Guide

## Prepare for Deployment

### 1. Build Backend
```bash
cd backend
npm install
npm run build
```

### 2. Build Frontend
```bash
cd frontend
npm install
npm run build
```

## Docker Deployment

### Build Images
```bash
# Build backend image
docker build -t atha-backend:latest ./backend

# Build frontend image (optional, if using Docker for frontend)
docker build -t atha-frontend:latest ./frontend
```

### Push to Registry
```bash
# Example with Docker Hub
docker tag atha-backend:latest yourusername/atha-backend:latest
docker push yourusername/atha-backend:latest
```

## Deploy to Cloud Platforms

### Heroku
```bash
# Create app
heroku create atha-app

# Add buildpacks
heroku buildpacks:add heroku/nodejs

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_secret
# ... set other variables

# Deploy
git push heroku main
```

### AWS EC2
```bash
# SSH into instance
ssh -i your-key.pem ec2-user@your-instance

# Install dependencies
sudo yum update
sudo yum install nodejs npm postgresql

# Clone repository
git clone your-repo
cd Atha

# Install and build
cd backend && npm install && npm run build
cd ../frontend && npm install && npm run build

# Setup environment
cp backend/.env.example backend/.env
# Edit .env with production values

# Start services (use PM2 or systemd)
npm install -g pm2
pm2 start dist/index.js --name atha-api
pm2 startup
pm2 save
```

### DigitalOcean App Platform
```bash
# Push to repository
git push

# Create app.yaml
name: atha
services:
- name: api
  github:
    repo: your-username/Atha
    branch: main
  build_command: cd backend && npm run build
  run_command: cd backend && npm start
  env:
  - key: NODE_ENV
    value: production
  - key: JWT_SECRET
    scope: RUN_AND_BUILD_TIME
    value: ${JWT_SECRET}

- name: web
  github:
    repo: your-username/Atha
    branch: main
  build_command: cd frontend && npm run build
  source_dir: frontend/dist
  http_port: 8080
```

### Vercel (Frontend only)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Configure environment variables
vercel env add API_URL
```

## Database Migrations

### Backup Database
```bash
pg_dump -U atha_user -h localhost atha_db > backup.sql
```

### Run Migrations
```bash
cd backend
npm run migrate
```

### Restore from Backup
```bash
psql -U atha_user -h localhost -d atha_db < backup.sql
```

## SSL/TLS Certificate

### Let's Encrypt with Certbot
```bash
# Install certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --standalone -d yourdomain.com

# Auto-renew
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

## Monitoring

### PM2 Monitoring
```bash
# Install PM2 Plus
pm2 install pm2-monitoring
pm2 link your-api-key your-public-key
```

### Logging
```bash
# View logs
pm2 logs

# Save logs
pm2 save
```

## Health Checks

```bash
# Test API health
curl http://your-domain.com/health

# Should return:
# {"status":"healthy","timestamp":"2024-01-01T00:00:00Z"}
```

## Scaling

### Horizontal Scaling
- Deploy multiple instances behind load balancer
- Use managed database services
- Distribute Redis cache across instances

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Implement caching strategies

## Troubleshooting

### Check Logs
```bash
pm2 logs
docker logs container-name
```

### Database Issues
```bash
# Check connection
psql -U atha_user -h host -d atha_db -c "SELECT NOW();"
```

### Memory Issues
```bash
# Check memory usage
free -h

# Increase heap size if needed
node --max-old-space-size=4096 dist/index.js
```

## Rollback
```bash
# Revert to previous version
git revert commit-hash
git push

# Redeploy
heroku releases
heroku releases:rollback
```
