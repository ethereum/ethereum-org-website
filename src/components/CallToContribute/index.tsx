import { ChildOnlyProp } from "@/lib/types"

import Github from "@/components/icons/github.svg"
import Translation from "@/components/Translation"

import { ButtonLink } from "../ui/buttons/Button"
import { Flex } from "../ui/flex"
import InlineLink from "../ui/Link"

export type CallToContributeProps = {
  editPath: string
}

const ContentColumn = (props: ChildOnlyProp) => (
  <Flex
    className="text-body flex-1 basis-1/2 flex-col p-4 lg:text-start"
    {...props}
  />
)

const DescriptionParagraph = ({ children }: ChildOnlyProp) => (
  <p className="font-monospace leading-xs text-body mb-6">{children}</p>
)

const CallToContribute = ({ editPath }: CallToContributeProps) => {
  return (
    <aside className="border-primary bg-background-highlight mt-8 items-center rounded-md border border-b-4">
      <ContentColumn>
        <h2 className="font-monospace leading-xs mt-0 mb-8 p-1 uppercase">
          <Translation id="page-developers-docs:page-calltocontribute-title" />
        </h2>
        <DescriptionParagraph>
          <Translation id="page-developers-docs:page-calltocontribute-desc-1" />
        </DescriptionParagraph>
        <DescriptionParagraph>
          <Translation id="page-developers-docs:page-calltocontribute-desc-2" />
        </DescriptionParagraph>
        <DescriptionParagraph>
          <Translation id="page-developers-docs:page-calltocontribute-desc-3" />{" "}
          <InlineLink href="https://www.notion.so/efdn/Writer-template-4b40d196cde7422ca6a2091de33550bd">
            <Translation id="page-developers-docs:page-calltocontribute-link" />
          </InlineLink>
        </DescriptionParagraph>
        <DescriptionParagraph>
          <Translation id="page-developers-docs:page-calltocontribute-desc-4" />{" "}
          <InlineLink href="https://discord.gg/ethereum-org">
            <Translation id="page-developers-docs:page-calltocontribute-link-2" />
          </InlineLink>{" "}
        </DescriptionParagraph>
        <ButtonLink href={editPath}>
          <Github className="text-2xl" />
          <Translation id="page-developers-docs:page-calltocontribute-span" />
        </ButtonLink>
      </ContentColumn>
    </aside>
  )
}

export default CallToContribute
