import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Footer } from './index';

describe('Footer', () => {
  it('renders the repository link', () => {
    render(<Footer />);

    expect(screen.getByText('Repository')).toBeInTheDocument();
  });
});
