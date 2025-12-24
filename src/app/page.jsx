"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import CountdownScreen from "@/components/screens/CountdownScreen"
import LoaderScreen from "@/components/screens/LoaderScreen"
import IntroScreen from "@/components/screens/IntroScreen"
import RelationshipCardsScreen from "@/components/screens/RelationshipCardsScreen"
import BalloonAnimation from "@/components/BalloonAnimation"
import HappyBirthdayBanner from "@/components/HappyBirthdayBanner"
import CakeScreen from "@/components/screens/CakeScreen"
import UpsDownsScreen from "@/components/screens/UpsDownsScreen"
import PhotosScreen from "@/components/screens/PhotosScreen"
import MessageScreen from "@/components/screens/MessageScreen"
import FinalScreen from "@/components/screens/FinalScreen"

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [showBalloons, setShowBalloons] = useState(false)
  const [showBanner, setShowBanner] = useState(false)

  const screens = [
    <CountdownScreen key="countdown" onDone={() => setCurrentScreen(1)} />,
    <LoaderScreen key="loader" onDone={() => setCurrentScreen(2)} />,
    <IntroScreen key="intro" onNext={() => setCurrentScreen(3)} />,
    <RelationshipCardsScreen key="relationship" onNext={() => {
      setShowBalloons(true)
      setShowBanner(true)
      setTimeout(() => setCurrentScreen(4), 500)
    }} />,
    <CakeScreen key="cake" onNext={() => {
      setShowBalloons(false)
      setShowBanner(false)
      setCurrentScreen(5)
    }} />,
    <UpsDownsScreen key="upsdowns" onNext={() => setCurrentScreen(6)} />,
    <PhotosScreen key="photos" onNext={() => setCurrentScreen(7)} />,
    <MessageScreen key="message" onNext={() => setCurrentScreen(8)} />,
    <FinalScreen key="final" />,
  ]

  return (
    <main className={`min-h-screen overflow-hidden relative ${currentScreen === 0 ? '' : 'bg-gradient-to-tr from-rose-950/40 via-black to-rose-950/40'}`}>
      {showBalloons && (
        <BalloonAnimation onComplete={() => setShowBalloons(false)} />
      )}
      
      {showBanner && <HappyBirthdayBanner />}

      {/* Countdown screen renders separately to cover full screen */}
      {currentScreen === 0 && screens[0]}

      <div className={`relative z-10 flex min-h-screen items-center justify-center p-4 md:p-6 ${currentScreen === 0 ? 'hidden' : ''}`}>
        <AnimatePresence mode="wait">
          {currentScreen !== 0 && (
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
              exit={{ opacity: 0, transition: { duration: 0.8 } }}
              transition={{ duration: 0.8 }}
              className={`w-full ${currentScreen === 7 ? "max-w-7xl" : "max-w-3xl md:max-w-4xl"}`}
            >
              {screens[currentScreen]}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
