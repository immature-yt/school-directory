'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import { motion, AnimatePresence } from 'framer-motion'

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

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedSchool(null)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  return (
    <>
      <Navbar />

      <main className="min-h-screen px-6 pt-24 pb-10 bg-[#0e1117] text-white font-poppins relative">
        <h1 className="text-center text-5xl font-extrabold text-indigo-400 mb-12 drop-shadow-[0_0_20px_rgba(129,140,248,0.9)]">
          📚 School Directory
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {schools.map((school) => (
            <motion.div
              key={school.id}
              className="bg-white/5 backdrop-blur-xl border border-indigo-500 rounded-3xl p-6 shadow-2xl hover:shadow-indigo-500/50 hover:scale-105 transition duration-300 cursor-pointer"
              onClick={() => setSelectedSchool(school)}
              whileTap={{ scale: 0.98 }}
            >
              <h2 className="text-xl font-bold text-indigo-300 mb-2 drop-shadow-[0_0_10px_rgba(129,140,248,0.8)]">
                {school.name}
              </h2>
              <p className="text-sm text-gray-300 truncate">📍 {school.address}</p>
              <p className="text-sm text-gray-300 mt-1">📞 {school.phone}</p>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedSchool && (
            <>
              {/* Overlay */}
              <motion.div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedSchool(null)}
              />

              {/* Modal Content */}
              <motion.div
                className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-2xl -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-lg border border-indigo-400 text-white rounded-xl p-8 shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="flex-shrink-0 w-full sm:w-1/3 aspect-square bg-indigo-500/20 rounded-lg flex items-center justify-center text-6xl">
                    🏫
                  </div>

                  <div className="w-full">
                    <h2 className="text-2xl font-bold text-indigo-300 mb-2 drop-shadow-[0_0_10px_rgba(129,140,248,0.9)]">
                      {selectedSchool.name}
                    </h2>
                    <p className="text-gray-300 mb-1">📍 {selectedSchool.address}</p>
                    <p className="text-gray-300 mb-4">📞 {selectedSchool.phone}</p>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedSchool.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 transition text-white">
                        🗺️ Show on Map
                      </button>
                    </a>
                  </div>
                </div>

                <div className="text-right mt-6">
                  <button
                    onClick={() => setSelectedSchool(null)}
                    className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 transition text-white"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>
    </>
  )
}
