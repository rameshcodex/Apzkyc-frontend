import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button, Box, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import "./ProfileSetting.css";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import useMediaQuery from '@mui/material/useMediaQuery';
import Sidebar from "../SideBar/Sidebar";
import countryFlag from "../../../Images/country.svg";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Link } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import adrfrnt from '../../../Images/adrfrnt.png'
import adrfrnt2 from '../../../Images/adrfrnt2.png'
import Stack from '@mui/material/Stack';
import Axios from '../../../Axios';
import toast from 'react-hot-toast';
import btnprf from '../../../Images/selfie.png'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  '@media (max-width: 991.98px)': {
    width: '70%',
  },
  '@media (max-width: 575.98px)': {
    width: '85%',
  },
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};


// selector one data

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

// tab
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



export default function EditProfileSetting() {
  // responsive theme
  const theme = useTheme();
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'));
  const MobileScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const isLgup = useMediaQuery(theme.breakpoints.up('lg'));
  const mobileUp = useMediaQuery(theme.breakpoints.up('sm'));
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);


  // pagination

  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // table data
  function createdData(
    date,
    time,
    gmt,
    exDate,
    exTime,
    exGmt,
    source,
    ip,
    platform,
    chrome,
    dtype,
    dmarker,
    dmodel,
    countryFlag,
    country,
    city,

  ) {
    return { date, time, gmt, exDate, exTime, exGmt, source, ip, platform, chrome, dtype, dmarker, dmodel, countryFlag, country, city };
  }

  const List = [
    createdData('Aug 6, 2024,', '4:19 PM', '(GMT+5:30)', 'Aug 7, 2024', '9:32 AM', '(GMT+5:30)', 'dashboard', '49.37.202.209', 'Win10', 'Chrome', 'Type: Desktop', 'Maker: Unknown', 'Model: Windows Desktop', countryFlag, 'India', 'Chennai'),
    createdData('Aug 6, 2024,', '4:19 PM', '(GMT+5:30)', 'Aug 7, 2024', '9:32 AM', '(GMT+5:30)', 'dashboard', '49.37.202.209', 'Win10', 'Chrome', 'Type: Desktop', 'Maker: Unknown', 'Model: Windows Desktop', countryFlag, 'India', 'Chennai'),
    createdData('Aug 6, 2024,', '4:19 PM', '(GMT+5:30)', 'Aug 7, 2024', '9:32 AM', '(GMT+5:30)', 'dashboard', '49.37.202.209', 'Win10', 'Chrome', 'Type: Desktop', 'Maker: Unknown', 'Model: Windows Desktop', countryFlag, 'India', 'Chennai'),
    createdData('Aug 6, 2024,', '4:19 PM', '(GMT+5:30)', 'Aug 7, 2024', '9:32 AM', '(GMT+5:30)', 'dashboard', '49.37.202.209', 'Win10', 'Chrome', 'Type: Desktop', 'Maker: Unknown', 'Model: Windows Desktop', countryFlag, 'India', 'Chennai'),
  ];

  // tab


  const [imageExists, setImageExists] = useState(null);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // selector 2 data

  const [Language, setLanguage] = React.useState('');

  const handleSelectLanguage = (event) => {
    setLanguage(event.target.value);
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [isDisabled, setIsDisabled] = useState(false);

  const handleDisableButton = () => {
    setIsDisabled(!isDisabled);
  }

  // reload
  const handleRefresh = () => {
    window.location.reload();
  };


  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });


  const [imageUrl, setImageUrl] = useState(null);

  const [imgForm, setForm] = useState()

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };

    if (file) {
      // setForm(file)
      uploadImage(file)
    }
  };


  const [oldPass, setOldPass] = useState("")
  const [newPass, setNewPass] = useState("")
  const [confPass, setConfPass] = useState("")

  const [oldPassErr, setOldPassErr] = useState("")
  const [newPassErr, setNewPassErr] = useState("")
  const [confPassErr, setConfPassErr] = useState("")

  const [passStatus, setPassStatus] = useState(false)

  const [oldPassShow, setOldPassShow] = useState(false)
  const [newPassShow, setNewPassShow] = useState(false)
  const [confPassShow, setConfPassShow] = useState(false)

  const [statuss, setStatuss] = useState(false)
  const changePassword = async () => {
    try {
      var res = false
      if (profileDetails?.name == "") {
        toast.error("Name is required")
      } else if (profileDetails?.image == "") {
        toast.error("Image is required")
      } else {
        res = true
      }

      if (oldPass != "") {
        if (newPass == "") {
          res = false
          setNewPassErr("New Password is required")
        } else if (newPass == oldPass) {
          res = false
          setNewPassErr("Old Password and New Password is same")
        } else if (confPass == "") {
          res = false
          setConfPassErr("Confirm Password is required")
        } else if (newPass != confPass) {
          res = false
          setConfPassErr("Confirm Password is not matched")
        } else {
          res = true
        }
      }
      if (res) {
        setPassStatus(true)
        const { data } = await Axios.post('/changePassword', {
          oldPassword: oldPass,
          newPassword: newPass,
          name: profileDetails?.name,
          image: profileDetails?.image
        },{
          headers: {
            Authorization: window.localStorage.getItem('Rikosta')
          }
        })
        console.log("🚀 ~ changePassword ~ data:", data)
        if (data?.success == true) {
          setStatuss(!statuss)
          toast.success(data?.message)
          setOldPass("")
          setNewPass("")
          setConfPass("")
          setOldPassErr("")
          setNewPassErr("")
          setConfPassErr("")
          setPassStatus(false)
        } else {
          toast.error(data?.message)
        }
      }
    } catch (error) {
      setPassStatus(false)
      toast.error(error?.response?.data?.message)
      console.log("🚀 ~ changePassword ~ error:", error)
    }
  }

  const [profileDetails, setProfileDetails] = useState()
  const getProfile = async () => {
    try {
      const { data } = await Axios.get('/getProfile', {
        headers: {
          Authorization: window.localStorage.getItem('Rikosta')
        }
      })
      if (data?.success == true) {
        setProfileDetails(data?.result)
        const img = new Image();
        img.src = data?.result?.image;
        img.onload = () => {
          setImageExists(true);
        };

        img.onerror = () => {
          setImageExists(false);
        };
      }
    } catch (error) {
      console.log("🚀 ~ getProfile ~ error:", error)
    }
  }

  const uploadImage = async (imgForm) => {
    try {
      const formdata = new FormData();
      formdata.append("image", imgForm)
      const { data } = await Axios.post('/uploadimage',formdata,{
        headers: {
          Authorization: window.localStorage.getItem('Rikosta')
        }
      })
      console.log("🚀 ~ uploadImage ~ data:", data)
      if (data?.success) {
        setImageExists(true);
        setProfileDetails({ ...profileDetails, image: data?.result })
      }
    } catch (error) {
      console.log("🚀 ~ uploadImage ~ error:", error)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <div>
      <Box sx={{ display: mdScreen ? 'flex' : 'block' }}>
        <Sidebar statuss={statuss} />
        <Box component="main" className="clientList-body" sx={{ flexGrow: 1, p: 3, marginTop: '80px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className='profile-tab-outer-div'>
                <div>
                  <div class="import-popup profile-set-head display-2 ">
                    <h1 className='mb-10' >Profile settings</h1>
                    <div className='profile-lang'>
                      {/* <InputLabel id="demo-simple-select-label seperate" className='display-4'><div><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.7562 7.78337C12.7562 8.49156 12.6167 9.19281 12.3457 9.84709C12.0747 10.5014 11.6775 11.0959 11.1767 11.5966C10.6759 12.0974 10.0814 12.4946 9.42717 12.7656C8.77289 13.0366 8.07164 13.1761 7.36345 13.1761C6.65527 13.1761 5.95402 13.0366 5.29974 12.7656C4.64546 12.4946 4.05097 12.0974 3.5502 11.5966C3.04944 11.0959 2.65221 10.5014 2.3812 9.84709C2.11019 9.19281 1.9707 8.49156 1.9707 7.78337C1.9707 6.35313 2.53887 4.98146 3.5502 3.97012C4.56154 2.95879 5.93321 2.39062 7.36345 2.39062C8.7937 2.39062 10.1654 2.95879 11.1767 3.97012C12.188 4.98146 12.7562 6.35313 12.7562 7.78337ZM7.36345 12.0976C8.36658 11.0481 8.97129 9.68098 9.07295 8.23277H5.65395C5.75569 9.68096 6.36039 11.0481 7.36345 12.0976ZM8.5202 12.1272C9.40286 11.8916 10.1928 11.3927 10.785 10.697C11.3771 10.0013 11.7434 9.14175 11.8349 8.23277H9.97354C9.88698 9.64653 9.38099 11.0024 8.5202 12.1272ZM9.97354 7.33398H11.8349C11.7434 6.425 11.3771 5.56546 10.785 4.86976C10.1928 4.17405 9.40286 3.67518 8.5202 3.43951C9.38099 4.56435 9.88698 5.92022 9.97354 7.33398ZM9.07295 7.33398H5.65395C5.75561 5.88577 6.36032 4.51865 7.36345 3.46917C8.36658 4.51865 8.97129 5.88577 9.07295 7.33398ZM4.75336 8.23277C4.83987 9.64654 5.34587 11.0024 6.20671 12.1272C5.32404 11.8916 4.53407 11.3927 3.94193 10.697C3.34979 10.0013 2.98355 9.14175 2.89196 8.23277H4.75336ZM4.75336 7.33398C4.83987 5.92021 5.34587 4.56432 6.20671 3.43951C5.32404 3.67518 4.53407 4.17405 3.94193 4.86976C3.34979 5.56546 2.98355 6.425 2.89196 7.33398H4.75336Z" fill="#373D4D" />
                      </svg></div>Dashboard language</InputLabel>
                      <FormControl sx={{ m: 0, width: 160 }}>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          placeholder='Language'
                          className='select-item-list email-field'
                          value={Language}
                          onChange={handleSelectLanguage}
                        >
                          <MenuItem value={'En'}>English</MenuItem>
                          <MenuItem value={'Fn'}>French</MenuItem>
                        </Select>
                      </FormControl> */}
                    </div>
                  </div>
                </div>

                <Box className="profile_tab">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
                      <div className='profile_flex_input'>
                        <div className="first_inputs display-1">
                          <div>
                            <div className='email-filed display-1 flex-lg-wrap'>
                              <label className='display-1'>Profile Name</label>
                              <TextField inputProps={{ autoComplete: 'off' }} value={profileDetails?.name} fullWidth id="fullWidth" placeholder='Name' onChange={(e) => { setProfileDetails({ ...profileDetails, name: e.target.value }) }} />
                            </div>
                            <div className='email-filed display-1 flex-lg-wrap'>
                              <label className='display-1'>Mail id</label>
                              <TextField inputProps={{ autoComplete: 'off' }} value={profileDetails?.email} fullWidth id="fullWidth" placeholder='Email address' />
                            </div>

                            <hr className='divider' />
                            <div className='email-filed display-1 flex-lg-wrap'>
                              <label className='display-1'>Current Password</label>
                              <FormControl sx={{ width: '100%' }} variant="outlined" inputProps={{ autoComplete: 'off' }}>
                                <OutlinedInput
                                  id="outlined-adornment-password"
                                  type={oldPassShow ? 'text' : 'password'}
                                  placeholder='Password'
                                  value={oldPass}
                                  onChange={(e) => { setOldPass(e.target.value); setOldPassErr("") }}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => { setOldPassShow(!oldPassShow) }}
                                        edge="end"
                                      >
                                        {oldPassShow ? <Visibility /> : <VisibilityOff />}
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                />
                                {oldPassErr && <div style={{ color: "red", textAlign: "center" }} >{oldPassErr}</div>}
                              </FormControl>
                            </div>

                            <div className='email-filed display-1 flex-lg-wrap'>
                              <label className='display-1'>New Password</label>
                              <FormControl sx={{ width: '100%' }} variant="outlined" inputProps={{ autoComplete: 'off' }}>
                                <OutlinedInput
                                  id="outlined-adornment-password"
                                  type={newPassShow ? 'text' : 'password'}
                                  placeholder='Password'
                                  value={newPass}
                                  onChange={(e) => { setNewPass(e.target.value); setNewPassErr("") }}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => {
                                          setNewPassShow
                                            (!newPassShow)
                                        }}
                                        edge="end"
                                      >
                                        {newPassShow ? <Visibility /> : <VisibilityOff />}
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                />
                                {newPassErr && <div style={{ color: "red", textAlign: "center" }} >{newPassErr}</div>}
                              </FormControl>
                            </div>
                            <div className='email-filed display-1 flex-lg-wrap'>
                              <label className='display-1'>Re-enter Password</label>
                              <FormControl sx={{ width: '100%' }} variant="outlined" inputProps={{ autoComplete: 'off' }}>
                                <OutlinedInput
                                  id="outlined-adornment-password"
                                  type={confPassShow ? 'text' : 'password'}
                                  placeholder='Password'
                                  value={confPass}
                                  onChange={(e) => { setConfPass(e.target.value); setConfPassErr("") }}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => { setConfPassShow(!confPassShow) }}
                                        edge="end"
                                      >
                                        {confPassShow ? <Visibility /> : <VisibilityOff />}
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                />
                                {confPassErr && <div style={{ color: "red", textAlign: "center" }} >{confPassErr}</div>}
                              </FormControl>
                            </div>
                            <div style={{ textAlign: "center" }} >
                              <Button style={{ color: "white" }} disabled={passStatus} onClick={() => { changePassword() }} variant='contained'>Update</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
                      <div style={{ flexDirection: !mobileUp && 'column', flexDirection: 'column', maxWidth: '300px', margin: 'auto', alignItems: 'flex-start' }} className='display-3 profile_whole_div'>
                        <div className="prvimg1 profile_pic">
                          <img src={imageExists ? profileDetails?.image : btnprf} alt="prvimg1" />
                        </div>
                        <Stack spacing={2} direction={!mobileUp ? 'row' : 'column'} className='change_pic'>

                          <div className="cursor" style={{ width: '15px' }}>
                            <Button
                              component="label"
                              role={undefined}
                              tabIndex={-1}
                              sx={{ display: 'flex', justifyContent: 'flex-start', padding: '0px' }}
                            >
                              Change
                              <VisuallyHiddenInput type="file" onChange={(e) => { handleImageUpload(e) }} />
                            </Button>
                          </div>

                          {/* <div className="profile-tab-update-inner mt-5">
                            <Typography variant="h6">Two-factor authentication</Typography>
                            <div className='enable_btn'>
                              <Button onClick={handleDisableButton} className={isDisabled ? 'disabled-button' : 'enabled-button'}>
                                {isDisabled ? 'Disable' : 'Enable'}
                              </Button>
                            </div>
                            <div></div>
                          </div> */}
                        </Stack>
                      </div>
                    </Grid>
                  </Grid>

                </Box>
              </div>
            </Grid>

          </Grid>
        </Box>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div >
              <div className='display-2'>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <strong>Change password</strong>
                </Typography>
                <div onClick={handleClose} className='cursor'>
                  <HighlightOffIcon />
                </div>
              </div>

              <div className='email-filed margin-top' style={{ width: '320px', margin: '20px auto' }}>
                <label className='display-1'>Old Password </label>
                <FormControl sx={{ width: '100%' }} variant="outlined">

                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter Old Password'
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  // label="Password"
                  />
                </FormControl>
              </div>
              <div className='email-filed margin-top' style={{ width: '320px', margin: '20px auto' }}>
                <label className='display-1'>New Password </label>

                <FormControl sx={{ width: '100%' }} variant="outlined">

                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter New Password'
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  // label="Password"
                  />
                </FormControl>
              </div>
              <div className='email-filed margin-top' style={{ width: '320px', margin: '20px auto' }}>
                <label className='display-1'>Confirm Password </label>

                <FormControl sx={{ width: '100%' }} variant="outlined">

                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Confirm Password'
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  // label="Password"
                  />
                </FormControl>
              </div>
              <div className="exteddata text-center margin-top">
                <Button onClick={handleClose}>
                  Change Password
                </Button>

              </div>
            </div>

          </Box>
        </Modal>
        <Modal
          open={open2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div >
              <div className='display-2'>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <strong>Change Name</strong>
                </Typography>
                <div onClick={handleClose2} className='cursor'>
                  <HighlightOffIcon />
                </div>
              </div>

              <div className='email-filed margin-top' style={{ width: '320px', margin: '20px auto' }}>
                <label className='display-1'>New Name </label>
                <TextField id="outlined-basic"
                  placeholder='Enter New Name' variant="outlined" style={{ width: '100%' }} />
              </div>


              <div className="exteddata text-center margin-top">
                <Button onClick={handleClose2}>
                  Change Nmae
                </Button>

              </div>
            </div>

          </Box>
        </Modal>
      </Box>
    </div>
  )
}
