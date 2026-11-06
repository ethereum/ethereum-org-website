import { useTranslations } from "next-intl"

import Modal from "@/components/ui/dialog-modal"

import { cn } from "@/lib/utils/cn"

import ShortcutKeys from "./ShortcutKeys"

import { getShortcutsByGroup, SHORTCUT_GROUPS } from "@/lib/keyboard-shortcuts"

type ShortcutsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const ShortcutsDialog = ({ open, onOpenChange }: ShortcutsDialogProps) => {
  const t = useTranslations("common")

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      size="lg"
      title={t("keyboard-shortcuts")}
    >
      <div className="flex flex-col gap-6">
        {SHORTCUT_GROUPS.map((group) => {
          const shortcuts = getShortcutsByGroup(group.id)
          if (!shortcuts.length) return null

          return (
            <section key={group.id}>
              <h3 className="mb-1 text-sm text-body-medium uppercase">
                {t(group.labelKey)}
              </h3>
              <dl className="m-0">
                {shortcuts.map((shortcut) => (
                  // Rule sits on the top edge so a hidden desktop-only row
                  // at the end of a group leaves no dangling border.
                  <div
                    key={shortcut.labelKey}
                    className={cn(
                      "flex items-center justify-between gap-6 border-t py-2 first:border-t-0",
                      shortcut.desktopOnly && "max-md:hidden"
                    )}
                  >
                    <dt className="text-body">{t(shortcut.labelKey)}</dt>
                    <dd className="m-0">
                      <ShortcutKeys shortcut={shortcut} />
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )
        })}
      </div>
    </Modal>
  )
}

export default ShortcutsDialog
