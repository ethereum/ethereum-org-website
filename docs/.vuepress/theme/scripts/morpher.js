/**
 * morpher() morph a text to another
 * It loops over chars to morph the text
 *
 * @param {Element} element
 * @param {String} start
 * @param {String} end
 */
export default function morpher (element, start, end) {
  /**
   * Write parameters
   *
   * [1] : chars is an array of characters you choose to randomly morph the text between start and end
   * [2] : duration is the duration of the global morph
   * [3] : frameRate is the speed of the morph for each letter
   */
  const chars = ['a', 'b', 'c', 'd', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '{', '}', '%', '$', '?', '!'] /*[1]*/
  const duration = 1.5 /*[2]*/
  const frameRate = 15 /*[3]*/

  /**
   * Write text variables
   */
  const string = start.split('')
  const result = end.split('')
  const slen = string.length
  const rlen = result.length

  /**
   * Write time variables
   */
  let present = new Date()
  let past = present.getTime()
  let count = 0
  let spentTime = 0
  // SplitTime  = milliseconds / letters
  let splitTime = duration * 70 / Math.max(slen, rlen)

  function update () {
    // Update present date and spent time
    present = new Date()
    spentTime += present.getTime() - past

    // Random letters
    for (let i = count; i < Math.max(slen, rlen); i++) {
      const random = Math.floor(Math.random() * (chars.length - 1))
      // Change letter
      string[i] = chars[random]
    }

    // Morph letters from start to end
    if (spentTime >= splitTime) {
      // Update count of letters to morph
      count += Math.floor(spentTime / splitTime)
      // Morphing
      for (let j = 0; j < count; j++) {
        string[j] = result[j] || null
      }
      // Reset spent time
      spentTime = 0
    }

    // Update DOM
    element.textContent = string.join('')

    // Save present date
    past = present.getTime()

    // Loop
    if (count < Math.max(slen, rlen)) {
      // Only use a setTimeout if the frameRate is lower than 60FPS
      // Remove the setTimeout if the frameRate is equal to 60FPS
      setTimeout(() => {
        window.requestAnimationFrame(update)
      }, 1000 / frameRate)
    }
  }

  // Start loop
  update()
}