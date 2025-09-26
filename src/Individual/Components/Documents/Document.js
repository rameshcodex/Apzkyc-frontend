import React, { useState, useEffect } from 'react'
import Header from '../Header/Header'
import { Grid } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import './Document.css'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import nodata from '../../../Images/nodata.gif'
import Axios from '../../../Axios'
import moment from 'moment'

function Document() {
    const [tab, setTab] = useState(1)

    const handleTab = (val) => {
        setTab(val)
    }
    const pathColor = (
        tab === 1 ? '#fff' : '#8E92BC'
    )

    const pathColor2 = (
        tab === 2 ? '#fff' : '#8E92BC'
    )


    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const [loading, setLoading] = useState(false)
    const [kycDetails, setKycDetails] = useState()

    const getKycDetails = async () => {
        try {
            setLoading(true)
            const { data } = await Axios.get('/users/getKyc', {
                headers: {
                    Authorization: window.localStorage.getItem('Rikosta')
                }
            })
            if (data?.success == true) {
                setLoading(false)
                setKycDetails(data.result)
            } else {
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            console.log("🚀 ~ getKycDetails ~ error:", error)
        }
    }
    console.log(kycDetails, 'logs');

    useEffect(() => {
        getKycDetails()
    }, [])

    return (
        <div className='document'>
            <Header />
            <Grid container className='margin-top' sx={{ justifyContent: 'center' }}>



                <Grid xs={12} sm={12} md={9} lg={9} xl={8}>
                    <div className="register-acctn trouble-shoot">
                        <p>Having trouble? <Link to=''>Get help </Link></p>
                    </div>

                    {
                        loading == true ?
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
                            :
                            kycDetails ?
                                <div className="margin-top">
                                    {/* {['', '', '', ''].map((row, i) => {
                            return ( */}
                                    <div className="doc-mn">
                                        <div className="display-2" style={{ flexDirection: !matches && 'column' }}>
                                            <div className="jip-nm">
                                                Address Proof Image
                                            </div>
                                            <div className="dat">
                                                {moment(kycDetails?.createAt).format('DD-MM-YY hh:mm A')}
                                            </div>
                                        </div>
                                        <div className="display-1 margin-t-10px" style={{ flexDirection: !matches && 'column' }}>
                                            <div className="doc-im">
                                                <img src={kycDetails?.address_proof ? kycDetails?.address_proof : ""} alt="docim" width="193px" height="173px" />
                                            </div>
                                            <div className="">
                                                <div className="doc-name">
                                                    Document name
                                                    <div className="docty">
                                                        {kycDetails?.ID_type}
                                                    </div>
                                                </div>
                                                <div className="doc-name">
                                                    Country issued by
                                                    <div className="docty">
                                                        {kycDetails?.ID_country}
                                                    </div>
                                                </div>
                                                {/* <div className="doc-name">
                                                Status
                                                <div className="verify">
                                                    Verified
                                                </div>
                                            </div> */}
                                                {/* <div className="req-doc cursor">
                                                + Request update document
                                            </div> */}

                                            </div>
                                        </div>
                                    </div>
                                    <div className="doc-mn">
                                        <div className="display-2" style={{ flexDirection: !matches && 'column' }}>
                                            <div className="jip-nm">
                                                Front Side Image
                                            </div>
                                            <div className="dat">
                                                {moment(kycDetails?.createAt).format('DD-MM-YY hh:mm A')}
                                            </div>
                                        </div>
                                        <div className="display-1 margin-t-10px" style={{ flexDirection: !matches && 'column' }}>
                                            <div className="doc-im">
                                                <img src={kycDetails?.ID_Image_front ? kycDetails?.ID_Image_front : ""} alt="docim" width="193px" height="173px" />
                                            </div>
                                            <div className="">
                                                <div className="doc-name">
                                                    Name
                                                    <div className="docty">
                                                        {kycDetails?.Firstname + kycDetails.Lastname}
                                                    </div>
                                                </div>
                                                <div className="doc-name">
                                                    Document name
                                                    <div className="docty">
                                                        {kycDetails?.ID_type}
                                                    </div>
                                                </div>
                                                <div className="doc-name">
                                                    Country issued by
                                                    <div className="docty">
                                                        {kycDetails?.ID_country}
                                                    </div>
                                                </div>
                                                <div className="doc-name">
                                                    Status
                                                    <div className={`${kycDetails?.Id_verify ? 'verify' : 'not-verify'}`}>
                                                        {kycDetails?.Id_verify ? 'Verified' : 'Not Verified'}
                                                    </div>
                                                </div>
                                                {/* <div className="req-doc cursor">
                                                + Request update document
                                            </div> */}

                                            </div>
                                        </div>
                                    </div>
                                    <div className="doc-mn">
                                        <div className="display-2" style={{ flexDirection: !matches && 'column' }}>
                                            <div className="jip-nm">
                                                Back Side Image
                                            </div>
                                            <div className="dat">
                                                {moment(kycDetails?.createAt).format('DD-MM-YY hh:mm A')}
                                            </div>
                                        </div>
                                        <div className="display-1 margin-t-10px" style={{ flexDirection: !matches && 'column' }}>
                                            <div className="doc-im">
                                                <img src={kycDetails?.ID_Image_Back ? kycDetails?.ID_Image_Back : ""} alt="docim" width="193px" height="173px" />
                                            </div>
                                            <div className="">
                                                <div className="doc-name">
                                                    Name
                                                    <div className="docty">
                                                        {kycDetails?.Firstname + kycDetails.Lastname}
                                                    </div>
                                                </div>
                                                <div className="doc-name">
                                                    Document name
                                                    <div className="docty">
                                                        {kycDetails?.ID_type}
                                                    </div>
                                                </div>
                                                <div className="doc-name">
                                                    Country issued by
                                                    <div className="docty">
                                                        {kycDetails?.ID_country}
                                                    </div>
                                                </div>
                                                <div className="doc-name">
                                                    Status
                                                    <div className={`${kycDetails?.Id_verify ? 'verify' : 'not-verify'}`}>
                                                        {kycDetails?.Id_verify ? 'Verified' : 'Not Verified'}
                                                    </div>
                                                </div>
                                                {/* <div className="req-doc cursor">
                                                + Request update document
                                            </div> */}

                                            </div>
                                        </div>
                                    </div>
                                    <div className="doc-mn">
                                        <div className="display-2" style={{ flexDirection: !matches && 'column' }}>
                                            <div className="jip-nm">
                                                Liveness Image
                                            </div>
                                            <div className="dat">
                                                {moment(kycDetails?.createAt).format('DD-MM-YY hh:mm A')}
                                            </div>
                                        </div>
                                        <div className="display-1 margin-t-10px" style={{ flexDirection: !matches && 'column' }}>
                                            <div className="doc-im">
                                                <img src={'data:image/jpeg;base64,' + kycDetails?.faceImage} alt="docim" width="193px" height="173px" />
                                            </div>
                                            <div className="">
                                                <div className="doc-name">
                                                    Name
                                                    <div className="docty">
                                                        {kycDetails?.Firstname + kycDetails.Lastname}
                                                    </div>
                                                </div>
                                                <div className="doc-name">
                                                    Document name
                                                    <div className="docty">
                                                        {kycDetails?.ID_type}
                                                    </div>
                                                </div>
                                                <div className="doc-name">
                                                    Country issued by
                                                    <div className="docty">
                                                        {kycDetails?.ID_country}
                                                    </div>
                                                </div>
                                                <div className="doc-name">
                                                    Status
                                                    <div className={`${kycDetails?.Liveness_verify ? 'verify' : 'not-verify'}`}>
                                                        {kycDetails?.Liveness_verify ? 'Verified' : 'Not Verified'}
                                                    </div>
                                                </div>
                                                {/* <div className="req-doc cursor">
                                                + Request update document
                                            </div> */}

                                            </div>
                                        </div>
                                    </div>
                                    {/* )
                        })

                        } */}
                                </div> :
                                <div className='margin-top'>
                                    <div className="doc-mn">
                                        <div className="display-2" style={{ flexDirection: !matches && 'column' }}>

                                        </div>
                                        <div className="display-1 margin-t-10px" style={{ flexDirection: !matches && 'column' }}>

                                            <div className="">
                                                <div className="doc-name">
                                                    No Data Found
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                    }




                </Grid>

            </Grid>
        </div>
    )
}

export default Document
