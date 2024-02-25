import { motion } from "framer-motion"
import { Icon } from "@chakra-ui/react"

const expandedPathVariants = {
  closed: {
    d: "M12 7.875V17.125",
    transition: { duration: 0.1 },
  },
  open: {
    d: "M12 12V12",
    transition: { duration: 0.1 },
  },
}

type ExpandIconProps = {
  isOpen: boolean
}

const ExpandIcon = ({ isOpen }: ExpandIconProps) => (
  <Icon
    viewBox="0 0 24 25"
    width={6}
    height={6}
    position="relative"
    strokeWidth="2px"
    display="inline-block"
    stroke="currentColor"
  >
    <motion.path
      variants={expandedPathVariants}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      d="M12 7.875V17.125"
      stroke-width="2"
    />
    <path d="M7.375 12.5L16.625 12.5" stroke-width="2" />
  </Icon>
)

export default ExpandIcon
