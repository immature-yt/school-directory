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
    <main className="min-h-screen bg-[#1e1e2f] text-[#e5e5e5]">
      <Navbar />
      <div className="max-w-xl mx-auto bg-[#2a2a3c] shadow-lg rounded-lg p-8 mt-12">
        <h1 className="text-3xl font-bold text-indigo-400 mb-6">Add a School</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="School Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-600 bg-[#1e1e2f] p-3 rounded text-white"
            required
          />
          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border border-gray-600 bg-[#1e1e2f] p-3 rounded text-white"
            required
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-gray-600 bg-[#1e1e2f] p-3 rounded text-white"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          {success && <p className="text-green-400">School added successfully!</p>}
        </form>

        <div className="mt-6 text-right">
          <Link href="/schools">
            <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">
              📚 View All Schools
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
