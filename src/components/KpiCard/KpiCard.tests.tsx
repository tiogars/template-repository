import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { KpiCard } from './index';

describe('KpiCard', () => {
  it('renders the value', () => {
    render(<KpiCard label="Repository templates" value="4" />);

    expect(screen.getByText('4')).toBeInTheDocument();
  });
});
