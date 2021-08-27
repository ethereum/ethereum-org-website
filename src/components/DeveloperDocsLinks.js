import React from "react"
import { Header3, ListItem } from "./SharedStyledComponents"
import Translation from "./Translation"
import Link from "./Link"
import docLinks from "../data/developer-docs-links.yaml"

const DeveloperDocsLinks = () => {
  return docLinks.map((items) => (
    <>
      <Header3>
        <Translation id={items.id} />
      </Header3>
      <ul>
        {items.items &&
          items.items.map((item) => {
            return (
              <ListItem>
                <Link to={item.to || item.path}>
                  <Translation id={item.id} />
                </Link>
                <em>
                  {" – "}
                  <Translation id={item.descp_id} />
                </em>
              </ListItem>
            )
          })}
      </ul>
    </>
  ))
}

export default DeveloperDocsLinks
