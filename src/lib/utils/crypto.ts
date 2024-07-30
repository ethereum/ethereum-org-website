type HashOptions = {
  algorithm?: AlgorithmIdentifier
  length?: number
}

/**
 * Calculates the hash value of a given buffer using the specified algorithm.
 * Defaults to using SHA-256. Length option can be used to truncate the result.
 * @param buffer - The buffer to calculate the hash from.
 * @param options - The options for the hash calculation (e.g., algorithm, length).
 * @returns A promise that resolves to the hash value as a string.
 */
export const getHashFromBuffer = async (
  buffer: BufferSource,
  options?: HashOptions
): Promise<string> => {
  const hashBuffer = await crypto.subtle.digest(
    options?.algorithm || "SHA-256",
    buffer
  )
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashString = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
  return options?.length
    ? hashString.slice(-Math.abs(options.length))
    : hashString
}
