'use client'

import { useEffect, useState } from 'react'

export const metadata = {
  title: 'About - School Directory',
  description: 'Learn more about the School Directory project and the developer behind it',
}

export default function AboutPage() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className={`transition-all duration-1000 ease-in-out px-6 py-12 max-w-4xl mx-auto ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <h1 className="text-4xl font-extrabold neon-title text-center mb-6">🚀 About School Directory</h1>

      <section className="space-y-6 text-white text-lg leading-relaxed bg-black/30 backdrop-blur-md p-6 rounded-xl border border-cyan-500 shadow-md">
        <p>
          <strong>School Directory</strong> is a modern, web-based platform built as part of a <span className="text-fuchsia-400">college project and internship</span> challenge. It aims to help students, parents, and educators explore schools and rate them based on real experiences.
        </p>

        <p className="text-cyan-300 font-medium animate-pulse">
          💡 The core idea? Community-powered, honest school reviews that are simple, clean, and useful.
        </p>

        <p>
          This app was crafted by a passionate student developer who loves clean code, bold UI, and <span className="text-fuchsia-400 font-semibold">bringing ideas to life</span>. Every page, feature, and style was built from scratch to learn real-world skills.
        </p>

        <p className="italic text-sm text-gray-400">
          (Fun fact: No templates were used. Everything was hand-coded.)
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-2 text-fuchsia-400">🔥 Features Built So Far</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>School list with location, image, and contact</li>
          <li>Dynamic reviews across 4 key categories</li>
          <li>Admin dashboard to manage schools & reviews</li>
          <li>Analytics + Performance via Vercel tools</li>
          <li>Fully responsive, dark-mode neon design</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-2 text-cyan-300">🛠️ Tech Stack</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-300">
          <li>Frontend: Next.js 14 (App Router) + Tailwind CSS</li>
          <li>Database: Prisma + PostgreSQL</li>
          <li>Auth: Admin-only secure login</li>
          <li>Hosting: Vercel</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-2 text-yellow-400">📈 Future Plans</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Add school images, ratings and charts</li>
          <li>User login for verified student reviews</li>
          <li>Search & filtering by city/state</li>
          <li>Mobile app version (React Native)</li>
          <li>Revenue via Ads to support hosting</li>
        </ul>

        <div className="text-center mt-10">
          <p className="text-lg font-semibold mb-2 text-cyan-200">Wanna say hi or suggest improvements?</p>
          <a
            href="mailto:admin@schooldirectory.com"
            className="inline-block mt-2 px-5 py-2 bg-fuchsia-700 hover:bg-fuchsia-900 transition rounded-full text-white font-semibold"
          >
            📩 Contact Us
          </a>
        </div>
      </section>
    </main>
  )
}
