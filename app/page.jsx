import { redirect } from 'next/navigation'
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

export default function Home() {
  redirect('/add-school')
}
