import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Logo from '../../../Images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Apzykyc from '../../../Images/individual/apzkyc-logo.png';
import LoginBanner from '../../../Images/individual/login-img.png';
import RegSta from '../../../Images/regsta.png';
import './Login.css'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Button } from '@mui/material';
import Axios from '../../../Axios';
import toast from 'react-hot-toast';
import { Triangle } from 'react-loader-spinner'
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { decryptData } from '../../../middleware';
import consts from '../../../constant';


const Register = () => {

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

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const theme = useTheme();
    const mdScreen = useMediaQuery(theme.breakpoints.up('md'));
    const navigate = useNavigate();

    const handleRegister = async () => {

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
        // const regex = /^[a-zA-Z0-9._%+-]+@(?!gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|aol\.com)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        try {

            if (name === "") {
                setNameError("Name is Required");
            } else if (name.length < 4) {
                setNameError("Min 4 Characters Required");
            } else if (email === "") {
                setEmailError("Email is Required");
            } else if (password === "") {
                setPasswordError("Please Enter Password");
            } else if (!passwordRegex.test(password)) {
                setPasswordError("Password must contain at least 1 uppercase, 1 special character, 1 number, and be at least 8 characters long");
            } else if (confirmPassword === "") {
                setConfirmPasswordError("Please Confirm Your Password");
            } else if (password != confirmPassword) {
                setConfirmPasswordError("Password Does Not Match");
            } else {
                console.log(regex.test(email), "email");

                if (regex.test(email)) {
                    setIsLoading(true);
                    var payload = {
                        name: name,
                        email: email,
                        company_name: "apzykyc",
                        password: password,
                        user_type: "individual"
                    }
                    const { data } = await Axios.post('/register', payload);
                    if (data?.success) {
                        window.localStorage.setItem('email', email)
                        toast.success("Registered Successfully");
                        navigate('/activate');
                    } else {
                        toast.error(data?.message);
                    }
                    console.log(data, "dadadada");
                } else {
                    setEmailError("Please Enter a Valid Email");
                }
            }
        } catch (error) {
            if (error?.status == 422) {
                setEmailError(error?.response?.data?.message)
            } else {
                console.log(error, "error in register");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='individual-signin' style={{ height: '100vh' }}>
            <Box sx={{ height: '100%' }} >
                <Grid container spacing={4} sx={{ height: '100%' }}>
                    {mdScreen && <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                        <div className="login-left-part">
                            <div className="logo-part">
                                <Link to='/'>
                                    <img src={consts.projectRegister} alt="Apzykyc" />
                                </Link>

                            </div>
                            <div className="login-banner" style={{ display: 'flex', alignItems: 'flex-end', height: '100%' }}>
                                <img src={RegSta} alt="LoginBanner" />
                            </div>
                        </div>
                    </Grid>}
                    <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
                        <div className="register-acctn trouble-shoot">

                            {mdScreen && <p>Having trouble? <Link to=''>Get help </Link></p>}
                        </div>

                        <div className='login-grid' style={{ marginTop: !mdScreen && '20px' }}>
                            <h1 className='cracct'>Create an account</h1>
                            <p className='cracct-desc'>Sign up with your email address so that your information is not lost and safe
                                with us.</p>

                            <div className="individual-form">
                                <div className="display-2" style={{ flexFlow: 'wrap' }}>
                                    <div className='email-filed phr'>
                                        <div className='display-1 fllname'>Full Name</div>
                                        <TextField placeholder='Enter full name' style={{ width: !mdScreen ? '100%' : '280px' }} onChange={(e) => { setName(e.target.value); setNameError(""); }} />
                                        <div>{nameError ? <p style={{ color: "red" }}>{nameError}</p> : ""}</div>
                                    </div>
                                    <div className='email-filed phr'>
                                        <div className='display-1 fllname'>Email</div>
                                        {/* <TextField placeholder='Enter nick name' style={{ width: !mdScreen ? '100%' : '280px' }} /> */}
                                        <TextField placeholder='Enter Your Email' style={{ width: !mdScreen ? '100%' : '280px' }} onChange={(e) => { setEmail(e.target.value); setEmailError(""); }} />
                                        <div>{emailError ? <p style={{ color: "red" }}>{emailError}</p> : ""}</div>
                                    </div>
                                </div>

                                <div className='email-filed phr'>
                                    {/* <div className='display-1 fllname'>Email<span>(Default)</span></div> */}
                                    <div className='display-1 fllname'>Password</div>
                                    {/* <TextField placeholder='Enter email address' /> */}
                                    <FormControl variant="outlined" style={{ width: !mdScreen ? '100%' : '280px' }}>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder='Enter Your Password'
                                            onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
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

                                    <div>{passwordError ? <p style={{ color: "red" }}>{passwordError}</p> : ""}</div>
                                </div>
                                <div className='email-filed phr'>
                                    {/* <div className='display-1 fllname'>Phone <span>(Default)</span></div> */}
                                    <div className='display-1 fllname'>Confirm Password</div>
                                    {/* <TextField placeholder='Enter phone number' /> */}
                                    <FormControl variant="outlined" style={{ width: !mdScreen ? '100%' : '280px' }}>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={showPassword1 ? 'text' : 'password'}
                                            placeholder='Confirm Your Password'
                                            onChange={(e) => { setConfirmPassword(e.target.value); setConfirmPasswordError(""); }}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword1}
                                                        edge="end"
                                                    >
                                                        {showPassword1 ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }


                                        />
                                    </FormControl>

                                    <div>{confirmPasswordError ? <p style={{ color: "red" }}>{confirmPasswordError}</p> : ""}</div>

                                </div>
                                <div className={!mdScreen ? 'individual-submit save-btn text-center' : 'individual-submit save-btn'}>
                                    {/* <Link to='/individual/createpswd'></Link> */}
                                    <Button variant="contained" disabled={isLoading} onClick={() => { handleRegister() }}>{isLoading ? (<> <Triangle color="#1b7ce5" height={30} width={50} /> Please wait... </>)
                                        : "Register"}</Button>
                                </div>

                                <div className="register-acctn sign-acctn margin-top">
                                    <p>Already have an account?<Link to='/individual/signin'> Log in</Link></p>
                                </div>
                            </div>

                        </div>


                    </Grid>
                </Grid>
            </Box>
        </div >
    )
}

export default Register
