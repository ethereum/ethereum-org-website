import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid secret" })
  }

  const path = req.query.path as string
  console.log("Revalidating", path)

  try {
    if (path) {
      await res.revalidate(path)
      return res.json({ revalidated: true })
    }
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating")
  }

  return res.status(200)
}
