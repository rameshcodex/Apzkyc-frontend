import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { Grid, TextField } from '@mui/material'
import './Profile.css'
import Avatar from '@mui/material/Avatar';
import ava from '../../../Images/ava.png'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useCallback } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import Cropper from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop from 'react-image-crop'
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Axios from '../../../Axios'
import { toast, ToastContainer } from 'react-toastify';
import { Password } from '@mui/icons-material';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    '@media(max-width:575.97px)': {
        width: '90%'

    },
    height: '500px',
    bgcolor: '#fff',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: "8px",
    p: 4,
};

function Profile() {
    const [prfHv, setPrfHv] = useState(false)

    const togglePrfHv = () => {
        setPrfHv(!prfHv)
    }
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    // const [src, setSrc] = useState(null);
    // const [crop, setCrop] = useState({ aspect: 1 });
    // const [croppedImage, setCroppedImage] = useState(null);

    const [imageUrl, setImageUrl] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        // if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            setImageUrl(reader.result);
            // handleOpen()
        };
        reader.readAsDataURL(file);
        // }
        if (file) {
            uploadImage(file)
        }
    };

    const uploadImage = async (imgForm) => {
        try {
            const formdata = new FormData();
            formdata.append("image", imgForm)
            const { data } = await Axios.post('/uploadimage', formdata, {
                headers: {
                    Authorization: window.localStorage.getItem('Rikosta')
                }
            })
            // console.log("🚀 ~ uploadImage ~ data:", data)
            if (data?.success) {
                setProfileData({ ...profileData, image: data?.result })
                const payload = {
                    image: data?.result,
                    name: profileData.name,
                }
                const response = await Axios.post('/changePassword', payload, {
                    headers: {
                        Authorization: window.localStorage.getItem('Rikosta')
                    }
                })
            }
        } catch (error) {
            console.log("🚀 ~ uploadImage ~ error:", error)
        }
    }
    // console.log(croppedImage, 'ald');


    const onCropComplete = (crop) => {
        if (!crop.width || !crop.height) return;

        const imageElement = document.querySelector('img');
        const canvas = document.createElement('canvas');
        const scaleX = imageElement.naturalWidth / imageElement.width;
        const scaleY = imageElement.naturalHeight / imageElement.height;

        canvas.width = crop.width;
        canvas.height = crop.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(
            imageElement,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        canvas.toBlob((blob) => {
            if (blob) {
                const croppedUrl = URL.createObjectURL(blob);
                console.log("Blob URL:", croppedUrl);
                setImageUrl(croppedUrl);
            } else {
                console.error("Canvas Blob is null");
            }
        }, 'image/png');
    };


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [showPassword1, setShowPassword1] = useState(false);
    const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

    const [showPassword2, setShowPassword2] = useState(false);
    const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

    const [profileData, setProfileData] = useState({})

    const [newPassword, setNewPassword] = useState('')
    const [newPasswordErr, setNewPasswordErr] = useState(null)

    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmPasswordErr, setConfirmPasswordErr] = useState(null)

    const [oldPassword, setOldPassword] = useState('')
    const [oldPasswordErr, setOldPasswordErr] = useState(null)

    const [load, setLoad] = useState(false)

    // console.log(profileData.image, 'profileData');


    const [nameErr, setNameErr] = useState(null)

    const [chngPswd, setChngPswd] = useState(false)

    const handleChngPswd = () => {
        setChngPswd(!chngPswd)
    }

    const updateProfile = async () => {
        try {
            if (profileData.name == '') {
                setNameErr('Please Enter Name')
            }
            else if (oldPassword != '' && newPassword == '') {
                setNewPasswordErr('Please Enter New Password')
            }
            else if (newPassword !== '' && confirmPassword == '') {
                // console.log(confirmPassword, 'confirmPassword');
                setConfirmPasswordErr('Please Enter Confirm Password')
            }
            else if (newPassword !== confirmPassword) {
                setConfirmPasswordErr('Confirm Password must equal to new password')
                return;
            }
            else {
                setLoad(true)
                let payload = {
                    name: profileData.name,
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                    image: profileData.image
                }
                const { data } = await Axios.post('/changePassword', payload, {
                    headers: {
                        Authorization: window.localStorage.getItem('Rikosta')
                    }
                })
                if (data.success) {
                    setLoad(false)
                    setOldPassword("")
                    setConfirmPassword("")
                    setNewPassword("")
                    toast.success(data.message)
                }
                else {
                    setLoad(false)
                    toast.error(data.message)
                }
            }
        } catch (error) {
            setLoad(false)
            toast.error(error?.response?.data?.message)
            console.log('🚀 ~ updateProfile ~ error', error);
        }
    }

    const getProfile = async () => {
        try {
            const { data } = await Axios.get('/getProfile', {
                headers: {
                    Authorization: window.localStorage.getItem('Rikosta')
                }
            })
            if (data.success) {
                setProfileData(data.result)
            }
            else {
                setProfileData({})
            }
        } catch (error) {
            console.log('🚀 ~ getProfile ~ error', error);
        }
    }

    const handlechangeOldPassword = (e) => {
        setOldPassword(e.target.value)
        setOldPasswordErr(null)
        if (e.target.value == '') {
            setNewPasswordErr(null)
        }
    }

    const handleChangeNewPass = (e) => {
        setNewPassword(e.target.value)
        setNewPasswordErr(null)
        if (e.target.value == '') {
            setConfirmPasswordErr(null)
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <>
            <ToastContainer />
            <div className='profile'>
                <Header profile={profileData?.image} />

                <Grid container justifyContent="center">



                    <Grid xs={11} sm={11} md={11} lg={11} xl={9} className='bxshade'>
                        <div className="card-m1">
                            <div className='display-1'>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={profileData?.image ? profileData?.image : ava}
                                    sx={{ width: 100, height: 100 }}

                                />
                                <div>
                                    <div className="Nmae display-1">
                                        {/* Maria */} {profileData?.name}
                                        <img width="25" height="25"
                                            src="https://img.icons8.com/color/25/verified-account--v1.png"
                                            alt="verified-account--v1" />
                                    </div>
                                    <div className="email-prf">
                                        {/* Maria@gmail.com */} {profileData?.email}
                                    </div>

                                </div>


                            </div>

                            <div className="upd-btn text-center margin-top">
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    className={prfHv ? "btn1 active" : "btn1"}

                                >
                                    Upload Image
                                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                                </Button>
                            </div>
                        </div>



                        <div className="add-deta margin-top">
                            Personal details
                        </div>
                        <div className="display-1" style={{ gap: !matches ? 0 : '35px', flexDirection: !matches && 'column' }}>
                            <div className='kyx-inp margin-top'>
                                <div className='display-1 kyx-inptxt'>Name</div>
                                <TextField placeholder='Enter full name' style={{ width: '280px' }}
                                    value={profileData?.name}
                                    onChange={(e) => { setProfileData({ ...profileData, name: e.target.value }); setNameErr(null) }}
                                // onKeyDown={handleKeyDown}
                                />
                                {/* <div className='invalid-error'>{userDetailsErr?.name != '' ? <p style={{ textAlign: "left" }}>{userDetailsErr?.name}</p> : ""}</div> */}

                            </div>
                            {nameErr && <p style={{ color: "red" }}>{nameErr}</p>}
                            {/* <div className='kyx-inp margin-top'>
                            <div className='display-1 kyx-inptxt'>Sur Name</div>
                            <TextField placeholder='Enter sur name' style={{ width: '280px' }}
                            value={userDetails?.nickName}


                            />
                            <div className='invalid-error'>{userDetailsErr?.nickName != '' ? <p style={{ textAlign: "left" }}>{userDetailsErr?.nickName}</p> : ""}</div>

                        </div> */}
                        </div>
                        <div className="display-1" style={{ gap: !matches ? 0 : '35px', flexDirection: !matches && 'column' }}>
                            <div className='kyx-inp margin-top'>
                                <div className='display-1 kyx-inptxt'>Email</div>
                                <TextField placeholder='Email' style={{ width: '280px' }}
                                    value={profileData?.email}
                                // onKeyDown={handleKeyDown}
                                />
                                {/* <div className='invalid-error'>{userDetailsErr?.name != '' ? <p style={{ textAlign: "left" }}>{userDetailsErr?.name}</p> : ""}</div> */}

                            </div>
                            {/* <div className='kyx-inp margin-top'>
                            <div className='display-1 kyx-inptxt'>Phone</div>
                            <TextField placeholder='Phone' type='number' style={{ width: '280px' }}
                            value={userDetails?.nickName}


                            />
                            <div className='invalid-error'>{userDetailsErr?.nickName != '' ? <p style={{ textAlign: "left" }}>{userDetailsErr?.nickName}</p> : ""}</div>

                        </div> */}
                        </div>
                        <div className="display-1" style={{ gap: !matches ? 0 : '35px', flexDirection: !matches && 'column' }}>

                            <div className='kyx-inp margin-top'>
                                <div className='display-1 kyx-inptxt'>Old Password</div>
                                <FormControl variant="outlined">
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword2 ? 'text' : 'password'}
                                        placeholder='Password'
                                        // onChange={(e) => { setOldPassword(e.target.value); setOldPasswordErr("") }}
                                        onChange={(e) => { handlechangeOldPassword(e) }}
                                        value={oldPassword}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword2}
                                                    edge="end"
                                                >
                                                    {!showPassword2 ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </div>
                            {oldPasswordErr && <p style={{ color: "red" }}>{oldPasswordErr}</p>}

                            <div className='kyx-inp margin-top'>
                                <div className='display-1 kyx-inptxt'>New Password</div>
                                <FormControl variant="outlined">
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder='Password'
                                        // onChange={(e) => { setNewPassword(e.target.value); setNewPasswordErr("") }}
                                        value={newPassword}
                                        onChange={(e) => { handleChangeNewPass(e) }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </div>
                            {newPasswordErr && <p style={{ color: "red" }}>{newPasswordErr}</p>}

                            {/* {chngPswd ? */}

                            <div className='kyx-inp margin-top'>
                                <div className='display-1 kyx-inptxt'>Confirm Password</div>
                                <FormControl variant="outlined">
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword1 ? 'text' : 'password'}
                                        placeholder='Password'
                                        onChange={(e) => { setConfirmPassword(e.target.value); setConfirmPasswordErr("") }}
                                        value={confirmPassword}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword1}
                                                    edge="end"
                                                >
                                                    {!showPassword1 ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>


                            </div>
                            {confirmPasswordErr && <p style={{ color: "red" }}>{confirmPasswordErr}</p>}
                            {/* <div className="text-center upd-btn margin-top">
                                <Button onClick={() => { changePassword(); handleChngPswd() }}>
                                    {chngPswd ? 'Save Password' : 'Change Password'}
                                </Button>
                            </div> */}
                        </div>

                        <div className="text-center upd-btn margin-top">
                            {
                                load ? <Button >
                                    Processing...
                                </Button> :
                                    <Button onClick={() => { updateProfile() }}>
                                        Save Changes
                                    </Button>
                            }
                        </div>
                    </Grid>
                    {/* <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>


                        <ReactCrop crop={crop} onChange={newCrop => setCrop(newCrop)} onComplete={onCropComplete}>
                            <img src={src} />
                        </ReactCrop>

                        <div className="text-center upd-btn">
                            <Button onClick={handleClose}>
                                Save
                            </Button>
                        </div>
                    </Box>
                </Modal> */}

                </Grid>
            </div>
        </>
    )
}

export default Profile
