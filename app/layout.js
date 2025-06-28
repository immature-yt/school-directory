// app/layout.js
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata = {
  title: 'School Directory',
  description: 'Modern school listing web app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-poppins bg-[#0e1117] text-white min-h-screen">
        {children}
        <Analytics />
        <SpeedInsights />
        <footer className="fixed bottom-0 left-0 w-full bg-[#1a1d24] text-gray-400 text-sm py-3 px-4 border-t border-gray-700 flex justify-center gap-6 z-50">
          <a href="/contact" className="hover:underline">Contact Us</a> | 
         <a href="/about" className="hover:underline mx-2">About</a> | 
         <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
      </footer>

      </body>
    </html>
  )
}
