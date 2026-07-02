import React, { useState } from 'react'

const Profile: React.FC = () => {
  const [email, setEmail] = useState('user@example.com')
  const [fullName, setFullName] = useState('John Doe')
  const [phone, setPhone] = useState('+1234567890')
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ email, fullName, phone })
    // TODO: Update profile API
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-secondary rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">Account Settings</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
              </div>

              <button
                type="submit"
                className="bg-accent hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>

        <div className="bg-secondary rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">Security</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold">Two-Factor Authentication</p>
                <button
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  className={`px-3 py-1 rounded-lg font-semibold ${
                    twoFactorEnabled
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>
              <p className="text-sm text-gray-400">Add an extra layer of security</p>
            </div>

            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded-lg transition-colors">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
