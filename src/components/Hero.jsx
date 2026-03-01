import { Heart, Baby, Sun } from 'lucide-react';

export default function Hero({ onStartClick }) {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex justify-center items-center">
            {/* Decorative background elements */}
            <div className="absolute top-20 left-10 text-sakura/20 animate-pulse hidden md:block">
                <Heart className="w-24 h-24" />
            </div>
            <div className="absolute bottom-20 right-10 text-mint/40 animate-bounce hidden md:block">
                <Sun className="w-32 h-32" />
            </div>
            <div className="absolute top-40 right-1/4 text-sakura/10 rotate-12 hidden lg:block">
                <Baby className="w-40 h-40" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint/30 text-teal-700 font-medium mb-8">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
                    </span>
                    Your AI Companion is Online
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                    Your Journey, <br className="hidden md:block" />
                    <span className="text-sakura relative inline-block">
                        Held with Care.
                        <svg className="absolute w-full h-4 -bottom-2 left-0 text-mint" viewBox="0 0 100 20" preserveAspectRatio="none">
                            <path d="M0 10 Q 50 20 100 10" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                        </svg>
                    </span>
                </h1>

                <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-10 leading-relaxed font-medium">
                    A safe, private space to track your pregnancy milestones and journal your thoughts with our AI-powered safety companion.
                </p>

                <button className="btn-primary text-lg" onClick={onStartClick}>
                    Start Your 40 Weeks
                </button>
            </div>
        </section>
    );
}
