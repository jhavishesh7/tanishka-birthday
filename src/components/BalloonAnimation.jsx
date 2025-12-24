"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function BalloonAnimation({ onComplete }) {
  const [balloons, setBalloons] = useState([])

  useEffect(() => {
    const colors = ["#FF6B9D", "#C084FC", "#F472B6", "#EC4899", "#A855F7"]
    // Create more balloons distributed across the entire page
    const newBalloons = Array.from({ length: 30 }, (_, i) => {
      // Distribute balloons across the entire width
      const xPosition = (i / 30) * 100 + (Math.random() * 3 - 1.5)
      // Some start from bottom, some from top
      const startFromBottom = i % 2 === 0
      
      return {
        id: i,
        x: Math.max(0, Math.min(100, xPosition)),
        delay: Math.random() * 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 40 + 35,
        startFromBottom,
      }
    })
    setBalloons(newBalloons)

    if (onComplete) {
      setTimeout(() => onComplete(), 4000)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          initial={{
            y: balloon.startFromBottom ? "110%" : "-10%",
            x: `${balloon.x}%`,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            y: balloon.startFromBottom ? "-10%" : "110%",
            opacity: [0, 1, 1, 0.8, 0],
            scale: [0, 1.2, 1, 0.9, 0.7],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: balloon.delay,
            ease: "easeInOut",
          }}
          className="absolute"
          style={{
            width: `${balloon.size}px`,
            height: `${balloon.size * 1.3}px`,
          }}
        >
          <div
            className="w-full h-full rounded-full relative"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${balloon.color}88, ${balloon.color})`,
              boxShadow: `inset -10px -10px 0 rgba(0,0,0,0.1)`,
            }}
          >
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gray-400"
              style={{ height: `${balloon.size * 0.8}px` }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

