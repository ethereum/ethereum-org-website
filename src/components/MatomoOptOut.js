import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { MATOMO_LS_KEY } from "../utils/matomo"

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 4px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  margin-top: 2rem;
  align-items: flex-start;
  justify-content: space-between;
  p {
    color: ${({ theme }) => theme.colors.fail};
  }
  form {
    margin: 0;
  }
  input {
    margin-right: 0.5rem;
  }
`

const MatomoOptOut = () => {
  const [loading, setLoading] = useState(true)
  const [isOptedOut, setIsOptedOut] = useState(false)

  useEffect(() => {
    // Load user choice for Matomo tracking from localStorage
    const savedOptOut = JSON.parse(localStorage.getItem(MATOMO_LS_KEY))
    // If saved opt-out selection is `true` then set this as local checkbox state
    // Else, instantiate localStorage value to `false`
    if (savedOptOut) {
      setIsOptedOut(true)
    } else {
      localStorage.setItem(MATOMO_LS_KEY, false)
    }
    setLoading(false)
  }, [])

  const handleCheckbox = ({ target: { checked } }) => {
    // Set local opt-out state based on check mark
    // Note: `checked` in the UI refers to being opted-in
    setIsOptedOut(!checked)
    // Save selection to localStorage
    localStorage.setItem(MATOMO_LS_KEY, !checked)
  }
  return (
    <Container>
      <p>
        You can opt out of being tracked by Matomo Analytics and prevent the
        website from analysing the actions you take using the website. This will
        prevent us from learning from your actions and creating a better website
        experience for you and other users.
      </p>
      {loading ? (
        "Loading preferences..."
      ) : (
        <form>
          <input
            type="checkbox"
            id="matomo"
            checked={!isOptedOut}
            onChange={handleCheckbox}
          />
          <label for="matomo">
            {isOptedOut
              ? "You are opted out. Check this box to opt-in."
              : "You are not opted out. Uncheck this box to opt-out."}
          </label>
        </form>
      )}
    </Container>
  )
}

export default MatomoOptOut
