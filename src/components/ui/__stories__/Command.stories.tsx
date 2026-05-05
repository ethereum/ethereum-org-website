import { Calendar, Settings, Smile, User, Wallet } from "lucide-react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { Button } from "../buttons/Button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../command"

const meta = {
  title: "UI / Primitives / Command",
  component: Command,
  parameters: {
    docs: {
      description: {
        component:
          "Command palette built on `cmdk`. Compose `Command` > `CommandInput` + `CommandList` containing `CommandGroup`s of `CommandItem`s. `CommandSeparator` divides groups, `CommandShortcut` annotates an item with a keyboard hint, `CommandEmpty` renders when filtering yields no matches. Wrap in `CommandDialog` for a modal palette (Cmd-K style).",
      },
    },
  },
} satisfies Meta<typeof Command>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Command className="max-w-md rounded-lg border">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Settings</CommandItem>
          <CommandItem>Profile</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

export const WithGroups: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Multiple `CommandGroup`s with headings let users scan by category.",
      },
    },
  },
  render: () => (
    <Command className="max-w-md rounded-lg border">
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar />
            Calendar
          </CommandItem>
          <CommandItem>
            <Smile />
            Search emoji
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Settings">
          <CommandItem>
            <User />
            Profile
          </CommandItem>
          <CommandItem>
            <Settings />
            Preferences
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

export const WithSeparators: Story = {
  render: () => (
    <Command className="max-w-md rounded-lg border">
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search emoji</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>Profile</CommandItem>
          <CommandItem>Preferences</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

export const WithShortcuts: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`CommandShortcut` renders a right-aligned hint inside an item. Useful for surfacing keyboard accelerators.",
      },
    },
  },
  render: () => (
    <Command className="max-w-md rounded-lg border">
      <CommandInput placeholder="Search commands..." />
      <CommandList>
        <CommandGroup heading="Quick actions">
          <CommandItem>
            New file
            <CommandShortcut>Ctrl+N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Open
            <CommandShortcut>Ctrl+O</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Save
            <CommandShortcut>Ctrl+S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

export const WithDisabledItem: Story = {
  render: () => (
    <Command className="max-w-md rounded-lg border">
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandGroup>
          <CommandItem>Connect wallet</CommandItem>
          <CommandItem disabled>Send transaction (no wallet)</CommandItem>
          <CommandItem>View history</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`CommandEmpty` renders when the active filter excludes every item. Pre-set the input value to show the empty state without typing.",
      },
    },
  },
  render: () => (
    <Command className="max-w-md rounded-lg border">
      <CommandInput placeholder="Search..." defaultValue="zzz no match" />
      <CommandList>
        <CommandEmpty>No results found for that query.</CommandEmpty>
        <CommandGroup>
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

export const InputWithKbdShortcut: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`CommandInput` accepts `kbdShortcut` to render a right-aligned hint instead of the search icon.",
      },
    },
  },
  render: () => (
    <Command className="max-w-md rounded-lg border">
      <CommandInput placeholder="Search..." kbdShortcut="Cmd+K" />
      <CommandList>
        <CommandGroup>
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

export const InputWithCustomIcon: Story = {
  render: () => (
    <Command className="max-w-md rounded-lg border">
      <CommandInput placeholder="Search wallets..." icon={Wallet} />
      <CommandList>
        <CommandGroup>
          <CommandItem>Connect MetaMask</CommandItem>
          <CommandItem>Connect Rainbow</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

const DialogDemo = () => (
  <CommandDialog defaultOpen>
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem>
          <Calendar />
          Calendar
        </CommandItem>
        <CommandItem>
          <Smile />
          Search emoji
        </CommandItem>
        <CommandItem>
          <User />
          Profile
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
)

export const AsDialog: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`CommandDialog` wraps `Command` in `Dialog` + `DialogContent` for a modal palette.",
      },
    },
  },
  render: () => (
    <>
      <Button variant="outline">Open command palette</Button>
      <DialogDemo />
    </>
  ),
}
