import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../SideBar/Sidebar'
import { Box, Button } from '@mui/material'
import './Pricing.css'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Axios from '../../../Axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    borderRadius: '15PX',
    boxShadow: 15,
    p: 2,
};

function Pricing() {

    const theme = useTheme();
    const isLgup = useMediaQuery(theme.breakpoints.up('lg'));

    console.log(isLgup, 'isLgup');


    const [count, setCount] = useState(0)

    const handleAdd = () => {
        setCount((perv) => perv + 1)
    }
    const handleSyb = () => {
        setCount((perv) => perv - 1)
    }
    const [select, setSelect] = useState(1)

    const [resps, setResps] = useState()

    const [paySelc, setPaySelc] = useState()
    const [start, setStart] = useState(false)

    const [alreadyPayment, setAlreadyPayment] = useState("")
    const [secondPayment, setSecoundPayment] = useState("")
    const [subsStatus, setSubsStatus] = useState(false)
    const [subam, setSubam] = useState(0)
    const [open, setOpen] = useState(false);
    const handleOpen = (row) => {
        let Amon = 0;
        if (secondPayment != "") {
            toast.error("Subcribtion Limit Reached")
        } else {
            for (let i = 0; i < planDetails.length; i++) {
                if (alreadyPayment.toString() === planDetails[i]?._id) {
                    Amon = planDetails[i].Amount

                }
            }
            if (row?.Amount < Amon) {
                setSubam(row?.Amount)
                setOpen(true)
            } else {
                if (alreadyPayment) {
                    setSubam(row?.Amount - Amon)

                } else {
                    setSubam(row?.Amount)
                }
                setOpen(true)
            }
        }




    };
    const handleClose = () => {
        setOpen(false)
        setStart(false)
        setPaySelc("")
        setResps("")
    };

    const [planDetails, setPlanDetails] = useState([])


    const [planDetailsInd, setPlanDetailsInd] = useState([])
    const getPlansDetails = async () => {
        try {
            const { data } = await Axios.get('/getPlans', {
                headers: {
                    Authorization: window.localStorage.getItem('Rikosta')
                }
            })
            if (data?.success) {
                let array = []
                for (let i = 0; i < data?.result.length; i++) {

                    if (data?.result[i].isDelete === false) {
                        array.push(data?.result[i])
                    }
                }

                console.log("🚀 ~ getPlansDetails ~ data?.result:", data?.result)

                setPlanDetails(array)
                setPlanDetailsInd(array)

                console.log("🚀 ~ getPlansDetails ~ data:", data);

            }
        } catch (error) {
            console.log("🚀 ~ getPlansDetails ~ error:", error)
        }
    }

    const [specialFeatCount, setSpecialFeatCount] = useState(0)

    const [priceShow, setPriceShow] = useState(0)

    const handlePriceShow = (val) => {
        // setPriceShow(val)

        setSelect(val);

        setSpecialFeatCount(val);
    }


    useEffect(() => {
        if (!isLgup) {
            setPlanDetails(
                planDetailsInd.filter((item, index) => index === count) // Filters based on count
            );
        } else {
            setPlanDetails(planDetailsInd); // Sets the entire array
        }

    }, [isLgup, count, planDetailsInd]);


    const [expandedCard, setExpandedCard] = useState(null);

    // Toggle function to handle "View More"
    const toggleViewMore = (id) => {
        setExpandedCard(expandedCard === id ? null : id);
    };

    const limited = (
        <>
            {
                planDetails?.length > 0 && planDetails?.filter(row => !row?.isDelete)
                    .map((row, index) => {
                        return (
                            <div key={index} className={`hideoption ${select === index ? "basic-main basic-ver" : "basic-main"} 
                            ${expandedCard === index ? "" : "hide_height"}`}
                                // onMouseEnter={() => {
                                //     setSelect(index); setSpecialFeatCount(index);
                                // }}
                                // onMouseLeave={() => { setSelect(null); setSpecialFeatCount(0); }}

                                onClick={(() => { handlePriceShow(index) })}
                            >
                                <div className="basixtxt text-left">
                                    {row?.Title}
                                </div>
                                <div className="display-1">
                                    <div className="bscprice">
                                        {row?.Currency}{row?.Amount}
                                    </div>
                                    <div className="mnt">
                                        min. per {row?.Duration}
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.84189 14.2892C9.52593 14.2892 11.141 13.6203 12.3318 12.4295C13.5226 11.2387 14.1916 9.62359 14.1916 7.93954C14.1916 6.2555 13.5226 4.64043 12.3318 3.44963C11.141 2.25883 9.52593 1.58984 7.84189 1.58984C6.15784 1.58984 4.54277 2.25883 3.35197 3.44963C2.16117 4.64043 1.49219 6.2555 1.49219 7.93954C1.49219 9.62359 2.16117 11.2387 3.35197 12.4295C4.54277 13.6203 6.15784 14.2892 7.84189 14.2892ZM6.96472 8.6498V8.96094H8.18205V8.70876C8.17506 8.56392 8.21515 8.42072 8.29634 8.30057C8.37617 8.19716 8.56303 8.04658 8.85693 7.84702C9.28508 7.56672 9.57626 7.31455 9.72865 7.0905C9.88195 6.86554 9.95815 6.59976 9.95815 6.29134C9.95815 5.82872 9.77129 5.45862 9.39847 5.18105C9.02837 4.90348 8.52765 4.76469 7.89722 4.76469C7.14154 4.76254 6.39653 4.94304 5.72562 5.29081L6.22543 6.21152C6.81323 5.93667 7.33663 5.79879 7.79562 5.79879C8.05868 5.79879 8.26459 5.84686 8.41154 5.94211C8.48201 5.98562 8.53959 6.04714 8.57834 6.12033C8.61709 6.19352 8.6356 6.27573 8.63197 6.35847C8.63197 6.52174 8.57936 6.66779 8.47504 6.80022C8.37526 6.93175 8.163 7.10229 7.84189 7.31274C7.50807 7.5377 7.27948 7.74814 7.15249 7.94771C7.02381 8.15886 6.95862 8.4026 6.96472 8.6498ZM7.02459 9.86531C6.88671 9.98596 6.81777 10.1647 6.81777 10.3996C6.81777 10.6264 6.88852 10.8033 7.02912 10.9293C7.16972 11.0527 7.36929 11.1144 7.626 11.1144C7.87726 11.1144 8.0732 11.0509 8.2138 10.9248C8.3544 10.796 8.42515 10.6209 8.42515 10.3987C8.42515 10.1701 8.3544 9.99322 8.2138 9.86985C8.07592 9.74648 7.87998 9.6848 7.626 9.6848C7.36294 9.6848 7.16247 9.74376 7.02459 9.86531Z" fill="#7D8799" />
                                    </svg>
                                </div>
                                <div className="starbsc margin-top">
                                    {console.log(alreadyPayment, "alreadyPayment")
                                    }
                                    {
                                        alreadyPayment == row?._id ?
                                            <Button style={{ color: "white", backgroundColor: "var(--theme-color) " }}>
                                                Activated
                                            </Button> :
                                            secondPayment == row?._id ?
                                                <Button style={{ color: "white", backgroundColor: "var(--theme-color) " }}>
                                                    Next Month Subscribtion
                                                </Button>
                                                :
                                                <Button onClick={() => { handleOpen(row); setPaySelc(row) }}>
                                                    Subscribe
                                                </Button>
                                    }

                                    {/* 

                                {
                                    alreadyPayment == row?._id ?
                                        <Button style={{ color: "white", backgroundColor: "var(--theme-color) " }}>
                                            Activated
                                        </Button> :
                                        <Button  onClick={() => { handleOpen(row); setPaySelc(row) }}>
                                            Subscribe
                                        </Button>
                                } */}
                                </div>
                                <div className="margin-top">
                                    {
                                        row?.Features?.filter(rows => rows?.status === true).map((rows, ind) => {
                                            return (
                                                <div className="display-1" key={ind}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                                        <path d="M10.6635 6.74668L9.702 5.78516L7.46147 8.02569L6.12803 6.69226L5.1665 7.65378L7.46147 9.94874L10.6635 6.74668Z" fill="var(--theme-color) " />
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M14.2648 7.62704C14.2648 9.31109 13.5958 10.9262 12.405 12.117C11.2142 13.3078 9.59917 13.9767 7.91513 13.9767C6.23108 13.9767 4.61601 13.3078 3.42521 12.117C2.23441 10.9262 1.56543 9.31109 1.56543 7.62704C1.56543 5.943 2.23441 4.32793 3.42521 3.13713C4.61601 1.94633 6.23108 1.27734 7.91513 1.27734C9.59917 1.27734 11.2142 1.94633 12.405 3.13713C13.5958 4.32793 14.2648 5.943 14.2648 7.62704ZM12.9042 7.62704C12.9042 8.95022 12.3785 10.2192 11.4429 11.1548C10.5073 12.0905 9.23831 12.6161 7.91513 12.6161C6.59195 12.6161 5.32297 12.0905 4.38734 11.1548C3.45171 10.2192 2.92608 8.95022 2.92608 7.62704C2.92608 6.30386 3.45171 5.03488 4.38734 4.09925C5.32297 3.16362 6.59195 2.63799 7.91513 2.63799C9.23831 2.63799 10.5073 3.16362 11.4429 4.09925C12.3785 5.03488 12.9042 6.30386 12.9042 7.62704Z" fill="var(--theme-color) " />
                                                    </svg>
                                                    <div className="bscdesc">{rows?.name}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                <div className='vi_ew' onClick={() => toggleViewMore(index)} >
                                    {expandedCard === index ? "View Less" : "View More"}
                                </div>
                            </div>
                        )
                    })
            }
        </>
    )

    const basic = (
        <div className={select === 1 ? "basic-main basic-ver" : "basic-main"}
            onMouseEnter={() => setSelect(1)}
            onMouseLeave={() => setSelect(null)}
        // onClick={()=>setSelect(1)}
        >
            <div className="basixtxt text-left">
                Basic
            </div>
            <div className="display-1">
                <div className="bscprice">
                    R200
                </div>
                <div className="mnt">
                    min. per month
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.84189 14.2892C9.52593 14.2892 11.141 13.6203 12.3318 12.4295C13.5226 11.2387 14.1916 9.62359 14.1916 7.93954C14.1916 6.2555 13.5226 4.64043 12.3318 3.44963C11.141 2.25883 9.52593 1.58984 7.84189 1.58984C6.15784 1.58984 4.54277 2.25883 3.35197 3.44963C2.16117 4.64043 1.49219 6.2555 1.49219 7.93954C1.49219 9.62359 2.16117 11.2387 3.35197 12.4295C4.54277 13.6203 6.15784 14.2892 7.84189 14.2892ZM6.96472 8.6498V8.96094H8.18205V8.70876C8.17506 8.56392 8.21515 8.42072 8.29634 8.30057C8.37617 8.19716 8.56303 8.04658 8.85693 7.84702C9.28508 7.56672 9.57626 7.31455 9.72865 7.0905C9.88195 6.86554 9.95815 6.59976 9.95815 6.29134C9.95815 5.82872 9.77129 5.45862 9.39847 5.18105C9.02837 4.90348 8.52765 4.76469 7.89722 4.76469C7.14154 4.76254 6.39653 4.94304 5.72562 5.29081L6.22543 6.21152C6.81323 5.93667 7.33663 5.79879 7.79562 5.79879C8.05868 5.79879 8.26459 5.84686 8.41154 5.94211C8.48201 5.98562 8.53959 6.04714 8.57834 6.12033C8.61709 6.19352 8.6356 6.27573 8.63197 6.35847C8.63197 6.52174 8.57936 6.66779 8.47504 6.80022C8.37526 6.93175 8.163 7.10229 7.84189 7.31274C7.50807 7.5377 7.27948 7.74814 7.15249 7.94771C7.02381 8.15886 6.95862 8.4026 6.96472 8.6498ZM7.02459 9.86531C6.88671 9.98596 6.81777 10.1647 6.81777 10.3996C6.81777 10.6264 6.88852 10.8033 7.02912 10.9293C7.16972 11.0527 7.36929 11.1144 7.626 11.1144C7.87726 11.1144 8.0732 11.0509 8.2138 10.9248C8.3544 10.796 8.42515 10.6209 8.42515 10.3987C8.42515 10.1701 8.3544 9.99322 8.2138 9.86985C8.07592 9.74648 7.87998 9.6848 7.626 9.6848C7.36294 9.6848 7.16247 9.74376 7.02459 9.86531Z" fill="#7D8799" />
                </svg>
            </div>
            <div className="starbsc margin-top">
                {
                    alreadyPayment == "Basic" ?
                        <Button style={{ color: "white", backgroundColor: "var(--theme-color) " }} >
                            Activated
                        </Button> :
                        <Button disabled={subsStatus} onClick={() => { handleOpen(); setPaySelc(1) }}>
                            Subscribe
                        </Button>
                }
            </div>
            <div className="margin-top">
                <div className="display-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                        <path d="M10.6635 6.74668L9.702 5.78516L7.46147 8.02569L6.12803 6.69226L5.1665 7.65378L7.46147 9.94874L10.6635 6.74668Z" fill="var(--theme-color) " />
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.2648 7.62704C14.2648 9.31109 13.5958 10.9262 12.405 12.117C11.2142 13.3078 9.59917 13.9767 7.91513 13.9767C6.23108 13.9767 4.61601 13.3078 3.42521 12.117C2.23441 10.9262 1.56543 9.31109 1.56543 7.62704C1.56543 5.943 2.23441 4.32793 3.42521 3.13713C4.61601 1.94633 6.23108 1.27734 7.91513 1.27734C9.59917 1.27734 11.2142 1.94633 12.405 3.13713C13.5958 4.32793 14.2648 5.943 14.2648 7.62704ZM12.9042 7.62704C12.9042 8.95022 12.3785 10.2192 11.4429 11.1548C10.5073 12.0905 9.23831 12.6161 7.91513 12.6161C6.59195 12.6161 5.32297 12.0905 4.38734 11.1548C3.45171 10.2192 2.92608 8.95022 2.92608 7.62704C2.92608 6.30386 3.45171 5.03488 4.38734 4.09925C5.32297 3.16362 6.59195 2.63799 7.91513 2.63799C9.23831 2.63799 10.5073 3.16362 11.4429 4.09925C12.3785 5.03488 12.9042 6.30386 12.9042 7.62704Z" fill="var(--theme-color) " />
                    </svg>
                    <div className="bscdesc">ID verification</div>
                </div>
                <div className="display-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                        <path d="M10.6635 6.74668L9.702 5.78516L7.46147 8.02569L6.12803 6.69226L5.1665 7.65378L7.46147 9.94874L10.6635 6.74668Z" fill="var(--theme-color) " />
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.2648 7.62704C14.2648 9.31109 13.5958 10.9262 12.405 12.117C11.2142 13.3078 9.59917 13.9767 7.91513 13.9767C6.23108 13.9767 4.61601 13.3078 3.42521 12.117C2.23441 10.9262 1.56543 9.31109 1.56543 7.62704C1.56543 5.943 2.23441 4.32793 3.42521 3.13713C4.61601 1.94633 6.23108 1.27734 7.91513 1.27734C9.59917 1.27734 11.2142 1.94633 12.405 3.13713C13.5958 4.32793 14.2648 5.943 14.2648 7.62704ZM12.9042 7.62704C12.9042 8.95022 12.3785 10.2192 11.4429 11.1548C10.5073 12.0905 9.23831 12.6161 7.91513 12.6161C6.59195 12.6161 5.32297 12.0905 4.38734 11.1548C3.45171 10.2192 2.92608 8.95022 2.92608 7.62704C2.92608 6.30386 3.45171 5.03488 4.38734 4.09925C5.32297 3.16362 6.59195 2.63799 7.91513 2.63799C9.23831 2.63799 10.5073 3.16362 11.4429 4.09925C12.3785 5.03488 12.9042 6.30386 12.9042 7.62704Z" fill="var(--theme-color) " />
                    </svg>
                    <div className="bscdesc">Liveness & Face match</div>
                </div>

            </div>
        </div>
    )

    const complaince = (
        <div className={select === 3 ? "basic-main basic-ver" : "basic-main"}
            onMouseEnter={() => setSelect(3)}
            onMouseLeave={() => setSelect(null)}>
            <div className="basixtxt text-left">
                Advanced
            </div>
            <div className="display-1">
                <div className="bscprice">
                    R500
                </div>
                <div className="mnt">
                    min. per month
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.84189 14.2892C9.52593 14.2892 11.141 13.6203 12.3318 12.4295C13.5226 11.2387 14.1916 9.62359 14.1916 7.93954C14.1916 6.2555 13.5226 4.64043 12.3318 3.44963C11.141 2.25883 9.52593 1.58984 7.84189 1.58984C6.15784 1.58984 4.54277 2.25883 3.35197 3.44963C2.16117 4.64043 1.49219 6.2555 1.49219 7.93954C1.49219 9.62359 2.16117 11.2387 3.35197 12.4295C4.54277 13.6203 6.15784 14.2892 7.84189 14.2892ZM6.96472 8.6498V8.96094H8.18205V8.70876C8.17506 8.56392 8.21515 8.42072 8.29634 8.30057C8.37617 8.19716 8.56303 8.04658 8.85693 7.84702C9.28508 7.56672 9.57626 7.31455 9.72865 7.0905C9.88195 6.86554 9.95815 6.59976 9.95815 6.29134C9.95815 5.82872 9.77129 5.45862 9.39847 5.18105C9.02837 4.90348 8.52765 4.76469 7.89722 4.76469C7.14154 4.76254 6.39653 4.94304 5.72562 5.29081L6.22543 6.21152C6.81323 5.93667 7.33663 5.79879 7.79562 5.79879C8.05868 5.79879 8.26459 5.84686 8.41154 5.94211C8.48201 5.98562 8.53959 6.04714 8.57834 6.12033C8.61709 6.19352 8.6356 6.27573 8.63197 6.35847C8.63197 6.52174 8.57936 6.66779 8.47504 6.80022C8.37526 6.93175 8.163 7.10229 7.84189 7.31274C7.50807 7.5377 7.27948 7.74814 7.15249 7.94771C7.02381 8.15886 6.95862 8.4026 6.96472 8.6498ZM7.02459 9.86531C6.88671 9.98596 6.81777 10.1647 6.81777 10.3996C6.81777 10.6264 6.88852 10.8033 7.02912 10.9293C7.16972 11.0527 7.36929 11.1144 7.626 11.1144C7.87726 11.1144 8.0732 11.0509 8.2138 10.9248C8.3544 10.796 8.42515 10.6209 8.42515 10.3987C8.42515 10.1701 8.3544 9.99322 8.2138 9.86985C8.07592 9.74648 7.87998 9.6848 7.626 9.6848C7.36294 9.6848 7.16247 9.74376 7.02459 9.86531Z" fill="#7D8799" />
                </svg>
            </div>
            <div className="starbsc margin-top">
                {
                    alreadyPayment == "Advanced" ?
                        <Button style={{ color: "white", backgroundColor: "var(--theme-color) " }}>
                            Activated
                        </Button> :
                        <Button disabled={subsStatus} onClick={() => { handleOpen(); setPaySelc(2) }}>
                            Subscribe
                        </Button>
                }
            </div>
            <div className="margin-top">
                <div className="display-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                        <path d="M10.6635 6.74668L9.702 5.78516L7.46147 8.02569L6.12803 6.69226L5.1665 7.65378L7.46147 9.94874L10.6635 6.74668Z" fill="var(--theme-color) " />
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.2648 7.62704C14.2648 9.31109 13.5958 10.9262 12.405 12.117C11.2142 13.3078 9.59917 13.9767 7.91513 13.9767C6.23108 13.9767 4.61601 13.3078 3.42521 12.117C2.23441 10.9262 1.56543 9.31109 1.56543 7.62704C1.56543 5.943 2.23441 4.32793 3.42521 3.13713C4.61601 1.94633 6.23108 1.27734 7.91513 1.27734C9.59917 1.27734 11.2142 1.94633 12.405 3.13713C13.5958 4.32793 14.2648 5.943 14.2648 7.62704ZM12.9042 7.62704C12.9042 8.95022 12.3785 10.2192 11.4429 11.1548C10.5073 12.0905 9.23831 12.6161 7.91513 12.6161C6.59195 12.6161 5.32297 12.0905 4.38734 11.1548C3.45171 10.2192 2.92608 8.95022 2.92608 7.62704C2.92608 6.30386 3.45171 5.03488 4.38734 4.09925C5.32297 3.16362 6.59195 2.63799 7.91513 2.63799C9.23831 2.63799 10.5073 3.16362 11.4429 4.09925C12.3785 5.03488 12.9042 6.30386 12.9042 7.62704Z" fill="var(--theme-color) " />
                    </svg>
                    <div className="bscdesc">Everything in Basic</div>
                </div>
                <div className="display-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                        <path d="M10.6635 6.74668L9.702 5.78516L7.46147 8.02569L6.12803 6.69226L5.1665 7.65378L7.46147 9.94874L10.6635 6.74668Z" fill="var(--theme-color) " />
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.2648 7.62704C14.2648 9.31109 13.5958 10.9262 12.405 12.117C11.2142 13.3078 9.59917 13.9767 7.91513 13.9767C6.23108 13.9767 4.61601 13.3078 3.42521 12.117C2.23441 10.9262 1.56543 9.31109 1.56543 7.62704C1.56543 5.943 2.23441 4.32793 3.42521 3.13713C4.61601 1.94633 6.23108 1.27734 7.91513 1.27734C9.59917 1.27734 11.2142 1.94633 12.405 3.13713C13.5958 4.32793 14.2648 5.943 14.2648 7.62704ZM12.9042 7.62704C12.9042 8.95022 12.3785 10.2192 11.4429 11.1548C10.5073 12.0905 9.23831 12.6161 7.91513 12.6161C6.59195 12.6161 5.32297 12.0905 4.38734 11.1548C3.45171 10.2192 2.92608 8.95022 2.92608 7.62704C2.92608 6.30386 3.45171 5.03488 4.38734 4.09925C5.32297 3.16362 6.59195 2.63799 7.91513 2.63799C9.23831 2.63799 10.5073 3.16362 11.4429 4.09925C12.3785 5.03488 12.9042 6.30386 12.9042 7.62704Z" fill="var(--theme-color) " />
                    </svg>
                    <div className="bscdesc">AML Screening</div>
                </div>
                <div className="display-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                        <path d="M10.6635 6.74668L9.702 5.78516L7.46147 8.02569L6.12803 6.69226L5.1665 7.65378L7.46147 9.94874L10.6635 6.74668Z" fill="var(--theme-color) " />
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.2648 7.62704C14.2648 9.31109 13.5958 10.9262 12.405 12.117C11.2142 13.3078 9.59917 13.9767 7.91513 13.9767C6.23108 13.9767 4.61601 13.3078 3.42521 12.117C2.23441 10.9262 1.56543 9.31109 1.56543 7.62704C1.56543 5.943 2.23441 4.32793 3.42521 3.13713C4.61601 1.94633 6.23108 1.27734 7.91513 1.27734C9.59917 1.27734 11.2142 1.94633 12.405 3.13713C13.5958 4.32793 14.2648 5.943 14.2648 7.62704ZM12.9042 7.62704C12.9042 8.95022 12.3785 10.2192 11.4429 11.1548C10.5073 12.0905 9.23831 12.6161 7.91513 12.6161C6.59195 12.6161 5.32297 12.0905 4.38734 11.1548C3.45171 10.2192 2.92608 8.95022 2.92608 7.62704C2.92608 6.30386 3.45171 5.03488 4.38734 4.09925C5.32297 3.16362 6.59195 2.63799 7.91513 2.63799C9.23831 2.63799 10.5073 3.16362 11.4429 4.09925C12.3785 5.03488 12.9042 6.30386 12.9042 7.62704Z" fill="var(--theme-color) " />
                    </svg>
                    <div className="bscdesc">Address verification</div>
                </div>
                <div className="display-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                        <path d="M10.6635 6.74668L9.702 5.78516L7.46147 8.02569L6.12803 6.69226L5.1665 7.65378L7.46147 9.94874L10.6635 6.74668Z" fill="var(--theme-color) " />
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.2648 7.62704C14.2648 9.31109 13.5958 10.9262 12.405 12.117C11.2142 13.3078 9.59917 13.9767 7.91513 13.9767C6.23108 13.9767 4.61601 13.3078 3.42521 12.117C2.23441 10.9262 1.56543 9.31109 1.56543 7.62704C1.56543 5.943 2.23441 4.32793 3.42521 3.13713C4.61601 1.94633 6.23108 1.27734 7.91513 1.27734C9.59917 1.27734 11.2142 1.94633 12.405 3.13713C13.5958 4.32793 14.2648 5.943 14.2648 7.62704ZM12.9042 7.62704C12.9042 8.95022 12.3785 10.2192 11.4429 11.1548C10.5073 12.0905 9.23831 12.6161 7.91513 12.6161C6.59195 12.6161 5.32297 12.0905 4.38734 11.1548C3.45171 10.2192 2.92608 8.95022 2.92608 7.62704C2.92608 6.30386 3.45171 5.03488 4.38734 4.09925C5.32297 3.16362 6.59195 2.63799 7.91513 2.63799C9.23831 2.63799 10.5073 3.16362 11.4429 4.09925C12.3785 5.03488 12.9042 6.30386 12.9042 7.62704Z" fill="var(--theme-color) " />
                    </svg>
                    <div className="bscdesc">Ongoing AML monitoring</div>
                </div>

            </div>
        </div>
    )

    const enterprise = (
        <div className={select === 4 ? "basic-main basic-ver" : "basic-main"}
            onMouseEnter={() => setSelect(4)}
            onMouseLeave={() => setSelect(null)}>
            <div className="basixtxt text-left">
                Enterprise
            </div>
            <div className="display-1">
                <div className="bscprice">
                    From R1000
                </div>
                <div className="mnt">
                    per year
                </div>

            </div>
            <div className="starbsc margin-top">
                {
                    alreadyPayment == "Enterprise" ?
                        <Button style={{ color: "white", backgroundColor: "var(--theme-color) " }}>
                            Activated
                        </Button> :
                        <Button disabled={subsStatus} onClick={() => { handleOpen(); setPaySelc(3) }}>
                            Subscribe
                        </Button>
                }
            </div>
            <div className="margin-top">
                <div className="display-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                        <path d="M10.6635 6.74668L9.702 5.78516L7.46147 8.02569L6.12803 6.69226L5.1665 7.65378L7.46147 9.94874L10.6635 6.74668Z" fill="var(--theme-color) " />
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.2648 7.62704C14.2648 9.31109 13.5958 10.9262 12.405 12.117C11.2142 13.3078 9.59917 13.9767 7.91513 13.9767C6.23108 13.9767 4.61601 13.3078 3.42521 12.117C2.23441 10.9262 1.56543 9.31109 1.56543 7.62704C1.56543 5.943 2.23441 4.32793 3.42521 3.13713C4.61601 1.94633 6.23108 1.27734 7.91513 1.27734C9.59917 1.27734 11.2142 1.94633 12.405 3.13713C13.5958 4.32793 14.2648 5.943 14.2648 7.62704ZM12.9042 7.62704C12.9042 8.95022 12.3785 10.2192 11.4429 11.1548C10.5073 12.0905 9.23831 12.6161 7.91513 12.6161C6.59195 12.6161 5.32297 12.0905 4.38734 11.1548C3.45171 10.2192 2.92608 8.95022 2.92608 7.62704C2.92608 6.30386 3.45171 5.03488 4.38734 4.09925C5.32297 3.16362 6.59195 2.63799 7.91513 2.63799C9.23831 2.63799 10.5073 3.16362 11.4429 4.09925C12.3785 5.03488 12.9042 6.30386 12.9042 7.62704Z" fill="var(--theme-color) " />
                    </svg>
                    <div className="bscdesc">Flexible options and solutions</div>
                </div>
                <div className="display-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                        <path d="M10.6635 6.74668L9.702 5.78516L7.46147 8.02569L6.12803 6.69226L5.1665 7.65378L7.46147 9.94874L10.6635 6.74668Z" fill="var(--theme-color) " />
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.2648 7.62704C14.2648 9.31109 13.5958 10.9262 12.405 12.117C11.2142 13.3078 9.59917 13.9767 7.91513 13.9767C6.23108 13.9767 4.61601 13.3078 3.42521 12.117C2.23441 10.9262 1.56543 9.31109 1.56543 7.62704C1.56543 5.943 2.23441 4.32793 3.42521 3.13713C4.61601 1.94633 6.23108 1.27734 7.91513 1.27734C9.59917 1.27734 11.2142 1.94633 12.405 3.13713C13.5958 4.32793 14.2648 5.943 14.2648 7.62704ZM12.9042 7.62704C12.9042 8.95022 12.3785 10.2192 11.4429 11.1548C10.5073 12.0905 9.23831 12.6161 7.91513 12.6161C6.59195 12.6161 5.32297 12.0905 4.38734 11.1548C3.45171 10.2192 2.92608 8.95022 2.92608 7.62704C2.92608 6.30386 3.45171 5.03488 4.38734 4.09925C5.32297 3.16362 6.59195 2.63799 7.91513 2.63799C9.23831 2.63799 10.5073 3.16362 11.4429 4.09925C12.3785 5.03488 12.9042 6.30386 12.9042 7.62704Z" fill="var(--theme-color) " />
                    </svg>
                    <div className="bscdesc">Business Verification</div>
                </div>
                <div className="display-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                        <path d="M10.6635 6.74668L9.702 5.78516L7.46147 8.02569L6.12803 6.69226L5.1665 7.65378L7.46147 9.94874L10.6635 6.74668Z" fill="var(--theme-color) " />
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.2648 7.62704C14.2648 9.31109 13.5958 10.9262 12.405 12.117C11.2142 13.3078 9.59917 13.9767 7.91513 13.9767C6.23108 13.9767 4.61601 13.3078 3.42521 12.117C2.23441 10.9262 1.56543 9.31109 1.56543 7.62704C1.56543 5.943 2.23441 4.32793 3.42521 3.13713C4.61601 1.94633 6.23108 1.27734 7.91513 1.27734C9.59917 1.27734 11.2142 1.94633 12.405 3.13713C13.5958 4.32793 14.2648 5.943 14.2648 7.62704ZM12.9042 7.62704C12.9042 8.95022 12.3785 10.2192 11.4429 11.1548C10.5073 12.0905 9.23831 12.6161 7.91513 12.6161C6.59195 12.6161 5.32297 12.0905 4.38734 11.1548C3.45171 10.2192 2.92608 8.95022 2.92608 7.62704C2.92608 6.30386 3.45171 5.03488 4.38734 4.09925C5.32297 3.16362 6.59195 2.63799 7.91513 2.63799C9.23831 2.63799 10.5073 3.16362 11.4429 4.09925C12.3785 5.03488 12.9042 6.30386 12.9042 7.62704Z" fill="var(--theme-color) " />
                    </svg>
                    <div className="bscdesc">Transaction Monitoring</div>
                </div>
                <div className="display-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                        <path d="M10.6635 6.74668L9.702 5.78516L7.46147 8.02569L6.12803 6.69226L5.1665 7.65378L7.46147 9.94874L10.6635 6.74668Z" fill="var(--theme-color) " />
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.2648 7.62704C14.2648 9.31109 13.5958 10.9262 12.405 12.117C11.2142 13.3078 9.59917 13.9767 7.91513 13.9767C6.23108 13.9767 4.61601 13.3078 3.42521 12.117C2.23441 10.9262 1.56543 9.31109 1.56543 7.62704C1.56543 5.943 2.23441 4.32793 3.42521 3.13713C4.61601 1.94633 6.23108 1.27734 7.91513 1.27734C9.59917 1.27734 11.2142 1.94633 12.405 3.13713C13.5958 4.32793 14.2648 5.943 14.2648 7.62704ZM12.9042 7.62704C12.9042 8.95022 12.3785 10.2192 11.4429 11.1548C10.5073 12.0905 9.23831 12.6161 7.91513 12.6161C6.59195 12.6161 5.32297 12.0905 4.38734 11.1548C3.45171 10.2192 2.92608 8.95022 2.92608 7.62704C2.92608 6.30386 3.45171 5.03488 4.38734 4.09925C5.32297 3.16362 6.59195 2.63799 7.91513 2.63799C9.23831 2.63799 10.5073 3.16362 11.4429 4.09925C12.3785 5.03488 12.9042 6.30386 12.9042 7.62704Z" fill="var(--theme-color) " />
                    </svg>
                    <div className="bscdesc">Fraud Prevention</div>
                </div>

            </div>
        </div>
    )

    const plan = (
        !isLgup && count === 1 ?
            <div className="basic-m2">
                <div className="perverifi ">
                    $1.35 per verification
                </div>

            </div> : count === 2 ?
                <div className="basic-m2 ">
                    <div className="perverifi  ">
                        $1.85 per verification
                    </div>
                </div> : count === 3 ?
                    <div className="perverifi basic-m2">
                        $1.38 per verification
                    </div> : count === 4 ?
                        <div className="perverifi basic-m2">
                            $1.35 per verification
                        </div> :
                        <>
                            {select === 1 ? <div className="basic-m2">
                                <div className="perverifi ">
                                    $1.35 per verification
                                </div>
                            </div> :
                                select === 2 ? <div className="basic-m2 ">
                                    <div className="perverifi  ">
                                        $1.85 per verification
                                    </div>
                                </div> :
                                    select === 3 ? <div className="perverifi basic-m2">
                                        $1.75 per verification
                                    </div> :
                                        <div className="perverifi basic-m2">
                                            $1.55 per verification
                                        </div>}
                        </>

    )

    const navigate = useNavigate()
    const handleChange = async () => {
        // console.log(select, "select")
        var datas = {
            id: paySelc?._id,
            payment_method: "cc",
        }
        try {
            console.log("🚀 ~ handleChange ~ datas:", datas)
            setStart(true)
            const { data } = await Axios.post('/createPayment', datas, {
                headers: {
                    Authorization: window.localStorage.getItem('Rikosta')
                }
            })
            if (data?.success) {
                if (data?.signatur) {
                    setResps(data?.signatur)
                } else {
                    // toast.success("Payment Success")
                    window.location.reload()
                }
            }
            setStart(false)
        } catch (error) {
            if (error?.status == 408) {
                toast.error(error?.response?.data?.message)
                navigate('/kyb')
            }
            if (error?.status == 409) {
                toast.error(error?.response?.data?.message)

            }
            if (error?.status == 499) {
                window.localStorage.removeItem('Rikosta');
                window.localStorage.removeItem('userType');
                setTimeout(() => {
                    window.location.replace('/login')
                }, 1000);
            }
            setStart(false)
            console.log("🚀 ~ handleChange ~ error:", error)
        }
    }

    const getPaymentList = async () => {
        try {
            const { data } = await Axios.get('/paymentcheck', {
                headers: {
                    Authorization: window.localStorage.getItem('Rikosta')
                }
            })
            if (data?.success) {
                console.log(data, "vijay");

                setAlreadyPayment(data?.result)
                if (data?.success) {
                    localStorage.setItem('payment', true)
                } else {
                    localStorage.setItem('payment', false)
                }

                if (data?.second) {
                    setSecoundPayment(data?.second)
                } else {
                    setSecoundPayment("")
                }

                setSubsStatus(true)
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
            console.log("🚀 ~ getPaymentList ~ error:", error)
        }
    }
    const hasRun = useRef(false);

    useEffect(() => {
        if (!hasRun.current) {
            getPaymentList()
            getPlansDetails()
            hasRun.current = true;
        }
    }, [])



    return (
        <div className='pricing'>
            <Box sx={{ display: 'flex' }}>
                {/* <CssBaseline /> */}
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '80px' }}>
                    <div className="pricing-main">
                        {!isLgup && (
                            <>
                                {<div className="bcrw"><ArrowBackIosIcon onClick={count === 0 ? null : handleSyb} /></div>}
                                {count !== 3 && <div className="farw">
                                    <ArrowForwardIosIcon onClick={handleAdd} />
                                </div>}

                            </>
                        )}
                        <div className="display-1" style={{ justifyContent: 'flex-end', alignItems: "flex-start", background: "#f6f9ff" }}>
                            {!isLgup && count === 1 ?
                                limited
                                : count === 2 ?
                                    limited
                                    : count === 3 ?
                                        limited
                                        : count === 4 ? limited : <>
                                            {limited}
                                        </>}
                        </div>
                        <hr style={{ borderBottom: '1px solid var(--theme-color) ' }} />
                    </div>

                    <div className="">

                        {
                            planDetails?.length > 0 && planDetails[specialFeatCount]?.SpecialFeature?.map((item, index) => {
                                console.log("$$$$$$$$$$$$$$", specialFeatCount, planDetails[specialFeatCount]?.SpecialFeature)
                                console.log("item", item?.status);
                                return (
                                    <>
                                        {
                                            item?.status === true ?
                                                <div className="display-1" style={{ justifyContent: 'flex-end' }}>
                                                    <div key={index} className="basic-m2">
                                                        <div className="userverig">
                                                            {item?.name}
                                                        </div>
                                                    </div>
                                                    <div className="basic-m2 ">
                                                        <div className="perverifi  ">
                                                            {item?.value} per verification
                                                        </div>
                                                    </div>
                                                </div> : null
                                        }
                                    </>
                                )
                            })
                        }

                        {/* <div className="display-1" style={{ justifyContent: 'flex-end' }}>
                            <div className="basic-m2">
                                <div className="userverig">
                                    Identity Document Verification
                                    <div className="usrveri-desc">
                                        Check if a document is authentic, legitimate, and
                                        free of forgery or alteration
                                    </div>
                                </div>
                            </div>
                            {plan}
                        </div>
                        <div className="display-1" style={{ justifyContent: 'flex-end' }}>
                            <div className="basic-m2">
                                <div className="userverig">
                                    Liveness & Face match
                                    <div className="usrveri-desc">
                                        Find out if a person's live facial features matches
                                        photograph on ID Documents
                                    </div>
                                </div>
                            </div>
                            {plan}



                        </div>
                        <div className="display-1" style={{ justifyContent: 'flex-end' }}>
                            <div className="basic-m2">
                                <div className="userverig">
                                    AML Screening
                                    <div className="usrveri-desc">
                                        Screen applicants for political exposure, watchlist
                                        presence, sanctions, and adverse media
                                    </div>
                                </div>
                            </div>
                            {plan}

                        </div>
                        <div className="display-1" style={{ justifyContent: 'flex-end' }}>
                            <div className="basic-m2">
                                <div className="userverig">
                                    Address verification
                                    <div className="usrveri-desc">
                                        Verify customers' claimed address by examining
                                        various documents, such as utility bills, bank
                                        statements, tax invoices, and passports
                                    </div>
                                </div>

                            </div>
                            {plan}


                        </div> */}
                    </div>

                </Box>
            </Box>

            {/* Modal Common */}

            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="button pop-up-modal-detail">
                    <Typography className='modal-header-class' id="modal-modal-title" variant="h6" component="h2">
                        {paySelc?.Title}  <HighlightOffIcon style={{ cursor: 'pointer' }} onClick={handleClose} />
                    </Typography>
                    <Typography className='modal-body-class' id="modal-modal-description" sx={{ mt: 2 }}>
                        {paySelc?.Currency}{subam} min. per {paySelc?.Duration}
                    </Typography>
                    <div>
                    </div>
                    <div className='starbsc'>
                        {
                            resps ?
                                <div dangerouslySetInnerHTML={{ __html: resps }} style={{ color: "white" }}></div>
                                :
                                <>
                                    {start == true ?
                                        <Button disabled={true}>
                                            Proceed To Payment
                                        </Button> :
                                        <Button onClick={() => { handleChange() }}>
                                            Proceed To Payment
                                        </Button>
                                    }
                                </>

                        }
                    </div>
                </Box>
            </Modal>

        </div >
    )
}


export default Pricing
