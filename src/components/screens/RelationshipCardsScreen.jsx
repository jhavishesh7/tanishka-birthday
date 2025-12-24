"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"
import GradientButton from "../GradientButton"

const relationshipData = [
  {
    year: "2022",
    message: "The year we met and our beautiful journey began 💕",
    hearts: 5,
  },
  {
    year: "2023",
    message: "Growing closer, building memories, falling deeper in love 💖",
    hearts: 8,
  },
  {
    year: "2024",
    message: "Another year of adventures, laughter, and endless love 💗",
    hearts: 10,
  },
  {
    year: "2025",
    message: "Our future together, filled with dreams and forever promises 💝",
    hearts: 12,
  },
]

export default function RelationshipCardsScreen({ onNext }) {
  const [currentCard, setCurrentCard] = useState(0)
  const [hearts, setHearts] = useState([])

  const addHeart = (x, y) => {
    const newHeart = {
      id: Math.random(),
      x,
      y,
      delay: Math.random() * 0.5,
    }
    setHearts((prev) => [...prev, newHeart])
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id))
    }, 2000)
  }

  const handleCardClick = () => {
    if (currentCard < relationshipData.length - 1) {
      setCurrentCard(currentCard + 1)
    } else {
      setTimeout(() => onNext?.(), 1000)
    }
  }

  const currentData = relationshipData[currentCard]

  return (
    <div className="px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-10 text-center relative min-h-[400px] sm:min-h-[500px]">
      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ opacity: 0, scale: 0, x: heart.x, y: heart.y }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0.8],
            y: heart.y - 100,
            x: heart.x + (Math.random() - 0.5) * 50,
          }}
          transition={{
            duration: 2,
            delay: heart.delay,
            ease: "easeOut",
          }}
          className="absolute pointer-events-none"
        >
          <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
        </motion.div>
      ))}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentCard}
          initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotateY: 180 }}
          transition={{ duration: 0.6 }}
          className="relative"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            addHeart(
              e.clientX - rect.left,
              e.clientY - rect.top
            )
            handleCardClick()
          }}
        >
          <div className="bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-fuchsia-500/20 backdrop-blur-md border-2 border-pink-500/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300 touch-manipulation">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-fuchsia-400 mb-4 sm:mb-6"
            >
              {currentData.year}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-pink-100 mb-4 sm:mb-6 leading-relaxed px-2"
            >
              {currentData.message}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center gap-2 flex-wrap"
            >
              {Array.from({ length: currentData.hearts }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.8 + i * 0.05, type: "spring" }}
                >
                  <Heart className="w-5 h-5 md:w-6 md:h-6 text-pink-400 fill-pink-400" />
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-4 sm:mt-6 text-xs sm:text-sm text-pink-200/60 px-2"
            >
              {currentCard < relationshipData.length - 1
                ? "Tap to see the next year"
                : "Tap to continue"}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {currentCard === relationshipData.length - 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-8"
        >
          <GradientButton onClick={onNext}>
            Continue to Surprise
          </GradientButton>
        </motion.div>
      )}
    </div>
  )
}

