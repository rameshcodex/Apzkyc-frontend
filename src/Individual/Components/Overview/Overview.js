
import Header from '../Header/Header'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import './Overview.css'
import useMediaQuery from '@mui/material/useMediaQuery';
import nodata from '../../../Images/nodata.gif'
import { Box, Button, Grid } from '@mui/material'
import React, { useState } from 'react'
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
import CancelIcon from '@mui/icons-material/CancelTwoTone';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HelpCenter from '../Kyc/HelpCenter';
import Axios from '../../../Axios';
import moment from 'moment';
import Pagination from '@mui/material/Pagination';
import document from '../../../Images/document.png'

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
    width: 560,
    '@media(max-width:575.98px)': {
        width: '95%',

    },
    position: 'relative',
    bgcolor: '#fff',
    // border: '2px solid #000',
    // boxShadow: 24,
    borderRadius: '12px',
    // boxShadow: '12px 27px 34.6px - 9px rgba(0, 0, 0, 0.10)',
    p: 2,
};


const styleIn = {
    width: 560,
    '@media(max-width:575.98px)': {
        width: '95%',
    },
    position: 'relative',
    bgcolor: '#fff',
    // border: '2px solid #000',
    // boxShadow: 24,
    borderRadius: '12px',
    marginLeft: 'auto',
    marginTop: '10px',
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
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

function Overview() {
    const [tab, setTab] = useState(1)

    const handleTab = (val) => {
        setTab(val)
    }
    const pathColor = (
        tab === 1 ? '#fff' : '#8E92BC'
    )

    const pathColor2 = (
        tab === 2 ? '#fff' : '#8E92BC'
    )

    const theme = useTheme();

    const isLgup = useMediaQuery(theme.breakpoints.up('lg'));
    const mobileUp = useMediaQuery(theme.breakpoints.up('sm'));

    const [age, setAge] = useState(10);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate()

    const [perPage] = useState(2);
    const [page, setPage] = useState(1);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const [loading, setLoading] = useState(false)
    const [kycDetails, setKycDetails] = useState()

    const getKycDetails = async () => {
        try {
            setLoading(true)
            const { data } = await Axios.post('/users/getAllKycDetails', {}, {
                headers: {
                    Authorization: window.localStorage.getItem('Rikosta')
                }
            })
            if (data?.success == true) {
                setLoading(false)
                setKycDetails(data.result)
            } else {
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            console.log("🚀 ~ getKycDetails ~ error:", error)
        }
    }

    useEffect(() => {
        getKycDetails()
    }, [])

    // console.log(kycDetails, 'kycDetails');

    return (
        <div className='document'>
            <Header />
            <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '80px' }} className='overview_body'>
                {/* <DrawerHeader /> */}
                <div className="">
                    <div className="display-2 dashmain">
                        <div className="getstar display-1" style={{ flexDirection: !mobileUp && 'column' }}>
                            Get started with APZKYC
                        </div>
                        {!open && <div >

                            <div className=" display-1 margin-top" style={{ flexFlow: 'wrap' }}>
                                <div className="activ-pl2">
                                    Activate your free 14-days trial
                                    <div className="display-1">
                                        <div className="get502">
                                            Get 50 free verifications
                                        </div>
                                        <div className="text-left avt-tbn2">
                                            <div onClick={(() => { navigate('/pricing') })} className='getstar cursor' >
                                                <span>
                                                    Activate {`${">>"}`}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                </div>


                            </div>

                        </div>}
                    </div>

                </div>


                <div className="margin-top">
                    <Grid container>
                        <Grid xs={12} sx={12} md={6} lg={4} xl={4}>
                            <div className="dcard-main" style={{ width: !mobileUp && '100%' }}>
                                <div className="display-1">
                                    <div className="sta">
                                        Start
                                    </div>
                                </div>
                                <div className="dcard-hd text-left margin-top">
                                    Start with the Basic KYC flow
                                </div>
                                <div className="dcard-desx text-left margin-top">
                                    Try out the default verification level covering common
                                    KYC requirements
                                </div>
                                <ul style={{ paddingLeft: '20px' }}>
                                    <li className="dcard-desx text-left">
                                        ID verification
                                    </li>
                                    <li className="dcard-desx text-left ">
                                        Liveness check
                                    </li>
                                </ul>
                                <div className="display-1 margin-top">
                                    <div className="textflow">
                                        <Button>
                                            Test flow
                                        </Button>
                                    </div>

                                    <div className="display-1">
                                        <div className="">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.89154 1.64453C8.67895 1.64453 9.35247 2.19616 9.51529 2.95421L9.53575 3.06988L9.61583 3.62151L9.73683 3.68557L9.82136 3.73361L9.90499 3.78344L10.0198 3.8564L10.5411 3.64731C10.8722 3.5149 11.237 3.49246 11.5818 3.5833C11.9266 3.67414 12.233 3.87344 12.4558 4.15178L12.5324 4.25499L12.5982 4.35909L13.1596 5.33334C13.3491 5.66157 13.4207 6.04473 13.3624 6.41922C13.3041 6.79372 13.1196 7.13703 12.8393 7.39217L12.7441 7.47225L12.3055 7.8139L12.3108 7.89754L12.3135 8.05057L12.3108 8.2045L12.3055 8.28546L12.7441 8.6289C13.3296 9.08622 13.5315 9.86651 13.2691 10.5409L13.2174 10.6584L13.1596 10.7678L12.5973 11.7412C12.408 12.0691 12.1123 12.3226 11.7592 12.4595C11.4061 12.5963 11.0169 12.6085 10.6559 12.4939L10.5403 12.4521L10.0198 12.243L9.90499 12.3168L9.73594 12.4147L9.61494 12.4787L9.53575 13.0322C9.48473 13.3871 9.32025 13.7159 9.06687 13.9696C8.81349 14.2233 8.48483 14.3882 8.12998 14.4397L8.00898 14.4522L7.89154 14.4566H6.77048C6.39115 14.4565 6.02326 14.3267 5.72778 14.0888C5.4323 13.851 5.22698 13.5193 5.14584 13.1487L5.12537 13.033L5.0453 12.4787L4.92607 12.4147L4.7588 12.3168L4.64314 12.243L4.12176 12.4529C3.79069 12.5857 3.42571 12.6084 3.08076 12.5177C2.7358 12.427 2.42917 12.2277 2.20618 11.9494L2.13055 11.8462L2.06471 11.7421L1.50329 10.7678C1.3138 10.4396 1.24225 10.0564 1.30051 9.68192C1.35877 9.30743 1.54334 8.96412 1.82359 8.70897L1.91879 8.6289L2.35654 8.28724L2.35209 8.20361L2.34853 8.05057L2.3512 7.89487L2.35565 7.81301L1.91968 7.47136C1.63795 7.25148 1.43469 6.94656 1.34012 6.60192C1.24554 6.25728 1.2647 5.89132 1.39474 5.55844L1.44546 5.44189L1.50329 5.33245L2.0656 4.35998C2.25489 4.03221 2.55045 3.77891 2.90334 3.64202C3.25623 3.50514 3.64529 3.49288 4.00609 3.60727L4.12176 3.64909L4.64492 3.85906L4.76058 3.78611L4.92696 3.68824L5.04619 3.62418L5.12626 3.06899C5.23303 2.33051 5.81313 1.76553 6.53203 1.66144L6.65304 1.64898L6.77048 1.64453H7.89154ZM7.89154 3.0681H6.77048C6.72194 3.06821 6.6746 3.0832 6.63483 3.11104C6.59506 3.13888 6.56477 3.17823 6.54805 3.2238L6.53559 3.27095L6.44484 3.90266C6.41351 4.10797 6.3333 4.30275 6.21098 4.47059C6.08866 4.63843 5.9278 4.77443 5.74195 4.86713C5.61626 4.93106 5.49445 5.00236 5.37717 5.08066C5.05419 5.29242 4.65827 5.35648 4.29259 5.24615L4.18404 5.20789L3.59148 4.97033C3.54643 4.95237 3.49697 4.94863 3.44973 4.9596C3.40249 4.97057 3.35975 4.99574 3.32723 5.03173L3.29787 5.07176L2.73645 6.04424C2.71202 6.08638 2.70113 6.13502 2.70527 6.18356C2.70941 6.23211 2.72837 6.2782 2.75959 6.3156L2.79517 6.3503L3.85929 7.1822L3.8068 7.58435C3.78366 7.7623 3.7721 7.91355 3.7721 8.05057C3.7721 8.15289 3.77832 8.26322 3.79167 8.38867L3.85662 8.92073L2.79429 9.75173C2.75601 9.78167 2.72788 9.82266 2.71372 9.86914C2.69955 9.91562 2.70003 9.96534 2.7151 10.0115L2.73556 10.0569L3.29698 11.0303C3.32135 11.0724 3.35802 11.1061 3.40208 11.1267C3.44613 11.1474 3.49546 11.1541 3.54344 11.1459L3.59059 11.1326L4.18404 10.8941C4.37835 10.8174 4.58839 10.7891 4.79607 10.8116C5.00376 10.8341 5.20287 10.9067 5.37628 11.0232C5.45813 11.0765 5.5391 11.1264 5.61917 11.1717L5.83804 11.291C6.12988 11.4707 6.34341 11.7536 6.42171 12.0882L6.44306 12.2012L6.53292 12.8284C6.54014 12.8767 6.56188 12.9216 6.59526 12.9572C6.62863 12.9928 6.67206 13.0174 6.71977 13.0277L6.76959 13.033H7.89154C7.94008 13.0329 7.98742 13.0179 8.02719 12.9901C8.06696 12.9623 8.09724 12.9229 8.11397 12.8773L8.12643 12.8293L8.21718 12.1994C8.27323 11.815 8.50189 11.4876 8.82575 11.2892L9.0464 11.1691C9.12648 11.1246 9.20567 11.0774 9.28307 11.0258C9.60515 10.8123 10.002 10.7456 10.3703 10.8559L10.4798 10.8941L11.0714 11.1317C11.1166 11.1496 11.1661 11.1532 11.2133 11.142C11.2606 11.1309 11.3033 11.1056 11.3357 11.0694L11.365 11.0294L11.9265 10.056C11.9509 10.0139 11.9618 9.96523 11.9576 9.91669C11.9535 9.86815 11.9345 9.82205 11.9033 9.78465L11.8677 9.74995L10.8054 8.91984L10.8703 8.38867C10.8837 8.26322 10.8899 8.15289 10.8899 8.05057C10.8899 7.94825 10.8837 7.83793 10.8703 7.71248L10.8054 7.18042L11.8677 6.34941C11.906 6.31947 11.9341 6.27848 11.9483 6.232C11.9625 6.18552 11.962 6.13581 11.9469 6.08961L11.9265 6.04424L11.365 5.07087C11.3407 5.02875 11.304 4.99509 11.2599 4.97441C11.2159 4.95374 11.1666 4.94703 11.1186 4.95521L11.0705 4.96944L10.478 5.207C10.2827 5.28322 10.0719 5.31089 9.86363 5.28764C9.65534 5.26439 9.45581 5.19092 9.28218 5.07354C9.20551 5.02297 9.12686 4.97548 9.0464 4.93119L8.82486 4.81107C8.53125 4.63135 8.31772 4.34841 8.23764 4.01299L8.21718 3.89999L8.12643 3.27095C8.11947 3.22306 8.09801 3.17844 8.06492 3.14313C8.03183 3.10781 7.9887 3.08349 7.94136 3.07343L7.89154 3.0681ZM7.33101 6.62701C7.70856 6.62701 8.07065 6.77699 8.33762 7.04396C8.60459 7.31093 8.75457 7.67302 8.75457 8.05057C8.75457 8.42813 8.60459 8.79021 8.33762 9.05718C8.07065 9.32415 7.70856 9.47414 7.33101 9.47414C6.95346 9.47414 6.59137 9.32415 6.3244 9.05718C6.05743 8.79021 5.90744 8.42813 5.90744 8.05057C5.90744 7.67302 6.05743 7.31093 6.3244 7.04396C6.59137 6.77699 6.95346 6.62701 7.33101 6.62701Z" fill="#373D4D" />
                                            </svg>
                                        </div>
                                        <div className="lvlset">
                                            Level settings
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>

                    <div className="margin-top">
                        <div className="getstar display-1">
                            Overview
                        </div>
                    </div>
                    <div className="margin-top">
                        <div className="display-1 bor" style={{ flexWrap: 'wrap' }}>
                            <div className="display-1">
                                <div className="prd">Period:</div>

                                <FormControl fullWidth className='select-dash logselct'>
                                    {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        // label="Age"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>from Aug 5, 2024 to Aug 6, 2024</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>

                            </div>
                            <div className="display-1">
                                <div className="prd">Show:</div>

                                <FormControl fullWidth className='select-dash'>
                                    {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        // label="Age"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Last 24 hours</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>

                            </div>
                            <div className="display-1 ">
                                <div className="prd">Level name:</div>

                                <FormControl fullWidth className='select-dash'>
                                    {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        // label="Age"
                                        onChange={handleChange}

                                    >
                                        <MenuItem value={10} className='select-text'>All</MenuItem>
                                        <MenuItem value={20} className='select-text'>Twenty</MenuItem>
                                        <MenuItem value={30} className='select-text'>Thirty</MenuItem>
                                    </Select>
                                </FormControl>

                            </div>
                            <div className="display-1">
                                <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                                <div className="prodtin">Level breakdown</div>
                            </div>

                        </div>
                    </div>

                    <div className="margin-top bor">
                        <TableContainer component={Paper} >
                            <Table sx={{ minWidth: 850 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">S No</TableCell>
                                        <TableCell align="left">Checked Applicants</TableCell>
                                        <TableCell align="left">Applicants</TableCell>
                                        <TableCell align="left">Id Type</TableCell>
                                        <TableCell align="left">Applicants Name</TableCell>
                                        <TableCell align="left">Countries</TableCell>
                                        <TableCell align="left">Rejection Labels</TableCell>
                                        <TableCell align="left">Checked Applicants (over time) </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        loading === true ?
                                            <TableRow>
                                                <TableCell align="left" colSpan={6}>
                                                    <div style={{ height: "80vh" }}>
                                                        <div className="loader2">
                                                            <span className="l">A</span>
                                                            <span className="o">P</span>
                                                            <span className="a">Z</span>
                                                            <span className="d">K</span>
                                                            <span className="i">Y</span>
                                                            <span className="n">C</span>
                                                            <span className="g">.</span>
                                                            <span className="d1">.</span>
                                                            <span className="d2">.</span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                            :
                                            kycDetails?.length > 0 && kycDetails?.slice((page - 1) * perPage, page * perPage).map((row, index) => (
                                                <React.Fragment key={index}>
                                                    <TableRow>
                                                        <TableCell>
                                                            {(page - 1) * perPage * 4 + index * 4 + 1}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            <img src={!row?.address_proof?.includes('localhost') ? row?.address_proof : document} className="img-proof" alt="Address Proof" />
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            Address Proof
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {row?.ID_type}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {`${row?.Firstname} ${row?.Lastname}`}
                                                        </TableCell>

                                                        <TableCell align="left">
                                                            {row?.ID_country}
                                                        </TableCell>

                                                        <TableCell align="left">
                                                            <div className={`${row?.Id_verify ? 'verify' : 'not-verify'}`}>
                                                                {row?.Id_verify ? "Verified" : "Not Verified"}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {moment(row?.createdAt).format('DD-MM-YYYY hh:mm A')}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            {(page - 1) * perPage * 4 + index * 4 + 1 + 1}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            <img src={!row?.ID_Image_front?.includes('localhost') ? row?.ID_Image_front : document} className="img-proof" alt="ID Front" />
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            Front Side Image
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {row?.ID_type}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {`${row?.Firstname} ${row?.Lastname}`}
                                                        </TableCell>

                                                        <TableCell align="left">
                                                            {row?.ID_country}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            <div className={`${row?.Id_verify ? 'verify' : 'not-verify'}`}>
                                                                {row?.Id_verify ? "Verified" : "Not Verified"}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {moment(row?.createdAt).format('DD-MM-YYYY hh:mm A')}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            {(page - 1) * perPage * 4 + index * 4 + 1 + 2}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            <img src={!row?.ID_Image_Back?.includes('localhost') ? row?.ID_Image_Back : document} className="img-proof" alt="ID Back" />
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            Back Side Image
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {row?.ID_type}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {`${row?.Firstname} ${row?.Lastname}`}
                                                        </TableCell>

                                                        <TableCell align="left">
                                                            {row?.ID_country}
                                                        </TableCell>

                                                        <TableCell align="left">
                                                            <div className={`${row?.Id_verify ? 'verify' : 'not-verify'}`}>
                                                                {row?.Id_verify ? "Verified" : "Not Verified"}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {moment(row?.createdAt).format('DD-MM-YYYY hh:mm A')}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            {(page - 1) * perPage * 4 + index * 4 + 1 + 3}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            <img src={row?.faceImage !== '' ? `data:image/jpeg;base64,${row?.faceImage}` : document} className="img-proof" alt="Face Image" />
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            Liveness Image
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {row?.ID_type}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {`${row?.Firstname} ${row?.Lastname}`}
                                                        </TableCell>

                                                        <TableCell align="left">
                                                            {row?.ID_country}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            <div className={`${row?.Liveness_verify ? 'verify' : 'not-verify'}`}>
                                                                {row?.Liveness_verify ? "Verified" : "Not Verified"}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {moment(row?.createdAt).format('DD-MM-YYYY hh:mm A')}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>


                                                    </TableRow>
                                                </React.Fragment>
                                            ))
                                    }


                                    {
                                        kycDetails?.length == 0 &&
                                        <TableRow

                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            {/* <TableCell align="right" colspan="2" className='text-center ht'>No data yet</TableCell> */}

                                            <TableCell align="right" colspan="5" className='text-center ht'>No data yet</TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </div>
                </div >
                <Pagination
                    className="pagnation"
                    count={Math.ceil(kycDetails?.length / perPage)}
                    page={page}
                    onChange={handlePageChange}
                    variant="outlined"
                    color="primary"
                    shape="rounded"
                />
                <HelpCenter />
                <Modal
                    open={open}
                    // onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className='mdl-cls'
                    style={{ display: 'none' }}
                >
                    <Box sx={style}>
                        <div className="text-right clox cursor">
                            <CancelIcon onClick={handleClose} sx={{ fill: 'var(--theme-color) ' }} />
                        </div>
                        <div className=" display-1 margin-top" style={{ flexFlow: 'wrap' }}>
                            <div className="activ-pl">
                                Activate your free 14-days trial
                            </div>
                            <div className="get50">
                                Get 50 free verifications
                            </div>
                        </div>
                        <div className="text-left avt-tbn margin-top">
                            <Button onClick={(() => { navigate('/pricing') })} >
                                Activate free trial
                            </Button>
                        </div>
                    </Box>
                </Modal>
            </Box >
        </div >
    )
}

export default Overview
