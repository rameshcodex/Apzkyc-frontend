import { Box, Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Sidebar from '../SideBar/Sidebar'
import './Statistics.css'
import Switch from '@mui/material/Switch';
import { styled, useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
// import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import undo from '../../../Images/undo.svg';
import root from '../../../Images/root.svg'
import chart from '../../../Images/chart.svg'
import fullScreen from '../../../Images/full-screen.svg';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import StatsChart from './StatsChart';
import StatsGoogleMap from './StatsGoogleMap';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Axios from '../../../Axios';
import { decryptData } from '../../../middleware';

// import 'bootstrap/dist/css/bootstrap.min.css';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 480,
    position: 'relative',
    bgcolor: '#fff',
    // border: '2px solid #000',
    // boxShadow: 24,
    borderRadius: '12px',
    // boxShadow: '12px 27px 34.6px - 9px rgba(0, 0, 0, 0.10)',
    p: 2,
};

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#dfca6f',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
}));

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



function Statistics() {
    const theme = useTheme();

    const isLgup = useMediaQuery(theme.breakpoints.up('lg'));
    const mobileUp = useMediaQuery(theme.breakpoints.up('sm'));


    const [usertype, setUserType] = useState('')
    const token = localStorage.getItem('Rikosta')

    const subAdminDetails = JSON.parse(localStorage.getItem('subadmin'))


    useEffect(() => {
        if (token) {
            var user = window.localStorage.getItem('userType');
            const userType = decryptData(user)
            setUserType(userType)
        }
    }, [token])

    const [age, setAge] = useState(10);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate()


    const [value, setValue] = React.useState(0);

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (subAdminDetails?.access?.analytics === true && subAdminDetails?.access?.statistics === false) {
            setValue(1)
        }

    }, [subAdminDetails])

    const [statistics, setStatistics] = useState([])

    const [analytics, setAnalytics] = useState([])

    const getStatistics = async () => {
        try {
            const { data } = await Axios.get('/users/getStatistics', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('Rikosta')}`,
                }
            })
            if (data?.success == true) {
                setStatistics(data?.result)
            }
        } catch (error) {
            console.log("🚀 ~ getAnalytics ~ error:", error)
        }
    }
    const getAnalytics = async () => {
        try {
            const { data } = await Axios.get('/users/getAnalytics', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('Rikosta')}`,
                }
            })
            if (data?.success == true) {
                setAnalytics(data?.result)
            }
        } catch (error) {
            console.log("🚀 ~ getAnalytics ~ error:", error)
        }
    }

    useEffect(() => {
        getAnalytics()
        getStatistics()
    }, [])

    return (
        <div className='dashboard applicant-full statistic-body'>
            <Box sx={{ display: isLgup ? 'flex' : 'block' }}>
                {/* <CssBaseline /> */}
                {/* <Sidebar /> */}
                {
                    usertype === 'organization' || subAdminDetails?.access?.statistics === true || subAdminDetails?.access?.analytics === true ?

                        <Box component="main" sx={{ flexGrow: 1, p: 0, marginTop: '0px' }}>
                            {/* <Box className="action-tab display-2">
                                <Tabs value={value} onChange={handleChangeTab} aria-label="basic tabs example">
                                    {
                                        usertype === 'organization' || subAdminDetails?.access?.statistics === true ?
                                            <Tab label="Statistics" {...a11yProps(0)} />
                                            : <></>
                                    }
                                    {
                                        usertype === 'organization' || subAdminDetails?.access?.analytics === true ?
                                            <Tab label="Analytics" {...a11yProps(1)} /> : <></>
                                    }
                                </Tabs>
                                <div className='apllicant-direct'>
                            <Link to="/newapplicant"> <AddIcon /> New applicant</Link>
                        </div>
                            </Box> */}
                            {
                                usertype === 'organization' || subAdminDetails?.access?.statistics === true ?
                                    <>
                                        <div className="">
                                            <div className="">

                                                <div className="">
                                                    <h2 className="display-1 padding-10">
                                                        Analytics
                                                    </h2>
                                                </div>
                                                {/* <div className="margin-top">
                                                    <div className="display-1 bor" style={{ flexWrap: 'wrap' }}>
                                                        <div className="display-1">
                                                            <div className="prd">Period:</div>
                                                            <Box sx={{ minWidth: 120 }}>
                                                                <FormControl fullWidth className='select-dash'>
                                                                 
                                                                    <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={age}
                                                                     
                                                                        onChange={handleChange}
                                                                    >
                                                                        <MenuItem value={10}>from Aug 5, 2024 to Aug 6, 2024</MenuItem>
                                                                        <MenuItem value={20}>Twenty</MenuItem>
                                                                        <MenuItem value={30}>Thirty</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </Box>
                                                        </div>
                                                        <div className="display-1">
                                                            <div className="prd">Show:</div>
                                                            <Box sx={{ minWidth: 120 }}>
                                                                <FormControl fullWidth className='select-dash'>
                                                              
                                                                    <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={age}
                                                                       
                                                                        onChange={handleChange}
                                                                    >
                                                                        <MenuItem value={10}>Last 24 hours</MenuItem>
                                                                        <MenuItem value={20}>Twenty</MenuItem>
                                                                        <MenuItem value={30}>Thirty</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </Box>
                                                        </div>
                                                        <div className="display-1 ">
                                                            <div className="prd">Level name:</div>
                                                            <Box sx={{ minWidth: 120 }}>
                                                                <FormControl fullWidth className='select-dash'>
                                                                    
                                                                    <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={age}
                                                                
                                                                        onChange={handleChange}

                                                                    >
                                                                        <MenuItem value={10} className='select-text'>All</MenuItem>
                                                                        <MenuItem value={20} className='select-text'>Twenty</MenuItem>
                                                                        <MenuItem value={30} className='select-text'>Thirty</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </Box>
                                                        </div>
                                                        <div className="display-1">
                                                            <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                                                            <div className="prodtin">Level breakdown</div>
                                                        </div>

                                                    </div>
                                                </div> */}

                                                <div className="margin-top bors">
                                                    <div className=' display-2'>
                                                        <div className="stat-cardmain">
                                                            <div className="inner-thead-th">
                                                                Checked Applicants
                                                            </div>
                                                            <div className='statistic-bold-td'>{statistics?.checkApplication ? statistics?.checkApplication : 0}</div>
                                                        </div>
                                                        <div className="stat-cardmain">
                                                            <div className='inner-thead-th'>Median Processing Time</div>
                                                            <div className='statistic-bold-td'>15 sec</div>
                                                        </div>
                                                        <div className="stat-cardmain">
                                                            <div className='inner-thead-th'>Checked Applicants (over One Day)</div>
                                                            <div className='statistic-bold-td'>{statistics?.checkApplication_day ? statistics?.checkApplication_day : 0}</div>
                                                        </div>
                                                    </div>

                                                    <div className='emptyChartOuter'>

                                                        {/* <div className='emptyChartDiv'>
                                                            <div className='chartAction display-4'>
                                                                <Button><img src={undo} /> </Button>
                                                                <Button><img src={root} />  </Button>
                                                                <Button><img src={chart} /></Button>
                                                                <Button> <img src={fullScreen} /> </Button>
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="margin-top">



                                                <div className=" display-2 " style={{ gap: '25px' }}>
                                                    <div className="bxshade2">
                                                        <div className='display-2'>
                                                            <div className="getstar display-1">
                                                                Applicants Reviewed <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.91016 15C10.7667 15 12.5471 14.2625 13.8599 12.9497C15.1727 11.637 15.9102 9.85652 15.9102 8C15.9102 6.14348 15.1727 4.36301 13.8599 3.05025C12.5471 1.7375 10.7667 1 8.91016 1C7.05364 1 5.27316 1.7375 3.96041 3.05025C2.64765 4.36301 1.91016 6.14348 1.91016 8C1.91016 9.85652 2.64765 11.637 3.96041 12.9497C5.27316 14.2625 7.05364 15 8.91016 15ZM7.94316 8.783V9.126H9.28516V8.848C9.27745 8.68833 9.32165 8.53045 9.41116 8.398C9.49916 8.284 9.70516 8.118 10.0292 7.898C10.5012 7.589 10.8222 7.311 10.9902 7.064C11.1592 6.816 11.2432 6.523 11.2432 6.183C11.2432 5.673 11.0372 5.265 10.6262 4.959C10.2182 4.653 9.66616 4.5 8.97116 4.5C8.13808 4.49763 7.31677 4.69661 6.57716 5.08L7.12816 6.095C7.77616 5.792 8.35316 5.64 8.85916 5.64C9.14916 5.64 9.37616 5.693 9.53816 5.798C9.61584 5.84596 9.67932 5.91379 9.72203 5.99448C9.76475 6.07516 9.78516 6.16579 9.78116 6.257C9.78116 6.437 9.72316 6.598 9.60816 6.744C9.49816 6.889 9.26416 7.077 8.91016 7.309C8.54216 7.557 8.29016 7.789 8.15016 8.009C8.00829 8.24178 7.93643 8.51048 7.94316 8.783ZM8.00916 10.123C7.85716 10.256 7.78116 10.453 7.78116 10.712C7.78116 10.962 7.85916 11.157 8.01416 11.296C8.16916 11.432 8.38916 11.5 8.67216 11.5C8.94916 11.5 9.16516 11.43 9.32016 11.291C9.47516 11.149 9.55316 10.956 9.55316 10.711C9.55316 10.459 9.47516 10.264 9.32016 10.128C9.16816 9.992 8.95216 9.924 8.67216 9.924C8.38216 9.924 8.16116 9.989 8.00916 10.123Z" fill="#7D8799" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div className='emptyChartOuter mt-10  p-0'>

                                                            <div className='total-count'>Total {statistics?.checkApplication ? statistics?.checkApplication : 0}</div>
                                                        </div>
                                                    </div>
                                                    <div className="bxshade2">
                                                        <div className='display-2'>
                                                            <div className="getstar display-1">
                                                                Applicants Created <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.91016 15C10.7667 15 12.5471 14.2625 13.8599 12.9497C15.1727 11.637 15.9102 9.85652 15.9102 8C15.9102 6.14348 15.1727 4.36301 13.8599 3.05025C12.5471 1.7375 10.7667 1 8.91016 1C7.05364 1 5.27316 1.7375 3.96041 3.05025C2.64765 4.36301 1.91016 6.14348 1.91016 8C1.91016 9.85652 2.64765 11.637 3.96041 12.9497C5.27316 14.2625 7.05364 15 8.91016 15ZM7.94316 8.783V9.126H9.28516V8.848C9.27745 8.68833 9.32165 8.53045 9.41116 8.398C9.49916 8.284 9.70516 8.118 10.0292 7.898C10.5012 7.589 10.8222 7.311 10.9902 7.064C11.1592 6.816 11.2432 6.523 11.2432 6.183C11.2432 5.673 11.0372 5.265 10.6262 4.959C10.2182 4.653 9.66616 4.5 8.97116 4.5C8.13808 4.49763 7.31677 4.69661 6.57716 5.08L7.12816 6.095C7.77616 5.792 8.35316 5.64 8.85916 5.64C9.14916 5.64 9.37616 5.693 9.53816 5.798C9.61584 5.84596 9.67932 5.91379 9.72203 5.99448C9.76475 6.07516 9.78516 6.16579 9.78116 6.257C9.78116 6.437 9.72316 6.598 9.60816 6.744C9.49816 6.889 9.26416 7.077 8.91016 7.309C8.54216 7.557 8.29016 7.789 8.15016 8.009C8.00829 8.24178 7.93643 8.51048 7.94316 8.783ZM8.00916 10.123C7.85716 10.256 7.78116 10.453 7.78116 10.712C7.78116 10.962 7.85916 11.157 8.01416 11.296C8.16916 11.432 8.38916 11.5 8.67216 11.5C8.94916 11.5 9.16516 11.43 9.32016 11.291C9.47516 11.149 9.55316 10.956 9.55316 10.711C9.55316 10.459 9.47516 10.264 9.32016 10.128C9.16816 9.992 8.95216 9.924 8.67216 9.924C8.38216 9.924 8.16116 9.989 8.00916 10.123Z" fill="#7D8799" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div className='emptyChartOuter mt-10  p-0'>

                                                            <div className='total-count'>Total  {statistics?.application_created ? statistics?.application_created : 0}</div>
                                                        </div>
                                                    </div>


                                                </div>

                                            </div>

                                        </div>
                                        <div className="statistic-tab analytics-tab">
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                                                    <div className="margin-top bxshade2">
                                                        <div className="display-2">
                                                            <div className="margin-top analytic-head">
                                                                <div className="getstar display-1 analytic-head-theme">
                                                                    Requests received
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <div className="margin-top-bor">
                                                            <div className='emptyChartOuter mt-0 p-0'>

                                                                <div className='emptyChartDiv'>

                                                                    <StatsChart xaxis={analytics?.checkApplication?.length > 0 ? analytics?.checkApplication?.map((item) => item?._id) : []} yaxis={analytics?.checkApplication?.length > 0 ? analytics?.checkApplication?.map((item) => item?.count) : []} />
                                                                    {/* <div className='display-1'>
                                         <div className='total-count'>Сhecks requested 1</div>
                                         <div className='total-count bdr-blue'>Checks completed 2</div>
                                     </div> */}

                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className=' '>
                                                    <div className="margin-top bxshade2">
                                                        <div className="display-2">
                                                            <div className="margin-top analytic-head">
                                                                <div className="getstar display-1 analytic-head-theme">
                                                                    checks completed
                                                                </div>
                                                            </div>
                                                        </div>



                                                        <div className="margin-top-bor">
                                                            <div className='emptyChartOuter mt-0 p-0'>
                                                                {/* <div className='inner-thead-th'>Checked Applicants (over time)</div> */}
                                                                <div className='emptyChartDiv'>


                                                                    <StatsChart xaxis={analytics?.verifyApplication?.length > 0 ? analytics?.verifyApplication?.map((item) => item?._id) : []} yaxis={analytics?.verifyApplication?.length > 0 ? analytics?.verifyApplication?.map((item) => item?.count) : []} />
                                                                    {/* <div className='display-1'>
                                         <div className='total-count'>Сhecks requested 1</div>
                                         <div className='total-count bdr-blue'>Checks completed 2</div>
                                     </div> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Grid>
                                            </Grid>



                                        </div>
                                    </>
                                    : <></>
                            }
                            {/* {
                                usertype === 'organization' || subAdminDetails?.access?.analytics === true ?

                                    : <></>
                            } */}
                        </Box> :
                        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '80px' }}>
                            You Dont Have Permission To View
                        </Box>
                }
            </Box>
        </div>
    )
}

export default Statistics
