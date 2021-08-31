import React from "react"
import { Header3, ListItem } from "./SharedStyledComponents"
import Translation from "./Translation"
import Link from "./Link"
import docLinks from "../data/developer-docs-links.yaml"

const DeveloperDocsLinks = () =>
  docLinks.map(({ id, items }) => (
    <>
      <Header3>
        <Translation id={id} />
      </Header3>
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
    </>
  ))

export default DeveloperDocsLinks
