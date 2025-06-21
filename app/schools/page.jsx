'use client'

import { PrismaClient } from '@prisma/client'
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const prisma = new PrismaClient()

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
    <>
      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="min-h-screen px-6 pt-24 pb-10 bg-[#0e1117] text-white font-poppins"
      >
        <h1 className="text-center text-5xl font-extrabold text-indigo-400 mb-12 animate-fadeIn drop-shadow-[0_0_20px_rgba(129,140,248,0.9)]">
          📚 School Directory
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {schools.map((school) => (
            <div
              key={school.id}
              className="bg-white/5 backdrop-blur-xl border border-indigo-500 rounded-3xl p-6 shadow-2xl transition hover:shadow-indigo-500/50 hover:scale-105 duration-300"
            >
              <h2 className="text-xl font-bold text-indigo-300 mb-2 drop-shadow-[0_0_10px_rgba(129,140,248,0.8)]">
                {school.name}
              </h2>
              <p className="text-sm text-gray-300">📍 {school.address}</p>
              <p className="text-sm text-gray-300 mt-1">📞 {school.phone}</p>
            </div>
          ))}
        </div>
      </motion.main>
    </>
  )
}
