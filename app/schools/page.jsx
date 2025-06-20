'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'

export default function SchoolsPage() {
  const [schools, setSchools] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')

  const emojis = ['🏫', '🎓', '📚', '🏢', '🧠']

  useEffect(() => {
    const fetchSchools = async () => {
      const res = await fetch('/api/get-schools')
      const data = await res.json()
      setSchools(data)
      setFiltered(data)
    }

    fetchSchools()
  }, [])

  useEffect(() => {
    const filteredList = schools.filter((school) =>
      school.name.toLowerCase().includes(search.toLowerCase())
    )
    setFiltered(filteredList)
  }, [search, schools])

  const handleCopy = (school) => {
    const text = `📍 ${school.name}\n🏠 ${school.address}\n📞 ${school.phone}`
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  return (
    <main className="min-h-screen bg-[#fef6fb] p-6">
      <Navbar />
      <h1 className="text-4xl font-bold text-center text-[#333] mb-8">All Schools 📚</h1>

      <div className="max-w-xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search schools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md bg-white text-[#333] shadow"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filtered.map((school, index) => (
          <div
            key={school.id}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold text-[#4b0082] mb-2">
              {emojis[index % emojis.length]} {school.name}
            </h2>
            <p className="text-[#333]"><strong>Address:</strong> {school.address}</p>
            <p className="text-[#333] mb-3"><strong>Phone:</strong> {school.phone}</p>

            <div className="flex gap-3">
              <button
                onClick={() => handleCopy(school)}
                className="text-sm px-3 py-1 bg-[#c084fc] text-white rounded hover:bg-[#a855f7]"
              >
                📋 Copy Info
              </button>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  school.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-3 py-1 bg-[#7dd3fc] text-white rounded hover:bg-[#38bdf8]"
              >
                📍 View Map
              </a>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-600 mt-8 text-lg">No schools found 😢</p>
      )}
    </main>
  )
}
