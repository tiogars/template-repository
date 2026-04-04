import type { Meta, StoryObj } from '@storybook/react';

import { TagDialog } from './index';

const meta = {
  title: 'Components/TagDialog',
  component: TagDialog,
  args: {
    open: true,
    tags: [{ id: 'tag-1', label: 'frontend', color: '#00695c' }],
    onClose: () => undefined,
    onAdd: async () => undefined,
    onUpdate: async () => undefined,
    onDelete: async () => undefined,
  },
} satisfies Meta<typeof TagDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
