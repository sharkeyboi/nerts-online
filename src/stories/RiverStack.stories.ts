import type { Meta, StoryObj } from '@storybook/vue3';
import RiverStack from "~/components/Match/RiverStack.vue"
import { Suit } from '../types/card';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
    title: 'Nerts/RiverStack',
    component: RiverStack,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
    argTypes: {
    },
    args: {}, // default value
} satisfies Meta<typeof RiverStack>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Empty: Story = {
    args: {
        cards: [],
        draggable: true,
        index: 0
    },
};

export const OneCard: Story = {
    args: {
        cards: [{
            suit: Suit.Heart,
            number: "K"
        }],
        draggable: true,
        index: 0
    }
}

export const MultipleCards: Story = {
    args: {
        cards: [{
            suit: Suit.Heart,
            number: "K"
        }, {
            suit: Suit.Spade,
            number: "Q"
        }],
        draggable: true,
        index: 0
    }
}