import React, { useEffect } from 'react'
import { useWalletStore } from '../store/wallet'

const Wallet: React.FC = () => {
  const { balance, loading, fetchBalance } = useWalletStore()

  useEffect(() => {
    fetchBalance()
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Wallet</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-secondary rounded-lg p-6">
          <p className="text-gray-400 text-sm mb-2">Total Balance (USD)</p>
          <p className="text-3xl font-bold">$0.00</p>
        </div>
        <div className="bg-secondary rounded-lg p-6">
          <p className="text-gray-400 text-sm mb-2">Available</p>
          <p className="text-3xl font-bold">$0.00</p>
        </div>
        <div className="bg-secondary rounded-lg p-6">
          <p className="text-gray-400 text-sm mb-2">Locked</p>
          <p className="text-3xl font-bold">$0.00</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-secondary rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">Your Assets</h2>
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : Object.keys(balance).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(balance).map(([currency, amounts]) => (
                <div key={currency} className="flex justify-between items-center border-b border-gray-700 pb-4">
                  <div>
                    <p className="font-semibold">{currency}</p>
                    <p className="text-sm text-gray-400">Available: {amounts.available}</p>
                  </div>
                  <p className="text-right">
                    {amounts.available + amounts.locked}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No assets</p>
          )}
        </div>

        <div className="bg-secondary rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">Actions</h2>
          <div className="space-y-3">
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-colors">
              Deposit
            </button>
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-colors">
              Withdraw
            </button>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded-lg transition-colors">
              Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wallet
