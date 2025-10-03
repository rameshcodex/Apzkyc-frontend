import React, { useEffect, useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { Button, Box, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import "./SuspenceUser.css";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Axios from '../../../Axios';
import Sidebar from "../SideBar/Sidebar";
import { Triangle } from 'react-loader-spinner'
import toast from 'react-hot-toast';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';


import Modal from '@mui/material/Modal';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HouseIcon from '@mui/icons-material/House';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import { decryptData } from '../../../middleware';
import SignpostIcon from '@mui/icons-material/Signpost';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import RestoreIcon from '@mui/icons-material/Restore';
import Radio from '@mui/material/Radio';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';




const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


// new Date(payment.createdAt).toLocaleString()

export default function SuspenceUser() {
    const theme = useTheme();
    const mdScreen = useMediaQuery(theme.breakpoints.up('md'));
    const searchRef = useRef("");

    const MobileScreen = useMediaQuery(theme.breakpoints.up('sm'));

    const [usertype, setUserType] = useState('')
    const token = localStorage.getItem('Rikosta')
    const [personName, setPersonName] = useState([]);

    const subAdminDetails = JSON.parse(localStorage.getItem('subadmin'))
    const handleCloseOrg = () => setOpenOrg(false);

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    }


    useEffect(() => {
        if (token) {
            var user = window.localStorage.getItem('userType');
            const userType = decryptData(user)
            setUserType(userType)
        }
    }, [token])


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


    const handleCloseImport = () => {
        setOpenImport(false);
    };





    const [clientLoading, setClientLoading] = useState(false);
    const [suspenseUsers, setSuspenseUsers] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [openimport, setOpenImport] = useState(false);
    const [age, setAge] = React.useState('');


    const handleSelectChange = (event) => {
        setAge(event.target.value);
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };


    const paginatedClientList = suspenseUsers.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );



    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [cleared, setCleared] = useState(false);
    const [serchItem, setSerchItem] = useState("");

    const fetchSuspenseUsers = async () => {
        try {
            setClientLoading(true);
            setPage(0);
            const response = await Axios.post("/users/getSuspenceUser",
                {
                    start: startDate,
                    end: endDate,
                    email: searchRef.current.value,
                });
            console.log(response, "response");
            if (response.data.success) {
                setSuspenseUsers(response.data.result);
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
            setClientLoading(false);
        }
    };


    useEffect(() => {
        fetchSuspenseUsers();
    }, []);

    const [openOrg, setOpenOrg] = useState(false);


    const handleClearSearch = async () => {

        try {
            setStartDate(null)
            setEndDate(null)
            setSerchItem("")
            searchRef.current.value = "";

            setTimeout(() => {
                fetchSuspenseUsers();
            }, 1000);


        } catch (error) {
            console.log(error, "Error clearing search");
        }

    }

    return (
        <div>
            <Box sx={{ display: mdScreen ? 'flex' : 'block' }}>
                <Sidebar />
                <Box component="main" className="clientList-body" sx={{ flexGrow: 1, p: 3, marginTop: '80px' }}>
                    {
                        usertype === 'organization' ?

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <div className='display-4'>
                                        <div>
                                            {/* <Button className="add-list-btn cmn-btn" onClick={handleClickOpen}><AddIcon />Create list</Button> */}
                                            <BootstrapDialog
                                                onClose={handleClose}
                                                aria-labelledby="customized-dialog-title"
                                                open={open} className='createList-popup'
                                            >
                                                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                                    Create list
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
                                                        <TextField fullWidth id="fullWidth" placeholder='Title' />
                                                    </div>
                                                    <div className='email-field'>
                                                        <TextField fullWidth id="fullWidth" placeholder='Description' />
                                                    </div>

                                                    <div className="entry">
                                                        <label className='display-1'>Entry type</label>

                                                        <FormControl class="formControl-flex">
                                                            <RadioGroup
                                                                aria-labelledby="demo-radio-buttons-group-label"
                                                                defaultValue="female"
                                                                name="radio-buttons-group">
                                                                <FormControlLabel value="key" control={<Radio />} label="Key" checked />
                                                                <FormControlLabel value="ids" control={<Radio />} label="Applicant ids" />
                                                                <FormControlLabel value="email" control={<Radio />} label="Emails" />
                                                                <FormControlLabel value="device" control={<Radio />} label="Device Fingerprints" />
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </div>
                                                </DialogContent>

                                                <DialogActions>
                                                    {/* autoFocus onClick={handleClose} */}
                                                    <Button className='add-list-btn action-btn ' >
                                                        Create
                                                    </Button>
                                                </DialogActions>
                                            </BootstrapDialog>
                                        </div>

                                        <div>
                                            {/* <Button className="import-btn cmn-btn" onClick={handleClickImport}><FileDownloadOutlinedIcon />Import list</Button> */}
                                            <BootstrapDialog
                                                onClose={handleCloseImport}
                                                aria-labelledby="customized-dialog-title"
                                                open={openimport} className='createList-popup'
                                            >
                                                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                                    Import list Items
                                                </DialogTitle>
                                                <IconButton
                                                    aria-label="close"
                                                    onClick={handleCloseImport}
                                                    sx={{
                                                        position: 'absolute',
                                                        right: 8,
                                                        top: 8,
                                                        // color: (theme) => theme.palette.grey[500],
                                                        color: "#212736 !important",
                                                    }}
                                                >
                                                    <CloseIcon class="close-svg" />
                                                </IconButton>
                                                <DialogContent>
                                                    <div>
                                                        <FormControl sx={{ m: 0, width: '100%' }}>
                                                            {/* <InputLabel id="demo-multiple-checkbox-label">Select List</InputLabel> */}
                                                            <Select
                                                                className="select-item-list email-field"
                                                                labelId="demo-multiple-checkbox-label"
                                                                id="demo-multiple-checkbox"
                                                                multiple
                                                                placeholder='Select List'
                                                                value={personName}
                                                                onChange={handleChange}
                                                                input={<OutlinedInput label="Tag" />}
                                                                renderValue={(selected) => selected.join(', ')}
                                                                MenuProps={MenuProps}
                                                            >
                                                                {/* {names.map((name) => (
                                                                    <MenuItem key={name} value={name}>
                                                                        <Checkbox checked={personName.indexOf(name) > -1} />
                                                                        <ListItemText primary={name} />
                                                                    </MenuItem>
                                                                ))} */}
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                    <div class="import-popup">
                                                        <InputLabel id="demo-simple-select-label seperate">Seperator</InputLabel>
                                                        <FormControl sx={{ m: 0, width: 160 }}>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                placeholder='Age'
                                                                className='select-item-list email-field'
                                                                value={age}
                                                                onChange={handleSelectChange}
                                                            >
                                                                <MenuItem value={','}>comma</MenuItem>
                                                                <MenuItem value={'.'}>dot</MenuItem>
                                                                <MenuItem value={';'}>semicolon</MenuItem>
                                                                <MenuItem value={'@'}>@</MenuItem>
                                                                <MenuItem value={'#'}>Hash</MenuItem>
                                                                <MenuItem value={'&'}>
                                                                    ampersand</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </div>

                                                    <Box className='email-field' sx={{ display: 'flex', flexDirection: 'column', }}>
                                                        <input
                                                            accept="image/*"
                                                            style={{ display: 'none' }}
                                                            id="raised-button-file"
                                                            type="file"
                                                        // onChange={handleFileChange}
                                                        />
                                                        <label htmlFor="raised-button-file" className='upload-label'>
                                                            <Button variant="contained" component="span" className='upload-btn'>
                                                                <FileUploadOutlinedIcon />
                                                                Select File
                                                            </Button>
                                                        </label>
                                                        {selectedFile && (
                                                            <Typography variant="body1" sx={{ mt: 2 }}>
                                                                Selected File: {selectedFile.name}
                                                            </Typography>
                                                        )}
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            // onClick={handleUpload}
                                                            sx={{ mt: 2, display: 'none' }}
                                                            disabled={!selectedFile}
                                                        >
                                                            Upload
                                                        </Button>
                                                    </Box>
                                                    <Typography variant="h6" className='import-info' sx={{ mt: 2 }}>
                                                        Load your CSV file. Use line breaks to separate the lines. The maximum
                                                        number of rows is 10,000. If there is more than one separator, the remaining
                                                        columns will be ignored. Click Import to preview the uploaded data.
                                                    </Typography>
                                                </DialogContent>

                                                <DialogActions>
                                                    {/* autoFocus onClick={handleClose} */}
                                                    <Button className='add-list-btn action-btn ' >
                                                        Import
                                                    </Button>
                                                </DialogActions>
                                            </BootstrapDialog>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className='user-body-div1'>
                                        <div className="display-1 mb-10" style={{ flexWrap: "wrap", alignItems: "center", width: "100%" }} >
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <Box
                                                    sx={{
                                                        // width: '100%',
                                                        // height: '100%',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        position: 'relative',
                                                        border: 'none',
                                                    }}
                                                    className='date-modify'
                                                >
                                                    <FormLabel>From</FormLabel>
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
                                                        flexDirection: 'column',
                                                        position: 'relative',
                                                        border: 'none',
                                                    }}
                                                    className='date-modify'
                                                >
                                                    <FormLabel>To</FormLabel>
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


                                            {/* <Box
                                            sx={{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                gap: 2,
                                                marginTop: '24px',
                                            }}
                                        >
                                            <TextField
                                                value={serchItem}
                                                variant="outlined"
                                                placeholder="Search by mail"
                                                sx={{ width: 300 }}
                                                inputRef={searchRef}
                                                onChange={(e) => {
                                                    setSerchItem(e.target.value);
                                                }}
                                            />
                                          
                                        </Box> */}

                                            <SearchIcon className="cursor" onClick={fetchSuspenseUsers} />
                                            <RestoreIcon className="cursor" onClick={() => { handleClearSearch() }} />

                                        </div>
                                    </div>
                                    <div className='item-list-table'>
                                        <TableContainer >
                                            <Table aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="left">Name</TableCell>
                                                        <TableCell align="left">Email</TableCell>
                                                        <TableCell align="left">Reason</TableCell>
                                                        <TableCell align="left">ApiKey</TableCell>
                                                        <TableCell align="left">Api Name</TableCell>
                                                        <TableCell align="left">Created at</TableCell>
                                                        <TableCell align="left">Updated at</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {clientLoading ? (<TableRow > <TableCell colSpan={7} style={{ textAlign: "center" }}>
                                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                                                            <Triangle color="var(--theme-color) " height={80} width={80} />
                                                        </div>
                                                    </TableCell>  </TableRow>) : paginatedClientList.length > 0 ?
                                                        (paginatedClientList?.map((List, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell>{List?.userDetails?.name}</TableCell>
                                                                <TableCell>{List?.userDetails.email}</TableCell>
                                                                <TableCell>{List?.reason}</TableCell>
                                                                <TableCell>{List?.apikey.slice(0, 5) + "..." + List?.apikey.slice(-5)}</TableCell>
                                                                <TableCell>{List?.apiDetails?.APINAME}</TableCell>
                                                                <TableCell>{List?.createdAt.split("T")[0]}</TableCell>
                                                                <TableCell>{List?.updatedAt.split("T")[0]}</TableCell>
                                                                {/* <TableCell>{List?.user.deactivate_time}</TableCell> */}
                                                                {
                                                                    usertype === 'organization' || subAdminDetails?.access?.client_view === true ?
                                                                        <TableCell>
                                                                            {/* <div className='action-btn-flex display-4'>
                                                                                <Button><ModeOutlinedIcon className='action-btn-bdr' onClick={() => { setSelcDoc(List); handleOpenNew() }} /></Button>
                                                                            </div> */}
                                                                        </TableCell> : <></>
                                                                }
                                                            </TableRow>
                                                        ))) : (<TableRow >
                                                            <TableCell colSpan={7} style={{ textAlign: "center", fontSize: "20px" }}> No Data Found</TableCell>
                                                        </TableRow>)
                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </div>
                                    <TablePagination
                                        component="div"
                                        count={suspenseUsers?.length}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        rowsPerPage={rowsPerPage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </Grid>
                            </Grid>
                            :
                            <Grid container spacing={2}>
                                You Dont Have Permission To View
                            </Grid>
                    }
                </Box>


            </Box>
        </div>
    )
}
