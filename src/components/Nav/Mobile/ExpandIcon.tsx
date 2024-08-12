import { motion } from "framer-motion"

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
  <svg
    viewBox="0 0 24 25"
    className="relative inline-block h-6 w-6 stroke-current stroke-2 group-hover:text-primary-hover"
  >
    <motion.path
      variants={expandedPathVariants}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      d="M12 7.875V17.125"
      stroke-width="2"
    />
    <path d="M7.375 12.5L16.625 12.5" stroke-width="2" />
  </svg>
)

export default ExpandIcon
