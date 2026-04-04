import { Card, CardContent, Typography } from '@mui/material';

import './KpiCard.css';
import type { KpiCardProps } from './KpiCard.types';

export function KpiCard({ label, value }: Readonly<KpiCardProps>) {
  return (
    <Card>
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          {label}
        </Typography>
        <Typography variant="h4" className="kpi-card-value">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
