import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Logo from '../../../Images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Axios from '../../../Axios';
import toast, { Toaster } from 'react-hot-toast';


const PlanSubLogin = () => {
    const [email, setEmail] = useState("")

    const [emailError, setEmailError] = useState("")

    const [status, setStatus] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("email data ", email)
        const { data } = await Axios.post('/users/plansublogin', {
            email: email
        })
        console.log(data, "data")
        if (data?.success == true) {
            const datass = data?.result
            setStatus(false)
            toast.success(data?.message)
            setTimeout(() => {
                navigate('/plansubchat', {
                    state: {
                        datass
                    }
                })
            }, 500);
        } else {
            setStatus(false)
            toast.error(data?.message)
            setEmailError(data?.message)
        }

    }

    return (
        <div className='signin-full contain-width'>
            <Box>
                <Grid container style={{ height: '100vh', alignItems: 'center', justifyContent: 'center' }}>

                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <div className='login-bg'>
                            <div className='logo-bar'>
                                <Link to="/"><img src={Logo} alt='logo' />
                                </Link>
                            </div>
                            {/* <h1>Get started</h1> */}
                            <div className='textfield margin-top'>
                                <div className='email-filed sub'>
                                    <h3 className='email-sub'>Email</h3>
                                    <TextField inputProps={{ autoComplete: 'off' }} fullWidth id="fullWidth" placeholder='Email address *' onChange={(e) => setEmail(e.target.value)} />
                                    <div>{emailError ? <p style={{ color: "red" }}>{emailError}</p> : ""}</div>
                                </div>

                                <div className='submit-button cursor'>
                                    <Button
                                     
                                     disabled={status} onClick={handleSubmit}>Continue</Button>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <Toaster />
            </Box>
        </div>
    )
}

export default PlanSubLogin
