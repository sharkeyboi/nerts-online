import type { Meta, StoryObj } from '@storybook/vue3';
import Scores from "~/components/Match/Scores.vue"

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
    title: 'Match/Scores',
    component: Scores,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
    decorators: [() => ({ template: '<div style="margin-left: 500px; margin-right: 500px;"><story/></div>' })],
    argTypes: {
    },
    args: {}, // default value
} satisfies Meta<typeof Scores>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */

export const Show: Story = {
    args: {
        scores: [[{
            userID: "Eric",
            score: 10
        },
        {
            userID: "Other",
            score: 20
        }], [{
            userID: "Eric",
            score: -2
        },
        {
            userID: "Other",
            score: 49
        }]]
    }
}

