"use client";

import Image from "next/image";
import { X, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetFooter 
} from "@/components/ui/sheet";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, cartTotal, cartCount } = useCart();

  const handleCheckout = () => {
    if (cart.length === 0) return;

    let message = "Hi Clothbeam, I would like to place an order for the following items:\n\n";
    
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*${item.size ? ` (Size: ${item.size})` : ""}\n`;
      message += `   Qty: ${item.quantity}\n`;
      message += `   Price: ₹${item.price.toLocaleString("en-IN")}\n\n`;
    });

    message += `*Total Amount: ₹${cartTotal.toLocaleString("en-IN")}*\n\n`;
    message += "Please confirm my order!";

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "918982872622"; // Business number from contact page
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="bg-white p-0 flex flex-col h-full sm:max-w-md border-l border-brand-beige/20 shadow-2xl">
        <SheetHeader className="p-6 border-b border-gray-100 flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-brand-black rounded-xl flex items-center justify-center text-brand-gold">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <SheetTitle className="text-xl font-bold text-brand-black">Your Cart</SheetTitle>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{cartCount} Items</p>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="h-20 w-20 bg-brand-ivory rounded-full flex items-center justify-center text-gray-300">
                <ShoppingBag className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-brand-black">Your cart is empty</h3>
              <p className="text-gray-500 max-w-[200px]">Looks like you haven't added anything yet.</p>
              <Button 
                onClick={onClose}
                className="bg-brand-black text-white hover:bg-brand-gold px-8 h-12 rounded-full"
              >
                Start Shopping
              </Button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4 group">
                <div className="relative h-24 w-20 bg-brand-ivory rounded-xl overflow-hidden shrink-0 border border-gray-100">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className="object-cover transition-transform group-hover:scale-110"
                    sizes="80px"
                  />
                </div>
                <div className="flex-grow flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-brand-black leading-tight group-hover:text-brand-gold transition-colors">{item.name}</h4>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    {item.size && (
                      <p className="text-xs font-bold text-brand-gold mt-1 uppercase tracking-tighter">Size: {item.size}</p>
                    )}
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-2 py-1">
                      <span className="text-xs font-bold">Qty: {item.quantity}</span>
                    </div>
                    <p className="font-bold text-brand-black">₹{item.price.toLocaleString("en-IN")}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <SheetFooter className="p-6 border-t border-gray-100 bg-gray-50/50 flex-none">
            <div className="w-full space-y-4">
              <div className="flex justify-between items-center text-gray-500 text-sm">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between items-center text-gray-500 text-sm">
                <span>Shipping</span>
                <span className="text-green-600 font-medium uppercase text-[10px] tracking-widest bg-green-50 px-2 py-0.5 rounded">Calculated at checkout</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xl font-bold text-brand-black">Total</span>
                <span className="text-2xl font-bold text-brand-gold font-heading">₹{cartTotal.toLocaleString("en-IN")}</span>
              </div>
              <Button 
                onClick={handleCheckout}
                className="w-full bg-brand-black text-white hover:bg-brand-gold h-14 text-lg font-bold group shadow-xl shadow-brand-black/10 active:scale-[0.98] transition-all"
              >
                Checkout Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
