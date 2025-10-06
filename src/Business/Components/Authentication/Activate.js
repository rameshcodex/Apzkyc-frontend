import React, { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Login.css';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Logo from '../../../Images/logo.png';
import Axios from '../../../Axios';
import toast from 'react-hot-toast';
import consts from '../../../constant';


const Activate = () => {

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
            event.preventDefault();
            console.log(otp, "otp")
            const otpString = otp.join('');
            console.log("🚀 ~ handleSubmit ~ otpString:", otpString)
            if (otpString.length !== 6) {
                setOtpErr("Please Enter OTP")
            } else {
                setLoad(true);
                const { data } = await Axios.post('/verify', {
                    email: window.localStorage.getItem('email'),
                    otpcode: otpString
                })
                console.log(data, "data")
                if (data?.success == true) {
                    setOtpErr("");
                    toast.success(data?.message);
                    window.localStorage.removeItem('email');

                    if (data?.result == "individual") {
                        setTimeout(() => {
                            navigate('/individual/signin');
                        }, 1000);
                    } else {
                        setTimeout(() => {
                            navigate('/login');
                        }, 1000);
                    }


                } else {
                    setOtpErr(data?.message)
                }
            }
        } catch (error) {
            console.log("🚀 ~ handleSubmit ~ error:", error)
        } finally {
            setLoad(!true);
        }
    };

    return (
        <div className='login-full activate'>
            <div className='contain-width display-1' style={{ height: "100%" }}>
                <div className='login-bg'>

                    <div className='back-btn'>
                        <Link to="/signup"> <ArrowBackIosIcon /> Back</Link>
                    </div>

                    <div className='logo-bar'>
                        <Link to="/"><img src={consts.projectLogo} />
                        </Link>

                    </div>
                    <h1>Activate your account</h1>
                    <p>We've sent you a confirmation code via email <Link style={{ margin: '0 5px' }} to="">  no-reply@{consts.titleMail}.com</Link>
                        Please enter it below</p>
                    <div className='textfield'>
                        {/* <form onSubmit={handleSubmit}> */}
                        <Grid container spacing={2} justifyContent="center">
                            {otp.map((digit, index) => (
                                <Grid item key={index}>
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
                        {/* <p>Didn't receive the code? <Link to="">Resend code</Link></p> */}
                        <div className='submit-button cursor'>
                            <Button disabled={load} onClick={(e) => { handleSubmit(e) }} >Continue</Button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default Activate;
