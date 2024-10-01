import React from "react"

import Translation from "@/components/Translation"

import docLinks from "@/data/developer-docs-links.yaml"

import InlineLink from "./ui/Link"

export type DeveloperDocsLinksProps = {
  headerId: string
}

const DeveloperDocsLinks = ({ headerId }: DeveloperDocsLinksProps) => (
  <React.Fragment>
    {docLinks
      .filter(({ id }) => id.includes(headerId))
      .map(({ items, id }) => (
        <ul className="ms-6 space-y-3" key={id}>
          {items &&
            items.map(({ id, href, path, description, items }) => (
              <li key={id}>
                {href || path ? (
                  <InlineLink href={href || path}>
                    <Translation id={`page-developers-docs:${id}`} />
                  </InlineLink>
                ) : (
                  <Translation id={`page-developers-docs:${id}`} />
                )}
                <i>
                  {" – "}
                  <Translation id={`page-developers-docs:${description}`} />
                </i>
                <ul className="ms-6 mt-3 list-[circle] space-y-3">
                  {items &&
                    items.map(({ id, href, path }) => (
                      <li key={id}>
                        <InlineLink href={href || path}>
                          <Translation id={`page-developers-docs:${id}`} />
                        </InlineLink>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
        </ul>
      ))}
  </React.Fragment>
)

export default DeveloperDocsLinks
