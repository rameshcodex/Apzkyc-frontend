/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import './Kyb.css'
import Sidebar from '../SideBar/Sidebar'
// import PdfViewer from 'pdf-viewer-reactjs';
import { Box, Grid, Button, useTheme, useMediaQuery, styled, Snackbar, Tabs, Tab, Typography } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid';
// import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Backdrop from '@mui/material/Backdrop';
import Axios from '../../../Axios';
import DeleteIcon from '@mui/icons-material/Delete';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { decryptData } from '../../../middleware';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PDFViewer from './PDFViewer';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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


function Kybstatus() {

    const theme = useTheme();
    const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

    const [imageUrl, setImageUrl] = useState(null);
    const [load, setLoad] = useState("")

    const [load2, setLoad2] = useState(false)

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

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

    const [companyName, setCompanyName] = useState("")
    const [dateOfReg, setDateOfReg] = useState("")
    const [companyEmail, setCompanyEmail] = useState("")
    const [companyPhone, setCompanyPhone] = useState("")
    const [companyAddress, setCompanyAddress] = useState("")
    const [companyAddressImg, setCompanyAddressImg] = useState("")
    const [vatNumber, setVatNumber] = useState("")
    const [vatImg, setVatImg] = useState("")
    const [itNumber, setItNumber] = useState("")
    const [itImg, setItImg] = useState("")
    const [bankImg, setBankImg] = useState("")
    const [direcorImg, setDirecorImg] = useState([])

    const [directorsApprove, setDirectorsApprove] = useState('');
    const [addrApprove, setAddrApprove] = useState('');
    const [vatApprove, setVatApprove] = useState('');
    const [incomeApprove, setIncomeApprove] = useState('');
    const [bankApprove, setBankApprove] = useState('');

    const [DirectorsReason, setDirectorsReason] = useState('');
    const [AddressReason, setAddressReason] = useState('');
    const [VatReason, setVatReason] = useState('');
    const [IncomeReason, setIncomeReason] = useState('');
    const [BankReason, setBankReason] = useState('');
    const [id_verify, setId_verify] = useState()
    const [forpdf, setForpdf] = useState(false)
    const [kycStatus, setKycStatus] = useState(false)
    const [ofc, setOfc] = useState(false)
    const [sec, setSec] = useState(false)
    const [openNew, setOpenNew] = useState(false);

    const handleOpenNew = () => setOpenNew(true);
    const handleCloseNew = () => setOpenNew(false);

    const [statusKyc, setStatusKyc] = useState("")
    const [kybDetails, setKybDetails] = useState()
    // console.log(kybDetails, 'kybDetails');


    const [resons, setReason] = useState("")



    const clearData = async () => {
        try {
            setCompanyName("")
            setDateOfReg("")
            setCompanyEmail("")
            setCompanyPhone("")
            setCompanyAddress("")
            setCompanyAddressImg("")
            setVatNumber("")
            setVatImg("")
            setItNumber("")
            setItImg("")
            setBankImg("")
            setDirecorImg([])
            setKycStatus(false)
        } catch (error) {
            console.log("🚀 ~ clearData ~ error:", error)
        }
    }

    const [apiCallStatus, setApiCallStatus] = useState(false)

    const checkkyb = async () => {
        try {
            setApiCallStatus(true)
            const { data } = await Axios.get('/checkkyb', {
                headers: {
                    Authorization: window.localStorage.getItem('Rikosta')
                }
            })
            if (data?.success == true) {
                if (data?.result?.nationalIds[0].status === 200) {
                    setSec(true)
                }
                if (data?.result?.OFAC_Ids[0]?.results[0]?.matchCount === 0) {
                    setOfc(true)
                }
                // PDFViewer(companyAddressImg)
                // console.log("🚀 ~ checkkyb ~ data:", data?.result):
                setKybDetails(data.result)
                setStatusKyc(data?.result?.Verify)
                setReason(data?.result?.reason)
                setKycStatus(true)
                setCompanyName(data?.result?.CompanyName)
                setDateOfReg(data?.result?.DateOfReg)
                setCompanyEmail(data?.result?.CompanyEmail)
                setCompanyPhone(data?.result?.Phone)
                setCompanyAddress(data?.result?.Address)
                setVatNumber(data?.result?.VatNumber)
                setVatImg(data?.result?.VatNumber_Proof)
                setItNumber(data?.result?.ITNumber)
                setDirecorImg(data?.result?.Diretors)
                //verification details
                setAddrApprove(data?.result?.address_reject)
                setVatApprove(data?.result?.vat_reject)
                setIncomeApprove(data?.result?.incometax_reject)
                setBankApprove(data?.result?.bank_reject)
                setDirectorsApprove(data?.result?.director_reject)
                setId_verify(data?.result?.document_id_verify)
                setAddressReason(data?.result?.address_reject_reason)
                setVatReason(data?.result?.vat_reject_reason)
                setIncomeReason(data?.result?.incometax_reject_reason)
                setBankReason(data?.result?.bank_reject_reason)
                setDirectorsReason(data?.result?.director_reject_reason)
                setApiCallStatus(false)
                let add = data?.result?.Address_Proof.split(".")
                let Vat = data?.result?.VatNumber_Proof.split(".")
                let It = data?.result?.ITNumber_Proof.split(".")
                let Bank = data?.result?.Bank_Proof.split(".")
                // console.log(data,"lakshmi");
                // console.log(data?.result?.ITNumber_Proof, It[3], "Vijay");
                if (add[3] === "pdf" || Vat[3] === "pdf" || It[3] === "pdf" || Bank[3] === "pdf") {
                    // console.log(add[3], "add[1]");
                    setForpdf(true)
                    setCompanyAddressImg(data?.result?.Address_Proof)
                    setVatImg(data?.result?.VatNumber_Proof)
                    setItImg(data?.result?.ITNumber_Proof)
                    setBankImg(data?.result?.Bank_Proof)
                }
                else if (add[3] != "pdf" || Vat[3] != "pdf" || It[3] != "pdf" || Bank[3] != "pdf") {
                    // console.log(add[3], "add[1]false");
                    setForpdf(false)
                    setCompanyAddressImg(data?.result?.Address_Proof)
                    setVatImg(data?.result?.VatNumber_Proof)
                    setItImg(data?.result?.ITNumber_Proof)
                    setBankImg(data?.result?.Bank_Proof)
                }
            } else {
                setApiCallStatus(false)
                // toast.error("Please Verify Your KYB")
                // navigate('/kyb')
            }
        } catch (error) {
            setApiCallStatus(false)
            console.log("🚀 ~ checkkyb ~ error:", error)
        }
    }

    useEffect(() => {
        // console.log(itImg, bankImg, "bankimage");

        checkkyb()
    }, [])

    const imageUpload = async (imgForm, type) => {
        try {
            setLoad(type)
            const formdata = new FormData();
            formdata.append("image", imgForm)
            const { data } = await Axios.post('/uploadimage', formdata, {
                headers: {
                    Authorization: window.localStorage.getItem('Rikosta')
                }
            })
            if (data?.success) {
                setLoad("")
                return data?.result
            }
            setLoad("")
        } catch (error) {
            setLoad("")
            console.log("🚀 ~ imageUpload ~ error:", error)
        }
    }

    const handleImageUpload = async (event, type) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };

        if (file) {
            // console.log(file, "file");

            const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
            if (!validImageTypes.includes(file.type)) {
                toast.error('Please select a valid image file (jpg, png, jpeg, webp).');
                return;
            } else {
                setForpdf(false)
                var img = await imageUpload(file, type)
                if (img) {
                    if (type == "address") {
                        if (file.type === 'application/pdf') {
                            setForpdf(true)
                            setCompanyAddressImg(img)
                        } else {
                            setForpdf(false)
                            setCompanyAddressImg(img)
                        }
                    } else if (type == "vat") {
                        if (file.type === 'application/pdf') {
                            setForpdf(true)
                            setVatImg(img)
                        } else {
                            setForpdf(false)
                            setVatImg(img)
                        }

                    } else if (type == "it") {
                        if (file.type === 'application/pdf') {
                            setForpdf(true)
                            setItImg(img)
                        } else {
                            setForpdf(false)
                            setItImg(img)
                        }

                    } else if (type == "bank") {
                        if (file.type === 'application/pdf') {
                            setForpdf(true)
                            setBankImg(img)
                        } else {
                            setForpdf(false)
                            setBankImg(img)
                        }

                    }
                }
                reader.readAsDataURL(file);
                // setLoad(true)
                // const time = setTimeout(() => {
                //     setLoad(false)
                // }, 3000)

                // return () => {
                //     clearTimeout(time)
                // }


            }

        }


    };

    const navigate = useNavigate()

    const [imageUrls, setImageUrls] = useState([]); // Store multiple images in an array
    //   const [load, setLoad] = useState(false);

    const handleImageUpload2 = async (event) => {
        const files = event.target.files; // This will give you all selected files
        const fileArray = Array.from(files); // Convert file list to array
        const readers = [];
        fileArray.forEach(async (file) => {
            const reader = new FileReader();
            readers.push(reader);
            reader.onloadend = () => {
                setImageUrls((prevUrls) => [...prevUrls, reader.result]); // Append each image URL to the array
            };
            if (file) {
                const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
                if (!validImageTypes.includes(file.type)) {
                    toast.error('Please select a valid image file (jpg, png, jpeg, webp).');
                    return;
                } else {
                    reader.readAsDataURL(file);
                    var img = await imageUpload(file, "director")
                    setDirecorImg([...direcorImg, img])
                    // const time = setTimeout(() => {
                    //     setLoad2(false);
                    // }, 3000);
                    // return () => {
                    //     clearTimeout(time);
                    // };
                }
            }
        });
    };
    const [apiStauts, setApiStatus] = useState(false)

    const handleSave = async () => {
        // setOpen(true)
        // const timer = setTimeout(() => {
        //     setOpen(false)
        // }, 5000)
        // return () => clearTimeout(timer)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const pattern = /^[a-zA-Z0-9._%+-]+@(?!gmail\.com|yahoo\.com|hotmail\.com|mailinator\.com|outlook\.com|aol\.com)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;;
        try {
            if (companyName == "") {
                toast.error("Please Enter Company Name")
            } else if (dateOfReg == "") {
                toast.error("Please Enter Date Of Register")
            } else if (!emailPattern.test(companyEmail)) {
                toast.error("Please Enter Valid Email")
            } else if (companyEmail == "") {
                toast.error("Please Enter Company Email")
            } else if (!pattern.test(companyEmail)) {
                toast.error("Please Enter a Company Email")
            } else if (companyPhone == "") {
                toast.error("Please Enter Company Phone")
            } else if (companyAddress == "") {
                toast.error("Please Enter Company Address")
            } else if (companyAddressImg == "") {
                toast.error("Please Upload Company Address Image")
            } else if (vatNumber == "") {
                toast.error("Please Enter Vat Number")
            } else if (vatImg == "") {
                toast.error("Please Upload Vat Image")
            } else if (itNumber == "") {
                toast.error("Please Enter IT Number")
            } else if (itImg == "") {
                toast.error("Please Upload IT Image")
            } else if (bankImg == "") {
                toast.error("Please Upload Bank Image")
            }
            else if (direcorImg?.length == 0) {
                toast.error("Please Upload Direcor Image")
            }
            else {
                setApiStatus(true)
                setApiCallStatus(true)
                var payload = {
                    CompanyName: companyName,
                    DateOfReg: dateOfReg,
                    CompanyEmail: companyEmail,
                    Phone: companyPhone,
                    Address: companyAddress,
                    Address_Proof: companyAddressImg,
                    VatNumber: vatNumber,
                    VatNumber_Proof: vatImg,
                    ITNumber: itNumber,
                    ITNumber_Proof: itImg,
                    Bank_Proof: bankImg,
                    Diretors: direcorImg
                }
                const { data } = await Axios.post('/users/createKyb', payload,
                    {
                        headers: {
                            Authorization: window.localStorage.getItem('Rikosta')
                        }
                    }
                )
                if (data?.success == true) {
                    setApiCallStatus(false)
                    toast.success(data?.message)
                    navigate('/dashboard')
                    setApiStatus(false)
                } else {
                    setApiCallStatus(false)
                    setApiStatus(false)
                    toast.error(data?.message)
                }
            }
        } catch (error) {
            setApiStatus(false)
            setApiCallStatus(false)
            console.log("🚀 ~ handleSave ~ error:", error)
        }
    }

    // const PDFViewer = ({ pdfUrl }) => {
    //     return <PdfViewer document={{ url: pdfUrl }} />;
    //   };

    return (
        <div className='kyb'>
            <Box sx={{ display: isLgUp ? 'flex' : 'block' }}>
                <Sidebar />
                {
                    usertype === 'organization' || subAdminDetails?.access?.kyb === true ?
                        <Box
                            component="main"
                            sx={{
                                flexGrow: 1,
                                py: 1,
                                marginTop: "80px",
                                // height: '100vh'
                            }}
                        >
                            <Grid container spacing={3} sx={{ p: 3 }}>
                                <Grid item xs={12} sm={12}>
                                    <h2>Kyc Status</h2>
                                    {
                                        statusKyc &&
                                        <div className='mt-20'>
                                            <h2 style={{ textAlign: "center", backgroundColor: "wheat", padding: "1%" }}>
                                                Your KYB Verification is {statusKyc}  {statusKyc == "Rejected" && <Button onClick={() => { clearData() }} >Re Verify</Button>}
                                                {statusKyc == "Rejected" && <div>Reason: {resons}</div>}
                                            </h2>
                                        </div>
                                    }
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        p: 2,
                                        bgcolor: 'rgba(33, 150, 243, 0.05)',
                                        borderRadius: 2,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: 'rgba(33, 150, 243, 0.1)',
                                            transform: 'translateY(-2px)',
                                        }
                                    }}>
                                        {
                                            sec === true ?
                                                <CheckCircleOutlineIcon sx={{ color: "green", fontSize: 24, mr: 2, }} />
                                                :
                                                <CancelOutlinedIcon sx={{ color: "red", fontSize: 24, mr: 2, }} />
                                        }
                                        <Box>
                                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                {
                                                    sec === true && "Secure Citizen ID Check"}
                                            </Typography>
                                            <Typography variant="caption" >
                                                {
                                                    sec === false &&
                                                    <div className="clr-red">
                                                        {"Secure Citizen ID Not Found"}
                                                    </div>
                                                }
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        p: 2,
                                        bgcolor: 'rgba(33, 150, 243, 0.05)',
                                        borderRadius: 2,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: 'rgba(33, 150, 243, 0.1)',
                                            transform: 'translateY(-2px)',
                                        }
                                    }}>
                                        {
                                            ofc === true ?
                                                <CheckCircleOutlineIcon sx={{ color: "green", fontSize: 24, mr: 2, }} />
                                                :
                                                <CancelOutlinedIcon sx={{ color: "red", fontSize: 24, mr: 2, }} />
                                        }
                                        <Box>
                                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                {
                                                    ofc === true && "Canadian Special Economic Measures Act Sanctions"}
                                            </Typography>
                                            <Typography variant="caption" >
                                                {
                                                    ofc === false &&
                                                    <div className="clr-red">
                                                        {"Canadian Special Economic Measures Act Sanctions Not Found"}
                                                    </div>
                                                }
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        p: 2,
                                        bgcolor: 'rgba(33, 150, 243, 0.05)',
                                        borderRadius: 2,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: 'rgba(33, 150, 243, 0.1)',
                                            transform: 'translateY(-2px)',
                                        }
                                    }}>
                                        {
                                            ofc === true ?
                                                <CheckCircleOutlineIcon sx={{ color: "green", fontSize: 24, mr: 2, }} />
                                                :
                                                <CancelOutlinedIcon sx={{ color: "red", fontSize: 24, mr: 2, }} />
                                        }
                                        <Box>
                                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                {
                                                    ofc === true && "US BIS Denied Persons List"}
                                            </Typography>
                                            <Typography variant="caption" >
                                                {
                                                    ofc === false &&
                                                    <div className="clr-red">
                                                        {"US BIS Denied Persons List Not Found"}
                                                    </div>
                                                }
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        p: 2,
                                        bgcolor: 'rgba(33, 150, 243, 0.05)',
                                        borderRadius: 2,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: 'rgba(33, 150, 243, 0.1)',
                                            transform: 'translateY(-2px)',
                                        }
                                    }}>
                                        {
                                            ofc === true ?
                                                <CheckCircleOutlineIcon sx={{ color: "green", fontSize: 24, mr: 2, }} />
                                                :
                                                <CancelOutlinedIcon sx={{ color: "red", fontSize: 24, mr: 2, }} />
                                        }
                                        <Box>
                                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                {
                                                    ofc === true && "Lithuanian FIU Sanctions"}
                                            </Typography>
                                            <Typography variant="caption" >
                                                {
                                                    ofc === false &&
                                                    <div className="clr-red">
                                                        {"Lithuanian FIU Sanctions Not Found"}
                                                    </div>
                                                }
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        p: 2,
                                        bgcolor: 'rgba(33, 150, 243, 0.05)',
                                        borderRadius: 2,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: 'rgba(33, 150, 243, 0.1)',
                                            transform: 'translateY(-2px)',
                                        }
                                    }}>
                                        {
                                            ofc === true ?
                                                <CheckCircleOutlineIcon sx={{ color: "green", fontSize: 24, mr: 2, }} />
                                                :
                                                <CancelOutlinedIcon sx={{ color: "red", fontSize: 24, mr: 2, }} />
                                        }
                                        <Box>
                                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                {
                                                    ofc === true && "OFAC Consolidated (non-SDN) List"}
                                            </Typography>
                                            <Typography variant="caption" >
                                                {
                                                    ofc === false &&
                                                    <div className="clr-red">
                                                        {"OFAC Consolidated (non-SDN) List Not Found"}
                                                    </div>
                                                }
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        p: 2,
                                        bgcolor: 'rgba(33, 150, 243, 0.05)',
                                        borderRadius: 2,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: 'rgba(33, 150, 243, 0.1)',
                                            transform: 'translateY(-2px)',
                                        }
                                    }}>
                                        {
                                            ofc === true ?
                                                <CheckCircleOutlineIcon sx={{ color: "green", fontSize: 24, mr: 2, }} />
                                                :
                                                <CancelOutlinedIcon sx={{ color: "red", fontSize: 24, mr: 2, }} />
                                        }
                                        <Box>
                                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                {
                                                    ofc === true && "EU Financial Sanctions Files (FSF)"}
                                            </Typography>
                                            <Typography variant="caption" >
                                                {
                                                    ofc === false &&
                                                    <div className="clr-red">
                                                        {"EU Financial Sanctions Files (FSF) Not Found"}
                                                    </div>
                                                }
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        p: 2,
                                        bgcolor: 'rgba(33, 150, 243, 0.05)',
                                        borderRadius: 2,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: 'rgba(33, 150, 243, 0.1)',
                                            transform: 'translateY(-2px)',
                                        }
                                    }}>
                                        {
                                            ofc === true ?
                                                <CheckCircleOutlineIcon sx={{ color: "green", fontSize: 24, mr: 2, }} />
                                                :
                                                <CancelOutlinedIcon sx={{ color: "red", fontSize: 24, mr: 2, }} />
                                        }
                                        <Box>
                                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                {
                                                    ofc === true && "UN Security Council Consolidated Sanctions"}
                                            </Typography>
                                            <Typography variant="caption" >
                                                {
                                                    ofc === false &&
                                                    <div className="clr-red">
                                                        {"UN Security Council Consolidated Sanctions Not Found"}
                                                    </div>
                                                }
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        p: 2,
                                        bgcolor: 'rgba(33, 150, 243, 0.05)',
                                        borderRadius: 2,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: 'rgba(33, 150, 243, 0.1)',
                                            transform: 'translateY(-2px)',
                                        }
                                    }}>
                                        {
                                            ofc === true ?
                                                <CheckCircleOutlineIcon sx={{ color: "green", fontSize: 24, mr: 2, }} />
                                                :
                                                <CancelOutlinedIcon sx={{ color: "red", fontSize: 24, mr: 2, }} />
                                        }
                                        <Box>
                                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                {
                                                    ofc === true && "Office of Financial Sanctions Implementation"}
                                            </Typography>
                                            <Typography variant="caption" >
                                                {
                                                    ofc === false &&
                                                    <div className="clr-red">
                                                        {"Office of Financial Sanctions Implementation Not Found"}
                                                    </div>
                                                }
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        p: 2,
                                        bgcolor: 'rgba(33, 150, 243, 0.05)',
                                        borderRadius: 2,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: 'rgba(33, 150, 243, 0.1)',
                                            transform: 'translateY(-2px)',
                                        }
                                    }}>
                                        {
                                            ofc === true ?
                                                <CheckCircleOutlineIcon sx={{ color: "green", fontSize: 24, mr: 2, }} />
                                                :
                                                <CancelOutlinedIcon sx={{ color: "red", fontSize: 24, mr: 2, }} />
                                        }
                                        <Box>
                                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                {
                                                    ofc === true && "OFAC SDN"}
                                            </Typography>
                                            <Typography variant="caption" >
                                                {
                                                    ofc === false &&
                                                    <div className="clr-red">
                                                        {"OFAC SDN Not Found"}
                                                    </div>
                                                }
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        p: 2,
                                        bgcolor: 'rgba(33, 150, 243, 0.05)',
                                        borderRadius: 2,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: 'rgba(33, 150, 243, 0.1)',
                                            transform: 'translateY(-2px)',
                                        }
                                    }}>
                                        {
                                            ofc === true ?
                                                <CheckCircleOutlineIcon sx={{ color: "green", fontSize: 24, mr: 2, }} />
                                                :
                                                <CancelOutlinedIcon sx={{ color: "red", fontSize: 24, mr: 2, }} />
                                        }
                                        <Box>
                                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                {
                                                    ofc === true && "Mexican Tax Code Article 69.B"}
                                            </Typography>
                                            <Typography variant="caption" >
                                                {
                                                    ofc === false &&
                                                    <div className="clr-red">
                                                        {"Mexican Tax Code Article 69.B Not Found"}
                                                    </div>
                                                }
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        p: 2,
                                        bgcolor: 'rgba(33, 150, 243, 0.05)',
                                        borderRadius: 2,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: 'rgba(33, 150, 243, 0.1)',
                                            transform: 'translateY(-2px)',
                                        }
                                    }}>
                                        {
                                            ofc === true ?
                                                <CheckCircleOutlineIcon sx={{ color: "green", fontSize: 24, mr: 2, }} />
                                                :
                                                <CancelOutlinedIcon sx={{ color: "red", fontSize: 24, mr: 2, }} />
                                        }
                                        <Box>
                                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                {
                                                    ofc === true && "Belgian Financial Sanctions"}
                                            </Typography>
                                            <Typography variant="caption" >
                                                {
                                                    ofc === false &&
                                                    <div className="clr-red">
                                                        {"Belgian Financial Sanctions Not Found"}
                                                    </div>
                                                }
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        p: 2,
                                        bgcolor: 'rgba(33, 150, 243, 0.05)',
                                        borderRadius: 2,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: 'rgba(33, 150, 243, 0.1)',
                                            transform: 'translateY(-2px)',
                                        }
                                    }}>
                                        {
                                            ofc === true ?
                                                <CheckCircleOutlineIcon sx={{ color: "green", fontSize: 24, mr: 2, }} />
                                                :
                                                <CancelOutlinedIcon sx={{ color: "red", fontSize: 24, mr: 2, }} />
                                        }
                                        <Box>
                                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                {
                                                    ofc === true && "VAT Document"}
                                            </Typography>
                                            <Typography variant="caption" >
                                                {
                                                    ofc === false &&
                                                    <div className="clr-red">
                                                        {"VAT Document Not Found"}
                                                    </div>
                                                }
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        p: 2,
                                        bgcolor: 'rgba(33, 150, 243, 0.05)',
                                        borderRadius: 2,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: 'rgba(33, 150, 243, 0.1)',
                                            transform: 'translateY(-2px)',
                                        }
                                    }}>
                                        {
                                            ofc === true ?
                                                <CheckCircleOutlineIcon sx={{ color: "green", fontSize: 24, mr: 2, }} />
                                                :
                                                <CancelOutlinedIcon sx={{ color: "red", fontSize: 24, mr: 2, }} />
                                        }
                                        <Box>
                                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                {
                                                    ofc === true && "Bank Document"}
                                            </Typography>
                                            <Typography variant="caption" >
                                                {
                                                    ofc === false &&
                                                    <div className="clr-red">
                                                        {"Bank Document Not Found"}
                                                    </div>
                                                }
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        p: 2,
                                        bgcolor: 'rgba(33, 150, 243, 0.05)',
                                        borderRadius: 2,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: 'rgba(33, 150, 243, 0.1)',
                                            transform: 'translateY(-2px)',
                                        }
                                    }}>
                                        {
                                            ofc === true ?
                                                <CheckCircleOutlineIcon sx={{ color: "green", fontSize: 24, mr: 2, }} />
                                                :
                                                <CancelOutlinedIcon sx={{ color: "red", fontSize: 24, mr: 2, }} />
                                        }
                                        <Box>
                                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                {
                                                    ofc === true && "Income Tax Document"}
                                            </Typography>
                                            <Typography variant="caption" >
                                                {
                                                    ofc === false &&
                                                    <div className="clr-red">
                                                        {"Income Tax Document Not Found"}
                                                    </div>
                                                }
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        p: 2,
                                        bgcolor: 'rgba(33, 150, 243, 0.05)',
                                        borderRadius: 2,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: 'rgba(33, 150, 243, 0.1)',
                                            transform: 'translateY(-2px)',
                                        }
                                    }}>
                                        {
                                            ofc === true ?
                                                <CheckCircleOutlineIcon sx={{ color: "green", fontSize: 24, mr: 2, }} />
                                                :
                                                <CancelOutlinedIcon sx={{ color: "red", fontSize: 24, mr: 2, }} />
                                        }
                                        <Box>
                                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                {
                                                    ofc === true && "Director's Document"}
                                            </Typography>
                                            <Typography variant="caption" >
                                                {
                                                    ofc === false &&
                                                    <div className="clr-red">
                                                        {"Director's Document Not Found"}
                                                    </div>
                                                }
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        p: 2,
                                        bgcolor: 'rgba(33, 150, 243, 0.05)',
                                        borderRadius: 2,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: 'rgba(33, 150, 243, 0.1)',
                                            transform: 'translateY(-2px)',
                                        }
                                    }}>
                                        {
                                            ofc === true ?
                                                <CheckCircleOutlineIcon sx={{ color: "green", fontSize: 24, mr: 2, }} />
                                                :
                                                <CancelOutlinedIcon sx={{ color: "red", fontSize: 24, mr: 2, }} />
                                        }
                                        <Box>
                                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                {
                                                    ofc === true && "Director's Document Id Verfication"}
                                            </Typography>
                                            <Typography variant="caption" >
                                                {
                                                    ofc === false &&
                                                    <div className="clr-red">
                                                        {"Director's Document Id Verfication Not Found"}
                                                    </div>
                                                }
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Backdrop
                                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1, backdropFilter: 'blur(10px)' })}
                                open={open}
                                onClick={handleClose}
                            >
                                <div class="card2">
                                    <div class="loader2">
                                        <p>Checking..</p>
                                        <div class="words">
                                            <span class="word">Company Name</span>
                                            <span class="word">Company Address</span>
                                            <span class="word">VAT Number</span>
                                            <span class="word">Income-Tax Number</span>
                                            <span class="word">Proof of Address</span>
                                        </div>
                                    </div>
                                </div>
                            </Backdrop>

                            <Backdrop
                                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1, backdropFilter: 'blur(5px)' })}
                                open={apiCallStatus}
                            >
                                <div style={{ height: "80vh", }} >
                                    <div class="loader2">
                                        <span class="l">A</span>
                                        <span class="o">P</span>
                                        <span class="a">Z</span>
                                        <span class="d">K</span>
                                        <span class="i">Y</span>
                                        <span class="n">C</span>
                                        <span class="g">.</span>
                                        <span class="d1">.</span>
                                        <span class="d2">.</span>
                                    </div>
                                </div>
                            </Backdrop>
                        </Box> :
                        <Box
                            component="main"
                            sx={{
                                flexGrow: 1,
                                py: 1,
                                marginTop: "80px",
                                height: '50vh'
                            }}
                            className="display-3"
                        >
                            You Dont Have Permission To View
                        </Box>
                }


            </Box>
        </div >
    )
}

export default Kybstatus
