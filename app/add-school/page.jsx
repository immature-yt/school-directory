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
    <main className="min-h-screen bg-[#fef6fb] p-6">
      <Navbar />
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-[#333] mb-4">Add a School</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="School Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md bg-[#fff] text-[#333]"
            required
          />
          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md bg-[#fff] text-[#333]"
            required
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md bg-[#fff] text-[#333]"
            required
          />
          <button
            type="submit"
            className="bg-[#c084fc] hover:bg-[#a855f7] text-white font-semibold px-4 py-2 rounded-md"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          {success && <p className="text-green-600">School added successfully!</p>}
        </form>

        <div className="mt-6 text-right">
          <Link href="/schools">
            <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
              📚 View All Schools
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}