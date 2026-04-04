import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import { useState } from 'react';

import './TagDialog.css';
import type { TagDialogProps } from './TagDialog.types';
import type { Tag } from '../../models/AppData/types/domain';

export function TagDialog({
  open,
  tags,
  onClose,
  onAdd,
  onUpdate,
  onDelete,
}: Readonly<TagDialogProps>) {
  const [label, setLabel] = useState('');
  const [editingTagId, setEditingTagId] = useState<string | null>(null);
  const [editingLabel, setEditingLabel] = useState('');

  async function handleAdd() {
    if (!label.trim()) return;
    await onAdd(label.trim());
    setLabel('');
  }

  function handleStartEdit(tag: Tag) {
    setEditingTagId(tag.id);
    setEditingLabel(tag.label);
  }

  async function handleSaveEdit() {
    if (!editingTagId || !editingLabel.trim()) return;
    await onUpdate(editingTagId, editingLabel.trim());
    setEditingTagId(null);
    setEditingLabel('');
  }

  function handleCancelEdit() {
    setEditingTagId(null);
    setEditingLabel('');
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Manage tags</DialogTitle>
      <DialogContent>
        <Stack direction="row" spacing={1} alignItems="flex-start">
          <TextField
            margin="normal"
            label="New tag label"
            fullWidth
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') void handleAdd();
            }}
          />
          <Box sx={{ mt: 2.5 }}>
            <Button
              onClick={() => void handleAdd()}
              variant="contained"
              sx={{ whiteSpace: 'nowrap', mt: 0.5 }}
            >
              Add tag
            </Button>
          </Box>
        </Stack>
        <Stack spacing={1} className="tag-dialog-list">
          {tags.map((tag) =>
            editingTagId === tag.id ? (
              <Stack key={tag.id} direction="row" spacing={1} alignItems="center">
                <TextField
                  size="small"
                  fullWidth
                  value={editingLabel}
                  onChange={(event) => setEditingLabel(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') void handleSaveEdit();
                    if (event.key === 'Escape') handleCancelEdit();
                  }}
                  autoFocus
                />
                <Button size="small" onClick={() => void handleSaveEdit()}>
                  Save
                </Button>
                <Button size="small" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              </Stack>
            ) : (
              <Stack key={tag.id} direction="row" spacing={1} alignItems="center">
                <Chip
                  label={tag.label}
                  sx={{ bgcolor: tag.color, color: 'white', flex: 1 }}
                />
                <IconButton
                  size="small"
                  aria-label={`Edit ${tag.label}`}
                  onClick={() => handleStartEdit(tag)}
                >
                  <EditOutlinedIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  aria-label={`Delete ${tag.label}`}
                  onClick={() => void onDelete(tag.id)}
                >
                  <DeleteOutlineOutlinedIcon fontSize="small" />
                </IconButton>
              </Stack>
            ),
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
