import dynamic from "next/dynamic"

import Loading from "../Collectibles/loading"

export default dynamic(() => import("."), { ssr: false, loading: Loading })
