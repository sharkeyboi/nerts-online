import type { Meta, StoryObj } from '@storybook/vue3';
import Modal from "~/components/Utils/Modal.vue"

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
    title: 'Utils/Modal',
    component: Modal,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
    decorators: [() => ({ template: '<div style="margin: 6em;"><story/></div>' })],
    argTypes: {
    },
    args: {}, // default value
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Hidden: Story = {
    args: {
        show: false
    },
};

export const Show: Story = {
    args: {
        show: true
    }
}