import { CssBaseline, ThemeProvider } from '@mui/material';
import type { ReactNode } from 'react';

import { createAppTheme } from '../theme/createAppTheme';
import type { ThemeMode } from '../../models/AppData/types/domain';

interface AppProvidersProps {
  children: ReactNode;
  themeMode: ThemeMode;
}

export function AppProviders({ children, themeMode }: Readonly<AppProvidersProps>) {
  return (
    <ThemeProvider theme={createAppTheme(themeMode)}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
