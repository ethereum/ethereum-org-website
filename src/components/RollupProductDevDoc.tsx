import { layer2Data, Rollups, RollupType } from "@/data/layer-2/layer-2"

import InlineLink from "./Link"
import Translation from "./Translation"

const rollups = layer2Data as Rollups

export type RollupProductDevDocProps = {
  rollupType: RollupType
}

const RollupProductDevDoc = ({ rollupType }: RollupProductDevDocProps) => {
  return (
    <div>
      {rollups[rollupType].map(
        ({ name, noteKey, website, developerDocs, l2beat }, idx) => {
          return (
            <div key={idx} className="bg-rollupDevDocList my-4">
              <div className="p-4 pb-0">
                <div>
                  <h4 className="my-4 text-md font-medium leading-relaxed md:text-xl">
                    {name}
                  </h4>
                  {noteKey.length > 0 && (
                    <p>
                      * <Translation id={`page-layer-2:${noteKey}`} />
                    </p>
                  )}
                  <ul className="list-disc pl-5">
                    <li>
                      <InlineLink href={website}>
                        <Translation id="rollup-component-website" />
                      </InlineLink>
                    </li>
                    <li>
                      <InlineLink href={developerDocs}>
                        <Translation id="rollup-component-developer-docs" />
                      </InlineLink>
                    </li>
                    <li>
                      <InlineLink href={l2beat}>
                        <Translation id="rollup-component-technology-and-risk-summary" />
                      </InlineLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )
        }
      )}
    </div>
  )
}

export default RollupProductDevDoc
