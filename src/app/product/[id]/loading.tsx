import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl min-h-[80vh]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">

        {/* Left: Product Gallery Skeleton — matches aspect-[3/4] + 4-col thumbnails */}
        <div className="flex flex-col gap-4">
          <Skeleton className="aspect-[3/4] w-full rounded-xl" />
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-md" />
            ))}
          </div>
        </div>

        {/* Right: Product Details Skeleton */}
        <div className="flex flex-col pt-4 md:pt-10 gap-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-8 w-32" />
          <div className="space-y-2 mt-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          {/* Add to Cart area */}
          <div className="mt-6 space-y-4">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
          </div>

          {/* Accordion sections */}
          <div className="mt-4 border-t border-kv-sage pt-4 space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

      </div>
    </div>
  );
}
