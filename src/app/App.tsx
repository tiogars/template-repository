import { AppShell } from './layout/AppShell';
import { AppProviders } from './providers/AppProviders';
import { useDashboardController } from '../models/MyModel/controllers/useDashboardController';

export function App() {
  const controller = useDashboardController();

  return (
    <AppProviders themeMode={controller.themeMode}>
      <AppShell controller={controller} />
    </AppProviders>
  );
}
