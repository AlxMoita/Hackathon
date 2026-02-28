import { Modal, Input } from 'antd';
import { Heart } from 'lucide-react';

export default function SignInModal({ isOpen, onClose, onLoginSuccess }) {
    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={480}
            centered
            className="custom-modal"
            styles={{
                content: {
                    borderRadius: '32px',
                    padding: 0,
                    overflow: 'hidden',
                    boxShadow: '0 20px 60px rgba(255, 183, 197, 0.2)',
                },
            }}
            closeIcon={
                <div className="bg-white/50 hover:bg-white rounded-full p-2 transition-colors mt-2 mr-2 shadow-sm">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L13 13M1 13L13 1" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            }
        >
            {/* Modal Header */}
            <div className="bg-sakura/20 px-8 pt-12 pb-8 text-center relative overflow-hidden">
                <div className="absolute -top-10 -right-10 text-white/50">
                    <Heart className="w-32 h-32 fill-current" />
                </div>
                <div className="relative z-10 flex flex-col items-center">
                    <div className="bg-white p-3 rounded-full mb-4 shadow-sm inline-block">
                        <Heart className="w-8 h-8 text-sakura fill-sakura" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Welcome Back, Mama!</h2>
                    <p className="text-sakura font-medium mt-2 text-lg">We missed you.</p>
                </div>
            </div>

            {/* Modal Body */}
            <div className="px-8 py-8 bg-white">
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLoginSuccess(); }}>
                    <div>
                        <label className="block text-sm font-semibold text-slate-600 mb-2">Email Address</label>
                        <Input
                            size="large"
                            placeholder="hello@mama.com"
                            className="rounded-2xl border-slate-200 hover:border-sakura focus:border-sakura p-3"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-600 mb-2">Password</label>
                        <Input.Password
                            size="large"
                            placeholder="••••••••"
                            className="rounded-2xl border-slate-200 hover:border-sakura focus:border-sakura p-3"
                        />
                    </div>
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full btn-primary !py-4 text-lg"
                        >
                            Sign In
                        </button>
                    </div>
                    <p className="text-center text-slate-500 text-sm mt-6">
                        Don't have an account? <a href="#" className="text-sakura font-semibold hover:text-pink-400">Join the Circle</a>
                    </p>
                </form>
            </div>
        </Modal>
    );
}
