import React, { useEffect, useState } from 'react';
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
// import toast from 'react-hot-toast';
import toast, { Toaster } from 'react-hot-toast';
import { encryptData } from '../../../middleware'
import { decryptData } from '../../../middleware';
import consts from '../../../constant';


const Login = () => {

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

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [status, setStatus] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        try {
            if (email === "") {
                setEmailError("Email is Required")
            } else if (password === "") {
                setPasswordError("Password is Required")
            } else {
                setStatus(true)
                const { data } = await Axios.post('/login', {
                    email: email,
                    password: password
                })
                if (data?.success) {
                    window.localStorage.setItem('Rikosta', data?.result?.token)
                    if (data?.result?.user?.role === 'sub-admin') {
                        window.localStorage.setItem('subadmin', JSON.stringify(data?.result?.user))
                        window.localStorage.setItem('userType', encryptData(data?.result?.user?.role))
                    }
                    else {
                        window.localStorage.setItem('userType', encryptData(data?.result?.user?.user_type))
                    }
                    setStatus(false)
                    toast.success("Logged In Successfully")
                    const twofastatus = await Axios.get('/checkTwoFactorAuth', {
                        headers: {
                            Authorization: window.localStorage.getItem('Rikosta')
                        }
                    })
                    if (twofastatus?.data?.success) {
                        navigate('/twofactor')
                    } else {
                        if (data?.result?.user?.user_type == "organization" || data?.result?.user?.role == 'sub-admin') {
                            navigate('/dashboard')
                        } else {
                            navigate('/individual/kyc')
                        }
                    }
                } else {
                    console.log("🚀 ~ handleSubmit ~ data:", data)
                    if (data?.status == 201) {
                        navigate('/plansublogin')
                    }
                    toast.error(data?.message)
                    setStatus(false)
                }
            }
        } catch (error) {
            console.log("🚀 ~ handleSubmit ~ error:", error)
            setStatus(false)
            if (error?.status == 404) {
                setEmailError(error?.response?.data?.message)
                toast.error('email not found')

            } else if (error?.status == 409) {
                setPasswordError(error?.response?.data?.message)
            }
            else {
                toast.error(error?.response?.data?.message)
            }
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission if in a form context
            handleSubmit();
        }
    };

    return (
        <div className='signin-full contain-width'>
            <Box>
                <Grid container style={{ height: '100vh', alignItems: 'center' }}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <div className='signin-left'>
                            <h2>Scale globally with the highest
                                pass rates on the market</h2>
                            <p>“After we signed with {consts.pageTitle} and integrated their tool, we
                                managed to increase the speed of verification by more than 4
                                times. Concurrently, the number of our clients increased by
                                more than 3 times.”</p>
                            <h5>Join 2500+ companies</h5>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <div className='login-bg'>
                            <div className='logo-bar'>
                                <Link to="/"><img src={consts.projectLogo} />
                                </Link>
                            </div>
                            <h1>Get started</h1>
                            <div className='textfield'>
                                <div className='email-filed'>
                                    <TextField inputProps={{ autoComplete: 'off' }} fullWidth id="fullWidth" placeholder='Business email address *' onChange={(e) => { setEmail(e.target.value); setEmailError("") }} onKeyDown={handleKeyDown} />
                                    <div>{emailError ? <p style={{ color: "red" }}>{emailError}</p> : ""}</div>

                                </div>
                                <div className='email-filed'>
                                    <FormControl sx={{ width: '100%' }} variant="outlined" inputProps={{ autoComplete: 'off' }}>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder='Password'
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
                                            onKeyDown={handleKeyDown}
                                        />
                                    </FormControl>
                                    <div>{passwordError ? <p style={{ color: "red" }}>{passwordError}</p> : ""}</div>
                                </div>
                                <div className='submit-button cursor'>
                                    <Button onClick={handleSubmit} disabled={status}>Submit</Button>
                                </div>

                                <p>Don't have an account?<Link style={{ marginLeft: "5px" }} to="/signup">Sign Up</Link></p>
                                <p>Don't recieve mail?<Link style={{ marginLeft: "5px" }} to="/resend">Resend Verification Mail</Link></p>
                                <p><Link style={{ marginLeft: "5px" }} to="/verifyemail">Forgot Password?</Link></p>
                                {/* <div className='privacy-note'>
                                    <p>By submitting the form, you agree that your personal data will be processed to
                                        provide you with the product demo, including contacting via email and phone, and for the purposes you agreed to above in accordance with the <Link>Privacy Notice</Link> </p>
                                </div> */}

                            </div>
                        </div>
                    </Grid>
                </Grid>
                <Toaster />


            </Box>
        </div>
    )
}

export default Login
