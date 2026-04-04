import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Container, Link, Stack, Typography } from '@mui/material';

import './Footer.css';

export function Footer() {
  return (
    <Box component="footer" sx={{ borderTop: 1, borderColor: 'divider', py: 3 }}>
      <Container>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
        >
          <Typography variant="body2" color="text.secondary">
            Copyright Tiogars 2026
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Powered by React, Vite, TypeScript, and Material UI
          </Typography>
          <Stack direction="row" spacing={2}>
            <Link className="footer-links" href="https://github.com/tiogars/template-repository">
              <GitHubIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
              Repository
            </Link>
            <Link
              className="footer-links"
              href="https://github.com/tiogars/template-repository/issues"
            >
              <BugReportOutlinedIcon
                fontSize="small"
                sx={{ mr: 0.5, verticalAlign: 'middle' }}
              />
              Issues
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
