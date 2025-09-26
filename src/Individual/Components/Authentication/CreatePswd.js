import { Grid, Button } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Apzykyc from '../../../Images/individual/apzkyc-logo.png';
import LoginBanner from '../../../Images/individual/login-img.png';
import crpswd from '../../../Images/crpswd.png';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Axios from '../../../Axios';
import toast from 'react-hot-toast';


function CreatePswd() {

    const theme = useTheme();
    const mdScreen = useMediaQuery(theme.breakpoints.up('md'));
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [showPassword1, setShowPassword1] = useState(false);
    const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
    const navigate = useNavigate()

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [load, setLoad] = useState(false);

    const params = useParams();


    const handleResetPassword = async () => {


        try {

            const authToken = params.token;

            console.log(authToken, "authTokenauthToken");

            const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;

            if (password == "") {
                setPasswordError("Please enter password");
            } else if (!passwordRegex.test(password)) {
                setPasswordError("Password must contain at least 1 uppercase, 1 special character, 1 number, and be at least 8 characters long");
            } else if (password !== confirmPassword) {
                setConfirmPasswordError("Passwords do not match");
            } else {
                setLoad(true);
                const { data } = await Axios.post('/resetpwd', { password: password, confirmPassword: confirmPassword },
                    {
                        headers: {
                            Authorization: authToken
                        }
                    }
                );

                if (data?.success) {
                    console.log("🚀 ~ handleResetPassword ~ data:", data)
                    if (data?.result == "organization") {
                        navigate('/login');
                    } else {
                        navigate('/individual/signin');
                    }
                    toast.success(data?.message);
                } else {
                    toast.error(data?.message);
                }

            }

        } catch (error) {
            console.log(error, "error resetting password");
        } finally {
            setLoad(false);
        }


    };


    return (
        <div className='create-pswd'>
            <Grid container spacing={4} sx={{ justifyContent: "center" }}>
                <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
                    <div className="login-left-part">
                        <div className="logo-part text-center">
                            <Link to='/'>
                                <img src={Apzykyc} alt="Apzykyc" />
                            </Link>

                        </div>
                        <div className="matgin-top cr-whole">
                            <h2 className='ver-hd'>Create Password</h2>
                            {/* <p className='ver-p'>Please check your inbox for a verification link. If you didn't receive it, click the resend link below.</p> */}

                            <div className='crpswd margin-t-10px'>
                                <label className='display-1 crpswd-txt'>Password</label>
                                <FormControl variant="outlined">
                                    <OutlinedInput
                                        onChange={(e) => { setPassword(e.target.value); setPasswordError("") }}
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder='Enter password'
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
                                {/* <div className='forget-link '><Link to=''>Forget Password?</Link></div> */}
                                <div>{passwordError ? <p style={{ color: "red", textAlign: "center" }}>{passwordError}</p> : ""}</div>
                            </div>
                            <div className='crpswd margin-t-10px'>
                                <label className='display-1 crpswd-txt'>Re-enter Password</label>
                                <FormControl variant="outlined">
                                    <OutlinedInput
                                        onChange={(e) => { setConfirmPassword(e.target.value); setConfirmPasswordError("") }}
                                        id="outlined-adornment-password"
                                        type={showPassword1 ? 'text' : 'password'}
                                        placeholder='Re-enter Password'
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
                                {/* <div className='forget-link '><Link to=''>Forget Password?</Link></div> */}
                                <div>{confirmPasswordError ? <p style={{ color: "red", textAlign: "center" }}>{confirmPasswordError}</p> : ""}</div>
                            </div>
                            <div className="vrfbtn">
                                {/* <Button onClick={(() => { navigate('/individual/verify') })}>Submit </Button> */}
                                <Button disabled={load} onClick={(() => { handleResetPassword() })}>Submit </Button>
                            </div>
                        </div>
                        {mdScreen && <div className="login-banner xl text-center">
                            <img src={crpswd} alt="LoginBanner" />
                        </div>}
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default CreatePswd
