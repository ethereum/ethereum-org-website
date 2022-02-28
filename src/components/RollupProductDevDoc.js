// Libraries
import React from "react"
import styled from "styled-components"

// Components
import Link from "./Link"

// Data
import optimisticRollupList from "../data/layer-2-data-files/optimistic-rollups.json"
import zkRollupList from "../data/layer-2-data-files/zk-rollups.json"

// Styles
const H4 = styled.h4`
  margin: 1rem 0;
`

const ProductCard = styled.div`
  margin: 1rem 0;
  background: ${(props) => props.theme.colors.rollupDevDocList};
  display: flex;
  flex-direction: row;
`

const Content = styled.div`
  padding: 1rem 1rem 0 1rem;
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
                <H4>
                  {rollup.name}
                  {rollup.note.length > 0 && ` (${rollup.note})`}
                </H4>
                <ul>
                  <li>
                    <Link to={rollup.website}>Website</Link>
                  </li>
                  <li>
                    <Link to={rollup.developerDocs}>Developer docs</Link>
                  </li>
                  <li>
                    <Link to={rollup.l2beat}>Technology and risk summary</Link>
                  </li>
                </ul>
              </div>
            </Content>
          </ProductCard>
        )
      })}
    </div>
  )
}

export default RollupProductDevDoc
