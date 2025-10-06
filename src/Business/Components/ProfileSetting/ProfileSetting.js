import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Button, Box, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./ProfileSetting.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useTheme } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import useMediaQuery from "@mui/material/useMediaQuery";
import Sidebar from "../SideBar/Sidebar";
import countryFlag from "../../../Images/country.svg";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Link } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import EditSharpIcon from '@mui/icons-material/EditSharp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import Axios from "../../../Axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import CloseIcon from '@mui/icons-material/Close';
import Switch from '@mui/material/Switch';
import { decryptData } from '../../../middleware';
import { idea } from "react-syntax-highlighter/dist/esm/styles/hljs";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  "@media (max-width: 991.98px)": {
    width: "70%",
  },
  "@media (max-width: 575.98px)": {
    width: "85%",
  },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};
const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  "@media (max-width: 991.98px)": {
    width: "70%",
  },
  "@media (max-width: 575.98px)": {
    width: "85%",
  },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};

// function createData(name, calories, fat) {
//   return { name, calories, fat };
// }

// const rows = [createData("Frozen yoghurt", 159, 6.0), createData("Frozen yoghurt", 159, 6.0)];

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
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

// tab
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProfileSetting() {
  // responsive
  const navigate = useNavigate();
  const theme = useTheme();
  const mdScreen = useMediaQuery(theme.breakpoints.up("md"));
  const MobileScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [PlanStatus, setPlanStatus] = useState(false)

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [open3, setOpen3] = useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

  const [open4, setOpen4] = useState(false);
  const handleOpen4 = () => { setOpen4(true); }
  const handleClose4 = () => setOpen4(false);

  const [open5, setOpen5] = useState(false);
  const handleOpen5 = () => { setOpen5(true); }
  const handleClose5 = () => setOpen5(false);
  const [checked, setChecked] = useState(false);


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
    city
  ) {
    return {
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
    };
  }

  const List = [
    createdData(
      "Aug 6, 2024,",
      "4:19 PM",
      "(GMT+5:30)",
      "Aug 7, 2024",
      "9:32 AM",
      "(GMT+5:30)",
      "dashboard",
      "49.37.202.209",
      "Win10",
      "Chrome",
      "Type: Desktop",
      "Maker: Unknown",
      "Model: Windows Desktop",
      countryFlag,
      "India",
      "Chennai"
    ),
    createdData(
      "Aug 6, 2024,",
      "4:19 PM",
      "(GMT+5:30)",
      "Aug 7, 2024",
      "9:32 AM",
      "(GMT+5:30)",
      "dashboard",
      "49.37.202.209",
      "Win10",
      "Chrome",
      "Type: Desktop",
      "Maker: Unknown",
      "Model: Windows Desktop",
      countryFlag,
      "India",
      "Chennai"
    ),
    createdData(
      "Aug 6, 2024,",
      "4:19 PM",
      "(GMT+5:30)",
      "Aug 7, 2024",
      "9:32 AM",
      "(GMT+5:30)",
      "dashboard",
      "49.37.202.209",
      "Win10",
      "Chrome",
      "Type: Desktop",
      "Maker: Unknown",
      "Model: Windows Desktop",
      countryFlag,
      "India",
      "Chennai"
    ),
    createdData(
      "Aug 6, 2024,",
      "4:19 PM",
      "(GMT+5:30)",
      "Aug 7, 2024",
      "9:32 AM",
      "(GMT+5:30)",
      "dashboard",
      "49.37.202.209",
      "Win10",
      "Chrome",
      "Type: Desktop",
      "Maker: Unknown",
      "Model: Windows Desktop",
      countryFlag,
      "India",
      "Chennai"
    ),
  ];

  // tab

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // selector 2 data

  const [Language, setLanguage] = React.useState("");
  const [kybstatus, setKybstatus] = useState(false);
  const [kybtoast, setKybtoast] = useState("")
  const handleSelectLanguage = (event) => {
    setLanguage(event.target.value);
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  // const [openEditApi, setOpenEditApi] = useState(false);
  const [apikeyName, setApiKeyName] = useState("")
  const [password, setPassword] = useState("")
  const [apiNo, setApiNo] = useState(0)

  const [selectedMonthType, setSelectedMonthType] = useState("")
  const [apikeyNameErr, setApiKeyNameErr] = useState("")
  const [apikeyNumErr, setApiKeyNumErr] = useState("")
  const [passwordErr, setPasswordErr] = useState("")
  const [apikeyStatus, setApiKeyStatus] = useState(false)

  const CreateApiKey = async () => {
    try {
      if (apikeyName == "") {
        setApiKeyNameErr("Name is required")
      } else if (password == "") {
        setPasswordErr("Password is required")
      } else if (Number(apiNo) <= 0) {
        setApiKeyNumErr("No Of IP is required")
      } else {
        setApiKeyStatus(true)
        const { data } = await Axios.post('/createkey', { name: apikeyName, password: password, month_type: selectedMonthType, }, {
          headers: {
            Authorization: window.localStorage.getItem('Rikosta')
          }
        })
        if (data?.success == true) {
          toast.success("Api Key Created Successfully")
          handleClose5()
          GetApiKeyList()
          setShowPassword(false)
        } else {
          toast.error(data?.message)
        }
        setApiKeyStatus(false)
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
      console.log("🚀 ~ CreateApiKey ~ error:", error)
      setApiKeyStatus(false)
      if (error?.status == 409) {
        setPasswordErr(error?.response?.data?.message)
      }
    }
  }

  const [rows, setRows] = useState([])

  const GetApiKeyList = async () => {
    try {
      const { data } = await Axios.get('/getkey', {
        headers: {
          Authorization: window.localStorage.getItem('Rikosta')
        }
      })
      if (data?.success == true && data?.result?.length > 0) {
        setRows(data?.result)
      } else {
        setRows([])
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
      console.log("🚀 ~ GetApiKeyList ~ error:", error)
    }
  }

  const [openEditApi, setOpenEditApi] = useState(false);
  const [name, setName] = useState("");
  const [ips, setIps] = useState([]);
  const [currentName, setCurrentName] = useState("");
  const [currentIps, setCurrentIps] = useState([]);
  const [id, setId] = useState("");


  const fetchApiDetails = async (id) => {
    try {
      const response = await Axios.get(`/getkey`, { id: id },
        {
          headers: {
            Authorization: window.localStorage.getItem('Rikosta')
          }
        }
      );
      if (response.data.success) {
        const { APINAME, ips } = response.data.result;
        setCurrentName(APINAME);
        setCurrentIps(ips);
      } else {
        toast.error(response.data.message || "Failed to fetch API details.");
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
      console.log("🚀 ~ GetApiKeyList ~ error:", error)
    }
  };

  const [apiEditKey, setApiEditKey] = useState({})
  const [apiEditIps, setApiEditIps] = useState([])


  const UpdateApiKey = async (row) => {
    console.log(row, "row");
    setApiEditKey(row)
    setName(row?.APINAME)

    setApiEditIps(row?.ips)
    setOpenEditApi(true)
    setId(id)
    fetchApiDetails(id)
  }

  const handleEdit = async (id) => {
    const updatedName = name.trim() ? name : currentName;
    // const updatedIps = apiEditIps ? apiEditIps.map((ip) => ip) : currentIps;

    const payload = {
      id,
      APINAME: updatedName,
      ips: apiEditIps,
    };

    try {
      const response = await Axios.post("/editkey", payload,
        {
          headers: {
            Authorization: window.localStorage.getItem('Rikosta')
          }
        }
      );
      if (response.data.success) {
        toast.success(response.data.message || "API updated successfully.");
        GetApiKeyList();
        setOpenEditApi(false);
        setName('')
        setIps('')
      } else {
        toast.error(response.data.message || "Failed to update API.");
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
      console.log("🚀 ~ GetApiKeyList ~ error:", error)
    }
  };

  const DeleteApiKey = async (id) => {
    try {
      const { data } = await Axios.post('/deletekey', { id: id }, {
        headers: {
          Authorization: window.localStorage.getItem('Rikosta')
        }
      })
      if (data?.success == true) {
        toast.success("Api Key deleted Successfully")
        GetApiKeyList()
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
      console.log("🚀 ~ DeleteApiKey ~ error:", error)
    }
  }

  useEffect(() => {
    GetApiKeyList()
  }, [])

  const [selectedIndex, setSelectedIndex] = useState(null)

  const checkkyb = async () => {
    try {
      const { data } = await Axios.get('/checkkyb', {
        headers: {
          Authorization: window.localStorage.getItem('Rikosta')
        }
      })
      // console.log(data.success,"vijay");
      if (data?.success === "false") {
        setKybtoast("Please Complete Your KYB")
        setKybstatus(false)
      } else {
        if (data?.result?.Verify === "Pending") {
          setKybtoast("Please Wait Until Your KYB Approval")
          setKybstatus(false)
        } else {
          setKybstatus(true)
        }
      }

    } catch (error) {


    }
  }
  useEffect(() => {
    checkkyb()
  }, [])

  const checkExpiry = async () => {
    try {
      checkkyb()
      const { data } = await Axios.get('/paymentcheck', {
        headers: {
          Authorization: window.localStorage.getItem('Rikosta')
        }
      })
      if (data?.success) {
        if (kybstatus === false) {
          // navigate("/kyb");
          setTimeout(() => {
            toast.error(kybtoast);
          }, 1000);
        } else {
          handleOpen5();
        }
      } else {
        setPlanStatus(false)
        navigate("/pricing");
        setTimeout(() => {
          toast.error("Please Subscribe Plans");
        }, 1000);
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
    }

  };

  const checkPlanStatus = async () => {
    try {
      const { data } = await Axios.get('/paymentcheck', {
        headers: {
          Authorization: window.localStorage.getItem('Rikosta')
        }
      })
      if (data?.success) {
        if (kybstatus === false) {
        } else {
          setPlanStatus(true)
        }
      } else {
        setPlanStatus(false)
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
    }

  };

  const [oldPass, setOldPass] = useState("")
  const [newPass, setNewPass] = useState("")
  const [confPass, setConfPass] = useState("")

  const [oldPassErr, setOldPassErr] = useState("")
  const [newPassErr, setNewPassErr] = useState("")
  const [confPassErr, setConfPassErr] = useState("")

  const [passStatus, setPassStatus] = useState(false)

  const changePassword = async () => {
    try {
      if (oldPass == "") {
        setOldPassErr("Old Password is required")
      } else if (newPass == "") {
        setNewPassErr("New Password is required")
      } else if (confPass == "") {
        setConfPassErr("Confirm Password is required")
      } else if (newPass != confPass) {
        setConfPassErr("Confirm Password is not matched")
      } else {
        setPassStatus(true)
      }
    } catch (error) {
      setPassStatus(false)
      console.log("🚀 ~ changePassword ~ error:", error)
    }
  }


  //2fa

  const [isDisabled, setIsDisabled] = useState(false);

  const handleDisableButton = async () => {
    const test = await generate2FA()
    if (test == true) {
      handleOpen2fa()
    }
  };

  const get2faStatus = async () => {
    try {
      const { data } = await Axios.get('/checkTwoFactorAuth', {
        headers: {
          Authorization: window.localStorage.getItem('Rikosta')
        }
      })
      setIsDisabled(data?.success)
      setUserProfile(data?.result)
    } catch (error) {
      console.log("🚀 ~ get2faStatus ~ error:", error)
    }
  }



  const [open2fa, setOpen2fa] = useState(false);
  const handleOpen2fa = () => setOpen2fa(true);
  const handleClose2fa = () => setOpen2fa(false);

  const [secret, setSecret] = useState(null)
  const [qrCode, setQrCode] = useState(null)

  const [generateLoading, setGenerateLoading] = useState(false)

  const [secret1, setSecret1] = useState()

  const [secret1Err, setSecret1Err] = useState("")

  const [userProfile, setUserProfile] = useState()
  const [verifyLoad, setVerifyLoad] = useState(false)
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(secret).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  };


  const verify2FA = async () => {
    try {
      if (secret1 == "") {
        setSecret1Err("Secret is required")
      } else {
        setVerifyLoad(true)
        const { data } = await Axios.post('/verifyTwoFactorAuth', { secret: secret1 }, {
          headers: {
            Authorization: window.localStorage.getItem('Rikosta')
          }
        })
        if (data?.success == true) {
          toast.success("2FA Activated Successfully")
          setSecret1("");
          setSecret1Err("");
          get2faStatus();
          handleClose2fa();
          setVerifyLoad(false)
        }
        else {
          toast.error(data?.message)
          setVerifyLoad(false)
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
      setVerifyLoad(false)
      console.log("🚀 ~ verify2FA ~ error:", error)
    }
  }

  const generate2FA = async () => {
    try {
      setGenerateLoading(true)
      const { data } = await Axios.post('/generate2fa', {}, {
        headers: {
          Authorization: window.localStorage.getItem('Rikosta')
        }
      })
      if (data?.success == true) {
        setSecret(data?.result?.secret)
        setQrCode(data?.result?.otpauth_url)
        setGenerateLoading(false)
        return true
      }
      else {
        toast.error(data?.message)
        setGenerateLoading(false)
      }
    } catch (error) {
      setGenerateLoading(false)
      return false
      console.log("🚀 ~ generate2FA ~ error:", error)
    }
  }

  const disable2fa = async () => {
    try {
      setGenerateLoading(true)
      const { data } = await Axios.post('/disable2FA', {
        headers: {
          Authorization: window.localStorage.getItem('Rikosta')
        }
      })
      if (data?.success == true) {
        toast.success(data.message)
        setIsDisabled(false)
        setGenerateLoading(false)
        get2faStatus()
      }
      else {
        toast.error(data.message)
        setGenerateLoading(false)
      }
    } catch (error) {
      setGenerateLoading(false)
      console.log("🚀 ~ disable2fa ~ error:", error)
    }
  }

  const [sessionList, setSessionList] = useState()

  const getSessionList = async () => {
    try {
      const { data } = await Axios.get('/users/sessionList', {
        headers: {
          Authorization: window.localStorage.getItem('Rikosta')
        }
      })
      setSessionList(data?.result)
    } catch (error) {
      console.log("🚀 ~ getSessionList ~ error:", error)
    }
  }

  const [monitor, setMonitor] = useState()


  const getApiKeyMonitor = async () => {
    try {
      const response = await Axios.get('/apikeymerites', {
        headers: {
          apikey: window.localStorage.getItem('Rikosta')
        }
      });
      setMonitor(response.data.result)
      console.log("API Metrics Response:", response.data.result);
    } catch (error) {
      console.error("Error fetching API key metrics:", error);
    }
  };


  useEffect(() => {
    get2faStatus()
    getSessionList()
    getApiKeyMonitor()
  }, [])

  const editkey = async (row) => {
    try {
      console.log(row, "row");
      setChecked(true)
      // let datum = {id : row?.id , status : !row?.enable }
      let state = !row?.enable
      const payload = {
        id: row?._id,
        status: state
      }
      const { data } = await Axios.post('/editkey',
        payload,
        {
          headers: {
            Authorization: window.localStorage.getItem('Rikosta')
          }
        })
      if (data) {
        setChecked(false)
        GetApiKeyList()
        toast.success(data?.message)
      } else {
        setChecked(false)
        GetApiKeyList()
        toast.success("API Key Failed To Update")
      }
    } catch (error) {
      console.log("🚀 ~ getSessionList ~ error:", error)
    }
  }


  return (
    <div>
      <Toaster />
      <Box sx={{ display: mdScreen ? "flex" : "block" }}>
        <Sidebar />
        <Box
          component="main"
          className="clientList-body"
          sx={{ flexGrow: 1, p: 3, marginTop: "80px" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <div className="profile-tab-outer-div">
                <div>
                  <div className="import-popup profile-set-head display-2 ">
                    <h1>Profile settings</h1>
                    {/* <div className='profile-lang'>
                      <InputLabel id="demo-simple-select-label seperate" className='display-4'><div><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.7562 7.78337C12.7562 8.49156 12.6167 9.19281 12.3457 9.84709C12.0747 10.5014 11.6775 11.0959 11.1767 11.5966C10.6759 12.0974 10.0814 12.4946 9.42717 12.7656C8.77289 13.0366 8.07164 13.1761 7.36345 13.1761C6.65527 13.1761 5.95402 13.0366 5.29974 12.7656C4.64546 12.4946 4.05097 12.0974 3.5502 11.5966C3.04944 11.0959 2.65221 10.5014 2.3812 9.84709C2.11019 9.19281 1.9707 8.49156 1.9707 7.78337C1.9707 6.35313 2.53887 4.98146 3.5502 3.97012C4.56154 2.95879 5.93321 2.39062 7.36345 2.39062C8.7937 2.39062 10.1654 2.95879 11.1767 3.97012C12.188 4.98146 12.7562 6.35313 12.7562 7.78337ZM7.36345 12.0976C8.36658 11.0481 8.97129 9.68098 9.07295 8.23277H5.65395C5.75569 9.68096 6.36039 11.0481 7.36345 12.0976ZM8.5202 12.1272C9.40286 11.8916 10.1928 11.3927 10.785 10.697C11.3771 10.0013 11.7434 9.14175 11.8349 8.23277H9.97354C9.88698 9.64653 9.38099 11.0024 8.5202 12.1272ZM9.97354 7.33398H11.8349C11.7434 6.425 11.3771 5.56546 10.785 4.86976C10.1928 4.17405 9.40286 3.67518 8.5202 3.43951C9.38099 4.56435 9.88698 5.92022 9.97354 7.33398ZM9.07295 7.33398H5.65395C5.75561 5.88577 6.36032 4.51865 7.36345 3.46917C8.36658 4.51865 8.97129 5.88577 9.07295 7.33398ZM4.75336 8.23277C4.83987 9.64654 5.34587 11.0024 6.20671 12.1272C5.32404 11.8916 4.53407 11.3927 3.94193 10.697C3.34979 10.0013 2.98355 9.14175 2.89196 8.23277H4.75336ZM4.75336 7.33398C4.83987 5.92021 5.34587 4.56432 6.20671 3.43951C5.32404 3.67518 4.53407 4.17405 3.94193 4.86976C3.34979 5.56546 2.98355 6.425 2.89196 7.33398H4.75336Z" fill="#373D4D" />
                      </svg></div>Dashboard language</InputLabel>
                      <FormControl sx={{ m: 0, width: 160 }}>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          placeholder='Language'
                          className='select-item-list email-field'
                          value={Language}
                          onChange={handleSelectLanguage}
                        >
                          <MenuItem value={'En'}>English</MenuItem>
                          <MenuItem value={'Fn'}>French</MenuItem>
                        </Select>
                      </FormControl>
                    </div> */}
                  </div>
                </div>

                <Box
                  sx={{ width: "100%" }}
                  className="profile_tab"
                  style={{ display: "none" }}
                >
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      <Tab label="Profile" {...a11yProps(0)} />
                      <Tab label="Notifications" {...a11yProps(1)} />
                      <Tab label="Profile Image" {...a11yProps(2)} />
                    </Tabs>
                  </Box>
                  <CustomTabPanel value={value} index={0}>
                    <div className="profile-tab-update-outer display-2 flex-wrap">
                      <div className="profile-tab-update-inner">
                        <Typography variant="h6">Apz pay</Typography>
                        <div>
                          <Typography variant="p">
                            no-reply@apzex.com
                          </Typography>
                        </div>
                        <Button onClick={handleOpen2}>Change name</Button>
                      </div>
                      <div className="profile-tab-update-inner">
                        <Typography variant="h6">
                          Two-factor authentication
                        </Typography>
                        <div>
                          <Button onClick={handleDisableButton}>
                            {isDisabled ? "Enable" : "Disable"} Button
                          </Button>

                          <Button
                            disabled={isDisabled}
                            style={{ marginLeft: "10px" }}
                          >
                            I am {isDisabled ? "Disabled" : "Enabled"}
                          </Button>
                        </div>
                        {/* <Button>Change</Button> */}
                        <div></div>
                      </div>
                      <div className="profile-tab-update-inner">
                        <Typography variant="h6">Passworgfzsfd</Typography>
                        <Button onClick={handleOpen}>Change password</Button>
                        <div></div>
                      </div>
                    </div>
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={1}>
                    <div className="profile-tab-update-outer display-2 flex-wrap">
                      <div className="profile-tab-update-inner">
                        <Typography variant="h6">Apz pay</Typography>
                        <div>
                          <Typography variant="p">
                            no-reply@apzex.com
                          </Typography>
                        </div>
                        <Button>Change name</Button>
                      </div>
                      <div className="profile-tab-update-inner">
                        <Typography variant="h6">
                          Two-factor authentication
                        </Typography>
                        <Button>Change</Button>
                        <div></div>
                      </div>
                      <div className="profile-tab-update-inner">
                        <Typography variant="h6">Password</Typography>
                        <Button>Change password</Button>
                        <div></div>
                      </div>
                    </div>
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={2}>
                    <div className="profile-tab-update-outer display-2">
                      <div className="profile-tab-update-inner">
                        <Typography variant="h6">Apz pay</Typography>
                        <div>
                          <Typography variant="p">
                            no-reply@apzex.com
                          </Typography>
                        </div>
                        <Button>Change name</Button>
                      </div>
                      <div className="profile-tab-update-inner">
                        <Typography variant="h6">
                          Two-factor authentication
                        </Typography>
                        <Button>Change</Button>
                        <div></div>
                      </div>
                      <div className="profile-tab-update-inner">
                        <Typography variant="h6">Password</Typography>
                        <Button>Change password</Button>
                        <div></div>
                      </div>
                    </div>
                  </CustomTabPanel>
                </Box>

                <Box className="profile_tab">
                  <div className="profile-tab-update-outer display-2 flex-wrap">
                    <div className="profile-tab-update-inner display-1 add-edit">
                      <div>
                        <Typography variant="h6">{userProfile?.name ? userProfile?.name : "-"}</Typography>
                        <div>
                          <Typography variant="p">
                            {userProfile?.email ? userProfile?.email : "-"}
                          </Typography>
                        </div>
                        {/* <Button onClick={handleOpen2}>Change name</Button> */}
                      </div>
                      <div className="edit_btn">
                        <Link to="/editProfile">EDIT</Link>
                      </div>
                      {/* <CreateIcon /> */}
                    </div>
                    <div className="profile-tab-update-inner">
                      <Typography variant="h6">
                        Two-factor authentications
                      </Typography>
                      <div className="enable_btn">
                        {
                          generateLoading ?
                            <Button className="enabled-button">
                              Processing...
                            </Button> :
                            isDisabled == false ?
                              <Button
                                onClick={handleDisableButton}
                                className={
                                  "enabled-button"
                                }
                              >
                                Enable
                              </Button>
                              :
                              <Button className="disabled-button" onClick={() => { disable2fa() }}>
                                Disable
                              </Button>
                        }

                      </div>
                      {/* <Button>Change</Button> */}
                      <div></div>
                    </div>
                    {

                      usertype === 'organization' || subAdminDetails?.access?.kyb == true ?
                        <div className="profile-tab-update-inner">
                          <Typography variant="h6">KYB</Typography>
                          <Button onClick={() => { navigate('/kyb') }}>view</Button>
                          <div></div>
                        </div> : <></>
                    }
                    {
                      usertype === 'organization' || subAdminDetails?.access?.apikey_view == true ?
                        <div className="profile-tab-update-inner">
                          <Typography variant="h6">Api key</Typography>
                          <Button onClick={() => { handleOpen3(); checkPlanStatus() }}>View</Button>
                        </div> : <></>
                    }

                    {
                      usertype === 'organization' || subAdminDetails?.access?.apikey_view == true ?
                        <div className="profile-tab-update-inner">
                          <Typography variant="h6">Api key Monitoring</Typography>
                          <Button onClick={() => { handleOpen4(); checkPlanStatus() }}>View</Button>
                        </div> : <></>
                    }
                  </div>
                </Box>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <div className="item-list-table">
                <h2>Active Sessions</h2>
                <TableContainer>
                  <div
                    className="pagination-container"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      padding: "10px 0",
                    }}
                  >
                    <div className="pagination">
                      <TablePagination
                        rowsPerPageOptions={[10, 20, 40, 50]}
                        component="div"
                        count={sessionList?.length || 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </div>
                  </div>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left" className="table-bold-item">
                          Login
                        </TableCell>
                        <TableCell align="left" className="table-bold-item">
                          Logout
                        </TableCell>
                        <TableCell align="left" className="table-bold-item">
                          Source
                        </TableCell>
                        <TableCell align="left" className="table-bold-item">
                          Platform
                        </TableCell>
                        <TableCell align="left" className="table-bold-item">
                          OS
                        </TableCell>
                        <TableCell align="left" className="table-bold-item">
                          IP
                        </TableCell>
                        <TableCell>Country</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sessionList
                        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((List, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <div className="flex-line-gap">
                                <div className="table-bold-item f-500">{List?.login}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex-line-gap">
                                <div className="table-bold-item f-500">
                                  {List?.logout}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="table-bold-item f-500">
                              {List?.device}
                            </TableCell>
                            <TableCell>
                              <div className="flex-line-gap">
                                <div className="table-bold-item f-500">
                                  {List?.browser?.split("/")[0]}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="table-bold-item f-500">
                              {List?.os}
                            </TableCell>
                            <TableCell className="table-bold-item f-500">
                              {List?.ip}
                            </TableCell>
                            <TableCell>
                              <div className="country d-flex">
                                <div>
                                  <div className="flex-line-gap table-bold-item f-500">
                                    {List?.country}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>

            </Grid>
          </Grid>
        </Box>

        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>
              <div className="display-2">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <strong>Change passwords</strong>
                </Typography>
                <div onClick={handleClose} className="cursor">
                  <HighlightOffIcon />
                </div>
              </div>

              <div
                className="email-filed margin-top"
                style={{ width: "320px", margin: "20px auto" }}
              >
                <label className="display-1">Old Password </label>
                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Old Password"
                    onChange={(e) => { setOldPass(e.target.value); setOldPassErr("") }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  // label="Password"
                  />
                </FormControl>
                {oldPassErr && <div style={{ color: "red", textAlign: "center" }} >{oldPassErr}</div>}
              </div>
              <div
                className="email-filed margin-top"
                style={{ width: "320px", margin: "20px auto" }}
              >
                <label className="display-1">New Password </label>

                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter New Password"
                    onChange={(e) => { setNewPass(e.target.value); setNewPassErr("") }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  // label="Password"
                  />
                </FormControl>
                {newPassErr && <div style={{ color: "red", textAlign: "center" }} >{newPassErr}</div>}
              </div>
              <div
                className="email-filed margin-top"
                style={{ width: "320px", margin: "20px auto" }}
              >
                <label className="display-1">Confirm Password </label>

                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    onChange={(e) => { setConfPass(e.target.value); setConfPassErr("") }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  // label="Password"
                  />
                </FormControl>
                {confPassErr && <div style={{ color: "red", textAlign: "center" }} >{confPassErr}</div>}
              </div>
              <div className="exteddata text-center margin-top">
                <Button onClick={
                  () => {
                    changePassword();
                  }}>Change Password</Button>
              </div>
            </div>
          </Box>
        </Modal>
        <Modal
          open={open2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>
              <div className="display-2">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <strong>Change Name</strong>
                </Typography>
                <div onClick={handleClose2} className="cursor">
                  <HighlightOffIcon />
                </div>
              </div>

              <div
                className="email-filed margin-top"
                style={{ width: "320px", margin: "20px auto" }}
              >
                <label className="display-1">New Name </label>
                <TextField
                  id="outlined-basic"
                  placeholder="Enter New Name"
                  variant="outlined"
                  style={{ width: "100%" }}
                />
              </div>

              <div className="exteddata text-center margin-top">
                <Button onClick={handleClose2}>Change Nmae</Button>
              </div>
            </div>
          </Box>
        </Modal>

        <Modal
          open={open3}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style2}>
            <div>
              <div className="display-2">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <strong>Api Key</strong>
                </Typography>
                <div onClick={handleClose3} className="cursor">
                  <HighlightOffIcon />
                </div>
              </div>
              {
                usertype === 'organization' ?
                  <div className="create-modal text-end">
                    <Button  className="common-theme-btn" onClick={checkExpiry}>Create</Button>
                  </div> :
                  subAdminDetails?.access?.apikey_edit == true ?
                    PlanStatus &&
                    <div className="create-modal text-end">
                      <Button variant="contained" onClick={checkExpiry}>Create</Button>
                    </div> : <></>
              }
              <div className="apikey-table">
                <TableContainer className="api-table">
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Key</TableCell>
                        <TableCell align="center">Expires IN</TableCell>
                        <TableCell align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows?.length > 0 && rows?.map((row, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row?.APINAME}
                          </TableCell>
                          {
                            selectedIndex == index ?
                              <TableCell align="center">{row?.APIKey.slice(0, 25) + '...'}  <Tooltip title="copy" placement="right">
                                <ContentCopyIcon style={{ cursor: "pointer" }} onClick={() => {
                                  navigator.clipboard.writeText(row?.APIKey);
                                  // setcopy(true);
                                  // setTimeout(() => {
                                  //   setcopy(false)
                                  // }, 1000);
                                }} /></Tooltip> </TableCell>
                              :
                              <TableCell align="center" style={{ whiteSpace: "nowrap" }} >**********   <Tooltip title="copy" placement="right">
                                <ContentCopyIcon style={{ cursor: "pointer" }} onClick={() => {
                                  navigator.clipboard.writeText(row?.APIKey);
                                  // setcopy(true);
                                  // setTimeout(() => {
                                  //   setcopy(false)
                                  // }, 1000);
                                }} /></Tooltip></TableCell>
                          }
                          <TableCell component="th" scope="row" align="center">
                            <div style={{ color: 'red' }}>
                              {/* {console.log()} */}
                              {((row?.EndDate - Date.now()) / (1000 * 60 * 60 * 24)).toFixed(0) > 0 ? ((row?.EndDate - Date.now()) / (1000 * 60 * 60 * 24)).toFixed(0) + "Days" : "expired"}
                            </div>

                          </TableCell>
                          <TableCell align="center">
                            <div className="action-btn-flex display-4">
                              <Button>
                                {selectedIndex == index ? <Visibility onClick={() => { setSelectedIndex(null) }} /> : <VisibilityOff onClick={() => { setSelectedIndex(index) }} />}
                              </Button>
                              <Button>
                                <DeleteOutlineTwoToneIcon
                                  className="action-btn-bdr"
                                  onClick={() => {
                                    DeleteApiKey(row?._id);
                                  }}
                                />
                              </Button>
                              {/* -------------------------------edit button ---------------------------------- */}
                              <Button>
                                <EditSharpIcon
                                  className="action-btn-bdr"
                                  onClick={() => {
                                    UpdateApiKey(row);
                                  }}
                                />
                              </Button>
                              <Switch
                                checked={row?.enable}
                                value={checked}
                                //  onChange={editkey(row) }
                                disabled={checked}
                                onClick={() => editkey(row)}
                                  className="custom-switch"

                              />

                            </div>
                          </TableCell>
                        </TableRow>
                      ))}

                      {
                        rows?.length == 0 &&
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell colSpan={3} align="center">No Data Found</TableCell>
                        </TableRow>
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </Box>
        </Modal>

        {/* ---------------------------Api key monitoring api ui modal design --------------------------- */}
        <Modal
          open={open4}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style2}>
            <div>
              <div className="display-2">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <strong>Api Key Monitoring</strong>
                </Typography>
                <div onClick={handleClose4} className="cursor">
                  <HighlightOffIcon />
                </div>
              </div>
              {
                usertype === 'organization' ? (
                  <div className="margin-top bors">
                    <div className="display-2 box_align">
                      <div className="stat-cardmain">
                        <div className="inner-thead-th">Total Hit</div>
                        <div className="statistic-bold-td">
                          {monitor ? `${monitor.totalHits}` : 'Loading...'}
                        </div>
                      </div>
                      <div className="stat-cardmain">
                        <div className="inner-thead-th">Success Rate</div>
                        <div className="statistic-bold-td">
                          {monitor ? `${monitor.successRate}` : 'Loading...'}
                        </div>
                      </div>
                      <div className="stat-cardmain">
                        <div className="inner-thead-th">Error Rate</div>
                        <div className="statistic-bold-td">
                          {monitor ? `${monitor.errorRate}` : 'Loading...'}
                        </div>
                      </div>
                      <div className="stat-cardmain">
                        <div className="inner-thead-th">Average Response Time</div>
                        <div className="statistic-bold-td">
                          {monitor ? `${monitor.averageSuccessResponseTime || 0}ms` : 'Loading...'}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )
              }

            </div>
          </Box>
        </Modal>



        {/* edit api ui modal design -------------------edit ftttt--------------------------- */}
        <Modal
          open={openEditApi}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style }}>
            <div>
              <div className="display-2">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <strong>Edit Name</strong>
                </Typography>
                <div className="cursor">
                  <HighlightOffIcon onClick={() => setOpenEditApi(false)} />
                </div>
              </div>

              <div
                className="email-filed margin-top"
                style={{ width: "320px", margin: "20px auto" }}
              >
                <label className="display-1">Enter Name</label>
                <TextField
                  id="outlined-basic"
                  placeholder="Enter New Name"
                  variant="outlined"
                  style={{ width: "100%" }}
                  value={name ? name : currentName}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div
                className="email-filed margin-top"
                style={{ width: "320px", margin: "20px auto" }}
              >
                <label className="display-1">Enter IPs</label>
                <TextField
                  id="outlined-basic"
                  placeholder="Enter IPs (comma-separated)"
                  variant="outlined"
                  style={{ width: "100%" }}
                  value={apiEditIps}
                  onChange={(e) => setApiEditIps(e.target.value)}
                />
              </div>

              <div className="exteddata text-center margin-top">
                <Button onClick={() => handleEdit(apiEditKey?._id,)} variant="contained" color="primary">
                  Edit
                </Button>
              </div>
            </div>
          </Box>
        </Modal>

        {/* <Modal
          open={open4}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style2}>
            <div>
              <div className="display-2">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <strong>Enter Password</strong>
                </Typography>
                <div onClick={handleClose4} className="cursor">
                  <HighlightOffIcon />
                </div>
              </div>
              <div className="apikey-table">
                <FormControl
                  sx={{ width: "100%" }}
                  variant="outlined"
                  style={{ margin: "20px auto" }}
                >
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  // label="Password"
                  />
                </FormControl>
              </div>

              <div className="submit-btn text-center">
                <Button variant="contained"
                  onClick={() => {
                    console.log("Clicled ahfauhfuisdf", selcIndex)
                    setSelectedIndex(selcIndex)
                    handleClose4()
                  }} >Submit</Button>
              </div>
            </div>
          </Box>
        </Modal> */}

        <Modal
          open={open5}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style2}>
            <div>
              <div className="display-2">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <strong>Api Key</strong>
                </Typography>
                <div onClick={() => { setShowPassword(false); handleClose5() }} className="cursor">
                  <HighlightOffIcon />
                </div>
              </div>
              <div
                className="email-filed margin-top"
                style={{ margin: "20px auto" }}
              >
                <label className="display-1"> Name </label>
                <TextField
                  id="outlined-basic"
                  placeholder="Enter Api Key Name"
                  variant="outlined"
                  style={{ width: "100%", margin: "10px auto" }}
                  onChange={(e) => { setApiKeyName(e.target.value); setApiKeyNameErr('') }}
                />
                {apikeyNameErr != "" ? <div style={{ color: "red", textAlign: "center" }}>{apikeyNameErr}</div> : ""}
              </div>

              <label className="display-1">Enter User Password </label>
              <div className="apikey-table">
                <FormControl
                  sx={{ width: "100%" }}
                  variant="outlined"
                  style={{ margin: "20px auto" }}
                >
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    onChange={(e) => { setPassword(e.target.value); setPasswordErr('') }}
                  // label="Password"
                  />
                </FormControl>
                <label className="display-1">Validity Time </label>
                <div className="email-filed margin-top" style={{ margin: '20px auto' }}>
                  <FormControl sx={{ width: '100%' }} variant="outlined" style={{ margin: '10px auto' }}>
                    <InputLabel id="select-month-type">Month Type</InputLabel>
                    <Select
                      labelId="select-month-type"
                      id="select-month-type"
                      value={selectedMonthType}
                      onChange={(e) => setSelectedMonthType(e.target.value)}
                      label="Month Type"
                    >
                      <MenuItem value="1">1 Month</MenuItem>
                      <MenuItem value="6">6 Months</MenuItem>
                      <MenuItem value="12">1 Year</MenuItem>
                      <MenuItem value="24">2 Years</MenuItem>
                    </Select>
                  </FormControl>
                </div>



                {passwordErr != "" ? <div style={{ color: "red", textAlign: "center" }}>{passwordErr}</div> : ""}
              </div>

              <div
                className="email-filed margin-top"
                style={{ margin: "20px auto" }}
              >
                <label className="display-1"> No of Users </label>
                <TextField
                  id="outlined-basic"
                  type="number"
                  placeholder="Enter No Of IP Can Access"
                  variant="outlined"
                  style={{ width: "100%", margin: "10px auto" }}
                  onChange={(e) => { setApiNo(e.target.value); setApiKeyNumErr('') }}
                />
                {apikeyNumErr != "" ? <div style={{ color: "red", textAlign: "center" }}>{apikeyNumErr}</div> : ""}
              </div>

              <div className="submit-btn text-center">
                <Button variant="contained" disabled={apikeyStatus} onClick={() => { CreateApiKey() }} >Submit</Button>
              </div>
            </div>
          </Box>
        </Modal>

        <Modal
          open={open2fa}
          // onClose={handleClose2fa}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="close text-right">
              <CloseIcon onClick={handleClose2fa} />
            </div>
            <Typography id="modal-modal-title" variant="h6" component="h2" className="text-center">
              Enable 2FA
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>

              <div>
                <div className="text-center">
                  <span>QR Code:</span>
                  <div className='qr-code-code text-center padding-10'>
                    <QRCodeSVG value={qrCode} />
                  </div>
                </div>
                <div>
                  <div className='security-Code text-left margin-t-10px '>
                    <span>Security Code:</span>
                    {/* {secret} */}
                  </div>
                </div>
                <div className='security-Code margin-t-10px '>
                  {/* <span>Security Code:</span> */}
                  {secret}
                  <Button
                    onClick={() => {
                      handleCopy();
                    }}
                  >
                    <ContentCopyIcon  sx={{color: "var(--theme-color)"}}/>
                  </Button>
                  {copied && (
                    <Typography
                      variant="body2"
                      color="success.main"
                    >
                      Copied!
                    </Typography>
                  )}
                </div>
                <div>
                  <div className='verif-2fa-digit-inner margin-t-10px text-center'>
                    <TextField id="outlined-basic" type='text'
                      value={secret1}
                      onChange={(e) => setSecret1(e.target.value)}
                      placeholder="" variant="outlined" />
                    {/* <input
                      type='text'
                      value={secret1}
                      onChange={(e) => setSecret1(e.target.value)}
                    /> */}
                    {
                      secret1Err && <div style={{ color: "red", textAlign: "center" }}>{secret1Err}</div>
                    }
                    {
                      verifyLoad ?
                        <Button variant="contained" >Processing...</Button>
                        :
                        <Button variant="contained" onClick={() => { verify2FA() }} sx={{ bgcolor: "var(--theme-color)" }}>Verify</Button>
                    }
                  </div>
                </div>
              </div>
            </Typography>
          </Box>
        </Modal>

      </Box >
    </div >
  );
}
