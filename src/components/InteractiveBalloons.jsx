"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"

const balloonColors = ["#FF6B9D", "#C084FC", "#F472B6", "#EC4899", "#A855F7", "#FFB6C1", "#FF69B4", "#DA70D6"]

export default function InteractiveBalloons({ onAllPopped }) {
  const [balloons, setBalloons] = useState(() => {
    // Helper function to generate random positions with minimum spacing
    const generateRandomPositions = (count, yMin, yMax, minSpacing = 6) => {
      const positions = []
      let attempts = 0
      const maxAttempts = 200

      while (positions.length < count && attempts < maxAttempts) {
        const x = 5 + Math.random() * 90 // Random X between 5% and 95% (more edge coverage but safe)
        const y = yMin + Math.random() * (yMax - yMin) // Random Y in range

        // Check if position is far enough from existing positions (both X and Y)
        const tooClose = positions.some(pos => {
          const xDistance = Math.abs(x - pos.x)
          const yDistance = Math.abs(y - pos.y)
          // Check both horizontal and vertical spacing
          return xDistance < minSpacing || yDistance < minSpacing
        })

        if (!tooClose) {
          positions.push({ x, y })
        }
        attempts++
      }

      // Fill remaining if needed (allow closer spacing but still random)
      while (positions.length < count) {
        const x = 5 + Math.random() * 90
        const y = yMin + Math.random() * (yMax - yMin)
        positions.push({ x, y })
      }

      return positions
    }

    // Generate positions for top balloons - 10 balloons arranged properly
    // Use more responsive ranges that work better on mobile
    const topPositions = generateRandomPositions(10, 8, 25) // Top area: 8-25% (moved up slightly)
    const topBalloons = topPositions.map((pos, i) => ({
      id: `top-${i}`,
      x: pos.x,
      y: pos.y,
      color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
      size: Math.max(35, Math.min(55, 40 + Math.random() * 15)), // Size range: 35-55px (more responsive)
      popped: false,
      appearDelay: i * 0.15 + Math.random() * 0.1, // Staggered appearance
    }))

    // Generate positions for bottom balloons - 10 balloons arranged properly
    // Use more responsive ranges that leave room for UI elements
    const bottomPositions = generateRandomPositions(10, 70, 85) // Bottom area: 70-85% (moved up to avoid bottom UI)
    const bottomBalloons = bottomPositions.map((pos, i) => ({
      id: `bottom-${i}`,
      x: pos.x,
      y: pos.y,
      color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
      size: Math.max(35, Math.min(55, 40 + Math.random() * 15)), // Size range: 35-55px (more responsive)
      popped: false,
      appearDelay: (i + 10) * 0.15 + Math.random() * 0.1, // Continue sequence from top
    }))

    return [...topBalloons, ...bottomBalloons]
  })

  // Check if all balloons are popped
  useEffect(() => {
    const allPopped = balloons.every((balloon) => balloon.popped)
    if (allPopped && balloons.length > 0 && onAllPopped) {
      onAllPopped()
    }
  }, [balloons, onAllPopped])

  const popBalloon = (balloonId) => {
    setBalloons((prev) =>
      prev.map((balloon) =>
        balloon.id === balloonId ? { ...balloon, popped: true } : balloon
      )
    )

    // Small confetti burst at balloon position
    const balloon = balloons.find((b) => b.id === balloonId)
    if (balloon) {
      setTimeout(() => {
        confetti({
          particleCount: 30,
          spread: 40,
          origin: {
            x: balloon.x / 100,
            y: balloon.y / 100,
          },
          colors: [balloon.color, "#FFFFFF"],
          startVelocity: 20,
        })
      }, 100)
    }

    // Play pop sound (optional - you can add a sound file)
    // if (audioRef.current) {
    //   audioRef.current.play()
    // }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      <AnimatePresence>
        {balloons.map((balloon) => (
          <motion.div
            key={balloon.id}
            initial={{ opacity: 0, scale: 0, y: balloon.y < 50 ? -30 : 30 }}
            animate={
              balloon.popped
                ? {
                    opacity: [1, 0],
                    scale: [1, 2, 0],
                    rotate: [0, 180, 360],
                  }
                : {
                    opacity: 1,
                    scale: 1,
                    y: [
                      null,
                      balloon.y < 50 ? balloon.y - 2 : balloon.y + 2,
                      balloon.y,
                    ],
                  }
            }
            exit={{ opacity: 0, scale: 0 }}
            transition={
              balloon.popped
                ? { duration: 0.3, ease: "easeOut" }
                : {
                    opacity: { duration: 0.5, delay: balloon.appearDelay },
                    scale: { duration: 0.5, delay: balloon.appearDelay },
                    y: {
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: balloon.appearDelay,
                    },
                  }
            }
            className="absolute pointer-events-auto cursor-pointer touch-manipulation"
            style={{
              left: `${balloon.x}%`,
              top: `${balloon.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            onClick={() => !balloon.popped && popBalloon(balloon.id)}
            whileHover={!balloon.popped ? { scale: 1.2, transition: { duration: 0.2 } } : {}}
            whileTap={!balloon.popped ? { scale: 0.9 } : {}}
          >
            {!balloon.popped && (
              <motion.div
                className="relative"
                style={{
                  width: `clamp(40px, ${balloon.size}px, 65px)`,
                  height: `clamp(48px, ${balloon.size * 1.2}px, 78px)`,
                }}
              >
                {/* Balloon - More realistic and vibrant design */}
                <div
                  className="w-full h-full rounded-full relative overflow-hidden"
                  style={{
                    background: `radial-gradient(ellipse at 30% 30%, ${balloon.color}ff, ${balloon.color}ee 35%, ${balloon.color}cc 60%, ${balloon.color}99)`,
                    boxShadow: `
                      inset -8px -8px 0 rgba(0,0,0,0.25),
                      inset 4px 4px 0 rgba(255,255,255,0.4),
                      0 3px 6px rgba(0,0,0,0.4),
                      0 0 12px ${balloon.color}88,
                      0 0 24px ${balloon.color}44
                    `,
                    border: `1px solid ${balloon.color}ee`,
                  }}
                >
                  {/* Large highlight for realistic shine */}
                  <div
                    className="absolute top-2 left-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full"
                    style={{
                      background: `radial-gradient(circle, rgba(255,255,255,0.8), rgba(255,255,255,0.3), transparent)`,
                      filter: 'blur(1px)',
                    }}
                  />
                  {/* Secondary highlight */}
                  <div
                    className="absolute top-3 left-4 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                    style={{
                      background: `rgba(255,255,255,0.6)`,
                    }}
                  />
                </div>
                {/* String - More visible */}
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-gray-400 to-gray-500"
                  style={{
                    height: `${balloon.size * 0.7}px`,
                    boxShadow: "0 0 2px rgba(0,0,0,0.3)",
                  }}
                  animate={{
                    x: [0, 3, -3, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

