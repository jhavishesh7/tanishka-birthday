"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-cards"
import { Mail } from "lucide-react"
import GradientButton from "../GradientButton"

export default function PhotosScreen({ onNext }) {
  const swiperRef = useRef(null)

  const photos = [
    "/images/1.jpeg",
    "/images/2.jpeg",
    "/images/3.jpeg",
    "/images/4.jpeg",
  ]

  return (
    <div className="px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-10">
      <div className="text-center mb-4 sm:mb-6 px-2">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 drop-shadow"
        >
          Some Sweet Moments
        </motion.h2>
        <p className="text-xs sm:text-sm text-rose-100/90 mt-1">(Swipe the cards)</p>
      </div>

      <div className="relative flex justify-center px-2">

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <Swiper
            effect="cards"
            grabCursor
            modules={[EffectCards]}
            onSwiper={(sw) => (swiperRef.current = sw)}
            className="w-[240px] h-[360px] sm:w-[280px] sm:h-[400px] md:w-[320px] md:h-[440px] lg:w-[340px] lg:h-[460px]"
          >
            {photos.map((src, i) => (
              <SwiperSlide key={i}>
                <div className="h-full w-full rounded-2xl">
                  <img
                    src={src}
                    alt={`Memory ${i + 1}`}
                    className="h-full w-full rounded-xl object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="mt-8 flex justify-center"
      >
        <GradientButton onClick={onNext}>
          <Mail size={20} className="mt-0.5" /> Open My Message
        </GradientButton>
      </motion.div>
    </div>
  )
}
