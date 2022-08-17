import { useEffect, useState } from "react"

import { getData } from "../utils/cache"
import { defaultLanguage } from "../utils/languages"
import { getLocaleForNumberFormat } from "../utils/translations"

interface IStat {
  timestamp: number
  value: number
}

export interface IFetchStat {
  data: Array<IStat>
  value?: IStat
  formattedValue: string
  hasError: boolean
}

const defaultLocale = getLocaleForNumberFormat(defaultLanguage)

export const defaultFormatter = (value: number, locale = defaultLocale) => {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    minimumSignificantDigits: 3,
    maximumSignificantDigits: 4,
  }).format(value)
}

const useFetchStat = <T>(
  url: string,
  fn: (response: T) => Array<IStat>,
  format: (value: number) => string = defaultFormatter
): IFetchStat => {
  const [stat, setStat] = useState<IFetchStat>({
    data: [],
    formattedValue: "",
    hasError: false,
  })

  useEffect(() => {
    const fetchStat = async () => {
      try {
        const response = await getData<T>(url)

        const data = fn(response)

        const lastValue = data[data.length - 1]
        const formattedValue = format(lastValue.value)

        setStat({
          data,
          value: lastValue,
          formattedValue,
          hasError: false,
        })
      } catch (error) {
        console.error(error)

        setStat({
          ...stat,
          hasError: true,
        })
      }
    }

    fetchStat()
  }, [])

  return stat
}

export default useFetchStat
