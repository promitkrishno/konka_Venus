import Link from "next/link";
import { ShoppingBag, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CartSheet } from "@/components/features/cart/CartSheet";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Mobile Menu (Left) */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <nav className="grid gap-6 text-lg font-medium mt-8 text-foreground">
                <Link href="/" className="hover:text-kv-olive transition-colors">Home</Link>
                <Link href="/shop" className="hover:text-kv-olive transition-colors">Shop All</Link>
                <Link href="/book" className="hover:text-kv-olive transition-colors">Book Appointment</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Nav (Left) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/shop" className="transition-colors hover:text-kv-olive">Shop</Link>
          <Link href="/book" className="transition-colors hover:text-kv-olive">Book Appointment</Link>
        </nav>

        {/* Logo (Center) */}
        <div className="flex-1 flex justify-center md:flex-none">
          <Link href="/" className="flex items-center space-x-2">
            {/* We will use a Serif font here to match your traditional aesthetic */}
            <span className="font-serif text-2xl font-bold tracking-tight text-foreground">
              Konka Venus
            </span>
          </Link>
        </div>

        {/* Cart / Actions (Right) */}
        <div className="flex items-center gap-4">
          <CartSheet />
        </div>

      </div>
    </header>
  );
}