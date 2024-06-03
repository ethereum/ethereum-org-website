import { MdMenu } from "react-icons/md"
import { Box, Icon } from "@chakra-ui/react"

const CSSDrawer = ({ children }) => {
  return (
    <Box
      sx={{
        ".css-drawer-toggle": {
          display: "none",
        },
        ".css-drawer-toggle:checked + .css-drawer-toggle-label + .css-drawer": {
          transform: "translateX(0)",
        },
        ".css-drawer": {
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: "100%",
          height: "100vh",
          maxHeight: "100vh",
          transform: "translateX(-100%)",
          transition: "transform 0.3s ease",
          zIndex: "modal",
        },
      }}
    >
      {/* Hidden checkbox */}
      <input
        type="checkbox"
        id="css-drawer-toggle"
        className="css-drawer-toggle"
      />

      {/* Label for the hidden checkbox */}
      <Box
        as="label"
        htmlFor="css-drawer-toggle"
        className="css-drawer-toggle-label"
        display="inline-flex"
        padding={2}
        border="1px"
        borderColor="transparent"
      >
        <Icon as={MdMenu} boxSize={6} />
      </Box>

      {/* Drawer content */}
      <div className="css-drawer">{children}</div>
    </Box>
  )
}

export default CSSDrawer
