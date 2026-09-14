"use client"

import dynamic from "next/dynamic"

import { useDisclosure } from "@/hooks/useDisclosure"
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut"

const ShortcutsDialog = dynamic(() => import("./ShortcutsDialog"))

/**
 * Owns the global `?` binding. Renders nothing until the dialog is opened, so
 * it can be mounted unconditionally -- but only once per page.
 */
const KeyboardShortcuts = () => {
  const { isOpen, onToggle, setValue } = useDisclosure()

  useKeyboardShortcut("help", onToggle)

  return isOpen ? <ShortcutsDialog open onOpenChange={setValue} /> : null
}

export default KeyboardShortcuts
