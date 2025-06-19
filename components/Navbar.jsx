'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-gray-100 p-4 shadow mb-6 flex gap-4">
      <Link href="/add-school">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add School
        </button>
      </Link>
      <Link href="/schools">
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          View Schools
        </button>
      </Link>
    </nav>
  )
}
