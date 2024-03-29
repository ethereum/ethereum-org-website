export const getContrastYIQ = (hexcolor: string): "black" | "white" => {
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0
  if (hexcolor.length == 4) {
    r = parseInt(hexcolor[1] + hexcolor[1], 16)
    g = parseInt(hexcolor[2] + hexcolor[2], 16)
    b = parseInt(hexcolor[3] + hexcolor[3], 16)
  } else if (hexcolor.length == 7) {
    r = parseInt(hexcolor[1] + hexcolor[2], 16)
    g = parseInt(hexcolor[3] + hexcolor[4], 16)
    b = parseInt(hexcolor[5] + hexcolor[6], 16)
  }

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Return black for bright colors, white for dark colors
  return luminance > 0.5 ? "black" : "white"
}
