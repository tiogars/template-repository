import type { ReactNode } from 'react';

export interface FloatingActionItem {
  label: string;
  icon: ReactNode;
  onClick: () => void;
}

export interface FloatingActionsProps {
  actions: FloatingActionItem[];
}
