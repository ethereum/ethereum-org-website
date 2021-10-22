import React from "react"
import { ListItem } from "./SharedStyledComponents"
import Translation from "./Translation"
import Link from "./Link"
import docLinks from "../data/developer-docs-links.yaml"

const DeveloperDocsLinks = ({ headerId }) =>
  docLinks
    .filter(({ id }) => id.includes(headerId))
    .map(({ items }) => (
      <ul>
        {items &&
          items.map(({ id, to, path, description, items }) => (
            <ListItem>
              {to || path ? (
                <Link to={to || path}>
                  <Translation id={id} />
                </Link>
              ) : (
                <Translation id={id} />
              )}
              <i>
                {" – "}
                <Translation id={description} />
              </i>
              <ul>
                {items &&
                  items.map(({ id, to, path }) => (
                    <ListItem>
                      <Link to={to || path}>
                        <Translation id={id} />
                      </Link>
                    </ListItem>
                  ))}
              </ul>
            </ListItem>
          ))}
      </ul>
    ))

export default DeveloperDocsLinks
