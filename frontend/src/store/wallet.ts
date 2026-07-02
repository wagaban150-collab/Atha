import { create } from 'zustand'

interface Balance {
  [key: string]: {
    available: number
    locked: number
  }
}

interface WalletState {
  balance: Balance
  loading: boolean
  fetchBalance: () => Promise<void>
}

export const useWalletStore = create<WalletState>((set) => ({
  balance: {},
  loading: false,
  fetchBalance: async () => {
    set({ loading: true })
    try {
      const token = localStorage.getItem('auth-store')
      const response = await fetch('/api/v1/wallet/balance', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      set({ balance: data.balances })
    } catch (error) {
      console.error('Failed to fetch balance:', error)
    } finally {
      set({ loading: false })
    }
  }
}))
