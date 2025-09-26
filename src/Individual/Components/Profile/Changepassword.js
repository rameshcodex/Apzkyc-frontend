import { Button, Grid } from '@mui/material'
import React, { useState } from 'react'
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Header from '../Header/Header';


function Changepassword() {

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    return (
        <div className='changepassword'>
            <Header />
            <Grid container justifyContent={"center"}>

                <Grid xs={10} sm={8} md={5} lg={3} xl={3} className='bxshade'>

                    <div className="add-deta margin-top text-center">
                        Change Password
                    </div>
                    <div className='email-filed phr' style={{ margin: '15px auto', width: 'fit-content' }}>
                        <label className='display-1 fllname'>Old Password</label>
                        <FormControl variant="outlined">
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={!showPassword ? 'text' : 'password'}
                                placeholder='Password'
                                // onChange={(e) => { setPassword(e.target.value); setPasswordError("") }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>


                    </div>
                    <div className='email-filed phr' style={{ margin: '15px auto', width: 'fit-content' }}>
                        <label className='display-1 fllname'>New Password</label>
                        <FormControl variant="outlined">
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={!showPassword ? 'text' : 'password'}
                                placeholder='Password'
                                // onChange={(e) => { setPassword(e.target.value); setPasswordError("") }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>


                    </div>
                    <div className='email-filed phr' style={{ margin: '15px auto', width: 'fit-content' }}>
                        <label className='display-1 fllname'>Confirm Password</label>
                        <FormControl variant="outlined">
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={!showPassword ? 'text' : 'password'}
                                placeholder='Password'
                                // onChange={(e) => { setPassword(e.target.value); setPasswordError("") }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>


                    </div>

                    <div className="text-center upd-btn">
                        <Button >
                            Change Passowrd
                        </Button>
                    </div>
                </Grid>

            </Grid>
        </div>
    )
}

export default Changepassword
