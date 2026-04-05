import type { Meta, StoryObj } from '@storybook/react';

import { RepositoryTemplateCard } from './index';

const meta = {
  title: 'Components/RepositoryTemplateCard',
  component: RepositoryTemplateCard,
  args: {
    template: {
      id: 'template-1',
      name: 'tiogars/template-repository',
      url: 'https://github.com/tiogars/template-repository',
      description: 'Reference repository template scaffold.',
      templateName: 'template-repository',
      templateOwner: 'tiogars',
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-04-04T00:00:00.000Z',
      tagIds: ['tag-1'],
      isSeeded: true,
      isVisible: true,
    },
    tags: [
      { id: 'tag-1', label: 'TypeScript', color: '#3178c6' },
    ],
    onEdit: () => undefined,
    onDelete: () => undefined,
    onShare: () => undefined,
  },
} satisfies Meta<typeof RepositoryTemplateCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
