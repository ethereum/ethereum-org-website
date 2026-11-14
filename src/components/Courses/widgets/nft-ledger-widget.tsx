"use client"

import { useState } from "react"
import { ScrollText, Send, Ticket } from "lucide-react"
import { useTranslations } from "next-intl"
import * as RadioGroup from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils/cn"

import { chunkyTile, courseText, pickedTile } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

/*
 * The token-ledger idea with one owner per numbered ticket instead of
 * balances: Alice sells ticket 2 to Bob; the others must not change.
 * Names reuse the token ledger's strings.
 */
const PEOPLE = ["alice", "bob", "carol"] as const
type Person = (typeof PEOPLE)[number]

const TICKETS = [
  { id: "1", before: "alice", after: "alice" },
  { id: "2", before: "alice", after: "bob" },
  { id: "3", before: "carol", after: "carol" },
] as const satisfies readonly { id: string; before: Person; after: Person }[]
type TicketId = (typeof TICKETS)[number]["id"]

const initial = () =>
  Object.fromEntries(TICKETS.map(({ id, before }) => [id, before])) as Record<
    TicketId,
    Person
  >

const NftLedgerWidget = ({ onAnswer, locked }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const [owners, setOwners] = useState(initial)

  const name = (id: Person) => t(`page-courses-widget-ledger-name-${id}`)

  const assign = (ticket: TicketId, owner: Person) => {
    const next = { ...owners, [ticket]: owner }
    setOwners(next)
    const othersMoved = TICKETS.some(
      ({ id, before, after }) => before === after && next[id] !== before
    )
    onAnswer({
      correct: TICKETS.every(({ id, after }) => next[id] === after),
      hint: othersMoved
        ? t("page-courses-widget-nft-ledger-hint-others")
        : t("page-courses-widget-nft-ledger-hint-sold"),
    })
  }

  return (
    <WidgetShell>
      <p className="m-0 flex items-start gap-2 rounded-2xl bg-background p-3 font-bold">
        <Send
          className={cn("mt-0.5 size-5 shrink-0", courseText)}
          aria-hidden
        />
        {t("page-courses-widget-nft-ledger-sale", {
          from: name("alice"),
          to: name("bob"),
        })}
      </p>

      <div className="flex flex-col gap-3 rounded-2xl border-2 border-(--course-soft) bg-background p-4">
        <p className="m-0 flex items-center gap-2 text-sm font-bold tracking-wide text-body-medium uppercase">
          <ScrollText className={cn("size-4", courseText)} aria-hidden />
          {t("page-courses-widget-nft-ledger-contract")}
        </p>
        <ul className="m-0 flex list-none flex-col gap-3">
          {TICKETS.map(({ id, before }) => {
            const ticket = t("page-courses-widget-nft-ledger-ticket", { id })
            return (
              <li
                key={id}
                className="m-0 flex flex-col gap-2 border-b-2 border-(--course-softer) pb-3 last:border-b-0 last:pb-0"
              >
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="flex items-center gap-2 font-bold">
                    <Ticket
                      className={cn("size-5 shrink-0", courseText)}
                      aria-hidden
                    />
                    {ticket}
                  </span>
                  <span className="text-sm text-body-medium">
                    {t("page-courses-widget-nft-ledger-before", {
                      name: name(before),
                    })}
                  </span>
                </span>
                <RadioGroup.Root
                  aria-label={t("page-courses-widget-nft-ledger-owner-label", {
                    ticket,
                  })}
                  orientation="horizontal"
                  className="flex flex-wrap gap-2"
                  value={owners[id]}
                  disabled={locked}
                  onValueChange={(owner) => assign(id, owner as Person)}
                >
                  {PEOPLE.map((person) => (
                    <RadioGroup.Item
                      key={person}
                      value={person}
                      className={cn(
                        chunkyTile,
                        "min-h-11 cursor-pointer px-4 py-1 font-bold focus-visible:outline-4 focus-visible:outline-(--course-soft)",
                        pickedTile,
                        "disabled:cursor-default disabled:active:translate-y-0 disabled:active:border-b-4"
                      )}
                    >
                      {name(person)}
                    </RadioGroup.Item>
                  ))}
                </RadioGroup.Root>
              </li>
            )
          })}
        </ul>
      </div>

      {locked && (
        <p role="status" className="m-0 text-green-700 dark:text-green-400">
          {t("page-courses-widget-nft-ledger-hit")}
        </p>
      )}
    </WidgetShell>
  )
}

export default NftLedgerWidget
