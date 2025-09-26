import React, { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Login.css';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Logo from '../../../Images/logo.png';
import Axios from '../../../Axios';
import toast from 'react-hot-toast';
import { decryptData } from '../../../middleware';

const TwoFactor = () => {

    const [load, setLoad] = useState(false);
    const [otp, setOtp] = useState(Array(6).fill(''));
    const [otpErr, setOtpErr] = useState("")
    const inputRefs = useRef([]);

    const navigate = useNavigate()

    const handleChange = (index, event) => {
        setOtpErr("")
        const value = event.target.value;
        if (/^[0-9]$/.test(value) || value === '') {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, event) => {
        if (event.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (event) => {
        try {
            const userType = decryptData(window.localStorage.getItem('userType'))
            event.preventDefault();
            // console.log(otp, "otp")
            const otpString = otp.join('');
            if (otpString.length !== 6) {
                toast.error("Please Enter OTP")
            } else {
                setLoad(true);
                const { data } = await Axios.post('/verifyTwoFAOtp', {
                    secret: otpString
                }, {
                    headers: {
                        Authorization: window.localStorage.getItem('Rikosta')
                    }
                })
                if (data?.success == true) {
                    toast.success(data?.message)
                    setTimeout(() => {
                        if (userType == "organization" || userType == 'sub-admin') {
                            navigate('/dashboard')
                        } else {
                            navigate('/individual/kyc')
                        }
                    }, 1000);
                } else {
                    toast.error(data?.message)
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
            console.log("🚀 ~ handleSubmit ~ error:", error)
        } finally {
            setLoad(!true);
        }
    };

    return (
        <div className='login-full activate TwoFactor'>
            <div className='contain-width display-1' style={{ height: "100%" }}>
                <div className='login-bg'>

                    <div className='back-btn'>
                        <Link to="/signup"> <ArrowBackIosIcon /> Back</Link>
                    </div>

                    <div className='logo-bar'>
                        <Link to="/"><img src={Logo} />
                        </Link>

                    </div>
                    <h1>Two Factor Authentication</h1>
                    {/* <p>We've sent you a confirmation code via email <Link style={{ margin: '0 5px' }} to="">  no-reply@apzkyc.com</Link>
                        Please enter it below</p> */}
                    <div className='textfield'>
                        {/* <form onSubmit={handleSubmit}> */}
                        <Grid container spacing={2} justifyContent="center">
                            {otp.map((digit, index) => (
                                <Grid item key={index} xl={2} lg={2} md={2} sm={2} xs={2}>
                                    <TextField
                                        inputRef={(ref) => (inputRefs.current[index] = ref)}
                                        value={digit}
                                        onChange={(event) => handleChange(index, event)}
                                        onKeyDown={(event) => handleKeyDown(index, event)}
                                        variant="outlined"
                                        margin="normal"
                                        type="text"
                                        inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
                                    />
                                </Grid>
                            ))}
                            <div>{otpErr ? <p style={{ color: "red" }}>{otpErr}</p> : ""}</div>
                            {/* {otpErr && <Typography sx={{ color: "error" }}>{otpErr}</Typography>} */}
                        </Grid>
                        {/* </form> */}
                        <div className='submit-button cursor'>
                            <Button disabled={load} onClick={(e) => { handleSubmit(e) }} >Submit</Button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default TwoFactor;
