export const isModified = (event: {
  altKey: boolean
  ctrlKey: boolean
  metaKey: boolean
  shiftKey: boolean
}) => event.altKey || event.ctrlKey || event.metaKey || event.shiftKey
