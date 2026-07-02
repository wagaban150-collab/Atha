import React, { useEffect } from 'react'
import { useMarketStore } from '../store/market'

const Dashboard: React.FC = () => {
  const { tickers, loading, fetchTickers } = useMarketStore()

  useEffect(() => {
    fetchTickers()
    const interval = setInterval(fetchTickers, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-secondary rounded-lg p-6">
          <p className="text-gray-400 text-sm mb-2">Total Balance</p>
          <p className="text-3xl font-bold">$0.00</p>
          <p className="text-green-500 text-sm mt-2">+0.00%</p>
        </div>
        <div className="bg-secondary rounded-lg p-6">
          <p className="text-gray-400 text-sm mb-2">Portfolio Value</p>
          <p className="text-3xl font-bold">$0.00</p>
          <p className="text-green-500 text-sm mt-2">+0.00%</p>
        </div>
        <div className="bg-secondary rounded-lg p-6">
          <p className="text-gray-400 text-sm mb-2">24h Profit</p>
          <p className="text-3xl font-bold">$0.00</p>
          <p className="text-green-500 text-sm mt-2">+0.00%</p>
        </div>
      </div>

      <div className="bg-secondary rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6">Top Cryptocurrencies</h2>
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="pb-4 px-4">Symbol</th>
                  <th className="pb-4 px-4">Price</th>
                  <th className="pb-4 px-4">24h Change</th>
                  <th className="pb-4 px-4">24h Volume</th>
                </tr>
              </thead>
              <tbody>
                {tickers.slice(0, 10).map((ticker) => (
                  <tr key={ticker.symbol} className="border-b border-gray-800 hover:bg-primary transition-colors">
                    <td className="py-4 px-4 font-semibold">{ticker.symbol}</td>
                    <td className="py-4 px-4">${ticker.price.toFixed(2)}</td>
                    <td className={`py-4 px-4 ${
                      ticker.changePercent24h >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {ticker.changePercent24h >= 0 ? '+' : ''}{ticker.changePercent24h.toFixed(2)}%
                    </td>
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

export default Dashboard
