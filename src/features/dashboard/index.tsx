import { Chip, Grid, Stack, Typography } from '@mui/material';

import { KpiCard } from '../../components/KpiCard';
import { RepositoryTemplateCard } from '../../components/RepositoryTemplateCard';
import type { RepositoryTemplate, Tag } from '../../models/AppData/types/domain';

interface DashboardPageProps {
  templates: RepositoryTemplate[];
  repositoryCount: number;
  lastBackupAt: string | null;
  tags: Tag[];
  selectedTagIds: string[];
  onEditTemplate: (template: RepositoryTemplate) => void;
  onDeleteTemplate: (template: RepositoryTemplate) => void;
  onShareTemplate: (url: string, title: string) => void;
  onToggleTagFilter: (tagId: string) => void;
  onClearTagFilter: () => void;
}

export function DashboardPage({
  templates,
  repositoryCount,
  lastBackupAt,
  tags,
  selectedTagIds,
  onEditTemplate,
  onDeleteTemplate,
  onShareTemplate,
  onToggleTagFilter,
  onClearTagFilter,
}: Readonly<DashboardPageProps>) {
  return (
    <Stack spacing={3}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <KpiCard label="Repository templates" value={String(repositoryCount)} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <KpiCard
            label="Last backup"
            value={lastBackupAt ? new Date(lastBackupAt).toLocaleString() : 'Never'}
          />
        </Grid>
      </Grid>

      {tags.length > 0 ? (
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
          {tags.map((tag) => {
            const isActive = selectedTagIds.includes(tag.id);
            return (
              <Chip
                key={tag.id}
                label={tag.label}
                onClick={() => onToggleTagFilter(tag.id)}
                onDelete={isActive ? () => onToggleTagFilter(tag.id) : undefined}
                variant={isActive ? 'filled' : 'outlined'}
                sx={isActive ? { bgcolor: tag.color, color: 'white' } : {}}
              />
            );
          })}
          {selectedTagIds.length > 0 ? (
            <Chip label="Clear filter" size="small" variant="outlined" onClick={onClearTagFilter} />
          ) : null}
        </Stack>
      ) : null}

      {templates.length === 0 ? (
        <Typography color="text.secondary">
          No repository template is currently visible. Toggle the seeded
          favorite or add a new template.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {templates.map((template) => (
            <Grid key={template.id} size={{ xs: 12, md: 6, xl: 4 }}>
              <RepositoryTemplateCard
                template={template}
                tags={tags}
                onEdit={onEditTemplate}
                onDelete={onDeleteTemplate}
                onShare={onShareTemplate}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Stack>
  );
}
