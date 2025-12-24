"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export default function FinalScreen() {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Math.random(),
        x: Math.random() * 100,
        delay: 0,
      }
      setHearts((prev) => [...prev, newHeart])
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id))
      }, 3000)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-10 text-center relative min-h-screen flex items-center justify-center">
      {/* Floating Hearts Background */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ opacity: 0, scale: 0, x: `${heart.x}%`, y: "100%" }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1.2, 1, 0.8],
            y: "-20%",
            x: `${heart.x + (Math.random() - 0.5) * 20}%`,
          }}
          transition={{
            duration: 3,
            delay: heart.delay,
            ease: "easeOut",
          }}
          className="absolute pointer-events-none"
        >
          <Heart className="w-8 h-8 text-pink-400 fill-pink-400" />
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-fuchsia-400 mb-4 sm:mb-6 px-2"
            style={{
              filter: "drop-shadow(0 0 30px rgba(255,105,180,0.5))",
            }}
          >
            I Love You
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-4 sm:space-y-6"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-xl sm:text-2xl md:text-3xl text-pink-200 font-medium px-2"
          >
            Forever and Always
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, type: "spring" }}
            className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.5 + i * 0.1, type: "spring" }}
              >
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-pink-400 fill-pink-400" />
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-base sm:text-lg md:text-xl text-pink-300/80 mt-8 sm:mt-12 italic px-2"
          >
            Happy Birthday, my beautiful Tanishka! 🎂💕
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.3 }}
            className="text-sm sm:text-base md:text-lg text-pink-200/60 mt-3 sm:mt-4 px-2"
          >
            You mean the world to me
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  )
}

