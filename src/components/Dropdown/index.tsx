import * as React from "react"
import { useMachine, normalizeProps } from "@zag-js/react"
import { machine, connect } from "@zag-js/select"
import {
  chakra,
  Portal,
  SystemStyleObject,
  useMultiStyleConfig,
  ThemingProps,
} from "@chakra-ui/react"
import { FaChevronDown } from "react-icons/fa"

const selectData = [
  { label: "Ethereum", value: "eth" },
  { label: "Bitcoin", value: "bit" },
  { label: "Dogecoin", value: "doge" },
]

interface DropdownProps extends ThemingProps<"Dropdown"> {}

const Dropdown = (props: DropdownProps) => {
  const { variant } = props

  const [state, send] = useMachine(
    machine({
      id: React.useId(),
      positioning: {
        gutter: -1,
      },
    })
  )

  const api = connect(state, send, normalizeProps)

  const styles = useMultiStyleConfig("Dropdown", { variant }) as Record<
    "trigger" | "triggerIcon" | "content" | "option",
    SystemStyleObject
  >

  const triggerRef = React.useRef<HTMLButtonElement>(null)

  return (
    <>
      <chakra.button ref={triggerRef} {...api.triggerProps} sx={styles.trigger}>
        <span>{api.selectedOption?.label ?? "Select Crypto"}</span>
        <chakra.div sx={styles.triggerIcon}>
          <FaChevronDown />
        </chakra.div>
      </chakra.button>
      <Portal>
        <div {...api.positionerProps}>
          <chakra.ul {...api.contentProps} sx={styles.content}>
            {selectData.map(({ label, value }) => (
              <chakra.li
                key={value}
                {...api.getOptionProps({ label, value })}
                sx={styles.option}
              >
                <span>{label}</span>
              </chakra.li>
            ))}
          </chakra.ul>
        </div>
      </Portal>
    </>
  )
}

export default Dropdown
