import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Skeleton — matches min-h-[90vh] CinematicHero */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-kv-forest">
        <div className="absolute inset-0 bg-kv-forest" />
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center gap-6 mt-16">
          <Skeleton className="h-4 w-48 bg-white/10" />
          <Skeleton className="h-14 w-[80%] max-w-lg bg-white/10 rounded-lg" />
          <Skeleton className="h-6 w-[60%] max-w-md bg-white/10" />
          <Skeleton className="h-14 w-52 bg-white/10 rounded-full mt-8" />
        </div>
      </section>

      {/* Category Circles Skeleton — matches py-16 + 5 circles w-32/md:w-48 */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="flex gap-6 overflow-hidden pb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="shrink-0 flex flex-col items-center gap-4">
              <Skeleton className="w-32 h-32 md:w-48 md:h-48 rounded-full" />
              <Skeleton className="h-5 w-20" />
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals Grid Skeleton — matches lg:grid-cols-4, aspect-[3/4] */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto w-full border-t border-kv-sage/30">
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-5 w-20" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <Skeleton className="aspect-[3/4] w-full rounded-lg" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-5 w-24" />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
