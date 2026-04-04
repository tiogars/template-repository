import type { Tag } from '../../models/MyModel/types/domain';

export interface TagDialogProps {
  open: boolean;
  tags: Tag[];
  onClose: () => void;
  onAdd: (label: string) => Promise<void>;
  onUpdate: (tagId: string, label: string) => Promise<void>;
  onDelete: (tagId: string) => Promise<void>;
}
