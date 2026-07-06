"use client"

import { useId } from "react"

import Checkbox from "@/components/ui/checkbox"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import Switch from "@/components/ui/switch"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { FILTER_ICONS } from "./filter-icons"
import {
  useWalletFilterActions,
  useWalletFilters,
} from "./WalletFilterProvider"

export const FilterSwitch = ({
  filterKey,
  label,
  description,
}: {
  filterKey: string
  label: string
  description?: string
}) => {
  const id = useId()
  const { locale, state } = useWalletFilters()
  const { setToggle } = useWalletFilterActions()
  const Icon = FILTER_ICONS[filterKey]
  const descriptionId = description ? `${id}-description` : undefined
  const checked = !!state.toggles[filterKey]

  return (
    <Field className="gap-0 border-t py-4">
      <div className="flex flex-row items-center justify-between gap-2">
        <FieldLabel
          htmlFor={id}
          className="flex w-fit cursor-pointer flex-row items-center gap-0 text-base leading-normal font-normal"
        >
          <span className="h-8 w-8">
            {Icon && (
              <Icon className="mt-0.5 size-7" strokeWidth={1} aria-hidden />
            )}
          </span>
          {label}
        </FieldLabel>
        <Switch
          id={id}
          aria-describedby={descriptionId}
          checked={checked}
          onCheckedChange={(value) => {
            trackCustomEvent({
              eventCategory: "WalletFilterSidebar",
              eventAction: `${locale} - ${label}`,
              eventName: `${filterKey} ${value}`,
            })
            setToggle(filterKey, value as boolean)
          }}
        />
      </div>
      {description && (
        <FieldDescription
          id={descriptionId}
          className="ps-8 text-base leading-normal font-normal text-body-medium"
        >
          {description}
        </FieldDescription>
      )}
    </Field>
  )
}

export const FilterCheckbox = ({
  filterKey,
  label,
}: {
  filterKey: string
  label: string
}) => {
  const { locale, state } = useWalletFilters()
  const { setToggle } = useWalletFilterActions()

  return (
    <label className="flex cursor-pointer flex-row items-center gap-2">
      <Checkbox
        checked={!!state.toggles[filterKey]}
        onCheckedChange={(value) => {
          trackCustomEvent({
            eventCategory: "WalletFilterSidebar",
            eventAction: `${locale} - ${label}`,
            eventName: `${filterKey} ${value}`,
          })
          setToggle(filterKey, value as boolean)
        }}
      />
      <span className="select-none">{label}</span>
    </label>
  )
}
