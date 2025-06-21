'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="w-full py-4 px-6 bg-[#0e1117] text-white flex justify-between items-center border-b border-indigo-500 shadow-md z-50">
      <h1 className="text-2xl font-bold text-indigo-400">🏫 School Directory</h1>

      <div className="flex gap-4">
        {pathname !== '/add-school' && (
          <Link href="/add-school">
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded transition-all">
              ➕ Add School
            </button>
          </Link>
        )}

        {pathname !== '/schools' && (
          <Link href="/schools">
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded transition-all">
              📚 View Schools
            </button>
          </Link>
        )}
      </div>
    </nav>
  )
}
