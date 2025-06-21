'use client'

import Navbar from '@/components/Navbar'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

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
    } else {
      alert('Something went wrong')
    }
  }

  return (
    <>
      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="min-h-screen px-6 pt-24 pb-10 bg-[#0e1117] text-white font-poppins"
      >
        <h1 className="text-4xl font-extrabold text-center text-pink-400 drop-shadow-[0_0_15px_rgba(244,114,182,0.8)] mb-10">
          🏫 Add a School
        </h1>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-xl border border-pink-400 rounded-2xl p-8 max-w-xl mx-auto shadow-2xl space-y-5 transition hover:shadow-pink-400/50"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <input
            name="name"
            placeholder="School Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-pink-400 bg-transparent text-white p-3 rounded outline-none focus:ring-2 focus:ring-pink-400 placeholder-pink-300"
            required
          />
          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border border-pink-400 bg-transparent text-white p-3 rounded outline-none focus:ring-2 focus:ring-pink-400 placeholder-pink-300"
            required
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-pink-400 bg-transparent text-white p-3 rounded outline-none focus:ring-2 focus:ring-pink-400 placeholder-pink-300"
            required
          />

          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-500 text-white px-6 py-3 rounded font-semibold w-full transition duration-200"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>

          {success && (
            <p className="text-green-400 text-center font-medium mt-4">
              🎉 School added successfully!
            </p>
          )}

          <div className="pt-4 text-center">
            <Link href="/schools">
              <button className="text-pink-300 hover:text-white transition">
                📚 View All Schools →
              </button>
            </Link>
          </div>
        </motion.form>
      </motion.main>
    </>
  )
}
