import { mergeObjects } from "../merge-translations"

const x = { a: 1, b: 2 }
const y = { c: 3, d: 4 }
const z = { e: 5, a: 7 }

test("mergeObjects merges objects", () => {
  expect(mergeObjects(x, y)).toStrictEqual(Object.assign({}, x, y))
})

test("mergeObjects throws errors if objects contain duplicate keys", () => {
  expect(() => {
    mergeObjects(x, z)
  }).toThrow("target object already has key: a")
})
