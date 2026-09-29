
"use client";
import Link from "next/link"
import { ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { useCart } from "@/lib/store/useCart";

export function CartSheet() {
  const { items, removeItem, getTotal } = useCart();
  const subtotal = getTotal();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-foreground hover:text-kv-olive">
          <ShoppingBag className="h-6 w-6" />
          
          {/* Dynamic Notification Dot */}
          {itemCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-kv-terracotta text-[9px] font-bold text-white shadow-sm">
              {itemCount}
            </span>
          )}
          <span className="sr-only">Open Cart</span>
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md flex flex-col bg-kv-offwhite border-l-kv-sage">
        <SheetHeader className="border-b border-border pb-4 text-left">
          <SheetTitle className="font-serif text-2xl text-kv-forest">Your Bag ({itemCount})</SheetTitle>
        </SheetHeader>
        
        {/* Cart Items Area */}
        <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-6 scrollbar-hide">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-kv-olive gap-4">
              <ShoppingBag className="h-12 w-12 opacity-20" />
              <p>Your bag is empty.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                {/* Item Image */}
                <div className="w-20 h-24 bg-kv-sage rounded-md flex-shrink-0 flex items-center justify-center">
                  <span className="text-[10px] uppercase tracking-widest text-kv-forest/50">Image</span>
                </div>
                
                {/* Item Details */}
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-medium text-kv-forest leading-tight">{item.name}</h4>
                      <p className="text-sm text-kv-olive mt-1">Size: {item.size}</p>
                      
                      {/* Display Custom Measurements if they exist */}
                      {item.customMeasurements && (
                        <p className="text-xs text-kv-terracotta mt-1 leading-snug">
                          <span className="font-semibold">Note:</span> {item.customMeasurements}
                        </p>
                      )}
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-kv-olive hover:text-kv-terracotta transition-colors p-1 -mr-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center text-sm">
                      <span className="text-kv-forest font-medium">Qty: {item.quantity}</span>
                    </div>
                    <p className="font-medium text-kv-forest">৳ {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <SheetFooter className="border-t border-border pt-6 pb-2 flex-col gap-4 sm:flex-col">
            <div className="flex justify-between text-lg font-medium text-kv-forest w-full">
              <span>Subtotal</span>
              <span>৳ {subtotal.toLocaleString()}</span>
            </div>
            <p className="text-sm text-kv-olive text-center w-full">Shipping & taxes calculated at checkout.</p>
            <Button asChild className="w-full bg-kv-terracotta hover:bg-kv-terracotta/90 text-kv-offwhite h-14 text-lg rounded-full mt-2 shadow-md">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}