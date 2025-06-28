export const metadata = {
  title: 'Privacy Policy - School Directory',
  description: 'Privacy policy for the School Directory project site',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="p-6 max-w-3xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">🛡️ Privacy Policy</h1>
      <p className="mb-4">Effective Date: June 28, 2025</p>

      <p className="mb-4">
        Welcome to <strong>School Directory</strong>. This website is currently a <strong>college project and internship submission</strong> being tested for real-world use. Depending on performance, feedback, and demand, it may evolve into a full-time platform.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">🔍 Who We Are</h2>
      <p className="mb-4">
        This site is developed and managed as a <strong>college-level internship project</strong> by an individual student. It is not a registered business or organization.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">🧠 What Information We Collect</h2>
      <ul className="list-disc list-inside mb-4 text-gray-300">
        <li>Publicly submitted reviews</li>
        <li>Feedback comments</li>
        <li>Basic usage analytics</li>
        <li>Device/browser info</li>
        <li>Contact form submissions, if present</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">📦 How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4 text-gray-300">
        <li>Display school reviews</li>
        <li>Analyze site traffic & improve the project</li>
        <li>Evaluate performance for the internship</li>
        <li>Help decide future development</li>
        <li>Show ads for basic revenue to fund development</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">💸 Ads & Monetization</h2>
      <p className="mb-4">
        Ads may appear to generate minimal revenue. This helps cover hosting fees and supports skill development. No data is sold or tracked for personal targeting.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">🔐 Data Sharing</h2>
      <p className="mb-4">
        We do <strong>not</strong> share your data with third-party companies, except:
      </p>
      <ul className="list-disc list-inside mb-4 text-gray-300">
        <li>Hosting providers (like Vercel)</li>
        <li>Analytics tools (Vercel Speed Insights, etc.)</li>
        <li>Email routing tools (if contact form is used)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">🧹 Data Retention</h2>
      <p className="mb-4">
        Reviews and feedback are stored until removed or the project concludes. No personally sensitive data is stored.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">👷 Project Status</h2>
      <p className="mb-4">
        This is <strong>not a commercial site</strong> yet. It may evolve into a full product in future. If that happens, this policy will be updated.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">📬 Contact</h2>
      <p className="mb-4">
        If you have questions, email us at <strong>admin@schooldirectory.com</strong>.
      </p>

      <p className="text-sm italic text-gray-400">
        This Privacy Policy may be updated as needed.
      </p>
    </main>
  )
}
