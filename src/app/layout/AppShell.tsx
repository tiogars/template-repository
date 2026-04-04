import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Stack,
} from '@mui/material';

import { FloatingActions } from '../../components/FloatingActions';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { RepositoryTemplateDialog } from '../../components/RepositoryTemplateDialog';
import { TagDialog } from '../../components/TagDialog';
import { DashboardPage } from '../../features/dashboard';
import type { DashboardController } from '../../models/AppData/controllers/useDashboardController';
import type { RepositoryTemplate } from '../../models/AppData/types/domain';

interface AppShellProps {
  controller: DashboardController;
}

export function AppShell({ controller }: Readonly<AppShellProps>) {
  const importInputRef = useRef<HTMLInputElement | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<RepositoryTemplate | null>(null);
  const [pendingImportFile, setPendingImportFile] = useState<File | null>(null);

  function handleDeleteTemplate(template: RepositoryTemplate) {
    setDeleteTarget(template);
  }

  function handleConfirmDelete() {
    if (!deleteTarget) return;
    void controller.deleteRepositoryTemplate(deleteTarget.id);
    setDeleteTarget(null);
  }

  function handleImportChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setPendingImportFile(file);
    event.target.value = '';
  }

  function handleImportStrategy(strategy: 'merge' | 'replace') {
    if (!pendingImportFile) return;
    void controller.importDataSet(pendingImportFile, strategy);
    setPendingImportFile(null);
  }

  if (controller.isLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        themeMode={controller.themeMode}
        showSeededFavorite={controller.showSeededFavorite}
        onToggleTheme={controller.toggleThemeMode}
        onToggleSeededFavorite={controller.toggleSeededFavoriteVisibility}
      />
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        <Stack spacing={3}>
          {controller.showBackupAlert ? (
            <Alert severity="warning">
              JSON export has not been executed recently. Use the export
              action to refresh your local backup.
            </Alert>
          ) : null}
          <DashboardPage
            templates={controller.visibleTemplates}
            repositoryCount={controller.visibleTemplates.length}
            lastBackupAt={controller.lastBackupAt}
            tags={controller.tags}
            selectedTagIds={controller.selectedTagIds}
            onEditTemplate={controller.openTemplateEditor}
            onDeleteTemplate={handleDeleteTemplate}
            onShareTemplate={(url, title) => { void controller.shareRepositoryTemplate(url, title); }}
            onToggleTagFilter={controller.toggleTagFilter}
            onClearTagFilter={controller.clearTagFilter}
          />
        </Stack>
      </Container>
      <Footer />
      <FloatingActions
        actions={[
          {
            icon: <AddBoxOutlinedIcon />,
            label: 'Add repository template',
            onClick: controller.openTemplateDialog,
          },
          {
            icon: <LabelOutlinedIcon />,
            label: 'Manage tags',
            onClick: controller.openTagDialog,
          },
          {
            icon: <UploadOutlinedIcon />,
            label: 'Import JSON',
            onClick: () => importInputRef.current?.click(),
          },
          {
            icon: <DownloadOutlinedIcon />,
            label: 'Export JSON',
            onClick: () => {
              void controller.exportDataSet();
            },
          },
        ]}
      />
      <input
        ref={importInputRef}
        type="file"
        accept="application/json"
        hidden
        onChange={handleImportChange}
      />
      <RepositoryTemplateDialog
        open={controller.isTemplateDialogOpen}
        tags={controller.tags}
        template={controller.editingTemplate}
        onClose={controller.closeTemplateDialog}
        onSubmit={controller.saveRepositoryTemplate}
      />
      <TagDialog
        open={controller.isTagDialogOpen}
        tags={controller.tags}
        onClose={controller.closeTagDialog}
        onAdd={controller.addTag}
        onUpdate={controller.updateTag}
        onDelete={controller.deleteTag}
      />
      <Dialog open={deleteTarget !== null} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Delete repository template</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Delete &ldquo;{deleteTarget?.name}&rdquo;? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={pendingImportFile !== null} onClose={() => setPendingImportFile(null)}>
        <DialogTitle>Import dataset</DialogTitle>
        <DialogContent>
          <DialogContentText>
            How would you like to import{' '}
            <strong>{pendingImportFile?.name}</strong>?
          </DialogContentText>
          <DialogContentText sx={{ mt: 1 }}>
            <strong>Merge</strong> keeps existing templates and adds new ones.
            <br />
            <strong>Replace</strong> discards all existing data.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPendingImportFile(null)}>Cancel</Button>
          <Button onClick={() => handleImportStrategy('merge')}>Merge</Button>
          <Button
            variant="contained"
            onClick={() => handleImportStrategy('replace')}
          >
            Replace
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={controller.feedback !== null}
        autoHideDuration={4000}
        onClose={controller.clearFeedback}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={controller.feedback?.severity}
          onClose={controller.clearFeedback}
          variant="filled"
        >
          {controller.feedback?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
