import { ShoppingBag, Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";

export function CartSheet() {
  // Mock cart items for UI testing
  const cartItems = [
    { id: 1, name: "Emerald Handwoven Saree", price: 3200, qty: 1, size: "Free Size" },
    { id: 2, name: "Terracotta Cotton Kurti", price: 1850, qty: 2, size: "M" },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-foreground hover:text-kv-olive">
          <ShoppingBag className="h-6 w-6" />
          {/* Terracotta Notification Dot */}
          <span className="absolute top-1 right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kv-terracotta opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-kv-terracotta"></span>
          </span>
          <span className="sr-only">Open Cart</span>
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md flex flex-col bg-kv-offwhite border-l-kv-sage">
        <SheetHeader className="border-b border-border pb-4 text-left">
          <SheetTitle className="font-serif text-2xl text-kv-forest">Your Bag (3)</SheetTitle>
        </SheetHeader>
        
        {/* Cart Items Area */}
        <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-6 scrollbar-hide">
          {cartItems.map((item) => (
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
                  </div>
                  <button className="text-kv-olive hover:text-kv-terracotta transition-colors p-1 -mr-1">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  {/* Quantity Selector */}
                  <div className="flex items-center border border-kv-sage rounded-md overflow-hidden">
                    <button className="p-1.5 text-kv-forest hover:bg-kv-sage transition-colors"><Minus className="h-3 w-3" /></button>
                    <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                    <button className="p-1.5 text-kv-forest hover:bg-kv-sage transition-colors"><Plus className="h-3 w-3" /></button>
                  </div>
                  <p className="font-medium text-kv-forest">৳ {item.price.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Summary & Checkout */}
        <SheetFooter className="border-t border-border pt-6 pb-2 flex-col gap-4 sm:flex-col">
          <div className="flex justify-between text-lg font-medium text-kv-forest w-full">
            <span>Subtotal</span>
            <span>৳ {subtotal.toLocaleString()}</span>
          </div>
          <p className="text-sm text-kv-olive text-center w-full">Shipping & taxes calculated at checkout.</p>
          <Button className="w-full bg-kv-terracotta hover:bg-kv-terracotta/90 text-kv-offwhite h-14 text-lg rounded-full mt-2 shadow-md">
            Proceed to Checkout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}