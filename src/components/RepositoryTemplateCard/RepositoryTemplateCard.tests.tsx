import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { RepositoryTemplateCard } from './index';

describe('RepositoryTemplateCard', () => {
  it('renders the repository name', () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const onShare = vi.fn();

    render(
      <RepositoryTemplateCard
        template={{
          id: 'template-1',
          name: 'tiogars/template-repository',
          url: 'https://github.com/tiogars/template-repository',
          description: 'Reference repository template scaffold.',
          templateName: 'template-repository',
          templateOwner: 'tiogars',
          createdAt: '2026-01-01T00:00:00.000Z',
          updatedAt: '2026-04-04T00:00:00.000Z',
          tagIds: ['tag-1'],
          isSeeded: true,
          isVisible: true,
        }}
        tags={[{ id: 'tag-1', label: 'TypeScript', color: '#3178c6' }]}
        onEdit={onEdit}
        onDelete={onDelete}
        onShare={onShare}
      />,
    );

    expect(screen.getByText('tiogars/template-repository')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('calls edit and delete handlers', () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const onShare = vi.fn();

    const view = render(
      <RepositoryTemplateCard
        template={{
          id: 'template-1',
          name: 'tiogars/template-repository',
          url: 'https://github.com/tiogars/template-repository',
          description: 'Reference repository template scaffold.',
          templateName: 'template-repository',
          templateOwner: 'tiogars',
          createdAt: '2026-01-01T00:00:00.000Z',
          updatedAt: '2026-04-04T00:00:00.000Z',
          tagIds: [],
          isSeeded: true,
          isVisible: true,
        }}
        tags={[]}
        onEdit={onEdit}
        onDelete={onDelete}
        onShare={onShare}
      />,
    );

    fireEvent.click(within(view.container).getByRole('button', { name: 'Edit' }));
    fireEvent.click(within(view.container).getByRole('button', { name: 'Delete' }));

    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('calls share handler with template URL when Share is clicked', () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const onShare = vi.fn();

    const view = render(
      <RepositoryTemplateCard
        template={{
          id: 'template-1',
          name: 'tiogars/template-repository',
          url: 'https://github.com/tiogars/template-repository',
          description: 'Reference repository template scaffold.',
          templateName: 'template-repository',
          templateOwner: 'tiogars',
          createdAt: '2026-01-01T00:00:00.000Z',
          updatedAt: '2026-04-04T00:00:00.000Z',
          tagIds: [],
          isSeeded: true,
          isVisible: true,
        }}
        tags={[]}
        onEdit={onEdit}
        onDelete={onDelete}
        onShare={onShare}
      />,
    );

    fireEvent.click(within(view.container).getByRole('button', { name: 'Share' }));

    expect(onShare).toHaveBeenCalledTimes(1);
    expect(onShare).toHaveBeenCalledWith('https://github.com/tiogars/template-repository', 'tiogars/template-repository');
  });

  it('renders a "Use template" link with the correct href', () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const onShare = vi.fn();

    const view = render(
      <RepositoryTemplateCard
        template={{
          id: 'template-1',
          name: 'tiogars/template-repository',
          url: 'https://github.com/tiogars/template-repository',
          description: 'Reference repository template scaffold.',
          templateName: 'template-repository',
          templateOwner: 'tiogars',
          createdAt: '2026-01-01T00:00:00.000Z',
          updatedAt: '2026-04-04T00:00:00.000Z',
          tagIds: [],
          isSeeded: true,
          isVisible: true,
        }}
        tags={[]}
        onEdit={onEdit}
        onDelete={onDelete}
        onShare={onShare}
      />,
    );

    const useTemplateLink = within(view.container).getByRole('link', { name: /use template/i });
    expect(useTemplateLink).toHaveAttribute(
      'href',
      'https://github.com/new?template_name=template-repository&template_owner=tiogars',
    );
    expect(useTemplateLink).toHaveAttribute('target', '_blank');
    expect(useTemplateLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
