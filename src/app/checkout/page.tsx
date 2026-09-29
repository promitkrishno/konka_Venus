"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/store/useCart";
import { createOrder } from "@/actions/checkout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = getTotal();
  const shipping = 120; // Standard inside Dhaka shipping cost
  const total = subtotal + shipping;

  async function handleCheckout(formData: FormData) {
    setIsSubmitting(true);
    
    // Call our secure server action
    const result = await createOrder(formData, items, total);
    
    if (result.success) {
      clearCart();
      alert(`Order Placed Successfully! Order ID: ${result.orderId}`);
      router.push("/"); // Redirect back home for now
    } else {
      alert("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center min-h-[60vh]">
        <h1 className="font-serif text-3xl font-bold text-kv-forest mb-4">Your bag is empty</h1>
        <Button onClick={() => router.push("/shop")} className="bg-kv-terracotta text-kv-offwhite rounded-full">
          Return to Shop
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl min-h-screen">
      <h1 className="font-serif text-3xl font-bold text-kv-forest mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Checkout Form */}
        <div>
          <form action={handleCheckout} className="flex flex-col gap-6">
            <div>
              <h2 className="font-medium text-xl text-kv-forest mb-4">Contact Details</h2>
              <div className="flex flex-col gap-4">
                <Input name="name" placeholder="Full Name" required className="bg-white border-kv-sage" />
                <Input name="phone" placeholder="Phone Number (e.g., 017...)" required className="bg-white border-kv-sage" />
                <Input name="address" placeholder="Full Delivery Address" required className="bg-white border-kv-sage" />
              </div>
            </div>

            <div>
              <h2 className="font-medium text-xl text-kv-forest mb-4">Payment Method</h2>
              <select 
                name="paymentMethod" 
                required 
                className="w-full flex h-10 rounded-md border border-kv-sage bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-kv-forest text-kv-forest"
              >
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="bKash">bKash (Integration coming soon)</option>
              </select>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-kv-forest hover:bg-kv-forest/90 text-kv-offwhite h-14 text-lg rounded-full shadow-md mt-4"
            >
              {isSubmitting ? "Processing..." : `Place Order - ৳ ${total.toLocaleString()}`}
            </Button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-kv-sage/20 p-6 rounded-xl border border-kv-sage h-fit">
          <h2 className="font-medium text-xl text-kv-forest mb-4">Order Summary</h2>
          <div className="flex flex-col gap-4 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-kv-forest">
                <div className="flex flex-col">
                  <span className="font-medium">{item.name} (x{item.quantity})</span>
                  <span className="text-kv-olive text-xs">Size: {item.size}</span>
                </div>
                <span>৳ {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-kv-sage pt-4 flex flex-col gap-2 text-sm text-kv-forest">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>৳ {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>৳ {shipping.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-kv-sage">
              <span>Total</span>
              <span>৳ {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}