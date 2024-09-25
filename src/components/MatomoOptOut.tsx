import { useEffect, useState } from "react"

import { MATOMO_LS_KEY } from "@/lib/utils/matomo"

import Checkbox from "../../tailwind/ui/Checkbox"

const MatomoOptOut = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [isOptedOut, setIsOptedOut] = useState<boolean>(false)

  useEffect(() => {
    // Load user choice for Matomo tracking from localStorage
    const savedOptOut = JSON.parse(localStorage.getItem(MATOMO_LS_KEY)!)
    // If saved opt-out selection is `true` then set this as local checkbox state
    // Else, instantiate localStorage value to `false`
    if (savedOptOut) {
      setIsOptedOut(true)
    } else {
      localStorage.setItem(MATOMO_LS_KEY, "false")
    }
    setLoading(false)
  }, [])

  const handleCheckbox = (checked: boolean): void => {
    // Set local opt-out state based on check mark
    // Note: `checked` in the UI refers to being opted-in
    setIsOptedOut(!checked)
    // Save selection to localStorage
    localStorage.setItem(MATOMO_LS_KEY, String(!checked))
  }
  return (
    <div className="mb-4 mt-8 flex flex-col rounded border border-body-light bg-background p-6">
      <p className="mb-5 text-error">
        You can opt out of being tracked by Matomo Analytics and prevent the
        website from analysing the actions you take using the website. This will
        prevent us from learning from your actions and creating a better website
        experience for you and other users.
      </p>
      {loading ? (
        "Loading preferences..."
      ) : (
        <div className="flex items-center">
          <Checkbox
            id="matomo"
            checked={!isOptedOut}
            onCheckedChange={handleCheckbox}
            className="me-2"
          />
          <label htmlFor="matomo">
            {isOptedOut
              ? "You are opted out. Check this box to opt-in."
              : "You are not opted out. Uncheck this box to opt-out."}
          </label>
        </div>
      )}
    </div>
  )
}

export default MatomoOptOut
