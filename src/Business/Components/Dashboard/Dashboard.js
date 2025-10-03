import { Box, Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Sidebar from '../SideBar/Sidebar'
import './Dashboard.css'
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
import { useNavigate } from 'react-router-dom';
// import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery'
import Axios from '../../../Axios';
import toast from 'react-hot-toast';
import { decryptData } from '../../../middleware';
import Statistics from '../Statistics/Statistics'
import Overview from '../Overview/Overview'
import { green } from '@mui/material/colors';



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


function Dashboard() {
    const theme = useTheme();

    const isLgup = useMediaQuery(theme.breakpoints.up('lg'));
    const mobileUp = useMediaQuery(theme.breakpoints.up('sm'));
    const [subscribe, setSubscribe] = useState(false)
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

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate()

    const checkkyb = async () => {
        try {
            const { data } = await Axios.get('/checkkyb', {
                headers: {
                    Authorization: window.localStorage.getItem('Rikosta')
                }
            })
            if (data?.success == true) {
                if (data?.result?.Verify == "Rejected") {
                    toast.error("Please Verify Your KYB")
                    navigate('/kyb')
                }
            } else {
                toast.error("Please Verify Your KYB")
                navigate('/kyb')
            }
        } catch (error) {
            console.log("🚀 ~ checkkyb ~ error:", error)
        }
    }

    const getPaymentList = async () => {
        try {
            const { data } = await Axios.get('/paymentcheck', {
                headers: {
                    Authorization: window.localStorage.getItem('Rikosta')
                }
            })
            if (data?.success) {
                setOpen(false)
                setSubscribe(true)
            } else {
                setOpen(true)
                setSubscribe(false)
            }
        } catch (error) {
            if (error?.status == 499) {
                toast.error(error?.response?.data?.message)
                window.localStorage.removeItem('Rikosta');
                window.localStorage.removeItem('userType');
                setTimeout(() => {
                    window.location.replace('/login')
                }, 1000);
            }
            console.log("🚀 ~ getPaymentList ~ error:", error)
        }
    }

    useEffect(() => {
        if (usertype === 'organization' || subAdminDetails?.access?.kyb === true) {
            checkkyb()

        }
        else if (usertype === 'organization') {
            getPaymentList()
        }
    }, [subAdminDetails, usertype])





    return (
        <div className='dashboard'>
            <Box sx={{ display: isLgup ? 'flex' : 'block' }}>
                {/* <CssBaseline /> */}
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '60px' }}>
                    {/* <DrawerHeader /> */}
                    <div className="">
                        <div className="display-2 dashmain">
                            {/* <div className="getstar display-1" style={{ flexDirection: !mobileUp && 'column' }}>
                                Get started with APZKYC
                                <span className='display-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.66267 3.17803C9.15029 2.54455 10.8256 2.35948 12.6736 2.61572C12.9951 2.66037 13.2916 2.81351 13.5141 3.04976C13.7366 3.28601 13.8717 3.59119 13.897 3.91473L13.9014 4.02594V11.255C13.9014 11.4566 13.8586 11.6559 13.7758 11.8396C13.693 12.0234 13.5721 12.1876 13.4211 12.3211C13.2701 12.4547 13.0925 12.5547 12.9 12.6145C12.7075 12.6742 12.5045 12.6924 12.3044 12.6679C10.7687 12.4792 9.40742 12.6447 8.20718 13.159V13.1804L8.16002 13.1795L7.98742 13.2578L7.81748 13.3405L7.4954 13.5042L7.17332 13.3405C7.06069 13.2836 6.94646 13.2299 6.83077 13.1795L6.78361 13.1804V13.159C5.58426 12.6447 4.22209 12.4792 2.68642 12.6679C2.3117 12.7139 1.93406 12.6091 1.63655 12.3767C1.33905 12.1443 1.14606 11.8032 1.10003 11.4285L1.09202 11.3422L1.08936 11.2559V4.02594C1.08931 3.68227 1.2136 3.35018 1.43927 3.09098C1.66495 2.83179 1.97677 2.66298 2.31718 2.61572C4.0566 2.37372 5.64209 2.52408 7.06388 3.07127L7.32813 3.17803L7.4954 3.25188L7.66267 3.17803ZM6.78361 4.49394C5.61629 3.99391 4.29593 3.82309 2.81098 3.98857L2.51203 4.02594V11.255L2.82255 11.2212C4.25323 11.0833 5.57536 11.2194 6.78361 11.634V4.49394ZM12.477 4.02594C10.8701 3.80262 9.45191 3.9601 8.20629 4.49394V11.634C9.32112 11.2514 10.5329 11.1055 11.8382 11.1945L12.1674 11.2212L12.477 11.255V4.02594Z" fill="#1764FF" />
                                    </svg>
                                    Check out the quick start guide
                                </span>
                            </div> */}
                            {!open && subscribe ? <div >
                                <div className=" display-1 margin-top" style={{ flexFlow: 'wrap' }}>
                                    <div className="activ-pl2">
                                        Activate your free 14-days trial
                                        <div className="display-1">
                                            <div className="get502">
                                                Get 50 free verifications
                                            </div>
                                            <div className="text-left avt-tbn2">
                                                {
                                                    usertype === 'organization' ?
                                                        <div onClick={(() => { navigate('/pricing') })} className='getstar cursor' >
                                                            <span>
                                                                Activate {`${">>"}`}
                                                            </span>
                                                        </div> : <></>
                                                }
                                            </div>
                                        </div>

                                    </div>


                                </div>

                            </div> : <></>}
                        </div>

                    </div>


                    <div className="">
                        {/* <Grid container>
                            <Grid xs={12} sx={12} md={6} lg={4} xl={4}>
                                <div className="dcard-main" style={{ width: !mobileUp && '100%' }}>
                                    <div className="display-1">
                                        <div className="sta">
                                            Start
                                        </div>
                                        <div className="nosta">
                                            No code
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
                            <Grid xs={12} sx={12} md={6} lg={4} xl={4}>
                                <div className="dcard-main" style={{ width: !mobileUp && '100%' }}>
                                    <div className="display-1">
                                        <div className="nosta">
                                            No code
                                        </div>
                                    </div>
                                    <div className="dcard-hd text-left margin-top">
                                        Create custom verification flow
                                    </div>
                                    <div className="dcard-desx text-left margin-top">
                                        Create and edit applicant levels to customize the steps of
                                        your customer verification process
                                    </div>

                                    <div className="display-1 " style={{ flexDirection: !mobileUp && 'column', marginTop: '35px' }}>
                                        <div className="textflow">
                                            <Button>
                                                +  Add new level
                                            </Button>
                                        </div>

                                        <div className="display-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.38972 3.51006C8.87734 2.87658 10.5527 2.69151 12.4007 2.94776C12.7221 2.9924 13.0186 3.14554 13.2411 3.38179C13.4636 3.61804 13.5987 3.92322 13.624 4.24676L13.6285 4.35797V11.587C13.6285 11.7886 13.5857 11.9879 13.5029 12.1717C13.4201 12.3555 13.2992 12.5196 13.1482 12.6532C12.9972 12.7867 12.8196 12.8867 12.627 12.9465C12.4345 13.0063 12.2315 13.0245 12.0314 12.9999C10.4958 12.8113 9.13447 12.9768 7.93423 13.491V13.5124L7.88707 13.5115L7.71447 13.5898L7.54453 13.6725L7.22245 13.8362L6.90037 13.6725C6.78774 13.6156 6.67351 13.5619 6.55782 13.5115L6.51066 13.5124V13.491C5.31131 12.9768 3.94914 12.8113 2.41347 12.9999C2.03875 13.0459 1.66111 12.9412 1.36361 12.7087C1.0661 12.4763 0.873113 12.1352 0.827083 11.7605L0.819075 11.6742L0.816406 11.5879V4.35797C0.816364 4.0143 0.940651 3.68221 1.16632 3.42302C1.392 3.16382 1.70382 2.99501 2.04423 2.94776C3.78365 2.70575 5.36914 2.85611 6.79093 3.4033L7.05518 3.51006L7.22245 3.58391L7.38972 3.51006ZM6.51066 4.82597C5.34334 4.32594 4.02299 4.15512 2.53803 4.32061L2.23908 4.35797V11.587L2.5496 11.5532C3.98028 11.4153 5.30241 11.5514 6.51066 11.966V4.82597ZM12.204 4.35797C10.5972 4.13465 9.17896 4.29213 7.93334 4.82597V11.966C9.04817 11.5835 10.26 11.4375 11.5652 11.5265L11.8944 11.5532L12.204 11.587V4.35797Z" fill="#1764FF" />
                                            </svg>
                                            <div className="d-c2">
                                                How to set up flow
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid xs={12} sx={12} md={12} lg={4} xl={4}>
                                <div className="dcard-main" style={{ width: !mobileUp && '100%' }}>
                                    <div className="display-1">

                                        <div className="inter">
                                            Integration
                                        </div>
                                    </div>
                                    <div className="dcard-hd text-left margin-top">
                                        Integrate with Apzkyc
                                    </div>

                                    <div className="display-1 margin-t-10px">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                            <mask id="mask0_86_2956" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="15" height="15">
                                                <path d="M0.550781 0.167969H14.7864V14.4036H0.550781V0.167969Z" fill="white" />
                                            </mask>
                                            <g mask="url(#mask0_86_2956)">
                                                <path d="M11.2258 5.06115C11.2258 5.41511 11.0852 5.75457 10.8349 6.00485C10.5846 6.25514 10.2452 6.39575 9.89123 6.39575C9.53728 6.39575 9.19782 6.25514 8.94753 6.00485C8.69725 5.75457 8.55664 5.41511 8.55664 5.06115C8.55664 4.7072 8.69725 4.36774 8.94753 4.11746C9.19782 3.86717 9.53728 3.72656 9.89123 3.72656C10.2452 3.72656 10.5846 3.86717 10.8349 4.11746C11.0852 4.36774 11.2258 4.7072 11.2258 5.06115Z" fill="#7D8799" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.11266 0.688103C7.18896 0.57351 7.29883 0.48532 7.42722 0.435622C7.5556 0.385925 7.69622 0.377152 7.82978 0.410507L12.8123 1.65613C12.9297 1.68544 13.0369 1.74613 13.1225 1.8317C13.208 1.91727 13.2687 2.0245 13.2981 2.14192L14.5437 7.12439C14.577 7.25796 14.5683 7.39858 14.5186 7.52696C14.4689 7.65535 14.3807 7.76522 14.2661 7.84152L10.5292 10.3328C10.4196 10.4058 10.2908 10.4448 10.1591 10.4449H7.32086L3.77974 13.986C3.65472 14.1112 3.4851 14.1816 3.30819 14.1817H1.43976C1.26278 14.1817 1.09305 14.1114 0.967907 13.9863C0.842765 13.8611 0.772461 13.6914 0.772461 13.5144V11.646C0.772617 11.4691 0.843023 11.2995 0.968201 11.1744L4.50932 7.63332V4.79509C4.50933 4.66335 4.54834 4.53456 4.62142 4.42496L7.11266 0.688103ZM7.96235 1.81984L5.84391 4.99706V7.90913C5.84375 8.08605 5.77335 8.25567 5.64817 8.38069L2.10705 11.9218V12.8471H3.03237L6.57349 9.30601C6.69851 9.18083 6.86813 9.11042 7.04504 9.11027H9.95712L13.1343 6.99272L12.1005 2.8537L7.96146 1.81984H7.96235Z" fill="#7D8799" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M6.75122 12.6488L5.41662 11.3142L6.35974 10.3711L7.69433 11.7057L6.75122 12.6488ZM5.41662 13.9834L4.08203 12.6488L5.02514 11.7057L6.35974 13.0403L5.41662 13.9834Z" fill="#7D8799" />
                                            </g>
                                        </svg>
                                        <div className=" dcard-desx text-left">
                                            <span style={{ marginLeft: '0px', cursor: 'pointer' }} onClick={() => { window.location.href = '/profileSetting' }}  >Generate an App Token</span>
                                            for Authentication
                                        </div>
                                    </div>
                                    <div className="display-1 margin-t-10px" >
                                        <div className="display-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M4.10886 1.97567C4.10886 1.73969 4.2026 1.51339 4.36946 1.34653C4.53631 1.17968 4.76262 1.08594 4.99859 1.08594H10.337C10.5729 1.08594 10.7992 1.17968 10.9661 1.34653C11.1329 1.51339 11.2267 1.73969 11.2267 1.97567V5.53458C11.2267 5.77055 11.1329 5.99685 10.9661 6.16371C10.7992 6.33057 10.5729 6.42431 10.337 6.42431H8.33507V8.42619H12.1164C12.9759 8.42619 13.6734 9.12374 13.6734 9.98322V11.7627H12.3388V9.98322C12.3388 9.92422 12.3154 9.86765 12.2737 9.82593C12.232 9.78422 12.1754 9.76079 12.1164 9.76079H8.33507V11.7627H7.00048V9.76079H3.21913C3.16014 9.76079 3.10356 9.78422 3.06185 9.82593C3.02014 9.86765 2.9967 9.92422 2.9967 9.98322V11.7627H1.66211V9.98322C1.66211 9.12374 2.35966 8.42619 3.21913 8.42619H7.00048V6.42431H4.99859C4.76262 6.42431 4.53631 6.33057 4.36946 6.16371C4.2026 5.99685 4.10886 5.77055 4.10886 5.53458V1.97567ZM5.44345 5.08971V2.42053H9.89209V5.08971H5.44345Z" fill="#7D8799" />
                                                <path d="M1.43856 12.6562C1.20259 12.6562 0.97628 12.75 0.809423 12.9168C0.642567 13.0837 0.548828 13.31 0.548828 13.546C0.548828 13.7819 0.642567 14.0083 0.809423 14.1751C0.97628 14.342 1.20259 14.4357 1.43856 14.4357H3.21801C3.45398 14.4357 3.68029 14.342 3.84714 14.1751C4.014 14.0083 4.10774 13.7819 4.10774 13.546C4.10774 13.31 4.014 13.0837 3.84714 12.9168C3.68029 12.75 3.45398 12.6562 3.21801 12.6562H1.43856ZM5.8872 13.546C5.8872 13.31 5.98094 13.0837 6.14779 12.9168C6.31465 12.75 6.54095 12.6562 6.77692 12.6562H8.55638C8.79235 12.6562 9.01866 12.75 9.18551 12.9168C9.35237 13.0837 9.44611 13.31 9.44611 13.546C9.44611 13.7819 9.35237 14.0083 9.18551 14.1751C9.01866 14.342 8.79235 14.4357 8.55638 14.4357H6.77692C6.54095 14.4357 6.31465 14.342 6.14779 14.1751C5.98094 14.0083 5.8872 13.7819 5.8872 13.546ZM12.1153 12.6562C11.8793 12.6562 11.653 12.75 11.4862 12.9168C11.3193 13.0837 11.2256 13.31 11.2256 13.546C11.2256 13.7819 11.3193 14.0083 11.4862 14.1751C11.653 14.342 11.8793 14.4357 12.1153 14.4357H13.8947C14.1307 14.4357 14.357 14.342 14.5239 14.1751C14.6907 14.0083 14.7845 13.7819 14.7845 13.546C14.7845 13.31 14.6907 13.0837 14.5239 12.9168C14.357 12.75 14.1307 12.6562 13.8947 12.6562H12.1153Z" fill="#7D8799" />
                                            </svg>
                                        </div>

                                        <div className="dcard-desx text-left">
                                            Configure  <span >WebSDK</span> or<span>MobileSDK</span>
                                            for quick and easy  integration. Or integrate through <span>APZKYC API</span>
                                        </div>
                                    </div>

                                    <div className="display-1 margin-t-10px">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                            <path d="M4.82111 12.0878C5.15742 11.8921 5.40279 11.5714 5.50378 11.1956C5.60477 10.8198 5.55319 10.4194 5.36028 10.0814C5.32754 10.0257 5.29035 9.97277 5.24907 9.92307L7.13974 6.81347L6.67174 6.54388C6.33165 6.34277 6.04987 6.05646 5.85421 5.71319C5.65855 5.36993 5.55577 4.98159 5.55602 4.58648C5.55532 4.2883 5.61352 3.99291 5.72727 3.71728C5.84103 3.44165 6.00811 3.1912 6.21892 2.98031C6.42972 2.76942 6.68011 2.60224 6.95569 2.48838C7.23128 2.37451 7.52664 2.3162 7.82483 2.31678C8.12294 2.3162 8.41823 2.37448 8.69376 2.48829C8.96929 2.6021 9.21963 2.7692 9.43042 2.97999C9.64122 3.19079 9.80832 3.44113 9.92213 3.71666C10.0359 3.99219 10.0942 4.28748 10.0936 4.58559C10.0951 4.81076 10.0624 5.03486 9.99665 5.25022L9.9317 5.46197L10.9496 5.7796L11.0154 5.56607C11.1677 5.06697 11.201 4.53913 11.1126 4.02485C11.0241 3.51057 10.8165 3.02416 10.5062 2.60458C10.196 2.185 9.79178 1.84393 9.32598 1.6087C8.86018 1.37347 8.34576 1.25062 7.82394 1.25C6.93941 1.25118 6.09145 1.60308 5.46599 2.22853C4.84053 2.85399 4.48864 3.70195 4.48746 4.58648C4.48746 5.61412 4.96346 6.52164 5.69215 7.1311L4.33176 9.375C3.99601 9.31332 3.64926 9.37258 3.35306 9.54226C3.01665 9.73813 2.7713 10.059 2.67047 10.435C2.56964 10.811 2.62151 11.2116 2.81477 11.5495C3.01063 11.8859 3.33152 12.1313 3.70751 12.2321C4.08349 12.3329 4.4832 12.281 4.82111 12.0878Z" fill="#7D8799" />
                                            <path d="M11.2489 7.48076C10.8699 7.48546 10.495 7.55871 10.1421 7.69697L8.94361 5.5198C9.16689 5.26102 9.29028 4.93093 9.2915 4.58915C9.2915 3.78127 8.63132 3.12109 7.82345 3.12109C7.01557 3.12109 6.3554 3.78127 6.3554 4.58915C6.35621 4.79728 6.40114 5.00287 6.48723 5.19237C6.57331 5.38186 6.69858 5.55096 6.85479 5.6885C7.011 5.82605 7.19459 5.92891 7.39346 5.99032C7.59232 6.05172 7.80195 6.07027 8.00851 6.04474L9.42852 8.61783L9.67764 9.08227L10.1545 8.83582L10.1599 8.83226C10.5048 8.64183 10.8935 8.5447 11.2875 8.55049C11.6814 8.55627 12.0671 8.66475 12.4063 8.86523C12.7455 9.0657 13.0265 9.35121 13.2216 9.69356C13.4167 10.0359 13.5191 10.4232 13.5186 10.8172C13.5192 11.1153 13.4609 11.4106 13.3471 11.6862C13.2333 11.9617 13.0662 12.212 12.8554 12.4228C12.6446 12.6336 12.3942 12.8007 12.1187 12.9145C11.8432 13.0283 11.5479 13.0866 11.2498 13.086C10.6609 13.0861 10.0949 12.8573 9.67141 12.4481L9.51037 12.2933L8.77457 13.0629L8.93472 13.2168C9.55566 13.8172 10.3852 14.1533 11.2489 14.1546C12.1334 14.1534 12.9814 13.8015 13.6068 13.1761C14.2323 12.5506 14.5842 11.7027 14.5854 10.8181C14.5842 9.9336 14.2323 9.08564 13.6068 8.46018C12.9814 7.83473 12.1334 7.48194 11.2489 7.48076Z" fill="#7D8799" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M3.75297 8.56407L3.48872 7.51953L3.2734 7.57291C2.48448 7.77278 1.79564 8.25374 1.3362 8.92551C0.876767 9.59727 0.678338 10.4136 0.778167 11.2213C0.877997 12.029 1.26922 12.7725 1.87839 13.3122C2.48755 13.8519 3.27277 14.1507 4.08662 14.1525C5.74329 14.1525 7.07699 12.9246 7.33679 11.3498H9.89031C10.1038 11.8925 10.6288 12.284 11.2489 12.284C12.0568 12.284 12.717 11.6238 12.717 10.816C12.717 10.0081 12.0568 9.34792 11.2489 9.34792C10.9548 9.34868 10.6678 9.43828 10.4255 9.60499C10.1833 9.7717 9.997 10.0077 9.8912 10.2821H6.35542V10.816C6.35601 11.1141 6.29772 11.4094 6.18391 11.6849C6.0701 11.9604 5.90301 12.2108 5.69221 12.4216C5.48142 12.6324 5.23107 12.7995 4.95554 12.9133C4.68001 13.0271 4.38472 13.0854 4.08662 13.0848C3.78851 13.0854 3.49322 13.0271 3.21769 12.9133C2.94216 12.7995 2.69181 12.6324 2.48102 12.4216C2.27022 12.2108 2.10313 11.9604 1.98932 11.6849C1.87551 11.4094 1.81722 11.1141 1.81781 10.816C1.81781 9.75097 2.55006 8.86391 3.53676 8.61835L3.75386 8.56407H3.75297ZM3.48338 8.40214C3.47655 8.40388 3.46973 8.40566 3.46292 8.40748L3.48338 8.40214Z" fill="#7D8799" />
                                        </svg>
                                        <div className="dcard-desx   text-left">
                                            <span style={{ marginLeft: '0px' }}>Create Webhooks</span>  to receive verification results
                                        </div>
                                    </div>


                                </div>
                            </Grid>
                        </Grid> */}

                        {/* <div className="margin-top">
                            <div className="getstar display-1">
                                Overview
                            </div>
                        </div>
                        <div className="margin-top">
                            <div className="display-1 bor" style={{ flexWrap: 'wrap' }}>
                                <div className="display-1">
                                    <div className="prd">Period:</div>

                                    <FormControl fullWidth className='select-dash logselct'>
                                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={age}
                                            label="Age"
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
                                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={age}
                                            label="Age"
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
                                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={age}
                                            label="Age"
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
                                            <TableCell>Checked Applicants</TableCell>
                                            <TableCell align="right">Checked Applicants (over time) </TableCell>
                                            <TableCell align="right">Answers</TableCell>
                                            <TableCell align="right">Countries</TableCell>
                                            <TableCell align="right">Rejection Labels</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        <TableRow

                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="right" colspan="2" className='text-center ht'>No data yet</TableCell>
                                            <TableCell align="right" colSpan="5" className='text-center ht'>No data yet</TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div> */}
                        <Statistics />
                        <Overview />

                    </div>




                    <Modal
                        open={open}
                        // onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        className='mdl-cls'
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
                </Box>
            </Box>
        </div>
    )
}

export default Dashboard
