import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Logo from '../../../Images/logo.png';
import { Link, useNavigate } from 'react-router-dom'
import './Login.css';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import Google from '../../../Images/google-icon.png';
import { Button } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { decryptData } from '../../../middleware';
import Axios from '../../../Axios';
import toast from 'react-hot-toast';
const SignUp = () => {

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

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [company, setCompany] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [nameError, setNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [companyError, setCompanyError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")

    const [check1, setCheck1] = useState(false)
    const [check2, setCheck2] = useState(false)
    const [check3, setCheck3] = useState(false)

    const [status, setStatus] = useState(false)

    const [showPassword, setShowPassword] = React.useState(false);
    const [hidePassword, setHidePassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickHidePassword = () => setHidePassword((show) => !show);

    const navigate = useNavigate()

    const handleSubmit = async () => {
        try {
            console.log(check1, check2, check3)
            const pattern = /^[a-zA-Z0-9._%+-]+@(?!gmail\.com|yahoo\.com|hotmail\.com|mailinator\.com|outlook\.com|aol\.com)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;;
            if (name === "") {
                setNameError("Name is Required")
            } else if (email === "") {
                setEmailError("Email is Required")
            }
            else if (!pattern.test(email)) {
                setEmailError("Please Enter a Company Email")
            }
            else if (company === "") {
                setCompanyError("Company name is Required")
            } else if (password === "") {
                setPasswordError("Please Enter Password")
            } else if (confirmPassword === "") {
                setConfirmPasswordError("Please Enter Confirm Password")
            } else if ((check1 == false) || (check2 == false) || (check3 == false)) {
                setPasswordError("Please Enter Correct Format")
            } else if (password != confirmPassword) {
                setConfirmPasswordError("Password Does Not Match")
            } else {
                const regex = /^[a-zA-Z0-9._%+-]+@(?!gmail\.com|yahoo\.com|hotmail\.com|mailinator\.com|outlook\.com|aol\.com)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (regex.test(email)) {
                    setStatus(true)
                    var payload = {
                        name: name,
                        email: email,
                        company_name: company,
                        password: password,
                        user_type: "organization"
                    }
                    const { data } = await Axios.post('/register', payload)
                    if (data?.success) {
                        window.localStorage.setItem('email', email)
                        setStatus(false)
                        toast.success("Registered Successfully")
                        navigate('/activate')
                    } else {
                        setStatus(false)
                    }
                } else {
                    setEmailError("Please Enter a Company Email")
                }
            }
        } catch (error) {
            setStatus(false)
            if (error?.status == 422) {
                setEmailError(error?.response?.data?.message)
            }
            console.log("🚀 ~ handleSubmit ~ error:", error)
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission if in a form context
            handleSubmit();
        }
    };

    return (
        <div className='login-full reg' style={{ height: '100vh', overflow: 'hidden' }}>
            <div className='login-bg'>
                <div className='logo-bar'>
                    <Link to="/"><img src={Logo} />
                    </Link>
                </div>
                <h1>Welcome to APZKYC</h1>
                <p>Already have an account? <Link style={{ marginLeft: "5px" }} to="/login">Log in</Link></p>
                <div className='textfield'>
                    <div className='email-filed'>
                        <label className='display-1'>Full name <HelpOutlinedIcon /></label>
                        <TextField fullWidth id="fullWidth" placeholder='John Smith' onChange={(e) => { setName(e.target.value); setNameError("") }} onKeyDown={handleKeyDown} />
                        <div>{nameError ? <p style={{ color: "red" }}>{nameError}</p> : ""}</div>
                    </div>
                    <div className='email-filed'>
                        <label className='display-1'>Work Email</label>
                        <TextField fullWidth id="fullWidth" placeholder='name@company.com' onChange={(e) => {
                            setEmail(e.target.value);
                            const pattern = /^[a-zA-Z0-9._%+-]+@(?!gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|mailinator\.com|aol\.com)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;;
                            // if (!pattern.test(e.target.value)) {
                            //     setEmailError("Please Enter a Company Email")
                            // } else {
                            setEmailError("")
                            // }
                        }} onKeyDown={handleKeyDown} />
                        <div>{emailError ? <p style={{ color: "red" }}>{emailError}</p> : ""}</div>
                    </div>
                    <div className='email-filed'>
                        <label className='display-1'>Full company name <HelpOutlinedIcon /></label>
                        <TextField fullWidth id="fullWidth" placeholder='Company name' onChange={(e) => { setCompany(e.target.value); setCompanyError("") }} onKeyDown={handleKeyDown} />
                        <div>{companyError ? <p style={{ color: "red" }}>{companyError}</p> : ""}</div>
                    </div>

                    <div className='textfield'>
                        <div className='email-filed'>
                            <label>Password </label>
                            <FormControl sx={{ width: '97%' }} variant="outlined">
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
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setPasswordError("")
                                        var value = e.target.value
                                        const regex = /(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/;
                                        const regex_word = /(?=.*[a-z])(?=.*[A-Z])/;
                                        if (value.length >= 7) {
                                            setCheck1(true)
                                        } else {
                                            setCheck1(false)
                                        }
                                        if (regex.test(value)) {
                                            setCheck2(true)
                                        } else {
                                            setCheck2(false)
                                        }
                                        if (regex_word.test(value)) {
                                            setCheck3(true)
                                        } else {
                                            setCheck3(false)
                                        }
                                        if (password != e.target.value) {
                                            setConfirmPasswordError("")
                                        }
                                    }}
                                    onKeyDown={handleKeyDown}
                                />
                            </FormControl>
                            <div>{passwordError ? <p style={{ color: "red" }}>{passwordError}</p> : ""}</div>
                        </div>
                        <div className='email-filed'>
                            <label>Confirm password</label>
                            <FormControl sx={{ width: '97%' }} variant="outlined">
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={hidePassword ? 'text' : 'password'}
                                    placeholder='Confirm Password'
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickHidePassword}
                                                edge="end"
                                            >
                                                {hidePassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        if (password) {
                                            if (password != e.target.value) {
                                                setConfirmPasswordError("Password Does Not Match")
                                            } else {
                                                setConfirmPasswordError("");
                                            }
                                        } else {
                                            setConfirmPasswordError("");
                                        }
                                    }}
                                    onKeyDown={handleKeyDown}
                                />
                            </FormControl>
                            <div>{confirmPasswordError ? <p style={{ color: "red" }}>{confirmPasswordError}</p> : ""}</div>
                        </div>
                        <div className='disclamier'>
                            <List>
                                <ListItem> {check1 == true ? <CheckCircleOutlineOutlinedIcon className='tick' /> : <HighlightOffOutlinedIcon />} 7 or more characters</ListItem>
                                <ListItem> {check2 == true ? <CheckCircleOutlineOutlinedIcon className='tick' /> : <HighlightOffOutlinedIcon />}  Numbers & symbols</ListItem>
                                <ListItem> {check3 == true ? <CheckCircleOutlineOutlinedIcon className='tick' /> : <HighlightOffOutlinedIcon />} Mix of letters (upper and lower cases)</ListItem>
                            </List>
                        </div>
                        <div className='submit-button cursor'>
                            <Button onClick={() => { handleSubmit() }} >Continue</Button>
                        </div>
                        <div className='copy-rght'>
                            <p>Apzkyc Ltd 2024. All rights reserved.</p>
                            <Link>Cookie preferences, </Link>
                            <Link>Privacy, </Link>
                            <Link>Terms.</Link>
                        </div>
                    </div>
                    <div className='or-col'><span>or</span></div>

                    <div className='sign-up-google display-1'>
                        <div>
                            <img src={Google} />
                        </div>
                        <div>
                            <Link to="">Sign up with a corporate Google account</Link>
                        </div>
                    </div>
                    {/* <div className='privacy-note'>
                        <p>I warrant and represent that I am duly authorized to proceed with the
                            registration on behalf of the legal entity to which the email address (and
                            other relevant data, if any) specified hereby pertains (the "Company"). I
                            confirm that the Company fully acknowledges, accepts and consents to
                            APZKYC's <Link to="">Terms and Conditions</Link> and <Link>Privacy Notice</Link> </p>
                    </div> */}
                    <div className='copy-rght'>
                        <p>Apzkyc Ltd 2024. All rights reserved.</p>
                        <Link>Cookie preferences, </Link>
                        <Link>Privacy, </Link>
                        <Link>Terms.</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
