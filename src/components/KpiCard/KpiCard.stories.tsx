import type { Meta, StoryObj } from '@storybook/react';

import { KpiCard } from './index';

const meta = {
  title: 'Components/KpiCard',
  component: KpiCard,
  args: {
    label: 'Repository templates',
    value: '1',
  },
} satisfies Meta<typeof KpiCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
