import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Logo from '../../../Images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import Axios from '../../../Axios';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import toast from 'react-hot-toast';
import consts from '../../../constant';

const Resend = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [email, setEmail] = useState("")

    const [emailError, setEmailError] = useState("")

    const [status, setStatus] = useState(false)

    const navigate = useNavigate()

    const submits = async () => {
        try {
            if (email === "") {
                setEmailError("Email is Required")
            } else {
                setStatus(true)
                const { data } = await Axios.post('/re_send', { email: email })
                console.log(data, "data")
                if (data?.success == true) {
                    window.localStorage.setItem('email', email)
                    setStatus(false)
                    toast.success(data?.message)
                    setTimeout(() => {
                        navigate('/activate')
                    }, 1000);
                } else {
                    setStatus(false)
                    // toast.error(data?.message)
                    setEmailError(data?.message)
                }
            }
        } catch (error) {
            setStatus(false)
            console.log("��� ~ submits ~ error:", error)
        }
    }

    return (
        <div className='signin-full contain-width'>
            <Box>
                <Grid container style={{ height: '100vh', alignItems: 'center' }}>

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <div className='login-bg'>
                            <div className='back-btn'>
                                <Link to="/login"> <ArrowBackIosIcon /> Back</Link>
                            </div>

                            <div className='logo-bar'>
                                <Link to="/"><img src={consts.projectLogo} />
                                </Link>
                            </div>
                            <div className='padding-10 text-center'>Resend Verification Mail</div>
                            <div className='textfield'>
                                <div className='email-filed'>
                                    <TextField inputProps={{ autoComplete: 'off' }} fullWidth id="fullWidth" placeholder='Business email address *' onChange={(e) => { setEmailError(""); setEmail(e.target.value) }} />
                                    <div>{emailError ? <p style={{ color: "red" }}>{emailError}</p> : ""}</div>
                                </div>
                                <div className='submit-button cursor'>
                                    <Button disabled={status} onClick={() => { submits() }}>Resend</Button>
                                </div>

                                {/* <p>Don't have an account?<Link style={{ marginLeft: "5px" }} to="/signup">Sign Up</Link></p> */}
                                {/* <div className='privacy-note'>
                                    <p>By submitting the form, you agree that your personal data will be processed to
                                        provide you with the product demo, including contacting via email and phone, and for the purposes you agreed to above in accordance with the <Link>Privacy Notice</Link> </p>
                                </div> */}

                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default Resend
