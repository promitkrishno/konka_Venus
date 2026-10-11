import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-kv-forest text-kv-sage pt-16 pb-8 px-4 md:px-8 border-t border-kv-sage/20 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        
        {/* Left Column: Brand & Intro */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="font-serif text-3xl font-bold text-white tracking-wide hover:text-kv-terracotta transition-colors w-fit">
            Konka Venus
          </Link>
          <p className="text-sm md:text-base leading-relaxed max-w-md font-light text-kv-sage/90">
            কঙ্কা ভেনাস Konka Venus – Art & Design Gallery.<br/>
            The Way We Belong is Art, Poetry & Love! ♀
          </p>
          
          <div className="flex items-center gap-5 mt-2">
            <a 
              href="https://www.facebook.com/profile.php?id=61557849892736" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-kv-terracotta transition-colors"
              aria-label="Facebook"
            >
              <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.5 1.6-1.5h1.7V3.2c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.2H7.3v3.2h2.8V21h3.4Z" />
              </svg>
            </a>
            <a 
              href="https://www.instagram.com/konkaftvenus/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-kv-terracotta transition-colors"
              aria-label="Instagram"
            >
              <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Column: Policies & Info */}
        <div className="flex flex-col md:items-end gap-3">
          <h3 className="font-medium text-white mb-3 uppercase tracking-[0.15em] text-sm">Customer Care</h3>
          <Link href="/about" className="text-sm text-kv-sage/80 hover:text-white transition-colors">
            About Konka Venus
          </Link>
          <Link href="/shipping" className="text-sm text-kv-sage/80 hover:text-white transition-colors">
            Shipping & Delivery Information
          </Link>
          <Link href="/refund-policy" className="text-sm text-kv-sage/80 hover:text-white transition-colors">
            Refund & Returns Policy
          </Link>
          <Link href="/privacy-policy" className="text-sm text-kv-sage/80 hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm text-kv-sage/80 hover:text-white transition-colors">
            Terms & Conditions
          </Link>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Developer Credit */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-kv-sage/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light tracking-wide text-kv-sage/60">
        <p>&copy; {new Date().getFullYear()} Konka Venus. All rights reserved.</p>
        <p>
          Designed & Developed by{" "}
          <a 
            href="https://github.com/promitkrishno" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium text-kv-sage hover:text-kv-terracotta transition-colors"
          >
            Promit Krishno Sarker
          </a>
        </p>
      </div>
    </footer>
  );
}