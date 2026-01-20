"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import HeartPopup from "../HeartPopup"

// Love quotes that rotate daily
const loveQuotes = [
  "You are my sunshine, my only sunshine 💛",
  "Every day with you is a blessing ✨",
  "You make my heart skip a beat 💓",
  "I fall in love with you more every day 💕",
  "You are my today and all of my tomorrows 🌟",
  "Being with you is my favorite place to be 💖",
  "You are my heart, my life, my everything 💗",
  "I love you more than words can express 💝",
  "You are the reason I smile every day 😊",
  "My love for you grows stronger each day 💜",
  "You are my dream come true 💙",
  "I am so lucky to have you in my life 💚",
  "You light up my world like nobody else 💛",
  "Every moment with you is precious 💕",
  "You are my happily ever after 💖",
  "I love you to the moon and back 🌙",
  "You are my everything and more 💗",
  "My heart belongs to you forever 💝",
  "You are the best thing that ever happened to me ✨",
  "I love you more than yesterday, less than tomorrow 💕",
  "You are my perfect match 💖",
  "Every day I love you more 💗",
  "You are my heart's desire 💕",
  "I am forever grateful for you 💝",
  "You make my world complete 🌟",
  "I love you beyond measure 💖",
  "You are my one and only 💕",
  "My love for you is endless 💗",
]

export default function CountdownScreen({ onDone }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isExpired, setIsExpired] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [currentQuote, setCurrentQuote] = useState("")
  const [daysLeft, setDaysLeft] = useState(0)
  const [shouldBypass, setShouldBypass] = useState(false)

  // Check bypass immediately on mount
  useEffect(() => {
    // Check multiple ways to bypass
    const checkBypass = () => {
      if (typeof window === 'undefined') return false
      
      // Check URL parameter (e.g., ?bypass=true)
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('bypass') === 'true') {
        return true
      }
      
      // Check localStorage
      if (window.localStorage?.getItem('bypassCountdown') === 'true') {
        return true
      }
      
      // Check environment variable (client-side)
      if (process.env.NEXT_PUBLIC_BYPASS_COUNTDOWN === "true") {
        return true
      }
      
      return false
    }

    const bypass = checkBypass()
    setShouldBypass(bypass)
    
    if (bypass) {
      // Immediately call onDone to skip countdown
      setTimeout(() => {
        onDone?.()
      }, 500)
      return
    }
  }, [onDone])

  useEffect(() => {
    // Get daily quote based on day of year
    const now = new Date()
    const startOfYear = new Date(now.getFullYear(), 0, 1)
    const dayOfYear = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24))
    const quoteIndex = dayOfYear % loveQuotes.length
    setCurrentQuote(loveQuotes[quoteIndex])
  }, [])

  useEffect(() => {
    // Don't run countdown if bypass is active
    if (shouldBypass) {
      return
    }

    const calculateTimeLeft = () => {
      const now = new Date()
      const currentYear = now.getFullYear()
      const currentMonth = now.getMonth() // 0 = January
      const currentDate = now.getDate()

      // Check if today is January 20 - if so, bypass completely (site fully open)
      if (currentMonth === 0 && currentDate === 20) {
        setIsExpired(true)
        setTimeout(() => onDone?.(), 500)
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      // For January 21 and later, countdown to January 20 of next year
      let targetDate = new Date(currentYear + 1, 0, 20) // January 20 next year

      const difference = targetDate - now

      if (difference <= 0) {
        setIsExpired(true)
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      setDaysLeft(days)

      return {
        days,
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(newTimeLeft)
      if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        setIsExpired(true)
        clearInterval(timer)
        setTimeout(() => onDone?.(), 2000)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [shouldBypass, onDone])

  // Don't render anything if bypassing
  if (shouldBypass) {
    return null
  }

  if (isExpired) {
    return (
      <div className="w-full grid place-items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">
            It's Your Special Day! 🎉
          </h1>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 w-screen h-screen grid place-items-center py-10 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom right, #000000, #581c87, #831843)' }}>
      {/* Crazy Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl opacity-30"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              background: `radial-gradient(circle, ${
                ['#FF6B9D', '#C084FC', '#F472B6', '#EC4899', '#A855F7'][Math.floor(Math.random() * 5)]
              }, transparent)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Animated gradient waves */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: "linear-gradient(45deg, #FF6B9D, #C084FC, #F472B6, #EC4899, #A855F7)",
            backgroundSize: "400% 400%",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Sparkle particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-2 h-2 rounded-full bg-pink-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Heart Button */}
      <motion.button
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.5, type: "spring" }}
        onClick={() => setShowPopup(true)}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 bg-gradient-to-r from-pink-500 to-purple-500 p-3 sm:p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-300 group touch-manipulation"
        aria-label="Open heart message"
      >
        <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white group-hover:scale-125 transition-transform" />
      </motion.button>

      {/* Heart Popup */}
      <HeartPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        daysLeft={daysLeft}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative z-10"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-fuchsia-400 mb-4 sm:mb-6 px-4"
        >
          Counting down to your special day...
        </motion.h1>

        {/* Instructions Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6 sm:mb-8 max-w-3xl mx-auto px-4"
        >
          <div className="bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-fuchsia-500/30 backdrop-blur-md border-2 border-pink-400/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-pink-300 fill-pink-300" />
                <p className="text-sm sm:text-base md:text-lg text-pink-100 font-semibold">
                  Click on the heart button
                </p>
              </div>
              <span className="hidden sm:block text-pink-300">•</span>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl">🎈</span>
                <p className="text-sm sm:text-base md:text-lg text-pink-100 font-semibold">
                  Pop all the balloons
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Daily Love Quote */}
        {currentQuote && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6 sm:mb-8 max-w-2xl mx-auto px-4"
          >
            <div className="bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-fuchsia-500/20 backdrop-blur-md border border-pink-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-pink-100 font-medium italic">
                "{currentQuote}"
              </p>
            </div>
          </motion.div>
        )}

        <div className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-8 justify-center items-center flex-wrap px-4">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex flex-col items-center"
            >
              <motion.div
                key={item.value}
                initial={{ scale: 1.2, y: -10 }}
                animate={{ scale: 1, y: 0 }}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-fuchsia-500/20 backdrop-blur-sm border border-pink-500/30 flex items-center justify-center mb-1 sm:mb-2 shadow-lg"
              >
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                  {String(item.value).padStart(2, "0")}
                </span>
              </motion.div>
              <span className="text-xs sm:text-sm md:text-base text-pink-200/80 font-medium">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 sm:mt-8 text-base sm:text-lg text-pink-200/70 px-4"
        >
          January 20, {new Date().getFullYear() + 1}
        </motion.p>

        {/* Daily Visit Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-6 sm:mt-8 max-w-xl mx-auto px-4"
        >
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
            <p className="text-sm sm:text-base md:text-lg text-pink-200/90">
              💕 Visit this website every day for a new love quote! 💕
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

