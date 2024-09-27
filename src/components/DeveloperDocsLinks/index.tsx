import React from "react"
import { ListItem, UnorderedList } from "@chakra-ui/react"

import InlineLink from "@/components/Link"
import Translation from "@/components/Translation"

import docLinks from "@/data/developer-docs-links.yaml"

export type DeveloperDocsLinksProps = {
  headerId: string
}

const DeveloperDocsLinks = ({ headerId }: DeveloperDocsLinksProps) => (
  <React.Fragment>
    {docLinks
      .filter(({ id }) => id.includes(headerId))
      .map(({ items, id }) => (
        <UnorderedList ms={6} spacing={3} key={id}>
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
                <UnorderedList
                  ms={6}
                  mt={3}
                  spacing={3}
                  style={{ listStyleType: "circle" }}
                >
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
