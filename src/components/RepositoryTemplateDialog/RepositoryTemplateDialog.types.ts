import type {
  NewRepositoryTemplateInput,
  RepositoryTemplate,
  Tag,
} from '../../models/AppData/types/domain';

export interface RepositoryTemplateDialogProps {
  open: boolean;
  tags: Tag[];
  template: RepositoryTemplate | null;
  onClose: () => void;
  onSubmit: (input: NewRepositoryTemplateInput) => Promise<void>;
}
