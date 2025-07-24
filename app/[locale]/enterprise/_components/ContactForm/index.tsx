"use client"

import { Button } from "@/components/ui/buttons/Button"
import Input from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type EnterpriseContactFormProps = {
  emailPlaceholder: string
  bodyPlaceholder: string
  buttonLabel: string
}

const EnterpriseContactForm = ({
  emailPlaceholder,
  bodyPlaceholder,
  buttonLabel,
}: EnterpriseContactFormProps) => (
  <div className="w-full max-w-[440px] space-y-6">
    <Input type="email" className="w-full" placeholder={emailPlaceholder} />
    <Textarea className="" placeholder={bodyPlaceholder} />
    <Button
      onClick={() => {
        console.log("Submit form!")
      }}
      size="lg"
      customEventOptions={{
        eventCategory: "enterprise",
        eventAction: "CTA",
        eventName: "bottom_mail",
      }}
    >
      {buttonLabel}
    </Button>
  </div>
)

export default EnterpriseContactForm
