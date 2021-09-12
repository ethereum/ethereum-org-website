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
          items.map(({ id, to, path, description }) => (
            <ListItem>
              <Link to={to || path}>
                <Translation id={id} />
              </Link>
              <i>
                {" – "}
                <Translation id={description} />
              </i>
            </ListItem>
          ))}
      </ul>
    ))

export default DeveloperDocsLinks
