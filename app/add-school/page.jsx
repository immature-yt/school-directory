'use client'

import Navbar from '@/components/Navbar'
import { useState } from 'react'
import Link from 'next/link'

export default function AddSchoolPage() {
  const [form, setForm] = useState({ name: '', address: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/add-school', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    setLoading(false)

    if (res.ok) {
      setForm({ name: '', address: '', phone: '' })
      setSuccess(true)
    } else {
      alert('Something went wrong')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#141e30] via-[#243b55] to-[#141e30] text-white font-sans">
      <Navbar />
      <div className="max-w-xl mx-auto mt-16 bg-white/5 backdrop-blur-xl border border-indigo-600 rounded-3xl shadow-2xl p-10 animate-fadeIn">
        <h1 className="text-4xl font-extrabold text-indigo-400 mb-8 text-center drop-shadow">
          ✏️ Add a New School
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="name"
            placeholder="School Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-600 bg-[#1e1e2f] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-600 bg-[#1e1e2f] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-600 bg-[#1e1e2f] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition duration-200"
            disabled={loading}
          >
            {loading ? 'Submitting...' : '🚀 Submit School'}
          </button>

          {success && (
            <p className="text-green-400 text-center mt-4">
              ✅ School added successfully!
            </p>
          )}
        </form>

        <div className="text-right mt-8">
          <Link href="/schools">
            <button className="bg-gray-800 text-white px-5 py-2 rounded-xl hover:bg-gray-700 transition">
              📚 View All Schools
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
