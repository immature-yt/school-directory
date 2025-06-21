'use client'

import { useState } from 'react'
import Link from 'next/link'
import ImageUploader from '@/components/ImageUploader'

export default function AddSchoolPage() {
  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: '',
    image: ''
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
      body: JSON.stringify({
        name: form.name,
        address: form.address,
        phone: form.phone,
        image: form.image || null
      })
    })

    setLoading(false)

    if (res.ok) {
      setForm({ name: '', address: '', phone: '', image: '' })
      setSuccess(true)
    } else {
      alert('Something went wrong')
    }
  }

  return (
    <main className="relative min-h-screen p-6 text-white">
      {/* Floating neon lights */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-fuchsia-500 opacity-20 rounded-full mix-blend-screen blur-3xl top-10 left-10 animate-pulse" />
        <div className="absolute w-80 h-80 bg-cyan-500 opacity-20 rounded-full mix-blend-screen blur-3xl bottom-20 right-10 animate-pulse" />
      </div>

      <section className="relative z-10 max-w-xl mx-auto">
        <h1 className="text-4xl font-bold neon-title mb-8 text-center">Add a School</h1>

        <form onSubmit={handleSubmit} className="space-y-5 glass-card p-6 rounded-xl shadow-lg animate-fade-in-fast">
          <input
            name="name"
            placeholder="School Name"
            value={form.name}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="input-field"
            required
          />

          <ImageUploader
            onUploadComplete={(url) => {
              setForm((prev) => ({ ...prev, image: url }))
            }}
          />

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>

          {success && <p className="text-green-400 text-center">✅ School added successfully!</p>}
        </form>

        <div className="mt-6 text-center">
          <Link href="/schools">
            <button className="text-white border border-cyan-400 px-4 py-2 rounded hover:bg-cyan-900 transition-all">
              📚 View All Schools
            </button>
          </Link>
        </div>
      </section>
    </main>
  )
}
