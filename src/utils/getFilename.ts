function getFilename(filename: string): string | undefined {
  return filename.split("/").pop()
}

export default getFilename
