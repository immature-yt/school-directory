'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function ReviewPage() {
  const router = useRouter()
  const params = useParams()
  const schoolId = params.id

  const [form, setForm] = useState({
    infrastructure: 3,
    academics: 3,
    valueForMoney: 3,
    extracurricular: 3,
    feedback: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/add-review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        schoolId,
        ...form,
      }),
    })

    setLoading(false)

    if (res.ok) {
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' }) // 👈 scroll to top
      setTimeout(() => {
        router.push('/schools')
        window.location.reload() // 👈 force refresh after redirect
      }, 2000)
    } else {
      alert('Something went wrong')
    }
  }

  return (
    <main className="min-h-screen p-6 max-w-2xl mx-auto text-white relative">
      {/* Floating background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute w-80 h-80 bg-cyan-500 opacity-20 rounded-full mix-blend-screen blur-3xl top-10 left-10 animate-pulse" />
        <div className="absolute w-96 h-96 bg-fuchsia-500 opacity-20 rounded-full mix-blend-screen blur-3xl bottom-10 right-10 animate-pulse" />
      </div>

      <h1 className="text-3xl font-bold neon-title mb-6 text-center">✍️ Submit Review</h1>

      <form onSubmit={handleSubmit} className="glass-card space-y-4 p-6 rounded-xl shadow-lg backdrop-blur-md">
        <label className="block">
          🏗 Infrastructure (1-5)
          <input
            type="number"
            name="infrastructure"
            value={form.infrastructure}
            min={1}
            max={5}
            onChange={handleChange}
            className="input-field mt-1"
            required
          />
        </label>

        <label className="block">
          📚 Academics (1-5)
          <input
            type="number"
            name="academics"
            value={form.academics}
            min={1}
            max={5}
            onChange={handleChange}
            className="input-field mt-1"
            required
          />
        </label>

        <label className="block">
          💸 Value for Money (1-5)
          <input
            type="number"
            name="valueForMoney"
            value={form.valueForMoney}
            min={1}
            max={5}
            onChange={handleChange}
            className="input-field mt-1"
            required
          />
        </label>

        <label className="block">
          🎭 Extracurricular (1-5)
          <input
            type="number"
            name="extracurricular"
            value={form.extracurricular}
            min={1}
            max={5}
            onChange={handleChange}
            className="input-field mt-1"
            required
          />
        </label>

        <label className="block">
          ✏️ Optional Feedback
          <textarea
            name="feedback"
            value={form.feedback}
            onChange={handleChange}
            className="input-field mt-1 h-24"
          />
        </label>

        <button
          type="submit"
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>

        {submitted && (
          <p className="text-green-400 text-center mt-4">
            ✅ Review submitted! Redirecting...
          </p>
        )}
      </form>
    </main>
  )
}
