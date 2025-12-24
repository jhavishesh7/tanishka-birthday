export default function GradientButton({ className = "", children, ...props }) {
    return (
        <button
            {...props}
            className={[
                "px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-full text-white font-semibold",
                "text-sm sm:text-base md:text-lg",
                "bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500",
                "shadow-[0_0_28px_rgba(244,114,182,0.35)]",
                "transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-95",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300/70 flex gap-2 items-center justify-center",
                "touch-manipulation min-h-[44px]",
                className,
            ].join(" ")}
        >
            {children}
        </button>
    )
}
