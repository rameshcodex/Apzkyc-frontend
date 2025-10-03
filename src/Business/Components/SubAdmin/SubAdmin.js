import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import "./SubAdmin.css";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Axios from '../../../Axios';
import Sidebar from "../SideBar/Sidebar";
import { Triangle } from 'react-loader-spinner'
import toast from 'react-hot-toast';

import Modal from '@mui/material/Modal';
import moment from 'moment'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { decryptData } from '../../../middleware';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import RestoreIcon from '@mui/icons-material/Restore';
import OutlinedInput from '@mui/material/OutlinedInput';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

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


const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  '@media(max-width:767.98px)': {
    width: '90%',
  },
  height: '600px',
  overflowY: 'scroll',
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  // boxShadow: 24,
  p: 4,
  borderRadius: '10px'
};

const style3 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  overflowY: 'scroll',
  // bgcolor: 'background.paper',
  // border: '2px solid #000',
  // boxShadow: 24,
  p: 4,
  borderRadius: '10px'
};

const styleNew = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 700 },
  maxHeight: '90vh',
  overflow: 'auto',
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  p: { xs: 2, sm: 4 },
};




export default function SubAdmin() {
  // create popup open and close

  const theme = useTheme();
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'));

  const MobileScreen = useMediaQuery(theme.breakpoints.up('sm'));

  const matches = useMediaQuery(theme.breakpoints.up('sm'));


  const [usertype, setUserType] = useState('')
  const token = localStorage.getItem('Rikosta')
  const navigate = useNavigate()


  useEffect(() => {
    if (token) {
      var user = window.localStorage.getItem('userType');
      const userType = decryptData(user)
      setUserType(userType)
    }
  }, [token])

  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
  const regex = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  //create subadmin state
  const [name, setName] = useState('')
  const [nameErr, setNameErr] = useState(null)
  const [email, setEmail] = useState('')
  const [emailErr, setEmailErr] = useState(null)
  const [password, setPassword] = useState('')
  const [passwordErr, setPasswordErr] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmPasswordErr, setConfirmPasswordErr] = useState('')
  const [load, setLoad] = useState(false)
  const [adminId, setAdminId] = useState()
  const [id, setId] = useState()

  const [client, setClient] = useState(false)
  const [client_view, setClient_view] = useState(false)
  const [statistics, setStatistics] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [overview, setOverView] = useState(false)
  const [kyb, setKyb] = useState(false)
  const [support, setSupport] = useState(false)
  // const [support_close, setSupport_close] = useState(false)
  const [apiKeyView, setApiKeyView] = useState(false)
  const [apiKeyEdit, setApiKeyEdit] = useState(false)


  //edit subadmin state
  const [Editname, setEditName] = useState('')
  const [EditnameErr, setEditNameErr] = useState(null)
  const [Editemail, setEditEmail] = useState('')
  const [EditemailErr, setEditEmailErr] = useState(null)
  const [Editload, setEditLoad] = useState(false)
  const [EditPassword, setEditPassword] = useState('')
  const [EditPasswordErr, setEditPasswordErr] = useState(null)
  const [EditConfirmPassword, setEditConfirmPassword] = useState('')
  const [EditConfirmPasswordErr, setEditConfirmPasswordErr] = useState(null)
  const [deleteLoad, setDeleteLoad] = useState(false)

  const [Editclient, setEditClient] = useState(false)
  const [Editclient_view, setEditClient_view] = useState(false)
  const [Editstatistics, setEditStatistics] = useState(false)
  const [Editanalytics, setEditAnalytics] = useState(false)
  const [Editoverview, setEditOverView] = useState(false)
  const [Editkyb, setEditKyb] = useState(false)
  const [Editsupport, setEditSupport] = useState(false)
  // const [Editsupport_close, setEditSupport_close] = useState(false)
  const [EditApikeyView, setEditApiKeyView] = useState(false)
  const [EditApikeyEdit, setEditApiKeyEdit] = useState(false)


  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true)
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setNameErr(null)
    setEmailErr(null)
    setPasswordErr(null)
    setConfirmPasswordErr(null)
    setClient(false)
    setClient_view(false)
    setStatistics(false)
    setAnalytics(false)
    setOverView(false)
    setKyb(false)
    setSupport(false)
    // setSupport_close(false)
  };
  const handleClose = () => {
    setOpen(false);
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setNameErr(null)
    setEmailErr(null)
    setPasswordErr(null)
    setConfirmPasswordErr(null)
    setClient(false)
    setClient_view(false)
    setStatistics(false)
    setAnalytics(false)
    setOverView(false)
    setKyb(false)
    setSupport(false)
  }

  const [Editopen, setEditOpen] = useState(false);

  const handleEditOpen = () => {
    setEditOpen(true)
  };
  const handleEditClose = () => {
    setEditOpen(false);
  }


  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDeleteOpen = () => {
    setDeleteOpen(true)
  };
  const handleDeleteClose = () => setDeleteOpen(false);

  // pagination

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // popup selector 1

  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  // selector 2 data

  const [age, setAge] = React.useState('');

  const handleSelectChange = (event) => {
    setAge(event.target.value);
  };

  //  select file

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  // table data
  function createdData(
    title,
    name,
    description,
    entry,
    type,
    date,
    time,
    gmt
  ) {
    return { title, name, description, entry, type, date, time, gmt };
  }

  const List = [
    createdData('sdad', 'sdad', 'asdasd', 'Applicant ids', 'Blocklist', 'Aug 6, 2024,', '5:12 PM', '(GMT+5:30)'),
    createdData('asdsdas', 'asdsdas', 'asdasd', 'Key', 'Custom', 'Aug 6, 2024,', '5:12 PM', '(GMT+5:30)'),
    createdData('sds', 'sds', 'wwewe', 'Key', 'Custom', 'Aug 6, 2024,', '5:12 PM', '(GMT+5:30)'),
    createdData('Gr', 'gr', 'sddf', 'Key', 'Custom', 'Aug 6, 2024,', '5:12 PM', '(GMT+5:30)'),
  ];

  const [SubAdminList, setSubAdminList] = useState([]);
  const [AdminLoading, setAdminLoading] = useState(false);

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [cleared, setCleared] = React.useState(false);

  const paginatedSubAdminList = SubAdminList.length > 0 && SubAdminList?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => { };
  }, [cleared]);

  const handleSearch = async () => {
    try {
      setAdminLoading(true)
      const payload = {
        startdate: startDate,
        enddate: endDate
      }
      const { data } = await Axios.post('/businessAdmin/getSubAdminByDate', payload, {
        headers: {
          Authorization: localStorage.getItem('Rikosta')
        }
      })
      if (data.success) {
        setSubAdminList(data.result)
        setAdminLoading(false)
      }
      else {
        setSubAdminList({})
        setAdminLoading(false)
      }
    } catch (error) {
      setAdminLoading(false)
      console.log(error, 'err');

    }
  }

  const handleReset = async () => {
    setStartDate(null)
    setEndDate(null)
    getSubAdmin()
  }

  const getSubAdmin = async () => {
    try {
      setAdminLoading(true);
      const { data } = await Axios.post('/businessAdmin/getSubAdmin', {},
        {
          headers: {
            Authorization: window.localStorage.getItem('Rikosta')
          }
        }
      )
      if (data?.success) {
        setSubAdminList(data?.result);
      }
    } catch (error) {
      if (error?.status == 499) {
        toast.error(error?.response?.data?.message)
        window.localStorage.removeItem('Rikosta');
        window.localStorage.removeItem('userType');
        setTimeout(() => {
          window.location.replace('/login')
        }, 1000);
      }
    } finally {
      setAdminLoading(false);
    }
  }

  const getSubAdminById = async (id) => {
    try {
      const { data } = await Axios.post('/businessAdmin/getSubAdmin', { id: id },
        {
          headers: {
            Authorization: window.localStorage.getItem('Rikosta')
          }
        }
      )
      if (data?.success) {
        setEditName(data?.result?.name)
        setEditEmail(data?.result?.email)
        setEditClient(data?.result?.access?.client_lists)
        setEditClient_view(data?.result?.access?.client_view)
        setEditStatistics(data?.result?.access?.statistics)
        setEditAnalytics(data?.result?.access?.analytics)
        setEditOverView(data?.result?.access?.overview)
        setEditKyb(data?.result?.access?.kyb)
        setEditSupport(data?.result?.access?.support)
        // setEditSupport_close(data?.result?.access?.support_close)
        setEditApiKeyView(data?.result?.access?.apikey_view)
        setEditApiKeyEdit(data?.result?.access?.apikey_edit)
      }
    } catch (error) {
      if (error?.status == 499) {
        toast.error(error?.response?.data?.message)
        window.localStorage.removeItem('Rikosta');
        window.localStorage.removeItem('userType');
        setTimeout(() => {
          window.location.replace('/login')
        }, 1000);
      }
    }
  }



  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    if (e.target.value && !regex.test(e.target.value)) {
      setEmailErr("Invalid Email Format")
    } else {
      setEmailErr(null)
    }
  }

  const handleEmailEditChange = (e) => {
    setEditEmail(e.target.value)
    if (e.target.value && !regex.test(e.target.value)) {
      setEditEmailErr("Invalid Email Format")
    } else {
      setEditEmailErr(null)
    }
  }


  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if (e.target.value && !passwordRegex.test(e.target.value)) {
      setPasswordErr("Password Must Contain MIN 8 Character , One ALPHABET And Must Contain One Number ")
    } else {
      setPasswordErr(null)
    }
  }


  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
    if (e.target.value && password != e.target.value) {
      setConfirmPasswordErr("Password Mismatching")
    } else {
      setConfirmPasswordErr(null)
    }
  }

  const handleEditPasswordChange = (e) => {
    setEditPassword(e.target.value)
    if (e.target.value && !passwordRegex.test(e.target.value)) {
      setEditPasswordErr("Password Must Contain MIN 8 Character , One ALPHABET And Must Contain One Number ")
    } else {
      setEditPasswordErr(null)
    }
  }


  const handleEditConfirmPasswordChange = (e) => {
    setEditConfirmPassword(e.target.value)
    if (e.target.value && EditPassword != e.target.value) {
      setEditConfirmPasswordErr("Password Mismatching")
    } else {
      setEditConfirmPasswordErr(null)
    }
  }

  const handleClientViewChanges = (e) => {
    setClient_view(e)
    if (e == true) {
      setClient(true)
    }
  }

  const handleClientChanges = (e) => {
    setClient(e)
    if (e == false) {
      setClient_view(false)
    }
  }

  const handleClientEditViewChanges = (e) => {
    setEditClient_view(e)
    if (e == true) {
      setEditClient(true)
    }
  }

  const handleClientEditChanges = (e) => {
    setEditClient(e)
    if (e == false) {
      setEditClient_view(false)
    }
  }


  const handleSupportChanges = (e) => {
    setSupport(e)
    // if (e == false) {
    //   setSupport_close(false)
    // }
  }

  // const handleSupportCloseChanges = (e) => {
  //   setSupport_close(e)
  //   if (e == true) {
  //     setSupport(true)
  //   }
  // }

  const handleApikeyViewChanges = (e) => {
    setApiKeyView(e)
    if (e == false) {
      setApiKeyEdit(false)
    }
  }

  const handleApiKeyEditChanges = (e) => {
    setApiKeyEdit(e)
    if (e == true) {
      setApiKeyView(true)
    }
  }

  const handleEditSupportChanges = (e) => {
    setEditSupport(e)
    // if (e == false) {
    //   setEditSupport_close(false)
    // }
  }

  // const handleEditSupportCloseChanges = (e) => {
  //   setEditSupport_close(e)
  //   if (e == true) {
  //     setEditSupport(true)
  //   }
  // }

  const handleEditApikeyChanges = (e) => {
    setEditApiKeyView(e)
    if (e == false) {
      setEditApiKeyEdit(false)
    }
  }

  const handleEditApikeyEditChanges = (e) => {
    setEditApiKeyEdit(e)
    if (e == true) {
      setEditApiKeyView(true)
    }
  }



  const CreateSubAdmin = async () => {
    try {
      if (name == '') {
        setNameErr('Please Enter UserName')
      }
      else if (email == '') {
        setEmailErr('Please Enter Email')
      }
      else if (emailErr !== null) {
        setEmailErr(emailErr)
      }
      else if (password == '') {
        setPasswordErr('Please Enter Password')
      }
      else if (passwordErr !== null) {
        setPasswordErr(passwordErr)
      }
      else if (confirmPassword == '') {
        setConfirmPasswordErr('Please Enter Confirm Password')
      }
      else if (confirmPasswordErr !== null) {
        setConfirmPasswordErr(confirmPasswordErr)
      }
      else {
        setLoad(true)
        const payload = {
          name: name,
          email: email,
          password: password,
          business_id: adminId,
          user_type: 'organization',
          access: {
            client_lists: client,
            client_view: client_view,
            statistics: statistics,
            analytics: analytics,
            overview: overview,
            kyb: kyb,
            support: support,
            // support_close: support_close,
            apikey_view: apiKeyView,
            apikey_edit: apiKeyEdit
          }
        }
        const { data } = await Axios.post('/businessAdmin/createSubAdmin', payload, {
          headers: {
            Authorization: localStorage.getItem('Rikosta')
          }
        })
        if (data.success) {
          setLoad(false)
          toast.success(data.message)
          handleClose()
          getSubAdmin()
        }
        else {
          setLoad(false)
          toast.error(data.message)
        }
      }
    } catch (error) {
      setLoad(false)
      console.log(error, 'err');

    }
  }

  const EditSubAdmin = async () => {
    try {
      if (Editname == '') {
        setEditNameErr('Please Enter UserName')
      }
      else if (Editemail == '') {
        setEditEmailErr('Please Enter Email')
      }
      else if (EditPassword && EditConfirmPassword == '') {
        setEditConfirmPasswordErr('Please Enter Confirm Password')
      }
      else {
        setEditLoad(true)
        const payload = {
          id: id,
          name: Editname,
          // email: Editemail,
          password: EditPassword,
          access: {
            client_lists: Editclient,
            client_view: Editclient_view,
            statistics: Editstatistics,
            analytics: Editanalytics,
            overview: Editoverview,
            kyb: Editkyb,
            support: Editsupport,
            // support_close: Editsupport_close,
            apikey_view: EditApikeyView,
            apikey_edit: EditApikeyEdit
          }
        }
        // console.log(payload, 'payload');
        const { data } = await Axios.post('/businessAdmin/updateSubAdmin', payload, {
          headers: {
            Authorization: localStorage.getItem('Rikosta')
          }
        })
        if (data.success) {
          setEditLoad(false)
          toast.success(data.message)
          handleEditClose()
          getSubAdmin()
        }
        else {
          setEditLoad(false)
        }
      }
    } catch (error) {
      setEditLoad(false)
      console.log(error, 'err');

    }
  }

  const getProfile = async () => {
    try {
      const { data } = await Axios.get('/getProfile', {
        headers: {
          Authorization: window.localStorage.getItem('Rikosta')
        }
      })
      if (data?.success == true) {
        setAdminId(data.result._id)
      }
    } catch (error) {
      console.log("🚀 ~ getProfile ~ error:", error)
    }
  }

  const deleteSubadmin = async () => {
    try {
      setDeleteLoad(true)
      const { data } = await Axios.post('/businessAdmin/deleteSubadmin', { id: id }, {
        headers: {
          Authorization: localStorage.getItem('Rikosta')
        }
      })
      if (data.success) {
        setDeleteLoad(false)
        toast.success(data.message)
        handleDeleteClose()
        getSubAdmin()
      }
    } catch (error) {
      setDeleteLoad(false)
      console.log(error, 'err');

    }
  }

  const checkkyb = async () => {
    try {
      if (name == '') {
        setNameErr('Please Enter UserName')
      }
      else if (email == '') {
        setEmailErr('Please Enter Email')
      }
      else if (emailErr !== null) {
        setEmailErr(emailErr)
      }
      else if (password == '') {
        setPasswordErr('Please Enter Password')
      }
      else if (passwordErr !== null) {
        setPasswordErr(passwordErr)
      }
      else if (confirmPassword == '') {
        setConfirmPasswordErr('Please Enter Confirm Password')
      }
      else if (confirmPasswordErr !== null) {
        setConfirmPasswordErr(confirmPasswordErr)
      }
      else {
        setLoad(true)
        const { data } = await Axios.get('/checkkyb', {
          headers: {
            Authorization: window.localStorage.getItem('Rikosta')
          }
        })
        if (data?.success == true) {
          if (data?.result?.Verify == "Rejected") {
            toast.error("Please Verify Your KYB")
            navigate('/kyb')
            setLoad(false)
          }
          else {
            await CreateSubAdmin()
          }
        } else {
          toast.error("Please Verify Your KYB")
          navigate('/kyb')
          setLoad(false)
        }
      }
    } catch (error) {
      setLoad(false)
      console.log("🚀 ~ checkkyb ~ error:", error)
    }
  }

  useEffect(() => {
    getSubAdmin();
  }, []);




  return (
    <div>
      <Box sx={{ display: mdScreen ? 'flex' : 'block' }}>
        <Sidebar />
        {
          usertype === 'organization' ?

            <Box component="main" className="clientList-body" sx={{ flexGrow: 1, p: 3, marginTop: '80px' }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div className='display-4'>
                    <div>
                      <Button className="add-list-btn cmn-btn" onClick={(e) => { handleOpen(e); getProfile() }}><AddIcon />Create SubAdmin</Button>
                      <BootstrapDialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={open} className='createList-popup'
                      >
                        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                          Create SubAdmin
                        </DialogTitle>
                        <IconButton
                          aria-label="close"
                          onClick={handleClose}
                          sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            // color: (theme) => theme.palette.grey[500],
                            color: "#212736 !important",
                          }}
                        >
                          <CloseIcon className='close-svg' />
                        </IconButton>
                        <DialogContent>
                          <div className='email-field'>
                            <TextField fullWidth id="fullWidth" placeholder='Name' value={name} onChange={(e) => { setName(e.target.value); setNameErr(null) }} />
                          </div>
                          {nameErr && <p style={{ color: 'red' }}>{nameErr}</p>}
                          <div className='email-field'>
                            <TextField fullWidth id="fullWidth" placeholder='Email' value={email} onChange={(e) => { handleEmailChange(e) }} />
                          </div>
                          {emailErr && <p style={{ color: 'red' }}>{emailErr}</p>}
                          <div className='email-field'>
                            <TextField fullWidth id="fullWidth"
                              type={showPassword ? 'text' : 'password'}
                              placeholder='Password'
                              value={password}
                              onChange={(e) => { handlePasswordChange(e) }} />
                            {!showPassword ? <VisibilityOff onClick={handleClickShowPassword} /> : <Visibility onClick={handleClickShowPassword} />}
                          </div>
                          {passwordErr && <p style={{ color: 'red' }}>{passwordErr}</p>}
                          <div className='email-field'>
                            <TextField fullWidth id="fullWidth"
                              type={showConfirmPassword ? 'text' : 'password'}
                              placeholder='Confirm Password'
                              value={confirmPassword}
                              onChange={(e) => { handleConfirmPasswordChange(e) }} />
                            {!showConfirmPassword ? <VisibilityOff onClick={handleClickShowConfirmPassword} /> : <Visibility onClick={handleClickShowConfirmPassword} />}
                          </div>
                          {confirmPasswordErr && <p style={{ color: 'red' }}>{confirmPasswordErr}</p>}
                          <div className="entry">
                            <label className='display-1'>Client List</label>

                            <FormControl class="formControl-flex">
                              <Checkbox {...label} checked={client} onChange={(e) => { handleClientChanges(e.target.checked) }} />Client List
                              <Checkbox {...label} checked={client_view} onChange={(e) => { handleClientViewChanges(e.target.checked) }} />Client View

                            </FormControl>

                            {/* <label className='display-1'>Statistics</label>

                            <FormControl class="formControl-flex">
                              <Checkbox {...label} checked={statistics} onChange={(e) => { setStatistics(e.target.checked) }} />Statistics
                              <Checkbox {...label} checked={analytics} onChange={(e) => { setAnalytics(e.target.checked) }} />Analytics
                            </FormControl> */}

                            <label className='display-1'>Overview</label>

                            <FormControl class="formControl-flex">
                              <Checkbox {...label} checked={overview} onChange={(e) => { setOverView(e.target.checked) }} />Overview
                            </FormControl>

                            <label className='display-1'>KYB</label>

                            <FormControl class="formControl-flex">
                              <Checkbox {...label} checked={kyb} onChange={(e) => { setKyb(e.target.checked) }} />KYB
                            </FormControl>

                            <label className='display-1'>Support</label>

                            <FormControl class="formControl-flex">
                              <Checkbox {...label} checked={support} onChange={(e) => { handleSupportChanges(e.target.checked) }} />Support
                              {/* <Checkbox {...label} checked={support_close} onChange={(e) => { handleSupportCloseChanges(e.target.checked) }} />Support Close */}
                            </FormControl>

                            <label className='display-1'>Api key</label>

                            <FormControl class="formControl-flex">
                              <Checkbox {...label} checked={apiKeyView} onChange={(e) => { handleApikeyViewChanges(e.target.checked) }} />View
                              <Checkbox {...label} checked={apiKeyEdit} onChange={(e) => { handleApiKeyEditChanges(e.target.checked) }} />Create
                            </FormControl>
                          </div>


                        </DialogContent>

                        <DialogActions>
                          {/* autoFocus onClick={handleClose} */}
                          {
                            load ?
                              <Button className='add-list-btn '>
                                Proccessing...
                              </Button> :
                              // <Button className='add-list-btn action-btn ' onClick={() => { CreateSubAdmin() }} >
                              <Button className='add-list-btn  ' onClick={() => { checkkyb() }} >
                                Create
                              </Button>
                          }

                        </DialogActions>
                      </BootstrapDialog>
                    </div>

                    <div>
                      <BootstrapDialog
                        onClose={handleEditClose}
                        aria-labelledby="customized-dialog-title"
                        open={Editopen} className='createList-popup'
                      >
                        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                          Edit SubAdmin
                        </DialogTitle>
                        <IconButton
                          aria-label="close"
                          onClick={handleEditClose}
                          sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            // color: (theme) => theme.palette.grey[500],
                            color: "#212736 !important",
                          }}
                        >
                          <CloseIcon className='close-svg' />
                        </IconButton>
                        <DialogContent>
                          <div className='email-field'>
                            <TextField fullWidth id="fullWidth" placeholder='Name' value={Editname} onChange={(e) => { setEditName(e.target.value); setEditNameErr(null) }} />
                          </div>
                          {EditnameErr && <p style={{ color: 'red' }}>{EditnameErr}</p>}
                          <div className='email-field'>
                            <TextField fullWidth id="fullWidth" placeholder='Email' value={Editemail}
                            //  onChange={(e) => { handleEmailEditChange(e) }}
                            />
                          </div>
                          {EditemailErr && <p style={{ color: 'red' }}>{EditemailErr}</p>}

                          <div className='email-field'>
                            <TextField fullWidth id="fullWidth" placeholder='New Password' value={EditPassword} onChange={(e) => { handleEditPasswordChange(e); }} />
                          </div>
                          {EditPasswordErr && <p style={{ color: 'red' }}>{EditPasswordErr}</p>}

                          <div className='email-field'>
                            <TextField fullWidth id="fullWidth" placeholder='Confirm Password' value={EditConfirmPassword} onChange={(e) => { handleEditConfirmPasswordChange(e); }} />
                          </div>
                          {EditConfirmPasswordErr && <p style={{ color: 'red' }}>{EditConfirmPasswordErr}</p>}

                          <div className="entry">
                            <label className='display-1'>Client List</label>

                            <FormControl class="formControl-flex">
                              <Checkbox {...label} checked={Editclient} onChange={(e) => { handleClientEditChanges(e.target.checked) }} />Client List
                              <Checkbox {...label} checked={Editclient_view} onChange={(e) => { handleClientEditViewChanges(e.target.checked) }} />Client View

                            </FormControl>

                            {/* <label className='display-1'>Statistics</label>

                            <FormControl class="formControl-flex">
                              <Checkbox {...label} checked={Editstatistics} onChange={(e) => { setEditStatistics(e.target.checked) }} />Statistics
                              <Checkbox {...label} checked={Editanalytics} onChange={(e) => { setEditAnalytics(e.target.checked) }} />Analytics
                            </FormControl> */}

                            <label className='display-1'>Overview</label>

                            <FormControl class="formControl-flex">
                              <Checkbox {...label} checked={Editoverview} onChange={(e) => { setEditOverView(e.target.checked) }} />Overview
                            </FormControl>

                            <label className='display-1'>KYB</label>

                            <FormControl class="formControl-flex">
                              <Checkbox {...label} checked={Editkyb} onChange={(e) => { setEditKyb(e.target.checked) }} />KYB
                            </FormControl>

                            <label className='display-1'>Support</label>

                            <FormControl class="formControl-flex">
                              <Checkbox {...label} checked={Editsupport} onChange={(e) => { handleEditSupportChanges(e.target.checked) }} />Support
                              {/* <Checkbox {...label} checked={Editsupport_close} onChange={(e) => { handleEditSupportCloseChanges(e.target.checked) }} />Support Close */}
                            </FormControl>

                            <label className='display-1'>Apikey</label>

                            <FormControl class="formControl-flex">
                              <Checkbox {...label} checked={EditApikeyView} onChange={(e) => { handleEditApikeyChanges(e.target.checked) }} />View
                              <Checkbox {...label} checked={EditApikeyEdit} onChange={(e) => { handleEditApikeyEditChanges(e.target.checked) }} />Edit
                            </FormControl>
                          </div>


                        </DialogContent>

                        <DialogActions>
                          {/* autoFocus onClick={handleClose} */}
                          {
                            Editload ?
                              <Button className='add-list-btn '>
                                Proccessing...
                              </Button> :
                              <Button className='add-list-btn  ' onClick={() => { EditSubAdmin() }} >
                                Update
                              </Button>
                          }

                        </DialogActions>
                      </BootstrapDialog>
                    </div>

                    <div>
                      <BootstrapDialog
                        onClose={handleDeleteClose}
                        aria-labelledby="customized-dialog-title"
                        open={deleteOpen} className='createList-popup'
                      >
                        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                          Delete SubAdmin
                        </DialogTitle>
                        <IconButton
                          aria-label="close"
                          onClick={handleDeleteClose}
                          sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            // color: (theme) => theme.palette.grey[500],
                            color: "#212736 !important",
                          }}
                        >
                          <CloseIcon className='close-svg' />
                        </IconButton>
                        <DialogContent>
                          <div className='email-field'>
                            <p>Are You Sure To Delete SubAdmin</p>
                          </div>
                        </DialogContent>

                        <DialogActions>
                          {/* autoFocus onClick={handleClose} */}
                          {
                            deleteLoad ?
                              <Button className='add-list-btn '>
                                Proccessing...
                              </Button> :
                              <Button className='add-list-btn  ' onClick={() => { deleteSubadmin() }} >
                                Delete
                              </Button>
                          }

                        </DialogActions>
                      </BootstrapDialog>
                    </div>
                  </div>
                  <div className='user-body-div1' style={{ paddingTop: "10px" }}>
                    <div className="display-1" style={{ flexWrap: "wrap", alignItems: "center", width: "100%" }} >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box
                          sx={{
                            // width: '100%',
                            // height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            position: 'relative',
                            border: 'none',
                          }}
                          className='date-modify'
                        >
                          <DatePicker
                            sx={{ width: 200, border: "none" }}
                            slotProps={{
                              field: { clearable: true, onClear: () => setCleared(true) },
                            }}
                            value={startDate}
                            onChange={date => {
                              setStartDate(date);
                            }}
                          />
                        </Box>
                      </LocalizationProvider>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box
                          sx={{
                            // width: '100%',
                            // height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            position: 'relative',
                            border: 'none',
                          }}
                          className='date-modify'
                        >

                          <DatePicker
                            sx={{ width: 200, border: "none" }}
                            slotProps={{
                              field: { clearable: true, onClear: () => setCleared(true) },
                            }}
                            value={endDate}
                            onChange={date => {
                              setEndDate(date);
                            }}
                          />
                        </Box>
                      </LocalizationProvider>
                      <div className='display-1' >
                        <SearchIcon className='cursor' onClick={() => { handleSearch() }} />
                        {/* <Button className='view-btn' >Search</Button> */}
                        <RestoreIcon className='cursor' onClick={() => { handleReset() }} />
                      </div>

                      {/* <Button className='view-btn-reset' >Reset</Button> */}
                    </div>
                    {/* <Button className='view-btn-reset' onClick={() => { handleReset() }}>Reset</Button> */}
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className='item-list-table'>
                    <TableContainer >
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">S.No</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Email Id</TableCell>
                            <TableCell align="left">Created at</TableCell>
                            <TableCell align="center">Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {AdminLoading ? (<TableRow > <TableCell colSpan={7} style={{ textAlign: "center" }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                              <Triangle color="var(--theme-color) " height={80} width={80} />
                            </div>
                          </TableCell>  </TableRow>) : paginatedSubAdminList.length > 0 ?
                            (paginatedSubAdminList?.map((row, index) => (
                              <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row?.name}</TableCell>
                                <TableCell>{row?.email}</TableCell>
                                <TableCell>{moment(row?.createdAt).format('DD/MM/YY')}</TableCell>
                                <TableCell>
                                  <div className='action-btn-flex '>
                                    <Button><ModeOutlinedIcon onClick={() => { handleEditOpen(); getSubAdminById(row?._id); setId(row?._id); }} /></Button>
                                    {/* <Button><FileUploadOutlinedIcon  /></Button> */}
                                    <Button><DeleteOutlineTwoToneIcon onClick={() => { handleDeleteOpen(); setId(row?._id); }} /></Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))) : (<TableRow >
                              <TableCell colSpan={7} style={{ textAlign: "center", fontSize: "20px" }}> No Data Found</TableCell>
                            </TableRow>)
                          }

                        </TableBody>


                      </Table>
                    </TableContainer>
                    {/* <>
                  <div className='add-false-content'>
                    There are no items yet
                  </div>
                </> */}
                  </div>

                  <TablePagination
                    component="div"
                    count={SubAdminList?.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Grid>


              </Grid>
            </Box> :
            <Box component="main" className="clientList-body" sx={{ flexGrow: 1, p: 3, marginTop: '80px' }}>
              You Dont Have Permission To View
            </Box>
        }

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="user-modal-title"
          aria-describedby="user-modal-description"
          sx={{
            backdropFilter: 'blur(5px)',
          }}
        >
          <Paper elevation={24} sx={styleNew}>
            {/* <div className='clo_seicon' >
               <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{

                    bgcolor: 'rgba(0,0,0,0.05)',
                    '&:hover': {
                      bgcolor: 'rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
            </div>     */}

            <Box sx={{
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              background: '#fff',
              zIndex: 100,
              position: 'sticky',
              top: '-35px',

              // mt: -3,
              backdropFilter: 'blur(5px)',
            }}>
              <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'center', sm: 'flex-start' },
                mb: 4,
                pt: 2,

              }}>

                <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                  <Typography
                    variant="h4"
                    component="h2"
                    fontWeight="bold"
                    sx={{ mb: 1, color: '#1a237e' }}
                  >
                    Create Subadmin
                  </Typography>

                </Box>
              </Box>

              <IconButton
                aria-label="close"
                onClick={handleClose}
                className='icon_close'
                sx={{
                  marginTop: "15px",
                  bgcolor: 'rgba(0,0,0,0.05)',
                  '&:hover': {
                    bgcolor: 'rgba(0,0,0,0.1)',
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {/* <Divider sx={{ my: 3 }} /> */}

            <div className="kyb-txtnew mt-20">
              <TextField id="outlined-basic" label=" Name" variant="outlined" name="text" type="text" sx={{ width: "100%" }}
                value={name} onChange={(e) => { setName(e.target.value); setNameErr(null) }}

              />
              {nameErr && <p style={{ color: 'red' }}>{nameErr}</p>}
            </div>
            <div className="kyb-txtnew mt-20">
              <TextField id="outlined-basic" label=" Email" variant="outlined" name="text" type="text" sx={{ width: "100%" }}
                value={email} onChange={(e) => { handleEmailChange(e) }}
              />
              {emailErr && <p style={{ color: 'red' }}>{emailErr}</p>}
            </div>

            <div className="kyb-txtnew mt-20">
              <FormControl sx={{ width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}

                  value={password}
                  onChange={(e) => { handlePasswordChange(e) }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? 'hide the password' : 'display the password'
                        }
                        onClick={handleClickShowPassword}

                        edge="end"
                      >
                        {!showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              {passwordErr && <p style={{ color: 'red' }}>{passwordErr}</p>}
            </div>
            <div className="kyb-txtnew mt-20">
              <FormControl sx={{ width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => { handleConfirmPasswordChange(e) }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? 'hide the password' : 'display the password'
                        }
                        onClick={handleClickShowConfirmPassword}

                        edge="end"
                      >
                        {!showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
              </FormControl>
              {confirmPasswordErr && <p style={{ color: 'red' }}>{confirmPasswordErr}</p>}
            </div>

            <div className="entry mt-20">
              <label className='display-1'>Client List</label>

              <FormControl class="formControl-flex">
                <Checkbox {...label} checked={client} onChange={(e) => { handleClientChanges(e.target.checked) }} />Client List
                <Checkbox {...label} checked={client_view} onChange={(e) => { handleClientViewChanges(e.target.checked) }} />Client View

              </FormControl>

              {/* <label className='display-1'>Statistics</label>

                            <FormControl class="formControl-flex">
                              <Checkbox {...label} checked={statistics} onChange={(e) => { setStatistics(e.target.checked) }} />Statistics
                              <Checkbox {...label} checked={analytics} onChange={(e) => { setAnalytics(e.target.checked) }} />Analytics
                            </FormControl> */}

              <label className='display-1'>Overview</label>

              <FormControl class="formControl-flex">
                <Checkbox {...label} checked={overview} onChange={(e) => { setOverView(e.target.checked) }} />Overview
              </FormControl>

              <label className='display-1'>KYB</label>

              <FormControl class="formControl-flex">
                <Checkbox {...label} checked={kyb} onChange={(e) => { setKyb(e.target.checked) }} />KYB
              </FormControl>

              <label className='display-1'>Support</label>

              <FormControl class="formControl-flex">
                <Checkbox {...label} checked={support} onChange={(e) => { handleSupportChanges(e.target.checked) }} />Support
                {/* <Checkbox {...label} checked={support_close} onChange={(e) => { handleSupportCloseChanges(e.target.checked) }} />Support Close */}
              </FormControl>

              <label className='display-1'>Api key</label>

              <FormControl class="formControl-flex">
                <Checkbox {...label} checked={apiKeyView} onChange={(e) => { handleApikeyViewChanges(e.target.checked) }} />View
                <Checkbox {...label} checked={apiKeyEdit} onChange={(e) => { handleApiKeyEditChanges(e.target.checked) }} />Create
              </FormControl>
            </div>
            {
              load ?
                <Button className='add-list-btn mt-20'>
                  Proccessing...
                </Button> :
                // <Button className='add-list-btn action-btn ' onClick={() => { CreateSubAdmin() }} >
                <Button className='add-list-btn  mt-20' onClick={() => { checkkyb() }} >
                  Create
                </Button>
            }

          </Paper>
        </Modal>
      </Box>
    </div >
  )
}
