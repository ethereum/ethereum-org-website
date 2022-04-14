// Wrapper on `Object.assign` to throw error if keys clash
const mergeObjects = <T, U>(target: T, newObject: U): T & U => {
  const targetKeys = Object.keys(target)
  for (const key of Object.keys(newObject)) {
    if (targetKeys.includes(key)) {
      throw new Error(`target object already has key: ${key}`)
    }
  }
  return Object.assign(target, newObject)
}

export default mergeObjects
