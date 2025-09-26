import React, { useState, useRef } from 'react';
import { Box, Button, Grid } from '@mui/material';
import Sidebar from '../SideBar/Sidebar'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import './Applicant.css';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useMediaQuery, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import FormControlLabel from '@mui/material/FormControlLabel';
import ApplicantBody from './ApplicantBody'
import LoopIcon from '@mui/icons-material/Loop';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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


function Applicant() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('JARRYD PETERS', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    ]
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const theme = useTheme();
    const lgScreen = useMediaQuery(theme.breakpoints.up('lg'));
    return (
        <div className='applicant-full'>
            <Box sx={{ display: !lgScreen ? 'block' : 'flex' }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '80px' }}>
                    <Box className="action-tab display-2">
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Individuals" {...a11yProps(0)} />
                            <Tab label="Actions" {...a11yProps(1)} />
                        </Tabs>
                        <div className='apllicant-direct'>
                            <Button variant='contained'> <AddIcon /> New applicant</Button> {/* to="/newapplicant" */}
                        </div>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <div className='csv-export display-2'>
                            <div className='filter-colmn display-1'>
                                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                                <InputBase
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    placeholder="Search"
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                    className='applisearch'
                                />
                                <div className='combine-filter'>
                                    <Checkbox {...label} />
                                    <span>Combine with filters </span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.58549 1.40234C8.24767 1.40234 10.4063 3.56101 10.4063 6.22319C10.4063 8.88537 8.24767 11.044 5.58549 11.044C2.92332 11.044 0.764648 8.88537 0.764648 6.22319C0.764648 3.56101 2.92332 1.40234 5.58549 1.40234ZM5.58549 2.47364C3.51467 2.47364 1.83595 4.15237 1.83595 6.22319C1.83595 8.29401 3.51467 9.97274 5.58549 9.97274C7.65632 9.97274 9.33504 8.29401 9.33504 6.22319C9.33504 4.15237 7.65632 2.47364 5.58549 2.47364ZM6.12114 7.83014V8.90144H5.04984V7.83014H6.12114ZM5.58549 3.54494C6.46396 3.54494 7.19244 4.21718 7.19244 5.0694C7.19244 5.59969 6.94283 5.94412 6.50038 6.24087L6.40932 6.29979C6.21006 6.42299 6.13721 6.49959 6.12382 6.59761L6.12114 6.6351V7.02666H5.04984V6.63564C5.04984 6.09785 5.30321 5.7486 5.75155 5.44864L5.84421 5.38972C6.06062 5.25474 6.12114 5.17921 6.12114 5.0694C6.12114 4.82889 5.89081 4.61624 5.58549 4.61624C5.3016 4.61624 5.08306 4.79943 5.05306 5.01798L5.04984 5.06994H3.97855C3.97855 4.21772 4.70703 3.54494 5.58549 3.54494Z" fill="#121314" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <span>CSV Export</span>
                            </div>
                        </div>

                        <div className='applicant-detail display-1'>
                            <div className='found-filter display-1'>
                                <p>Found:</p>
                                <div className='value'>
                                    <span>3</span>
                                </div>
                            </div>
                            <div className='found-filter display-1'>
                                <p>Period:</p>
                                <div className='value'>
                                    <span> <FormControl fullWidth>
                                        <NativeSelect
                                            defaultValue={30}
                                            inputProps={{
                                                name: 'age',
                                                id: 'uncontrolled-native',
                                            }}
                                        >
                                            <option value={10}>Ten</option>
                                            <option value={20}>Twenty</option>
                                            <option value={30}>Thirty</option>
                                        </NativeSelect>
                                    </FormControl></span>
                                </div>
                            </div>
                            <div className='found-filter display-1'>
                                <p>Document type:</p>
                                <div className='value'>
                                    <span> <FormControl fullWidth>
                                        <NativeSelect
                                            defaultValue={30}
                                            inputProps={{
                                                name: 'age',
                                                id: 'uncontrolled-native',
                                            }}
                                        >
                                            <option value={10}>Ten</option>
                                            <option value={20}>Twenty</option>
                                            <option value={30}>Thirty</option>
                                        </NativeSelect>
                                    </FormControl></span>
                                </div>
                            </div>


                            <div className='found-filter display-1'>
                                <p>Country:</p>
                                <div className='value'>
                                    <span> <FormControl fullWidth>
                                        <NativeSelect
                                            defaultValue={30}
                                            inputProps={{
                                                name: 'age',
                                                id: 'uncontrolled-native',
                                            }}
                                        >
                                            <option value={10}>Ten</option>
                                            <option value={20}>Twenty</option>
                                            <option value={30}>Thirty</option>
                                        </NativeSelect>
                                    </FormControl></span>
                                </div>
                            </div>
                            <div className='found-filter display-1'>
                                <p>Level:</p>
                                <div className='value'>
                                    <span> <FormControl fullWidth>
                                        <NativeSelect
                                            defaultValue={30}
                                            inputProps={{
                                                name: 'age',
                                                id: 'uncontrolled-native',
                                            }}
                                        >
                                            <option value={10}>Ten</option>
                                            <option value={20}>Twenty</option>
                                            <option value={30}>Thirty</option>
                                        </NativeSelect>
                                    </FormControl></span>
                                </div>
                            </div>
                            <div className='found-filter display-1'>
                                <p>Platform:</p>
                                <div className='value'>
                                    <span> <FormControl fullWidth>
                                        <NativeSelect
                                            defaultValue={30}
                                            inputProps={{
                                                name: 'age',
                                                id: 'uncontrolled-native',
                                            }}
                                        >
                                            <option value={10}>Ten</option>
                                            <option value={20}>Twenty</option>
                                            <option value={30}>Thirty</option>
                                        </NativeSelect>
                                    </FormControl></span>
                                </div>
                            </div>
                            <div className='found-filter display-1'>
                                <p>Applicant status:</p>
                                <div className='value'>
                                    <span> <FormControl fullWidth>
                                        <NativeSelect
                                            defaultValue={30}
                                            inputProps={{
                                                name: 'age',
                                                id: 'uncontrolled-native',
                                            }}
                                        >
                                            <option value={10}>Ten</option>
                                            <option value={20}>Twenty</option>
                                            <option value={30}>Thirty</option>
                                        </NativeSelect>
                                    </FormControl></span>
                                </div>
                            </div>
                            <div className='refresh-bar'>
                                <span className='display-1'> <LoopIcon />Refresh</span>
                            </div>
                            <div className='refresh-bar'>
                                <span>Clear filters</span>
                            </div>
                        </div>

                        <div className='applicant-table'>

                            <ApplicantBody />
                        </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <div className='applicant-table'>

                            <ApplicantBody />
                        </div>
                    </CustomTabPanel>
                </Box>
            </Box>
        </div>
    )
}

export default Applicant
