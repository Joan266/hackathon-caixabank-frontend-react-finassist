import React from 'react';
import { Box, Typography, Paper, IconButton, InputBase, Button, Grid2 } from '@mui/material';
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
                position: 'relative', 
                backgroundImage: `url(${footerBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                color: 'white',
                py: 3,
                mt: 4,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
            }}
        >
            <Box 
                sx={{
                    position: 'absolute', 
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                    zIndex: 1, 
                }} 
            />
            <Box sx={{ width: '100%', maxWidth: 400, mb: 2, zIndex: 2 }}>
                <Paper 
                    component="form" 
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        px: 1,
                        py: 0.5,
                        mx:1,
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
                        color="secondary"
                        sx={{ borderRadius: 20 }}
                    >
                        Search
                    </Button>
                </Paper>
            </Box>

            <Typography variant="body2" sx={{ zIndex: 2 }}>
                © {new Date().getFullYear()} Personal Finance Assistant
            </Typography>

            <Grid2 container justifyContent="center" spacing={2} sx={{ zIndex: 2 }}>
                <Grid2>
                    <IconButton
                        aria-label="LinkedIn"
                        color="inherit"
                        component="a"
                        href="https://www.linkedin.com/in/joan-alemany-chulilla/" 
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <LinkedInIcon />
                    </IconButton>
                </Grid2>

                <Grid2>
                    <IconButton
                        aria-label="GitHub"
                        color="inherit"
                        component="a"
                        href="https://github.com/Joan266" 
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <GitHubIcon />
                    </IconButton>
                </Grid2>

                <Grid2>
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
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default Footer;
