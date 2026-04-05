import { createTheme } from '@mui/material/styles';

import type { ThemeMode } from '../../models/AppData/types/domain';

export function createAppTheme(mode: ThemeMode) {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#80cbc4' : '#4db6ac',
      },
      secondary: {
        main: mode === 'dark' ? '#ffcc80' : '#ffb74d',
      },
      background: {
        default: mode === 'dark' ? '#0f1720' : '#f4f7f7',
        paper: mode === 'dark' ? '#17212b' : '#ffffff',
      },
    },
    shape: {
      borderRadius: 16,
    },
    typography: {
      fontFamily: '"Segoe UI", "Helvetica Neue", sans-serif',
      h4: {
        fontWeight: 700,
      },
      h6: {
        fontWeight: 600,
      },
    },
  });
}
