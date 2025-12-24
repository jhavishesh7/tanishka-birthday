"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import GradientButton from "../GradientButton"
import { ArrowRight, Heart } from "lucide-react";

export default function MessageScreen({ onNext }) {
    const [flipped, setFlipped] = useState(false);

    return (
        <div className="px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-10 text-center">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 drop-shadow mb-4 sm:mb-6 leading-tight px-2"
            >
                A Special Message
            </motion.h2>

            <div className="mx-auto relative w-full max-w-3xl flex justify-center px-2">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="h-auto max-w-xl bg-gradient-to-br from-pink-200 via-pink-100 to-pink-50 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 text-center"
                >
                    <p className="text-[#301733] text-sm sm:text-base md:text-lg leading-relaxed overflow-y-auto max-h-[300px] sm:max-h-[400px] pr-1 sm:pr-2">
                        Happy Birthday, Puntuu! You deserve all the happiness, love, and smiles in the world today and always.
                        You have this special way of making everything around you brighter, your smile, your kindness, and the way
                        you make people feel truly cared for. I hope your day is filled with laughter, surprises, and moments that
                        make your heart happy. You’re truly one of a kind, and I just want you to know how special you are.
                        Keep being the amazing person you are, spreading joy wherever you go. Wishing you endless happiness,
                        success, and all the sweet things life has to offer. 💗
                        Keep being the amazing person you are, spreading joy wherever you go. Wishing you endless happiness,
                    </p>
                </motion.div>
            </div>

            {/* Beautiful Romantic Outro */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="mt-8 sm:mt-10 md:mt-12 max-w-2xl mx-auto px-2"
            >
                <div className="relative">
                    {/* Decorative hearts */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2, type: "spring" }}
                        className="absolute -top-4 -left-4 sm:-left-8"
                    >
                        <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400 fill-pink-400/50" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2.2, type: "spring" }}
                        className="absolute -top-4 -right-4 sm:-right-8"
                    >
                        <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 fill-purple-400/50" />
                    </motion.div>

                    {/* Main outro message */}
                    <div className="bg-gradient-to-br from-pink-500/30 via-purple-500/30 to-fuchsia-500/30 backdrop-blur-md border-2 border-pink-400/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
                        {/* Animated background glow */}
                        <motion.div
                            className="absolute inset-0 opacity-20"
                            animate={{
                                background: [
                                    "radial-gradient(circle at 0% 50%, rgba(255,105,180,0.3), transparent)",
                                    "radial-gradient(circle at 100% 50%, rgba(192,132,252,0.3), transparent)",
                                    "radial-gradient(circle at 0% 50%, rgba(255,105,180,0.3), transparent)",
                                ],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />

                        <div className="relative z-10">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.8, type: "spring" }}
                                className="flex justify-center mb-4 sm:mb-6"
                            >
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <Heart className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-pink-400 fill-pink-400" />
                                </motion.div>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2 }}
                                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-fuchsia-300 mb-4 sm:mb-6 leading-tight"
                                style={{
                                    fontFamily: "cursive",
                                    filter: "drop-shadow(0 0 10px rgba(255,105,180,0.5))",
                                }}
                            >
                                I love you, sweet heart
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2.3 }}
                                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-pink-100 font-medium mb-3 sm:mb-4 leading-relaxed"
                            >
                                I'll always stay with you no matter what
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2.6 }}
                                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-fuchsia-400"
                                style={{
                                    filter: "drop-shadow(0 0 15px rgba(255,105,180,0.6))",
                                }}
                            >
                                You're my heart 💕
                            </motion.p>
                        </div>
                    </div>
                </div>

                {/* Next Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3 }}
                    className="mt-8 sm:mt-10 flex justify-center"
                >
                    <GradientButton onClick={onNext}>
                        Continue
                        <ArrowRight size={20} className="mt-0.5" />
                    </GradientButton>
                </motion.div>
            </motion.div>
        </div>
    )
}