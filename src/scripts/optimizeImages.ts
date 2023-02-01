import sharp from "sharp"
import glob from "glob"
import fs from "fs"
import util from "util"

const rename = util.promisify(fs.rename)

const matches = glob.sync(`src/assets/**/*.{png,jpg,jpeg}`)
const MAX_WIDTH = 800 * 2

Promise.all(
  matches.map(async (match) => {
    const stream = sharp(match)
    const info = await stream.metadata()

    const width = info.width || 0

    if (width < MAX_WIDTH) {
      return
    }

    const optimizedName = match.replace(
      /(\..+)$/,
      (_match, ext) => `-optimized${ext}`
    )

    await stream
      .resize({
        width: MAX_WIDTH,
      })
      .toFile(optimizedName)

    return rename(optimizedName, match)
  })
)
