import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Table, TableSortLabel } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import "./Settings.css";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Sidebar from "../SideBar/Sidebar";
import countryFlag from "../../../Images/country.svg";
import NativeSelect from '@mui/material/NativeSelect';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import sort from '../../../Images/sort.svg';
import apzBanner from '../../../Images/apz-banner.svg';
import Avatar from '@mui/material/Avatar';
import nodata from '../../../Images/nodata.gif'
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
// import PropTypes from 'prop-types';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';


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


//tab

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}



// sample

const sampleData = [
  { id: 1, type: 'Local', role: 'Admin', Lastlogin: '58 minutes ago', status: 'Active', tnameL: 'Apz pay', tdesc: 'no-reply@apzex.com' },
  { id: 2, type: 'Local', role: 'Admin', Lastlogin: '58 minutes ago', status: 'Active', tnameL: 'barath', tdesc: 'no-reply@apzex.com' },
  { id: 3, type: 'Local', role: 'Admin', Lastlogin: '58 minutes ago', status: 'Active', tnameL: 'Piiya', tdesc: 'no-reply@apzex.com' },
  { id: 4, type: 'Local', role: 'Admin', Lastlogin: '58 minutes ago', status: 'Active', tnameL: 'Sankar', tdesc: 'no-reply@apzex.com' },
];

export default function Settings() {
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
  // function createdData(
  //     date,
  //     time,
  //     gmt,
  //     exDate,
  //     exTime, 
  //     exGmt,
  //     source,
  //     ip,
  //     platform,
  //     chrome,
  //     dtype,
  //     dmarker,
  //     dmodel,
  //     countryFlag,
  //     country,
  //     city,

  //   ) {
  //     return { date, time, gmt, exDate, exTime, exGmt, source, ip, platform, chrome, dtype, dmarker, dmodel ,countryFlag, country, city};
  //   }

  //   const List = [
  //     createdData( 'Aug 6, 2024,', '4:19 PM', '(GMT+5:30)', 'Aug 7, 2024', '9:32 AM', '(GMT+5:30)', 'dashboard', '49.37.202.209', 'Win10', 'Chrome', 'Type: Desktop', 'Maker: Unknown', 'Model: Windows Desktop', countryFlag, 'India', 'Chennai'),
  //     createdData( 'Aug 6, 2024,', '4:19 PM', '(GMT+5:30)', 'Aug 7, 2024', '9:32 AM', '(GMT+5:30)', 'dashboard', '49.37.202.209', 'Win10', 'Chrome', 'Type: Desktop', 'Maker: Unknown', 'Model: Windows Desktop', countryFlag, 'India', 'Chennai'),
  //     createdData( 'Aug 6, 2024,', '4:19 PM', '(GMT+5:30)', 'Aug 7, 2024', '9:32 AM', '(GMT+5:30)', 'dashboard', '49.37.202.209', 'Win10', 'Chrome', 'Type: Desktop', 'Maker: Unknown', 'Model: Windows Desktop', countryFlag, 'India', 'Chennai'),
  //     createdData( 'Aug 6, 2024,', '4:19 PM', '(GMT+5:30)', 'Aug 7, 2024', '9:32 AM', '(GMT+5:30)', 'dashboard', '49.37.202.209', 'Win10', 'Chrome', 'Type: Desktop', 'Maker: Unknown', 'Model: Windows Desktop', countryFlag, 'India', 'Chennai'),
  //   ];

  // selector 2 data

  const [Language, setLanguage] = React.useState('');

  const handleSelectLanguage = (event) => {
    setLanguage(event.target.value);
  };

  // search & filter

  const [filter, setFilter] = useState('');
  const [data, setData] = useState(sampleData);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };



  // sorting
  const [orderBy, setOrderBy] = useState('id');
  const [order, setOrder] = useState('asc');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedRows = data.sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    } else {
      return a[orderBy] > b[orderBy] ? -1 : 1;
    }
  });


  const filteredData = sortedRows.filter(
    (item) =>
      item?.name?.toLowerCase().includes(filter?.toLowerCase())
  );
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const [listItm, setListItm] = useState([
    { name: "Members" },
    { name: "Roles" },
    { name: "Active Sessions" },
    { name: "Activity Log" },
    { name: "Audit Trail" },
  ])

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ display: mdScreen ? 'flex' : 'block' }}>
        <Sidebar />
        <Box component="main" className="setting-body" sx={{ flexGrow: 1, p: 3, marginTop: '56px' }}>
          <Grid container spacing={2}>
            <Grid xs={12} sm={4} md={3} lg={2.5} xl={1.5} className='setside-main'>
              <div className="setside margin-top">
                Settings
              </div>
              <List>
                <div onClick={handleClick} className='display-2 cursor margin-top'>

                  <ListItemText primary="Team" className='listHed' />
                  {open ? <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                    <mask id="path-2-inside-1_95_8352" fill="white">
                      <path d="M18.543 14.2422L12.8987 19.8865L7.25439 14.2422L12.8987 8.5979L18.543 14.2422Z" />
                    </mask>
                    <path d="M12.8987 8.5979L13.6042 7.89236L12.8987 7.18683L12.1931 7.89236L12.8987 8.5979ZM7.95993 14.9477L13.6042 9.30344L12.1931 7.89236L6.54886 13.5367L7.95993 14.9477ZM12.1931 9.30344L17.8374 14.9477L19.2485 13.5367L13.6042 7.89236L12.1931 9.30344Z" fill="#373D4D" mask="url(#path-2-inside-1_95_8352)" />
                  </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none" transform="rotate(180)">
                    <mask id="path-2-inside-1_95_8352" fill="white">
                      <path d="M18.543 14.2422L12.8987 19.8865L7.25439 14.2422L12.8987 8.5979L18.543 14.2422Z" />
                    </mask>
                    <path d="M12.8987 8.5979L13.6042 7.89236L12.8987 7.18683L12.1931 7.89236L12.8987 8.5979ZM7.95993 14.9477L13.6042 9.30344L12.1931 7.89236L6.54886 13.5367L7.95993 14.9477ZM12.1931 9.30344L17.8374 14.9477L19.2485 13.5367L13.6042 7.89236L12.1931 9.30344Z" fill="#373D4D" mask="url(#path-2-inside-1_95_8352)" />
                  </svg>}
                </div>
                <Collapse in={open} timeout="auto" unmountOnExit>

                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    // sx={{ borderRight: 1, borderColor: 'divider' }}
                    className='vibter'
                  >
                    {listItm.map((row, i) => {
                      return (
                        <Tab label={row.name} {...a11yProps(i)} />
                      )
                    })}
                  </Tabs>


                </Collapse>
                <div className="margin-top cursor">
                  <ListItemText primary="Branding" className='listHed' />
                </div>
                <div className="margin-top cursor">
                  <ListItemText primary="Business Information" className='listHed' />
                </div>
              </List>

            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={9.5} xl={10.5}>
              <TabPanel value={value} index={0} className='tb1'>
                <div>
                  <div className='setting-top-sec display-2'>
                    <div className='email-field search_user'>
                      <svg className="search-svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.82281 10.8828C8.71223 11.7248 7.32343 12.1138 5.93709 11.9711C4.55074 11.8285 3.27024 11.1649 2.35438 10.1144C1.43851 9.06391 0.955594 7.70492 1.00321 6.31207C1.05084 4.91922 1.62545 3.59639 2.61092 2.61092C3.59639 1.62545 4.91922 1.05084 6.31207 1.00321C7.70492 0.955594 9.06391 1.43851 10.1144 2.35438C11.1649 3.27024 11.8285 4.55074 11.9711 5.93709C12.1138 7.32343 11.7248 8.71223 10.8828 9.82281L14.5298 13.4698L13.4698 14.5298L9.82281 10.8828ZM10.4998 6.49981C10.4998 7.56067 10.0784 8.57809 9.32823 9.32823C8.57809 10.0784 7.56067 10.4998 6.49981 10.4998C5.43894 10.4998 4.42153 10.0784 3.67138 9.32823C2.92123 8.57809 2.49981 7.56067 2.49981 6.49981C2.49981 5.43894 2.92123 4.42153 3.67138 3.67138C4.42153 2.92123 5.43894 2.49981 6.49981 2.49981C7.56067 2.49981 8.57809 2.92123 9.32823 3.67138C10.0784 4.42153 10.4998 5.43894 10.4998 6.49981Z" fill="#373D4D" />
                      </svg>
                      <TextField
                        variant="outlined"
                        fullWidth
                        className=''
                        placeholder="Search by name or email"
                        margin="normal"
                        value={filter}
                        onChange={handleFilterChange}
                      />
                    </div>
                    <div className='left-setting-btn display-4'>
                      <Button variant='component' className='setting-cmn-btn teamManage-btn display-4' color="primary">
                        <svg classNmae="" xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M8.27862 2.89049C9.95062 2.17849 11.8336 1.97049 13.9106 2.25849C14.2719 2.30867 14.6052 2.48079 14.8553 2.74632C15.1053 3.01185 15.2572 3.35485 15.2856 3.71849L15.2906 3.84349V11.9685C15.2906 12.1951 15.2425 12.419 15.1494 12.6256C15.0564 12.8322 14.9205 13.0166 14.7508 13.1668C14.5811 13.3169 14.3814 13.4293 14.1651 13.4965C13.9487 13.5636 13.7205 13.5841 13.4956 13.5565C11.7696 13.3445 10.2396 13.5305 8.89062 14.1085V14.1325L8.83762 14.1315L8.64363 14.2195L8.45263 14.3125L8.09062 14.4965L7.72862 14.3125C7.60204 14.2485 7.47366 14.1881 7.34362 14.1315L7.29062 14.1325V14.1085C5.94262 13.5305 4.41162 13.3445 2.68563 13.5565C2.26446 13.6082 1.84002 13.4905 1.50564 13.2292C1.17127 12.968 0.95436 12.5846 0.902625 12.1635L0.893625 12.0665L0.890625 11.9695V3.84349C0.890577 3.45722 1.03027 3.08397 1.28391 2.79265C1.53756 2.50133 1.88803 2.3116 2.27063 2.25849C4.22563 1.98649 6.00762 2.15549 7.60562 2.77049L7.90262 2.89049L8.09062 2.97349L8.27862 2.89049ZM7.29062 4.36949C5.97862 3.80749 4.49463 3.61549 2.82562 3.80149L2.48962 3.84349V11.9685L2.83862 11.9305C4.44662 11.7755 5.93262 11.9285 7.29062 12.3945V4.36949ZM13.6896 3.84349C11.8836 3.59249 10.2896 3.76949 8.88962 4.36949V12.3945C10.1426 11.9645 11.5046 11.8005 12.9716 11.9005L13.3416 11.9305L13.6896 11.9685V3.84349Z" fill="var(--theme-color) " />
                        </svg>
                        How to manage team members</Button>
                      <Button variant='component' className='setting-cmn-btn display-4 invite-btn'><AddIcon />Invite team member</Button>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div className='display-2 setting-input'>
                        <div className='display-4'>
                          <div className='found-filter display-1'>
                            <p>Status:</p>
                            <div className='value'>
                              <span> <FormControl fullWidth>
                                <NativeSelect
                                  defaultValue={10}
                                  inputProps={{
                                    name: 'age',
                                    id: 'uncontrolled-native',
                                  }}
                                >
                                  <option value={10}>All</option>
                                  <option value={20}>Twenty</option>
                                  <option value={30}>Thirty</option>
                                </NativeSelect>
                              </FormControl></span>
                            </div>
                          </div>
                          <div className='found-filter display-1'>
                            <p>Role:</p>
                            <div className='value'>
                              <span> <FormControl fullWidth>
                                <NativeSelect
                                  defaultValue={10}
                                  inputProps={{
                                    name: 'age',
                                    id: 'uncontrolled-native',
                                  }}
                                >
                                  <option value={10}>All</option>
                                  <option value={20}>Twenty</option>
                                  <option value={30}>Thirty</option>
                                </NativeSelect>
                              </FormControl></span>
                            </div>
                          </div>
                        </div>
                        <div><Button className='display-4 clear-btn'><HighlightOffIcon />Clear filters</Button></div>
                      </div>
                      <div className='display-4 applicant-input'>
                        <div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Grid item xs={12}>
                    <div className='item-list-table'>
                      <TableContainer component={Paper} className='setting-paper-table'>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell className="table-bold-item">#</TableCell>
                              <TableCell>
                                <TableSortLabel className="table-bold-item"
                                  active={orderBy === 'id'}
                                  direction={orderBy === 'id' ? order : 'asc'}
                                  onClick={() => handleRequestSort('id')}
                                >
                                  Team member
                                  {/* <img src={Logo} /> */}
                                </TableSortLabel></TableCell>
                              <TableCell className="table-bold-item">Type</TableCell>
                              <TableCell className="table-bold-item">Role</TableCell>
                              <TableCell className="table-bold-item">Last login</TableCell>
                              <TableCell>
                                <TableSortLabel className="table-bold-item"
                                  active={orderBy === 'status'}
                                  direction={orderBy === 'status' ? order : 'asc'}
                                  onClick={() => handleRequestSort('status')}
                                >
                                  Status
                                </TableSortLabel></TableCell>
                              <TableCell>    </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>

                            {sortedRows.filter((row) => filter.toLowerCase() === '' ? row : row.tnameL.toLowerCase().includes(filter)).map((row) => (
                              <TableRow key={row.id}>
                                <TableCell>
                                  <div>
                                    {row.id}
                                    {/* {row.memberName}
                    {row.memberMail} */}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="display-1">
                                    <Avatar alt="Ap" src="/static/images/avatar/1.jpg" sx={{ width: 32, height: 32 }} />
                                    <div>
                                      {row.tnameL}
                                      <div className="tnamdesc">
                                        {row.tdesc}
                                      </div>
                                    </div>
                                  </div>

                                </TableCell>
                                <TableCell>{row.type}</TableCell>
                                <TableCell>{row.role}</TableCell>
                                <TableCell>{row.Lastlogin}</TableCell>
                                <TableCell>
                                  <div className="actv display-1">
                                    <div className="green"></div>
                                    {row.status}
                                  </div>
                                </TableCell>
                                <TableCell>     <ModeEditOutlinedIcon /></TableCell>
                              </TableRow>
                            ))}
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
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div className="text-center">
                  <img src={nodata} alt="nodata" />
                </div>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <div className="text-center">
                  <img src={nodata} alt="nodata" />
                </div>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <div className="text-center">
                  <img src={nodata} alt="nodata" />
                </div>
              </TabPanel>
              <TabPanel value={value} index={4}>
                <div className="text-center">
                  <img src={nodata} alt="nodata" />
                </div>
              </TabPanel>


            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>


  )
}
