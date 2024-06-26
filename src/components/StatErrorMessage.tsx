import Translation from "./Translation"

const StatErrorMessage = (props) => (
  <span className="text-2xl" {...props}>
    <Translation id="loading-error-refresh" />
  </span>
)

export default StatErrorMessage
