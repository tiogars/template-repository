import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { FloatingActions } from './index';

describe('FloatingActions', () => {
  it('renders the speed dial', () => {
    render(<FloatingActions actions={[{ label: 'Add', icon: <span>A</span>, onClick: () => undefined }]} />);

    expect(screen.getByLabelText('Primary actions')).toBeInTheDocument();
  });
});
