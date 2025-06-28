'use client'

import { useEffect, useState } from 'react'
import '@/app/globals.css'
import Link from 'next/link'

export default function SchoolsPage() {
  const [schools, setSchools] = useState([])
  const [selectedSchool, setSelectedSchool] = useState(null)

  useEffect(() => {
    const fetchSchools = async () => {
      const res = await fetch('/api/get-schools')
      const data = await res.json()
      setSchools(data)
    }

    fetchSchools()
  }, [])

  const fetchSchoolWithFeedback = async (school) => {
    try {
      const res = await fetch(`/api/get-written-reviews?schoolId=${school.id}`)
      const feedbacks = await res.json()
      setSelectedSchool({ ...school, feedbacks })
    } catch (err) {
      console.error('Failed to fetch feedbacks', err)
      setSelectedSchool(school)
    }
  }

  return (
    <main className="relative min-h-screen p-6 text-white">
      {/* Floating neon lights */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-fuchsia-500 opacity-20 rounded-full mix-blend-screen blur-3xl top-10 left-10 animate-pulse" />
        <div className="absolute w-80 h-80 bg-cyan-500 opacity-20 rounded-full mix-blend-screen blur-3xl bottom-20 right-10 animate-pulse" />
      </div>

      <section className="relative z-10 max-w-4xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold neon-title text-center mb-6">📚 All Schools</h1>

        {schools.map((school) => (
          <div
            key={school.id}
            onClick={() => fetchSchoolWithFeedback(school)}
            className="cursor-pointer neon-card p-4 rounded-lg transition hover:scale-[1.02] bg-black/40 backdrop-blur-md"
          >
            <h2 className="text-2xl font-semibold text-white">{school.name}</h2>
            <p className="text-sm text-gray-300">{school.address}</p>
            <p className="text-sm text-gray-400">{school.phone}</p>
          </div>
        ))}
      </section>

      {selectedSchool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="glass-card w-11/12 md:w-3/4 lg:w-2/3 h-[90%] overflow-y-auto p-6 relative animate-fade-in-pop shadow-xl rounded-xl">
            <button
              onClick={() => setSelectedSchool(null)}
              className="absolute top-4 right-4 text-white text-xl font-bold hover:text-fuchsia-500"
            >
              ❌
            </button>

            <div className="flex flex-col md:flex-row gap-6 mt-4">
              <div className="md:w-1/2">
                {selectedSchool.image ? (
                  <img
                    src={selectedSchool.image}
                    alt={selectedSchool.name}
                    className="rounded-lg w-full object-cover max-h-96 border border-cyan-400 shadow-lg"
                  />
                ) : (
                  <div className="text-gray-400 italic">No image uploaded.</div>
                )}
              </div>

              <div className="md:w-1/2 space-y-4">
                <h2 className="text-3xl font-bold neon-title">{selectedSchool.name}</h2>
                <p className="text-lg"><strong>📍 Address:</strong> {selectedSchool.address}</p>
                <p className="text-lg"><strong>📞 Phone:</strong> {selectedSchool.phone}</p>
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(selectedSchool.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="mt-4 bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-6 py-2 rounded font-semibold hover:scale-105 transition">
                    🌍 Show on Map
                  </button>
                </a>

                {/* Review Section */}
                <div className="mt-6 space-y-3">
                  <h3 className="text-xl font-bold neon-title">🏫 Reviews</h3>

                  {selectedSchool.avgInfrastructure ? (
                    <div>
                      <p>🏗 Infrastructure: <strong>{selectedSchool.avgInfrastructure.toFixed(1)} / 5</strong></p>
                      <p>📚 Academics: <strong>{selectedSchool.avgAcademics.toFixed(1)} / 5</strong></p>
                      <p>💸 Value for Money: <strong>{selectedSchool.avgValue.toFixed(1)} / 5</strong></p>
                      <p>🎭 Extracurricular: <strong>{selectedSchool.avgExtra.toFixed(1)} / 5</strong></p>
                    </div>
                  ) : (
                    <p className="text-sm italic text-gray-400">No reviews yet.</p>
                  )}
                </div>

                {/* Written Reviews Section */}
                {selectedSchool.feedbacks && selectedSchool.feedbacks.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <h3 className="text-xl font-bold neon-title">📝 What Others Say</h3>
                    {selectedSchool.feedbacks.map((review, index) => (
                      <div key={index} className="bg-black/30 p-4 rounded-lg text-sm border border-cyan-700">
                        {review.feedback && <p className="text-gray-300 italic">"{review.feedback}"</p>}
                        <p className="text-gray-400 mt-1 text-xs">📅 {new Date(review.createdAt).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                )}

                <Link href={`/review/${selectedSchool.id}`}>
                  <button className="mt-4 bg-fuchsia-700 hover:bg-fuchsia-900 px-4 py-2 rounded text-white font-semibold transition">
                    ✍️ Write a Review
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
