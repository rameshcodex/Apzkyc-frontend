/* eslint-disable */
import React, { useState, useRef, useEffect, useCallback } from 'react'
import './Kyc.css'
import Header from '../Header/Header'
import { Grid } from '@mui/material'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Link, useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import load from '../../../Images/loading.png'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Selects from 'react-select';
import fnt from '../../../Images/fnt.png'
import bnk from '../../../Images/bnk.png'
import livIM from '../../../Images/live.png'
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Axios from '../../../Axios'
import HelpCenter from './HelpCenter';
import consts from '../../../constant';
import toast from 'react-hot-toast';
import Chip from '@mui/material/Chip';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
// import CircularProgress from '@mui/material/CircularProgress';
// import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PDFViewer from '../../../Business/Components/KYB/PDFViewer';
// import Cropper from "react-easy-crop";
import { Slider } from "@mui/material";
import getCroppedImg from './cropImage'
import Crop from '../Kyc/crops';

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

const steps = [
    {
        label: 'Personal Details',
        description: `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`,
    },
    {
        label: 'Address Details',
        description:
            'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        label: 'Identity Details',
        description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    },
    {
        label: 'Documents Upload',
        description:
            'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        label: 'Requests',
        description:
            'An ad group contains one or more ads which target a shared set of keywords.',
    },
];

const countries = [
    { value: 'IN', label: 'India', icon: 'in' },
    { value: 'SA', label: 'South Africa', icon: 'za' },
    { value: 'GB', label: 'United Kingdom', icon: 'gb' },
    { value: 'CA', label: 'Canada', icon: 'ca' },
    { value: 'FR', label: 'France', icon: 'fr' },
    { value: 'DE', label: 'Germany', icon: 'de' },
    // Add more countries as needed
];

const address_proof_type = [
    { value: 'Capitec Bank Statement', label: 'Capitec Bank Statement' },
    { value: 'FNB Bank Statement', label: 'FNB Bank Statement' },
    { value: 'MTN Statement', label: 'MTN Statement' },
    { value: 'Telkom Statement', label: 'Telkom Statement' },
    // Add more countries as needed
];

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        display: 'flex',
        alignItems: 'center',
    }),
    singleValue: (provided, state) => ({
        ...provided,
        display: 'flex',
        alignItems: 'center',
    }),
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius: '12px',
    boxShadow: 24,
    p: 4,
};

function Kycnew() {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
  ;
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const cropperRef = useRef(null);
    const [image, setImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null)
    const [croppedImage_bck, setCroppedImage_bck] = useState(null)

    const [typ,setTyp] = useState('');

    // console.log(typ,'typ');
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        // if(typ == 'front'){
        //    handleReUpload() 
        // }else{
        // handleReUpload2()

        // }
        
        setOpen(false);

    };
    const handleOpen = () => {
        setOpen(true);
    }

const handleCroppedImage = async (val) => {
    // const file = val;
    // console.log("🚀 ~ file:val", file);
    if (val) {
        const reader = new FileReader();
        reader.onloadend = async () => {
            if(typ === 'front'){
                setCroppedImage(reader.result)
            }else{
                setCroppedImage_bck(reader.result)
            }
        }
        reader.readAsDataURL(val)
        

        var url
        // reader.onloadend = async () => {
            url = await imgaeUploadUrl(val)
            console.log("🚀 ~ reader.onloadend= ~ url:", url)
          console.log(typ,'typ upld');
          
            if(typ == 'front'){
                setVerifyIdentity({ ...verifyIdentity, img1: url })
                setVerifyIdentityErr({ ...verifyIdentityErr, img1: '' })
                setImageUrl_front(url)
            }else{
                setVerifyIdentity({ ...verifyIdentity, img2: url })
                setVerifyIdentityErr({ ...verifyIdentityErr, img2: '' })
                setImageUrl_back(url)
            }
         
            // setImage(reader.result)
            // setIsCropperReady(false); 
            // handleOpen()
        // };
        // reader.readAsDataURL(val)
   
    }
     
}

    const [isCropperReady, setIsCropperReady] = useState(false); 

    const [imageUrl_front, setImageUrl_front] = useState(null);
    const [imageUrl_back, setImageUrl_back] = useState(null);

    const handleImageUpload_front = async (event) => {
        try {
            const file = event.target.files[0];
            console.log("🚀 ~ file:", file);
            
         
            if (file) {
                const reader = new FileReader();
                var url
                setTyp('front')
                reader.onloadend = async () => {
                    // url = await imgaeUploadUrl(file)
                    // console.log("🚀 ~ reader.onloadend= ~ url:", url)
                    // setVerifyIdentity({ ...verifyIdentity, img1: url })
                    // setVerifyIdentityErr({ ...verifyIdentityErr, img1: '' })
                    // setImageUrl_front(url)
                    console.log('reupload');
                    
                    setImage(null);
                    setTimeout(() => setImage(reader.result), 50);
                    // setImage(reader.result)
                    // setIsCropperReady(false); 
                    handleOpen()
    
                };
                reader.readAsDataURL(file)
            }

        } catch (error) {
            console.log("🚀 ~ Kyc ~ error:", error)
        }
    };

    const handleImageUpload_back = (event) => {
      

        try {
            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();
                var url
                  setTyp('back')
                  console.log('bck');
                  
                reader.onloadend = async () => {
                    // url = await imgaeUploadUrl(file)
                    // setVerifyIdentity({ ...verifyIdentity, img2: url })
                    // setVerifyIdentityErr({ ...verifyIdentityErr, img2: '' })
                    // setImageUrl_back(url);
                      // Reset image first (to force re-render)
        setImage(null);
        setTimeout(() => setImage(reader.result), 50);
                    // setImage()
                    // setIsCropperReady(false); 
                    handleOpen()
    
                };
                reader.readAsDataURL(file)
            }
           
          

        } catch (error) {
            console.log("🚀 ~ Kyc ~ error:", error)

        }
    };



  // Mark cropper as ready once it loads
  const onCropperInit = () => {
    setIsCropperReady(true);
  };

  // Crop & Get Image Data
  const cropImage = () => {
    const cropper = cropperRef.current?.cropper;
    if (isCropperReady && cropper) {
      const croppedDataUrl = cropper.getCroppedCanvas()?.toDataURL("image/png");
      setCroppedImage(croppedDataUrl);
    } else {
      console.error("Cropper is not ready yet!");
    }
  };

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
      }
    
      const showCroppedImage = async () => {
        try {
          const croppedImage = await getCroppedImg(
            imageUrl_front,
            croppedAreaPixels,
            rotation
          )
          console.log('donee', { croppedImage })
          setImageUrl_front(croppedImage)
        } catch (e) {
          console.error(e)
        }
      }
    
      const onClose = () => {
        setCroppedImage(null)
      }
    

  

    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setAddressDetailsErr({
            address1: "",
            address2: "",
            city: "",
            state: "",
            country: "",
            postalCode: "",
            addressProof: ""
        })
        setVerifyIdentityErr({
            country: "",
            docType: "",
            idnumber: "",
            img1: "",
            img2: ""
        })
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    // const [age, setAge] = React.useState('10');

    // const handleChange = (event) => {
    //     setAge(event.target.value);
    // };

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedAddressType, setSelectedAddressType] = useState(null);

    const handleChangeCountry = (selectedOption) => {
        setVerifyIdentity({ ...verifyIdentity, country: selectedOption.value });
        setVerifyIdentityErr({ ...verifyIdentityErr, country: '' });
        setSelectedCountry(selectedOption);
    };

    const handleChangeAddressType = (selectedOption) => {
        console.log(selectedOption, "selectedOptionselectedOption")
        setAddressDetails({ ...addressDetails, address_proof_type: selectedOption.value });
        setAddressDetailsErr({ ...addressDetailsErr, address_proof_type: '' });
        setSelectedAddressType(selectedOption);
    }

    const formatOptionLabel = ({ label, icon }) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={`https://flagcdn.com/48x36/${icon}.png`} alt={label} style={{ marginRight: 10, width: '24px' }} />

            {label}
        </div>
    );

    const formatOptionLabelAddress = ({ label, icon }) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>

            {label}
        </div>
    );

    const [hover, setHover] = useState(0)

    const [hoveredIndex, setHoveredIndex] = useState(null);

    const [imageUrl, setImageUrl] = useState(null);

    const [isUploading, setIsUploading] = useState(false)

    const handleUplaud = () => {
        setIsUploading(true)
        const timer = setTimeout(() => {
            setIsUploading(false)
        }, 3000);

        return () => clearTimeout(timer)
    }

    const [uploadSts, setUploadSts] = useState(false)
    const handleImageUpload = (event) => {
        setUploadSts(true)
        const file = event.target.files[0];
        const reader = new FileReader();
        var url
        reader.onloadend = async () => {
            url = await imgaeUploadUrl(file)
            setAddressDetails({ ...addressDetails, addressProof: url })
            setAddressDetailsErr({ ...addressDetailsErr, addressProof: '' })
            setImageUrl(url);
            setUploadSts(false)
        };
        if (file) {
            reader.readAsDataURL(file);
        }

        // handleUplaud()
    };


    // const handleMouseEnter = () => {
    //     setHover(!hover)
    // }
    const proof = [
        {
            name: 'Passport', subName: 'One side',
            svg:
                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                    <path d="M6.12008 0.679688C5.0018 0.679688 4.08008 1.60141 4.08008 2.71969V31.2797C4.08008 32.398 5.0018 33.3197 6.12008 33.3197H27.8801C28.9984 33.3197 29.9201 32.398 29.9201 31.2797V2.71969C29.9201 1.60141 28.9984 0.679688 27.8801 0.679688H6.12008ZM6.12008 2.03969H27.8801C28.2573 2.03969 28.5601 2.3425 28.5601 2.71969V31.2797C28.5601 31.6569 28.2573 31.9597 27.8801 31.9597H6.12008C5.74289 31.9597 5.44008 31.6569 5.44008 31.2797V2.71969C5.44008 2.3425 5.74289 2.03969 6.12008 2.03969ZM17.0001 6.11969C12.8882 6.11969 9.52008 9.48781 9.52008 13.5997C9.52008 17.7116 12.8882 21.0797 17.0001 21.0797C21.112 21.0797 24.4801 17.7116 24.4801 13.5997C24.4801 9.48781 21.112 6.11969 17.0001 6.11969ZM16.3201 7.69219V12.9197H14.3226C14.4023 11.4163 14.7157 10.0563 15.1938 9.09469C15.5365 8.40141 15.9323 7.93922 16.3201 7.69219ZM17.6801 7.69219C18.0679 7.93922 18.4637 8.40141 18.8063 9.09469C19.2845 10.0563 19.5979 11.4163 19.6776 12.9197H17.6801V7.69219ZM14.1526 8.18094C14.0941 8.28453 14.0357 8.39078 13.9826 8.49969C13.3876 9.69766 13.021 11.2303 12.9413 12.9197H10.9226C11.1537 10.8691 12.4021 9.10531 14.1526 8.18094ZM19.8476 8.18094C21.598 9.10531 22.8465 10.8691 23.0776 12.9197H21.0588C20.9791 11.2303 20.6126 9.69766 20.0176 8.49969C19.9645 8.39078 19.906 8.28453 19.8476 8.18094ZM10.9226 14.2797H12.9413C13.021 15.9691 13.3876 17.5017 13.9826 18.6997C14.0357 18.8086 14.0941 18.9148 14.1526 19.0184C12.4021 18.0941 11.1537 16.3303 10.9226 14.2797ZM14.3226 14.2797H16.3201V19.5072C15.9323 19.2602 15.5365 18.798 15.1938 18.1047C14.7157 17.1431 14.4023 15.7831 14.3226 14.2797ZM17.6801 14.2797H19.6776C19.5979 15.7831 19.2845 17.1431 18.8063 18.1047C18.4637 18.798 18.0679 19.2602 17.6801 19.5072V14.2797ZM21.0588 14.2797H23.0776C22.8465 16.3303 21.598 18.0941 19.8476 19.0184C19.906 18.9148 19.9645 18.8086 20.0176 18.6997C20.6126 17.5017 20.9791 15.9691 21.0588 14.2797ZM8.71258 25.8397C8.33805 25.8742 8.0618 26.2089 8.09633 26.5834C8.13086 26.958 8.46555 27.2342 8.84008 27.1997H25.1601C25.4045 27.2023 25.6329 27.0748 25.7577 26.8623C25.8799 26.6498 25.8799 26.3895 25.7577 26.177C25.6329 25.9645 25.4045 25.837 25.1601 25.8397H8.84008C8.81883 25.8397 8.79758 25.8397 8.77633 25.8397C8.75508 25.8397 8.73383 25.8397 8.71258 25.8397Z" fill={hover === 1 ? "#fff" : "#231F20"} />
                </svg>
        },
        // {
        //     name: 'Residence permit', subName: 'One side',
        //     svg: <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
        //         <path d="M4.6325 1.35938C4.30844 1.42047 4.07469 1.70734 4.08 2.03937C4.08 3.91203 2.55266 5.43937 0.68 5.43937C0.305469 5.43937 0 5.74484 0 6.11937V27.8794C0 28.2539 0.305469 28.5594 0.68 28.5594C2.55266 28.5594 4.08 30.0867 4.08 31.9594C4.08 32.3339 4.38547 32.6394 4.76 32.6394H29.24C29.6145 32.6394 29.92 32.3339 29.92 31.9594C29.92 30.0867 31.4473 28.5594 33.32 28.5594C33.6945 28.5594 34 28.2539 34 27.8794V6.11937C34 5.74484 33.6945 5.43937 33.32 5.43937C31.4473 5.43937 29.92 3.91203 29.92 2.03937C29.92 1.66484 29.6145 1.35938 29.24 1.35938H4.76C4.73875 1.35938 4.7175 1.35938 4.69625 1.35938C4.675 1.35938 4.65375 1.35938 4.6325 1.35938ZM5.29125 2.71937H28.7087C29.0195 4.77 30.5894 6.33984 32.64 6.65062V27.3481C30.5894 27.6589 29.0195 29.2287 28.7087 31.2794H5.29125C4.98047 29.2287 3.41062 27.6589 1.36 27.3481V6.65062C3.41062 6.33984 4.98047 4.77 5.29125 2.71937ZM7.48 8.90312L9.3075 17.0631V17.1269H10.8162L12.7075 8.96687H11.2838L10.6038 12.5794C10.3992 13.5303 10.2717 14.5556 10.1363 15.5756H10.0725C9.93703 14.5556 9.71922 13.4639 9.58375 12.5794L8.90375 8.90312H7.48ZM14.0675 8.90312V17.0631H15.3638V8.90312H14.0675ZM19.1675 8.90312C17.672 8.90312 16.7875 9.86469 16.7875 11.1556C16.7875 12.0402 17.4755 12.7759 18.36 13.3869C19.04 13.8623 19.4438 14.2156 19.4438 14.8956C19.4438 15.5756 19.048 16.0431 18.2325 16.0431C17.757 16.0431 17.2072 15.9077 16.9363 15.7031L16.66 16.7869C16.9309 16.9914 17.5366 17.1269 18.1475 17.1269C19.643 17.1269 20.6763 16.2423 20.6763 14.7469C20.6763 13.9314 20.2725 13.1319 19.2525 12.4519C18.437 11.9764 18.0837 11.6178 18.0837 11.0069C18.0837 10.4623 18.4184 9.98687 19.1675 9.98687C19.643 9.98687 19.983 10.1277 20.1875 10.2631L20.4 9.17937C20.1955 9.04391 19.712 8.90312 19.1675 8.90312ZM23.3325 8.90312L21.4837 17.0631H22.78L23.1838 14.9594H24.82L25.2238 17.0631H26.52L24.82 8.90312H23.3325ZM24.0125 10.1994H24.0763C24.1453 10.7439 24.217 11.4823 24.3525 12.0269L24.6712 13.8756H23.3962L23.7362 12.0269C23.8053 11.5514 23.9434 10.7439 24.0125 10.1994ZM5.9925 20.3994C5.61797 20.4339 5.34172 20.7686 5.37625 21.1431C5.41078 21.5177 5.74547 21.7939 6.12 21.7594H27.88C28.1244 21.762 28.3528 21.6345 28.4777 21.422C28.5998 21.2095 28.5998 20.9492 28.4777 20.7367C28.3528 20.5242 28.1244 20.3967 27.88 20.3994H6.12C6.09875 20.3994 6.0775 20.3994 6.05625 20.3994C6.035 20.3994 6.01375 20.3994 5.9925 20.3994ZM5.9925 24.4794C5.61797 24.5139 5.34172 24.8486 5.37625 25.2231C5.41078 25.5977 5.74547 25.8739 6.12 25.8394H19.04C19.2844 25.842 19.5128 25.7145 19.6377 25.502C19.7598 25.2895 19.7598 25.0292 19.6377 24.8167C19.5128 24.6042 19.2844 24.4767 19.04 24.4794H6.12C6.09875 24.4794 6.0775 24.4794 6.05625 24.4794C6.035 24.4794 6.01375 24.4794 5.9925 24.4794ZM22.9925 24.4794C22.618 24.5139 22.3417 24.8486 22.3762 25.2231C22.4108 25.5977 22.7455 25.8739 23.12 25.8394H27.88C28.1244 25.842 28.3528 25.7145 28.4777 25.502C28.5998 25.2895 28.5998 25.0292 28.4777 24.8167C28.3528 24.6042 28.1244 24.4767 27.88 24.4794H23.12C23.0988 24.4794 23.0775 24.4794 23.0562 24.4794C23.035 24.4794 23.0138 24.4794 22.9925 24.4794Z" fill="#231F20" />
        //     </svg>
        // },
        // {
        //     name: 'Driving license', subName: 'Both sides',
        //     svg: <svg xmlns="http://www.w3.org/2000/svg" width="34" height="35" viewBox="0 0 34 35" fill="none">
        //         <path d="M4.08035 6.61914C2.58488 6.61914 1.36035 7.84367 1.36035 9.33914V25.6591C1.36035 27.1546 2.58488 28.3791 4.08035 28.3791H29.9203C31.4158 28.3791 32.6403 27.1546 32.6403 25.6591V9.33914C32.6403 7.84367 31.4158 6.61914 29.9203 6.61914H4.08035ZM4.08035 7.97914H29.9203C30.68 7.97914 31.2803 8.57945 31.2803 9.33914V25.6591C31.2803 26.4188 30.68 27.0191 29.9203 27.0191H4.08035C3.32066 27.0191 2.72035 26.4188 2.72035 25.6591V9.33914C2.72035 8.57945 3.32066 7.97914 4.08035 7.97914ZM11.4966 10.6991C9.98785 10.7257 8.92269 11.4402 8.50035 12.4416C8.12582 13.3341 8.20019 14.3409 8.41535 15.3104C8.41004 15.3184 8.42066 15.3237 8.41535 15.3316C8.29582 15.5362 8.18957 15.839 8.20285 16.2029C8.22145 16.7262 8.41535 17.1193 8.62785 17.3716C8.73941 17.5045 8.78723 17.5177 8.88285 17.5841C8.99176 17.9215 9.11129 18.2641 9.2866 18.4979C9.40348 18.6546 9.53629 18.729 9.64785 18.8379C9.65582 19.1274 9.66379 19.3957 9.64785 19.6666C9.59207 19.7755 9.49379 19.8924 9.18035 20.0491C8.8377 20.2218 8.33832 20.3971 7.82035 20.6229C7.30238 20.8487 6.75254 21.1302 6.29035 21.6004C5.82816 22.0705 5.49082 22.7452 5.44035 23.5766C5.42973 23.7652 5.49613 23.9485 5.62363 24.084C5.75379 24.2221 5.93176 24.2991 6.12035 24.2991H17.0003C17.1889 24.2991 17.3669 24.2221 17.4971 24.084C17.6246 23.9485 17.691 23.7652 17.6804 23.5766C17.6299 22.7452 17.2925 22.0705 16.8303 21.6004C16.3682 21.1302 15.8183 20.8487 15.3004 20.6229C14.7824 20.3971 14.283 20.2218 13.9404 20.0491C13.6136 19.8845 13.4994 19.757 13.4516 19.6454C13.4383 19.3824 13.4649 19.1195 13.4729 18.8379C13.6004 18.7157 13.7624 18.6387 13.8766 18.4766C14.0439 18.2349 14.1449 17.8923 14.2379 17.5629C14.4663 17.3929 14.8966 17.0263 14.8966 16.2666C14.8966 15.9479 14.7372 15.754 14.6416 15.5229C14.801 14.9996 15.0029 14.2187 14.9179 13.3766C14.87 12.9171 14.7425 12.4443 14.4079 12.0379C14.1316 11.7005 13.6694 11.5146 13.1754 11.4429C12.7822 11.0126 12.235 10.6991 11.5179 10.6991C11.5099 10.6991 11.5046 10.6991 11.4966 10.6991ZM11.5179 12.0591C11.5285 12.0591 11.5285 12.0591 11.5391 12.0591C11.9694 12.0698 12.2589 12.3195 12.3041 12.3991C12.4236 12.6037 12.6414 12.7338 12.8779 12.7391C13.1833 12.7391 13.2577 12.8029 13.3454 12.9091C13.433 13.0154 13.5286 13.2305 13.5579 13.5254C13.6163 14.1151 13.4357 14.9305 13.3241 15.2679C13.2471 15.4937 13.2949 15.746 13.4516 15.9266C13.4436 15.9346 13.5366 16.0887 13.5366 16.2666C13.5366 16.3915 13.3241 16.5854 13.3241 16.5854C13.1541 16.6863 13.0399 16.859 13.0054 17.0529C12.9735 17.276 12.8752 17.5124 12.7504 17.6904C12.6255 17.8684 12.4582 18.0065 12.4954 17.9879C12.2669 18.0995 12.1182 18.3279 12.1129 18.5829C12.1129 18.9813 12.0624 19.3691 12.1129 19.9216C12.1208 19.9801 12.1341 20.0359 12.1554 20.0916C12.3785 20.6866 12.8752 21.024 13.3454 21.2604C13.8155 21.4968 14.2963 21.6801 14.7479 21.8766C15.1994 22.0732 15.5899 22.2884 15.8529 22.5566C15.9432 22.6496 15.9564 22.8276 16.0229 22.9391H7.09785C7.16426 22.8276 7.17754 22.6496 7.26785 22.5566C7.53082 22.2884 7.92129 22.0732 8.37285 21.8766C8.82441 21.6801 9.30519 21.4968 9.77535 21.2604C10.2455 21.024 10.7449 20.6893 10.9654 20.0916C10.9866 20.0359 10.9999 19.9801 11.0079 19.9216C11.0583 19.3665 11.0079 18.9813 11.0079 18.5829C11.0105 18.3385 10.8804 18.1101 10.6679 17.9879C10.6785 17.9985 10.6732 18.0012 10.6466 17.9879C10.6068 17.9507 10.4739 17.8285 10.3704 17.6904C10.2243 17.4965 10.0968 17.2335 10.0729 17.0529C10.0383 16.8298 9.89488 16.6385 9.69035 16.5429C9.69035 16.5429 9.71426 16.5535 9.6691 16.5004C9.62395 16.4473 9.57082 16.3649 9.56285 16.1391C9.56019 16.0701 9.6266 15.9691 9.6266 15.9691C9.7966 15.7965 9.86301 15.5441 9.7966 15.3104C9.55754 14.3913 9.52566 13.5148 9.7541 12.9729C9.97988 12.4363 10.381 12.0857 11.5179 12.0591ZM19.5928 13.4191C19.2183 13.4537 18.9421 13.7884 18.9766 14.1629C19.0111 14.5374 19.3458 14.8137 19.7204 14.7791H27.8804C28.1247 14.7818 28.3532 14.6543 28.478 14.4418C28.6002 14.2293 28.6002 13.969 28.478 13.7565C28.3532 13.544 28.1247 13.4165 27.8804 13.4191H19.7204C19.6991 13.4191 19.6779 13.4191 19.6566 13.4191C19.6353 13.4191 19.6141 13.4191 19.5928 13.4191ZM19.5928 16.8191C19.2183 16.8537 18.9421 17.1884 18.9766 17.5629C19.0111 17.9374 19.3458 18.2137 19.7204 18.1791H27.8804C28.1247 18.1818 28.3532 18.0543 28.478 17.8418C28.6002 17.6293 28.6002 17.369 28.478 17.1565C28.3532 16.944 28.1247 16.8165 27.8804 16.8191H19.7204C19.6991 16.8191 19.6779 16.8191 19.6566 16.8191C19.6353 16.8191 19.6141 16.8191 19.5928 16.8191ZM19.5928 20.2191C19.2183 20.2537 18.9421 20.5884 18.9766 20.9629C19.0111 21.3374 19.3458 21.6137 19.7204 21.5791H27.8804C28.1247 21.5818 28.3532 21.4543 28.478 21.2418C28.6002 21.0293 28.6002 20.769 28.478 20.5565C28.3532 20.344 28.1247 20.2165 27.8804 20.2191H19.7204C19.6991 20.2191 19.6779 20.2191 19.6566 20.2191C19.6353 20.2191 19.6141 20.2191 19.5928 20.2191Z" fill="#231F20" />
        //     </svg>
        // },
        {
            name: 'NationalId', subName: 'Both sides',
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                <path d="M4.75977 1.35938V32.6394H5.43977H29.2398V1.35938H4.75977ZM6.11977 2.71937H27.8798V31.2794H6.11977V2.71937ZM16.3198 6.11937V9.02266L13.807 7.57102L13.127 8.74773L15.6411 10.1994L13.127 11.651L13.807 12.8277L16.3198 11.3761V14.2794H17.6798V11.3761L20.1926 12.8277L20.8726 11.651L18.3584 10.1994L20.8726 8.74773L20.1926 7.57102L17.6798 9.02266V6.11937H16.3198ZM9.51977 17.6794V19.0394H24.4798V17.6794H9.51977ZM9.51977 21.7594V23.1194H24.4798V21.7594H9.51977ZM9.51977 25.8394V27.1994H12.2398H14.2798H17.6798V25.8394H14.2798H12.2398H9.51977Z" fill="black" />
            </svg>
        },
    ]

    useEffect(() => {
        if (window.localStorage.getItem("status")) {

            window.localStorage.getItem("status") == "KYC Verified Successfully" ? toast.success("KYC Verified Successfully") : toast.error(window.localStorage.getItem("status"))
            window.localStorage.removeItem("status")
        }
    }, [])
   
    const [upldDoc, setUpldDoc] = useState(false)

    const handleUpldDoc = (row) => {
        setVerifyIdentity({ ...verifyIdentity, docType: { name: row.name, subname: row.subName } })
        setVerifyIdentityErr({ ...verifyIdentityErr, docType: '' })
        setUpldDoc(!upldDoc)
    }

    const videoRef = useRef(null);
    // const canvasRef = useRef(null);
    // const [photo, setPhoto] = useState(null);


    const startCamera = async () => {
        try {
            // Request access to the camera
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });

            // Set the video source to the camera stream
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error("Error accessing camera:", error);
        }
    };

    // const capturePhoto = () => {
    //     if (canvasRef.current && videoRef.current) {
    //         const canvas = canvasRef.current;
    //         const video = videoRef.current;

    //         // Set canvas size to video size
    //         canvas.width = video.videoWidth;
    //         canvas.height = video.videoHeight;

    //         // Draw the current video frame onto the canvas
    //         const context = canvas.getContext("2d");
    //         context.drawImage(video, 0, 0, canvas.width, canvas.height);

    //         // Convert canvas content to data URL (base64 image)
    //         const imageUrl = canvas.toDataURL("image/png");

    //         // Store the image in the state
    //         setImageUrl(imageUrl);
    //     }
    // };

    const [alreadyKyc, setAlreadyKyc] = useState("")

    const [kycStatus, setKycStatus] = useState("")
    const [loading, setLoading] = useState(false)

    const [apiCallStatus, setApiCallStatus] = useState(false)


    const [userDetails, setUserDetails] = useState({
        name: "",
        nickName: "",
        dob: "",
        email: "",
        phone: "",
        soi: "",
        empyType: ""
    })

    const [userDetailsErr, setUserDetailsErr] = useState({
        name: "",
        nickName: "",
        dob: "",
        email: "",
        phone: "",
        soi: "",
        empyType: ""
    })

    const [addressDetails, setAddressDetails] = useState({
        address1: "",
        address2: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        addressProof: "",
        address_proof_type: ""
    })

    const [addressDetailsErr, setAddressDetailsErr] = useState({
        address1: "",
        address2: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        addressProof: "",
        address_proof_type: ""
    })

    const [verifyIdentity, setVerifyIdentity] = useState({
        country: "",
        docType: "",
        idnumber: "",
        img1: "",
        img2: ""
    })

    const [verifyIdentityErr, setVerifyIdentityErr] = useState({
        country: "",
        docType: "",
        idnumber: "",
        img1: "",
        img2: ""
    })

    const handleReUpload = () => {
        setImage(null)
        setCroppedImage(null)
        // setCroppedImage_bck(null) 
    }

    const handleReUpload2 = () => {
        setImage(null)
        // setCroppedImage(null)
        setCroppedImage_bck(null) 
    }
    const handleReset2 = () => {

        setUpldDoc(false)
        setVerifyIdentity({
            ...verifyIdentity,
            docType: "",
            idnumber: "",
            img1: "",
            img2: ""
        });
        setVerifyIdentityErr({
            country: "",
            docType: "",
            idnumber: "",
            img1: "",
            img2: ""
        })
        setImageUrl_front(null)
        setImageUrl_back(null)
        setCroppedImage(null)
        setCroppedImage_bck(null)
        setImage(null)
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission if in a form context
            handleNextStep();
        }
    };

    const [gender, setGender] = React.useState('');

    const handleChange = (event) => {
        setGender(event.target.value);
    };


    const handleNextStep = async () => {
        try {
            const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            // if (activeStep == steps?.length - 1) {

            // setVerifyIdentity({
            //     country: "",
            //     docType: "",
            //     img1: "",
            //     img2: ""
            // })
            // setUserDetails({
            //     name: "",
            //     nickName: "",
            //     email: "",
            //     phone: ""
            // })
            // setAddressDetails({
            //     address1: "",
            //     address2: "",
            //     city: "",
            //     state: "",
            //     country: "",
            //     postalCode: ""
            // })


            // }
            // if (activeStep == 0) {
            if (userDetails?.name == '') {
                toast.error("Name is Required")
                setUserDetailsErr({
                    ...userDetailsErr,
                    name: "Name is Required"
                })
            } else if (userDetails?.nickName == '') {
                toast.error("Sur Name is Required")
                setUserDetailsErr({
                    ...userDetailsErr,
                    nickName: "Sur Name is Required"
                })
            }
            else if (userDetails?.email == '') {
                toast.error("Email is Required")
                setUserDetailsErr({
                    ...userDetailsErr,
                    email: "Email is Required"
                })
            }
            else if (!email_pattern.test(userDetails?.email)) {
                toast.error("Please Enter a Valid Email")
                setUserDetailsErr({
                    ...userDetailsErr,
                    email: "Please Enter a Valid Email"
                })
            }
            else if (userDetails?.phone == '') {
                toast.error("Phone is Required")
                setUserDetailsErr({
                    ...userDetailsErr,
                    phone: "Phone is Required"
                })
            } else if (userDetails?.dob == '') {
                toast.error("Date of Birth is Required")
                setUserDetailsErr({
                    ...userDetailsErr,
                    dob: "Date of Birth is Required"
                })
            } else if (userDetailsErr?.dob != "") {
                toast.error("Age should be greater than 18")
                setUserDetailsErr({
                    ...userDetailsErr,
                    dob: "Age should be greater than 18"
                })
            }

            else if (gender == "") {
                toast.error("Please Select Gender")
            }

            else if (userDetailsErr?.soi != "") {
                toast.error("Please Enter Source of Income")
                setUserDetailsErr({
                    ...userDetailsErr,
                    soi: "Please Enter Source of Income"
                })
            }

            else if (userDetailsErr?.empyType != "") {
                toast.error("Please Enter Employment Type")
                setUserDetailsErr({
                    ...userDetailsErr,
                    empyType: "Please Enter Employment Type"
                })
            }


            // else {
            //     activeStep === steps.length - 1 ? handleReset() : handleNext()
            // }

            // } else if (activeStep == 1) {

            else if (addressDetails?.address1 == '') {
                toast.error("Address 1 is Required")
                setAddressDetailsErr({
                    ...addressDetailsErr,
                    address1: "Address 1 is Required"
                })
            }

            // else if (addressDetails?.address2 == '') {
            //     setAddressDetailsErr({
            //         ...addressDetailsErr,
            //         address2: "Address 2 is Required"
            //     })
            // }

            else if (addressDetails?.city == '') {
                toast.error("City is Required")
                setAddressDetailsErr({
                    ...addressDetailsErr,
                    city: "City is Required"
                })
            } else if (addressDetails?.state == '') {
                toast.error("State is Required")
                setAddressDetailsErr({
                    ...addressDetailsErr,
                    state: "State is Required"
                })
            } else if (addressDetails?.country == '') {
                toast.error("Country is Required")
                setAddressDetailsErr({
                    ...addressDetailsErr,
                    country: "Country is Required"
                })
            } else if (addressDetails?.postalCode == '') {
                toast.error("Postal Code is Required")
                setAddressDetailsErr({
                    ...addressDetailsErr,
                    postalCode: "Postal Code is Required"
                })
            }
            else if (addressDetails?.address_proof_type == '') {
                toast.error("Please Select Address Proof Type")
                setAddressDetailsErr({
                    ...addressDetailsErr,
                    address_proof_type: "Please Select Address Proof Type"
                })
            }
            else if (addressDetails?.addressProof == '') {
                toast.error("Please Upload AddressProof")
                setAddressDetailsErr({
                    ...addressDetailsErr,
                    addressProof: "Please Upload AddressProof"
                })
            }
            //  else {
            //     activeStep === steps.length - 1 ? handleReset() : handleNext()
            // }
            // } else if (activeStep == 2) {
            else if (verifyIdentity?.country == '') {
                toast.error("Please Select Country")
                setVerifyIdentityErr({
                    ...verifyIdentityErr,
                    country: "Please Select Country"
                })
            } else if (verifyIdentity?.docType == '') {
                toast.error("Please Select Document Type")
                setVerifyIdentityErr({
                    ...verifyIdentityErr,
                    docType: "Please Select Document Type"
                })
            } else if (verifyIdentity?.img1 == '') {
                toast.error("Please Upload Image 1")
                setVerifyIdentityErr({
                    ...verifyIdentityErr,
                    img1: "Please Upload Image"
                })
            } else if (verifyIdentity?.docType?.subname == "Both sides" && verifyIdentity?.img2 == '') {
                toast.error("Please Upload Image 2")
                setVerifyIdentityErr({
                    ...verifyIdentityErr,
                    img2: "Please Upload Image"
                })
            } else if (verifyIdentity?.idnumber == '') {
                toast.error("Please Enter ID Number")
                setVerifyIdentityErr({
                    ...verifyIdentityErr,
                    idnumber: "Please Enter ID Number"
                })
            }

            //  else {
            //     activeStep === steps.length - 1 ? handleReset() : handleNext()
            // }
            // } else if (activeStep == 3) {

            else {

                setApiCallStatus(true)
                var payload = {
                    Firstname: userDetails?.name,
                    Lastname: userDetails?.nickName,
                    dob: userDetails?.dob,
                    email: userDetails?.email,
                    phone: userDetails?.phone,
                    soi: userDetails?.soi,
                    empyType: userDetails?.empyType,
                    gender: gender,
                    address_line1: addressDetails?.address1,
                    address_line2: addressDetails?.address2,
                    address_proof: "https://stage.apzkyc.com/apzkyc/images/1741671128255_Capitec%20Bank%20statement.pdf",
                    // address_proof: addressDetails?.addressProof,
                    address_proof_type: addressDetails?.address_proof_type,
                    city: addressDetails?.city,
                    stateOrProvince: addressDetails?.state,
                    Country: addressDetails?.country,
                    postalcode: addressDetails?.postalCode,
                    ID_country: verifyIdentity?.country,
                    ID_type: verifyIdentity?.docType?.name,
                    ID_Number: verifyIdentity?.idnumber,
                    ID_Image_front: verifyIdentity?.img1,
                    ID_Image_Back: verifyIdentity?.img2,
                    SuccessUrl: consts.successurl,
                    FailureUrl: consts.failureUrl
                }
                const { data } = await Axios.post('/singlekycVerifys', payload, {
                    headers: {
                        Authorization: window.localStorage.getItem('Rikosta')
                    }
                })
                if (data?.success == true) {
                    setApiCallStatus(false)
                    if (data?.verify_status == "Not_Verified") {
                        toast.error("Id Verification Failed")
                    } else {
                        window.location.replace(data?.url)
                    }
                } else {
                    setApiCallStatus(false)
                    toast.error(data?.message)
                }
            }

            // } else {
            //     activeStep === steps.length - 1 ? handleReset() : handleNext()
            // }
        } catch (error) {
            setApiCallStatus(false)
            toast.error(error?.response?.data?.message)
            if (error?.status == 499) {
                window.localStorage.removeItem('Rikosta');
                window.localStorage.removeItem('userType');
                setTimeout(() => {
                    window.location.replace('/login')
                }, 1000);
            }
            console.log("🚀 ~ handleNextStep ~ error:", error)
        }
    }

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
                setAlreadyKyc(data?.result)
                if (data?.result?.Id_verify) {
                    if (data?.result?.Liveness_verify) {
                        setKycStatus("Verified")
                    } else {
                        setKycStatus("Liveness Verification Failed")
                    }
                } else {
                    setKycStatus("ID Verification Failed")
                }
            } else {
                setLoading(false)
                // toast.error(data?.message)
            }
        } catch (error) {
            setLoading(false)
            console.log("🚀 ~ getKycDetails ~ error:", error)
        }
    }

    useEffect(() => {
        getKycDetails()
    }, [])

    const ageCalc = async (e) => {
        try {
            const today = new Date();
            var calc = new Date(e?.target?.value)
            let calculatedAge = today.getFullYear() - calc.getFullYear();
            const monthDiff = today.getMonth() - calc.getMonth();

            // Adjust age if the birthday hasn't occurred yet this year
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < calc.getDate())) {
                calculatedAge--;
            }
            var date = `${calc.getFullYear()}-${(calc.getMonth() + 1) < 10 ? `0${calc.getMonth() + 1}` : calc.getMonth() + 1}-${calc.getDate() < 10 ? `0${calc.getDate()}` : calc.getDate()}`
            setUserDetails({
                ...userDetails,
                dob: date
            })
            if (calculatedAge >= 18) {
                setUserDetailsErr({
                    ...userDetailsErr,
                    dob: ""
                })
            } else {
                setUserDetailsErr({
                    ...userDetailsErr,
                    dob: "Age should be greater than 18"
                })
            }
        } catch (error) {
            console.log("🚀 ~ ageCalc ~ error:", error)

        }

    }

    const imgaeUploadUrl = async (files) => {
        try {
            setIsUploading(true)
            let formData = await new FormData();
            formData.append("image", files)
            const { data } = await Axios.post('/uploadimage', formData, {
                headers: {
                    Authorization: window.localStorage.getItem('Rikosta')
                }
            })
            if (data.result) {
                setIsUploading(false)
                return data?.result
            }
        } catch (error) {
            setIsUploading(false)
            if (error?.status == 499) {
                toast.error(error?.response?.data?.message)
                window.localStorage.removeItem('Rikosta');
                window.localStorage.removeItem('userType');
                setTimeout(() => {
                    window.location.replace('/login')
                }, 1000);
            }
            console.log("🚀 ~ imgaeUploadUrl ~ error:", error)
        }
    }

    return (
        <div className='kyc' style={{}}>
            <Header />
            {
                loading == false &&
                <Grid container className='margin-top' sx={{ justifyContent: "center" }}>
                    {
                        alreadyKyc == "" ?
                            <Grid xs={12} sm={12} md={12} lg={10} xl={9} >

                                <div className='kyb-new-banner mt-20'>
                                    <h3 className="Head-Kyb">
                                        Personal Information
                                    </h3>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} >
                                            <div className="kyb-txtnew mt-20">
                                                <TextField id="outlined-basic" label=" Name" variant="outlined" type="text" sx={{ width: "100%" }}
                                                    value={userDetails?.name}
                                                    onChange={(e) => {
                                                        setUserDetails({ ...userDetails, name: e.target.value })
                                                        setUserDetailsErr({ ...userDetailsErr, name: '' })
                                                    }}
                                                    autoFocus={userDetailsErr?.name != "" ? true : false}
                                                    onKeyDown={handleKeyDown}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} >
                                            <div className="kyb-txtnew mt-20">
                                                <TextField id="outlined-basic" label="Sur Name" variant="outlined" type="text" sx={{ width: "100%" }}
                                                    value={userDetails?.nickName}
                                                    onChange={(e) => {
                                                        setUserDetails({ ...userDetails, nickName: e.target.value })
                                                        setUserDetailsErr({ ...userDetailsErr, nickName: '' })
                                                    }}
                                                    onKeyDown={handleKeyDown}
                                                />
                                            </div>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} >
                                            <div className="kyb-txtnew mt-20">
                                                <TextField id="outlined-basic" label="Email" variant="outlined" type="text" sx={{ width: "100%" }}
                                                    value={userDetails?.email}
                                                    onChange={(e) => {
                                                        setUserDetails({ ...userDetails, email: e.target.value })
                                                        setUserDetailsErr({ ...userDetailsErr, email: '' })
                                                    }}
                                                    onKeyDown={handleKeyDown}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} >
                                            <div className="kyb-txtnew mt-20">
                                                <TextField id="outlined-basic" label="Phone" variant="outlined" type="text" sx={{ width: "100%" }}
                                                    value={userDetails?.phone}
                                                    onChange={(e) => {
                                                        setUserDetails({ ...userDetails, phone: e.target.value })
                                                        setUserDetailsErr({ ...userDetailsErr, phone: '' })
                                                    }}
                                                    onKeyDown={handleKeyDown}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} >
                                            <h3 className="Head-Kyb">
                                                Date of Birth
                                            </h3>
                                            <div className="kyb-txtnew mt-20">
                                                <TextField variant="outlined" type="date" sx={{ width: "100% !important" }}

                                                    onChange={(e) => {
                                                        // console.log(e)
                                                        ageCalc(e)
                                                        // setUserDetails({ ...userDetails, dob: e })
                                                    }} />
                                            </div>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} >
                                            <h3 className="Head-Kyb">
                                                Gender
                                            </h3>
                                            <div className="kyb-txtnew mt-20">

                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={gender}
                                                        label="Age"
                                                        onChange={handleChange}
                                                    >
                                                        <MenuItem value={"Male"}>Male</MenuItem>
                                                        <MenuItem value={"Female"}>Female</MenuItem>
                                                        <MenuItem value={"Others"}>Others</MenuItem>
                                                    </Select>
                                                </FormControl>

                                                {/* <TextField id="outlined-basic" label="Source of Income" variant="outlined" type="text" sx={{ width: "100%" }}
                                                    value={userDetails?.soi}
                                                    onChange={(e) => {
                                                        setUserDetails({ ...userDetails, soi: e.target.value })
                                                        setUserDetailsErr({ ...userDetailsErr, soi: '' })
                                                    }}
                                                    onKeyDown={handleKeyDown}
                                                /> */}
                                            </div>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} >
                                            <div className="kyb-txtnew mt-20">
                                                <TextField id="outlined-basic" label="Source of Income" variant="outlined" type="text" sx={{ width: "100%" }}
                                                    value={userDetails?.soi}
                                                    onChange={(e) => {
                                                        setUserDetails({ ...userDetails, soi: e.target.value })
                                                        setUserDetailsErr({ ...userDetailsErr, soi: '' })
                                                    }}
                                                    onKeyDown={handleKeyDown}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} >
                                            <div className="kyb-txtnew mt-20">
                                                <TextField id="outlined-basic" label="Employment Type" variant="outlined" type="text" sx={{ width: "100%" }}
                                                    value={userDetails?.empyType}
                                                    onChange={(e) => {
                                                        setUserDetails({ ...userDetails, empyType: e.target.value })
                                                        setUserDetailsErr({ ...userDetailsErr, empyType: '' })
                                                    }}
                                                    onKeyDown={handleKeyDown}
                                                />
                                            </div>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} >
                                            <h3 className="Head-Kyb">
                                                Address Information(Line 1)
                                            </h3>
                                            <div className="kyb-txtnew mt-20">
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    multiline
                                                    rows={4}
                                                    // disabled={kycStatus}
                                                    placeholder='Enter your address'
                                                    // value={companyAddress}
                                                    // onChange={(e) => setCompanyAddress(e.target.value)}
                                                    style={{ width: '100%' }}
                                                    className='input2'

                                                    value={addressDetails?.address1}
                                                    onChange={(e) => {
                                                        setAddressDetails({ ...addressDetails, address1: e.target.value })
                                                        setAddressDetailsErr({ ...addressDetailsErr, address1: '' })
                                                    }}
                                                    onKeyDown={handleKeyDown}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} >
                                            <h3 className="Head-Kyb">
                                                Address Information(Line 2)
                                            </h3>
                                            <div className="kyb-txtnew mt-20">
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    multiline
                                                    rows={4}
                                                    // disabled={kycStatus}
                                                    placeholder='Enter your address'
                                                    // value={companyAddress}
                                                    // onChange={(e) => setCompanyAddress(e.target.value)}
                                                    style={{ width: '100%' }}
                                                    className='input2'

                                                    value={addressDetails?.address2}
                                                    onChange={(e) => {
                                                        setAddressDetails({ ...addressDetails, address2: e.target.value })
                                                    }}
                                                    onKeyDown={handleKeyDown}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} >
                                            <div className="kyb-txtnew mt-20">
                                                <TextField id="outlined-basic" label="City" variant="outlined" type="text" sx={{ width: "100%" }}
                                                    value={addressDetails?.city}
                                                    onChange={(e) => {
                                                        setAddressDetails({ ...addressDetails, city: e.target.value })
                                                        setAddressDetailsErr({ ...addressDetailsErr, city: '' })
                                                    }}
                                                    onKeyDown={handleKeyDown}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} >
                                            <div className="kyb-txtnew mt-20">
                                                <TextField id="outlined-basic" label="State" variant="outlined" type="text" sx={{ width: "100%" }}
                                                    value={addressDetails?.state}
                                                    onChange={(e) => {
                                                        setAddressDetails({ ...addressDetails, state: e.target.value })
                                                        setAddressDetailsErr({ ...addressDetailsErr, state: '' })
                                                    }}
                                                    onKeyDown={handleKeyDown}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} >
                                            <div className="kyb-txtnew mt-20">
                                                <TextField id="outlined-basic" label="Country" variant="outlined" type="text" sx={{ width: "100%" }}
                                                    value={addressDetails?.country}
                                                    onChange={(e) => {
                                                        setAddressDetails({ ...addressDetails, country: e.target.value })
                                                        setAddressDetailsErr({ ...addressDetailsErr, country: '' })
                                                    }}
                                                    onKeyDown={handleKeyDown}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} >
                                            <div className="kyb-txtnew mt-20">
                                                <TextField id="outlined-basic" label="Postal/Zip Code" variant="outlined" type="text" sx={{ width: "100%" }}
                                                    value={addressDetails?.postalCode}
                                                    onChange={(e) => {
                                                        setAddressDetails({ ...addressDetails, postalCode: e.target.value })
                                                        setAddressDetailsErr({ ...addressDetailsErr, postalCode: '' })
                                                    }}
                                                    onKeyDown={handleKeyDown}
                                                />
                                            </div>
                                        </Grid>


                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                            <div className='display-2 mt-20'>
                                                <div>
                                                    <h3 className="Head-Kyb ">
                                                        Address Proof Type
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="margin-top">
                                                <Selects
                                                    value={selectedAddressType}
                                                    onChange={handleChangeAddressType}
                                                    options={address_proof_type}
                                                    styles={customStyles}
                                                    formatOptionLabel={formatOptionLabelAddress}
                                                    isSearchable={true}
                                                    placeholder="Select a Address Proof Type..."
                                                    className='selectctry'
                                                    onKeyDown={handleKeyDown}
                                                />

                                                <div className='invalid-error'>  {verifyIdentityErr?.country != '' ? <p style={{ textAlign: "left" }}>{verifyIdentityErr?.country}</p> : ""}</div>
                                            </div>

                                        </Grid>


                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                            <div className='display-2 mt-20'>
                                                <h3 className="Head-Kyb ">
                                                    Upload Address Proof
                                                </h3>
                                                {imageUrl && <Button
                                                    component="label"
                                                    role={undefined}
                                                    className='upld-btn'
                                                    variant='contained'
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon sx={{ fontSize: "30px !important" }} />}

                                                    sx={{ textTransform: "capitalize !important" }}
                                                >
                                                    <div>
                                                        ReUpload
                                                    </div>

                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        onChange={handleImageUpload}
                                                        multiple
                                                    />
                                                </Button>}
                                            </div>
                                            <div className="mt-20 upld-brd">
                                                {imageUrl &&
                                                    <div className="upld-img" style={{ width: '100%', height: "100%" }} >
                                                        <PDFViewer pdfUrl={imageUrl} />
                                                    </div>
                                                }

                                                <Button
                                                    component="label"
                                                    role={undefined}
                                                    className='upld-btn'
                                                    // variant={companyAddressImg ? "contained" : null}
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon sx={{ fontSize: "30px !important" }} />}

                                                    sx={{ width: "100% !important", height: "100% !important", textTransform: "capitalize !important", display: imageUrl ? "none" : "flex" }}
                                                >
                                                    <div >
                                                        Upload here
                                                    </div>

                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        onChange={handleImageUpload}
                                                        multiple
                                                    // disabled={kycStatus}
                                                    />
                                                </Button>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                            <div className='display-2 mt-20'>
                                                <div>
                                                    <h3 className="Head-Kyb ">
                                                        Verify your identity
                                                    </h3>
                                                    <p>Select the issuing country of your identity document
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="margin-top">
                                                <Selects
                                                    value={selectedCountry}
                                                    onChange={handleChangeCountry}
                                                    options={countries}
                                                    styles={customStyles}
                                                    formatOptionLabel={formatOptionLabel}
                                                    isSearchable={true}
                                                    placeholder="Select a country..."
                                                    className='selectctry'
                                                    onKeyDown={handleKeyDown}
                                                />

                                                {/* <div className='invalid-error'>  {verifyIdentityErr?.country != '' ? <p style={{ textAlign: "left" }}>{verifyIdentityErr?.country}</p> : ""}</div> */}
                                                {selectedCountry && <p className=" margin-t-10px">
                                                    To verify your identity, you can upload one of the following documents:
                                                </p>}
                                            </div>

                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                            {!upldDoc ?
                                                <div className="margin-top">
                                                    {selectedCountry ? proof.map((row, i) => {
                                                        return (
                                                            <div className={hoveredIndex === i ? "upl-docmainHvr cursor" : "upl-docmain cursor"} style={{ width: !matches ? '80%' : '300px' }}
                                                                onMouseEnter={() => { setHoveredIndex(i); setHover(1) }
                                                                } // Set the hovered index
                                                                onMouseLeave={() => { setHoveredIndex(null); setHover(0) }}

                                                                key={i}

                                                                onClick={() => handleUpldDoc(row)}
                                                            >
                                                                <div className="display-2">
                                                                    <div className="display-1">
                                                                        {row.svg}
                                                                        <div className={hoveredIndex === i ? "upl-txthvr" : "upl-txt"}>
                                                                            {row.name}
                                                                            <div className={hoveredIndex === i ? "upl-deschvr" : "upl-desc"}>
                                                                                {row.subName}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                        <path d="M9.28957 15.8793L13.1696 11.9993L9.28957 8.1193C8.89957 7.7293 8.89957 7.0993 9.28957 6.7093C9.67957 6.3193 10.3096 6.3193 10.6996 6.7093L15.2896 11.2993C15.6796 11.6893 15.6796 12.3193 15.2896 12.7093L10.6996 17.2993C10.3096 17.6893 9.67957 17.6893 9.28957 17.2993C8.90957 16.9093 8.89957 16.2693 9.28957 15.8793Z" fill={hoveredIndex === i ? "#fff" : "#231F20"} />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        )
                                                    }) : <></>}

                                                    {/* <div className='invalid-error'>  {verifyIdentityErr?.docType != '' ? <p style={{ textAlign: "left" }}>{verifyIdentityErr?.docType}</p> : ""}</div> */}
                                                </div> : <Grid container>
                                                    <Grid xs={12} sm={12} md={12} lg={6} xl={6}>

                                                        <h3 className="Head-Kyb mt-20">
                                                            Upload front side
                                                        </h3>
                                                       { <div className="mt-10">
                                                            <div className="frnt-sid">
                                                                <div className="display-1" style={{ justifyContent: 'center' }}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
                                                                        <path d="M5 7L5 4.5C5 4.36739 5.05268 4.24022 5.14645 4.14645C5.24021 4.05268 5.36739 4 5.5 4C5.63261 4 5.75978 4.05268 5.85355 4.14645C5.94732 4.24022 6 4.36739 6 4.5L6 7C6 7.13261 5.94732 7.25979 5.85355 7.35355C5.75978 7.44732 5.63261 7.5 5.5 7.5C5.36739 7.5 5.24021 7.44732 5.14645 7.35355C5.05268 7.25979 5 7.13261 5 7ZM5.855 3.355C5.80828 3.40134 5.75287 3.43801 5.69195 3.46289C5.63103 3.48777 5.5658 3.50038 5.5 3.5C5.5658 3.50038 5.63103 3.48777 5.69195 3.46289C5.75287 3.43801 5.80828 3.40134 5.855 3.355ZM6 3C6.00038 3.06581 5.98777 3.13104 5.96289 3.19196C5.938 3.25287 5.90134 3.30828 5.855 3.355C5.90134 3.30828 5.938 3.25287 5.96289 3.19196C5.98777 3.13104 6.00038 3.06581 6 3ZM5.5 3.5C5.59889 3.5 5.69556 3.47068 5.77779 3.41574C5.86001 3.3608 5.9241 3.28271 5.96194 3.19134C5.99978 3.09998 6.00969 2.99945 5.99039 2.90246C5.9711 2.80547 5.92348 2.71637 5.85355 2.64645C5.78363 2.57652 5.69454 2.5289 5.59755 2.50961C5.50055 2.49032 5.40002 2.50022 5.30866 2.53806C5.2173 2.57591 5.13921 2.63999 5.08427 2.72222C5.02932 2.80444 5 2.90111 5 3C5 3.13261 5.05268 3.25979 5.14645 3.35356C5.24021 3.44732 5.36739 3.5 5.5 3.5ZM0.500002 5C0.500002 4.01109 0.793248 3.0444 1.34265 2.22215C1.89206 1.39991 2.67295 0.759043 3.58658 0.380605C4.50021 0.00216718 5.50555 -0.0968499 6.47545 0.0960766C7.44536 0.289002 8.33627 0.765207 9.03553 1.46447C9.7348 2.16373 10.211 3.05465 10.4039 4.02455C10.5969 4.99446 10.4978 5.99979 10.1194 6.91342C9.74096 7.82705 9.1001 8.60794 8.27785 9.15735C7.4556 9.70675 6.48891 10 5.5 10C4.84339 10 4.19321 9.87067 3.58658 9.6194C2.97996 9.36812 2.42876 8.99983 1.96447 8.53553C1.50017 8.07124 1.13188 7.52005 0.880604 6.91342C0.62933 6.30679 0.500002 5.65661 0.500002 5ZM1.5 5C1.5 5.79113 1.7346 6.56448 2.17412 7.22228C2.61365 7.88008 3.23836 8.39277 3.96927 8.69552C4.70017 8.99827 5.50444 9.07748 6.28036 8.92314C7.05628 8.7688 7.76902 8.38784 8.32843 7.82843C8.88784 7.26902 9.2688 6.55629 9.42314 5.78036C9.57748 5.00444 9.49827 4.20017 9.19552 3.46927C8.89277 2.73836 8.38008 2.11365 7.72228 1.67412C7.06448 1.2346 6.29113 1 5.5 1C4.43913 1 3.42172 1.42143 2.67157 2.17157C1.92143 2.92172 1.5 3.93914 1.5 5Z" fill="#1B7CE5" />
                                                                    </svg>

                                                                    <div className="howto-mk">How to make a document photo?</div>
                                                                </div>
                                                                <div className="inner-fnt margin-top">
                                                                    <div className="fntimg">
                                                                        <img src={croppedImage ? croppedImage : fnt} alt="fnt" />
                                                                    </div>


                                                                    {/* <>
                                                                        <video ref={videoRef} autoPlay style={{ width: "100%", height: "auto" }} />
                                                                        <canvas ref={canvasRef} style={{ display: "none" }} />
                                                                    </> */}



                                                                    {/* <div className="tkbtn">
                                                                                    <Button onClick={startCamera}>
                                                                                        Take a photo
                                                                                    </Button>
                                                                                </div> */}

                                                                               

                                                                    <div className="uplbtn">
                                                                        {!croppedImage && <Button

                                                                            component="label"
                                                                            role={undefined}
                                                                            variant="contained"
                                                                            tabIndex={-1}
                                                                        >
                                                                            Upload
                                                                            <VisuallyHiddenInput type="file" onChange={(e) => { handleImageUpload_front(e) }} />
                                                                        </Button>}
                                                                        {croppedImage && <Button
                                                                        
                                                                        component="label"
                                                                        role={undefined}
                                                                        variant="contained"
                                                                        tabIndex={-1}
                                                                        onClick={(e)=>{handleReUpload()}}>
                                                                            Cancel

                                                                            {/* <VisuallyHiddenInput type="file" onChange={(e) => { handleImageUpload_front(e) }} /> */}

                                                                            </Button>}
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>}
                                                        {/* <div className="display-1 margin-top cursor" style={{ width: '300px', justifyContent: 'center' }}>
                                                            <div className="load">
                                                                <img src={load} alt="load" />
                                                            </div>
                                                            <div className="verify">
                                                                Uploading
                                                            </div>
                                                        </div> */}

                                                        {/* <div className='invalid-error'>{verifyIdentityErr?.img1 != '' ? <p style={{ textAlign: "left" }}>{verifyIdentityErr?.img1}</p> : ''}</div> */}
                
                                                        <Button
                                                            // disabled={index === 0}
                                                            onClick={(() => {
                                                                handleReset2()
                                                            })}
                                                            sx={{ mt: 1, color: '#fff' }}
                                                            variant='contained'
                                                        >
                                                            Back
                                                        </Button>
                                                    </Grid>

                                                    {
                                                        verifyIdentity?.docType?.subname == "Both sides" &&
                                                        <Grid xs={12} sm={12} md={12} lg={6} xl={6}>

                                                            <h3 className="Head-Kyb ">
                                                                Upload Back side
                                                            </h3>
                                                            <div className="margin-top">
                                                                <div className="frnt-sid">
                                                                    <div className="display-1" style={{ justifyContent: 'center' }}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
                                                                            <path d="M5 7L5 4.5C5 4.36739 5.05268 4.24022 5.14645 4.14645C5.24021 4.05268 5.36739 4 5.5 4C5.63261 4 5.75978 4.05268 5.85355 4.14645C5.94732 4.24022 6 4.36739 6 4.5L6 7C6 7.13261 5.94732 7.25979 5.85355 7.35355C5.75978 7.44732 5.63261 7.5 5.5 7.5C5.36739 7.5 5.24021 7.44732 5.14645 7.35355C5.05268 7.25979 5 7.13261 5 7ZM5.855 3.355C5.80828 3.40134 5.75287 3.43801 5.69195 3.46289C5.63103 3.48777 5.5658 3.50038 5.5 3.5C5.5658 3.50038 5.63103 3.48777 5.69195 3.46289C5.75287 3.43801 5.80828 3.40134 5.855 3.355ZM6 3C6.00038 3.06581 5.98777 3.13104 5.96289 3.19196C5.938 3.25287 5.90134 3.30828 5.855 3.355C5.90134 3.30828 5.938 3.25287 5.96289 3.19196C5.98777 3.13104 6.00038 3.06581 6 3ZM5.5 3.5C5.59889 3.5 5.69556 3.47068 5.77779 3.41574C5.86001 3.3608 5.9241 3.28271 5.96194 3.19134C5.99978 3.09998 6.00969 2.99945 5.99039 2.90246C5.9711 2.80547 5.92348 2.71637 5.85355 2.64645C5.78363 2.57652 5.69454 2.5289 5.59755 2.50961C5.50055 2.49032 5.40002 2.50022 5.30866 2.53806C5.2173 2.57591 5.13921 2.63999 5.08427 2.72222C5.02932 2.80444 5 2.90111 5 3C5 3.13261 5.05268 3.25979 5.14645 3.35356C5.24021 3.44732 5.36739 3.5 5.5 3.5ZM0.500002 5C0.500002 4.01109 0.793248 3.0444 1.34265 2.22215C1.89206 1.39991 2.67295 0.759043 3.58658 0.380605C4.50021 0.00216718 5.50555 -0.0968499 6.47545 0.0960766C7.44536 0.289002 8.33627 0.765207 9.03553 1.46447C9.7348 2.16373 10.211 3.05465 10.4039 4.02455C10.5969 4.99446 10.4978 5.99979 10.1194 6.91342C9.74096 7.82705 9.1001 8.60794 8.27785 9.15735C7.4556 9.70675 6.48891 10 5.5 10C4.84339 10 4.19321 9.87067 3.58658 9.6194C2.97996 9.36812 2.42876 8.99983 1.96447 8.53553C1.50017 8.07124 1.13188 7.52005 0.880604 6.91342C0.62933 6.30679 0.500002 5.65661 0.500002 5ZM1.5 5C1.5 5.79113 1.7346 6.56448 2.17412 7.22228C2.61365 7.88008 3.23836 8.39277 3.96927 8.69552C4.70017 8.99827 5.50444 9.07748 6.28036 8.92314C7.05628 8.7688 7.76902 8.38784 8.32843 7.82843C8.88784 7.26902 9.2688 6.55629 9.42314 5.78036C9.57748 5.00444 9.49827 4.20017 9.19552 3.46927C8.89277 2.73836 8.38008 2.11365 7.72228 1.67412C7.06448 1.2346 6.29113 1 5.5 1C4.43913 1 3.42172 1.42143 2.67157 2.17157C1.92143 2.92172 1.5 3.93914 1.5 5Z" fill="#1B7CE5" />
                                                                        </svg>

                                                                        <div className="howto-mk">How to make a document photo?</div>
                                                                    </div>
                                                                    <div className="inner-fnt margin-top">
                                                                        <div className="fntimg">
                                                                            <img src={croppedImage_bck ? croppedImage_bck : bnk} alt="fnt" />
                                                                        </div>
                                                                        {/* <div className="tkbtn">
                                                                                        <Button>
                                                                                            Take a photo
                                                                                        </Button>
                                                                                    </div> */}
                                                                        <div className="uplbtn">
                                                                           {!croppedImage_bck && <Button
                                                                                component="label"
                                                                                role={undefined}
                                                                                variant="contained"
                                                                                tabIndex={-1}
                                                                            >
                                                                                Upload
                                                                                <VisuallyHiddenInput type="file" onChange={(e) => { handleImageUpload_back(e) }} />
                                                                            </Button>}
                                                                            {croppedImage_bck && <Button
                                                                        
                                                                        component="label"
                                                                        role={undefined}
                                                                        variant="contained"
                                                                        tabIndex={-1}
                                                                        onClick={(e)=>{handleReUpload2()}}>
                                                                            Cancel


                                                                            </Button>}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <div className="display-1 margin-top cursor" style={{ width: '300px', justifyContent: 'center' }}>
                                                                <div className="load">
                                                                    <img src={load} alt="load" />
                                                                </div>
                                                                <div className="verify">
                                                                    Uploading
                                                                </div>
                                                            </div> */}

                                                            {/* <div className='invalid-error'>{verifyIdentityErr?.img2 != '' ? <p style={{ textAlign: "left" }}>{verifyIdentityErr?.img2}</p> : ''}</div> */}
                                                        </Grid>
                                                    }
                                                    <Grid xs={12} sm={12} md={12} lg={6} xl={6}>
                                                        <div className='kyb-txtnew mt-20' >
                                                            {/* <div className='display-1 kyx-inptxt'>ID Number</div> */}
                                                            <TextField id="outlined-basic" label="ID Number" variant="outlined" type="text" sx={{ width: "100% !important" }}
                                                                value={verifyIdentity?.idnumber}
                                                                onChange={(e) => {
                                                                    setVerifyIdentity({ ...verifyIdentity, idnumber: e.target.value })
                                                                    setVerifyIdentityErr({ ...verifyIdentityErr, idnumber: '' })
                                                                }}
                                                                onKeyDown={handleKeyDown}
                                                            />

                                                            {/* <div className='invalid-error'>{verifyIdentityErr?.idnumber != '' ? <p style={{ textAlign: "left" }}>{verifyIdentityErr?.idnumber}</p> : ""}</div> */}
                                                        </div>
                                                    </Grid>


                                                </Grid>}

                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                            <h3 className="Head-Kyb ">
                                                Liveness Selfie
                                            </h3>
                                            <ul style={{ marginLeft: '18px' }}>
                                                <li className='live-li'>
                                                    Ensure good lighting and follow instructions
                                                    closely
                                                </li>
                                                <li className='live-li'>
                                                    Position your head within the frame
                                                </li>
                                                <li className='live-li'>
                                                    Gently turn your head to either sides as per
                                                    commands
                                                </li>
                                            </ul>
                                        </Grid>
                                        <Button
                                            variant="contained"
                                            // onClick={activeStep === steps.length - 1 ? handleReset : handleNext}
                                            // disabled={uploadSts}
                                            onClick={handleNextStep}
                                            sx={{ mt: 1, ml: 'auto' }}
                                        >
                                            Submit
                                        </Button>

                                    </Grid>

                                </div>
                            </Grid> : <>
                                <div style={{ width: '100%' }} className='kycstat'>
                                    {/* <div>KYC Status:  {kycStatus}</div>
                                {kycStatus != "Verified" && <Button onClick={() => { setAlreadyKyc("") }}  >Re Verify</Button>} */}

                                    <Grid container className='margin-top' justifyContent={'center'}>

                                        <Grid item xs={12} sm={12} md={12} lg={6} xl={5} className='bxshade' style={{ padding: '25px' }}>
                                            <h1 className="add-deta margin-top display-3">
                                                KYC Status
                                            </h1>
                                            {kycStatus !== 'Verified' && < div className="reverify text-right">
                                                <Button variant='contained' onClick={() => { setAlreadyKyc("") }} >
                                                    Re-Verify
                                                </Button>
                                            </div>}
                                            <div className="add-deta margin-top display-1">
                                                Personal details
                                                <Chip
                                                    avatar={kycStatus === 'Verified' ? <img width="35" height="35" src="https://img.icons8.com/fluency/35/instagram-check-mark.png" alt="instagram-check-mark" /> :
                                                        <img width="35" height="35" src="https://img.icons8.com/plasticine/50/clock--v1.png" alt="clock--v1" />
                                                    }
                                                    label={kycStatus === 'Verified' ? "Verified" : kycStatus}
                                                    variant="outlined"
                                                />
                                            </div>
                                            <div className="display-1" style={{ gap: !matches ? 0 : '35px', flexDirection: !matches && 'column' }}>
                                                <div className='kyx-inp margin-top'>
                                                    <div className='display-1 kyx-inptxt'>Name</div>
                                                    <TextField placeholder='Enter full name' value={alreadyKyc?.Firstname} style={{ width: '280px' }}
                                                    // value={profileData?.name}
                                                    />
                                                </div>
                                                <div className='kyx-inp margin-top'>
                                                    <div className='display-1 kyx-inptxt'>Sur Name</div>
                                                    <TextField placeholder='Enter full name' value={alreadyKyc?.Lastname} style={{ width: '280px' }}
                                                    // value={profileData?.name}
                                                    />
                                                </div>

                                            </div>
                                            <div className="display-1" style={{ gap: !matches ? 0 : '35px', flexDirection: !matches && 'column' }}>
                                                <div className='kyx-inp margin-top'>
                                                    <div className='display-1 kyx-inptxt'>Email</div>
                                                    <TextField placeholder='Email' value={alreadyKyc?.email} style={{ width: '280px' }}
                                                    />
                                                </div>
                                                <div className='kyx-inp margin-top'>
                                                    <div className='display-1 kyx-inptxt'>DOB</div>
                                                    <TextField placeholder='Email' value={alreadyKyc?.dob} style={{ width: '280px' }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="display-1" style={{ gap: !matches ? 0 : '35px', flexDirection: !matches && 'column' }}>
                                                <div className='kyx-inp margin-top'>
                                                    <div className='display-1 kyx-inptxt'>Source of Income</div>
                                                    <TextField placeholder='Email' value={alreadyKyc?.soi} style={{ width: '280px' }}
                                                    />
                                                </div>
                                                <div className='kyx-inp margin-top'>
                                                    <div className='display-1 kyx-inptxt'>Employment Type</div>
                                                    <TextField placeholder='Email' value={alreadyKyc?.empyType} style={{ width: '280px' }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="display-1" style={{ gap: !matches ? 0 : '35px', flexDirection: !matches && 'column' }}>
                                                <div className='kyx-inp margin-top'>
                                                    <div className='display-1 kyx-inptxt'>Phone</div>
                                                    <TextField placeholder='Email' value={alreadyKyc?.phone} style={{ width: '280px' }}
                                                    />
                                                </div>
                                                <div className='kyx-inp margin-top'>
                                                    <div className='display-1 kyx-inptxt'>Gender</div>
                                                    <TextField placeholder='Email' value={alreadyKyc?.gender} style={{ width: '280px' }}
                                                    />
                                                </div>
                                            </div>


                                            <div className="add-deta margin-top">
                                                Address details
                                            </div>
                                            <div className="display-1" style={{ gap: !matches ? 0 : '35px', flexDirection: !matches && 'column' }}>
                                                <div className='kyx-inp margin-top'>
                                                    <div className='display-1 kyx-inptxt'>Line1</div>
                                                    <TextField placeholder='Email' value={alreadyKyc?.address_line1} style={{ width: '280px' }}
                                                    />
                                                </div>
                                                <div className='kyx-inp margin-top'>
                                                    <div className='display-1 kyx-inptxt'>Line2</div>
                                                    <TextField placeholder='Email' value={alreadyKyc?.address_line2} style={{ width: '280px' }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="display-1" style={{ gap: !matches ? 0 : '35px', flexDirection: !matches && 'column' }}>
                                                <div className='kyx-inp margin-top'>
                                                    <div className='display-1 kyx-inptxt'>City</div>
                                                    <TextField placeholder='Email' value={alreadyKyc?.city} style={{ width: '280px' }}
                                                    />
                                                </div>
                                                <div className='kyx-inp margin-top'>
                                                    <div className='display-1 kyx-inptxt'>State</div>
                                                    <TextField placeholder='Email' value={alreadyKyc?.stateOrProvince} style={{ width: '280px' }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="display-1" style={{ gap: !matches ? 0 : '35px', flexDirection: !matches && 'column' }}>
                                                <div className='kyx-inp margin-top'>
                                                    <div className='display-1 kyx-inptxt'>Country</div>
                                                    <TextField placeholder='Email' value={alreadyKyc?.Country} style={{ width: '280px' }}
                                                    />
                                                </div>
                                                <div className='kyx-inp margin-top'>
                                                    <div className='display-1 kyx-inptxt'>Zip/Postal Code</div>
                                                    <TextField placeholder='Email' value={alreadyKyc?.postalcode} style={{ width: '280px' }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="display-1" style={{ gap: !matches ? 0 : '35px', flexDirection: !matches && 'column' }}>
                                                <div className='kyx-inp margin-top'>
                                                    <div className='display-1 kyx-inptxt'>Address Proof Type</div>
                                                    <TextField placeholder='Email' value={alreadyKyc?.address_proof_type} style={{ width: '280px' }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="" style={{ gap: !matches ? 0 : '35px', flexDirection: !matches && 'column' }}>
                                                {
                                                    alreadyKyc?.address_proof &&
                                                    <div className='kyx-inp margin-top'>
                                                        <div className=' kyx-inptxt'>Address Proof</div>
                                                        <div className="upd-img margin-top">
                                                            {/* <img src={alreadyKyc?.address_proof} alt="updImg" /> */}
                                                            <PDFViewer pdfUrl={alreadyKyc?.address_proof} />
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                            <div className="add-deta margin-top">
                                                Identity details
                                            </div>
                                            <div className="display-1" style={{ gap: !matches ? 0 : '35px', flexDirection: !matches && 'column' }}>
                                                <div className='kyx-inp margin-top'>
                                                    <div className='display-1 kyx-inptxt'>ID Country</div>
                                                    <TextField placeholder='Email' value={alreadyKyc?.ID_country} style={{ width: '280px' }}
                                                    />
                                                </div>
                                                <div className='kyx-inp margin-top'>
                                                    <div className='display-1 kyx-inptxt'>ID Type</div>
                                                    <TextField placeholder='Email' value={alreadyKyc?.ID_type} style={{ width: '280px' }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="display-1" style={{ gap: !matches ? 0 : '35px', flexDirection: !matches && 'column' }}>
                                                <div className='kyx-inp margin-top'>
                                                    <div className='display-1 kyx-inptxt'>ID Number</div>
                                                    <TextField placeholder='Email' value={alreadyKyc?.ID_Number} style={{ width: '280px' }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="display-1" style={{ gap: !matches ? 0 : '35px', flexDirection: !matches && 'column' }}>
                                                {
                                                    alreadyKyc?.ID_Image_front &&
                                                    <div className='kyx-inp margin-top'>
                                                        <div className='display-1 kyx-inptxt'>Front Side</div>
                                                        <div className="upd-img margin-top">
                                                            <img src={alreadyKyc?.ID_Image_front} alt="updImg" />
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    alreadyKyc?.ID_Image_Back &&
                                                    <div className='kyx-inp margin-top'>
                                                        <div className='display-1 kyx-inptxt'>Back Side</div>
                                                        <div className="upd-img margin-top">
                                                            <img src={alreadyKyc?.ID_Image_Back} alt="updImg" />
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                            <div className="display-1" style={{ gap: !matches ? 0 : '35px', flexDirection: !matches && 'column' }}>
                                                {
                                                    alreadyKyc?.faceImage &&
                                                    <div className='kyx-inp margin-top'>
                                                        <div className='display-1 kyx-inptxt'>Liveness Image</div>
                                                        <div className="upd-img margin-top">
                                                            <img src={'data:image/jpeg;base64,' + alreadyKyc?.faceImage} alt="updImg" />
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                            <div className="add-deta margin-top">
                                                Verification details
                                            </div>

                                            <div className="display-1" style={{ gap: !matches ? 0 : '35px', flexDirection: !matches && 'column' }}>
                                                <div className='kyx-inp margin-top'>
                                                    <div className='display-1 kyx-inptxt'>Name Check</div>
                                                    <div className='upd-img margin-top' >{alreadyKyc?.Name_Check == true ? <CheckCircleOutlineIcon style={{ color: "green" }} /> : <CancelOutlinedIcon style={{ color: "red" }} />}</div>
                                                </div>
                                                <div className='kyx-inp margin-top'>
                                                    <div className='display-1 kyx-inptxt'>ID Check</div>
                                                    <div className='upd-img margin-top'>{alreadyKyc?.Id_verify == true ? <CheckCircleOutlineIcon style={{ color: "green" }} /> : <CancelOutlinedIcon style={{ color: "red" }} />}</div>
                                                </div>


                                            </div>
                                            <div className="display-1" style={{ gap: !matches ? 0 : '35px', flexDirection: !matches && 'column' }}>
                                                <div className='kyx-inp margin-top'>
                                                    <div className='display-1 kyx-inptxt'>Liveness Check</div>
                                                    <div className='upd-img margin-top'>{alreadyKyc?.Liveness_verify == true ? <CheckCircleOutlineIcon style={{ color: "green" }} /> : <CancelOutlinedIcon style={{ color: "red" }} />}</div>
                                                </div>

                                                <div className='kyx-inp margin-top'>
                                                    <div className='display-1 kyx-inptxt'>Liveness Photo Match With ID</div>
                                                    <div className='upd-img margin-top'>{alreadyKyc?.Liveness_verify == true ? <CheckCircleOutlineIcon style={{ color: "green" }} /> : <CancelOutlinedIcon style={{ color: "red" }} />}</div>
                                                </div>
                                            </div>

                                            <div className="display-1" style={{ gap: !matches ? 0 : '35px', flexDirection: !matches && 'column' }}>
                                                <div className='kyx-inp margin-top'>
                                                    <div className='display-1 kyx-inptxt'>Address Check</div>
                                                    <div className='upd-img margin-top'>{alreadyKyc?.Address_verify == true ? <CheckCircleOutlineIcon style={{ color: "green" }} /> : <CancelOutlinedIcon style={{ color: "red" }} />}</div>
                                                </div>

                                                <div className='kyx-inp margin-top'>
                                                    <div className='display-1 kyx-inptxt'>AML Check</div>
                                                    <div className='upd-img margin-top'>{alreadyKyc?.AmlCheck == true ? <CheckCircleOutlineIcon style={{ color: "green" }} /> : <CancelOutlinedIcon style={{ color: "red" }} />}</div>
                                                </div>
                                            </div>

                                            {
                                                alreadyKyc?.ID_type == "NationalId" &&
                                                <>
                                                    {
                                                        alreadyKyc?.results?.verification_Result?.sources?.length > 0 && alreadyKyc?.results?.verification_Result?.sources?.map((item, index) => {
                                                            return (
                                                                < div className="display-1" style={{ gap: !matches ? 0 : '35px', flexDirection: !matches && 'column' }} key={index}>
                                                                    <div className='kyx-inp margin-top'>
                                                                        <div className='display-1 kyx-inptxt'>{item?.name}</div>
                                                                        <div className='upd-img margin-top'>{alreadyKyc?.results?.verification_Result?.results?.length > 0 && alreadyKyc?.results?.verification_Result?.results[0]?.matchCount == 0 ? <CheckCircleOutlineIcon style={{ color: "green" }} /> : <CancelOutlinedIcon style={{ color: "red" }} />}</div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }

                                                </>
                                            }
                                        </Grid>
                                    </Grid>
                                </div>
                            </>
                    }
        <Crop open={open} handleOpen={handleOpen} handleClose={handleClose} imageUrl={image} handleCroppedImage={handleCroppedImage} />
                </Grid>
            }
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
            {
                loading == true &&
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
            }
        </div >
    )
    
}

export default Kycnew
