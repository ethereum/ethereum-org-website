import dynamic from "next/dynamic"

import Loading from "./loading"

export default dynamic(() => import("."), { ssr: false, loading: Loading })
