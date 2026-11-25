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

// Card styles live on the grid and target its children: with ~1,500 cards,
// per-card class strings cost ~0.9 MB across the HTML and the RSC payload,
// which pushed /contributing/ past crawlers' 2 MB page limit.
const gridClassName = [
  "flex-wrap",
  "*:m-2 *:block *:max-w-[132px] *:shadow *:transition-transform *:duration-100",
  "*:hover:scale-[1.02] *:hover:rounded *:hover:bg-background-highlight",
  "*:focus:scale-[1.02] *:focus:rounded",
  "*:text-body *:no-underline *:hover:no-underline",
  "[&_img]:size-[132px] [&_h3]:mt-2 [&_h3]:mb-4 [&_h3]:text-md [&_h3]:text-body",
].join(" ")

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
        src={contributor.avatar_url}
        alt=""
        loading="lazy"
        decoding="async"
      />
      <div className="p-4">
        <h3>{contributor.name}</h3>
      </div>
    </>
  )

  if (contributor.profile) {
    // target="_blank" preserves the behavior of the original <InlineLink>
    // wrapper, which auto-applied it for external hrefs.
    return (
      <a href={contributor.profile} target="_blank" rel="noopener noreferrer">
        {body}
      </a>
    )
  }

  return <div>{body}</div>
}

const ContributorsView = ({ contributors }: ContributorsViewProps) => (
  <>
    <p>
      Thanks to our {contributors.length} Ethereum community members who have
      contributed so far!
    </p>

    <Flex className={gridClassName}>
      {contributors.map((contributor) => (
        <ContributorCard key={contributor.login} contributor={contributor} />
      ))}
    </Flex>
  </>
)

export default ContributorsView
