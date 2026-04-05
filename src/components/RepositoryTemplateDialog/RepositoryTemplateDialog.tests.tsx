import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { RepositoryTemplateDialog } from './index';

describe('RepositoryTemplateDialog', () => {
  it('renders the form title when open', () => {
    render(
      <RepositoryTemplateDialog
        open={true}
        tags={[]}
        template={null}
        onClose={() => undefined}
        onSubmit={async () => undefined}
      />,
    );

    expect(screen.getByText('Add repository template')).toBeInTheDocument();
  });

  it('renders the edit title when a template is provided', () => {
    render(
      <RepositoryTemplateDialog
        open={true}
        tags={[]}
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
        onClose={() => undefined}
        onSubmit={async () => undefined}
      />,
    );

    expect(screen.getByText('Edit repository template')).toBeInTheDocument();
  });
});
