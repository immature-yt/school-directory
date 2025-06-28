'use client'

import { useState, useEffect } from 'react'

const ADMIN_USER = 'admin123'
const ADMIN_PASS = 'supersecret'

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [schools, setSchools] = useState([])
  const [refreshToggle, setRefreshToggle] = useState(false)

  const login = () => {
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      setLoggedIn(true)
      fetchSchools()
    } else {
      alert('Wrong credentials')
    }
  }

  const fetchSchools = async () => {
    const res = await fetch('/api/get-schools')
    const data = await res.json()
    setSchools(data)
  }

  const deleteSchool = async (id) => {
    if (confirm('Are you sure you want to delete this school?')) {
      const res = await fetch(`/api/delete-school`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      if (res.ok) {
        fetchSchools()
        alert('Deleted')
      } else {
        alert('Failed to delete')
      }
    }
  }

  const deleteReview = async (id) => {
    if (confirm('Delete review?')) {
      const res = await fetch(`/api/delete-review`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      if (res.ok) {
        alert('Review deleted')
        setRefreshToggle(prev => !prev)
      } else {
        alert('Error deleting review')
      }
    }
  }

  if (!loggedIn) {
    return (
      <main className="min-h-screen p-6 text-white max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">🔐 Admin Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="input-field mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="input-field mb-4"
        />
        <button onClick={login} className="submit-btn">Login</button>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">🛠 Admin Dashboard</h1>

      {schools.map((school) => (
        <div key={school.id} className="bg-black/30 p-4 mb-6 rounded shadow">
          <h2 className="text-xl font-semibold">{school.name}</h2>
          <p>{school.address}</p>
          <button
            onClick={() => deleteSchool(school.id)}
            className="mt-2 bg-red-600 hover:bg-red-800 px-4 py-1 rounded"
          >
            Delete School
          </button>

          <Reviews
            key={`reviews-${school.id}`}
            schoolId={school.id}
            deleteReview={deleteReview}
            refresh={refreshToggle}
          />
        </div>
      ))}
    </main>
  )
}

function Reviews({ schoolId, deleteReview, refresh }) {
  const [reviews, setReviews] = useState([])

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/get-written-reviews?schoolId=${schoolId}`)
      const data = await res.json()
      if (Array.isArray(data)) setReviews(data)
      else setReviews([])
    } catch {
      setReviews([])
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [schoolId, refresh])

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">📝 Reviews</h3>
      {reviews.length === 0 && <p className="text-gray-400 italic">No reviews</p>}
      {reviews.map((r) => (
        <div key={r.id} className="bg-black/20 p-2 mt-2 rounded text-sm">
          {r.feedback && <p>"{r.feedback}"</p>}
          <p>🏗 Infrastructure: {r.infrastructure} | 📚 Academics: {r.academics}</p>
          <button
            onClick={() => deleteReview(r.id)}
            className="mt-1 text-red-400 hover:text-red-600 text-xs"
          >
            Delete Review
          </button>
        </div>
      ))}
    </div>
  )
}
