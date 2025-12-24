"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Heart } from "lucide-react"

export default function HeartPopup({ isOpen, onClose, daysLeft }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Paper Popup */}
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="pointer-events-auto relative max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Paper Effect */}
              <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 rounded-lg shadow-2xl p-8 md:p-10 relative overflow-hidden">
                {/* Paper texture lines */}
                <div className="absolute inset-0 opacity-10">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-full h-px bg-gray-400"
                      style={{ top: `${i * 5}%` }}
                    />
                  ))}
                </div>

                {/* Folded corner effect */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-pink-200/50 to-transparent transform rotate-45 translate-x-8 -translate-y-8" />

                {/* Content */}
                <div className="relative z-10">
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-pink-400 hover:text-pink-600 transition-colors"
                  >
                    <X size={24} />
                  </button>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      className="mb-6 flex justify-center"
                    >
                      <Heart className="w-16 h-16 text-pink-500 fill-pink-500" />
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-3xl md:text-4xl font-bold text-pink-800 mb-4"
                      style={{ fontFamily: "cursive" }}
                    >
                      Hey Sweet Heart 💕
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-xl md:text-2xl text-pink-700 font-semibold mb-2"
                    >
                      {daysLeft} {daysLeft === 1 ? "day" : "days"} left
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-lg text-pink-600 mt-4"
                    >
                      for your special day! 🎉
                    </motion.p>
                  </motion.div>
                </div>

                {/* Shadow effect */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-11/12 h-4 bg-black/20 blur-xl rounded-full" />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

