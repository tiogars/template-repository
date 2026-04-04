import type { ThemeMode } from '../../models/MyModel/types/domain';

export interface HeaderProps {
  themeMode: ThemeMode;
  showSeededFavorite: boolean;
  onToggleTheme: () => void;
  onToggleSeededFavorite: () => void;
}
