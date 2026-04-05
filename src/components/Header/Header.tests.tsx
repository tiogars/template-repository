import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Header } from './index';

afterEach(cleanup);

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

  it('calls the seeded favorite toggle handler when the mobile switch is changed', () => {
    const handleToggleSeededFavorite = vi.fn();

    render(
      <Header
        themeMode="light"
        showSeededFavorite={true}
        onToggleTheme={() => undefined}
        onToggleSeededFavorite={handleToggleSeededFavorite}
      />,
    );

    fireEvent.click(screen.getByLabelText('Toggle seeded favorite'));

    expect(handleToggleSeededFavorite).toHaveBeenCalledTimes(1);
  });
});
