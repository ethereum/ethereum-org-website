import React from "react"
import { ListItem, UnorderedList } from "@chakra-ui/react"
import Translation from "./Translation"
import Link from "./Link"
import { DeveloperDocsLink } from "../types"

import docLinks from "../data/developerDocsLinks.json"

export interface IProps {
  headerId: string
}

const DeveloperDocsLinks: React.FC<IProps> = ({ headerId }) => (
  <React.Fragment>
    {(docLinks as Array<DeveloperDocsLink>)
      .filter(({ id }) => id.includes(headerId))
      .map(({ items, id }) => (
        <UnorderedList ml={6} spacing={3} key={id}>
          {items &&
            items.map(({ id, to, path, description, items }) => (
              <ListItem key={id}>
                {to || path ? (
                  <Link to={to || path}>
                    <Translation id={id} />
                  </Link>
                ) : (
                  <Translation id={id} />
                )}
                <i>
                  {" – "}
                  <Translation id={description!} />
                </i>
                <UnorderedList
                  ml={6}
                  mt={3}
                  spacing={3}
                  style={{ listStyleType: "circle" }}
                >
                  {items &&
                    items.map(({ id, to, path }) => (
                      <ListItem key={id}>
                        <Link to={to || path}>
                          <Translation id={id} />
                        </Link>
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
