// Libraries
import React from "react"
import styled from "styled-components"

// Components
import Link from "./Link"

// Data
import optimisticRollupList from "../data/layer-2-data-files/optimistic-rollups.json"
import zkRollupList from "../data/layer-2-data-files/zk-rollups.json"

// Styles
const H3 = styled.h3`
  margin-top: 0;
  margin-bottom: 1rem;
`

const ProductCard = styled.div`
  margin: 1rem 0;
  background: ${(props) => props.theme.colors.searchBackground};
  display: flex;
  flex-direction: row;
`

const Content = styled.div`
  padding: 1rem;
`

const RollupProductDevDoc = ({ rollupType }) => {
  const data = {
    optimistic: optimisticRollupList,
    zk: zkRollupList,
  }

  return (
    <div>
      {data[rollupType].map((rollup) => {
        return (
          <ProductCard>
            <Content>
              <div>
                <H3>
                  {rollup.name}
                  {rollup.note.length > 0 && ` (${rollup.note})`}
                </H3>
                <div>
                  <Link to={rollup.website}>Website</Link>
                </div>
                <div>
                  <Link to={rollup.developerDocs}>Developer docs</Link>
                </div>
                <div>
                  <Link to={rollup.l2beat}>L2BEAT</Link>
                </div>
              </div>
            </Content>
          </ProductCard>
        )
      })}
    </div>
  )
}

export default RollupProductDevDoc
