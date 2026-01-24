import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="mx-auto max-w-screen-xl px-4 py-12">
      <div className="mb-8">
        <Skeleton className="mb-4 h-10 w-64" />
        <Skeleton className="h-6 w-96" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-body-light p-6">
            <Skeleton className="mb-2 h-4 w-24" />
            <Skeleton className="mb-2 h-6 w-32" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </main>
  )
}
