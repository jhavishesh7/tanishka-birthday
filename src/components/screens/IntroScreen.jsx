"use client"

import GradientButton from "../GradientButton"
import { Gift } from "lucide-react"

export default function IntroScreen({ onNext }) {
    return (
        <div className="py-6 sm:py-8 md:py-10 lg:py-14 text-center px-4">
            <div className="flex flex-col items-center gap-4 sm:gap-6">
                <img
                    src="/gifs/intro.gif"
                    alt="Cute birthday animation topper"
                    className="w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px] object-cover"
                />

                <div className="px-2">
                    <h1 className="text-pretty text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 drop-shadow leading-tight"
                        style={{
                            filter: "drop-shadow(0 0 20px rgba(255,105,180,0.4))",
                        }}>
                        A Cutiepie was born today, 19 years ago!
                    </h1>
                    <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-pink-200 px-2">Yes, it's YOU! A little surprise awaits...</p>
                </div>

                <div className="mt-8">
                    <GradientButton
                        onClick={() => { onNext?.() }}
                    >
                        <Gift size={20} />
                        Start the surprise
                    </GradientButton>
                </div>
            </div>
        </div>
    )
}
