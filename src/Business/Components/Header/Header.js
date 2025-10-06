// Header.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './Header.css';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import consts from '../../../constant';

const Header = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

    const handleDrawerToggle = () => {
        setOpenDrawer(!openDrawer);
    };


    function handleScroll() {
        var body = document.body;

        if (document.documentElement.scrollTop > 100 || window.scrollY > 100) {
            // Add the class when scrolled more than 100 pixels
            body.classList.add('scrolled');
        } else {
            // Remove the class when scrolled back to the top
            body.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleScroll);

    const drawer = (
        <>
            <ListItem>
                <Link to=''>Products </Link>
            </ListItem>
            <ListItem>
                <Link to=''>Solutions </Link>
            </ListItem>
            <ListItem>
                <Link to=''>Resources </Link>
            </ListItem>
            <ListItem>
                <Link to=''>Company </Link>
            </ListItem>
            <ListItem>
                <Link to=''>Pricing </Link>
            </ListItem>

        </>
    )

    const getStarted = (
        <>

            <ListItem>
                <Link to='login'>Business Sign In</Link>
            </ListItem>
            <ListItem className='get-start'>
                <Link to='signup'>Business Sign up</Link>
            </ListItem>

        </>
    )
    return (
        <>
            <AppBar className='fixed-header head-bg'>
                <Toolbar>
                    {isMobile && (
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, color: '#000' }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} justifyContent={'space-between'} alignItems={"center"}>
                            <Grid item xs={12} sm={4} md={2} lg={2} xl={3} className='appbar-mobile'>
                                <div className='logo-bar header-logo'>
                                    <Link to="/"><img src={consts.projectLogo} width={"auto"} height={100} />
                                    </Link>

                                </div>
                            </Grid>
                            <Grid item xs={12} sm={4} md={2} lg={6} xl={6}>

                                {!isMobile && (
                                    <div>
                                        <List className='display-3 header-list'>
                                            {drawer}
                                        </List>

                                    </div>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={4} md={2} lg={4} xl={3}>
                                {!isMobile && (
                                    <div>
                                        <List className='display-1 header-list btn-direct'>
                                            {getStarted}
                                        </List>
                                    </div>

                                )}
                            </Grid>
                        </Grid>
                    </Box>

                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={openDrawer}

                className='mobile-drawer'
            >
                <div className='close-icon' onClick={handleDrawerToggle}>
                    <HighlightOffIcon />
                </div>
                <div className='logo-bar header-logo mobile-logo'>
                    <Link to="/"><img src={consts.projectLogo} />
                    </Link>

                </div>
                <List>
                    {drawer}
                </List>


                <List className='display-1 header-list btn-direct'>
                    {getStarted}
                </List>

            </Drawer>
        </>
    );
};

export default Header;
