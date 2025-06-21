// app/layout.js
import './globals.css'

export const metadata = {
  title: 'School Directory',
  description: 'Modern school listing web app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Add Poppins font from Google */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-poppins bg-[#0e1117] text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
