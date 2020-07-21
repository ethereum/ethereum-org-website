import moment from "moment"
import "moment/min/locales"

export const getLocaleTimestamp = (locale, timestamp) => {
  moment.locale(locale)
  return moment(timestamp, ["ll", "YYYY"]).format("ll")
}
