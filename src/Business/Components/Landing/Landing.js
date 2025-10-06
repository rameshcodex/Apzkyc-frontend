import React, { useEffect } from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';
import Banner from '../../../Images/banner-img.png';
import Scroll from '../../../Images/slide-1.png';
import Scroll1 from '../../../Images/slide-2.png';
import Scroll2 from '../../../Images/slide-3.png';
import Scroll3 from '../../../Images/slide-4.png';
import Scroll4 from '../../../Images/slide-5.png';
import Scroll5 from '../../../Images/slide-6.png';
import Scroll6 from '../../../Images/slide-7.png';
import Scroll7 from '../../../Images/slide-8.png';
import Scroll8 from '../../../Images/slide-9.png';
import Scroll9 from '../../../Images/slide-10.png';
import Scroll10 from '../../../Images/slide-11.png';
import Scroll11 from '../../../Images/slide-12.png';
import Scroll12 from '../../../Images/slide-13.png';
import Scroll13 from '../../../Images/slide-14.png';
import Lap from '../../../Images/banner-lap.png';
import NavigationIcon from '@mui/icons-material/Navigation';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import User from '../../../Images/verify-left.png';
import User1 from '../../../Images/verify-left2.png';
import Product from '../../../Images/verify-right.png';
import Business from '../../../Images/verify-right2.png';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Card1 from '../../../Images/crypto-1.png';
import Card2 from '../../../Images/crypto-2.png';
import Card3 from '../../../Images/crypto-3.png';
import Brand1 from '../../../Images/security-1.png';
import Brand2 from '../../../Images/security-2.png';
import Brand3 from '../../../Images/security-3.png';
import Brand4 from '../../../Images/security-4.png';
import Brand5 from '../../../Images/security-5.png';
import Brand6 from '../../../Images/security-6.png';
import Brand7 from '../../../Images/security-7.png';
import Brand8 from '../../../Images/security-8.png';
import Industry from '../../../Images/industry-banner.png';
import Verfify from '../../../Images/verfify-img.png';
import Detail from '../../../Images/verfiy-detail.png';
import Sign from '../../../Images/sign-1.png';
import Sign1 from '../../../Images/sign-2.png';
import Sign2 from '../../../Images/sign-3.png';
import Sign3 from '../../../Images/sign-4.png';
import Sign4 from '../../../Images/sign-5.png';
import Sign5 from '../../../Images/sign-6.png';
import Customer from '../../../Images/step-img.png';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import 'aos/dist/aos.css';
import AOS from 'aos';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import { decryptData } from '../../../middleware';
import consts from '../../../constant';


const rows = [
    { img: `${Card1}`, text: 'Crypto', para: 'Access your data on any of your Mac, iPhone, and iPad at any time' },
    { img: `${Card2}`, text: 'Trading', para: 'Your data never leaves your device or your private iCloud.' },
    { img: `${Card3}`, text: 'Marketplaces', para: 'Your data never leaves your device or your private iCloud.' },
]
const brands = [
    { img: `${Brand1}` },
    { img: `${Brand2}` },
    { img: `${Brand3}` },
    { img: `${Brand4}` },
    { img: `${Brand5}` },
    { img: `${Brand6}` },
    { img: `${Brand7}` },
    { img: `${Brand8}` },
]

const sign = [
    { img: `${Sign}`, para: 'Sign Up' },
    { img: `${Sign1}`, para: 'UserVerification' },
    { img: `${Sign2}`, para: 'AML Screening' },
    { img: `${Sign3}`, para: 'Login' },
    { img: `${Sign4}`, para: 'Fraud Monitoring' },
    { img: `${Sign5}`, para: 'Transactions' },
]

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};



const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


const Landing = () => {

    const theme = useTheme();

    useEffect(() => {
        var user = window.localStorage.getItem('userType');

        if (window?.localStorage?.getItem('Rikosta') && user) {
            var userType = decryptData(user)
            if (userType == "organization" || userType == 'sub-admin') {
                window.location.href = '/dashboard'
            } else {
                window.location.href = '/individual/kyc'
            }
        }
    }, [])

    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(

            typeof value === 'string' ? value.split(',') : value,
        );
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

    useEffect(() => {
        AOS.init({
            duration: 1200, // Duration of animations
            once: true, // Whether animation should happen only once or every time you scroll up/down
        });
    }, []);

    return (
        <div className='landing-full'>
            <Header />
            <section className='banner-sctn'>
                <div className='contain-width'>
                    <h2 style={{ color: '#000' }}>Get more users globally with</h2>
                    <h1 style={{ color: '#000' }}>
                        Scalable user verification</h1>
                    <div className='verfication-btn display-1' style={{ justifyContent: "center", gap: "15px" }}>
                        <Link to="individual/register">
                            Individual Sign up

                            <NavigationIcon /></Link>
                        <Link to="individual/signin">Individual Sign In</Link>
                    </div>
                    <div className='banner-img'>
                        <img src={Banner} />
                    </div>
                    <div className='exchange-swiper'>
                        <div className='swiper-part'>
                            <div className='excahnge-scroll'>
                                <img src={Scroll} />
                            </div>
                            <div className='excahnge-scroll'>
                                <img src={Scroll1} />
                            </div>
                            <div className='excahnge-scroll'>
                                <img src={Scroll2} />
                            </div>
                            <div className='excahnge-scroll'>
                                <img src={Scroll3} />
                            </div>
                            <div className='excahnge-scroll'>
                                <img src={Scroll4} />
                            </div>
                            <div className='excahnge-scroll'>
                                <img src={Scroll5} />
                            </div>
                            <div className='excahnge-scroll'>
                                <img src={Scroll6} />
                            </div>
                            <div className='excahnge-scroll'>
                                <img src={Scroll7} />
                            </div>
                            <div className='excahnge-scroll'>
                                <img src={Scroll8} />
                            </div>
                            <div className='excahnge-scroll'>
                                <img src={Scroll9} />
                            </div>
                            <div className='excahnge-scroll'>
                                <img src={Scroll10} />
                            </div>
                            <div className='excahnge-scroll'>
                                <img src={Scroll11} />
                            </div>
                            <div className='excahnge-scroll'>
                                <img src={Scroll12} />
                            </div>
                            <div className='excahnge-scroll'>
                                <img src={Scroll13} />
                            </div>
                        </div>
                        <div className='swiper-part-two'>

                            <div className='excahnge-scroll'>
                                <img src={Scroll} />
                            </div>
                            <div className='excahnge-scroll'>
                                <img src={Scroll1} />
                            </div>
                            <div className='excahnge-scroll'>
                                <img src={Scroll2} />
                            </div>
                            <div className='excahnge-scroll'>
                                <img src={Scroll3} />
                            </div>
                            <div className='excahnge-scroll'>
                                <img src={Scroll4} />
                            </div>
                            <div className='excahnge-scroll'>
                                <img src={Scroll5} />
                            </div>
                            <div className='excahnge-scroll'>
                                <img src={Scroll6} />
                            </div>
                            <div className='excahnge-scroll'>
                                <img src={Scroll7} />
                            </div>
                            <div className='excahnge-scroll'>
                                <img src={Scroll8} />
                            </div>
                            <div className='excahnge-scroll'>
                                <img src={Scroll9} />
                            </div>
                            <div className='excahnge-scroll'>
                                <img src={Scroll10} />
                            </div>
                            <div className='excahnge-scroll'>
                                <img src={Scroll11} />
                            </div>
                            <div className='excahnge-scroll'>
                                <img src={Scroll12} />
                            </div>
                            <div className='excahnge-scroll'>
                                <img src={Scroll13} />
                            </div>
                        </div>
                    </div>
                    <div className='banner-info'>
                        <img src={Lap} />
                    </div>
                </div>
            </section>
            <section className='product'>
                <div className='contain-width'>
                    <h2>Products</h2>
                    <Box>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                <div className='user-verification'>
                                    <div className='verification-img'>
                                        <svg width="31" height="32" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.5625 26.8888H3.93311C3.23561 26.8888 2.65436 26.3075 2.65436 25.61V13.5587C2.65436 12.8031 3.04186 12.3769 3.77811 12.3769H4.35936V10.2069H3.15811C1.54999 10.2069 0.251862 11.505 0.251862 13.1131V26.1912C0.251862 27.7994 1.54999 29.0975 3.15811 29.0975H13.5625V26.8888ZM27.8612 10.1875H26.66V12.3575H27.2994C27.9969 12.3575 28.3456 12.7644 28.3456 13.4037V25.6294C28.3456 26.3269 27.7837 26.9081 27.0669 26.9081H17.4375V29.0781H27.8612C29.4694 29.0781 30.7675 27.78 30.7675 26.1719V13.0938C30.7675 11.4856 29.4694 10.1875 27.8612 10.1875Z" fill="var(--theme-color)" />
                                            <path d="M25.4394 3.40625C22.0875 3.85187 18.0769 5.16937 15.5194 6.73875C12.9425 5.16937 8.93186 3.85187 5.59937 3.40625V23.2656C8.35062 23.595 11.1987 24.2344 14.0856 25.3581L15.5387 25.9975L16.9919 25.3581C19.8787 24.2344 22.7269 23.5756 25.4781 23.2656V3.40625H25.4394ZM8.48624 21.0956V6.75812C10.5594 7.12625 12.9619 8.05625 14.0662 8.9475V22.665C12.4581 22.0062 10.2106 21.4056 8.48624 21.0956ZM22.5331 21.0956C20.8281 21.4056 18.5612 22.0062 16.9531 22.665V8.9475C18.0381 8.03687 20.46 7.12625 22.5331 6.75812V21.0956Z" fill="var(--theme-color)" />
                                        </svg>
                                        <h5>User Verification</h5>
                                    </div>

                                    <p>Verify users worldwide. Smooth online identity verification and compliance have finally come together</p>
                                    <div className='verfi-img' >
                                        <img src={User} />
                                    </div>

                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                                <div className='business text-center' data-aos="fade-up"
                                    data-aos-duration="3000">
                                    <img src={Product} />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                                <div className='business text-center' data-aos="fade-up"
                                    data-aos-duration="3000">
                                    <img src={Business} />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                <div className='user-verification'>
                                    <div className='verification-img'>
                                        <svg width="31" height="32" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.5625 26.8888H3.93311C3.23561 26.8888 2.65436 26.3075 2.65436 25.61V13.5587C2.65436 12.8031 3.04186 12.3769 3.77811 12.3769H4.35936V10.2069H3.15811C1.54999 10.2069 0.251862 11.505 0.251862 13.1131V26.1912C0.251862 27.7994 1.54999 29.0975 3.15811 29.0975H13.5625V26.8888ZM27.8612 10.1875H26.66V12.3575H27.2994C27.9969 12.3575 28.3456 12.7644 28.3456 13.4037V25.6294C28.3456 26.3269 27.7837 26.9081 27.0669 26.9081H17.4375V29.0781H27.8612C29.4694 29.0781 30.7675 27.78 30.7675 26.1719V13.0938C30.7675 11.4856 29.4694 10.1875 27.8612 10.1875Z" fill="var(--theme-color) " />
                                            <path d="M25.4394 3.40625C22.0875 3.85187 18.0769 5.16937 15.5194 6.73875C12.9425 5.16937 8.93186 3.85187 5.59937 3.40625V23.2656C8.35062 23.595 11.1987 24.2344 14.0856 25.3581L15.5387 25.9975L16.9919 25.3581C19.8787 24.2344 22.7269 23.5756 25.4781 23.2656V3.40625H25.4394ZM8.48624 21.0956V6.75812C10.5594 7.12625 12.9619 8.05625 14.0662 8.9475V22.665C12.4581 22.0062 10.2106 21.4056 8.48624 21.0956ZM22.5331 21.0956C20.8281 21.4056 18.5612 22.0062 16.9531 22.665V8.9475C18.0381 8.03687 20.46 7.12625 22.5331 6.75812V21.0956Z" fill="var(--theme-color) " />
                                        </svg>
                                        <h5>Business Verification</h5>
                                    </div>

                                    <p>Streamline your verification flow and welcome more companies to your business at record speeds</p>
                                    <div className='verfi-img'>
                                        <img src={User1} />
                                    </div>

                                </div>
                            </Grid>

                        </Grid>
                    </Box>
                </div>

            </section>
            <section className='industies'>
                <div className='contain-width'>
                    <h1>Industries we serve</h1>
                    <div className='industry-banner'>
                        <img src={Industry} />
                    </div>
                    <div className='turnkey-box'>
                        <p>Get a turnkey identity verification solution for your business</p>
                        <div className='crypto-card'>
                            <Grid container spacing={2}>
                                {rows.map((row, ind) => {
                                    return (<>
                                        <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                                            <Card>


                                                <CardContent className='industry-para text-center'>
                                                    <div>
                                                        <img src={row.img} />
                                                    </div>
                                                    <div>
                                                        <h6>{row.text}</h6>
                                                        <p>{row.para}</p>
                                                    </div>
                                                </CardContent>

                                            </Card>
                                        </Grid>
                                    </>)
                                })}
                            </Grid>
                        </div>
                    </div>
                </div>
            </section>
            <section className='full-security'>
                <div className='contain-width'>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <h2>Full security
                                & compliance</h2>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <div className='brand-logo display-1'>
                                {brands.map((col, ind) => {
                                    return (<>

                                        <div className='compliance-brand'>
                                            <img src={col.img} />
                                        </div>
                                    </>)
                                })}
                            </div>
                        </Grid>
                    </Grid>
                </div>

            </section>
            <section className='verifys'>
                <div className='contain-width'>
                    <div className='verify-box'>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                <h2>Verify anything,
                                    expand anywhere</h2>
                                <p>The entire world is at your fingertips. With  {consts.pageTitle}{' '} 
                                    AI-based OCR, no document type, country, or
                                    typescript will stop you from growing business abroad.</p>
                                <div className='verfify-img'>
                                    <img src={Verfify} />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <div className='detail-img'>
                                    {/* <img src={Detail} /> */}
                                    <div className='detail-box'>
                                        <h6>Select your country</h6>
                                        <div className='verfify display-1'>
                                            <div className='select-option'>
                                                <label>Select country</label>
                                                <FormControl sx={{ mt: 1, width: 250 }}>
                                                    <Select
                                                        multiple
                                                        displayEmpty
                                                        value={personName}
                                                        onChange={handleChange}
                                                        input={<OutlinedInput />}
                                                        renderValue={(selected) => {
                                                            if (selected.length === 0) {
                                                                return <em>Aruba</em>;
                                                            }

                                                            return selected.join(', ');
                                                        }}
                                                        MenuProps={MenuProps}
                                                        inputProps={{ 'aria-label': 'Without label' }}
                                                    >
                                                        <MenuItem disabled value="">
                                                            <em>Placeholder</em>
                                                        </MenuItem>
                                                        {names.map((name) => (
                                                            <MenuItem
                                                                key={name}
                                                                value={name}
                                                                style={getStyles(name, personName, theme)}
                                                            >
                                                                {name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className='verfiy-btn'>
                                                <Link to="/applicant3">Verify</Link>
                                            </div>

                                        </div>
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


                                            <div className="display-2 margin-top">
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

                                    </div>
                                </div>
                            </Grid>
                        </Grid>

                    </div>
                </div>

            </section>
            <section className='secure-sctn'>
                <div className='contain-width'>
                    <Box className="secure-width">
                        <h2>Secure every step of the customer journey</h2>
                        <div className='whole-secure'>
                            <Grid container spacing={2}>
                                {sign.map((step, ind) => {
                                    return (<>
                                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>

                                            <div className='sign-card' data-aos="fade-up"
                                                data-aos-duration="3000">
                                                <div className='sign-brand'>
                                                    <img src={step.img} />
                                                </div>
                                                <h6>{step.para}</h6>
                                            </div>

                                        </Grid>
                                    </>)
                                })}
                            </Grid>
                        </div>
                        <div className='customer-img'>
                            <img src={Customer} />
                        </div>

                    </Box>
                </div>




            </section>

            <Footer />
        </div>
    )
}

export default Landing
