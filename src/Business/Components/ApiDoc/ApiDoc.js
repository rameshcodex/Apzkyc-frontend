import { Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery'
import { json, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Button, Typography } from '@mui/material';
import './Apidoc.css'
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';

import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';

import apx from '../../../Images/apzlogo.png'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import toast from 'react-hot-toast';
import consts from '../../../constant'


import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Sidebar from '../SideBar/Sidebar';
//table
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('discqty', 'A Disclosed Quantity condition allows you to disclose only a part of the order quantity to the market. This quantity, however cannot be more than the total quantity of the stocks you are purchasing. The Stock Exchange may set minimum disclosed quantity criteria from time to time.', 6.0, 24, 4.0),
    createData('prctype', 'Trading Symbol of the Instrument.Trading Symbol is a unique code given to all companies listed on the exchange. Selected Instrument Trading Symbol will be displayed', 9.0, 37, 4.3),
    createData('trading_symbol', 'Exchange (NSE or BSE or NFO or MCX)', 16.0, 24, 6.0),
];


//tab
const drawerWidth = 240;

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


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}


function ApiDoc() {

    const theme = useTheme();

    const isLgup = useMediaQuery(theme.breakpoints.up('lg'));

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [valueTab2, setValueTab2] = React.useState(0);

    const handleChangeTab2 = (event, newValue) => {
        setValueTab2(newValue);
    };

    const [apiTitle, setApiTitle] = useState(
        [
            { title: 'Create Kyc' },
            { title: 'Check Kyc Verification' },
            { title: 'Get All Kyc Details' },
        ]
    )

    const navigate = useNavigate()

    const location = useLocation()

    const pathName = location.pathname

    useEffect(() => {
        if (pathName === '/createkyc') {
            setValue(0)
        } else if (pathName === '/checkkyc') {
            setValue(1)
        } else if (pathName === '/getkyc') {
            setValue(2)
        } else if (pathName === "/addressVerification") {
            setValue(3)
        }
    }, [pathName])

    const drawer = (
        <div>
            <div className="apxlogo text-center padding-10 margin-10">
                <img src={apx} alt="apx" onClick={() => { navigate('/dashboard') }} />
            </div>
            {/* <Toolbar /> */}
            <Divider />
            <List>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    // sx={{ borderRight: 1, borderColor: 'divider' }}
                    className='vibter x2'
                >
                    {apiTitle.map((row, i) => {
                        return (
                            <Tab label={row.title} {...a11yProps(i)} />
                        )
                    })}

                </Tabs>
            </List>

        </div>
    );




    // const sampObj =
    // {
    //     'Firstname': 'KERISHA',
    //     'Lastname': 'PILLAY',
    //     'dob': '2002-05-31',
    //     'email': 'kerisha@apzor.com',
    //     'phone': '0680832965',
    //     'address_line1': '56',
    //     'address_line2': 'Richefond circle',
    //     'city': 'Uhmlanga',
    //     'stateOrProvince': 'KZN',
    //     'postalcode': '4319',
    //     'Country': 'South Africa',
    //     'address_proof': 'https://dreamstermusic.com/api/images/1727163599909_passport.jpg',
    //     'ID_country': 'South Africa',
    //     'ID_type': 'Passport',
    //     'ID_Number': 'A09631611',
    //     'ID_Image_front': 'https://dreamstermusic.com/api/images/1727699334381_passport.jpeg.png',
    //     'ID_Image_Back': 'https://dreamstermusic.com/api/images/1727699334381_passport.jpeg.png',
    //     'SuccessUrl': 'https://stage.apzkyc.com/success',
    //     'FailureUrl': 'https://stage.apzkyc.com//failure'
    // }

    const sampObj =
    {
        'Firstname': 'Test',
        'Lastname': 'Test',
        'dob': '2002-05-31',
        'email': 'Test@gmail.com',
        'phone': '741*****20',
        'address_line1': '56',
        'address_line2': 'Test Address',
        'city': 'Uhmlanga',
        'stateOrProvince': 'KZN',
        'postalcode': '4319',
        'Country': 'South Africa',
        'address_proof': 'https://sample.com/api/images/1727163599909_passport.jpg',
        'ID_country': 'South Africa',
        'ID_type': 'Passport',
        'ID_Number': 'A09631611',
        'ID_Image_front': 'https://sample.com/api/images/1727699334381_passport.jpeg.png',
        'ID_Image_Back': 'https://sample.com/api/images/1727699334381_passport.jpeg.png',
        'SuccessUrl': 'https://sample.com/success',
        'FailureUrl': 'https://sample.com//failure'
    }

    // const renderJsonLikeStructure = (obj) => {
    //     return (
    //         <div style={{ paddingLeft: '20px', borderLeft: '1px solid #ccc', marginBottom: '10px' }}>
    //             {Object.entries(obj).map(([key, value]) => {
    //                 return (
    //                     <div key={key}>
    //                         <strong>{key}:</strong>
    //                         {typeof value === 'object' && !Array.isArray(value) ? (
    //                             renderJsonLikeStructure(value)
    //                         ) : (
    //                             <span> {JSON.stringify(value)}</span>
    //                         )}
    //                     </div>
    //                 );
    //             })}
    //         </div>
    //     );
    // };


    // Function to copy JSON content to clipboard
    const copyToClipboard = () => {
        const jsonString = JSON.stringify(sampObj, null, 2); // Format JSON for readability
        navigator.clipboard.writeText(jsonString)
            .then(() => {
                toast.success('Copied to clipboard!'); // Notify user on success
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                toast.error('Failed to copy!'); // Notify user on failure
            });
    };


    return (
        <div className='apidoc'>
            <Box sx={{ display: isLgup ? 'flex' : 'block' }}>
                {/* <CssBaseline /> */}
                <Sidebar />

                <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '80px' }}>
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                            <TabPanel value={value} index={0} className='tb1 x2'>
                                <Grid item container spacing={2}>
                                    <Grid item xs={12} sm={12} md={4} lg={6} xl={7}>
                                        <h2> Create Kyc</h2>

                                        {/* <p>Create Kyc</p> */}
                                        <ul style={{ paddingLeft: "20px" }} >
                                            <li>Base URL: {consts.BackendUrl}</li>
                                            <li>POST : /VerifyKYC</li>
                                        </ul>

                                        {/* <div>
                                    The following steps show you how to install the AWS Command Line Interface (AWS CLI) and AWS SDKs that the examples in this documentation use. There are a number of different ways to authenticate AWS SDK calls. The examples in this guide assume that you're using a default credentials profile for calling AWS CLI commands and AWS SDK API operations.
                                </div> */}

                                        <div>Input Parameters:</div>
                                        <TableContainer component={Paper} className='margin-top'>
                                            <Table sx={{ minWidth: 650 }} aria-label="caption table" className='padding-10'>

                                                <TableHead className='apidoc-table'>
                                                    <TableRow>
                                                        <TableCell>KEY</TableCell>
                                                        <TableCell >DESCRIPTION</TableCell>

                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>Firstname</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>Your First Name As Per The Document</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>Lastname</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>Your Last Name As Per The Document</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>dob</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>Date Of Birth As Per The Document eg:"YYYY-MM-DD"</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>email</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>Valid Email Address</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>phone</div>
                                                            <div>Number</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>Valid Phone Number</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>soi</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>Source of Income</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>empyType</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>Employment Type</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>gender</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>Gender Must be ( "Male" or "Female" or "Others" )</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>ID_country</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>Country As Per The Document</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>

                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>ID_type</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>ID types are ("Passport", "NationalId", "GreenBook")</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>

                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>ID_Number</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>ID Card Number</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>

                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>ID_Image_front</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>Id Front Side Image as url format</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>

                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>ID_Image_Back</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>Id Back Side Image as url format</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>

                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>SuccessUrl</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>That Url kyc is verified redirect to the url</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>

                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>FailureUrl</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>That Url kyc is not verified redirect to the url</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>

                                        <div>Success Response:</div>
                                        <TableContainer component={Paper} className='margin-top'>
                                            <Table sx={{ minWidth: 650 }} aria-label="caption table" className='padding-10'>

                                                <TableHead className='apidoc-table'>
                                                    <TableRow>
                                                        <TableCell>KEY</TableCell>
                                                        <TableCell >DESCRIPTION</TableCell>

                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>success</div>
                                                            <div>Boolean</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>Api call status</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>

                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>verification_Result</div>
                                                            <div>Object</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>-</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>

                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>Id_card_result</div>
                                                            <div>Object</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>-</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>

                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>id</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>Unique Id for the Verification
                                                            </div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>

                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>url</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>This is the url of the liveness verification</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>

                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>verify_status</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>(Verified or Not_Verified) verified means document verification is success. Not_Verified means document verification is failed</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>

                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>message</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div> Return Message</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>

                                        {/* <h4>To set up the AWS CLI and the AWS SDKs</h4>
                                <ol>
                                    <li>
                                        Download and install the AWS CLI and the AWS SDKs that you want to use. This guide provides examples for the AWS CLI, Java, Python, Ruby, Node.js, PHP, .NET, and JavaScript. For information about installing AWS SDKs, see Tools for Amazon Web Services.
                                    </li>
                                    <li>
                                        Create an access key for the user you created in Create an AWS Account and User.
                                        <ul>
                                            <li>
                                                Sign in to the AWS Management Console and open the IAM console at https://console.aws.amazon.com/iam/.

                                            </li>
                                            <li>
                                                In the navigation pane, choose Users.
                                            </li>
                                            <li>
                                                Choose the name of the user you created in Create an AWS Account and User.

                                            </li>
                                            <li>
                                                Choose the Security credentials tab.
                                            </li>
                                            <li>
                                                Choose Create access key. Then choose Download .csv file to save the access key ID and secret access key to a CSV file on your computer. Store the file in a secure location. You will not have access to the secret access key again after this dialog box closes. After you have downloaded the CSV file, choose Close.
                                            </li>
                                        </ul>

                                    </li>
                                    <li>
                                        If you have installed the AWS CLI, you can configure the credentials and region for most AWS SDKs by entering aws configure at the command prompt. Otherwise, use the following instructions.
                                    </li>
                                    <li>

                                        On your computer, navigate to your home directory, and create an .aws directory. On Unix-based systems, such as Linux or macOS, this is in the following location:
                                    </li>
                                </ol> */}
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8} lg={6} xl={5}>
                                        <div class="container">
                                            <div class="window">
                                                <div class="window-title">
                                                    <p>Console Window</p>
                                                    <div class="window-buttons">
                                                        <div class="window-button fullscreen"></div>
                                                        <div class="window-button reduce"></div>
                                                        <div class="window-button cloose"></div>
                                                        <div className="text-right display-1" style={{ margin: '5px' }}>
                                                            <button class="btn-copy" onClick={copyToClipboard} >
                                                                <span
                                                                    data-text-end="Copied!"
                                                                    data-text-initial="Copy to clipboard"
                                                                    class="cp-tooltip"
                                                                ></span>
                                                                <span>
                                                                    <svg
                                                                        xmlSpace="preserve"
                                                                        style={{ enableBackground: 'new 0 0 512 512' }}
                                                                        viewBox="0 0 6.35 6.35"
                                                                        y="0"
                                                                        x="0"
                                                                        height="20"
                                                                        width="20"
                                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                        version="1.1"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        class="cp-clipboard"
                                                                    >
                                                                        <g>
                                                                            <path
                                                                                fill="currentColor"
                                                                                d="M2.43.265c-.3 0-.548.236-.573.53h-.328a.74.74 0 0 0-.735.734v3.822a.74.74 0 0 0 .735.734H4.82a.74.74 0 0 0 .735-.734V1.529a.74.74 0 0 0-.735-.735h-.328a.58.58 0 0 0-.573-.53zm0 .529h1.49c.032 0 .049.017.049.049v.431c0 .032-.017.049-.049.049H2.43c-.032 0-.05-.017-.05-.049V.843c0-.032.018-.05.05-.05zm-.901.53h.328c.026.292.274.528.573.528h1.49a.58.58 0 0 0 .573-.529h.328a.2.2 0 0 1 .206.206v3.822a.2.2 0 0 1-.206.205H1.53a.2.2 0 0 1-.206-.205V1.529a.2.2 0 0 1 .206-.206z"
                                                                            ></path>
                                                                        </g>
                                                                    </svg>
                                                                    <svg
                                                                        xmlSpace="preserve"
                                                                        style={{ enableBackground: 'new 0 0 512 512' }}
                                                                        viewBox="0 0 24 24"
                                                                        y="0"
                                                                        x="0"
                                                                        height="18"
                                                                        width="18"
                                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                        version="1.1"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        class="cp-check-mark"
                                                                    >
                                                                        <g>
                                                                            <path
                                                                                data-original="#000000"
                                                                                fill="currentColor"
                                                                                d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                                                                            ></path>
                                                                        </g>
                                                                    </svg>
                                                                </span>
                                                            </button>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div class="console">
                                                    <Box sx={{ width: '100%' }}>
                                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                            <Tabs value={valueTab2} onChange={handleChangeTab2} aria-label="basic tabs example">
                                                                {/* <Tab label={<img width="35" height="35" src="https://img.icons8.com/color/35/c-plus-plus-logo.png" alt="c-plus-plus-logo" />} {...a11yProps(0)} /> */}
                                                                <Tab label={<img width="35" height="35" src="https://img.icons8.com/color/35/java-coffee-cup-logo--v1.png" alt="java-coffee-cup-logo--v1" />} {...a11yProps(0)} />
                                                                <Tab label={<img width="35" height="35" src="https://img.icons8.com/color/35/python--v1.png" alt="python--v1" />} {...a11yProps(1)} />
                                                                <Tab label={<img width="35" height="35" src="https://img.icons8.com/color/240/javascript.png" alt="javascript" />} {...a11yProps(2)} />
                                                                <Tab label={<div style={{ color: "white" }}>Curl</div>} {...a11yProps(2)} />

                                                            </Tabs>
                                                        </Box>
                                                        <CustomTabPanel value={valueTab2} index={0}>
                                                            <SyntaxHighlighter language={"csharp"} style={solarizedlight} >
                                                                {
                                                                    `
OkHttpClient client = new OkHttpClient().newBuilder()
.build();
MediaType mediaType = MediaType.parse("application/x-www-form-urlencoded");
RequestBody body = RequestBody.create(
        mediaType, 
        "Firstname=Test
        &Lastname=Test&dob=2002-05-31
        &email=Test@gmail.com
        &phone=741*****20
        &ID_country=South Africa
        &ID_type=Passport
        &ID_Number=A09631611
        &ID_Image_front=https://sample.com/api/images/1727699334381_passport.jpeg.png
        &ID_Image_Back=https://sample.com/api/images/1727699334381_passport.jpeg.png
        &SuccessUrl=https://sample.com/success
        &FailureUrl=https://sample.com/failure");
Request request = new Request.Builder()
.url("${consts.BackendUrl}/VerifyKYC")
.method("POST", body)
.addHeader("Apikey", "APIKEY")
.addHeader("Content-Type", "application/x-www-form-urlencoded")
.build();
Response response = client.newCall(request).execute();
                                                        `}
                                                            </SyntaxHighlighter>
                                                            {/* <pre>
                                                    <code>
                                                       
                                                    </code>
                                                </pre> */}
                                                        </CustomTabPanel>
                                                        <CustomTabPanel value={valueTab2} index={1}>
                                                            <SyntaxHighlighter language={"python"} style={solarizedlight} >
                                                                {
                                                                    `
import requests

url = "${consts.BackendUrl}/VerifyKYC"

payload = 'Firstname=Test
            &Lastname=Test
            &dob=2002-05-31
            &email=Test@gmail.com
            &phone=741*****20
            &ID_country=South%20Africa
            &ID_type=Passport
            &ID_Number=A09631611
            &ID_Image_front=https://sample.com/api/images/1727163599909_passport.jpg
            &ID_Image_Back=https://sample.com/api/images/1727163599909_passport.jpg
            &SuccessUrl=https://sample.com/success
            &FailureUrl=https://sample.com/failure'
headers = {
'Apikey': 'APIKEY',
'Content-Type': 'application/x-www-form-urlencoded'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
                                                       `
                                                                }

                                                            </SyntaxHighlighter>

                                                            {/* <pre>
                                                    <code>

                                                       
                                                    </code>

                                                </pre> */}
                                                        </CustomTabPanel>
                                                        <CustomTabPanel value={valueTab2} index={2}>
                                                            <SyntaxHighlighter language={"javascript"} style={solarizedlight} >
                                                                {
                                                                    `
const axios = require('axios');
const qs = require('qs');
let data = qs.stringify({
  'Firstname': 'Test',
  'Lastname': 'Test',
  'dob': '2002-05-31',
  'email': 'Test@gmail.com',
  'phone': '741*****20',
  'ID_country': 'South Africa',
  'ID_type': 'Passport',
  'ID_Number': 'A09631611',
  'ID_Image_front': 'https://sample.com/api/images/1727699334381_passport.jpeg.png',
  'ID_Image_Back': 'https://sample.com/api/images/1727699334381_passport.jpeg.png',
  'SuccessUrl': 'https://sample.com/success',
  'FailureUrl': 'https://sample.com//failure' 
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: '${consts.BackendUrl}/VerifyKYC',
  headers: { 
    'Apikey': 'APIKEY', 
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
`
                                                                }
                                                            </SyntaxHighlighter>
                                                        </CustomTabPanel>
                                                        <CustomTabPanel value={valueTab2} index={3}>
                                                            <SyntaxHighlighter language={"bash"} style={solarizedlight} >
                                                                {
                                                                    `
curl --location '${consts.BackendUrl}/VerifyKYC' \ 
--header 'Apikey: APIKEY' \ 
--header 'Content-Type: application/x-www-form-urlencoded' \ 
--data-urlencode 'Firstname=Test' \ 
--data-urlencode 'Lastname=Test' \ 
--data-urlencode 'dob=2002-05-31' \ 
--data-urlencode 'email=Test@gmail.com' \ 
--data-urlencode 'phone=741*****20' \ 
--data-urlencode 'ID_country=South Africa' \ 
--data-urlencode 'ID_type=Passport' \ 
--data-urlencode 'ID_Number=A09631611' \ 
--data-urlencode 'ID_Image_front=https://sample.com/api/images/1727699334381_passport.jpeg.png' \ 
--data-urlencode 'ID_Image_Back=https://sample.com/api/images/1727699334381_passport.jpeg.png' \ 
--data-urlencode 'SuccessUrl=https://sample.com/success' \ 
--data-urlencode 'FailureUrl=https://sample.com//failure' 
`
                                                                }
                                                            </SyntaxHighlighter>
                                                        </CustomTabPanel>
                                                    </Box>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </TabPanel>

                            <TabPanel value={value} index={1} className='tb1 x2'>
                                <Grid item container spacing={2}>
                                    <Grid item xs={12} sm={12} md={4} lg={6} xl={7}>
                                        <h2> Check Kyc is Verified Or Not</h2>

                                        {/* <p>Create Kyc</p> */}
                                        <ul style={{ paddingLeft: "20px" }} >
                                            <li>Base URL:  {consts.BackendUrl}</li>
                                            <li>POST : /checkVerification</li>
                                        </ul>

                                        {/* <div>
                                    The following steps show you how to install the AWS Command Line Interface (AWS CLI) and AWS SDKs that the examples in this documentation use. There are a number of different ways to authenticate AWS SDK calls. The examples in this guide assume that you're using a default credentials profile for calling AWS CLI commands and AWS SDK API operations.
                                </div> */}

                                        <div>Input Parameters:</div>
                                        <TableContainer component={Paper} className='margin-top'>
                                            <Table sx={{ minWidth: 650 }} aria-label="caption table" className='padding-10'>

                                                <TableHead className='apidoc-table'>
                                                    <TableRow>
                                                        <TableCell>KEY</TableCell>
                                                        <TableCell >DESCRIPTION</TableCell>

                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>id</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>Unique ID of the Create KYC response</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>

                                        <div>Success Response:</div>
                                        <TableContainer component={Paper} className='margin-top'>
                                            <Table sx={{ minWidth: 650 }} aria-label="caption table" className='padding-10'>

                                                <TableHead className='apidoc-table'>
                                                    <TableRow>
                                                        <TableCell>KEY</TableCell>
                                                        <TableCell >DESCRIPTION</TableCell>

                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>success</div>
                                                            <div>Boolean</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>Api call status</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>

                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>result</div>
                                                            <div>Object</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>kyc details</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>

                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>message</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>Status of the KYC Verified or Not Verified</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>

                                        {/* <h4>To set up the AWS CLI and the AWS SDKs</h4>
                                <ol>
                                    <li>
                                        Download and install the AWS CLI and the AWS SDKs that you want to use. This guide provides examples for the AWS CLI, Java, Python, Ruby, Node.js, PHP, .NET, and JavaScript. For information about installing AWS SDKs, see Tools for Amazon Web Services.
                                    </li>
                                    <li>
                                        Create an access key for the user you created in Create an AWS Account and User.
                                        <ul>
                                            <li>
                                                Sign in to the AWS Management Console and open the IAM console at https://console.aws.amazon.com/iam/.

                                            </li>
                                            <li>
                                                In the navigation pane, choose Users.
                                            </li>
                                            <li>
                                                Choose the name of the user you created in Create an AWS Account and User.

                                            </li>
                                            <li>
                                                Choose the Security credentials tab.
                                            </li>
                                            <li>
                                                Choose Create access key. Then choose Download .csv file to save the access key ID and secret access key to a CSV file on your computer. Store the file in a secure location. You will not have access to the secret access key again after this dialog box closes. After you have downloaded the CSV file, choose Close.
                                            </li>
                                        </ul>

                                    </li>
                                    <li>
                                        If you have installed the AWS CLI, you can configure the credentials and region for most AWS SDKs by entering aws configure at the command prompt. Otherwise, use the following instructions.
                                    </li>
                                    <li>

                                        On your computer, navigate to your home directory, and create an .aws directory. On Unix-based systems, such as Linux or macOS, this is in the following location:
                                    </li>
                                </ol> */}
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8} lg={6} xl={5}>
                                        <div class="container">
                                            <div class="window">
                                                <div class="window-title">
                                                    <p>Console Window</p>
                                                    <div class="window-buttons">
                                                        <div class="window-button fullscreen"></div>
                                                        <div class="window-button reduce"></div>
                                                        <div class="window-button cloose"></div>
                                                        <div className="text-right display-1" style={{ margin: '5px' }}>
                                                            <button class="btn-copy" onClick={copyToClipboard} >
                                                                <span
                                                                    data-text-end="Copied!"
                                                                    data-text-initial="Copy to clipboard"
                                                                    class="cp-tooltip"
                                                                ></span>
                                                                <span>
                                                                    <svg
                                                                        xmlSpace="preserve"
                                                                        style={{ enableBackground: 'new 0 0 512 512' }}
                                                                        viewBox="0 0 6.35 6.35"
                                                                        y="0"
                                                                        x="0"
                                                                        height="20"
                                                                        width="20"
                                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                        version="1.1"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        class="cp-clipboard"
                                                                    >
                                                                        <g>
                                                                            <path
                                                                                fill="currentColor"
                                                                                d="M2.43.265c-.3 0-.548.236-.573.53h-.328a.74.74 0 0 0-.735.734v3.822a.74.74 0 0 0 .735.734H4.82a.74.74 0 0 0 .735-.734V1.529a.74.74 0 0 0-.735-.735h-.328a.58.58 0 0 0-.573-.53zm0 .529h1.49c.032 0 .049.017.049.049v.431c0 .032-.017.049-.049.049H2.43c-.032 0-.05-.017-.05-.049V.843c0-.032.018-.05.05-.05zm-.901.53h.328c.026.292.274.528.573.528h1.49a.58.58 0 0 0 .573-.529h.328a.2.2 0 0 1 .206.206v3.822a.2.2 0 0 1-.206.205H1.53a.2.2 0 0 1-.206-.205V1.529a.2.2 0 0 1 .206-.206z"
                                                                            ></path>
                                                                        </g>
                                                                    </svg>
                                                                    <svg
                                                                        xmlSpace="preserve"
                                                                        style={{ enableBackground: 'new 0 0 512 512' }}
                                                                        viewBox="0 0 24 24"
                                                                        y="0"
                                                                        x="0"
                                                                        height="18"
                                                                        width="18"
                                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                        version="1.1"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        class="cp-check-mark"
                                                                    >
                                                                        <g>
                                                                            <path
                                                                                data-original="#000000"
                                                                                fill="currentColor"
                                                                                d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                                                                            ></path>
                                                                        </g>
                                                                    </svg>
                                                                </span>
                                                            </button>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div class="console">
                                                    <Box sx={{ width: '100%' }}>
                                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                            <Tabs value={valueTab2} onChange={handleChangeTab2} aria-label="basic tabs example">
                                                                {/* <Tab label={<img width="35" height="35" src="https://img.icons8.com/color/35/c-plus-plus-logo.png" alt="c-plus-plus-logo" />} {...a11yProps(0)} /> */}
                                                                <Tab label={<img width="35" height="35" src="https://img.icons8.com/color/35/java-coffee-cup-logo--v1.png" alt="java-coffee-cup-logo--v1" />} {...a11yProps(0)} />
                                                                <Tab label={<img width="35" height="35" src="https://img.icons8.com/color/35/python--v1.png" alt="python--v1" />} {...a11yProps(1)} />
                                                                <Tab label={<img width="35" height="35" src="https://img.icons8.com/color/240/javascript.png" alt="javascript" />} {...a11yProps(2)} />
                                                                <Tab label={<div style={{ color: "white" }}>Curl</div>} {...a11yProps(2)} />

                                                            </Tabs>
                                                        </Box>
                                                        <CustomTabPanel value={valueTab2} index={0}>
                                                            <SyntaxHighlighter language={"csharp"} style={solarizedlight} >
                                                                {
                                                                    `
OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/x-www-form-urlencoded");
RequestBody body = RequestBody.create(mediaType, "id=66fe9c5dcd5bb729842df44d");
Request request = new Request.Builder()
  .url("${consts.BackendUrl}/checkVerification")
  .method("POST", body)
  .addHeader("Apikey", "APIKEY")
  .addHeader("Content-Type", "application/x-www-form-urlencoded")
  .build();
Response response = client.newCall(request).execute();
                                                        `}
                                                            </SyntaxHighlighter>
                                                            {/* <pre>
                                                    <code>
                                                       
                                                    </code>
                                                </pre> */}
                                                        </CustomTabPanel>
                                                        <CustomTabPanel value={valueTab2} index={1}>
                                                            <SyntaxHighlighter language={"python"} style={solarizedlight} >
                                                                {
                                                                    `
import requests

url = "${consts.BackendUrl}/checkVerification"

payload = 'id=66fe9c5dcd5bb729842df44d'
headers = {
  'Apikey': 'APIKEY',
  'Content-Type': 'application/x-www-form-urlencoded'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)

                                                       `
                                                                }

                                                            </SyntaxHighlighter>

                                                            {/* <pre>
                                                    <code>

                                                       
                                                    </code>

                                                </pre> */}
                                                        </CustomTabPanel>
                                                        <CustomTabPanel value={valueTab2} index={2}>
                                                            <SyntaxHighlighter language={"javascript"} style={solarizedlight} >
                                                                {
                                                                    `
const axios = require('axios');
const qs = require('qs');
let data = qs.stringify({
  'id': '66fe9c5dcd5bb729842df44d' 
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: '${consts.BackendUrl}/checkVerification',
  headers: { 
    'Apikey': 'APIKEY', 
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

`
                                                                }
                                                            </SyntaxHighlighter>
                                                        </CustomTabPanel>
                                                        <CustomTabPanel value={valueTab2} index={3}>
                                                            <SyntaxHighlighter language={"bash"} style={solarizedlight} >
                                                                {
                                                                    `
curl --location '${consts.BackendUrl}/checkVerification' \ 
--header 'Apikey: APIKEY' \ 
--header 'Content-Type: application/x-www-form-urlencoded' \ 
--data-urlencode 'id=66fe9c5dcd5bb729842df44d' 
`
                                                                }
                                                            </SyntaxHighlighter>
                                                        </CustomTabPanel>
                                                    </Box>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </TabPanel>

                            <TabPanel value={value} index={2} className='tb1 x2'>
                                <Grid item container spacing={2}>
                                    <Grid item xs={12} sm={12} md={4} lg={6} xl={7}>
                                        <h2> Get All Kyc Details</h2>

                                        {/* <p>Create Kyc</p> */}
                                        <ul style={{ paddingLeft: "20px" }} >
                                            <li>Base URL:  {consts.BackendUrl}</li>
                                            <li>GET : /GetKYCDetails</li>
                                        </ul>

                                        {/* <div>
                                    The following steps show you how to install the AWS Command Line Interface (AWS CLI) and AWS SDKs that the examples in this documentation use. There are a number of different ways to authenticate AWS SDK calls. The examples in this guide assume that you're using a default credentials profile for calling AWS CLI commands and AWS SDK API operations.
                                </div> */}


                                        <div>Input Parameters:</div>
                                        <TableContainer component={Paper} className='margin-top'>
                                            <Table sx={{ minWidth: 650 }} aria-label="caption table" className='padding-10'>

                                                <TableHead className='apidoc-table'>
                                                    <TableRow>
                                                        <TableCell>KEY</TableCell>
                                                        <TableCell >DESCRIPTION</TableCell>

                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>id</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>ID Card Number (optional) </div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>

                                        <div>Success Response:</div>
                                        <TableContainer component={Paper} className='margin-top'>
                                            <Table sx={{ minWidth: 650 }} aria-label="caption table" className='padding-10'>

                                                <TableHead className='apidoc-table'>
                                                    <TableRow>
                                                        <TableCell>KEY</TableCell>
                                                        <TableCell >DESCRIPTION</TableCell>

                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>success</div>
                                                            <div>Boolean</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>Api call status</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>

                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>result</div>
                                                            <div>Array</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>kyc details List</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>

                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>message</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>Return Message</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8} lg={6} xl={5}>
                                        <div class="container">
                                            <div class="window">
                                                <div class="window-title">
                                                    <p>Console Window</p>
                                                    <div class="window-buttons">
                                                        <div class="window-button fullscreen"></div>
                                                        <div class="window-button reduce"></div>
                                                        <div class="window-button cloose"></div>
                                                        <div className="text-right display-1" style={{ margin: '5px' }}>
                                                            <button class="btn-copy" onClick={copyToClipboard} >
                                                                <span
                                                                    data-text-end="Copied!"
                                                                    data-text-initial="Copy to clipboard"
                                                                    class="cp-tooltip"
                                                                ></span>
                                                                <span>
                                                                    <svg
                                                                        xmlSpace="preserve"
                                                                        style={{ enableBackground: 'new 0 0 512 512' }}
                                                                        viewBox="0 0 6.35 6.35"
                                                                        y="0"
                                                                        x="0"
                                                                        height="20"
                                                                        width="20"
                                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                        version="1.1"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        class="cp-clipboard"
                                                                    >
                                                                        <g>
                                                                            <path
                                                                                fill="currentColor"
                                                                                d="M2.43.265c-.3 0-.548.236-.573.53h-.328a.74.74 0 0 0-.735.734v3.822a.74.74 0 0 0 .735.734H4.82a.74.74 0 0 0 .735-.734V1.529a.74.74 0 0 0-.735-.735h-.328a.58.58 0 0 0-.573-.53zm0 .529h1.49c.032 0 .049.017.049.049v.431c0 .032-.017.049-.049.049H2.43c-.032 0-.05-.017-.05-.049V.843c0-.032.018-.05.05-.05zm-.901.53h.328c.026.292.274.528.573.528h1.49a.58.58 0 0 0 .573-.529h.328a.2.2 0 0 1 .206.206v3.822a.2.2 0 0 1-.206.205H1.53a.2.2 0 0 1-.206-.205V1.529a.2.2 0 0 1 .206-.206z"
                                                                            ></path>
                                                                        </g>
                                                                    </svg>
                                                                    <svg
                                                                        xmlSpace="preserve"
                                                                        style={{ enableBackground: 'new 0 0 512 512' }}
                                                                        viewBox="0 0 24 24"
                                                                        y="0"
                                                                        x="0"
                                                                        height="18"
                                                                        width="18"
                                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                        version="1.1"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        class="cp-check-mark"
                                                                    >
                                                                        <g>
                                                                            <path
                                                                                data-original="#000000"
                                                                                fill="currentColor"
                                                                                d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                                                                            ></path>
                                                                        </g>
                                                                    </svg>
                                                                </span>
                                                            </button>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div class="console">
                                                    <Box sx={{ width: '100%' }}>
                                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                            <Tabs value={valueTab2} onChange={handleChangeTab2} aria-label="basic tabs example">
                                                                {/* <Tab label={<img width="35" height="35" src="https://img.icons8.com/color/35/c-plus-plus-logo.png" alt="c-plus-plus-logo" />} {...a11yProps(0)} /> */}
                                                                <Tab label={<img width="35" height="35" src="https://img.icons8.com/color/35/java-coffee-cup-logo--v1.png" alt="java-coffee-cup-logo--v1" />} {...a11yProps(0)} />
                                                                <Tab label={<img width="35" height="35" src="https://img.icons8.com/color/35/python--v1.png" alt="python--v1" />} {...a11yProps(1)} />
                                                                <Tab label={<img width="35" height="35" src="https://img.icons8.com/color/240/javascript.png" alt="javascript" />} {...a11yProps(2)} />
                                                                <Tab label={<div style={{ color: "white" }}>Curl</div>} {...a11yProps(2)} />

                                                            </Tabs>
                                                        </Box>
                                                        <CustomTabPanel value={valueTab2} index={0}>
                                                            <SyntaxHighlighter language={"csharp"} style={solarizedlight} >
                                                                {
                                                                    `
OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("text/plain");
RequestBody body = RequestBody.create(mediaType, "");
Request request = new Request.Builder()
  .url("${consts.BackendUrl}/GetKYCVerifications?id=67d18725cf78cc2a1c27b743")
  .method("GET", body)
  .addHeader("Apikey", "APIKEY")
  .build();
Response response = client.newCall(request).execute();
                                                        `}
                                                            </SyntaxHighlighter>
                                                            {/* <pre>
                                                    <code>
                                                       
                                                    </code>
                                                </pre> */}
                                                        </CustomTabPanel>
                                                        <CustomTabPanel value={valueTab2} index={1}>
                                                            <SyntaxHighlighter language={"python"} style={solarizedlight} >
                                                                {
                                                                    `
import requests

url = "${consts.BackendUrl}/GetKYCVerifications?id=67d18725cf78cc2a1c27b743"

payload = {}
headers = {
  'Apikey': 'APIKEY'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)


                                                       `
                                                                }

                                                            </SyntaxHighlighter>

                                                            {/* <pre>
                                                    <code>

                                                       
                                                    </code>

                                                </pre> */}
                                                        </CustomTabPanel>
                                                        <CustomTabPanel value={valueTab2} index={2}>
                                                            <SyntaxHighlighter language={"javascript"} style={solarizedlight} >
                                                                {
                                                                    `
const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: '${consts.BackendUrl}/GetKYCVerifications?id=67d18725cf78cc2a1c27b743',
  headers: { 
    'Apikey': 'APIKEY'
  }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});


`
                                                                }
                                                            </SyntaxHighlighter>
                                                        </CustomTabPanel>
                                                        <CustomTabPanel value={valueTab2} index={3}>
                                                            <SyntaxHighlighter language={"bash"} style={solarizedlight} >
                                                                {
                                                                    `
curl --location '${consts.BackendUrl}/GetKYCVerifications?id=67d18725cf78cc2a1c27b743' \
--header 'Apikey: APIKEY' \
`
                                                                }
                                                            </SyntaxHighlighter>
                                                        </CustomTabPanel>
                                                    </Box>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </TabPanel>

                            <TabPanel value={value} index={3} className='tb1 x2'>
                                <Grid item container spacing={2}>
                                    <Grid item xs={12} sm={12} md={4} lg={6} xl={7}>
                                        <h2>Address Verification.</h2>

                                        {/* <p>Create Kyc</p> */}
                                        <ul style={{ paddingLeft: "20px" }} >
                                            <li>Base URL:  {consts.BackendUrl}</li>
                                            <li>POST : /addressVerification</li>
                                        </ul>

                                        {/* <div>
                                    The following steps show you how to install the AWS Command Line Interface (AWS CLI) and AWS SDKs that the examples in this documentation use. There are a number of different ways to authenticate AWS SDK calls. The examples in this guide assume that you're using a default credentials profile for calling AWS CLI commands and AWS SDK API operations.
                                </div> */}

                                        <div>Input Parameters:</div>
                                        <TableContainer component={Paper} className='margin-top'>
                                            <Table sx={{ minWidth: 650 }} aria-label="caption table" className='padding-10'>

                                                <TableHead className='apidoc-table'>
                                                    <TableRow>
                                                        <TableCell>KEY</TableCell>
                                                        <TableCell >DESCRIPTION</TableCell>

                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>address_line1</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>Door Number As Per The Document</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>address_line2</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>Address As Per The Document</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>city</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>City As Per The Document</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>stateOrProvince</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>State As Per The Document</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>postalcode</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>Postal Code As Per The Document</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>Country</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>Country As Per The Document</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>address_proof_type</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>Address Proof Type Must Be "Capitec Bank Statement" or "FNB Bank Statement" or "MTN Statement" or "Telkom Statement" </div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>address_proof</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>Address Proof Image as the url Format</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>

                                        <div>Success Response:</div>
                                        <TableContainer component={Paper} className='margin-top'>
                                            <Table sx={{ minWidth: 650 }} aria-label="caption table" className='padding-10'>

                                                <TableHead className='apidoc-table'>
                                                    <TableRow>
                                                        <TableCell>KEY</TableCell>
                                                        <TableCell >DESCRIPTION</TableCell>

                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>success</div>
                                                            <div>Boolean</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>Api call status</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>

                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>result</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>null</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>

                                                    <TableRow >
                                                        <TableCell component="th" scope="row">
                                                            <div>message</div>
                                                            <div>String</div>
                                                        </TableCell>
                                                        <TableCell >
                                                            <div>Return Message</div>
                                                            <div></div>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8} lg={6} xl={5}>
                                        <div class="container">
                                            <div class="window">
                                                <div class="window-title">
                                                    <p>Console Window</p>
                                                    <div class="window-buttons">
                                                        <div class="window-button fullscreen"></div>
                                                        <div class="window-button reduce"></div>
                                                        <div class="window-button cloose"></div>
                                                        <div className="text-right display-1" style={{ margin: '5px' }}>
                                                            <button class="btn-copy" onClick={copyToClipboard} >
                                                                <span
                                                                    data-text-end="Copied!"
                                                                    data-text-initial="Copy to clipboard"
                                                                    class="cp-tooltip"
                                                                ></span>
                                                                <span>
                                                                    <svg
                                                                        xmlSpace="preserve"
                                                                        style={{ enableBackground: 'new 0 0 512 512' }}
                                                                        viewBox="0 0 6.35 6.35"
                                                                        y="0"
                                                                        x="0"
                                                                        height="20"
                                                                        width="20"
                                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                        version="1.1"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        class="cp-clipboard"
                                                                    >
                                                                        <g>
                                                                            <path
                                                                                fill="currentColor"
                                                                                d="M2.43.265c-.3 0-.548.236-.573.53h-.328a.74.74 0 0 0-.735.734v3.822a.74.74 0 0 0 .735.734H4.82a.74.74 0 0 0 .735-.734V1.529a.74.74 0 0 0-.735-.735h-.328a.58.58 0 0 0-.573-.53zm0 .529h1.49c.032 0 .049.017.049.049v.431c0 .032-.017.049-.049.049H2.43c-.032 0-.05-.017-.05-.049V.843c0-.032.018-.05.05-.05zm-.901.53h.328c.026.292.274.528.573.528h1.49a.58.58 0 0 0 .573-.529h.328a.2.2 0 0 1 .206.206v3.822a.2.2 0 0 1-.206.205H1.53a.2.2 0 0 1-.206-.205V1.529a.2.2 0 0 1 .206-.206z"
                                                                            ></path>
                                                                        </g>
                                                                    </svg>
                                                                    <svg
                                                                        xmlSpace="preserve"
                                                                        style={{ enableBackground: 'new 0 0 512 512' }}
                                                                        viewBox="0 0 24 24"
                                                                        y="0"
                                                                        x="0"
                                                                        height="18"
                                                                        width="18"
                                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                        version="1.1"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        class="cp-check-mark"
                                                                    >
                                                                        <g>
                                                                            <path
                                                                                data-original="#000000"
                                                                                fill="currentColor"
                                                                                d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                                                                            ></path>
                                                                        </g>
                                                                    </svg>
                                                                </span>
                                                            </button>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div class="console">
                                                    <Box sx={{ width: '100%' }}>
                                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                            <Tabs value={valueTab2} onChange={handleChangeTab2} aria-label="basic tabs example">
                                                                {/* <Tab label={<img width="35" height="35" src="https://img.icons8.com/color/35/c-plus-plus-logo.png" alt="c-plus-plus-logo" />} {...a11yProps(0)} /> */}
                                                                <Tab label={<img width="35" height="35" src="https://img.icons8.com/color/35/java-coffee-cup-logo--v1.png" alt="java-coffee-cup-logo--v1" />} {...a11yProps(0)} />
                                                                <Tab label={<img width="35" height="35" src="https://img.icons8.com/color/35/python--v1.png" alt="python--v1" />} {...a11yProps(1)} />
                                                                <Tab label={<img width="35" height="35" src="https://img.icons8.com/color/240/javascript.png" alt="javascript" />} {...a11yProps(2)} />
                                                                <Tab label={<div style={{ color: "white" }}>Curl</div>} {...a11yProps(2)} />

                                                            </Tabs>
                                                        </Box>
                                                        <CustomTabPanel value={valueTab2} index={0}>
                                                            <SyntaxHighlighter language={"csharp"} style={solarizedlight} >
                                                                {
                                                                    `
OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/x-www-form-urlencoded");
RequestBody body = RequestBody.create(
            mediaType, 
            "address_line1=56
            &address_line2=Test Address
            &city=Uhmlanga
            &stateOrProvince=KZN
            &postalcode=4319
            &Country=South Africa
            &address_proof=https://sample.com/api/images/addressproof.jpg"
Request request = new Request.Builder()
  .url("${consts.BackendUrl}/addressVerification")
  .method("POST", body)
  .addHeader("apikey", "APIKEY")
  .addHeader("Content-Type", "application/x-www-form-urlencoded")
  .build();
Response response = client.newCall(request).execute();
                                                        `}
                                                            </SyntaxHighlighter>
                                                            {/* <pre>
                                                    <code>
                                                       
                                                    </code>
                                                </pre> */}
                                                        </CustomTabPanel>
                                                        <CustomTabPanel value={valueTab2} index={1}>
                                                            <SyntaxHighlighter language={"python"} style={solarizedlight} >
                                                                {
                                                                    `
import requests

url = "${consts.BackendUrl}/addressVerification"

payload = 'address_line1=56
            &address_line2=Test Address
            &city=Uhmlanga
            &stateOrProvince=KZN
            &postalcode=4319
            &Country=South%20Africa
            &address_proof=https://sample.com/api/images/1727163599909_passport.jpg'
headers = {
'Apikey': 'APIKEY',
'Content-Type': 'application/x-www-form-urlencoded'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
                                                       `
                                                                }

                                                            </SyntaxHighlighter>

                                                            {/* <pre>
                                                    <code>

                                                       
                                                    </code>

                                                </pre> */}
                                                        </CustomTabPanel>
                                                        <CustomTabPanel value={valueTab2} index={2}>
                                                            <SyntaxHighlighter language={"javascript"} style={solarizedlight} >
                                                                {
                                                                    `
const axios = require('axios');
const qs = require('qs');
let data = qs.stringify({
  'address_line1': '56',
  'address_line2': 'Test Address',
  'city': 'Uhmlanga',
  'stateOrProvince': 'KZN',
  'postalcode': '4319',
  'Country': 'South Africa',
  'address_proof': 'https://sample.com/api/images/1727163599909_passport.jpg',
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: '${consts.BackendUrl}/addressVerification',
  headers: { 
    'Apikey': 'APIKEY', 
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
`
                                                                }
                                                            </SyntaxHighlighter>
                                                        </CustomTabPanel>
                                                        <CustomTabPanel value={valueTab2} index={3}>
                                                            <SyntaxHighlighter language={"bash"} style={solarizedlight} >
                                                                {
                                                                    `
curl --location '${consts.BackendUrl}/addressVerification' \
--header 'Apikey: APIKEY' \ 
--header 'Content-Type: application/x-www-form-urlencoded' \ 
--data-urlencode 'address_line1=56' \ 
--data-urlencode 'address_line2=Test Address' \ 
--data-urlencode 'city=Uhmlanga' \ 
--data-urlencode 'stateOrProvince=KZN' \ 
--data-urlencode 'postalcode=4319' \ 
--data-urlencode 'Country=South Africa' \ 
--data-urlencode 'address_proof=https://sample.com/api/images/1727163599909_passport.jpg' \ 
`
                                                                }
                                                            </SyntaxHighlighter>
                                                        </CustomTabPanel>
                                                    </Box>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </TabPanel>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div >
    )
}

export default ApiDoc
