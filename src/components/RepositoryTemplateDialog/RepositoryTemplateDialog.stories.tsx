import type { Meta, StoryObj } from '@storybook/react';

import { RepositoryTemplateDialog } from './index';

const meta = {
  title: 'Components/RepositoryTemplateDialog',
  component: RepositoryTemplateDialog,
  args: {
    open: true,
    tags: [{ id: 'tag-1', label: 'frontend', color: '#00695c' }],
    template: null,
    onClose: () => undefined,
    onSubmit: async () => undefined,
  },
} satisfies Meta<typeof RepositoryTemplateDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
