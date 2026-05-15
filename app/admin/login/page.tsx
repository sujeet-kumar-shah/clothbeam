"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import { motion } from "framer-motion";
import { Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Mock Login Logic
    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        // In a real app, set a cookie or JWT
        localStorage.setItem("clothbeam_admin_auth", "true");
        router.push("/admin/dashboard");
      } else {
        setError("Invalid username or password");
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-brand-ivory flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full z-0 opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] bg-brand-gold rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[60%] bg-brand-beige rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-brand-beige/50">
          <div className="p-8 md:p-12">
            {/* Logo & Header */}
            <div className="text-center mb-10">
              <div className="relative h-16 w-16 mx-auto mb-6 bg-brand-black p-3 rounded-2xl shadow-lg">
                <NextImage 
                  src="/logo.png" 
                  alt="Clothbeam Logo" 
                  fill 
                  className="object-contain p-2"
                />
              </div>
              <h1 className="font-heading text-3xl font-bold text-brand-black mb-2">Admin Portal</h1>
              <p className="text-gray-500">Access the Clothbeam management dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 flex items-center gap-2"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-red-600"></div>
                  {error}
                </motion.div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-black flex items-center gap-2">
                  <User className="h-4 w-4 text-brand-gold" /> Username
                </label>
                <Input 
                  type="text"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 bg-gray-50 border-gray-200 focus:border-brand-gold focus:ring-brand-gold transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-black flex items-center gap-2">
                  <Lock className="h-4 w-4 text-brand-gold" /> Password
                </label>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 bg-gray-50 border-gray-200 focus:border-brand-gold focus:ring-brand-gold transition-all pr-12"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-gold transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer text-gray-600">
                  <input type="checkbox" className="rounded border-gray-300 text-brand-gold focus:ring-brand-gold" />
                  Remember me
                </label>
                <button type="button" className="text-brand-gold font-bold hover:underline">Forgot password?</button>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-brand-black text-white hover:bg-brand-gold h-14 text-lg font-bold shadow-lg shadow-brand-black/10 transition-all active:scale-[0.98]"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    Sign In <ArrowRight className="h-5 w-5" />
                  </div>
                )}
              </Button>
            </form>
          </div>
          
          <div className="bg-gray-50 p-6 text-center border-t border-brand-beige/30">
            <p className="text-sm text-gray-500 italic">Authorized personnel only</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
