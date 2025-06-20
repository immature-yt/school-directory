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
    <main className="min-h-screen bg-[#1e1e2f] text-[#e5e5e5] p-6">
      <Navbar />
      <h1 className="text-4xl font-bold text-center text-indigo-400 mb-10">📚 All Schools</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {schools.map((school) => (
          <div
            key={school.id}
            className="bg-[#2a2a3c] p-6 rounded-xl shadow-md border border-gray-600 hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold text-indigo-300 mb-2">{school.name}</h2>
            <p className="text-gray-300"><strong>Address:</strong> {school.address}</p>
            <p className="text-gray-300 mb-4"><strong>Phone:</strong> {school.phone}</p>

            <button
              onClick={() => {
                const text = `${school.name}\n${school.address}\n${school.phone}`
                navigator.clipboard.writeText(text)
                alert('Copied to clipboard!')
              }}
              className="text-sm px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-500"
            >
              📋 Copy Info
            </button>
          </div>
        ))}
      </div>

      {schools.length === 0 && (
        <p className="text-center text-gray-400 mt-8 text-lg">No schools added yet.</p>
      )}
    </main>
  )
}
