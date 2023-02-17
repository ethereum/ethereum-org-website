import * as React from "react"
import { Global } from "@emotion/react"

const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 300 800;
        font-display: swap;
        src: url('/fonts/Inter.ttf') format('truetype');
      }
      `}
  />
)

export default Fonts
