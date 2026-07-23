import { Flex } from "@/components/ui/flex"

export interface Contributor {
  login: string
  name: string
  avatar_url: string
  profile?: string
}

interface ContributorsViewProps {
  contributors: Contributor[]
}

const cardClassName =
  "hover:bg-background-highlight m-2 block max-w-[132px] shadow transition-transform duration-100 hover:scale-[1.02] hover:rounded focus:scale-[1.02] focus:rounded"

const ContributorCard = ({ contributor }: { contributor: Contributor }) => {
  const body = (
    <>
      {/*
       * Plain <img> over next/image by design. We render ~1,500 cards;
       * <Image> expands each avatar into a ~13-variant srcSet (~1.8 KB per
       * card → ~3 MB extra HTML). GitHub avatars are served at a fixed
       * 132×132 and don't benefit from /_next/image negotiation here.
       */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="size-[132px]"
        src={contributor.avatar_url}
        alt=""
        loading="lazy"
        decoding="async"
      />
      <div className="p-4">
        <h3 className="mt-2 mb-4 text-md text-body">{contributor.name}</h3>
      </div>
    </>
  )

  if (contributor.profile) {
    // target="_blank" preserves the behavior of the original <InlineLink>
    // wrapper, which auto-applied it for external hrefs.
    return (
      <a
        href={contributor.profile}
        target="_blank"
        rel="noopener noreferrer"
        className={`${cardClassName} text-body no-underline hover:no-underline`}
      >
        {body}
      </a>
    )
  }

  return <div className={cardClassName}>{body}</div>
}

const ContributorsView = ({ contributors }: ContributorsViewProps) => (
  <>
    <p>
      Thanks to our {contributors.length} Ethereum community members who have
      contributed so far!
    </p>

    <Flex className="flex-wrap">
      {contributors.map((contributor) => (
        <ContributorCard key={contributor.login} contributor={contributor} />
      ))}
    </Flex>
  </>
)

export default ContributorsView
