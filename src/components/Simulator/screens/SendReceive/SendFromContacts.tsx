import { PiMagnifyingGlass } from "react-icons/pi"

import type { SimulatorNavProps } from "@/lib/types"

import EthTokenIconGrayscale from "@/components/Simulator/icons/eth-token-icon-grayscale.svg"
import QrCodeIcon from "@/components/Simulator/icons/qr-code-icon.svg"
import { Button } from "@/components/ui/buttons/Button"
import { Stack } from "@/components/ui/flex"

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
            className="w-full cursor-auto border-disabled py-4 text-disabled hover:!text-disabled hover:shadow-none"
          >
            <PiMagnifyingGlass />
            <span className="me-auto">Address or contacts</span>
            <QrCodeIcon className="text-lg text-disabled" />
          </Button>
        </NotificationPopover>
      </div>
      <div className="h-full bg-background-highlight px-6 py-8">
        <CategoryTabs
          categories={["My contacts", "Recent"]}
          activeIndex={1}
          mb={4}
        />
        <Stack className="gap-4">
          {CONTACTS.map(({ name, lastAction }, i) => (
            <Button
              key={name + i}
              disabled={i > 0}
              className="group gap-2 disabled:bg-background disabled:text-body hover:[&_path]:fill-primary-hover"
              onClick={() => handleSelection(name)}
            >
              <EthTokenIconGrayscale className="text-[30px]" />
              <span className="flex-1">
                <span className="block text-start font-bold">{name}</span>
                <span className="block text-start text-sm text-white group-disabled:text-body-medium">
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
