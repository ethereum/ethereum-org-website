import dynamic from "next/dynamic"

import Loading from "./loading"

export default dynamic(() => import("./client"), {
  ssr: false,
  loading: Loading,
})
