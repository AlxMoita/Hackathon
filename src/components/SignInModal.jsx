import { Modal, Input, message } from "antd";
import { Heart } from "lucide-react";
import { useState } from "react";
import { loginUser, getUserFirstName, getUserLastName } from "../lib/firebase";

export default function SignInModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);

    try {
      const uid = await loginUser(email.trim(), password);

      // optional: grab profile data to prove login worked
      const firstName = await getUserFirstName(uid);
      const lastName = await getUserLastName(uid);

      message.success(`Welcome back ${firstName ?? ""} ${lastName ?? ""}`.trim());

      // send uid (and any user info) back to parent
      onLoginSuccess({ uid, email: email.trim(), firstName, lastName });

      onClose();
    } catch (err) {
      console.error(err);

      // nicer messages for common auth errors
      if (err.code === "auth/user-not-found") {
        message.error("No account found with that email.");
      } else if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        message.error("Wrong password.");
      } else if (err.code === "auth/invalid-email") {
        message.error("Please enter a valid email.");
      } else {
        message.error(err.message || "Sign in failed.");
      }
    } finally {
      setIsSigningIn(false);
    }
  };

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
          borderRadius: "32px",
          padding: 0,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(255, 183, 197, 0.2)",
        },
      }}
      closeIcon={
        <div className="bg-white/50 hover:bg-white rounded-full p-2 transition-colors mt-2 mr-2 shadow-sm">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 1L13 13M1 13L13 1"
              stroke="#64748B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
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
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-2">Email Address</label>
            <Input
              size="large"
              placeholder="hello@mama.com"
              className="rounded-2xl border-slate-200 hover:border-sakura focus:border-sakura p-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-2">Password</label>
            <Input.Password
              size="large"
              placeholder="••••••••"
              className="rounded-2xl border-slate-200 hover:border-sakura focus:border-sakura p-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full btn-primary !py-4 text-lg disabled:opacity-60"
              disabled={!email || !password || isSigningIn}
            >
              {isSigningIn ? "Signing In..." : "Sign In"}
            </button>
          </div>

          <p className="text-center text-slate-500 text-sm mt-6">
            Don't have an account?{" "}
            <a href="#" className="text-sakura font-semibold hover:text-pink-400">
              Join the Circle
            </a>
          </p>
        </form>
      </div>
    </Modal>
  );
}