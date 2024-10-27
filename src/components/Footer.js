import React from 'react';
import { Box, Typography, Paper, IconButton, InputBase, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language'; 
import footerBackground from '../assets/footer-image.webp';

const Footer = () => {
    return (
        <Box 
            component="footer" 
            sx={{
                backgroundImage: `url(${footerBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                py: 3,
                mt: 4,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
            }}
        >
            <Box sx={{ width: '100%', maxWidth: 400, mb: 2 }}>
                <Paper 
                    component="form" 
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        px: 1,
                        py: 0.5,
                        borderRadius: 20,
                    }}
                >
                    <IconButton aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <InputBase 
                        placeholder="Find your branch..." 
                        sx={{ ml: 1, flex: 1 }} 
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        sx={{ borderRadius: 20 }}
                    >
                        Search
                    </Button>
                </Paper>
            </Box>

            <Typography variant="body2">
                © {new Date().getFullYear()} Personal Finance Assistant
            </Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton
                    aria-label="LinkedIn"
                    color="inherit"
                    component="a"
                    href="https://linkedin.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <LinkedInIcon />
                </IconButton>

                <IconButton
                    aria-label="GitHub"
                    color="inherit"
                    component="a"
                    href="https://github.com/joanalemany"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <GitHubIcon />
                </IconButton>

                <IconButton
                    aria-label="Portfolio"
                    color="inherit"
                    component="a"
                    href="https://portfolio-joanalemany.s3.eu-west-3.amazonaws.com/index.html" 
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <LanguageIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Footer;
