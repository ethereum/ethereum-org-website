import moment from "moment"

export const getLocaleTimestamp = (locale, timestamp) => {
  moment.locale(locale)
  return moment(timestamp).format("MMM DD, YYYY")
}
