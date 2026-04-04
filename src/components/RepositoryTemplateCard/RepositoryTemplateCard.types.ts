import type { RepositoryTemplate, Tag } from '../../models/MyModel/types/domain';

export interface RepositoryTemplateCardProps {
  template: RepositoryTemplate;
  tags: Tag[];
  onEdit: (template: RepositoryTemplate) => void;
  onDelete: (template: RepositoryTemplate) => void;
  onShare: (url: string) => void;
}
