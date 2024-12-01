import React from "react"

import Translation from "@/components/Translation"

import docLinks from "@/data/developer-docs-links.yaml"

import InlineLink from "./ui/Link"
import { ListItem, UnorderedList } from "./ui/list"

export type DeveloperDocsLinksProps = {
  headerId: string
}

const DeveloperDocsLinks = ({ headerId }: DeveloperDocsLinksProps) => (
  <React.Fragment>
    {docLinks
      .filter(({ id }) => id.includes(headerId))
      .map(({ items, id }) => (
        <UnorderedList className="ms-6 space-y-3" key={id}>
          {items &&
            items.map(({ id, href, path, description, items }) => (
              <ListItem key={id}>
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
                <UnorderedList className="ms-6 mt-3 list-[circle] space-y-3">
                  {items &&
                    items.map(({ id, href, path }) => (
                      <ListItem key={id}>
                        <InlineLink href={href || path}>
                          <Translation id={`page-developers-docs:${id}`} />
                        </InlineLink>
                      </ListItem>
                    ))}
                </UnorderedList>
              </ListItem>
            ))}
        </UnorderedList>
      ))}
  </React.Fragment>
)

export default DeveloperDocsLinks
