const Deprecated = () => null
export default Deprecated
// import { Meta, StoryObj } from "@storybook/nextjs"

// import { ButtonLink } from "@/components/ui/buttons/Button"

// import Callout from "."

// import devBlocksImg from "@/public/images/developers-eth-blocks.png"

// const meta = {
//   title: "Components / Callouts / CalloutBanner",
//   component: Callout,
//   parameters: {
//     chromatic: { disableSnapshot: true },
//     docs: {
//       description: {
//         component:
//           "Pre-unification visual reference for the existing `CalloutBanner` (server). Horizontal banner with an image on the right and a title + description + children CTA on the left. Resolves `titleKey` / `descriptionKey` against the `page-staking` namespace by default; cross-namespace via `ns:key`. This component is one of the inputs to the unified `Callout` work in #18133.",
//       },
//     },
//   },
//   decorators: [
//     (Story) => (
//       <div className="mt-20">
//         <Story />
//       </div>
//     ),
//   ],
// } satisfies Meta<typeof Callout>

// export default meta

// type Story = StoryObj<typeof meta>

// export const Default: Story = {
//   args: {
//     titleKey: "page-staking-join-community",
//     descriptionKey: "page-staking-join-community-desc",
//     image: devBlocksImg,
//     imageWidth: 320,
//     alt: "Stylised illustration",
//     children: <ButtonLink href="/staking/">Get involved</ButtonLink>,
//   },
// }

// export const WithoutChildren: Story = {
//   args: {
//     titleKey: "page-staking-join-community",
//     descriptionKey: "page-staking-join-community-desc",
//     image: devBlocksImg,
//     imageWidth: 320,
//     alt: "Stylised illustration",
//   },
// }
