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
    <main className="min-h-screen px-6 py-10 bg-[#0e1117] text-white font-poppins">
      <Navbar />
      <h1 className="text-center text-4xl md:text-5xl font-extrabold text-indigo-400 mb-12 animate-fadeIn drop-shadow-xl">
        📚 School Directory
      </h1>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {schools.map((school) => (
          <div
            key={school.id}
            className="bg-white/5 backdrop-blur-xl border border-indigo-500 rounded-3xl p-6 shadow-2xl animate-fadeIn transition transform hover:scale-[1.03] hover:shadow-indigo-500/30"
          >
            <h2 className="text-xl font-bold text-indigo-300 mb-2">🏫 {school.name}</h2>
            <p className="text-gray-300 mb-1">
              <span className="font-semibold text-indigo-200">📍 Address:</span> {school.address}
            </p>
            <p className="text-gray-300 mb-4">
              <span className="font-semibold text-indigo-200">📞 Phone:</span> {school.phone}
            </p>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                school.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-sm bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-lg transition-all"
            >
              🗺️ Show on Map
            </a>
          </div>
        ))}
      </div>

      {schools.length === 0 && (
        <p className="text-center text-gray-500 mt-20 text-lg animate-pulse">
          No schools yet. Be the first to add one!
        </p>
      )}
    </main>
  )
}
