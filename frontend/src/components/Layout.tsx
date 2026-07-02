import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { FiHome, FiTrendingUp, FiDollarSign, FiWallet, FiUser, FiLogOut } from 'react-icons/fi'
import { useAuthStore } from '../store/auth'

const Layout: React.FC = () => {
  const navigate = useNavigate()
  const { logout, user } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { icon: FiHome, label: 'Dashboard', path: '/' },
    { icon: FiTrendingUp, label: 'Market', path: '/market' },
    { icon: FiDollarSign, label: 'Trading', path: '/trading' },
    { icon: FiWallet, label: 'Wallet', path: '/wallet' },
    { icon: FiUser, label: 'Profile', path: '/profile' }
  ]

  return (
    <div className="flex h-screen bg-primary">
      {/* Sidebar */}
      <aside className="w-64 bg-secondary border-r border-gray-700">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-accent">Atha</h1>
          <p className="text-sm text-gray-400">Trading Platform</p>
        </div>

        <nav className="mt-8">
          {navItems.map(({ icon: Icon, label, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="w-full flex items-center gap-3 px-6 py-3 text-left hover:bg-primary transition-colors"
            >
              <Icon size={20} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-64 border-t border-gray-700 p-6">
          <div className="mb-4">
            <p className="text-sm text-gray-400">Logged in as</p>
            <p className="font-semibold">{user?.email || 'User'}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-danger hover:bg-red-600 px-4 py-2 rounded-lg transition-colors"
          >
            <FiLogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout
