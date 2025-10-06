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
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import TextField from '@mui/material/TextField';
import Axios from '../../../Axios';
import toast from 'react-hot-toast';
import consts from '../../../constant';


function CreatePswd() {

    const theme = useTheme();
    const mdScreen = useMediaQuery(theme.breakpoints.up('md'));
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [emailErr, setEmailErr] = useState("");


    const handleEmailVerification = async () => {

        try {

            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (email == "") {
                setEmailErr("Please Enter Email");
            } else if (!regex.test(email)) {
                setEmailErr("Enter A Valid Email");
            } else {

                const { data } = await Axios.post('/checkvalidemail', { email: email });

                if (data?.success) {
                    if (data?.result == "organization") {
                        navigate("/login");
                    } else {
                        navigate("/individual/signin");
                    }

                    toast.success("Please Check Email To Reset Password");
                } else {
                    setEmailErr(data?.message);
                }

            }



        } catch (error) {
            console.log(error, "error in verifying email");
        }

    };

    return (
        <div className='create-pswd' style={{ height: '100vh' }}>
            <Grid container spacing={4} sx={{ justifyContent: "center" }}>
                <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
                    <div className="login-left-part">
                        <div className="logo-part text-center">
                            <Link to='/'>
                                <img src={consts.projectRegister} alt="Apzykyc" />
                            </Link>

                        </div>
                        <div className="matgin-top cr-whole">
                            <h2 className='ver-hd'>Enter your Email</h2>
                            {/* <p className='ver-p'>Please check your inbox for a verification link. If you didn't receive it, click the resend link below.</p> */}

                            <div className='crpswd margin-t-10px'>
                                <label className='display-1 crpswd-txt'>Email</label>
                                <TextField id="outlined-basic" placeholder='Enter Register Email' variant="outlined" onChange={(e) => { setEmail(e.target.value); setEmailErr(""); }} />
                                {/* <div className='forget-link '><Link to=''>Forget Password?</Link></div> */}
                                <div> {emailErr ? <p style={{ color: "red", textAlign: "center" }} >{emailErr}</p> : ""} </div>
                            </div>

                            <div className="vrfbtn">
                                {/* <Button onClick={(() => { navigate('/individual/verify') })}>Send OTP </Button> */}
                                <Button onClick={() => handleEmailVerification()} > Send Mail </Button>
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
