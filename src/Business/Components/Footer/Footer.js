import React from 'react'
import logo from '../../../Images/logo1.png';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import './Footer.css';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';

import apx from '../../../Images/apzlogo.png'


const Footer = () => {
    return (
        <div className='footer-part'>
            <div className='contain-width'>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} sx={{ justifyContent: 'flex-end' }}>


                        <Grid item xs={12} sm={4} md={2} lg={2} xl={2}>
                            <div className='logo-part2'><Link to='/'><img src={apx} /></Link></div>
                        </Grid>

                        <Grid item xs={12} sm={4} md={2} lg={2} xl={2}>
                            <p>Products</p>
                            <List>
                                <ListItem>
                                    <Link to='' target='_blank'>User Verification </Link>
                                </ListItem>
                                <ListItem>
                                    <Link to='' target='_blank'>Business Verification </Link>
                                </ListItem>
                                <ListItem>
                                    <Link to='' target='_blank'>ID Verification </Link>
                                </ListItem>
                                <ListItem>
                                    <Link to='' target='_blank'>Address Verification </Link>
                                </ListItem>
                                <ListItem>
                                    <Link to='' target='_blank'>Liveness </Link>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={12} sm={4} md={2} lg={2} xl={2}>
                            <p>Solutions</p>
                            <List>
                                <ListItem>
                                    <Link to='' target='_blank'>Crypto  </Link>
                                </ListItem>
                                <ListItem>
                                    <Link to='' target='_blank'>Trading </Link>
                                </ListItem>
                                <ListItem>
                                    <Link to='' target='_blank'>Marketplaces</Link>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
                            <p>Follow us</p>
                            <List>
                                <ListItem>
                                    <Link to='' target='_blank'>Security & compliance  </Link>
                                </ListItem>
                                <ListItem>
                                    <Link to='' target='_blank'>API Reference </Link>
                                </ListItem>
                                <ListItem>
                                    <Link to='' target='_blank'>Technologies</Link>
                                </ListItem>
                                <ListItem>
                                    <Link to='' target='_blank'>Contact us</Link>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
                            <p>Follow us</p>
                            <List className='media-icon display-1'>
                                <ListItem>
                                    <Link to='' target='_blank'><XIcon />  </Link>
                                </ListItem>
                                <ListItem>
                                    <Link to='' target='_blank'><FacebookIcon /> </Link>
                                </ListItem>
                            </List>
                        </Grid>

                    </Grid>
                </Box>
            </div>


            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={0}>


                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <div className='copyrght-txt display-2'>
                            <span className='copyrights'>© 2023 Paste Team ApS. All rights reserved.</span>
                            <div><span>All trademarks are the property of their respective owners.</span></div>
                        </div>

                    </Grid>

                </Grid>
            </Box>

        </div>
    )
}

export default Footer
