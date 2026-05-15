"use client";

import { useState, useEffect } from "react";
import { Search, X, ArrowRight, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");

  // Disable scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const popularSearches = ["Silk Kurta", "Premium Shirts", "Wedding Suits", "Casual Polo"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-white flex flex-col"
        >
          {/* Header */}
          <div className="container mx-auto px-4 md:px-6 h-24 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-brand-black rounded-xl flex items-center justify-center text-brand-gold">
                <Search className="h-5 w-5" />
              </div>
              <span className="font-heading text-xl font-bold text-brand-black hidden sm:block">Clothbeam Search</span>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-brand-black" />
            </button>
          </div>

          {/* Search Input */}
          <div className="flex-grow container mx-auto px-4 md:px-6 pt-12">
            <div className="max-w-3xl mx-auto w-full">
              <div className="relative">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 text-brand-gold" />
                <input 
                  autoFocus
                  type="text"
                  placeholder="What are you looking for?"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-brand-beige focus:border-brand-black py-6 pl-12 text-2xl md:text-4xl font-heading outline-none transition-colors placeholder:text-gray-300"
                />
              </div>

              {/* Suggestions */}
              <div className="mt-12">
                <div className="flex items-center gap-2 text-brand-gold font-bold text-sm uppercase tracking-widest mb-6">
                  <TrendingUp className="h-4 w-4" /> Popular Searches
                </div>
                <div className="flex flex-wrap gap-3">
                  {popularSearches.map((item) => (
                    <button 
                      key={item}
                      onClick={() => setQuery(item)}
                      className="px-6 py-3 bg-brand-ivory rounded-full text-brand-black font-medium hover:bg-brand-gold hover:text-white transition-all shadow-sm border border-brand-beige/20"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Results Placeholder */}
              {query && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-16 space-y-6"
                >
                  <h3 className="text-xl font-bold text-brand-black">Searching for &quot;{query}&quot;...</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-brand-beige/30 hover:border-brand-gold transition-colors cursor-pointer group">
                        <div className="h-16 w-16 bg-brand-ivory rounded-xl overflow-hidden shrink-0"></div>
                        <div className="flex-grow">
                          <p className="font-bold text-brand-black group-hover:text-brand-gold transition-colors">Premium {query} Example</p>
                          <p className="text-sm text-gray-500">₹2,800</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-brand-gold transition-colors" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
