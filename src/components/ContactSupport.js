import React from 'react';
import { ListItem, ListItemAvatar, ListItemText, Avatar, Button } from '@mui/material';

function ContactSupport(user) {
  return (
    <ListItem key={user.id}>
      <ListItemAvatar>
        <Avatar>{user.name.charAt(0)}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`${user.name} (${user.email})`}
        secondary={`Phone: ${user.phone}, Company: ${user.company.name}`}
      />
      <Button href={`mailto:${user.email}`} variant="outlined">Contact</Button>
    </ListItem>
  );
}

export default ContactSupport;
