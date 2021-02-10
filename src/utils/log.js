const consoleError = (message) => {
  const { NODE_ENV } = process.env
  if (NODE_ENV === "development") {
    console.error(message)
  }
}

module.exports = {
  consoleError,
}
