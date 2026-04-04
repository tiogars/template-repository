import type { Meta, StoryObj } from '@storybook/react';

import { Header } from './index';

const meta = {
  title: 'Components/Header',
  component: Header,
  args: {
    themeMode: 'light',
    showSeededFavorite: true,
    onToggleTheme: () => undefined,
    onToggleSeededFavorite: () => undefined,
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
