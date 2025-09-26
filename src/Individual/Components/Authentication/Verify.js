import { Grid, Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Apzykyc from '../../../Images/individual/apzkyc-logo.png';
import LoginBanner from '../../../Images/individual/login-img.png';
import verify from '../../../Images/verify.png';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


function Verify() {


    const theme = useTheme();
    const mdScreen = useMediaQuery(theme.breakpoints.up('md'));


    const navigate = useNavigate()
    return (
        <div className='verify' style={{ height: '100vh', overflow: 'hidden' }}>
            <Grid container spacing={4} sx={{ justifyContent: "center" }}>
                <Grid item xs={12} sm={12} md={6} lg={5} xl={4}>
                    <div className="login-left-part">
                        <div className="logo-part text-center">
                            <Link to='/'>
                                <img src={Apzykyc} alt="Apzykyc" />
                            </Link>

                        </div>
                        <div className="matgin-top">
                            <h2 className='ver-hd'>Email verification</h2>
                            <p className='ver-p'>Please check your inbox for a verification link. If you didn't receive it, click the resend link below.</p>
                            <div className="vrfbtn">
                                <Button onClick={(() => { navigate('/individual/signin') })}>Verify </Button>
                            </div>
                        </div>
                        {mdScreen && <div className="login-banner xl text-center margin-t-30px">
                            <img src={verify} alt="LoginBanner" />
                        </div>}
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Verify
