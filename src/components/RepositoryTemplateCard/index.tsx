import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { Card, CardActions, CardContent, CardHeader, Chip, IconButton, Stack, Tooltip, Typography } from '@mui/material';

import './RepositoryTemplateCard.css';
import type { RepositoryTemplateCardProps } from './RepositoryTemplateCard.types';

export function RepositoryTemplateCard({
  template,
  tags,
  onEdit,
  onDelete,
  onShare,
}: Readonly<RepositoryTemplateCardProps>) {
  const templateTags = tags.filter((tag) => template.tagIds.includes(tag.id));
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title={template.name}
        titleTypographyProps={{ variant: 'h6' }}
        action={
          <Stack direction="row">
            <Tooltip title="Edit">
              <IconButton size="small" onClick={() => onEdit(template)} aria-label="Edit">
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton size="small" color="error" onClick={() => onDelete(template)} aria-label="Delete">
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        }
      />
      <CardContent>
        <Stack spacing={1.5}>
          <Typography color="text.secondary">{template.description}</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {template.isSeeded ? <Chip size="small" label="Seeded" color="primary" /> : null}
            {templateTags.map((tag) => (
              <Chip
                key={tag.id}
                size="small"
                label={tag.label}
                sx={{ bgcolor: tag.color, color: 'white' }}
              />
            ))}
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Created: {new Date(template.createdAt).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Updated: {new Date(template.updatedAt).toLocaleDateString()}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Tooltip title="Open repository">
          <IconButton
            size="small"
            href={template.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open repository"
          >
            <GitHubIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Use template">
          <IconButton
            size="small"
            href={`https://github.com/new?template_name=${encodeURIComponent(template.templateName)}&template_owner=${encodeURIComponent(template.templateOwner)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Use template"
          >
            <NoteAddOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Share">
          <IconButton
            size="small"
            onClick={() => onShare(template.url, template.name)}
            aria-label="Share"
          >
            <ShareOutlinedIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
