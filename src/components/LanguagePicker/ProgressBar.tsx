import { Progress, ProgressProps } from "@chakra-ui/react"

type ProgressBarProps = Pick<ProgressProps, "value">

const ProgressBar = ({ value }: ProgressBarProps) => (
  <Progress
    value={value}
    h="0.5"
    w="full"
    bg="body.light"
    sx={{
      "[role=progressbar]": {
        backgroundColor: "disabled",
      },
    }}
  />
)

export default ProgressBar
