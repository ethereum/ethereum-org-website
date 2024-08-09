import { cn } from "@/lib/utils/cn"

const Title = ({ className }) => (
  <div className={cn("flex flex-col", className)}>
    <div className="w-fit rounded-full bg-primary-low-contrast px-4 py-0 text-sm uppercase text-primary">
      Use Cases
    </div>
    <h2 className="mb-4 me-4 mt-2 text-5xl font-black xl:mb-6 xl:text-7xl">
      A new way to use the internet
    </h2>
  </div>
)

export default Title
