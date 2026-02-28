import { Heart } from 'lucide-react';

export default function Header({ onSignInClick }) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-md border-b justify-center items-center border-sakura/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2 cursor-pointer group">
                    <div className="bg-sakura/20 p-2 rounded-full group-hover:bg-sakura/30 transition-colors">
                        <Heart className="w-6 h-6 text-sakura fill-sakura" />
                    </div>
                    <span className="text-2xl font-bold text-slate-800 tracking-tight">Mama Circle</span>
                </div>
                <button
                    onClick={onSignInClick}
                    className="text-slate-600 hover:text-sakura font-medium px-6 py-2 rounded-full hover:bg-sakura/10 transition-colors cursor-pointer"
                >
                    Sign In
                </button>
            </div>
        </header>
    );
}
