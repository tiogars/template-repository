import type { Preview } from '@storybook/react';
import { CssBaseline, ThemeProvider } from '@mui/material';

import '../src/stories/storybook.css';
import { createAppTheme } from '../src/app/theme/createAppTheme';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={createAppTheme('light')}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'fullscreen',
  },
};

export default preview;
