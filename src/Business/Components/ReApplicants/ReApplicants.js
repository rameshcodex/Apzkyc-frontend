import React, { useState } from 'react';
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
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import "./ReApplicants.css";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Sidebar from "../SideBar/Sidebar";
import countryFlag from "../../../Images/country.svg";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
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


export default function ReApplicants() {
  // responsive
  const theme = useTheme();
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'));
  const MobileScreen = useMediaQuery(theme.breakpoints.up('sm'));


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

  // selector 2 data

  const [Language, setLanguage] = React.useState('');

  const handleSelectLanguage = (event) => {
    setLanguage(event.target.value);
  };

  // reload
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div>
      <Box sx={{ display: mdScreen ? 'flex' : 'block' }}>
        <Sidebar />
        <Box component="main" className="reApplicant-body" sx={{ flexGrow: 1, p: 3, marginTop: '80px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="import-popup profile-set-head display-2 ">
                <h1>Re-Applicants</h1>
              </div>
              <div className='profile-tab-outer-div'>
                <div>


                  <div>
                    <div className='found'>Found: 0</div>
                    <div className='display-4 applicant-input'>
                      <div className='display-4'>
                        <div className='email-field app'><InputLabel id="demo-simple-select-label">Applicant ID</InputLabel>
                          <TextField fullWidth id="fullWidth" placeholder='Applicant ID' />
                        </div>
                        <div className='email-field'>
                          <InputLabel id="demo-simple-select-label seperate">Type</InputLabel>
                          <FormControl sx={{ m: 0, width: 160 }}>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              placeholder='Select option'
                              className='select-item-list email-field'
                              value={Language}
                              onChange={handleSelectLanguage}
                            >
                              <MenuItem value={'En'}>English</MenuItem>
                              <MenuItem value={'Fn'}>French</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                        <div className='email-field'>
                          <InputLabel id="demo-simple-select-label seperate">Status</InputLabel>
                          <FormControl sx={{ m: 0, width: 160 }}>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              placeholder='Select option'
                              className='select-item-list email-field'
                              value={Language}
                              onChange={handleSelectLanguage}
                            >
                              <MenuItem value={'En'}>English</MenuItem>
                              <MenuItem value={'Fn'}>French</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                      <div>
                        <Button className='refresh-filter-btn' onClick={handleRefresh}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.9805 1C15.9505 1 19.9805 5.03 19.9805 10C19.9805 14.97 15.9505 19 10.9805 19C7.83847 19 4.97847 17.375 3.34747 14.771L3.19447 14.516L4.92347 13.511C6.16847 15.654 8.45647 17 10.9805 17C14.8465 17 17.9805 13.866 17.9805 10C17.9805 6.134 14.8465 3 10.9805 3C8.65147 3 6.52547 4.147 5.23447 6H7.98047V8H1.98047V2H3.98047V4.341C5.66047 2.264 8.21047 1 10.9805 1Z" fill="#19BC9B" />
                          </svg>
                          Refresh</Button>
                      </div>
                    </div>
                    <div className='display-4 applicant-input'>
                      <div>
                        <div className='email-field'>
                          <InputLabel id="demo-simple-select-label seperate">Country</InputLabel>
                          <FormControl sx={{ m: 0, width: 160 }}>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              placeholder='Select option'
                              className='select-item-list email-field'
                              value={Language}
                              onChange={handleSelectLanguage}
                            >
                              <MenuItem value={'En'}>English</MenuItem>
                              <MenuItem value={'Fn'}>French</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                      <div>
                        <Button className='refresh-filter-btn'>
                          Clear filters</Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Grid item xs={12}>
                  <div className='item-list-table'>
                    <TableContainer >
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="left" className="table-bold-item">Applicant ID</TableCell>
                            <TableCell align="left" className="table-bold-item">Type</TableCell>
                            <TableCell align="left" className="table-bold-item">Status</TableCell>
                            <TableCell align="left" className="table-bold-item">Country</TableCell>
                            <TableCell align="left" className="table-bold-item">Processed</TableCell>
                            <TableCell align="center" className="table-bold-item">Label</TableCell>
                            <TableCell align="center" className="table-bold-item">Conclusion</TableCell>
                            <TableCell>Placement</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody sx={{ display: 'none' }}>
                          {List?.map((List, index) => (
                            <TableRow key={index}>
                              <TableCell>
                              </TableCell>
                              <TableCell>
                              </TableCell>
                              <TableCell className="table-bold-item f-500">
                              </TableCell>
                              <TableCell className="table-bold-item f-500"></TableCell>
                              <TableCell>
                              </TableCell>
                              <TableCell>
                              </TableCell>
                              <TableCell>
                              </TableCell>
                              <TableCell>
                              </TableCell>

                            </TableRow>
                          ))
                          }

                        </TableBody>


                      </Table>
                    </TableContainer>
                    <>
                      <div className='add-false-content' sx={{ display: 'none' }}>
                        There are no items yet
                      </div>
                    </>
                  </div>

                  <TablePagination className="cmn-pagination"
                    component="div"
                    count={100}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Grid>

              </div>
            </Grid>

          </Grid>
        </Box>
      </Box>
    </div>
  )
}
