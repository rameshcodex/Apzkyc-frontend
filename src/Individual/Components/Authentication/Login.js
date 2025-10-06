import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Logo from '../../../Images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Apzykyc from '../../../Images/individual/apzkyc-logo.png';
import LoginBanner from '../../../Images/individual/login-img.png';
import './Login.css'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import toast from 'react-hot-toast';
import Axios from '../../../Axios';
import { Button } from '@mui/material';
import { encryptData, decryptData } from '../../../middleware'
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


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [status, setStatus] = useState(false)

    const navigate = useNavigate()
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const theme = useTheme();
    const mdScreen = useMediaQuery(theme.breakpoints.up('md'));

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (email === "") {
                setEmailError("Email is Required")
            } else if (password === "") {
                setPasswordError("Password is Required")
            } else {
                const { data } = await Axios.post('/login', {
                    email: email,
                    password: password
                })
                if (data?.success) {
                    window.localStorage.setItem('userType', encryptData(data?.result?.user?.user_type))
                    window.localStorage.setItem('Rikosta', data?.result?.token)
                    setStatus(false)
                    toast.success("Logged In Successfully")
                    if (data?.result?.user?.user_type == "organization" || data?.result?.user?.role == "sub-admin") {
                        navigate('/dashboard')
                    } else {
                        navigate('/individual/kyc')
                    }
                    // navigate('/individual/kyc')
                } else {
                    toast.error(data?.message)
                }
            }
        } catch (error) {
            console.log("🚀 ~ handleSubmit ~ error:", error)
            setStatus(false)
            if (error?.status == 404) {
                setEmailError(error?.response?.data?.message)
            } else if (error?.status == 409) {
                setPasswordError(error?.response?.data?.message)
            }
            else {
                toast.error(error?.response?.data?.message)
            }
        }
    }

    return (
        <div className='individual-signin' style={{ height: '100vh' }}>
            <Box sx={{ height: '100%' }}>
                <Grid container spacing={0} sx={{ height: '100%' }}>
                    {mdScreen && <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                        <div className="login-left-part">
                            <div className="logo-part">
                                <Link to='/'>
                                    <img src={consts.projectRegister} alt="Apzykyc" />
                                </Link>

                            </div>
                            <div className="login-banner" style={{ display: 'flex', alignItems: 'flex-end', height: '100%' }}>
                                <img src={LoginBanner} alt="LoginBanner" />
                            </div>
                        </div>
                    </Grid>}
                    <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
                        <div className="register-acctn trouble-shoot">

                            <p>Having trouble? <Link to=''>Get help </Link></p>
                        </div>
                        <div className='login-grid'>
                            <h1 className='cracct'>Login <span>✌</span></h1>
                            <p className='cracct-desc'>Thank you for get back to {consts.pageTitle}.</p>

                            <div className="individual-form">
                                <div className='email-filed phr'>
                                    <label className='display-1 fllname'>Email</label>
                                    <TextField placeholder='Enter email address' onChange={(e) => { setEmail(e.target.value); setEmailError("") }} />
                                    <div className='invalid-error'>{emailError ? <p style={{ textAlign: "left" }}>{emailError}</p> : ""}</div>
                                </div>
                                <div className='email-filed phr'>
                                    <label className='display-1 fllname'>Password</label>
                                    <FormControl variant="outlined">
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder='Password'
                                            onChange={(e) => { setPassword(e.target.value); setPasswordError("") }}
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
                                        />
                                    </FormControl>
                                    <div className="display-2">
                                        <div className='invalid-error'>{passwordError ? <p style={{ textAlign: "left" }}>{passwordError}</p> : ""}</div>
                                        <div className='forget-link fllname'>
                                            <Link to='/verifyemail'>Forgot Password?</Link>
                                        </div>
                                    </div>

                                </div>
                                <div className='individual-submit margin-t-30px'>
                                    {/* <Link to='/individual/kyc'>Submit</Link> */}
                                    <Button variant="contained" onClick={(e) => { handleSubmit(e) }} disabled={status} >Submit</Button>
                                </div>

                                <div className="register-acctn">
                                    <p>Don't have an account? <Link to='/individual/register'>Sign up</Link></p>
                                </div>
                            </div>

                        </div>


                    </Grid>
                </Grid>
            </Box>
        </div >
    )
}

export default Login
