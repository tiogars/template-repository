import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Header } from './index';

describe('Header', () => {
  it('calls the theme toggle handler', () => {
    const handleToggleTheme = vi.fn();

    render(
      <Header
        themeMode="light"
        showSeededFavorite={true}
        onToggleTheme={handleToggleTheme}
        onToggleSeededFavorite={() => undefined}
      />,
    );

    fireEvent.click(screen.getByLabelText('Toggle theme'));

    expect(handleToggleTheme).toHaveBeenCalledTimes(1);
  });
});
