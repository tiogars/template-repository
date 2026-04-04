import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { TagDialog } from './index';

describe('TagDialog', () => {
  it('renders the add tag action', () => {
    render(
      <TagDialog
        open={true}
        tags={[]}
        onClose={() => undefined}
        onAdd={async () => undefined}
        onUpdate={async () => undefined}
        onDelete={async () => undefined}
      />,
    );

    expect(screen.getByText('Add tag')).toBeInTheDocument();
  });

  it('renders edit and delete buttons for each tag', () => {
    render(
      <TagDialog
        open={true}
        tags={[{ id: 'tag-1', label: 'TypeScript', color: '#3178c6' }]}
        onClose={() => undefined}
        onAdd={async () => undefined}
        onUpdate={async () => undefined}
        onDelete={async () => undefined}
      />,
    );

    expect(screen.getByRole('button', { name: 'Edit TypeScript' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete TypeScript' })).toBeInTheDocument();
  });

  it('calls onDelete when the delete button is clicked', () => {
    const onDelete = vi.fn(async () => undefined);

    render(
      <TagDialog
        open={true}
        tags={[{ id: 'tag-1', label: 'TypeScript', color: '#3178c6' }]}
        onClose={() => undefined}
        onAdd={async () => undefined}
        onUpdate={async () => undefined}
        onDelete={onDelete}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Delete TypeScript' }));

    expect(onDelete).toHaveBeenCalledWith('tag-1');
  });
});
