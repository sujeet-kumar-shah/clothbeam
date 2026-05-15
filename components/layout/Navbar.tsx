"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { CartDrawer } from "./CartDrawer";
import { SearchOverlay } from "./SearchOverlay";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-brand-ivory/80 backdrop-blur-md shadow-sm py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-50 group">
            <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-white p-1.5 shadow-sm border border-brand-beige/20">
              <Image 
                src="/logo.png" 
                alt="Clothbeam Logo" 
                fill 
                className="object-contain transition-transform group-hover:scale-110"
                sizes="48px"
              />
            </div>
            <span className="font-heading text-2xl md:text-3xl font-bold tracking-tighter text-brand-black">
              Cloth<span className="text-brand-gold italic">beam</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium hover:text-brand-gold transition-colors"
            >
              Home
            </Link>
            <Link
              href="/collection"
              className="text-sm font-medium hover:text-brand-gold transition-colors"
            >
              Collection
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-brand-gold transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:text-brand-gold transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Icons */}
          <div className="hidden md:flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:text-brand-gold"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:text-brand-gold"
              onClick={() => alert("Wishlist coming soon! This will save your favorite items.")}
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:text-brand-gold relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-brand-gold text-white text-[10px] flex items-center justify-center font-bold border-2 border-brand-ivory animate-in zoom-in duration-300">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden z-50">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:text-brand-gold relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-brand-gold text-white text-[10px] flex items-center justify-center font-bold border-2 border-brand-ivory">
                  {cartCount}
                </span>
              )}
            </Button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-brand-black hover:text-brand-gold transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-brand-ivory pt-24 px-6 md:hidden flex flex-col gap-6"
          >
            <nav className="flex flex-col gap-6 text-xl font-heading">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-brand-gold transition-colors border-b border-brand-beige pb-4"
              >
                Home
              </Link>
              <Link
                href="/collection"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-brand-gold transition-colors border-b border-brand-beige pb-4"
              >
                Collection
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-brand-gold transition-colors border-b border-brand-beige pb-4"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-brand-gold transition-colors border-b border-brand-beige pb-4"
              >
                Contact
              </Link>
            </nav>
            
            <div className="flex items-center gap-6 mt-4">
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="flex flex-col items-center gap-2"
              >
                <Search className="h-6 w-6" />
                <span className="text-sm font-medium">Search</span>
              </button>
              <button 
                onClick={() => alert("Wishlist coming soon!")}
                className="flex flex-col items-center gap-2"
              >
                <Heart className="h-6 w-6" />
                <span className="text-sm font-medium">Wishlist</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
