import React from "react"

import Link from "../components/Link"

const NotFoundPage = () => {
  return (
    <div>
      <h1>Resource not found.</h1>
      <p>
        Try using search to find what you're looking for or
        <Link to="/">return home</Link>.
      </p>
    </div>
  )
}

export default NotFoundPage
