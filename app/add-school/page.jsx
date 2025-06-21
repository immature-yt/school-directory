'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function AddSchoolPage() {
  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: ''
  })

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
      setTimeout(() => setSuccess(false), 4000)
    } else {
      alert('Something went wrong')
    }
  }

  return (
    <main className="min-h-screen px-6 py-10 bg-[#0e1117] text-white font-poppins">
      <Navbar />
      <div className="max-w-xl mx-auto backdrop-blur-lg bg-white/5 border border-indigo-500 rounded-3xl p-10 shadow-2xl animate-fadeIn">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-400 text-center mb-8">
          ✏️ Add a New School
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="name"
            placeholder="🏫 School Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-indigo-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-white placeholder:text-indigo-300"
            required
          />
          <input
            name="address"
            placeholder="📍 Address"
            value={form.address}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-indigo-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-white placeholder:text-indigo-300"
            required
          />
          <input
            name="phone"
            placeholder="📞 Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-indigo-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-white placeholder:text-indigo-300"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 transition-all text-white font-semibold rounded-xl"
            disabled={loading}
          >
            {loading ? 'Submitting...' : '🚀 Submit School'}
          </button>
          {success && (
            <p className="text-green-400 text-center mt-4 animate-pulse">
              ✅ School added successfully!
            </p>
          )}
        </form>

        <div className="mt-8 text-center">
          <Link href="/schools">
            <button className="text-indigo-300 hover:text-indigo-400 underline text-sm">
              📚 View All Schools
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
