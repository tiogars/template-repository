import type { ThemeMode } from '../../models/AppData/types/domain';

export interface HeaderProps {
  themeMode: ThemeMode;
  showSeededFavorite: boolean;
  onToggleTheme: () => void;
  onToggleSeededFavorite: () => void;
}
