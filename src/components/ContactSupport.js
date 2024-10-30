import React from 'react';
import {
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Button,
    Grid2,
} from '@mui/material';

function ContactSupport({ user }) {
    return (
        <ListItem key={user.id} sx={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, mb: 2 }}>
            <ListItemAvatar>
                <Avatar>{user.name.charAt(0)}</Avatar>
            </ListItemAvatar>
            <Grid2 container spacing={2} sx={{ flexGrow: 1, mt: { xs: 1, sm: 0 } }}>
                <Grid2 size={{xs:12,sm:8}}>
                    <ListItemText
                        primary={`${user.name} (${user.email})`}
                        secondary={`Phone: ${user.phone}, Company: ${user.company.name}`}
                    />
                </Grid2>
                <Grid2 size={{xs:12,sm:4}}>
                    <Button href={`mailto:${user.email}`} variant="outlined" fullWidth>
                        Contact
                    </Button>
                </Grid2>
            </Grid2>
        </ListItem>
    );
}

export default ContactSupport;
