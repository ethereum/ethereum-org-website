export interface IMessages {
  [key: string]: string
}

// same function from 'gatsby-plugin-intl'
const flattenMessages = (nestedMessages: IMessages, prefix = ""): IMessages => {
  return Object.keys(nestedMessages).reduce<IMessages>((messages, key) => {
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
