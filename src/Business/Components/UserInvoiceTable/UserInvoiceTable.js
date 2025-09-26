import React, { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, Box, TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import "./UserInvoice.css";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Axios from '../../../Axios';
import Sidebar from "../SideBar/Sidebar";
import { Triangle } from 'react-loader-spinner'
import toast from 'react-hot-toast';
import { decryptData } from '../../../middleware';
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';
import * as XLSX from "xlsx";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import RestoreIcon from '@mui/icons-material/Restore';
import Modal from '@mui/material/Modal';
import apx from '../../../Images/apzlogo.png'
import { downloadPdf } from "pdf-simplifier";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 700,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    borderRadius: '15PX',
    boxShadow: 15,
    p: 2,
    width: "90%",
    margin: "auto",
    overflowY: "auto",
    maxHeight: "calc(100vh - 10px)",
};

function UserInvoiceTable() {
    const theme = useTheme();
    const mdScreen = useMediaQuery(theme.breakpoints.up('md'));
    const [usertype, setUserType] = useState('')
    const token = localStorage.getItem('Rikosta')

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


    const [clientLoading, setClientLoading] = useState(false);


    const [userInvoice, setUserInvoice] = useState([])


    const paginatedClientList = userInvoice.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );




    const exportToExcel10 = (list, listid) => {
        try {
            if (list._id !== listid) {
                console.error("ID does not match. No data to export.");
                return;
            }
            const formattedData = {
                Name: list.name,
                Email: list.email,
                Plan_type: list.plan_id?.Title,
                Amount: list.plan_id?.Amount,
                Duration: list.plan_id?.Duration,
                Start_Date: new Date(list.start).toLocaleDateString(),
                End_Date: new Date(list.end).toLocaleDateString(),
            };
            const formattedList = [formattedData];
            const worksheet = XLSX.utils.json_to_sheet(formattedList);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, `user_invoice_${list.plan_id?.Title}.xlsx`);
        } catch (error) {
            console.error("Error exporting data:", error);
        }
    };
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");


    const fetchPlanUserInvoice = async (reset = false) => {
        try {
            setClientLoading(true);
            const payload = reset
                ? { start: null, end: null, search: '' }
                : {
                    start: startDate ? startDate.format("YYYY-MM-DD") : null,
                    end: endDate ? endDate.format("YYYY-MM-DD") : null,
                    search: searchQuery || '',
                };

            const response = await Axios.post("/getUserPayment", payload, {
                headers: {
                    Authorization: window.localStorage.getItem('Rikosta')
                }
            });
            if (response?.data?.success) {
                setUserInvoice(response.data.result)
            } else {
                toast.error(response?.data?.message || 'Failed to fetch invoices');
            }

        } catch (error) {
            console.log(error, "error");
            toast.error('Network error. Please check your internet connection and try again.');

        } finally {
            setClientLoading(false);
        }
    };



    useEffect(() => {
        fetchPlanUserInvoice()
    }, []);


    const handleReset = () => {
        setStartDate(null);
        setEndDate(null);
        setSearchQuery('')
        fetchPlanUserInvoice(true)
    };



    const [open, setOpen] = useState(false);
    const [invoice, setInvoice] = useState({});
    const printPdf = useRef(null);

    const exportToExcel = (list, listid) => {
        if (list._id !== listid) {
            console.error("ID does not match. No data to export.");
            return;
        }
        console.log("🚀 ~ exportToExcel ~ list:", list)
        console.log("🚀 ~ useEffect ~ userInvoice:", userInvoice)
        const formattedData = {
            Name: list.name,
            Email: list.email,
            Plan_type: list.plan_id?.Title,
            Amount: list.plan_id?.Amount,
            Amount: `${list.plan_id?.Amount + '' + list.plan_id?.Currency}`,
            Duration: list.plan_id?.Duration,
            Start_Date: new Date(list.start).toLocaleDateString(),
            End_Date: new Date(list.end).toLocaleDateString(),
            service: "Subscription",
            sprice: `${list.plan_id.Amount + list.plan_id.Currency}`,
            invoiceid: list.plan_id._id

        };
        setInvoice(formattedData);
        setOpen(true);
    };


    const handleDownload = async () => {
        const data = await downloadPdf(printPdf.current, "test", 440, 440)
    }





    const handleClose = () => setOpen(false);

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: "8px",
        margin: "auto",
        overflowY: "auto",
        maxHeight: "calc(100vh - 20px)",
    };



    return (
        <div>
            <Box sx={{ display: mdScreen ? 'flex' : 'block' }}>
                <Sidebar />
                <Box component="main" className="clientList-body" sx={{ flexGrow: 1, p: 3, marginTop: '50px' }}>
                    {
                        usertype === 'organization' ?
                            <Grid container spacing={2}>
                                <Grid item xs={12} sx={{ display: "flex", gap: 2, marginTop: "100px", flexWrap: "wrap" }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Start Date"
                                            value={startDate}
                                            onChange={(date) => setStartDate(date)}
                                        />
                                        <DatePicker
                                            label="End Date"
                                            value={endDate}
                                            onChange={(date) => setEndDate(date)}
                                        />
                                        <TextField
                                            label="Search"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </LocalizationProvider>
                                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }} className=''>
                                        <SearchIcon className='cursor' onClick={() => fetchPlanUserInvoice()} />
                                        <RestoreIcon className='cursor' onClick={handleReset} style={{ marginLeft: '10px' }} />
                                    </div>
                                </Grid>

                                <Grid item xs={12}>
                                    <div className='item-list-table'>
                                        <TableContainer >
                                            <Table aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="left">Name</TableCell>
                                                        <TableCell align="left">Email</TableCell>
                                                        <TableCell align="left">Plan_type</TableCell>
                                                        <TableCell align="left">Amount</TableCell>
                                                        <TableCell align="left">Duration</TableCell>
                                                        <TableCell align="left">Start_Date</TableCell>
                                                        <TableCell align="left">End_date</TableCell>
                                                        <TableCell align="center">Action</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {clientLoading ? (<TableRow > <TableCell colSpan={7} style={{ textAlign: "center" }}>
                                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                                                            <Triangle color="#009ff5" height={80} width={80} />
                                                        </div>
                                                    </TableCell>  </TableRow>) : paginatedClientList.length > 0 ?
                                                        (paginatedClientList?.map((List, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell >{List?.name}</TableCell>
                                                                <TableCell>{List?.email}</TableCell>
                                                                <TableCell>{List?.plan_id?.Title}</TableCell>
                                                                <TableCell>{List?.plan_id?.Amount + " " + List?.plan_id?.Currency}</TableCell>
                                                                <TableCell>{List?.plan_id?.Duration}</TableCell>
                                                                <TableCell>{new Date(List?.start).toLocaleDateString('en-GB')}</TableCell>
                                                                <TableCell>{new Date(List?.end).toLocaleDateString('en-GB')}</TableCell>
                                                                <TableCell>
                                                                    <Button
                                                                        variant="contained"
                                                                        className='view-btn' style={{
                                                                            color: "#fff",
                                                                            backgroundColor: "#009ff5",
                                                                            padding: "5px 5px",
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            borderRadius: "5px",
                                                                            fontWeight: "bold",
                                                                            '&:hover': {
                                                                                backgroundColor: "#007bb5",
                                                                            }

                                                                        }}
                                                                        onClick={() => { exportToExcel(List, List?._id) }}
                                                                    >
                                                                        View
                                                                        <GetAppRoundedIcon />
                                                                    </Button>
                                                                </TableCell>
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
                                        count={userInvoice?.length}
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


            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="button pop-up-modal-detail p-0">
                    <section ref={printPdf} className="invoice-sec">
                        <div className="container">
                            <div className="invoice-title">
                                <svg className='clo_se' onClick={handleClose} width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.5 0C9.92005 0 6.48532 1.42268 3.9538 3.9538C1.42254 6.48505 0 9.91972 0 13.5C0 17.0803 1.42268 20.5147 3.9538 23.0462C6.48505 25.5775 9.91972 27 13.5 27C17.0803 27 20.5147 25.5773 23.0462 23.0462C25.5775 20.5149 27 17.0803 27 13.5C26.9961 9.92105 25.5734 6.48897 23.0422 3.95778C20.511 1.42653 17.079 0.00398769 13.5 0ZM13.5 24.9231C10.4703 24.9231 7.56532 23.7198 5.42193 21.5781C3.28011 19.4349 2.07692 16.53 2.07692 13.5C2.07692 10.47 3.28024 7.56532 5.42193 5.42193C7.56505 3.28011 10.47 2.07692 13.5 2.07692C16.53 2.07692 19.4347 3.28024 21.5781 5.42193C23.7199 7.56505 24.9231 10.47 24.9231 13.5C24.9192 16.5284 23.7146 19.4324 21.5728 21.5728C19.4322 23.7146 16.5283 24.9191 13.5 24.9231ZM18.3872 10.0796L14.9681 13.5L18.3886 16.9204H18.3873C18.7923 17.3255 18.7923 17.9823 18.3873 18.3873C17.9823 18.7923 17.3255 18.7923 16.9204 18.3873L13.5 14.9682L10.0796 18.3873C9.67454 18.7923 9.01773 18.7923 8.61272 18.3873C8.2077 17.9823 8.2077 17.3255 8.61272 16.9204L12.0318 13.5L8.61272 10.0796C8.23109 9.67065 8.24276 9.03332 8.63738 8.63741C9.03329 8.24279 9.67066 8.2311 10.0795 8.61274L13.5 12.0319L16.9204 8.61142V8.61271C17.3293 8.23109 17.9667 8.24276 18.3626 8.63738C18.7572 9.03329 18.7689 9.67069 18.3872 10.0796Z" fill="black" />
                                </svg>
                            </div>
                            <div className="pad">
                                <div className="flx_inv">
                                    <div>
                                        <img src={apx} alt="apx" style={{ maxWidth: "60px" }} />
                                        <h2 className="h2tag">Invoice</h2>
                                    </div>
                                    <div style={{ textAlign: "right" }}>
                                        <h5>Your Details:</h5>
                                        <p>{invoice.Name || "N/A"}</p>
                                        <p>{invoice.Email || "N/A"}</p>
                                    </div>
                                </div>
                                <div className="flx_inv" style={{ alignItems: "flex-start" }}>
                                    <div>
                                        <h6>Pay To:</h6>
                                        <p>APZ-KYC</p>
                                    </div>
                                    <div style={{ textAlign: "right" }}>
                                        <h5>Client Details:</h5>
                                        <h6>Invoice No</h6>
                                        <p>{invoice.invoiceid || "N/A"}</p>
                                        <h6>Date</h6>
                                        <p>{new Date().toLocaleDateString('en-GB')}</p>
                                    </div>
                                </div>

                                <div className="invoice-table table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Description</th>
                                                <th>Plan Name</th>
                                                <th>Price</th>
                                                <th>Duration</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{invoice.service || "N/A"}</td>
                                                <td>{invoice.Plan_type || "N/A"}</td>
                                                <td>{invoice.Amount || "N/A"}</td>
                                                <td>{invoice.Duration || "N/A"}</td>
                                                <td>{invoice.Amount || "N/A"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="details-blocks m-0">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td></td>
                                                <td style={{ textAlign: "end" }}>
                                                    <div className="details-blocK">
                                                        <p style={{ fontWeight: "500" }}>Total:</p>
                                                        <h2>{invoice.Amount || "000.00"}</h2>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div style={{ padding: "20px" }} >
                        <Button
                            onClick={handleDownload}
                            variant="contained"
                            className="view-btn"
                            style={{
                                color: "#fff",
                                backgroundColor: "#009ff5",
                                padding: "10px 5px",
                                display: "flex",
                                alignItems: "center",
                                borderRadius: "5px",
                                fontWeight: "bold",
                            }}
                        >
                            Download
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div >
    )
}


export default UserInvoiceTable