// app/contact/page.jsx
export default function ContactPage() {
  return (
    <main className="min-h-screen p-6 text-white max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">📞 Contact Us</h1>
      <p className="mb-4">
        If you have any questions, suggestions, or need support, feel free to reach out.
      </p>

      <ul className="space-y-2">
        <li>📧 Email: <a href="mailto:admin@schooldirectory.com" className="text-cyan-400 hover:underline">admin@schooldirectory.com</a></li>
        <li>📍 Location: India</li>
      </ul>
    </main>
  )
}
