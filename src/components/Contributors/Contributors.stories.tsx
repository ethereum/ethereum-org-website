import { Meta, StoryObj } from "@storybook/react"

import ContributorsComponent, { type Contributor } from "."

const meta = {
  title: "Molecules / Display Content / Contributors",
  component: ContributorsComponent,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <article className="max-w-3xl scroll-mt-24">
        <Story />
      </article>
    ),
  ],
} satisfies Meta<typeof ContributorsComponent>

export default meta

type Story = StoryObj<typeof meta>

const mockContributors: Contributor[] = [
  {
    login: "carlfairclough",
    name: "Carl Fairclough",
    avatar_url: "https://avatars1.githubusercontent.com/u/4670881?v=4",
    profile: "http://carlfairclough.me",
    contributions: ["design", "code", "bug"],
  },
  {
    login: "RichardMcSorley",
    name: "Richard McSorley",
    avatar_url: "https://avatars2.githubusercontent.com/u/6407008?v=4",
    profile: "https://github.com/RichardMcSorley",
    contributions: ["code"],
  },
  {
    login: "ajsantander",
    name: "Alejandro Santander",
    avatar_url: "https://avatars2.githubusercontent.com/u/550409?v=4",
    profile: "http://ajsantander.github.io/",
    contributions: ["content"],
  },
  {
    login: "Lililashka",
    name: "Lililashka",
    avatar_url: "https://avatars1.githubusercontent.com/u/28689401?v=4",
    profile: "http://impermanence.co",
    contributions: ["design", "bug"],
  },
  {
    login: "chriseth",
    name: "chriseth",
    avatar_url: "https://avatars2.githubusercontent.com/u/9073706?v=4",
    profile: "https://github.com/chriseth",
    contributions: ["content", "review"],
  },
  {
    login: "fzeoli",
    name: "Franco Zeoli",
    avatar_url: "https://avatars2.githubusercontent.com/u/232174?v=4",
    profile: "https://nomiclabs.io",
    contributions: ["content", "review"],
  },
  {
    login: "P1X3L0V4",
    name: "Anna Karpińska",
    avatar_url: "https://avatars2.githubusercontent.com/u/3372341?v=4",
    profile: "https://github.com/P1X3L0V4",
    contributions: ["translation"],
  },
  {
    login: "vrde",
    name: "vrde",
    avatar_url: "https://avatars1.githubusercontent.com/u/134680?v=4",
    profile: "https://github.com/vrde",
    contributions: ["content"],
  },
  {
    login: "AlexandrouR",
    name: "Rousos Alexandros",
    avatar_url: "https://avatars1.githubusercontent.com/u/21177075?v=4",
    profile: "https://github.com/AlexandrouR",
    contributions: ["content"],
  },
  {
    login: "eswarasai",
    name: "Eswara Sai",
    avatar_url: "https://avatars2.githubusercontent.com/u/5172086?v=4",
    profile: "https://eswarasai.com",
    contributions: ["code"],
  },
]

export const Contributors: Story = {
  args: {
    contributors: mockContributors,
  },
}
