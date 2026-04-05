import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import './RepositoryTemplateDialog.css';
import type { RepositoryTemplateDialogProps } from './RepositoryTemplateDialog.types';
import type { NewRepositoryTemplateInput } from '../../models/AppData/types/domain';

const defaultValues: NewRepositoryTemplateInput = {
  name: '',
  url: '',
  description: '',
  templateName: '',
  templateOwner: '',
  tagIds: [],
};

export function RepositoryTemplateDialog({
  open,
  tags,
  template,
  onClose,
  onSubmit,
}: Readonly<RepositoryTemplateDialogProps>) {
  const { control, handleSubmit, reset } =
    useForm<NewRepositoryTemplateInput>({
      defaultValues,
    });

  useEffect(() => {
    if (!open) {
      reset(defaultValues);
      return;
    }

    if (template) {
      reset({
        name: template.name,
        url: template.url,
        description: template.description,
        templateName: template.templateName,
        templateOwner: template.templateOwner,
        tagIds: template.tagIds,
      });
      return;
    }

    reset(defaultValues);
  }, [open, reset, template]);

  async function submitForm(values: NewRepositoryTemplateInput) {
    await onSubmit(values);
    reset(defaultValues);
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {template ? 'Edit repository template' : 'Add repository template'}
      </DialogTitle>
      <DialogContent>
        <form
          className="repository-template-dialog-form"
          onSubmit={handleSubmit(submitForm)}
          id="repository-template-form"
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                label="Repository name"
                fullWidth
                required
              />
            )}
          />
          <Controller
            name="url"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                label="Repository URL"
                fullWidth
                required
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                label="Description"
                fullWidth
                multiline
                minRows={3}
              />
            )}
          />
          <Controller
            name="templateName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                label="Template name"
                fullWidth
              />
            )}
          />
          <Controller
            name="templateOwner"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                label="Repository owner"
                fullWidth
              />
            )}
          />
          <Controller
            name="tagIds"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                label="Tags"
                fullWidth
                select
                slotProps={{
                  select: {
                  multiple: true,
                  value: field.value,
                  },
                }}
              >
                {tags.map((tag) => (
                  <MenuItem key={tag.id} value={tag.id}>
                    {tag.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" form="repository-template-form" variant="contained">
          {template ? 'Update' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
