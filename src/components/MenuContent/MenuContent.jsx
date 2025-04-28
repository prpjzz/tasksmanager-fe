import * as React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ChecklistIcon from '@mui/icons-material/Checklist';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { styled } from '@mui/material/styles';

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, path: '/' },
  { text: 'Add Task', icon: <AddTaskIcon />, path: '/add-task' },
  { text: 'Todos', icon: <FormatListBulletedIcon />, path: '/todos' },
  { text: 'Tasks', icon: <AssignmentRoundedIcon />, path: '/tasks' },
  { text: 'Tasks Completed', icon: <ChecklistIcon />, path: '/tasks-completed' },
  { text: 'Tasks Incompleted', icon: <RemoveDoneIcon />, path: '/tasks-incompleted' },
];

const secondaryListItems = [
  { text: 'About', icon: <InfoRoundedIcon />, path: '/about' },
  { text: 'Help', icon: <HelpRoundedIcon />, path: '/help' },
];

const LinkBehavior = styled(RouterLink)(() => ({
  textDecoration: 'none',
  color: 'inherit',
}));

export default function MenuContent() {
  console.log('MenuContent rendered');
  const location = useLocation();

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem
              key={index}
              component={LinkBehavior}
              to={item.path}
              disablePadding
              sx={{ display: 'block' }}>
            <ListItemButton selected={location.pathname === item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider sx={{ my: 1 }} />
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}