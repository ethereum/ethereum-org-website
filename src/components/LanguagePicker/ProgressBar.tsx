import { Progress, ProgressProps } from "@chakra-ui/react"

type ProgressBarProps = Pick<ProgressProps, "value">

const ProgressBar = ({ value }: ProgressBarProps) => (
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
        backgroundColor: "body.medium",
      },
    }}
  />
)

export default ProgressBar
