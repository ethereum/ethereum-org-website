import Link from "next/link"

// TODO: add 404 page
export default function NotFound() {
  return (
    <div>
      <h2>Not Found Locale</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}
