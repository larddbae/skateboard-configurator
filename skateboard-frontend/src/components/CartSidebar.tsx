"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CartSidebar() {
  const { isOpen, toggleCart, items, subtotal, removeFromCart, updateQuantity } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] transition-opacity"
          onClick={toggleCart}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-suburbia-blue transform transition-transform duration-300 ease-in-out border-l-4 border-black flex flex-col shadow-2xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Background Texture */}
        <div className="absolute inset-0 bg-grain-texture opacity-30 pointer-events-none z-0" />

        {/* Header */}
        <div className="relative z-10 p-6 flex justify-between items-center border-b-4 border-black bg-suburbia-blue">
          <div className="flex items-center gap-3">
            <h2 className="text-4xl font-black font-rubik text-white tracking-tighter uppercase transform -rotate-1 drop-shadow-md">
              Your Cart
            </h2>
            <div className="bg-suburbia-purple text-white font-mono font-bold w-8 h-8 rounded-full flex items-center justify-center border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)]">
              {items.length}
            </div>
          </div>
          <button
            onClick={toggleCart}
            className="text-white hover:text-suburbia-lime transition-colors"
          >
            <span className="material-icons text-4xl drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
              close
            </span>
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 relative z-10 space-y-6">
          {items.length === 0 ? (
            <div className="text-center text-white font-mono py-10 opacity-70">
              <p>Your cart is empty.</p>
              <p className="mt-2 text-sm">Go shred some spots and come back.</p>
            </div>
          ) : (
            items.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="relative bg-white p-4 border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] transform hover:rotate-1 transition-transform group"
              >
                {/* Remove Button */}
                <div className="absolute -top-3 -right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white w-8 h-8 rounded-full border-2 border-black flex items-center justify-center hover:bg-red-600 transition shadow-[2px_2px_0_rgba(0,0,0,1)]"
                  >
                    <span className="material-icons text-sm font-bold">close</span>
                  </button>
                </div>

                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-100 border-2 border-dashed border-gray-400 flex-shrink-0 flex items-center justify-center p-2 relative overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="object-contain h-full w-full transform scale-125"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-rubik font-black text-xl uppercase leading-none text-black mb-1">
                        {item.name}
                      </h3>
                      <p className="font-roboto text-sm text-gray-600">
                        {item.size && `Size: ${item.size}`}
                        {item.size && item.gripTape && " • "}
                        {item.gripTape && item.gripTape}
                      </p>
                    </div>
                    <div className="flex justify-between items-end mt-2">
                       {/* Qty Controls */}
                      <div className="flex items-center border-2 border-black bg-gray-100 rounded-sm">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-0 hover:bg-suburbia-lime transition-colors border-r-2 border-black text-black font-bold text-lg"
                        >
                          -
                        </button>
                        <span className="px-3 font-mono font-bold text-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-0 hover:bg-suburbia-lime transition-colors border-l-2 border-black text-black font-bold text-lg"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-black text-xl text-black">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Promo */}
          <div className="bg-suburbia-lime/90 p-3 border-2 border-black border-dashed transform rotate-1 text-center shadow-lg">
            <p className="font-marker text-lg text-black">
              Free shipping on orders over $100!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-20">
            {/* Torn Edge Effect - using SVG or CSS clip-path? User used CSS in code.html. I need to apply class 'torn-edge' and define it globally or inline. I'll use inline style for simplicity or define in component */}
          <div
            className="absolute -top-4 left-0 w-full h-4 bg-paper-cream transform rotate-180 z-20"
            style={{
              clipPath:
                "polygon(0% 0%, 100% 0%, 100% 100%, 95% 98%, 90% 100%, 85% 98%, 80% 100%, 75% 98%, 70% 100%, 65% 98%, 60% 100%, 55% 98%, 50% 100%, 45% 98%, 40% 100%, 35% 98%, 30% 100%, 25% 98%, 20% 100%, 15% 98%, 10% 100%, 5% 98%, 0% 100%)",
            }}
          />
          
          <div className="bg-paper-cream p-8 pb-10 space-y-4 relative shadow-[0_-4px_10px_rgba(0,0,0,0.2)]">
             {/* Tape */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-yellow-200/80 w-32 h-8 rotate-2 z-30 shadow-sm border border-white/40" />

            {/* Promo Input */}
            <div className="flex gap-2 mb-6">
              <input
                className="flex-1 bg-white border-2 border-black p-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-suburbia-purple placeholder-gray-500 text-black"
                placeholder="PROMO CODE"
                type="text"
              />
              <button className="bg-black text-white px-4 font-bold uppercase text-sm hover:bg-gray-800 transition border-2 border-black">
                Apply
              </button>
            </div>

            {/* Totals */}
            <div className="space-y-2 border-t-2 border-dashed border-gray-300 pt-4 font-mono text-black">
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="font-bold text-xl uppercase text-black">Total</span>
              <span className="font-black text-3xl text-suburbia-blue">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            {/* Checkout Button */}
            <Link href="/checkout" className="block w-full" onClick={toggleCart}>
                <button className="w-full bg-brand-orange hover:bg-orange-600 text-white font-black text-2xl uppercase py-4 border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 mt-4 relative group overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-2 font-rubik">
                    Checkout <span className="material-icons">arrow_forward</span>
                </span>
                <div className="absolute inset-0 bg-grain-texture opacity-20 group-hover:opacity-30 pointer-events-none" />
                </button>
            </Link>

            <div className="text-center mt-4">
              <button
                onClick={toggleCart}
                className="font-mono text-xs text-gray-500 underline decoration-dashed hover:text-black"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
