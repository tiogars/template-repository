import { SpeedDial, SpeedDialAction } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import './FloatingActions.css';
import type { FloatingActionsProps } from './FloatingActions.types';

export function FloatingActions({ actions }: Readonly<FloatingActionsProps>) {
  return (
    <div className="floating-actions-root">
      <SpeedDial ariaLabel="Primary actions" icon={<AddIcon />}>
        {actions.map((action) => (
          <SpeedDialAction
            key={action.label}
            icon={action.icon}
            tooltipTitle={action.label}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
