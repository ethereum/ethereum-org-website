import fs from "fs"
import { Readable } from "stream"
import { finished } from "stream/promises"
import ReadableStream from "stream/web"

import decompress from "decompress"

import type {
  BucketsList,
  DataDirectoryItem,
  NotionData,
  ParsedItem,
} from "./types"

export const downloadFile = async (url: string, writePath: string) => {
  // Get directory from writePath and ensure it exists
  const dir = writePath.substring(0, writePath.lastIndexOf("/"))
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

  // Remove old file at writePath if it exists
  if (fs.existsSync(writePath)) fs.rmSync(writePath)

  // Fetch data
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}`)

  const body = res.body as ReadableStream.ReadableStream<Uint8Array>

  const fileStream = fs.createWriteStream(writePath, { flags: "wx" })

  console.log("⬇ Downloading latest finished build to", writePath)

  await finished(Readable.fromWeb(body).pipe(fileStream))
  console.log("✅ Download complete")
}

export const decompressFile = async (filePath: string, targetDir: string) => {
  console.log(`🥡 Decompressing ${filePath} to ${targetDir}`)
  await decompress(filePath, targetDir)
  console.log("✅ Decompression complete.")
}

//! TODO: Fetch real data from Notion API
export const getBuckets = async (): Promise<BucketsList> => {
  const DUMMY_NOTION = {
    de: ["1) Homepage", "3) Exploring"],
    cs: [
      "1) Homepage",
      "07) With zeros",
      "23) Big Numbers",
      "11) Test",
      "3) Exploring",
    ],
    el: [],
  } as NotionData

  // Parse bucket numbers from names
  // ie: { de: ["1) Homepage", "3) Exploring"] } => { de: [1, 3] }
  const dummyBucketsList = Object.entries(DUMMY_NOTION).map(
    ([locale, bucketNames]) => [
      locale,
      bucketNames.map((name) => parseInt(name.match(/^(\d+)\)/)?.[1] ?? "0")),
    ]
  )

  return Object.fromEntries(dummyBucketsList)
}
