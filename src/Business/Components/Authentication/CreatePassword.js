import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import '../../../Media.css'
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
import Logo from '../../../Images/logo.png';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Axios from '../../../Axios';
import toast from 'react-hot-toast';


const CreatePassword = () => {

    const [showPassword, setShowPassword] = React.useState(false);
    const [hidePassword, setHidePassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickHidePassword = () => setHidePassword((show) => !show);

    const navigate = useNavigate()

    const [otp, setOtp] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [otpError, setOtpError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")

    const [check1, setCheck1] = useState(false)
    const [check2, setCheck2] = useState(false)
    const [check3, setCheck3] = useState(false)



    const [status, setStatus] = useState(false)

    const changePassword = async () => {
        try {
            if (otp === "") {
                setOtpError("OTP is Required")
            } else if (password === "") {
                setPasswordError("Password is Required")
            }
            else if ((check1 == false) || (check2 == false) || (check3 == false)) {
                setPasswordError("Please Enter Correct Format")
            } else if (confirmPassword === "") {
                setConfirmPasswordError("Confirm Password is Required")
            }

            else if (password != confirmPassword) {
                setConfirmPasswordError("Password Does Not Match")
            } else {
                setStatus(true)
                const { data } = await Axios.post('/change_password', {
                    otp: otp,
                    password: password
                })
                if (data?.success) {
                    setStatus(false)
                    toast.success(data?.message)
                    setTimeout(() => {
                        navigate('/login')
                    }, 1000);
                } else {
                    setStatus(false)
                    toast.error(data?.message)
                }
            }
        } catch (error) {
            console.log("🚀 ~ changePassword ~ error:", error)
        }
    }


    return (
        <div className='register-full' style={{ height: '100vh', overflow: 'hidden' }}>
            <div className='contain-width'>
                <div className='login-bg'>
                    <div className='logo-bar'>
                        <Link to="/"><img src={Logo} />
                        </Link>
                    </div>
                    <h1>Forgot password</h1>
                    <div className='textfield'>
                        <div className='email-filed'>
                            <label>OTP </label>
                            <TextField fullWidth id="fullWidth" onChange={(e) => { setOtp(e.target.value); setOtpError("") }} />
                            <div>{otpError ? <p style={{ color: "red" }}>{otpError}</p> : ""}</div>
                        </div>
                        <div className='email-filed'>
                            <label>Password </label>
                            <FormControl sx={{ width: '97%' }} variant="outlined">
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={(e) => {
                                        setPassword(e.target.value); setPasswordError("")
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
                        <div className='email-filed'>
                            <label>Confirm password</label>
                            <FormControl sx={{ width: '97%' }} variant="outlined">
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={hidePassword ? 'text' : 'password'}
                                    onChange={(e) => { setConfirmPassword(e.target.value); setConfirmPasswordError("") }}
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
                            <Button disabled={status} onClick={() => { changePassword() }} >Change password</Button>
                        </div>
                        <div className='copy-rght'>
                            <p>Apzkyc Ltd 2024. All rights reserved.</p>
                            <Link>Cookie preferences, </Link>
                            <Link>Privacy, </Link>
                            <Link>Terms.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePassword
