import React, { useRef } from 'react'
import { Box, Button, Grid } from '@mui/material';
import Sidebar from '../SideBar/Sidebar'
import './Applicant.css';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useMediaQuery, useTheme } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import { Link } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layer from '../../../Images/Layer.png'
import Modal from '@mui/material/Modal';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    '@media (max-width: 991.98px)': {
        width: '92%',

    },
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
};


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

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


function NewApplicant() {

    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate()



    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        event.preventDefault();
        toast.success('Photo uploaded successfully!', {
            position: "top-center", // Position at the top center
            autoClose: 1000, // Auto close after 3 seconds
            hideProgressBar: false, // Show progress bar
            closeOnClick: true, // Allow closing on click
            pauseOnHover: true, // Pause on hover
            draggable: true, // Allow dragging
            progress: undefined, // Progress indicator
        });
    };

    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };



    return (
        <div className='applicant-full'>
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '80px' }}>
                    <div className='back-icon display-2'>
                        <Link to="/applicant"><img src={Layer} /></Link>
                        <Button variant="contained" onClick={handleOpen}> <AddIcon /> New Applicant</Button>
                    </div>
                    <div className='applicant-box'>

                        <Accordion defaultExpanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography className='step-head display-1'> Required steps <HelpOutlineIcon /> </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='reqired-details'>
                                    <div className='steps display-2'>
                                        <p>Select level</p>
                                        <span><AutorenewIcon /></span>

                                    </div>
                                    <FormControl fullWidth sx={{ m: 1, mt: 3 }}>
                                        <Select

                                            displayEmpty
                                            value={personName}
                                            onChange={handleChange}
                                            input={<OutlinedInput />}
                                            renderValue={(selected) => {
                                                if (selected.length === 0) {
                                                    return <em>basic-kyc-level</em>;
                                                }

                                                return selected.join(', ');
                                            }}
                                            MenuProps={MenuProps}
                                            inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                            <MenuItem disabled value="">
                                                <em>basic-kyc-level</em>
                                            </MenuItem>
                                            {names.map((name, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={name}
                                                    style={getStyles(name, personName, theme)}
                                                >
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <p>Customize the level to add extra steps. <Link>Go to level settings</Link></p>

                                    <List>
                                        <ListItem>
                                            <div>
                                                <p><strong>Identity document</strong></p>
                                                <label>ID card • Passport • Residence permit • Driver's license</label>
                                            </div>
                                        </ListItem>
                                        <ListItem>
                                            <div>
                                                <p><strong>Selfie</strong></p>
                                                <label>Selfie</label>
                                            </div>
                                        </ListItem>

                                    </List>
                                </div>
                            </AccordionDetails>
                        </Accordion>


                    </div>
                    <div className='applicant-box'>

                        <Accordion defaultExpanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography className='step-head display-1'> Applicant Card </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                                            <div className='email-filed'>
                                                <label className='display-1'>First name </label>
                                                <TextField id="fullWidth" placeholder='First name' />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                                            <div className='email-filed'>
                                                <label className='display-1'>Middle name </label>
                                                <TextField id="fullWidth" placeholder='Middle name' />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                                            <div className='email-filed'>
                                                <label className='display-1'>Last name</label>
                                                <TextField id="fullWidth" placeholder='Last name' />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <div className='email-filed'>
                                                <label className='display-1'>External user ID</label>
                                                <TextField id="fullWidth" fullWidth />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <div className='alert-box display-1'>
                                                <ErrorOutlinedIcon />
                                                <p> Use this<Link to="" style={{ marginLeft: '5px' }}>test applicant data</Link>  to generate a test applicant and see how it works</p>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <div className='add-photo'>
                                                <div className='display-2 addph' style={{ gap: '15px' }}>
                                                    <input
                                                        type="file"
                                                        ref={fileInputRef}
                                                        style={{ display: 'none' }}
                                                        onChange={handleFileChange}
                                                    />
                                                    <Button variant="contained" style={{ width: '100%' }} onClick={handleClick}> <AddIcon />  Add photos…</Button>
                                                    <ToastContainer
                                                        position="top-center" // Ensure container is at the top center
                                                        autoClose={1000} // Auto close toasts after 3 seconds
                                                        hideProgressBar={false} // Show the progress bar
                                                        closeOnClick
                                                        pauseOnHover
                                                        draggable
                                                        progress
                                                    />
                                                    <Button variant="contained" onClick={handleClick} style={{ width: '100%' }} > <AddIcon />  Add document…</Button>
                                                </div>
                                            </div>
                                            <div className='applicant-create'>
                                                <Button onClick={(() => { navigate('/applicant3') })}>   Create applicant →</Button>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </AccordionDetails>
                        </Accordion>


                    </div>
                    <div className='applicant-modal'>

                        <Modal
                            open={open}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <div className="whole-modal">
                                    <div className='display-2'>
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            <strong>Create new applicant</strong>
                                        </Typography>
                                        <div onClick={handleClose} className='cursor'>
                                            <HighlightOffIcon />
                                        </div>
                                    </div>

                                    <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                                        Create new applicant manually or send the generated verification link
                                        to the applicant
                                        <div className='reqired-details newapplicant-modal'>
                                            <div className='steps display-2'>
                                                <p>Select verification level</p>

                                            </div>
                                            <FormControl fullWidth sx={{ m: 1, mt: 3 }}>
                                                <Select

                                                    displayEmpty
                                                    value={personName}
                                                    onChange={handleChange}
                                                    input={<OutlinedInput />}
                                                    renderValue={(selected) => {
                                                        if (selected.length === 0) {
                                                            return <em>basic-kyc-level</em>;
                                                        }

                                                        return selected.join(', ');
                                                    }}
                                                    MenuProps={MenuProps}
                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                >
                                                    <MenuItem disabled value="">
                                                        <em>basic-kyc-level</em>
                                                    </MenuItem>
                                                    {names.map((name) => (
                                                        <MenuItem
                                                            key={name}
                                                            value={name}
                                                            style={getStyles(name, personName, theme)}
                                                        >
                                                            {name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>

                                            <p>To create or edit verification levels with adding extra steps visit <Link>Levels</Link></p>

                                            <List>
                                                <ListItem>
                                                    <div>
                                                        <p><strong>Identity document</strong></p>
                                                        <label>ID card • Passport • Residence permit • Driver's license</label>
                                                    </div>
                                                </ListItem>
                                                <ListItem>
                                                    <div>
                                                        <p><strong>Selfie</strong></p>
                                                        <label>Selfie</label>
                                                    </div>
                                                </ListItem>

                                            </List>
                                        </div>
                                        <div className='genetrate-btn'>
                                            <Stack direction="row" spacing={2}>
                                                <Button variant="contained">Generate WebSDK applicant link</Button>
                                                <Button variant="contained" onClick={handleClose}>Create applicant manually</Button>

                                            </Stack>
                                        </div>
                                    </Typography>
                                </div>

                            </Box>
                        </Modal>
                    </div>
                </Box>
            </Box>
        </div>
    )
}

export default NewApplicant
