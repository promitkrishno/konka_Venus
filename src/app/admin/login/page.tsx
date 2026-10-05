"use client";

import { useState } from "react";
import { loginAdmin } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(formData: FormData) {
    setIsLoading(true);
    setError("");
    const result = await loginAdmin(formData);
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-kv-sage flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-kv-forest/10">
        <div className="p-8 flex flex-col items-center">
          <div className="w-16 h-16 bg-kv-sage rounded-full flex items-center justify-center mb-6">
            <ShieldCheck className="w-8 h-8 text-kv-forest"/>
          </div>
          <h1 className="font-serif text-3xl font-bold text-kv-forest mb-2">Secure Portal</h1>
          <form action={handleLogin} className="w-full flex flex-col gap-4 mt-6">
            <Input name="email" placeholder="Admin Email" required type="email" className="h-12 border-kv-sage focus-visible:ring-kv-forest" />
            <Input name="password" placeholder="Password" required type="password" className="h-12 border-kv-sage focus-visible:ring-kv-forest" />
            {error && <p className="text-red-600 text-sm text-center font-medium bg-red-50 p-3 rounded-md">{error}</p>}
            <Button className="w-full h-12 bg-kv-forest hover:bg-kv-forest/90 text-white font-medium" disabled={isLoading} type="submit">
              {isLoading ? "Authenticating..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}