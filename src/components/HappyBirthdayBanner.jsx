"use client"

import { motion } from "framer-motion"

export default function HappyBirthdayBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      className="fixed top-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
    >
      <div className="bg-gradient-to-r from-pink-500/90 via-purple-500/90 to-fuchsia-500/90 backdrop-blur-md px-8 py-4 rounded-full shadow-2xl border-2 border-pink-400/50">
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg"
        >
          🎉 Happy Birthday! 🎉
        </motion.h1>
      </div>
    </motion.div>
  )
}

