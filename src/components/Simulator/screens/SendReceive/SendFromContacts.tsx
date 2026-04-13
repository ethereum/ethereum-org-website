import { QrCode, Search } from "lucide-react"

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
  const handleSelection = (name: string) => {
    setRecipient(name)
    nav.progressStepper()
  }
  return (
    <>
      <div className="px-6 py-8">
        <p className="mb-8 text-xl font-bold md:text-2xl">Choose recipient</p>
        <NotificationPopover
          title="Example walkthrough"
          content={`Choose ${CONTACTS[0].name} from recent contacts`}
        >
          <Button
            variant="outline"
            className="border-disabled text-disabled hover:!text-disabled w-full cursor-auto py-4 hover:shadow-none"
          >
            <Search />
            <span className="me-auto">Address or contacts</span>
            <QrCode className="text-lg" />
          </Button>
        </NotificationPopover>
      </div>
      <div className="bg-background-highlight h-full px-6 py-8">
        <CategoryTabs
          categories={["My contacts", "Recent"]}
          activeIndex={1}
          className="mb-4"
        />
        <Stack className="gap-4">
          {CONTACTS.map(({ name, lastAction }, i) => (
            <Button
              key={name + i}
              disabled={i > 0}
              className="group disabled:bg-background disabled:text-body hover:[&_path]:fill-primary-hover gap-2"
              onClick={() => handleSelection(name)}
            >
              <EthTokenIcon className="[&_path]:fill-primary-action [&_circle]:fill-white" />
              <span className="flex-1">
                <span className="block text-start font-bold">{name}</span>
                <span className="group-disabled:text-body-medium block text-start text-sm text-white">
                  {lastAction}
                </span>
              </span>
            </Button>
          ))}
        </Stack>
      </div>
    </>
  )
}
