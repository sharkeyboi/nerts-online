import type { Meta, StoryObj } from '@storybook/vue3';
import PlayingCard from "~/components/Match/PlayingCard.vue"
import { Suit } from '../types/card';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
    title: 'Nerts/PlayingCard',
    component: PlayingCard,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
    argTypes: {
    },
    args: {}, // default value
} satisfies Meta<typeof PlayingCard>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const AceOfSpades: Story = {
    args: {
        card: {
            suit: Suit.Spade,
            number: "A"
        },
        draggable: true
    },
};
