// Seeded so server and client render the same pool (no hydration mismatch)
export const seededShuffle = (items: string[], seed: string) => {
  let h = 0
  for (const char of seed) h = (h * 31 + char.charCodeAt(0)) >>> 0
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    h = (h * 1103515245 + 12345) >>> 0
    const j = h % (i + 1)
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  // Never hand over the answer pre-solved
  if (result.every((id, idx) => id === items[idx])) result.push(result.shift()!)
  return result
}
