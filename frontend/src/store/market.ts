import { create } from 'zustand'

interface Market {
  symbol: string
  price: number
  change24h: number
  changePercent24h: number
  high24h: number
  low24h: number
  volume24h: number
}

interface MarketState {
  tickers: Market[]
  selectedTicker: Market | null
  loading: boolean
  fetchTickers: () => Promise<void>
  setSelectedTicker: (ticker: Market) => void
}

export const useMarketStore = create<MarketState>((set) => ({
  tickers: [],
  selectedTicker: null,
  loading: false,
  fetchTickers: async () => {
    set({ loading: true })
    try {
      const response = await fetch('/api/v1/market/tickers')
      const data = await response.json()
      set({ tickers: data.data })
    } catch (error) {
      console.error('Failed to fetch tickers:', error)
    } finally {
      set({ loading: false })
    }
  },
  setSelectedTicker: (ticker: Market) => {
    set({ selectedTicker: ticker })
  }
}))
