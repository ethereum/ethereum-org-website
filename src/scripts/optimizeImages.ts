import sharp from "sharp"
import glob from "glob"
import fs from "fs"
import util from "util"

const rename = util.promisify(fs.rename)

const matches = glob.sync(`src/assets/**/*.{png,jpg,jpeg}`)
const MAX_WIDTH = 800
const QUALITY = 100

Promise.all(
  matches.map(async (match) => {
    const stream = sharp(match)
    const info = await stream.metadata()

    const width = info.width || 0

    if (width < MAX_WIDTH) {
      return
    }

    const ext = match.split(".").pop()
    const optimizedName = match.replace(
      /(\..+)$/,
      (_match, ext) => `-optimized${ext}`
    )

    const resized = stream.resize({
      width: MAX_WIDTH,
    })

    if (ext === "png") {
      await resized.png({ quality: QUALITY }).toFile(optimizedName)
    }

    if (ext === "jpg" || ext === "jpeg") {
      await resized.jpeg({ quality: QUALITY }).toFile(optimizedName)
    }

    return rename(optimizedName, match)
  })
)
