import type { Meta, StoryObj } from "@storybook/react";

const meta = {
    title: "Test"
} satisfies Meta

export default meta

export const Test: StoryObj = {
    render: () => <div className="eth-text-primary-hover">Test</div>
}