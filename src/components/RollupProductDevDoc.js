// Libraries
import React from "react"

// Data
import optimisticRollupList from "../data/layer-2-data-files/optimistic-rollups.json"
import zkRollupList from "../data/layer-2-data-files/zk-rollups.json"

const RollupProductListDevDocs = ({ rollupType }) => {
  const data = {
    optimistic: optimisticRollupList,
    zk: zkRollupList,
  }

  return <p>Hello World</p>
}

export default RollupProductListDevDocs
