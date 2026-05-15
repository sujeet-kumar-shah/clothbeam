import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-black text-brand-ivory pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-white p-1.5 shadow-sm">
                <Image 
                  src="/logo.png" 
                  alt="Clothbeam Logo" 
                  fill 
                  className="object-contain transition-transform group-hover:scale-110"
                  sizes="48px"
                />
              </div>
              <span className="font-heading text-3xl font-bold tracking-tighter">
                Cloth<span className="text-brand-gold italic">beam</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm max-w-sm mt-4">
              Your Style, Your Way. Discover the finest selection of premium clothing for every occasion in Waidhan, India.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="https://www.instagram.com/clothbeam/" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold transition-colors text-white">
                <span className="h-5 w-5 text-white font-semibold">IG</span>
              </a>
              {/* Add other social icons if needed */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6 text-brand-gold">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/collection" className="text-gray-400 hover:text-white transition-colors text-sm">Shop Collection</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact Us</Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6 text-brand-gold">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/collection?category=casual" className="text-gray-400 hover:text-white transition-colors text-sm">Casual Wear</Link>
              </li>
              <li>
                <Link href="/collection?category=ethnic" className="text-gray-400 hover:text-white transition-colors text-sm">Ethnic Wear</Link>
              </li>
              <li>
                <Link href="/collection?category=shirts" className="text-gray-400 hover:text-white transition-colors text-sm">Premium Shirts</Link>
              </li>
              <li>
                <Link href="/collection?category=wedding" className="text-gray-400 hover:text-white transition-colors text-sm">Wedding Collection</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6 text-brand-gold">Visit Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  Clothbeam,<br />
                  Shop No 01, Hotel GS Plaza,<br />
                  near State Bank, Waidhan,<br />
                  Madhya Pradesh 486886
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-brand-gold shrink-0" />
                <span className="text-gray-400 text-sm">+91 89828 72622</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-brand-gold shrink-0" />
                <span className="text-gray-400 text-sm">contact@clothbeam.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Clothbeam. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Made with <span className="text-brand-gold">♥</span> in Waidhan
          </p>
        </div>
      </div>
    </footer>
  );
}
