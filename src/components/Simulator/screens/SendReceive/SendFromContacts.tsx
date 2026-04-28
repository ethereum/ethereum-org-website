import { QrCode, Search } from "lucide-react"
import { useTranslations } from "next-intl"

import type { SimulatorNavProps } from "@/lib/types"

import { Button } from "@/components/ui/buttons/Button"
import { Stack } from "@/components/ui/flex"

import { EthTokenIcon } from "../../icons"
import { NotificationPopover } from "../../NotificationPopover"
import { CategoryTabs } from "../../WalletHome/CategoryTabs"

import { CONTACTS } from "./constants"

type SendFromContactsProps = SimulatorNavProps & {
  setRecipient: (name: string) => void
}
export const SendFromContacts = ({
  nav,
  setRecipient,
}: SendFromContactsProps) => {
  const t = useTranslations("component-wallet-simulator")
  const handleSelection = (name: string) => {
    setRecipient(name)
    nav.progressStepper()
  }
  return (
    <>
      <div className="px-6 py-8">
        <p className="mb-8 text-xl font-bold md:text-2xl">
          {t("sim-contacts-title")}
        </p>
        <NotificationPopover
          title={t("sim-example-walkthrough")}
          content={t("sim-contacts-choose", { name: CONTACTS[0].name })}
        >
          <Button
            variant="outline"
            className="w-full cursor-auto border-disabled py-4 text-disabled hover:!text-disabled hover:shadow-none"
          >
            <Search />
            <span className="me-auto">{t("sim-contacts-search")}</span>
            <QrCode className="text-lg" />
          </Button>
        </NotificationPopover>
      </div>
      <div className="h-full bg-background-highlight px-6 py-8">
        <CategoryTabs
          categories={[t("sim-contacts-my-contacts"), t("sim-contacts-recent")]}
          activeIndex={1}
          className="mb-4"
        />
        <Stack className="gap-4">
          {CONTACTS.map(({ name }, i) => (
            <Button
              key={name + i}
              disabled={i > 0}
              className="group gap-2 disabled:bg-background disabled:text-body hover:[&_path]:fill-primary-hover"
              onClick={() => handleSelection(name)}
            >
              <EthTokenIcon className="[&_circle]:fill-white [&_path]:fill-primary-action" />
              <span className="flex-1">
                <span className="block text-start font-bold">{name}</span>
                <span className="block text-start text-sm text-white group-disabled:text-body-medium">
                  {t("sim-contact-last-action")}
                </span>
              </span>
            </Button>
          ))}
        </Stack>
      </div>
    </>
  )
}
