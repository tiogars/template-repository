import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import type { Meta, StoryObj } from '@storybook/react';

import { FloatingActions } from './index';

const meta = {
  title: 'Components/FloatingActions',
  component: FloatingActions,
  args: {
    actions: [
      {
        label: 'Add repository template',
        icon: <AddBoxOutlinedIcon />,
        onClick: () => undefined,
      },
    ],
  },
} satisfies Meta<typeof FloatingActions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
