"use client"

import { useState, useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import confetti from "canvas-confetti"
import GradientButton from "../GradientButton"
import InteractiveBalloons from "../InteractiveBalloons"
import { ArrowRight, Flame, Scissors } from "lucide-react"

const confettiColors = ["#FF3CAC", "#F687B3", "#D8B4FE", "#C084FC", "#F472B6"];

export default function CakeScreen({ onNext, onDecorate }) {
  const [decorated, setDecorated] = useState(false)
  const [lit, setLit] = useState(false)
  const [cut, setCut] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const [showForever, setShowForever] = useState(false)
  const [showCutButton, setShowCutButton] = useState(false)
  const [allBalloonsPopped, setAllBalloonsPopped] = useState(false)
  const audioRef = useRef(null)

  const fullText = "Happy Birthday Tanishka"

  useEffect(() => {
    if (lit && !cut) {
      let index = 0
      const interval = setInterval(() => {
        if (index < fullText.length) {
          setDisplayedText(fullText.slice(0, index + 1))
          index++
        } else {
          clearInterval(interval)
          setTimeout(() => setShowForever(true), 500)
        }
      }, 150)
      return () => clearInterval(interval)
    }
  }, [lit, cut, fullText])

  const decorate = () => {
    if (decorated) return
    setDecorated(true)
    setTimeout(() => {
      onDecorate()
    }, 500);
  }

  const lightCandle = () => {
    if (lit) return
    setLit(true)
    
    // Play happy birthday song when candle is lit
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Auto-play might be blocked, that's okay
        console.log("Audio play was blocked")
      })
    }
    
    // Confetti when lighting candle
    setTimeout(() => burst(), 500);
    setTimeout(() => burst(), 1000);
    
    // Show "Cut the Cake" button after 4 seconds
    setTimeout(() => {
      setShowCutButton(true)
    }, 4000)
  }

  const cutCake = () => {
    if (cut) return
    setCut(true)

    // Confetti burst when cutting cake
    setTimeout(() => burst(), 200);
    setTimeout(() => burst(), 500);
    setTimeout(() => burst(), 800);
    
    // Massive confetti
    setTimeout(() => {
      confetti({
        particleCount: 300,
        spread: 120,
        origin: { y: 0.5 },
        colors: confettiColors,
      })
    }, 1000);
  }

  const burst = () => {
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 },
      colors: confettiColors,
    })
  }

  return (
    <div className="px-4 md:px-6 py-10 text-center relative min-h-screen flex flex-col justify-center" style={{ background: 'linear-gradient(to bottom right, #000000, #1a0a2e, #2d1b3d, #16213e)' }}>
      {/* Interactive Balloons */}
      <InteractiveBalloons onAllPopped={() => setAllBalloonsPopped(true)} />

      {/* Hidden audio for happy birthday song */}
      <audio ref={audioRef} loop>
        <source src="/happy-birthday.mp3" type="audio/mpeg" />
      </audio>

      {lit && (
        <motion.div 
          className="absolute top-24 sm:top-28 md:top-32 lg:top-40 left-0 w-full text-center z-40 px-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        >
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 drop-shadow leading-tight px-2"
            style={{ filter: "drop-shadow(0 0 20px rgba(255,105,180,0.4))" }}
          >
            {displayedText}
            {displayedText.length < fullText.length && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                |
              </motion.span>
            )}
          </div>
        </motion.div>
      )}

      <div className="relative flex flex-col items-center gap-4 sm:gap-6 md:gap-8 mt-32 sm:mt-36 md:mt-40 lg:mt-48">
        <div className="relative mb-6">
          <Cake lit={lit} cut={cut} />
        </div>

        {showForever && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl sm:text-2xl md:text-3xl text-pink-200 font-medium px-4"
          >
            I love you forever 💕
          </motion.p>
        )}

        <AnimatePresence mode="wait">
          {!allBalloonsPopped ? (
            <motion.div
              key="pop-balloons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-14 flex items-center justify-center"
            >
              <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-pink-300 text-sm sm:text-base md:text-lg font-medium px-4 text-center"
              >
                Pop all the balloons to continue! 🎈
              </motion.div>
            </motion.div>
          ) : !lit ? (
            <motion.div
              key="light"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <GradientButton onClick={lightCandle}>
                <Flame size={20} />
                Light the Candle
              </GradientButton>
            </motion.div>
          ) : lit && !showCutButton ? (
            // Show nothing while waiting for cut button to appear
            <motion.div
              key="waiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-14 flex items-center justify-center"
            >
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-pink-300 text-sm sm:text-base px-4"
              >
                Wait for it...
              </motion.div>
            </motion.div>
          ) : !cut ? (
            <motion.div
              key="cut"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <GradientButton onClick={cutCake}>
                <Scissors size={20} />
                Cut the Cake
              </GradientButton>
            </motion.div>
          ) : (
            <motion.div
              key="next"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, delay: 2 } }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <GradientButton onClick={onNext}>
                Next
                <ArrowRight size={20} className="mt-0.5" />
              </GradientButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div >
  )
}

function Cake({ lit, cut }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div 
        className="cake"
        animate={cut ? { 
          scale: [1, 1.05, 0.95, 1],
          rotate: [0, -2, 2, 0]
        } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="plate"></div>
        <div className="layer layer-bottom"></div>
        <div className="layer layer-middle"></div>
        <div className="layer layer-top"></div>
        <div className="icing"></div>
        <div className="drip drip1"></div>
        <div className="drip drip2"></div>
        <div className="drip drip3"></div>
        {cut && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-transparent via-pink-300 to-transparent z-20"
            style={{ transform: "translateX(-50%)" }}
          />
        )}
        <div className="candle">
          {lit && <motion.div
            initial={{ opacity: 0, scaleY: 0.2, y: 10 }}
            animate={{ opacity: 1, scaleY: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.25, 0.1, 0.25, 1.0],
            }}
            className="flame"></motion.div>}
        </div>
      </motion.div>
    </div>
  )
}