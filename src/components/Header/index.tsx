import AutoAwesomeMotionOutlinedIcon from '@mui/icons-material/AutoAwesomeMotionOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import {
  AppBar,
  Box,
  FormControlLabel,
  IconButton,
  Switch,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';

import './Header.css';
import type { HeaderProps } from './Header.types';

export function Header({
  themeMode,
  showSeededFavorite,
  onToggleTheme,
  onToggleSeededFavorite,
}: Readonly<HeaderProps>) {
  return (
    <AppBar position="sticky" color="transparent" elevation={0}>
      <Toolbar sx={{ gap: 2, backdropFilter: 'blur(12px)' }}>
        <AutoAwesomeMotionOutlinedIcon color="primary" />
        <Typography variant="h6" noWrap className="header-title" sx={{ flexGrow: 1 }}>
          Template Repository Dashboard
        </Typography>
        <Tooltip title="Seeded favorite">
          <Box component="span" sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <Switch
              checked={showSeededFavorite}
              onChange={onToggleSeededFavorite}
              size="small"
              slotProps={{ input: { 'aria-label': 'Toggle seeded favorite' } }}
            />
          </Box>
        </Tooltip>
        <FormControlLabel
          control={<Switch checked={showSeededFavorite} onChange={onToggleSeededFavorite} />}
          label="Seeded favorite"
          sx={{ display: { xs: 'none', md: 'flex' }, mr: 0 }}
        />
        <Box>
          <IconButton aria-label="Toggle theme" color="inherit" onClick={onToggleTheme}>
            {themeMode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
          </IconButton>
          <IconButton
            aria-label="Open documentation"
            color="inherit"
            component="a"
            href="/docs/"
          >
            <DescriptionOutlinedIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
