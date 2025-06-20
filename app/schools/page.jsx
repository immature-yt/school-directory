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
    <main className="p-6 max-w-6xl mx-auto">
      <Navbar />
      <h1 className="text-4xl font-bold mb-6 text-center">🏫 All Schools</h1>

      <input
        type="text"
        placeholder="Search schools..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 p-3 border rounded shadow"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((school, index) => (
          <div
            key={school.id}
            className="bg-white shadow-md rounded-lg p-5 border border-gray-200 hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold mb-2">
              {emojis[index % emojis.length]} {school.name}
            </h2>
            <p className="text-gray-700">
              <strong>Address:</strong> {school.address}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Phone:</strong> {school.phone}
            </p>
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => handleCopy(school)}
                className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                📋 Copy Info
              </button>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  school.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                📍 View Map
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
