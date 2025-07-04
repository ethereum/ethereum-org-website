import dynamic from "next/dynamic"

import Loading from "./loading"

export default dynamic(() => import("./index"), {
  ssr: false,
  loading: Loading,
})
