import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { Button, Card, CardActions, CardContent, Chip, Stack, Typography } from '@mui/material';

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
      <CardContent>
        <Stack spacing={1.5}>
          <Typography variant="h6">{template.name}</Typography>
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
        <Button
          size="small"
          startIcon={<EditOutlinedIcon />}
          onClick={() => onEdit(template)}
        >
          Edit
        </Button>
        <Button
          size="small"
          color="error"
          startIcon={<DeleteOutlineOutlinedIcon />}
          onClick={() => onDelete(template)}
        >
          Delete
        </Button>
        <Button
          size="small"
          startIcon={<OpenInNewOutlinedIcon />}
          href={template.url}
          target="_blank"
          rel="noreferrer"
        >
          Open repository
        </Button>
        <Button
          size="small"
          startIcon={<NoteAddOutlinedIcon />}
          href={`https://github.com/new?template_name=${encodeURIComponent(template.templateName)}&template_owner=${encodeURIComponent(template.templateOwner)}`}
          target="_blank"
          rel="noreferrer"
        >
          Use template
        </Button>
        <Button
          size="small"
          startIcon={<ShareOutlinedIcon />}
          onClick={() => onShare(template.url, template.name)}
        >
          Share
        </Button>
      </CardActions>
    </Card>
  );
}
