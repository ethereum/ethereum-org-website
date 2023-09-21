import * as React from "react"
import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  ThemingProps,
} from "@chakra-ui/react"

interface SelectProps
  extends Omit<ChakraSelectProps, "defaultValue">,
    Pick<ThemingProps<"Select">, "variant"> {
  defaultValue?: { label: string; value: string; [x: string]: any }
  onChange(selectedOption: any | ""): void
  placeholder?: string
  options: Record<string, any>[]
}

const Select = (props: SelectProps) => {
  const { options, defaultValue, placeholder, onChange, ...rest } = props

  const [selectedOption, setSelectedOption] = React.useState(
    defaultValue?.value
  )

  const flatObject = options
    .map((option) => {
      if (Object.hasOwn(option, "options")) {
        return option.options
      }

      return option
    })
    .flat()

  const handleOnChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const selectedValue = e.target.value
    const isPlaceholder = selectedValue === ""

    setSelectedOption(selectedValue)

    const selectedOptionData = flatObject.find(
      (option) => option.value === selectedValue
    )

    if (!selectedOptionData && !isPlaceholder) return

    onChange(selectedOptionData ?? "")
  }

  return (
    <ChakraSelect
      value={selectedOption}
      placeholder={placeholder}
      onChange={handleOnChange}
      data-peer
      sx={{
        '& option[value=""]': {
          color: "bodyLight",
        },
      }}
      {...rest}
    >
      {options.map((option, idx) => {
        return Object.hasOwn(option, "options") ? (
          <optgroup key={idx} label={option.optGroupLabel}>
            {option.options.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </optgroup>
        ) : (
          <option key={idx} value={option.value}>
            {option.label}
          </option>
        )
      })}
    </ChakraSelect>
  )
}

export default Select
