"use client"

import React, { useState } from "react"

import Github from "@/components/icons/github.svg"
import Translation from "@/components/Translation"
import { Button } from "@/components/ui/buttons/Button"
import { ButtonLink } from "@/components/ui/buttons/Button"
import Modal from "@/components/ui/dialog-modal"
import { Flex } from "@/components/ui/flex"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { useBreakpointValue } from "@/hooks/useBreakpointValue"

const TutorialSubmitModal = ({
  dir,
}: Pick<React.HTMLAttributes<React.JSX.Element>, "dir">) => {
  const [isModalOpen, setModalOpen] = useState(false)

  const modalSize = useBreakpointValue({ base: "xl", md: "md" } as const)

  return (
    <>
      <Modal
        open={isModalOpen}
        onOpenChange={(open) => setModalOpen(open)}
        size={modalSize}
        contentProps={{ dir }}
        title={
          <Translation id="page-developers-tutorials:page-tutorial-submit-btn" />
        }
      >
        <p className="mb-6">
          <Translation id="page-developers-tutorials:page-tutorial-listing-policy-intro" />
        </p>
        <Flex className="flex-col gap-2 md:flex-row">
          <Flex className="w-full flex-col justify-between rounded-sm border border-border p-4">
            <b>
              <Translation id="page-developers-tutorials:page-tutorial-create-an-issue" />
            </b>
            <p className="mb-6">
              <Translation id="page-developers-tutorials:page-tutorial-create-an-issue-desc" />
            </p>
            <ButtonLink
              variant="outline"
              href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=Type%3A+Feature&template=suggest_tutorial.yaml&title="
            >
              <Github />
              <Translation id="page-developers-tutorials:page-tutorial-raise-issue-btn" />
            </ButtonLink>
          </Flex>
        </Flex>
      </Modal>

      <Button
        className="px-3 py-2 text-body"
        variant="outline"
        onClick={() => {
          setModalOpen(true)
          trackCustomEvent({
            eventCategory: "tutorials tags",
            eventAction: "click",
            eventName: "submit",
          })
        }}
      >
        <Translation id="page-developers-tutorials:page-tutorial-submit-btn" />
      </Button>
    </>
  )
}

TutorialSubmitModal.displayName = "TutorialSubmitModal"

export default TutorialSubmitModal
