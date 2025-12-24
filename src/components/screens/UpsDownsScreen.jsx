"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import GradientButton from "../GradientButton"
import { Heart, ArrowRight } from "lucide-react"

export default function UpsDownsScreen({ onNext }) {
  const [showPromise, setShowPromise] = useState(false)

  return (
    <div className="px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto px-2"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 drop-shadow mb-6 sm:mb-8"
        >
          Our Journey Together
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-fuchsia-500/20 backdrop-blur-md border-2 border-pink-500/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl mb-6 sm:mb-8"
        >
          <p className="text-base sm:text-lg md:text-xl text-pink-100 leading-relaxed mb-4 sm:mb-6 px-1">
            We've had our ups and downs, moments of joy and challenges that tested us. 
            Through it all, we've learned, grown, and become stronger together.
          </p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center gap-4 mb-6"
          >
            <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
            <Heart className="w-6 h-6 text-purple-400 fill-purple-400" />
            <Heart className="w-6 h-6 text-fuchsia-400 fill-fuchsia-400" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-sm sm:text-base md:text-lg text-pink-200/80 italic px-1"
          >
            Every challenge we face makes our bond stronger. Every moment we share is a treasure.
          </motion.p>
        </motion.div>

        <AnimatePresence>
          {!showPromise ? (
            <motion.div
              key="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 1.2 }}
            >
              <GradientButton onClick={() => setShowPromise(true)}>
                <Heart size={20} />
                See My Promise
              </GradientButton>
            </motion.div>
          ) : (
            <motion.div
              key="promise"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-fuchsia-500/30 backdrop-blur-md border-2 border-purple-400/40 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl"
              >
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-fuchsia-300 mb-4 sm:mb-6 px-1"
                >
                  My Promise to You
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg sm:text-xl md:text-2xl text-white leading-relaxed mb-3 sm:mb-4 px-1"
                >
                  No matter what challenges come our way,
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-fuchsia-400 px-1"
                >
                  We will overcome them together! 💪💕
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="mt-8"
                >
                  <GradientButton onClick={onNext}>
                    Continue
                    <ArrowRight size={20} className="mt-0.5" />
                  </GradientButton>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

