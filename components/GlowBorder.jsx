'use client'
import { motion } from 'framer-motion'

export default function GlowBorder({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative rounded-[24px] p-[2px] bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] shadow-2xl"
    >
      <div className="rounded-[22px] bg-[#0f0c29] p-1">{children}</div>
    </motion.div>
  )
}
