import { Progress, ProgressProps } from "@chakra-ui/react"

type ProgressBarProps = Pick<ProgressProps, "value"> & {
  isCurrent?: boolean
}

const ProgressBar = ({ value, isCurrent }: ProgressBarProps) => (
  <Progress
    value={value}
    h="0.5"
    w="full"
    bg="body.light"
    _groupHover={{
      "[role=progressbar]": {
        backgroundColor: "primary.highContrast",
      },
    }}
    sx={{
      "[role=progressbar]": {
        backgroundColor: isCurrent ? "primary.highContrast" : "body.medium",
      },
    }}
  />
)

export default ProgressBar
