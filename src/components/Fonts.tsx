import * as React from "react"
import { Global } from "@emotion/react"

// Font files obtained from: https://github.com/rsms/inter

const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: 400;
        font-display: swap;
        src: url("/fonts/Inter-Regular.woff2?v=3.19") format("woff2"),
             url("/fonts/Inter-Regular.woff?v=3.19") format("woff");
      }
      @font-face {
        font-family: 'Inter';
        font-style:  italic;
        font-weight: 400;
        font-display: swap;
        src: url("/fonts/Inter-Italic.woff2?v=3.19") format("woff2"),
             url("/fonts/Inter-Italic.woff?v=3.19") format("woff");
      }
      @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: 700;
        font-display: swap;
        src: url("/fonts/Inter-Bold.woff2?v=3.19") format("woff2"),
             url("/fonts/Inter-Bold.woff?v=3.19") format("woff");
      }
      @font-face {
        font-family: 'Inter';
        font-style:  italic;
        font-weight: 700;
        font-display: swap;
        src: url("/fonts/Inter-BoldItalic.woff2?v=3.19") format("woff2"),
             url("/fonts/Inter-BoldItalic.woff?v=3.19") format("woff");
      }
      `}
  />
)

export default Fonts
