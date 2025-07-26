"use client"

import React, { useState } from "react"
import { HeartHandshake } from "lucide-react"

import { Button } from "@/components/ui/buttons/Button"
import Input from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"

import { CONTACT_FORM_CHAR_MIN } from "../../constants"

type EnterpriseContactFormProps = {
  strings: {
    error: {
      domain: string
      emailInvalid: string
      general: string
      minLength: React.ReactNode // constant injected into span
      required: string
    }
    placeholder: {
      input: string
      textarea: string
    }
    button: {
      label: string
      loading: string
    }
    success: {
      heading: string
      message: string
    }
  }
}

type FormState = {
  email: string
  message: string
}

type FormErrors = {
  email?: string
  message?: React.ReactNode
  general?: string
}

type SubmissionState = "idle" | "submitting" | "success" | "error"

// Consumer email domains to block
const CONSUMER_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "protonmail.com",
  "proton.me",
  "pm.me",
  "aol.com",
  "mail.com",
  "yandex.com",
  "tutanota.com",
  "fastmail.com",
  "zoho.com",
  "gmx.com",
  "live.com",
  "msn.com",
  "me.com",
  "mac.com",
  "rocketmail.com",
  "yahoo.co.uk",
  "googlemail.com",
  "mailinator.com",
  "10minutemail.com",
  "guerrillamail.com",
]

const sanitizeInput = (input: string): string =>
  input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .replace(/&lt;script/gi, "")
    .replace(/&lt;\/script/gi, "")
    .trim()

const EnterpriseContactForm = ({ strings }: EnterpriseContactFormProps) => {
  const [formData, setFormData] = useState<FormState>({
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("idle")

  const handleInputChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value
      setFormData((prev) => ({ ...prev, [field]: value }))

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }))
      }
    }

  const validateEmail = (email: string): string | undefined => {
    const sanitized = sanitizeInput(email)

    if (!sanitized) return strings.error.required

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(sanitized)) return strings.error.emailInvalid

    const domain = sanitized.toLowerCase().split("@")[1]
    if (CONSUMER_DOMAINS.includes(domain)) return strings.error.domain

    return undefined
  }

  const validateMessage = (
    message: string
  ): React.ReactNode | string | undefined => {
    const sanitized = sanitizeInput(message)

    if (!sanitized) return strings.error.required

    if (sanitized.length < CONTACT_FORM_CHAR_MIN) return strings.error.minLength

    return undefined
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    const emailError = validateEmail(formData.email)
    if (emailError) newErrors.email = emailError

    const messageError = validateMessage(formData.message)
    if (messageError) newErrors.message = messageError

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setSubmissionState("submitting")
    setErrors({})

    try {
      const sanitizedData = {
        email: sanitizeInput(formData.email),
        message: sanitizeInput(formData.message),
      }

      const response = await fetch("/api/enterprise-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedData),
      })

      if (!response.ok) throw new Error(`Server error: ${response.status}`)

      setSubmissionState("success")
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmissionState("error")
      setErrors({ general: strings.error.general })
    }
  }

  if (submissionState === "success")
    return (
      <div className="flex w-full max-w-prose flex-col items-center gap-y-6 rounded-2xl border border-accent-a/20 bg-background p-6 text-center">
        <div className="mb-2 flex items-center gap-4">
          <HeartHandshake className="size-8 text-primary" />
          <h3 className="text-2xl font-semibold">{strings.success.heading}</h3>
        </div>
        <p className="text-body-medium">{strings.success.message}</p>
      </div>
    )

  return (
    <div className="w-full max-w-[440px] space-y-6">
      <div className="space-y-2">
        <Input
          type="email"
          className="w-full"
          placeholder={strings.placeholder.input}
          value={formData.email}
          onChange={handleInputChange("email")}
          disabled={submissionState === "submitting"}
        />
        {errors.email && (
          <p className="text-sm text-error" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Textarea
          placeholder={strings.placeholder.textarea}
          value={formData.message}
          onChange={handleInputChange("message")}
          disabled={submissionState === "submitting"}
          className="min-h-[120px]"
        />
        {errors.message && (
          <p className="text-sm text-error" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {errors.general && (
        <div className="rounded-lg bg-error-light p-4">
          <p className="text-sm text-error" role="alert">
            {errors.general}
          </p>
        </div>
      )}

      <Button
        onClick={handleSubmit}
        size="lg"
        disabled={submissionState === "submitting"}
        customEventOptions={{
          eventCategory: "enterprise",
          eventAction: "CTA",
          eventName: "bottom_mail",
        }}
        className="flex items-center justify-center gap-2 max-sm:w-full"
      >
        {submissionState === "submitting" ? (
          <>
            <Spinner className="text-lg" />
            {strings.button.loading}
          </>
        ) : (
          strings.button.label
        )}
      </Button>
    </div>
  )
}

export default EnterpriseContactForm
