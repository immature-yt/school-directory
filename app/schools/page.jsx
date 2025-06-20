'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'

export default function SchoolsPage() {
  const [schools, setSchools] = useState([])

  useEffect(() => {
    const fetchSchools = async () => {
      const res = await fetch('/api/get-schools')
      const data = await res.json()
      setSchools(data)
    }

    fetchSchools()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-tr from-[#141e30] via-[#243b55] to-[#141e30] text-white p-6 font-sans">
      <Navbar />
      <h1 className="text-5xl text-center font-extrabold text-indigo-400 mb-12 drop-shadow-2xl animate-fadeIn">
        🎓 Explore Amazing Schools
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto px-4">
        {schools.map((school) => (
          <div
            key={school.id}
            className="backdrop-blur-lg bg-white/5 border border-indigo-500 rounded-3xl shadow-xl p-6 transition transform hover:scale-105 hover:shadow-indigo-500/50"
          >
            <h2 className="text-2xl font-semibold text-indigo-300 mb-2">🏫 {school.name}</h2>
            <p className="text-gray-300 mb-1">
              <span className="font-bold text-indigo-200">📍 Address:</span> {school.address}
            </p>
            <p className="text-gray-300 mb-4">
              <span className="font-bold text-indigo-200">📞 Phone:</span> {school.phone}
            </p>
            <button
              onClick={() => {
                const text = `${school.name}\n${school.address}\n${school.phone}`
                navigator.clipboard.writeText(text)
                alert('Copied to clipboard!')
              }}
              className="text-sm bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-full transition"
            >
              📋 Copy Info
            </button>
          </div>
        ))}
      </div>

      {schools.length === 0 && (
        <p className="text-center text-gray-400 mt-12 text-lg animate-pulse">
          No schools added yet.
        </p>
      )}
    </main>
  )
}
