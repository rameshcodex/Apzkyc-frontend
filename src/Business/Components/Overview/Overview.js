import React, { useState, useEffect, useRef } from 'react'
import './Overview.css'
import { Box } from '@mui/material'
import Sidebar from '../SideBar/Sidebar'
import { Grid } from '@mui/material'
import { Table, TableSortLabel } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { decryptData } from '../../../middleware';
import ReactApexChart from "react-apexcharts";


import { Button, useTheme, useMediaQuery, styled, Snackbar, Tabs, Tab, Typography } from '@mui/material';
import Axios from '../../../Axios'

// const sampleData = [
//     { id: 1, type: 'Local', role: 'Admin', Lastlogin: '58 minutes ago', status: 'Active', tnameL: 'AIzaSyDaGmWKa4JsXZ-HjGw7ISLn_3namBGewQe', tdesc: 'no-reply@apzex.com' },
//     { id: 2, type: 'Local', role: 'Admin', Lastlogin: '58 minutes ago', status: 'Active', tnameL: 'AIzaSyDaGmWKa4JsXZ-HjGw7ISLn_3namBGewQe', tdesc: 'no-reply@apzex.com' },
//     { id: 3, type: 'Local', role: 'Admin', Lastlogin: '58 minutes ago', status: 'Active', tnameL: 'AIzaSyDaGmWKa4JsXZ-HjGw7ISLn_3namBGewQe', tdesc: 'no-reply@apzex.com' },
//     { id: 4, type: 'Local', role: 'Admin', Lastlogin: '58 minutes ago', status: 'Not-Active', tnameL: 'AIzaSyDaGmWKa4JsXZ-HjGw7ISLn_3namBGewQe', tdesc: 'no-reply@apzex.com' },
//     { id: 5, type: 'Local', role: 'Admin', Lastlogin: '58 minutes ago', status: 'Not-Active', tnameL: 'AIzaSyDaGmWKa4JsXZ-HjGw7ISLn_3namBGewQe', tdesc: 'no-reply@apzex.com' },
// ];
// import Grid from '@mui/material/Unstable_Grid'

function Overview() {

    const theme = useTheme();
    const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

    const [apiHits, setApiHits] = useState([
        { name: 'Per Month', value: 5000 },
        { name: 'Per Week', value: 3000 },
        { name: 'Per Day', value: 1500 },
    ])

    const [usertype, setUserType] = useState('')
    const token = localStorage.getItem('Rikosta')

    const subAdminDetails = JSON.parse(localStorage.getItem('subadmin'))


    useEffect(() => {
        if (token) {
            var user = window.localStorage.getItem('userType');
            const userType = decryptData(user)
            setUserType(userType)
        }
    }, [token])

    const number1Ref = useRef(null);
    const number2Ref = useRef(null);
    const number3Ref = useRef(null);
    const number4Ref = useRef(null);

    const simpleCounter = (ref, end, duration) => {
        let start = 0;

        const increment = end / (duration / 10);
        const interval = setInterval(() => {
            start += increment;
            if (start >= end) {
                start = end;
                clearInterval(interval);
            }
            if (ref.current) {
                if (duration === undefined) {
                    ref.current.innerText = Math.ceil(0);
                } else {
                    ref.current.innerText = Math.ceil(start);
                }

            }
        }, 10);
    };

    const [sampleData, setSampleData] = useState([])

    const GetApiKeyList = async () => {
        try {
            const { data } = await Axios.get('/getkey', {
                headers: {
                    Authorization: window.localStorage.getItem('Rikosta')
                }
            })
            if (data?.success == true && data?.result?.length > 0) {
                setSampleData(data?.result)
            } else {
                setSampleData([])
            }
        } catch (error) {
            console.log("🚀 ~ GetApiKeyList ~ error:", error)
        }
    }

    const [stat, setStat] = useState()

    const getStatistics = async () => {
        try {
            const { data } = await Axios.get('/users/getStatisticsOverview', {
                headers: {
                    Authorization: window.localStorage.getItem('Rikosta')
                }
            })
            if (data?.success == true) {
                setStat(data?.result)
                // Call the counter function for each statistic

                simpleCounter(number1Ref, data?.result[0]?.oneHourCount[0]?.count && data?.result[0].length > 0 ? data?.result[0]?.oneHourCount[0]?.count : 0, data?.result[0]?.monthCount[0]?.count);
                simpleCounter(number2Ref, data?.result[0]?.todayCount[0]?.count ? data?.result[0]?.todayCount[0]?.count : 0, data?.result[0]?.monthCount[0]?.count);
                simpleCounter(number3Ref, data?.result[0]?.weekCount[0]?.count ? data?.result[0]?.weekCount[0]?.count : 0, data?.result[0]?.monthCount[0]?.count);
                simpleCounter(number4Ref, data?.result[0]?.monthCount[0]?.count ? data?.result[0]?.monthCount[0]?.count : 0, data?.result[0]?.monthCount[0]?.count);
            }
        } catch (error) {
            console.log("🚀 ~ getStatistics ~ error:", error)
        }
    }

    useEffect(() => {
        GetApiKeyList()
        getStatistics()
    }, [])


    const [state, setState] = React.useState({

        series: [],
        options: {
            chart: {
                height: 100,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    offsetY: 0,
                    startAngle: 0,
                    endAngle: 270,
                    hollow: {
                        margin: 0,
                        size: '50%',
                        background: 'transparent',

                    },
                    dataLabels: {
                        name: {
                            show: false,
                        },
                        value: {
                            show: false,
                        }
                    },
                    barLabels: {
                        enabled: true,
                        useSeriesColors: true,
                        offsetX: -8,
                        fontSize: '10px',

                        formatter: function (seriesName, opts) {
                            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
                        },
                    },
                }
            },
            colors: ['var(--theme-color)', 'var(--theme-color)', 'var(--theme-color)', 'var(--theme-color)'],
            labels: [
                'Total Hit',
                'Sucess Rate',
                'Error Rate',
                "Response Time",
            ],
            fill: {
                type: "solid",
            },

            theme: {
                monochrome: {
                    enabled: true,
                },
            },
            plotOptions: {
                radialBar: {
                    offsetY: 0,
                    startAngle: 0,
                    endAngle: 270,
                    hollow: {
                        margin: 1,
                        size: '30%',
                        background: 'transparent',
                        image: undefined,
                    },
                    dataLabels: {
                        name: {
                            show: false,
                        },
                        value: {
                            show: false,
                        }
                    },
                    barLabels: {
                        enabled: true,
                        useSeriesColors: true,
                        offsetX: -8,
                        fontSize: '16px',
                        formatter: function (seriesName, opts) {
                            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
                        },
                    },
                }
            },
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                },
            },
            dataLabels: {
                formatter(val, opts) {
                    const name = opts.w.globals.labels[opts.seriesIndex]
                    return [name, val.toFixed(1) + '%']
                },
            },
            legend: {
                show: false,
            },
        },

    });


    const [monitor, setMonitor] = useState()


    const getApiKeyMonitor = async () => {
        try {
            const response = await Axios.get('/apikeymerites', {
                headers: {
                    apikey: window.localStorage.getItem('Rikosta')
                }
            });
            setMonitor(response.data.result)
            setState((prevState) => ({
                ...prevState,
                series: [
                    response.data.result.totalHits,
                    parseFloat(response.data.result.successRate),
                    parseFloat(response.data.result.errorRate),
                    response.data.result.averageSuccessResponseTime,
                ],

            }));
            console.log("API Metrics Response:", response.data.result);
        } catch (error) {
            console.error("Error fetching API key metrics:", error);
        }
    };


    useEffect(() => {
        getApiKeyMonitor()
    }, [])

    console.log("11111111111111111111", monitor)
    return (
        <div className='overview'>
            <Box sx={{ display: isLgUp ? 'flex' : 'block' }}>
                {/* <Sidebar /> */}
                {
                    usertype === 'organization' || subAdminDetails?.access?.overview === true ?
                        <Box
                            component="main"
                            sx={{
                                flexGrow: 1,
                                py: 1,
                                marginTop: "50px",
                                // height: '100vh'
                                p: 2
                            }}
                        >
                            <Grid container spacing={2} justifyContent={'flex-start'}>


                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                                    <div className="sectiontitle">
                                        <h2>API Statistics</h2>
                                        <span className="headerLine"></span>
                                    </div>
                                    <div id="projectFacts" className="sectionClass">
                                        <div className="fullWidth eight columns">
                                            <div className="projectFactsWrap">
                                                <div className="item" data-number="12">
                                                    <i className="fa fa-briefcase"></i>
                                                    <p ref={number1Ref} className="number">0+</p>
                                                    <span></span>
                                                    <p>Per hour</p>
                                                </div>
                                                <div className="item" data-number="55">
                                                    <i className="fa fa-smile-o"></i>
                                                    <p ref={number2Ref} className="number">0+</p>
                                                    <span></span>
                                                    <p>Per Day</p>
                                                </div>
                                                <div className="item" data-number="359">
                                                    <i className="fa fa-coffee"></i>
                                                    <p ref={number3Ref} className="number">0+</p>
                                                    <span></span>
                                                    <p>Per week</p>
                                                </div>
                                                <div className="item" data-number="246">
                                                    <i className="fa fa-camera"></i>
                                                    <p ref={number4Ref} className="number">0+</p>
                                                    <span></span>
                                                    <p>Per month</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                                    <div class="sectiontitle"><h2>Threshold</h2><span class="headerLine"></span></div>
                                    <br />
                                    <div style={{ display: 'flex', justifyContent: 'center' }} className="" >
                                        <div style={{ width: "60%" }} id="chart">
                                            <ReactApexChart options={state.options} series={state.series} type="radialBar" />
                                        </div>
                                        <div id="html-dist"></div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <div className="sectiontitle">
                                        <h2>API Keys</h2>
                                        <span className="headerLine"></span>
                                    </div>
                                    <div className="overviewtable">
                                        <TableContainer className='setting-paper-table '>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell className="table-bold-item">#</TableCell>


                                                        <TableCell className="table-bold-item">Name</TableCell>
                                                        <TableCell className="table-bold-item">Apikey</TableCell>
                                                        <TableCell className="table-bold-item">Start Date</TableCell>

                                                        <TableCell className="table-bold-item"> Expiry Date  </TableCell>
                                                        <TableCell className="table-bold-item"> Status  </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>

                                                    {sampleData?.length > 0 && sampleData?.map((row, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell>
                                                                <div>
                                                                    {index + 1}
                                                                    {/* {row.memberName}
                    {row.memberMail} */}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="display-1">
                                                                    {/* <Avatar alt="Ap" src="/static/images/avatar/1.jpg" sx={{ width: 32, height: 32 }} /> */}
                                                                    <div>
                                                                        {row?.APINAME}

                                                                    </div>
                                                                </div>

                                                            </TableCell>
                                                            <TableCell>{row?.APIKey?.slice(0, 20)}....{row?.APIKey?.slice(-20)}</TableCell>
                                                            <TableCell> {new Date(Number(row?.Startdate)).toISOString().slice(2, 10)} </TableCell>
                                                            <TableCell>{new Date(Number(row?.EndDate)).toISOString().slice(2, 10)}</TableCell>
                                                            <TableCell>
                                                                <div className={Number(row?.EndDate) > Date?.now() ? "actv display-1" : "deactv display-1"}>
                                                                    <div className={Number(row?.EndDate) > Date?.now() ? "green" : "red"}></div>
                                                                    {Number(row?.EndDate) > Date?.now() ? "Active" : "Deactive"}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                {/* <ModeEditOutlinedIcon /> */}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </div>
                                </Grid>
                                {/* <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                                    {apiHits.map((row, i) => {
                                        return (
                                            <div class="card margin-top">
                                                <div class="title">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" height="20" fill="currentColor" width="20">
                                                            <path d="M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z">
                                                            </path>
                                                        </svg>
                                                    </span>
                                                    <p class="title-text">
                                                        {row.name}
                                                    </p>
                                                    <p class="percent">
                                                        <svg width="20" height="20" fill="var(--theme-color) " viewBox="0 0 1792 1792" xmlns="[http://www.w3.org/2000/svg ↗](http://www.w3.org/2000/svg)"> <path d="M384 576q0-26 19-45t45-19h896q26 0 45 19t19 45-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45z"></path> </svg> 20%
                                                    </p>
                                                </div>
                                                <div class="data">
                                                    <p className='display-1'>
                                                        {row.value} <img width="35" height="35" src="https://img.icons8.com/ios/35/accuracy--v1.png" alt="accuracy--v1" />
                                                    </p>


                                                </div>
                                            </div>
                                        )
                                    })}
                                </Grid> */}
                            </Grid>
                        </Box> :
                        <Box
                            component="main"
                            sx={{
                                flexGrow: 1,
                                py: 1,
                                marginTop: "50px",
                                // height: '100vh'
                                p: 2
                            }}
                        >
                            You Dont Have Permission To View
                        </Box>
                }
            </Box>
        </div >
    )
}

export default Overview
