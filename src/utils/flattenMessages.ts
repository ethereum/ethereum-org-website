import type { Messages } from "../interfaces"

// same function from 'gatsby-plugin-intl'
const flattenMessages = (nestedMessages: Messages, prefix = ""): Messages => {
  return Object.keys(nestedMessages).reduce<Messages>((messages, key) => {
    let value = nestedMessages[key]
    let prefixedKey = prefix ? `${prefix}.${key}` : key

    if (typeof value === "string") {
      messages[prefixedKey] = value
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey))
    }

    return messages
  }, {})
}

export default flattenMessages
