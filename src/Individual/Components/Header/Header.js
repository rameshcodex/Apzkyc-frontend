import React, { useEffect, useState } from 'react'
import './Header.css'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logo from '../../../Images/apzkyc.png'
import { NavLink } from 'react-router-dom';
import ava from '../../../Images/ava.png'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Badge from '@mui/material/Badge';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Popover from '@mui/material/Popover';
import btnprf from '../../../Images/btnprf.png'
import { useNavigate } from 'react-router-dom';
import Axios from '../../../Axios';
import toast from 'react-hot-toast';


function Header({ profile }) {


    const handleLogout = async () => {
        window.localStorage.clear();
        toast.success("Logout Successfully");
        // window.localStorage.removeItem('Rikosta');
        // window.localStorage.removeItem('userType');
        navigate("/individual/signin");
    };

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const navigate = useNavigate()

    const [anchorEl2, setAnchorEl2] = React.useState(null);

    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const openPop2 = Boolean(anchorEl2);
    const id2 = openPop2 ? 'simple-popover' : undefined;

    const [settings, setSettings] = useState([
        { name: 'Profile', path: '/individual/profile' },
        { name: 'Logout', }
    ])

    const [profileData, setProfileData] = useState({})
    const [notificationData, setNotificationData] = useState([])
    const [notifyCount, setNotifyCount] = useState();

    const getProfile = async () => {
        try {
            const { data } = await Axios.get('/getProfile', {
                headers: {
                    Authorization: window.localStorage.getItem('Rikosta')
                }
            })
            if (data.success) {
                setProfileData(data.result)
            }
            else {
                setProfileData({})
            }
        } catch (error) {
            console.log('🚀 ~ getProfile ~ error', error);
        }
    }

    const getNotification = async () => {
        try {
            const { data } = await Axios.get('/support/getNotification', {}, {
                headers: {
                    Authorization: window.localStorage.getItem('Rikosta')
                }
            })
            if (data.success) {
                setNotificationData(data.result)
                setNotifyCount(data.result.length)
            }
            else {
                setNotificationData([])
                setNotifyCount(0)
            }
        } catch (error) {
            console.log('🚀 ~ getNotification ~ error', error);

        }
    }

    const seenMessage = async (id) => {
        try {
            const { data } = await Axios.post('/support/seenMessage', { id: id }, {
                headers: {
                    Authorization: window.localStorage.getItem('Rikosta')
                }
            })
            if (data.success) {
                getNotification()
            }
        } catch (error) {
            console.log('🚀 ~ seenMessage Notification ~ error', error);

        }
    }

    useEffect(() => {
        getProfile()
        getNotification()
    }, [])


    const routes = (
        <>
            <NavLink to="/individual/overview"
                className={({ isActive }) => isActive ? "activeH2" : ""}>
                <div className="display-1 cursor">
                    <div className="display-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M18 22C20.2091 22 22 20.2091 22 18C22 15.7909 20.2091 14 18 14C15.7909 14 14 15.7909 14 18C14 20.2091 15.7909 22 18 22Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div className="ovrvi">
                        Overview
                    </div>
                </div>
            </NavLink>

            <NavLink to="/individual/kyc"
                className={({ isActive }) => isActive ? "activeH2" : ""
                }>
                <div className="display-1 cursor">
                    <div className="display-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M22 16.7397V4.6697C22 3.4697 21.02 2.5797 19.83 2.6797H19.77C17.67 2.8597 14.48 3.9297 12.7 5.0497L12.53 5.1597C12.24 5.3397 11.76 5.3397 11.47 5.1597L11.22 5.0097C9.44 3.8997 6.26 2.8397 4.16 2.6697C2.97 2.5697 2 3.4697 2 4.6597V16.7397C2 17.6997 2.78 18.5997 3.74 18.7197L4.03 18.7597C6.2 19.0497 9.55 20.1497 11.47 21.1997L11.51 21.2197C11.78 21.3697 12.21 21.3697 12.47 21.2197C14.39 20.1597 17.75 19.0497 19.93 18.7597L20.26 18.7197C21.22 18.5997 22 17.6997 22 16.7397Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 5.49023V20.4902" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M7.75 8.49023H5.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8.5 11.4902H5.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div className="ovrvi">
                        KYC
                    </div>
                </div>
            </NavLink>

            <NavLink to="/individual/document"
                className={({ isActive }) => isActive ? "activeH2" : ""
                }>
                <div className="display-1 cursor">
                    <div className="display-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21.0799 8.58003V15.42C21.0799 16.54 20.4799 17.58 19.5099 18.15L13.5699 21.58C12.5999 22.14 11.3999 22.14 10.4199 21.58L4.47991 18.15C3.50991 17.59 2.90991 16.55 2.90991 15.42V8.58003C2.90991 7.46003 3.50991 6.41999 4.47991 5.84999L10.4199 2.42C11.3899 1.86 12.5899 1.86 13.5699 2.42L19.5099 5.84999C20.4799 6.41999 21.0799 7.45003 21.0799 8.58003Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M11.9999 10.9998C13.2867 10.9998 14.3299 9.95662 14.3299 8.6698C14.3299 7.38298 13.2867 6.33984 11.9999 6.33984C10.7131 6.33984 9.66992 7.38298 9.66992 8.6698C9.66992 9.95662 10.7131 10.9998 11.9999 10.9998Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M16 16.6603C16 14.8603 14.21 13.4004 12 13.4004C9.79 13.4004 8 14.8603 8 16.6603" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div className="ovrvi">
                        Documents
                    </div>
                </div>
            </NavLink>

            <NavLink to="/individual/support"
                className={({ isActive }) => isActive ? "activeH2" : ""}>
                <div className="display-1 cursor">
                    <div className="display-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M15.9965 11H16.0054" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M11.9955 11H12.0045" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M7.99451 11H8.00349" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div className="ovrvi">
                        Support
                    </div>
                </div>
            </NavLink>

            <NavLink to="/individual/profile"
                className={({ isActive }) => isActive ? "activeH2" : ""}>
                <div className="display-1 cursor">
                    <div className="display-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M2 12.8794V11.1194C2 10.0794 2.85 9.21945 3.9 9.21945C5.71 9.21945 6.45 7.93945 5.54 6.36945C5.02 5.46945 5.33 4.29945 6.24 3.77945L7.97 2.78945C8.76 2.31945 9.78 2.59945 10.25 3.38945L10.36 3.57945C11.26 5.14945 12.74 5.14945 13.65 3.57945L13.76 3.38945C14.23 2.59945 15.25 2.31945 16.04 2.78945L17.77 3.77945C18.68 4.29945 18.99 5.46945 18.47 6.36945C17.56 7.93945 18.3 9.21945 20.11 9.21945C21.15 9.21945 22.01 10.0694 22.01 11.1194V12.8794C22.01 13.9194 21.16 14.7794 20.11 14.7794C18.3 14.7794 17.56 16.0594 18.47 17.6294C18.99 18.5394 18.68 19.6994 17.77 20.2194L16.04 21.2094C15.25 21.6794 14.23 21.3994 13.76 20.6094L13.65 20.4194C12.75 18.8494 11.27 18.8494 10.36 20.4194L10.25 20.6094C9.78 21.3994 8.76 21.6794 7.97 21.2094L6.24 20.2194C5.33 19.6994 5.02 18.5294 5.54 17.6294C6.45 16.0594 5.71 14.7794 3.9 14.7794C2.85 14.7794 2 13.9194 2 12.8794Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div className="ovrvi">
                        Profile Settings
                    </div>
                </div>
            </NavLink>
        </>
    )
    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" >
            <Box sx={{ margin: '15px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '35px', alignItems: 'flex-start' }}>

                <div className="display-2" style={{ width: '100%' }}>
                    <div className="indi-h-lgo " onClick={(() => { navigate('/') })} >
                        <img src={logo} alt="logo" />
                    </div>
                    <ChevronLeftIcon onClick={toggleDrawer(false)} />
                </div>
                {routes}

            </Box>
        </Box>
    );


    return (
        <div className='header'>
            <AppBar position="static" className='indivi-appbar'>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {matches && <div className="indi-h-lgo cursor" onClick={(() => { navigate('/individual/kyc') })}>
                            <img src={logo} alt="logo" />
                        </div>}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={toggleDrawer(true)}
                                color="inherit"
                            >
                                <MenuIcon sx={{ fill: '#000' }} />
                            </IconButton>

                        </Box>
                        {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <div className="indi-h-lgo" onClick={(() => { navigate('/') })}>
                                <img src={logo} alt="logo" />
                            </div>
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: '35px', alignItems: 'center' }}>

                            {routes}

                        </Box>

                        <Box sx={{ flexGrow: 0 }}>

                            <div className="display-1" style={{ gap: '25px' }}>
                                <div className="outer">
                                    {/* <Badge variant={`${notificationData?.length > 0 ? "dot" : ""}`} color="error"> */}
                                    <Badge badgeContent={notifyCount} color="error">
                                        <div className="display-1 cursor" onClick={(e) => { handleClick2(e); getNotification() }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M1.50083 12.7871V12.5681C1.53295 11.9202 1.7406 11.2925 2.10236 10.7496C2.7045 10.0975 3.1167 9.29831 3.29571 8.43598C3.29571 7.7695 3.29571 7.0935 3.35393 6.42703C3.65469 3.21842 6.82728 1 9.96106 1H10.0387C13.1725 1 16.345 3.21842 16.6555 6.42703C16.7137 7.0935 16.6555 7.7695 16.704 8.43598C16.8854 9.3003 17.2972 10.1019 17.8974 10.7591C18.2618 11.2972 18.4698 11.9227 18.4989 12.5681V12.7776C18.5206 13.648 18.2208 14.4968 17.6548 15.1674C16.907 15.9515 15.8921 16.4393 14.8024 16.5384C11.607 16.8812 8.38303 16.8812 5.18762 16.5384C4.09914 16.435 3.08576 15.9479 2.33521 15.1674C1.778 14.4963 1.48224 13.6526 1.50083 12.7871Z" stroke="#1B7CE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M7.55518 19.8516C8.05445 20.4782 8.78764 20.8838 9.59247 20.9785C10.3973 21.0732 11.2074 20.8493 11.8435 20.3562C12.0391 20.2103 12.2152 20.0408 12.3674 19.8516" stroke="#1B7CE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    </Badge>

                                    <Popover
                                        id={id2}
                                        open={openPop2}
                                        anchorEl={anchorEl2}
                                        onClose={handleClose2}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <div className="" style={{ padding: '15px', borderRadius: '10px', width: '300px', height: '200px' }}>
                                            {
                                                notificationData?.length > 0 ?
                                                    notificationData?.map((data, index) => (
                                                        <div className="display-2 cursor">
                                                            <div className="display-1">
                                                                <Avatar alt="Remy Sharp" src={btnprf} sx={{ width: 25, height: 25 }} className='cursor' />
                                                                <div className=" dcard-hd" onClick={() => { seenMessage(data?._id); navigate('/individual/support', { state: { id: data?.ticket_id, time: data?.seen == false ? data?.time : null, notify: data?._id } }) }}>
                                                                    {data?.message}
                                                                </div>
                                                                <div className=""></div>
                                                                {/* <Badge badgeContent={3} color="error">
                                                                    <MailIcon color="action" />
                                                                </Badge> */}
                                                            </div>
                                                            <div className="display-1">
                                                                <ChevronRightIcon onClick={() => { seenMessage(data?._id); navigate('/individual/support', { state: { id: data?.ticket_id, time: data?.seen == false ? data?.time : null, notify: data?._id } }) }} />
                                                            </div>
                                                        </div>))
                                                    :
                                                    <div className="display-2 cursor">
                                                        <div className="display-1">
                                                            <Avatar alt="Remy Sharp" src={btnprf} sx={{ width: 25, height: 25 }} className='cursor' />
                                                            <div className=" dcard-hd">
                                                                No Notification Found
                                                            </div>
                                                        </div>
                                                    </div>
                                            }

                                        </div>

                                    </Popover>
                                </div>



                                <IconButton
                                    // onClick={(e) => { handleOpenUserMenu(e); getProfile() }}
                                    sx={{ p: 0 }}>
                                    <Avatar src={profile ? profile : profileData?.image ? profileData?.image : ava} alt="Remy Sharp" sx={{ width: '52px', height: '52px' }} />
                                </IconButton>


                                <button class="Btn" onClick={(() => { handleLogout() })}>

                                    <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>

                                    <div class="text">Logout</div>
                                </button>




                            </div>

                            {/* <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((row, i) => (
                                    <MenuItem key={row} onClick={handleCloseUserMenu}>
                                       
                                        <Typography textAlign="center" onClick={(() => { row.name === "Logout" ? handleLogout() : navigate(row.path) })}>{row.name}</Typography >
                                    </MenuItem>
                                ))}
                            </Menu> */}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>


        </div >
    )
}

export default Header
