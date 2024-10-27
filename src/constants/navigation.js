import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment'; 
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help'; 
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';

export const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'transactions',
    title: 'Transactions',
    icon: <ListAltIcon />, 
  },
  {
    segment: 'analysis',
    title: 'Analysis',
    icon: <AssessmentIcon />, 
  },
  {
    segment: 'settings',
    title: 'Settings',
    icon: <SettingsIcon />,
  },
  {
    segment: 'support',
    title: 'Support',
    icon: <HelpIcon />, 
  },
  {
    segment: 'logout',
    title: 'Logout',
    icon: <LogoutIcon />,
  }
];

export const AUTHNAVIGATION = [
  {
    segment: 'login',
    title: 'Login',
  },
  {
    segment: 'register',
    title: 'Register',
  },
];