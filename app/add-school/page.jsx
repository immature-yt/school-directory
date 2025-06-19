'use client'

import { useState } from 'react'

export default function AddSchoolPage() {
  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: '',
    imageUrl: ''
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
      setForm({ name: '', address: '', phone: '', imageUrl: '' })
      setSuccess(true)
    } else {
      alert('Something went wrong')
    }
  }

  return (
    <main className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Add a School</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="School Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        {success && <p className="text-green-600">School added successfully!</p>}
      </form>
    </main>
  )
}
