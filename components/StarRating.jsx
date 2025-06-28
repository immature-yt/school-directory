'use client'
import { useState } from 'react'

export default function StarRating({ label, value, onChange }) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="mb-2">
      <label className="block font-semibold mb-1">{label}</label>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className={`cursor-pointer text-2xl transition ${
              (hovered || value) >= star ? 'text-yellow-400' : 'text-gray-600'
            }`}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  )
}
