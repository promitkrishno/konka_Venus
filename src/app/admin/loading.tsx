import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">

      {/* Dashboard Title */}
      <div className="flex items-center gap-3 mb-8">
        <Skeleton className="h-8 w-8 rounded" />
        <Skeleton className="h-9 w-56" />
      </div>

      {/* Section 1: Form + Inventory Table — matches lg:grid-cols-3 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Add Product Form Skeleton */}
        <div className="lg:col-span-1 bg-kv-sage/20 p-6 rounded-xl border border-kv-sage">
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-20 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-32 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>

        {/* Right: Inventory Table Skeleton */}
        <div className="lg:col-span-2">
          <Skeleton className="h-6 w-44 mb-4" />
          <div className="bg-white border border-kv-sage rounded-xl overflow-hidden shadow-sm">
            {/* Table Header */}
            <div className="bg-kv-sage/30 px-4 py-3 flex gap-4">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-24 flex-1" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
            {/* Table Rows */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="px-4 py-3 flex items-center gap-4 border-t border-kv-sage">
                <Skeleton className="h-10 w-10 rounded" />
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-8 w-8 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 2: Gallery */}
      <div className="mt-16 border-t border-kv-sage pt-12">
        <div className="flex items-center gap-3 mb-8">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-9 w-64" />
        </div>
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>

      {/* Section 3: Appointments */}
      <div className="mt-16 border-t border-kv-sage pt-12">
        <div className="flex items-center gap-3 mb-8">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-9 w-60" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white border border-kv-sage rounded-xl p-6 shadow-sm space-y-4">
              <div className="flex justify-between border-b border-kv-sage pb-4">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-5 w-48" />
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Orders */}
      <div className="mt-16 border-t border-kv-sage pt-12">
        <div className="flex items-center gap-3 mb-8">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-9 w-44" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="bg-white border border-kv-sage rounded-xl p-6 shadow-sm space-y-4">
              <div className="flex justify-between border-b border-kv-sage pb-4">
                <div className="space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-3 w-28" />
                </div>
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-16 w-full rounded-md" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
