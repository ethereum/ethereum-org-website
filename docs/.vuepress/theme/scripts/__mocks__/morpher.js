export default function morpher(element, start, end) {
  const fixedContent = "abcdxyz01234567{}%$?!"
  const slen = start.length
  const rlen = end.length
  element.textContent = fixedContent.substring(0, Math.max(slen, rlen))
}
