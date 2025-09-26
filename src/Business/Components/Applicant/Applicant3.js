import { Box, Button, Grid } from '@mui/material'
import React, { useState, useRef } from 'react'
import Sidebar from '../SideBar/Sidebar'
import './Applicant.css'
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import adrfrnt from '../../../Images/adrfrnt.png'
import adrfrnt2 from '../../../Images/adrfrnt2.png'
import selfie from '../../../Images/selfie.png'
import face from '../../../Images/face.png'
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Selects from 'react-select';
import 'country-flag-icons/react/3x2';
import ReactCountryFlag from 'react-country-flag';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Layer from '../../../Images/Layer.png'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const style = {
    position: 'absolute',
    top: '50%',
    right: '10px', // Adjust the right position based on visibility
    transform: 'translateY(-50%)',
    width: 500,
    '@media(max-width:767.98px)': {
        width: '95%',
        height: '450px'

    },
    backgroundColor: 'background.paper',
    // border: '2px solid #000',
    // boxShadow: 24,
    borderRadius: '12px',
    height: '650px',
    overflowY: 'scroll',
    padding: 4,

};

const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 480,
    '@media(max-width:575.98px)': {
        width: '95%',


    },
    position: 'relative',
    bgcolor: '#fff',
    // border: '2px solid #000',
    // boxShadow: 24,
    borderRadius: '12px',
    // height: '650px',
    overflowY: 'scroll',
    // boxShadow: '12px 27px 34.6px - 9px rgba(0, 0, 0, 0.10)',
    p: 2,
};



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

const countries = [
    { value: 'IN', label: 'India', icon: 'in' },
    { value: 'GB', label: 'United Kingdom', icon: 'gb' },
    { value: 'CA', label: 'Canada', icon: 'ca' },
    { value: 'FR', label: 'France', icon: 'fr' },
    { value: 'DE', label: 'Germany', icon: 'de' },
    // Add more countries as needed
];

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        display: 'flex',
        alignItems: 'center',
    }),
    singleValue: (provided, state) => ({
        ...provided,
        display: 'flex',
        alignItems: 'center',
    }),
};

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});




function Applicant3() {

    const theme = useTheme();

    const isLgup = useMediaQuery(theme.breakpoints.up('lg'));
    const mobileUp = useMediaQuery(theme.breakpoints.up('sm'));
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));

    const navigate = useNavigate()


    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [age, setAge] = useState(10);

    const [isArr, setIsArr] = useState(false)

    console.log(isArr, 'arr');


    const handleChange2 = (event) => {
        setAge(event.target.value);
        handleArr()

    };

    const handleArr = () => {
        setIsArr(!isArr)
    }

    const [openModel, setOpenModel] = useState(false);
    const handleOpen = () => setOpenModel(true);
    const handleCloseModel = () => { setOpenModel(false); }

    const [openModel2, setOpenModel2] = useState(false);
    const handleOpen2 = () => setOpenModel2(true);
    const handleCloseModel2 = () => { setOpenModel2(false); handleClickSna() }

    const [openModel3, setOpenModel3] = useState(false);
    const handleOpen3 = () => setOpenModel3(true);
    const handleCloseModel3 = () => setOpenModel3(false);

    const [selectedCountry, setSelectedCountry] = useState(null);

    const handleChangeCountry = (selectedOption) => {
        setSelectedCountry(selectedOption);
    };

    const formatOptionLabel = ({ label, icon }) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={`https://flagcdn.com/48x36/${icon}.png`} alt={label} style={{ marginRight: 10, width: '24px' }} />

            {label}
        </div>
    );

    const [imageUrl, setImageUrl] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        console.log(reader, "result of file");

        reader.onloadend = () => {
            setImageUrl(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const CustomArrowIcon = (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M8.18411 9.99853L4.03711 5.85253L4.74511 5.14453L8.89111 9.29153L13.0371 5.14453L13.7451 5.85253L9.59811 9.99853C9.41058 10.186 9.15627 10.2913 8.89111 10.2913C8.62595 10.2913 8.37164 10.186 8.18411 9.99853Z" fill="#373D4D" />
        </svg>

    );

    const [openSna, setOpenSan] = React.useState(false);

    const handleClickSna = () => {
        setOpenSan(true);
    };

    const handleCloseSna = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSan(false);
    };

    const divRef = useRef(null);

    const handleClickRef = () => {
        if (divRef.current) {
            divRef.current.focus();
        }
    };

    return (
        <div className='applicant3'>
            <Box sx={{ display: mobileUp ? 'flex' : 'block' }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 1, marginTop: '64px' }}>
                    <div style={{ position: 'sticky', top: '64px', background: '#fff', zIndex: '999', padding: '15px' }}>
                        <div className="display-1 flexng" style={{ flexFlow: 'wrap', justifyContent: 'flex-end', marginRight: mobileUp && '50px', }}>
                            <div className="bckin cursor">
                                {/* <ArrowBackIcon /> */}
                                <img src={Layer} alt="layer" onClick={(() => { navigate(-1) })} />
                            </div>
                            <div className="display-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
                                    <g clipPath="url(#clip0_90_4528)">
                                        <mask id="mask0_90_4528" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="12">
                                            <path d="M14 0H2C0.89543 0 0 0.89543 0 2V10C0 11.1046 0.89543 12 2 12H14C15.1046 12 16 11.1046 16 10V2C16 0.89543 15.1046 0 14 0Z" fill="white" />
                                        </mask>
                                        <g mask="url(#mask0_90_4528)">
                                            <path d="M14.667 0.167969H1.33366C0.689328 0.167969 0.166992 0.690305 0.166992 1.33464V10.668C0.166992 11.3123 0.689328 11.8347 1.33366 11.8347H14.667C15.3114 11.8347 15.8337 11.3123 15.8337 10.668V1.33464C15.8337 0.690305 15.3114 0.167969 14.667 0.167969Z" fill="white" stroke="#F5F5F5" strokeWidth="0.333333" />
                                            <mask id="mask1_90_4528" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="12">
                                                <path d="M14.667 0.167969H1.33366C0.689328 0.167969 0.166992 0.690305 0.166992 1.33464V10.668C0.166992 11.3123 0.689328 11.8347 1.33366 11.8347H14.667C15.3114 11.8347 15.8337 11.3123 15.8337 10.668V1.33464C15.8337 0.690305 15.3114 0.167969 14.667 0.167969Z" fill="white" stroke="white" strokeWidth="0.333333" />
                                            </mask>
                                            <g mask="url(#mask1_90_4528)">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M0 4H16V0H0V4Z" fill="#FFA44A" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M0 12H16V8H0V12Z" fill="#1A9F0B" />
                                                <path d="M7.99985 7.42257C8.76386 7.42257 9.36493 6.77547 9.36493 6.00034C9.36493 5.22521 8.76386 4.57812 7.99985 4.57812C7.23585 4.57812 6.63477 5.22521 6.63477 6.00034C6.63477 6.77547 7.23585 7.42257 7.99985 7.42257Z" fill="#181A93" fillOpacity="0.15" stroke="#181A93" strokeWidth="0.444444" />
                                                <path d="M8.00009 6.40156C8.21049 6.40156 8.38104 6.22248 8.38104 6.00156C8.38104 5.78065 8.21049 5.60156 8.00009 5.60156C7.7897 5.60156 7.61914 5.78065 7.61914 6.00156C7.61914 6.22248 7.7897 6.40156 8.00009 6.40156Z" fill="#181A93" />
                                            </g>
                                        </g>
                                        <path d="M14.0002 0.199219H2.0002C1.00608 0.199219 0.200195 1.00511 0.200195 1.99922V9.99922C0.200195 10.9933 1.00608 11.7992 2.0002 11.7992H14.0002C14.9943 11.7992 15.8002 10.9933 15.8002 9.99922V1.99922C15.8002 1.00511 14.9943 0.199219 14.0002 0.199219Z" stroke="#C4CAD4" strokeWidth="0.4" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_90_4528">
                                            <rect width="16" height="12" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <div className="display-1">
                                    <div className="id-num">
                                        ID:
                                    </div>
                                    <div className="id-num">
                                        66b20099feb89068d1574da0
                                    </div>
                                </div>
                            </div>
                            •
                            <div className="display-1">
                                <div className="id-num">
                                    External user ID:
                                </div>
                                <div className="id-num">
                                    0123466
                                </div>
                            </div>

                            <Stack
                                direction="row"
                                divider={<Divider orientation="vertical" flexItem />}
                                spacing={2}
                            >
                                <div className="viwedata cursor">View all data</div>
                                <div className="display-1">
                                    <div className="id-num">
                                        Tags:
                                    </div>
                                    <div className="viwedata cursor">Edit</div>
                                    <div className="display-1 svgcur" >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.1902 0.800781C10.4712 0.800718 10.7471 0.874618 10.9904 1.01505C11.2337 1.15548 11.4358 1.3575 11.5762 1.60078H12.3642C12.8102 1.60078 13.0782 1.65278 13.3582 1.80178C13.6282 1.94678 13.8442 2.16278 13.9882 2.43278C14.1202 2.67778 14.1762 2.91278 14.1882 3.26678L14.1902 3.42678V12.5748C14.1902 13.0208 14.1382 13.2888 13.9892 13.5688C13.8442 13.8388 13.6282 14.0548 13.3582 14.1988C13.1132 14.3308 12.8782 14.3868 12.5242 14.3988L12.3642 14.4008H4.81623C4.37023 14.4008 4.10223 14.3488 3.82223 14.1998C3.55413 14.0568 3.33478 13.8371 3.19223 13.5688C3.06023 13.3238 3.00423 13.0888 2.99223 12.7348L2.99023 12.5748V3.42678C2.99023 2.98078 3.04223 2.71278 3.19123 2.43278C3.33623 2.16278 3.55223 1.94678 3.82223 1.80278C4.06723 1.67078 4.30223 1.61478 4.65623 1.60278L4.81623 1.60078H5.60423C5.73319 1.37751 5.9142 1.18871 6.13185 1.05046C6.34949 0.912217 6.59732 0.828616 6.85423 0.806781L6.99023 0.800781H10.1902ZM12.4862 3.20078H11.5762C11.4473 3.42405 11.2663 3.61285 11.0486 3.7511C10.831 3.88935 10.5831 3.97295 10.3262 3.99478L10.1902 4.00078H6.99023C6.70968 4.00087 6.43403 3.92719 6.19094 3.78713C5.94785 3.64707 5.74586 3.44555 5.60523 3.20278H4.65523L4.59523 3.20678L4.59223 3.26478V12.7358L4.59623 12.7948L4.65423 12.7988H12.5262L12.5842 12.7948L12.5892 12.7358V3.26578L12.5842 3.20578L12.4862 3.20078Z" fill="#373D4D" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M8.58988 2.39844C10.5999 2.39844 12.3669 3.40844 13.8799 5.05844C14.5752 5.82089 15.1762 6.66429 15.6699 7.57044L15.8839 7.99844L15.6689 8.42644L15.5769 8.59644C15.1011 9.43846 14.5319 10.2241 13.8799 10.9384C12.3669 12.5884 10.5999 13.5984 8.58988 13.5984C6.57987 13.5984 4.81288 12.5884 3.29988 10.9384C2.60452 10.1764 2.00353 9.33329 1.50987 8.42744L1.29688 7.99844L1.51187 7.57044L1.60388 7.40044C2.07924 6.55841 2.64818 5.77277 3.29988 5.05844C4.81288 3.40844 6.57987 2.39844 8.58988 2.39844ZM8.58988 3.99844C7.09988 3.99844 5.71688 4.78844 4.47988 6.13844C4.04366 6.61695 3.64953 7.13219 3.30187 7.67844L3.22988 7.79244L3.10387 7.99844L3.22988 8.20444L3.30187 8.31744C3.63787 8.84344 4.03188 9.36944 4.47988 9.85744C5.71688 11.2084 7.09988 11.9984 8.58988 11.9984C10.0799 11.9984 11.4629 11.2084 12.6999 9.85844C13.1361 9.37993 13.5302 8.86469 13.8779 8.31844L13.9499 8.20444L14.0749 7.99944L13.9499 7.79244L13.8779 7.67944C13.5302 7.13319 13.1361 6.61795 12.6999 6.13944C11.4629 4.78844 10.0799 3.99844 8.58988 3.99844ZM9.61987 6.77544L9.71988 6.86844L9.81488 6.97044C10.0572 7.25875 10.1901 7.62331 10.1901 7.99994C10.1901 8.37657 10.0572 8.74113 9.81488 9.02944L9.72087 9.13144C9.50115 9.35134 9.22216 9.50252 8.91795 9.56652C8.61375 9.63053 8.29749 9.60458 8.00779 9.49186C7.71808 9.37913 7.46746 9.18451 7.28651 8.93173C7.10556 8.67896 7.00212 8.37897 6.9888 8.06839C6.97549 7.75782 7.05288 7.45008 7.21153 7.18275C7.37018 6.91541 7.60323 6.70005 7.88223 6.56295C8.16122 6.42584 8.4741 6.37293 8.78267 6.41066C9.09123 6.44839 9.38214 6.57514 9.61987 6.77544Z" fill="#373D4D" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M5.78976 4V5.6H5.38976C4.76501 5.59934 4.16464 5.84233 3.71621 6.27731C3.26778 6.7123 3.00663 7.305 2.98828 7.92947C2.96992 8.55394 3.19579 9.16096 3.61789 9.62154C4.03999 10.0821 4.62505 10.36 5.24876 10.396L5.38976 10.4H6.98976C7.30493 10.4 7.61701 10.3379 7.9082 10.2173C8.19938 10.0967 8.46395 9.91992 8.68681 9.69706C8.90967 9.4742 9.08645 9.20962 9.20707 8.91844C9.32768 8.62726 9.38976 8.31517 9.38976 8C9.38967 7.84414 9.37629 7.68858 9.34976 7.535L9.31976 7.393L10.8718 7.007C10.9488 7.317 10.9898 7.667 10.9898 8C10.9897 9.03087 10.5916 10.0219 9.87861 10.7664C9.16559 11.5109 8.19266 11.9514 7.16276 11.996L6.98976 12H5.38976C4.34479 11.9988 3.3418 11.5886 2.59533 10.8574C1.84887 10.1261 1.41821 9.13175 1.39548 8.08703C1.37275 7.0423 1.75974 6.03017 2.47369 5.26712C3.18763 4.50407 4.17183 4.0507 5.21576 4.004L5.38976 4H5.78976ZM11.7898 4C12.8347 4.00125 13.8377 4.41137 14.5842 5.14264C15.3306 5.87391 15.7613 6.86825 15.784 7.91297C15.8068 8.9577 15.4198 9.96983 14.7058 10.7329C13.9919 11.4959 13.0077 11.9493 11.9638 11.996L11.7898 12H11.3898V10.4H11.7898C12.4145 10.4007 13.0149 10.1577 13.4633 9.72269C13.9117 9.2877 14.1729 8.695 14.1912 8.07053C14.2096 7.44606 13.9837 6.83904 13.5616 6.37846C13.1395 5.91788 12.5545 5.64005 11.9308 5.604L11.7898 5.6H10.1898C9.55324 5.6 8.94279 5.85286 8.4927 6.30294C8.04261 6.75303 7.78976 7.36348 7.78976 8C7.78976 8.155 7.80376 8.318 7.82976 8.465L7.85976 8.607L6.30776 8.993C6.2293 8.66783 6.18969 8.3345 6.18976 8C6.18981 6.9693 6.58773 5.97839 7.30054 5.23391C8.01335 4.48943 8.98603 4.04884 10.0158 4.004L10.1898 4H11.7898Z" fill="#373D4D" />
                                        </svg>
                                    </div>
                                </div>
                            </Stack>

                            <div className="display-1">
                                <div className="req">
                                    <Button onClick={handleOpen2}>Request check</Button>
                                </div>
                                <div className="chkman">
                                    <Button onClick={handleOpen3}>Check manually</Button>
                                </div>
                                <div className="resq cursor" onClick={handleClick}>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.01992 12.0008C8.44427 12.0008 8.85123 12.1694 9.15129 12.4694C9.45135 12.7695 9.61992 13.1764 9.61992 13.6008C9.61992 14.0251 9.45135 14.4321 9.15129 14.7322C8.85123 15.0322 8.44427 15.2008 8.01992 15.2008C7.59558 15.2008 7.18861 15.0322 6.88855 14.7322C6.58849 14.4321 6.41992 14.0251 6.41992 13.6008C6.41992 13.1764 6.58849 12.7695 6.88855 12.4694C7.18861 12.1694 7.59558 12.0008 8.01992 12.0008ZM8.01992 6.40078C8.44427 6.40078 8.85123 6.56935 9.15129 6.86941C9.45135 7.16947 9.61992 7.57643 9.61992 8.00078C9.61992 8.42513 9.45135 8.83209 9.15129 9.13215C8.85123 9.43221 8.44427 9.60078 8.01992 9.60078C7.59558 9.60078 7.18861 9.43221 6.88855 9.13215C6.58849 8.83209 6.41992 8.42513 6.41992 8.00078C6.41992 7.57643 6.58849 7.16947 6.88855 6.86941C7.18861 6.56935 7.59558 6.40078 8.01992 6.40078ZM8.01992 0.800781C8.44427 0.800781 8.85123 0.969352 9.15129 1.26941C9.45135 1.56947 9.61992 1.97643 9.61992 2.40078C9.61992 2.82513 9.45135 3.23209 9.15129 3.53215C8.85123 3.83221 8.44427 4.00078 8.01992 4.00078C7.59558 4.00078 7.18861 3.83221 6.88855 3.53215C6.58849 3.23209 6.41992 2.82513 6.41992 2.40078C6.41992 1.97643 6.58849 1.56947 6.88855 1.26941C7.18861 0.969352 7.59558 0.800781 8.01992 0.800781Z" fill="#373D4D" />
                                    </svg>

                                </div>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                >
                                    <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
                                </Popover>
                            </div>
                        </div>
                        <div className="display-2 bhk margin-top" style={{ flexFlow: 'wrap' }}>
                            <div className="appliname">
                                JARRYD PETERS
                            </div>
                            <div className="" style={{ width: !mobileUp && '100%' }}>
                                {/* <Box >
                                    <Box>
                                        <Tabs value={value} onChange={handleChange} className='appli-tab'
                                            variant="scrollable"
                                            scrollButtons
                                            allowScrollButtonsMobile
                                            aria-label="scrollable auto tabs example">
                                            <Tab label="Personal information" {...a11yProps(0)} />
                                            <Tab label="Documents " {...a11yProps(1)} />
                                            <Tab label="Selfie " {...a11yProps(2)} />
                                            <Tab label="Face Match " {...a11yProps(3)} />
                                        </Tabs>
                                    </Box>

                                </Box> */}
                            </div>
                        </div>
                    </div>

                    <div className="margin-top">
                        <div
                            // value={value} index={0} 
                            className='simp'>
                            <div className="display-1" style={{ flexFlow: 'wrap' }}>
                                <div className="applstas">
                                    Applicant status:
                                </div>
                                <div className="docsreq display-1">
                                    •
                                    <div className="">
                                        Documents requested
                                    </div>
                                    <div className="">
                                        (Took a few seconds)
                                    </div>
                                </div>
                            </div>
                            <Grid container>
                                <Grid xs={12} sx={12} md={12} lg={12} xl={2}>
                                    <div className="prfsumer-mian text-left">
                                        Profile
                                        <div className="display-1 margin-top">
                                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="8" height="8" rx="4" fill="#F5222D" />
                                            </svg>

                                            <div className="smy">Summary</div>
                                            <div className="viwedata cursor">View all </div>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid xs={12} sx={12} md={12} lg={12} xl={9}>
                                    <div className="prfsumer-mian text-left" >
                                        <div className="display-1">
                                            <div className="lvl1">
                                                Level:
                                            </div>
                                            <div className="k-y-l">
                                                basic-kyc-level
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                                <mask id="mask0_90_4502" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="17" height="16">
                                                    <path d="M0.94043 0H16.9404V16H0.94043V0Z" fill="white" />
                                                </mask>
                                                <g mask="url(#mask0_90_4502)">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.5896 1.58097C12.0767 1.08612 12.7376 0.800826 13.4318 0.785783C14.126 0.77074 14.7987 1.02713 15.3067 1.50042C15.8148 1.97371 16.1182 2.62654 16.1523 3.32006C16.1865 4.01359 15.9487 4.69306 15.4896 5.21397L15.3596 5.35197L6.70857 14.004C6.5302 14.1823 6.31525 14.3198 6.07857 14.407L5.93457 14.453L3.35757 15.156C3.151 15.2122 2.93361 15.2158 2.72531 15.1663C2.51701 15.1168 2.32445 15.0158 2.16526 14.8727C2.00608 14.7295 1.88534 14.5487 1.81412 14.3468C1.74289 14.1449 1.72345 13.9283 1.75757 13.717L1.78557 13.584L2.48857 11.007C2.55457 10.763 2.67357 10.537 2.83557 10.345L2.93757 10.233L11.5896 1.58097ZM10.2336 5.24697L4.09257 11.39L4.07457 11.412L4.06457 11.438L3.52457 13.417L5.51657 12.873L5.55157 12.849L11.6926 6.70597L10.2336 5.24697ZM13.6206 2.44697C13.3406 2.40697 13.0566 2.48297 12.8346 2.65697L12.7446 2.73897L11.5446 3.93797L13.0026 5.39797L14.2026 4.19797C14.4346 3.96597 14.5406 3.63997 14.4946 3.32097L14.4706 3.20097C14.4289 3.04588 14.3516 2.90266 14.2448 2.7827C14.1381 2.66274 14.0048 2.56936 13.8556 2.50997L13.7406 2.47197L13.6206 2.44697Z" fill="#373D4D" />
                                                </g>
                                            </svg>
                                        </div>


                                        <div className="display-1 margin-top" style={{ flexDirection: !mobileUp && 'column', alignItems: !mobileUp && 'flex-start' }}>
                                            <div className="">
                                                <div className="display-1">
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M13.3738 2.39844C13.8198 2.39844 14.0878 2.45044 14.3678 2.59944C14.6378 2.74444 14.8538 2.96044 14.9978 3.23044C15.1298 3.47544 15.1858 3.71044 15.1978 4.06444L15.1998 4.22444V11.7724C15.1998 12.2184 15.1478 12.4864 14.9988 12.7664C14.8538 13.0364 14.6378 13.2524 14.3678 13.3964C14.1228 13.5284 13.8878 13.5844 13.5338 13.5964L13.3738 13.5984H2.6258C2.1798 13.5984 1.9118 13.5464 1.6318 13.3974C1.3637 13.2545 1.14435 13.0348 1.0018 12.7664C0.869805 12.5214 0.813805 12.2864 0.801805 11.9324L0.799805 11.7724V4.22444C0.799805 3.77844 0.851805 3.51044 1.0008 3.23044C1.1458 2.96044 1.3618 2.74444 1.6318 2.60044C1.8768 2.46844 2.1118 2.41244 2.4658 2.40044L2.6258 2.39844H13.3738ZM13.4958 3.99844L2.4638 4.00044L2.4058 4.00444L2.4018 4.06244V11.9344L2.4058 11.9924L2.4638 11.9964H13.5358L13.5938 11.9924L13.5978 11.9344V4.06244L13.5938 4.00444L13.4958 3.99844ZM5.9998 8.39844C6.53024 8.39844 7.03895 8.60915 7.41402 8.98422C7.78909 9.3593 7.9998 9.868 7.9998 10.3984V10.7984H3.9998V10.3984C3.9998 9.868 4.21052 9.3593 4.58559 8.98422C4.96066 8.60915 5.46937 8.39844 5.9998 8.39844ZM5.9998 5.19844C6.15739 5.19844 6.31343 5.22948 6.45902 5.28978C6.60462 5.35009 6.7369 5.43848 6.84833 5.54991C6.95976 5.66134 7.04815 5.79363 7.10846 5.93922C7.16877 6.08481 7.1998 6.24085 7.1998 6.39844C7.1998 6.55602 7.16877 6.71207 7.10846 6.85766C7.04815 7.00325 6.95976 7.13554 6.84833 7.24697C6.7369 7.3584 6.60462 7.44679 6.45902 7.50709C6.31343 7.5674 6.15739 7.59844 5.9998 7.59844C5.68154 7.59844 5.37632 7.47201 5.15128 7.24697C4.92623 7.02192 4.7998 6.7167 4.7998 6.39844C4.7998 6.08018 4.92623 5.77495 5.15128 5.54991C5.37632 5.32487 5.68154 5.19844 5.9998 5.19844Z" fill="#212736" />
                                                    </svg>
                                                    <div className="iddoc">Identity document</div>
                                                </div>
                                                <div className="display-1">
                                                    <div className="yellow"></div>
                                                    <div className="k-y-l">Passport</div>
                                                </div>
                                            </div>
                                            <div className="display-1" style={{ marginTop: mobileUp && '-25px' }}>
                                                <svg width="41" height="2" viewBox="0 0 41 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <mask id="path-1-inside-1_90_4514" fill="white">
                                                        <path d="M0.700195 0.5H40.7002V1.5H0.700195V0.5Z" />
                                                    </mask>
                                                    <path d="M40.7002 0H39.2002V1H40.7002V0ZM37.2002 0H34.2002V1H37.2002V0ZM32.2002 0H29.2002V1H32.2002V0ZM27.2002 0H24.2002V1H27.2002V0ZM22.2002 0H19.2002V1H22.2002V0ZM17.2002 0H14.2002V1H17.2002V0ZM12.2002 0H9.20019V1H12.2002V0ZM7.2002 0H4.20019V1H7.2002V0ZM2.2002 0H0.700195V1H2.2002V0ZM40.7002 -0.5H39.2002V1.5H40.7002V-0.5ZM37.2002 -0.5H34.2002V1.5H37.2002V-0.5ZM32.2002 -0.5H29.2002V1.5H32.2002V-0.5ZM27.2002 -0.5H24.2002V1.5H27.2002V-0.5ZM22.2002 -0.5H19.2002V1.5H22.2002V-0.5ZM17.2002 -0.5H14.2002V1.5H17.2002V-0.5ZM12.2002 -0.5H9.20019V1.5H12.2002V-0.5ZM7.2002 -0.5H4.20019V1.5H7.2002V-0.5ZM2.2002 -0.5H0.700195V1.5H2.2002V-0.5Z" fill="#7D8799" mask="url(#path-1-inside-1_90_4514)" />
                                                </svg>
                                            </div>

                                            <div className="">
                                                <div className="display-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M15.0998 9.86856V12.8016C15.0999 13.2052 14.9475 13.594 14.673 13.89C14.3985 14.186 14.0223 14.3673 13.6198 14.3976L13.4998 14.4016H11.0998V12.8016H13.4998V9.86856H15.0998ZM3.8998 10.6146V12.8016H6.2998V14.4016H3.8998C3.49614 14.4017 3.10735 14.2492 2.81137 13.9748C2.51538 13.7003 2.33408 13.3241 2.3038 12.9216L2.2998 12.8016V10.6146H3.8998ZM9.4998 8.00156C10.1363 8.00156 10.7468 8.25442 11.1969 8.70451C11.6469 9.15459 11.8998 9.76504 11.8998 10.4016V11.2016H5.4998V10.4016C5.4998 9.76504 5.75266 9.15459 6.20275 8.70451C6.65284 8.25442 7.26329 8.00156 7.8998 8.00156H9.4998ZM8.6998 4.00156C9.12415 4.00156 9.53112 4.17013 9.83118 4.47019C10.1312 4.77025 10.2998 5.17722 10.2998 5.60156C10.2998 6.02591 10.1312 6.43288 9.83118 6.73293C9.53112 7.03299 9.12415 7.20156 8.6998 7.20156C8.27546 7.20156 7.86849 7.03299 7.56843 6.73293C7.26838 6.43288 7.0998 6.02591 7.0998 5.60156C7.0998 5.17722 7.26838 4.77025 7.56843 4.47019C7.86849 4.17013 8.27546 4.00156 8.6998 4.00156ZM13.4998 1.60156C13.9035 1.60143 14.2923 1.75389 14.5882 2.02836C14.8842 2.30283 15.0655 2.67904 15.0958 3.08156L15.0998 3.20156V5.60156H13.4998V3.20156H11.0998V1.60156H13.4998ZM6.2998 1.60156V3.20156H3.8998V5.60156H2.2998V3.20156C2.29968 2.7979 2.45213 2.40911 2.7266 2.11312C3.00107 1.81714 3.37728 1.63584 3.7798 1.60556L3.8998 1.60156H6.2998Z" fill="#212736" />
                                                    </svg>
                                                    <div className="iddoc">
                                                        Selfie
                                                    </div>
                                                </div>
                                                <div className="display-1">
                                                    {/* <div className="yellow"></div> */}
                                                    <div className="k-y-l">Selfie</div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                            <div className="margin-top display-1" style={{ flexFlow: 'wrap' }}>


                            </div>
                            <div className="display-1 margin-top">
                                <div className="applstas">
                                    Personal information
                                </div>
                                <div className="exteddata">
                                    <Button>
                                        Extracted data
                                    </Button>

                                </div>
                            </div>
                            <div className="margin-top prinfo">
                                <div className="inner-prf">
                                    <div className="display-2" style={{ flexFlow: 'wrap', flexDirection: !mobileUp && 'column', alignItems: !mobileUp && 'flex-start' }}>
                                        <div className="">
                                            <div className="inerpf2">
                                                <div className="frtnme">
                                                    First name
                                                </div>
                                                <div className="nme">
                                                    Gowtham<span className='aprnme'>(Gowtham)</span>
                                                </div>
                                            </div>
                                            <div className="inerpf2">
                                                <div className="frtnme">
                                                    Last name
                                                </div>
                                                <div className="nme">
                                                    M<span className='aprnme'>(M)</span>
                                                </div>
                                            </div>
                                            <div className="inerpf2">
                                                <div className="frtnme">
                                                    Middle name
                                                </div>
                                                <div className="nme">
                                                    -
                                                </div>
                                            </div>
                                        </div>
                                        <div className={mdUp && "brleft"}>
                                            <div className="inerpf2">
                                                <div className="frtnme">
                                                    Date of birth
                                                </div>
                                                <div className="nme">
                                                    {/* Gowtham<span className='aprnme'>(Gowtham)</span> */}
                                                    -
                                                </div>
                                            </div>
                                            <div className="inerpf2">
                                                <div className="frtnme">
                                                    Country
                                                </div>
                                                <div className="nme">
                                                    {/* M<span className='aprnme'>(M)</span> */}
                                                    india
                                                </div>
                                            </div>
                                            <div className="inerpf2">
                                                <div className="frtnme">
                                                    Country of birth
                                                </div>
                                                <div className="nme">
                                                    -
                                                </div>
                                            </div>
                                        </div>
                                        <div className={mdUp && "brleft"}>
                                            <div className="inerpf2">
                                                <div className="frtnme">
                                                    State of birth
                                                </div>
                                                <div className="nme">
                                                    {/* Gowtham<span className='aprnme'>(Gowtham)</span> */}
                                                    -
                                                </div>
                                            </div>
                                            <div className="inerpf2">
                                                <div className="frtnme">
                                                    Place of birth
                                                </div>
                                                <div className="nme">
                                                    {/* M<span className='aprnme'>(M)</span> */}
                                                    -
                                                </div>
                                            </div>
                                            <div className="inerpf2">
                                                <div className="frtnme">
                                                    Phone
                                                </div>
                                                <div className="nme">
                                                    -
                                                </div>
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className="inerpf2">
                                                <div className="frtnme">
                                                    PAN
                                                </div>
                                                <div className="nme">
                                                    {/* Gowtham<span className='aprnme'>(Gowtham)</span> */}
                                                    -
                                                </div>
                                            </div>
                                            <div className="inerpf2">
                                                <div className="frtnme">
                                                    Gender
                                                </div>
                                                <div className="nme">
                                                    {/* M<span className='aprnme'>(M)</span> */}
                                                    -
                                                </div>
                                            </div>
                                            <div className="inerpf2">
                                                <div className="frtnme">
                                                    Nationality
                                                </div>
                                                <div className="nme">
                                                    -
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="margin-top display-2 cursor">
                                <div className="applstas">
                                    Documents
                                </div>
                                <Button
                                    component="label"
                                    role={undefined}
                                    // variant="contained"
                                    tabIndex={-1}
                                    sx={{ display: 'flex', justifyContent: 'flex-start', padding: '0px', textTransform: 'capitalize' }}
                                // startIcon={<CloudUploadIcon />}
                                >
                                    <div className="upldnewdata display-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                            <path d="M7.56055 8.75V14H9.06055V8.75H14.3105V7.25H9.06055V2H7.56055V7.25H2.31055V8.75H7.56055Z" fill="#373D4D" />
                                        </svg>
                                        <div>
                                            Upload new Document
                                        </div>

                                    </div>
                                    <VisuallyHiddenInput type="file" onChange={handleImageUpload} />
                                </Button>
                            </div>

                            <div className="margin-top display-1 stus">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" fill="#25B793" />
                                    <path d="M5 8L7 10L11 6" fill="#212736" />
                                    <path d="M5 8L7 10L11 6" stroke="white" stroke-width="1.5" />
                                </svg>
                                <div className="nme">
                                    ID card <span className='aprnme'>(South Africa)</span>
                                </div>
                                <div className="dot3 cursor" onClick={handleClick}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.55117 12.0008C8.97552 12.0008 9.38248 12.1694 9.68254 12.4694C9.9826 12.7695 10.1512 13.1764 10.1512 13.6008C10.1512 14.0251 9.9826 14.4321 9.68254 14.7322C9.38248 15.0322 8.97552 15.2008 8.55117 15.2008C8.12683 15.2008 7.71986 15.0322 7.4198 14.7322C7.11974 14.4321 6.95117 14.0251 6.95117 13.6008C6.95117 13.1764 7.11974 12.7695 7.4198 12.4694C7.71986 12.1694 8.12683 12.0008 8.55117 12.0008ZM8.55117 6.40078C8.97552 6.40078 9.38248 6.56935 9.68254 6.86941C9.9826 7.16947 10.1512 7.57643 10.1512 8.00078C10.1512 8.42513 9.9826 8.83209 9.68254 9.13215C9.38248 9.43221 8.97552 9.60078 8.55117 9.60078C8.12683 9.60078 7.71986 9.43221 7.4198 9.13215C7.11974 8.83209 6.95117 8.42513 6.95117 8.00078C6.95117 7.57643 7.11974 7.16947 7.4198 6.86941C7.71986 6.56935 8.12683 6.40078 8.55117 6.40078ZM8.55117 0.800781C8.97552 0.800781 9.38248 0.969352 9.68254 1.26941C9.9826 1.56947 10.1512 1.97643 10.1512 2.40078C10.1512 2.82513 9.9826 3.23209 9.68254 3.53215C9.38248 3.83221 8.97552 4.00078 8.55117 4.00078C8.12683 4.00078 7.71986 3.83221 7.4198 3.53215C7.11974 3.23209 6.95117 2.82513 6.95117 2.40078C6.95117 1.97643 7.11974 1.56947 7.4198 1.26941C7.71986 0.969352 8.12683 0.800781 8.55117 0.800781Z" fill="#373D4D" />
                                    </svg>
                                </div>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                >
                                    <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
                                </Popover>
                            </div>
                            <Grid container>
                                <Grid xs={12} sx={12} md={12} lg={7} xl={6}>
                                    <div className="prinfo" style={{ margin: '10px' }}>
                                        <div className="inner-prf">
                                            <div className="imrstyle">
                                                <div className="imr1">
                                                    <div className="display-1 ">
                                                        <div className="prd curor">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M4 10.75H1.5C0.81 10.75 0.25 10.19 0.25 9.5V2.5C0.25 1.81 0.81 1.25 1.5 1.25H10.5C11.19 1.25 11.75 1.81 11.75 2.5V5H14.5C14.8978 5 15.2794 5.15804 15.5607 5.43934C15.842 5.72064 16 6.10218 16 6.5V13.5C16 13.8978 15.842 14.2794 15.5607 14.5607C15.2794 14.842 14.8978 15 14.5 15H5.5C5.10218 15 4.72064 14.842 4.43934 14.5607C4.15804 14.2794 4 13.8978 4 13.5V10.75ZM1.75 9.25V2.75H10.25V5H5.5C5.10218 5 4.72064 5.15804 4.43934 5.43934C4.15804 5.72064 4 6.10218 4 6.5V9.25H1.75ZM5.5 6.5H14.5V13.5H5.5V6.5Z" fill="#373D4D" />
                                                            </svg>
                                                        </div>
                                                        <Box sx={{ minWidth: 120 }}>
                                                            <FormControl fullWidth className='select-dash'>
                                                                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    value={age}
                                                                    // label="Age"
                                                                    onChange={handleChange}

                                                                >
                                                                    <MenuItem value={10} className='select-text'>Front side</MenuItem>
                                                                    <MenuItem value={20} className='select-text'>Back side</MenuItem>
                                                                    {/* <MenuItem value={30} className='select-text'>Thirty</MenuItem> */}
                                                                </Select>
                                                            </FormControl>
                                                        </Box>
                                                    </div>
                                                    <div className="aprstus display-1">
                                                        <div className="green"></div>
                                                        <div className="">Approved</div>
                                                    </div>
                                                    <div className="chngestatus margin-t-10px">
                                                        <Button>
                                                            Change status
                                                        </Button>

                                                    </div>
                                                </div>
                                                <div className="display-1  withbcg " style={{ alignItems: 'flex-start', flexDirection: !mobileUp && 'column' }} >
                                                    <div className="prvimg1">
                                                        <img src={imageUrl ? imageUrl : adrfrnt} alt="prvimg1" />
                                                    </div>
                                                    <Stack spacing={2} direction={!mobileUp ? 'row' : 'column'}>
                                                        <div className="cursor">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                                                <mask id="mask0_93_6092" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="17" height="17">
                                                                    <path d="M0.339844 0.621094H16.3398V16.6211H0.339844V0.621094Z" fill="white" />
                                                                </mask>
                                                                <g mask="url(#mask0_93_6092)">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.34062 1.42188C9.59371 1.42206 10.8251 1.74928 11.9129 2.37118C13.0008 2.99309 13.9075 3.88815 14.5435 4.96787C15.1794 6.0476 15.5226 7.2746 15.539 8.52758C15.5554 9.78056 15.2445 11.0161 14.637 12.1121C14.0296 13.2082 13.1466 14.1267 12.0754 14.7768C11.0042 15.427 9.78185 15.7864 8.52919 15.8194C7.27654 15.8524 6.03696 15.5579 4.933 14.965C3.82905 14.3721 2.89894 13.5014 2.23463 12.4389L2.11163 12.2349L3.49463 11.4309C4.10257 12.4794 5.03428 13.3024 6.14984 13.7763C7.2654 14.2501 8.50458 14.3492 9.68128 14.0588C10.858 13.7683 11.9087 13.1039 12.6756 12.1654C13.4425 11.2268 13.8842 10.0648 13.9344 8.85382C13.9846 7.64283 13.6405 6.44825 12.9539 5.44948C12.2673 4.45071 11.2751 3.70166 10.1265 3.31484C8.97785 2.92801 7.73471 2.92428 6.58378 3.30422C5.43284 3.68415 4.43623 4.42724 3.74363 5.42188H5.94062V7.02188H1.14062V2.22188H2.74063V4.09488C3.41536 3.2596 4.26854 2.58599 5.23756 2.12345C6.20659 1.66092 7.26687 1.42119 8.34062 1.42188Z" fill="#373D4D" />
                                                                </g>
                                                            </svg>
                                                        </div>
                                                        <div className="cursor">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                                                <mask id="mask0_93_6099" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="17" height="17">
                                                                    <path d="M0.339844 0.621094H16.3398V16.6211H0.339844V0.621094Z" fill="white" />
                                                                </mask>
                                                                <g mask="url(#mask0_93_6099)">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.81189 1.29483C7.37605 0.755201 9.07187 0.730353 10.6512 1.22392C12.2305 1.71749 13.6104 2.70355 14.5889 4.03783V2.12083H16.0889V5.62083C16.0889 5.81974 16.0099 6.0105 15.8692 6.15116C15.7286 6.29181 15.5378 6.37083 15.3389 6.37083H11.8389V4.87083H13.3389C12.4898 3.73873 11.2816 2.92831 9.91203 2.57213C8.54245 2.21595 7.09253 2.33511 5.79948 2.91011C4.50642 3.48511 3.44677 4.4819 2.79388 5.73743C2.141 6.99296 1.93352 8.4329 2.2054 9.82168C2.47727 11.2105 3.2124 12.4659 4.29053 13.3825C5.36866 14.2992 6.72596 14.8228 8.14038 14.8678C9.55481 14.9127 10.9426 14.4764 12.0768 13.63C13.211 12.7837 14.0244 11.5775 14.3839 10.2088L15.8339 10.5898C15.4939 11.885 14.8241 13.07 13.8898 14.0293C12.9555 14.9885 11.7886 15.6894 10.5029 16.0634C9.21711 16.4375 7.85637 16.472 6.55329 16.1637C5.25021 15.8553 4.04926 15.2146 3.06751 14.304C2.08575 13.3934 1.35669 12.2439 0.951399 10.9676C0.546106 9.69139 0.47841 8.33189 0.754908 7.02169C1.03141 5.71148 1.64267 4.49527 2.5291 3.49161C3.41553 2.48796 4.54589 1.7311 5.81189 1.29483Z" fill="#373D4D" />
                                                                </g>
                                                            </svg>

                                                        </div>
                                                        <div className="cursor">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                                                <mask id="mask0_93_6106" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="17" height="17">
                                                                    <path d="M0.339844 0.621094H16.3398V16.6211H0.339844V0.621094Z" fill="white" />
                                                                </mask>
                                                                <g mask="url(#mask0_93_6106)">
                                                                    <path d="M5.30611 1.37109H7.59011V15.8711H0.287109L5.30611 1.37109Z" fill="#373D4D" />
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.08984 1.37109H11.3738L16.3938 15.8711H9.08984V1.37109ZM14.2868 14.3711L10.5898 3.69109V14.3711H14.2868Z" fill="#373D4D" />
                                                                </g>
                                                            </svg>
                                                        </div>
                                                        <div className="cursor" style={{ width: '15px' }}>
                                                            <Button
                                                                component="label"
                                                                role={undefined}
                                                                // variant="contained"
                                                                tabIndex={-1}
                                                                sx={{ display: 'flex', justifyContent: 'flex-start', padding: '0px' }}
                                                            // startIcon={<CloudUploadIcon />}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M14.7395 13.4225V15.0225H1.93945V13.4225H14.7395ZM9.13945 11.8255V4.95853L10.9735 6.79153L12.1055 5.66053L8.33945 1.89453L4.57345 5.66053L5.70545 6.79153L7.53945 4.95853V11.8255H9.13945Z" fill="#373D4D" />
                                                                </svg>
                                                                <VisuallyHiddenInput type="file" onChange={handleImageUpload} />
                                                            </Button>

                                                        </div>
                                                        <div className="cursor">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                                                <path d="M7.58984 6.62109V5.12109H9.08984V6.62109H7.58984ZM7.58984 8.12109V12.1211H9.08984V8.12109H7.58984Z" fill="#373D4D" />
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M8.33984 1.62109C6.48333 1.62109 4.70285 2.35859 3.3901 3.67135C2.07734 4.9841 1.33984 6.76458 1.33984 8.62109C1.33984 10.4776 2.07734 12.2581 3.3901 13.5708C4.70285 14.8836 6.48333 15.6211 8.33984 15.6211C10.1964 15.6211 11.9768 14.8836 13.2896 13.5708C14.6023 12.2581 15.3398 10.4776 15.3398 8.62109C15.3398 6.76458 14.6023 4.9841 13.2896 3.67135C11.9768 2.35859 10.1964 1.62109 8.33984 1.62109ZM8.33984 3.12109C6.88115 3.12109 5.48221 3.70056 4.45076 4.73201C3.41931 5.76346 2.83984 7.1624 2.83984 8.62109C2.83984 10.0798 3.41931 11.4787 4.45076 12.5102C5.48221 13.5416 6.88115 14.1211 8.33984 14.1211C9.79853 14.1211 11.1975 13.5416 12.2289 12.5102C13.2604 11.4787 13.8398 10.0798 13.8398 8.62109C13.8398 7.1624 13.2604 5.76346 12.2289 4.73201C11.1975 3.70056 9.79853 3.12109 8.33984 3.12109Z" fill="#373D4D" />
                                                            </svg>
                                                        </div>
                                                    </Stack>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="margin-top prinfo" style={{ margin: '10px' }}>
                                        <div className="inner-prf">
                                            <div className="imrstyle">
                                                <div className="imr1">
                                                    <div className="display-1 ">
                                                        <div className="prd curor">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M4 10.75H1.5C0.81 10.75 0.25 10.19 0.25 9.5V2.5C0.25 1.81 0.81 1.25 1.5 1.25H10.5C11.19 1.25 11.75 1.81 11.75 2.5V5H14.5C14.8978 5 15.2794 5.15804 15.5607 5.43934C15.842 5.72064 16 6.10218 16 6.5V13.5C16 13.8978 15.842 14.2794 15.5607 14.5607C15.2794 14.842 14.8978 15 14.5 15H5.5C5.10218 15 4.72064 14.842 4.43934 14.5607C4.15804 14.2794 4 13.8978 4 13.5V10.75ZM1.75 9.25V2.75H10.25V5H5.5C5.10218 5 4.72064 5.15804 4.43934 5.43934C4.15804 5.72064 4 6.10218 4 6.5V9.25H1.75ZM5.5 6.5H14.5V13.5H5.5V6.5Z" fill="#373D4D" />
                                                            </svg>
                                                        </div>
                                                        <Box sx={{ minWidth: 120 }}>
                                                            <FormControl fullWidth className='select-dash'>
                                                                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    value={age}
                                                                    // label="Age"
                                                                    onChange={handleChange}

                                                                >
                                                                    <MenuItem value={10} className='select-text'>Back side</MenuItem>
                                                                    <MenuItem value={20} className='select-text'>front side</MenuItem>
                                                                    {/* <MenuItem value={30} className='select-text'>Thirty</MenuItem> */}
                                                                </Select>
                                                            </FormControl>
                                                        </Box>
                                                    </div>
                                                    <div className="aprstus display-1">
                                                        <div className="green"></div>
                                                        <div className="">Approved</div>
                                                    </div>
                                                    <div className="chngestatus margin-t-10px">
                                                        <Button>
                                                            Change status
                                                        </Button>

                                                    </div>
                                                </div>
                                                <div className="display-1  withbcg " style={{ alignItems: 'flex-start', flexDirection: !mobileUp && 'column' }}>
                                                    <div className="prvimg1">
                                                        <img src={imageUrl ? imageUrl : adrfrnt2} alt="prvimg1" />
                                                    </div>
                                                    <Stack spacing={2} direction={!mobileUp ? 'row' : 'column'}>
                                                        <div className="cursor">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                                                <mask id="mask0_93_6092" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="17" height="17">
                                                                    <path d="M0.339844 0.621094H16.3398V16.6211H0.339844V0.621094Z" fill="white" />
                                                                </mask>
                                                                <g mask="url(#mask0_93_6092)">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.34062 1.42188C9.59371 1.42206 10.8251 1.74928 11.9129 2.37118C13.0008 2.99309 13.9075 3.88815 14.5435 4.96787C15.1794 6.0476 15.5226 7.2746 15.539 8.52758C15.5554 9.78056 15.2445 11.0161 14.637 12.1121C14.0296 13.2082 13.1466 14.1267 12.0754 14.7768C11.0042 15.427 9.78185 15.7864 8.52919 15.8194C7.27654 15.8524 6.03696 15.5579 4.933 14.965C3.82905 14.3721 2.89894 13.5014 2.23463 12.4389L2.11163 12.2349L3.49463 11.4309C4.10257 12.4794 5.03428 13.3024 6.14984 13.7763C7.2654 14.2501 8.50458 14.3492 9.68128 14.0588C10.858 13.7683 11.9087 13.1039 12.6756 12.1654C13.4425 11.2268 13.8842 10.0648 13.9344 8.85382C13.9846 7.64283 13.6405 6.44825 12.9539 5.44948C12.2673 4.45071 11.2751 3.70166 10.1265 3.31484C8.97785 2.92801 7.73471 2.92428 6.58378 3.30422C5.43284 3.68415 4.43623 4.42724 3.74363 5.42188H5.94062V7.02188H1.14062V2.22188H2.74063V4.09488C3.41536 3.2596 4.26854 2.58599 5.23756 2.12345C6.20659 1.66092 7.26687 1.42119 8.34062 1.42188Z" fill="#373D4D" />
                                                                </g>
                                                            </svg>
                                                        </div>
                                                        <div className="cursor">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                                                <mask id="mask0_93_6099" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="17" height="17">
                                                                    <path d="M0.339844 0.621094H16.3398V16.6211H0.339844V0.621094Z" fill="white" />
                                                                </mask>
                                                                <g mask="url(#mask0_93_6099)">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.81189 1.29483C7.37605 0.755201 9.07187 0.730353 10.6512 1.22392C12.2305 1.71749 13.6104 2.70355 14.5889 4.03783V2.12083H16.0889V5.62083C16.0889 5.81974 16.0099 6.0105 15.8692 6.15116C15.7286 6.29181 15.5378 6.37083 15.3389 6.37083H11.8389V4.87083H13.3389C12.4898 3.73873 11.2816 2.92831 9.91203 2.57213C8.54245 2.21595 7.09253 2.33511 5.79948 2.91011C4.50642 3.48511 3.44677 4.4819 2.79388 5.73743C2.141 6.99296 1.93352 8.4329 2.2054 9.82168C2.47727 11.2105 3.2124 12.4659 4.29053 13.3825C5.36866 14.2992 6.72596 14.8228 8.14038 14.8678C9.55481 14.9127 10.9426 14.4764 12.0768 13.63C13.211 12.7837 14.0244 11.5775 14.3839 10.2088L15.8339 10.5898C15.4939 11.885 14.8241 13.07 13.8898 14.0293C12.9555 14.9885 11.7886 15.6894 10.5029 16.0634C9.21711 16.4375 7.85637 16.472 6.55329 16.1637C5.25021 15.8553 4.04926 15.2146 3.06751 14.304C2.08575 13.3934 1.35669 12.2439 0.951399 10.9676C0.546106 9.69139 0.47841 8.33189 0.754908 7.02169C1.03141 5.71148 1.64267 4.49527 2.5291 3.49161C3.41553 2.48796 4.54589 1.7311 5.81189 1.29483Z" fill="#373D4D" />
                                                                </g>
                                                            </svg>

                                                        </div>
                                                        <div className="cursor">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                                                <mask id="mask0_93_6106" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="17" height="17">
                                                                    <path d="M0.339844 0.621094H16.3398V16.6211H0.339844V0.621094Z" fill="white" />
                                                                </mask>
                                                                <g mask="url(#mask0_93_6106)">
                                                                    <path d="M5.30611 1.37109H7.59011V15.8711H0.287109L5.30611 1.37109Z" fill="#373D4D" />
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.08984 1.37109H11.3738L16.3938 15.8711H9.08984V1.37109ZM14.2868 14.3711L10.5898 3.69109V14.3711H14.2868Z" fill="#373D4D" />
                                                                </g>
                                                            </svg>
                                                        </div>
                                                        <div className="cursor" style={{ width: '15px' }}>
                                                            <Button
                                                                component="label"
                                                                role={undefined}
                                                                // variant="contained"
                                                                tabIndex={-1}
                                                                sx={{ display: 'flex', justifyContent: 'flex-start', padding: '0px' }}
                                                            // startIcon={<CloudUploadIcon />}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M14.7395 13.4225V15.0225H1.93945V13.4225H14.7395ZM9.13945 11.8255V4.95853L10.9735 6.79153L12.1055 5.66053L8.33945 1.89453L4.57345 5.66053L5.70545 6.79153L7.53945 4.95853V11.8255H9.13945Z" fill="#373D4D" />
                                                                </svg>
                                                                <VisuallyHiddenInput type="file" onChange={handleImageUpload} />
                                                            </Button>

                                                        </div>
                                                        <div className="cursor">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                                                <path d="M7.58984 6.62109V5.12109H9.08984V6.62109H7.58984ZM7.58984 8.12109V12.1211H9.08984V8.12109H7.58984Z" fill="#373D4D" />
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M8.33984 1.62109C6.48333 1.62109 4.70285 2.35859 3.3901 3.67135C2.07734 4.9841 1.33984 6.76458 1.33984 8.62109C1.33984 10.4776 2.07734 12.2581 3.3901 13.5708C4.70285 14.8836 6.48333 15.6211 8.33984 15.6211C10.1964 15.6211 11.9768 14.8836 13.2896 13.5708C14.6023 12.2581 15.3398 10.4776 15.3398 8.62109C15.3398 6.76458 14.6023 4.9841 13.2896 3.67135C11.9768 2.35859 10.1964 1.62109 8.33984 1.62109ZM8.33984 3.12109C6.88115 3.12109 5.48221 3.70056 4.45076 4.73201C3.41931 5.76346 2.83984 7.1624 2.83984 8.62109C2.83984 10.0798 3.41931 11.4787 4.45076 12.5102C5.48221 13.5416 6.88115 14.1211 8.33984 14.1211C9.79853 14.1211 11.1975 13.5416 12.2289 12.5102C13.2604 11.4787 13.8398 10.0798 13.8398 8.62109C13.8398 7.1624 13.2604 5.76346 12.2289 4.73201C11.1975 3.70056 9.79853 3.12109 8.33984 3.12109Z" fill="#373D4D" />
                                                            </svg>
                                                        </div>
                                                    </Stack>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </Grid>
                                <Grid xs={12} sx={12} md={12} lg={5} xl={6}>

                                    <div className="prinfo margin-top" style={{ width: '100%', height: '95%' }}>
                                        <div className="inner-prf">
                                            <div className="display-2 cursor">
                                                <div className="applstas">
                                                    Documents
                                                </div>
                                                <div className="upldnewdata display-1" onClick={handleOpen} style={{ padding: "7px 15px" }}>
                                                    <div>
                                                        Edit
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="margin-top">
                                                <div className="display-2 spc-nm">
                                                    <div className="frtnme">
                                                        First name
                                                    </div>
                                                    <div className="nme">
                                                        Gowtham
                                                    </div>
                                                </div>
                                                <div className="display-2 spc-nm">
                                                    <div className="frtnme">
                                                        Last name
                                                    </div>
                                                    <div className="nme">
                                                        M
                                                    </div>
                                                </div>
                                                <div className="display-2 spc-nm">
                                                    <div className="frtnme">
                                                        Number
                                                    </div>
                                                    <div className="nme">
                                                        918274517
                                                    </div>
                                                </div>
                                                <div className="display-2 spc-nm">
                                                    <div className="frtnme">
                                                        Date of birth
                                                    </div>
                                                    <div className="nme">
                                                        1992-08-17
                                                    </div>
                                                </div>
                                                <div className="display-2 spc-nm">
                                                    <div className="frtnme">
                                                        Age
                                                    </div>
                                                    <div className="nme">
                                                        31 y.o.
                                                    </div>
                                                </div>
                                                <div className="display-2 spc-nm">
                                                    <div className="frtnme">
                                                        Valid until
                                                    </div>
                                                    <div className="nme">
                                                        -
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                            <div className="margin-top display-2 cursor">
                                <div className="applstas">
                                    Selfie
                                </div>

                                <Button
                                    component="label"
                                    role={undefined}
                                    // variant="contained"
                                    tabIndex={-1}
                                    sx={{ display: 'flex', justifyContent: 'flex-start', padding: '0px', textTransform: 'capitalize' }}
                                // startIcon={<CloudUploadIcon />}
                                >
                                    <div className="upldnewdata display-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                            <path d="M7.56055 8.75V14H9.06055V8.75H14.3105V7.25H9.06055V2H7.56055V7.25H2.31055V8.75H7.56055Z" fill="#373D4D" />
                                        </svg>
                                        <div>
                                            Upload new selfie
                                        </div>

                                    </div>
                                    <VisuallyHiddenInput type="file" onChange={handleImageUpload} />
                                </Button>
                            </div>




                            <div className="margin-top display-1 stus">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" fill="#25B793" />
                                    <path d="M5 8L7 10L11 6" fill="#212736" />
                                    <path d="M5 8L7 10L11 6" stroke="white" stroke-width="1.5" />
                                </svg>
                                <div className="nme">
                                    Selfie
                                </div>
                                <div className="dot3 cursor" onClick={handleClick}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.55117 12.0008C8.97552 12.0008 9.38248 12.1694 9.68254 12.4694C9.9826 12.7695 10.1512 13.1764 10.1512 13.6008C10.1512 14.0251 9.9826 14.4321 9.68254 14.7322C9.38248 15.0322 8.97552 15.2008 8.55117 15.2008C8.12683 15.2008 7.71986 15.0322 7.4198 14.7322C7.11974 14.4321 6.95117 14.0251 6.95117 13.6008C6.95117 13.1764 7.11974 12.7695 7.4198 12.4694C7.71986 12.1694 8.12683 12.0008 8.55117 12.0008ZM8.55117 6.40078C8.97552 6.40078 9.38248 6.56935 9.68254 6.86941C9.9826 7.16947 10.1512 7.57643 10.1512 8.00078C10.1512 8.42513 9.9826 8.83209 9.68254 9.13215C9.38248 9.43221 8.97552 9.60078 8.55117 9.60078C8.12683 9.60078 7.71986 9.43221 7.4198 9.13215C7.11974 8.83209 6.95117 8.42513 6.95117 8.00078C6.95117 7.57643 7.11974 7.16947 7.4198 6.86941C7.71986 6.56935 8.12683 6.40078 8.55117 6.40078ZM8.55117 0.800781C8.97552 0.800781 9.38248 0.969352 9.68254 1.26941C9.9826 1.56947 10.1512 1.97643 10.1512 2.40078C10.1512 2.82513 9.9826 3.23209 9.68254 3.53215C9.38248 3.83221 8.97552 4.00078 8.55117 4.00078C8.12683 4.00078 7.71986 3.83221 7.4198 3.53215C7.11974 3.23209 6.95117 2.82513 6.95117 2.40078C6.95117 1.97643 7.11974 1.56947 7.4198 1.26941C7.71986 0.969352 8.12683 0.800781 8.55117 0.800781Z" fill="#373D4D" />
                                    </svg>
                                </div>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                >
                                    <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
                                </Popover>
                            </div>
                            <div className="prinfo" style={{ margin: '10px' }}>
                                <div className="inner-prf">
                                    <div className="imrstyle">
                                        <div className="imr1">
                                            <div className="display-1 ">
                                                <div className="prd curor">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M4 10.75H1.5C0.81 10.75 0.25 10.19 0.25 9.5V2.5C0.25 1.81 0.81 1.25 1.5 1.25H10.5C11.19 1.25 11.75 1.81 11.75 2.5V5H14.5C14.8978 5 15.2794 5.15804 15.5607 5.43934C15.842 5.72064 16 6.10218 16 6.5V13.5C16 13.8978 15.842 14.2794 15.5607 14.5607C15.2794 14.842 14.8978 15 14.5 15H5.5C5.10218 15 4.72064 14.842 4.43934 14.5607C4.15804 14.2794 4 13.8978 4 13.5V10.75ZM1.75 9.25V2.75H10.25V5H5.5C5.10218 5 4.72064 5.15804 4.43934 5.43934C4.15804 5.72064 4 6.10218 4 6.5V9.25H1.75ZM5.5 6.5H14.5V13.5H5.5V6.5Z" fill="#373D4D" />
                                                    </svg>
                                                </div>
                                                <Box sx={{ minWidth: 120 }}>
                                                    <FormControl fullWidth className='select-dash'>
                                                        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={age}
                                                            // label="Age"
                                                            onChange={handleChange}

                                                        >
                                                            <MenuItem value={10} className='select-text'>Front side</MenuItem>
                                                            <MenuItem value={20} className='select-text'>Back side</MenuItem>
                                                            {/* <MenuItem value={30} className='select-text'>Thirty</MenuItem> */}
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </div>
                                            <div className="aprstus display-1">
                                                <div className="green"></div>
                                                <div className="">Approved</div>
                                            </div>
                                            <div className="chngestatus margin-t-10px">
                                                <Button>
                                                    Change status
                                                </Button>

                                            </div>
                                        </div>
                                        <div className="display-1  withbcg " style={{ alignItems: 'flex-start', flexDirection: !mobileUp && 'column' }}>
                                            <div className="prvimg1">
                                                <img src={imageUrl ? imageUrl : selfie} alt="prvimg1" />
                                            </div>
                                            <Stack spacing={2} direction={!mobileUp ? 'row' : 'column'}>
                                                <div className="cursor">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                                        <mask id="mask0_93_6092" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="17" height="17">
                                                            <path d="M0.339844 0.621094H16.3398V16.6211H0.339844V0.621094Z" fill="white" />
                                                        </mask>
                                                        <g mask="url(#mask0_93_6092)">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M8.34062 1.42188C9.59371 1.42206 10.8251 1.74928 11.9129 2.37118C13.0008 2.99309 13.9075 3.88815 14.5435 4.96787C15.1794 6.0476 15.5226 7.2746 15.539 8.52758C15.5554 9.78056 15.2445 11.0161 14.637 12.1121C14.0296 13.2082 13.1466 14.1267 12.0754 14.7768C11.0042 15.427 9.78185 15.7864 8.52919 15.8194C7.27654 15.8524 6.03696 15.5579 4.933 14.965C3.82905 14.3721 2.89894 13.5014 2.23463 12.4389L2.11163 12.2349L3.49463 11.4309C4.10257 12.4794 5.03428 13.3024 6.14984 13.7763C7.2654 14.2501 8.50458 14.3492 9.68128 14.0588C10.858 13.7683 11.9087 13.1039 12.6756 12.1654C13.4425 11.2268 13.8842 10.0648 13.9344 8.85382C13.9846 7.64283 13.6405 6.44825 12.9539 5.44948C12.2673 4.45071 11.2751 3.70166 10.1265 3.31484C8.97785 2.92801 7.73471 2.92428 6.58378 3.30422C5.43284 3.68415 4.43623 4.42724 3.74363 5.42188H5.94062V7.02188H1.14062V2.22188H2.74063V4.09488C3.41536 3.2596 4.26854 2.58599 5.23756 2.12345C6.20659 1.66092 7.26687 1.42119 8.34062 1.42188Z" fill="#373D4D" />
                                                        </g>
                                                    </svg>
                                                </div>
                                                <div className="cursor">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                                        <mask id="mask0_93_6099" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="17" height="17">
                                                            <path d="M0.339844 0.621094H16.3398V16.6211H0.339844V0.621094Z" fill="white" />
                                                        </mask>
                                                        <g mask="url(#mask0_93_6099)">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M5.81189 1.29483C7.37605 0.755201 9.07187 0.730353 10.6512 1.22392C12.2305 1.71749 13.6104 2.70355 14.5889 4.03783V2.12083H16.0889V5.62083C16.0889 5.81974 16.0099 6.0105 15.8692 6.15116C15.7286 6.29181 15.5378 6.37083 15.3389 6.37083H11.8389V4.87083H13.3389C12.4898 3.73873 11.2816 2.92831 9.91203 2.57213C8.54245 2.21595 7.09253 2.33511 5.79948 2.91011C4.50642 3.48511 3.44677 4.4819 2.79388 5.73743C2.141 6.99296 1.93352 8.4329 2.2054 9.82168C2.47727 11.2105 3.2124 12.4659 4.29053 13.3825C5.36866 14.2992 6.72596 14.8228 8.14038 14.8678C9.55481 14.9127 10.9426 14.4764 12.0768 13.63C13.211 12.7837 14.0244 11.5775 14.3839 10.2088L15.8339 10.5898C15.4939 11.885 14.8241 13.07 13.8898 14.0293C12.9555 14.9885 11.7886 15.6894 10.5029 16.0634C9.21711 16.4375 7.85637 16.472 6.55329 16.1637C5.25021 15.8553 4.04926 15.2146 3.06751 14.304C2.08575 13.3934 1.35669 12.2439 0.951399 10.9676C0.546106 9.69139 0.47841 8.33189 0.754908 7.02169C1.03141 5.71148 1.64267 4.49527 2.5291 3.49161C3.41553 2.48796 4.54589 1.7311 5.81189 1.29483Z" fill="#373D4D" />
                                                        </g>
                                                    </svg>

                                                </div>
                                                <div className="cursor">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                                        <mask id="mask0_93_6106" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="17" height="17">
                                                            <path d="M0.339844 0.621094H16.3398V16.6211H0.339844V0.621094Z" fill="white" />
                                                        </mask>
                                                        <g mask="url(#mask0_93_6106)">
                                                            <path d="M5.30611 1.37109H7.59011V15.8711H0.287109L5.30611 1.37109Z" fill="#373D4D" />
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M9.08984 1.37109H11.3738L16.3938 15.8711H9.08984V1.37109ZM14.2868 14.3711L10.5898 3.69109V14.3711H14.2868Z" fill="#373D4D" />
                                                        </g>
                                                    </svg>
                                                </div>
                                                <div className="cursor" style={{ width: '15px' }}>
                                                    <Button
                                                        component="label"
                                                        role={undefined}
                                                        // variant="contained"
                                                        tabIndex={-1}
                                                        sx={{ display: 'flex', justifyContent: 'flex-start', padding: '0px' }}
                                                    // startIcon={<CloudUploadIcon />}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M14.7395 13.4225V15.0225H1.93945V13.4225H14.7395ZM9.13945 11.8255V4.95853L10.9735 6.79153L12.1055 5.66053L8.33945 1.89453L4.57345 5.66053L5.70545 6.79153L7.53945 4.95853V11.8255H9.13945Z" fill="#373D4D" />
                                                        </svg>
                                                        <VisuallyHiddenInput type="file" onChange={handleImageUpload} />
                                                    </Button>

                                                </div>
                                                <div className="cursor">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                                        <path d="M7.58984 6.62109V5.12109H9.08984V6.62109H7.58984ZM7.58984 8.12109V12.1211H9.08984V8.12109H7.58984Z" fill="#373D4D" />
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.33984 1.62109C6.48333 1.62109 4.70285 2.35859 3.3901 3.67135C2.07734 4.9841 1.33984 6.76458 1.33984 8.62109C1.33984 10.4776 2.07734 12.2581 3.3901 13.5708C4.70285 14.8836 6.48333 15.6211 8.33984 15.6211C10.1964 15.6211 11.9768 14.8836 13.2896 13.5708C14.6023 12.2581 15.3398 10.4776 15.3398 8.62109C15.3398 6.76458 14.6023 4.9841 13.2896 3.67135C11.9768 2.35859 10.1964 1.62109 8.33984 1.62109ZM8.33984 3.12109C6.88115 3.12109 5.48221 3.70056 4.45076 4.73201C3.41931 5.76346 2.83984 7.1624 2.83984 8.62109C2.83984 10.0798 3.41931 11.4787 4.45076 12.5102C5.48221 13.5416 6.88115 14.1211 8.33984 14.1211C9.79853 14.1211 11.1975 13.5416 12.2289 12.5102C13.2604 11.4787 13.8398 10.0798 13.8398 8.62109C13.8398 7.1624 13.2604 5.76346 12.2289 4.73201C11.1975 3.70056 9.79853 3.12109 8.33984 3.12109Z" fill="#373D4D" />
                                                    </svg>
                                                </div>
                                            </Stack>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="margin-top display-2 cursor">
                                <div className="applstas">
                                    Face Match
                                </div>

                            </div>
                            <div className="prinfo" style={{ margin: '10px' }}>
                                <div className="inner-prf">
                                    <div className="text-center face">
                                        <img src={face} alt="" />
                                    </div>
                                    <div className="margin-t-10px text-center facetxt">
                                        The "Face match" check will be displayed here
                                    </div>
                                </div>
                            </div>
                        </div>
                        <CustomTabPanel>
                            Item Two
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            Item Three
                        </CustomTabPanel>
                    </div>
                </Box >
            </Box >
            <Modal
                open={openModel}
                // onClose={handleCloseModel}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="display-2">
                        <div className="editprf">
                            Edit personal information
                        </div>
                        <div className="clos cursor" onClick={handleCloseModel}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.93973 7.99875L2.46973 3.52875L3.52973 2.46875L7.99973 6.93875L12.4697 2.46875L13.5297 3.52875L9.05973 7.99875L13.5297 12.4688L12.4697 13.5287L7.99973 9.05875L3.52973 13.5287L2.46973 12.4688L6.93973 7.99875Z" fill="#373D4D" />
                            </svg>
                        </div>

                    </div>
                    <div className="margin-t-10px matk">
                        You can correct typing mistakes if there are any
                    </div>

                    <div className="frstpop">
                        First name
                    </div>
                    <input type='text' className='popinpt' />
                    <div className="frstpop">
                        Last name
                    </div>
                    <input type='text' className='popinpt' />
                    <div className="frstpop">
                        Middle name
                    </div>
                    <input type='text' className='popinpt' />
                    <div className="frstpop">
                        Date of birth
                    </div>
                    <input type='text' className='popinpt' />
                    <div className="frstpop">
                        Phone
                    </div>
                    <input type='text' className='popinpt' />
                    <div className="frstpop">
                        PAN
                    </div>
                    <input type='text' className='popinpt' />
                    <div className="frstpop">
                        Gender
                    </div>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />

                    </RadioGroup>
                    <div className="frstpop">
                        Nationality
                    </div>
                    <Selects
                        value={selectedCountry}
                        onChange={handleChangeCountry}
                        options={countries}
                        styles={customStyles}
                        formatOptionLabel={formatOptionLabel}
                        isSearchable={true}
                        placeholder="Select a country..."
                    />
                    <div className="frstpop">
                        Country
                    </div>
                    <Selects
                        value={selectedCountry}
                        onChange={handleChangeCountry}
                        options={countries}
                        styles={customStyles}
                        formatOptionLabel={formatOptionLabel}
                        isSearchable={true}
                        placeholder="Select a country..."
                    />
                    <div className="frstpop">
                        Country of birth
                    </div>
                    <Selects
                        value={selectedCountry}
                        onChange={handleChangeCountry}
                        options={countries}
                        styles={customStyles}
                        formatOptionLabel={formatOptionLabel}
                        isSearchable={true}
                        placeholder="Select a country..."
                    />
                    <hr style={{ border: '1px solid #E1E5EA', margin: '50px 0 15px 0' }} />
                    <div className="display-1" style={{ justifyContent: 'flex-end' }}>
                        <div className="cxl">
                            <Button onClick={handleCloseModel}>Cancel</Button>
                        </div>
                        <div className="sve" onClick={handleCloseModel}>
                            <Button>Save</Button>
                        </div>
                    </div>
                </Box>
            </Modal>
            <Modal
                open={openModel3}
                // onClose={handleCloseModel}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="display-2">
                        <div className="editprf">
                            Finish check
                        </div>
                        <div className="clos cursor" onClick={handleCloseModel3}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.93973 7.99875L2.46973 3.52875L3.52973 2.46875L7.99973 6.93875L12.4697 2.46875L13.5297 3.52875L9.05973 7.99875L13.5297 12.4688L12.4697 13.5287L7.99973 9.05875L3.52973 13.5287L2.46973 12.4688L6.93973 7.99875Z" fill="#373D4D" />
                            </svg>
                        </div>

                    </div>
                    <div className="margin-t-10px matk">
                        Select the right tags that apply to the applicant.
                    </div>

                    <div className="display-2 margin-top">
                        <div className="display-1">
                            <div className="frstpop">
                                Final rejection
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.7793 14C9.56723 14 10.3474 13.8448 11.0754 13.5433C11.8034 13.2417 12.4648 12.7998 13.0219 12.2426C13.5791 11.6855 14.021 11.0241 14.3226 10.2961C14.6241 9.56815 14.7793 8.78793 14.7793 8C14.7793 7.21207 14.6241 6.43185 14.3226 5.7039C14.021 4.97595 13.5791 4.31451 13.0219 3.75736C12.4648 3.20021 11.8034 2.75825 11.0754 2.45672C10.3474 2.15519 9.56723 2 8.7793 2C7.188 2 5.66187 2.63214 4.53666 3.75736C3.41144 4.88258 2.7793 6.4087 2.7793 8C2.7793 9.5913 3.41144 11.1174 4.53666 12.2426C5.66187 13.3679 7.188 14 8.7793 14ZM7.9503 8.672V8.966H9.1003V8.727C9.1003 8.568 9.1363 8.44 9.2093 8.342C9.2843 8.244 9.4603 8.101 9.7383 7.912C10.1433 7.648 10.4183 7.409 10.5623 7.197C10.7073 6.985 10.7793 6.734 10.7793 6.442C10.7793 6.005 10.6033 5.656 10.2493 5.393C9.8993 5.131 9.4283 5 8.8323 5C8.1093 5 7.4243 5.166 6.7793 5.497L7.2523 6.367C7.8073 6.107 8.3023 5.977 8.7363 5.977C8.9843 5.977 9.1783 6.023 9.3173 6.113C9.38374 6.15413 9.43804 6.21222 9.47459 6.28129C9.51115 6.35036 9.52865 6.42792 9.5253 6.506C9.52603 6.65782 9.47408 6.8052 9.3783 6.923C9.2823 7.048 9.0833 7.209 8.7793 7.408C8.4643 7.62 8.2473 7.82 8.1293 8.008C8.0093 8.196 7.9503 8.418 7.9503 8.672ZM8.0073 9.82C7.8773 9.934 7.8123 10.102 7.8123 10.325C7.8123 10.539 7.8783 10.706 8.0123 10.825C8.1443 10.942 8.3323 11 8.5753 11C8.8123 11 8.9973 10.94 9.1303 10.821C9.19743 10.7576 9.25007 10.6805 9.28459 10.5949C9.31911 10.5093 9.3347 10.4172 9.3303 10.325C9.3303 10.107 9.2633 9.94 9.1303 9.824C9.0003 9.707 8.8153 9.649 8.5753 9.649C8.3263 9.649 8.1373 9.707 8.0073 9.82Z" fill="#7D8799" />
                            </svg>
                        </div>
                        <div className="resettag cursor">
                            Reset all Final tags
                        </div>
                    </div>

                    <Box sx={{ minWidth: 120, margin: '5px 0' }}>
                        <FormControl fullWidth className='select-appli'>
                            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                // label="Age"
                                onChange={handleChange2}

                                IconComponent={CustomArrowIcon}
                            >
                                <MenuItem value={10}>Videoident - final</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120, margin: '5px 0' }}>
                        <FormControl fullWidth className='select-appli'>
                            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                // label="Age"
                                onChange={handleChange2}
                                IconComponent={CustomArrowIcon}

                            >
                                <MenuItem value={10}>Regulations violations</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120, margin: '5px 0' }}>
                        <FormControl fullWidth className='select-appli'>
                            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                // label="Age"
                                onChange={handleChange2}
                                IconComponent={CustomArrowIcon}
                            >
                                <MenuItem value={10}>Suspected fraud</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120, margin: '5px 0' }}>
                        <FormControl fullWidth className='select-appli'>
                            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                // label="Age"
                                onChange={handleChange2}
                                IconComponent={CustomArrowIcon}
                            >
                                <MenuItem value={10}>Selfie issues</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120, margin: '5px 0' }}>
                        <FormControl fullWidth className='select-appli'>
                            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                // label="Age"
                                onChange={handleChange2}
                                IconComponent={CustomArrowIcon}
                            >
                                <MenuItem value={10}>Compromised persons</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120, margin: '5px 0' }}>
                        <FormControl fullWidth className='select-appli'>
                            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                // label="Age"
                                onChange={handleChange2}
                                IconComponent={CustomArrowIcon}
                            >
                                <MenuItem value={10}>Different docs</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120, margin: '5px 0' }}>
                        <FormControl fullWidth className='select-appli'>
                            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                // label="Age"
                                onChange={handleChange2}
                                IconComponent={CustomArrowIcon}
                            >
                                <MenuItem value={10}>Spam(5) </MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120, margin: '5px 0' }}>
                        <FormControl fullWidth className='select-appli'>
                            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                // label="Age"
                                onChange={handleChange2}
                                IconComponent={CustomArrowIcon}
                            >
                                <MenuItem value={10}>E-KYC </MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120, margin: '5px 0' }}>
                        <FormControl fullWidth className='select-appli'>
                            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                // label="Age"
                                onChange={handleChange2}
                                IconComponent={CustomArrowIcon}
                            >
                                <MenuItem value={10}>External databases rejects</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <div className="display-2 margin-top">
                        <div className="display-1">
                            <div className="frstpop">
                                Temporary rejection
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.7793 14C9.56723 14 10.3474 13.8448 11.0754 13.5433C11.8034 13.2417 12.4648 12.7998 13.0219 12.2426C13.5791 11.6855 14.021 11.0241 14.3226 10.2961C14.6241 9.56815 14.7793 8.78793 14.7793 8C14.7793 7.21207 14.6241 6.43185 14.3226 5.7039C14.021 4.97595 13.5791 4.31451 13.0219 3.75736C12.4648 3.20021 11.8034 2.75825 11.0754 2.45672C10.3474 2.15519 9.56723 2 8.7793 2C7.188 2 5.66187 2.63214 4.53666 3.75736C3.41144 4.88258 2.7793 6.4087 2.7793 8C2.7793 9.5913 3.41144 11.1174 4.53666 12.2426C5.66187 13.3679 7.188 14 8.7793 14ZM7.9503 8.672V8.966H9.1003V8.727C9.1003 8.568 9.1363 8.44 9.2093 8.342C9.2843 8.244 9.4603 8.101 9.7383 7.912C10.1433 7.648 10.4183 7.409 10.5623 7.197C10.7073 6.985 10.7793 6.734 10.7793 6.442C10.7793 6.005 10.6033 5.656 10.2493 5.393C9.8993 5.131 9.4283 5 8.8323 5C8.1093 5 7.4243 5.166 6.7793 5.497L7.2523 6.367C7.8073 6.107 8.3023 5.977 8.7363 5.977C8.9843 5.977 9.1783 6.023 9.3173 6.113C9.38374 6.15413 9.43804 6.21222 9.47459 6.28129C9.51115 6.35036 9.52865 6.42792 9.5253 6.506C9.52603 6.65782 9.47408 6.8052 9.3783 6.923C9.2823 7.048 9.0833 7.209 8.7793 7.408C8.4643 7.62 8.2473 7.82 8.1293 8.008C8.0093 8.196 7.9503 8.418 7.9503 8.672ZM8.0073 9.82C7.8773 9.934 7.8123 10.102 7.8123 10.325C7.8123 10.539 7.8783 10.706 8.0123 10.825C8.1443 10.942 8.3323 11 8.5753 11C8.8123 11 8.9973 10.94 9.1303 10.821C9.19743 10.7576 9.25007 10.6805 9.28459 10.5949C9.31911 10.5093 9.3347 10.4172 9.3303 10.325C9.3303 10.107 9.2633 9.94 9.1303 9.824C9.0003 9.707 8.8153 9.649 8.5753 9.649C8.3263 9.649 8.1373 9.707 8.0073 9.82Z" fill="#7D8799" />
                            </svg>
                        </div>
                        <div className="resettag cursor">
                            Reset all Temporary tags
                        </div>
                    </div>
                    <Box sx={{ minWidth: 120, margin: '5px 0' }}>
                        <FormControl fullWidth className='select-appli'>
                            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                // label="Age"
                                onChange={handleChange2}
                                IconComponent={CustomArrowIcon}
                            >
                                <MenuItem value={10}>Data mismatch</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120, margin: '5px 0' }}>
                        <FormControl fullWidth className='select-appli'>
                            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                // label="Age"
                                onChange={handleChange2}
                                IconComponent={CustomArrowIcon}
                            >
                                <MenuItem value={10}>Data mismatch</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120, margin: '5px 0' }}>
                        <FormControl fullWidth className='select-appli'>
                            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                // label="Age"
                                onChange={handleChange2}
                                IconComponent={CustomArrowIcon}
                            >
                                <MenuItem value={10}>Videoident </MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120, margin: '5px 0' }}>
                        <FormControl fullWidth className='select-appli'>
                            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                // label="Age"
                                onChange={handleChange2}
                                IconComponent={CustomArrowIcon}
                            >
                                <MenuItem value={10}>E-KYC retry </MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120, margin: '5px 0' }}>
                        <FormControl fullWidth className='select-appli'>
                            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                // label="Age"
                                onChange={handleChange2}
                                IconComponent={CustomArrowIcon}
                            >
                                <MenuItem value={10}>External databases rejects</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <div className="margin-top">
                        <hr style={{ border: '1px solid #E1E5EA' }} />
                    </div>

                    <Box sx={{ minWidth: 120, margin: '5px 0' }}>
                        <FormControl fullWidth className='select-appli'>
                            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                // label="Age"
                                onChange={handleChange2}
                                IconComponent={CustomArrowIcon}
                            >
                                <MenuItem value={10}>Message for the applicant </MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <div className="display-1 margin-top" style={{ justifyContent: 'flex-end' }}>

                        <div className="appvr" onClick={handleCloseModel}>
                            <Button>Approve</Button>
                        </div>
                    </div>
                </Box>
            </Modal>
            <Modal
                open={openModel2}
                onClose={handleCloseModel2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='mdl-cls'
            >
                <Box sx={style2}>
                    <div className="display-2">
                        <div className="editprf">
                            Request check
                        </div>
                        <div className="clos cursor" onClick={handleCloseModel2}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.93973 7.99875L2.46973 3.52875L3.52973 2.46875L7.99973 6.93875L12.4697 2.46875L13.5297 3.52875L9.05973 7.99875L13.5297 12.4688L12.4697 13.5287L7.99973 9.05875L3.52973 13.5287L2.46973 12.4688L6.93973 7.99875Z" fill="#373D4D" />
                            </svg>
                        </div>

                    </div>
                    <div className=" display-1 margin-top">
                        <div className="aru-sure">
                            Are you sure you want to send a request to re-check the
                            applicant?
                        </div>

                    </div>
                    <div className="display-1 margin-top" style={{ justifyContent: 'flex-end' }}>
                        <div className="cxl" >
                            <Button onClick={handleCloseModel2}>Cancel</Button>
                        </div>
                        <div className="req-chk" onClick={handleCloseModel2}>
                            <Button>Request check</Button>
                        </div>
                    </div>
                </Box>
            </Modal>
            <Snackbar
                open={openSna}
                autoHideDuration={5000}
                onClose={handleCloseSna}
                message="Request Under Process"
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            />
        </div >
    )
}

export default Applicant3
