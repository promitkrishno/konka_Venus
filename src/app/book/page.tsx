"use client";

import { useState } from "react";
import { createAppointment } from "@/actions/appointment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarDays, CheckCircle2 } from "lucide-react";

export default function BookAppointmentPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleBooking(formData: FormData) {
    setIsSubmitting(true);
    const result = await createAppointment(formData);
    
    if (result.success) {
      setIsSuccess(true);
    } else {
      alert("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-2xl text-center min-h-[60vh] flex flex-col items-center justify-center">
        <CheckCircle2 className="h-16 w-16 text-kv-forest mb-6" />
        <h1 className="font-serif text-4xl font-bold text-kv-forest mb-4">Request Received!</h1>
        <p className="text-lg text-kv-olive mb-8">
          Thank you for booking a consultation. Our team will contact you shortly to confirm the exact time for your custom measurement session.
        </p>
        <Button onClick={() => window.location.reload()} variant="outline" className="border-kv-sage text-kv-forest">
          Book Another Session
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl min-h-[80vh]">
      <div className="flex flex-col items-center text-center mb-10">
        <CalendarDays className="h-12 w-12 text-kv-forest mb-4" />
        <h1 className="font-serif text-4xl font-bold text-kv-forest mb-3">Book a Consultation</h1>
        <p className="text-kv-olive max-w-lg text-lg">
          Need a custom fit? Schedule an in-person measurement and styling session at our boutique.
        </p>
      </div>

      <div className="bg-kv-sage/20 p-6 md:p-10 rounded-2xl border border-kv-sage">
        <form action={handleBooking} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-kv-forest mb-1 block">Full Name</label>
              <Input name="name" placeholder="e.g., Jane Doe" required className="bg-white border-kv-sage h-12" />
            </div>
            <div>
              <label className="text-sm font-medium text-kv-forest mb-1 block">Phone Number</label>
              <Input name="phone" type="tel" placeholder="017..." required className="bg-white border-kv-sage h-12" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-kv-forest mb-1 block">Preferred Date</label>
            {/* Using standard HTML date picker for immediate simplicity and broad mobile support */}
            <input 
              name="date" 
              type="date" 
              required
              min={new Date().toISOString().split("T")[0]}
              className="w-full flex h-12 rounded-md border border-kv-sage bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-kv-forest text-kv-forest"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-kv-forest mb-1 block">Notes & Requirements</label>
            <textarea 
              name="notes" 
              rows={4} 
              placeholder="Tell us what you are looking for (e.g., Custom measurements for a wedding saree...)"
              className="w-full rounded-md border border-kv-sage bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-kv-forest text-kv-forest"
            />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-kv-terracotta hover:bg-kv-terracotta/90 text-kv-offwhite h-14 text-lg rounded-full shadow-md mt-2"
          >
            {isSubmitting ? "Submitting Request..." : "Request Appointment"}
          </Button>
        </form>
      </div>
    </div>
  );
}