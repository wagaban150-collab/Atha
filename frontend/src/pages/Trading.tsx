import React, { useState } from 'react'

const Trading: React.FC = () => {
  const [orderType, setOrderType] = useState('market')
  const [side, setSide] = useState('buy')
  const [symbol, setSymbol] = useState('BTC/USD')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ orderType, side, symbol, quantity, price })
    // TODO: Submit order to API
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Trading</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-secondary rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">Trading Chart</h2>
            <div className="h-96 bg-primary rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Chart component to be integrated</p>
            </div>
          </div>
        </div>

        <div className="bg-secondary rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">Place Order</h2>

          <form onSubmit={handleSubmitOrder} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Symbol</label>
              <select
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className="w-full bg-primary border border-gray-600 rounded-lg px-3 py-2 text-white"
              >
                <option>BTC/USD</option>
                <option>ETH/USD</option>
                <option>BNB/USD</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Side</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSide('buy')}
                  className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                    side === 'buy'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Buy
                </button>
                <button
                  type="button"
                  onClick={() => setSide('sell')}
                  className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                    side === 'sell'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Sell
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Order Type</label>
              <div className="flex gap-2">
                {['market', 'limit', 'stop'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setOrderType(type)}
                    className={`flex-1 py-2 px-2 rounded-lg text-sm font-semibold transition-colors ${
                      orderType === type
                        ? 'bg-accent text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-primary border border-gray-600 rounded-lg px-3 py-2 text-white"
                placeholder="0.00"
                step="0.001"
              />
            </div>

            {orderType !== 'market' && (
              <div>
                <label className="block text-sm font-medium mb-2">Price</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-primary border border-gray-600 rounded-lg px-3 py-2 text-white"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
            )}

            <button
              type="submit"
              className={`w-full py-2 rounded-lg font-bold transition-colors ${
                side === 'buy'
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {side === 'buy' ? 'Buy' : 'Sell'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Trading
