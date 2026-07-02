import React, { useEffect } from 'react'
import { useMarketStore } from '../store/market'

const Market: React.FC = () => {
  const { tickers, loading, fetchTickers } = useMarketStore()

  useEffect(() => {
    fetchTickers()
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Market</h1>

      <div className="bg-secondary rounded-lg p-6">
        {loading ? (
          <p className="text-gray-400">Loading market data...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="pb-4 px-4">Symbol</th>
                  <th className="pb-4 px-4">Price</th>
                  <th className="pb-4 px-4">24h Change</th>
                  <th className="pb-4 px-4">High 24h</th>
                  <th className="pb-4 px-4">Low 24h</th>
                  <th className="pb-4 px-4">Volume 24h</th>
                </tr>
              </thead>
              <tbody>
                {tickers.map((ticker) => (
                  <tr key={ticker.symbol} className="border-b border-gray-800 hover:bg-primary transition-colors cursor-pointer">
                    <td className="py-4 px-4 font-semibold">{ticker.symbol}</td>
                    <td className="py-4 px-4">${ticker.price.toFixed(2)}</td>
                    <td className={`py-4 px-4 ${
                      ticker.changePercent24h >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {ticker.changePercent24h >= 0 ? '+' : ''}{ticker.changePercent24h.toFixed(2)}%
                    </td>
                    <td className="py-4 px-4">${ticker.high24h.toFixed(2)}</td>
                    <td className="py-4 px-4">${ticker.low24h.toFixed(2)}</td>
                    <td className="py-4 px-4">${ticker.volume24h.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Market
