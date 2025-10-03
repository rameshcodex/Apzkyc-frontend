import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Button, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Axios from "../../../Axios";
import Sidebar from "../SideBar/Sidebar";
import { Triangle } from "react-loader-spinner";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import toast from "react-hot-toast";

import Modal from "@mui/material/Modal";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HouseIcon from "@mui/icons-material/House";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import { decryptData } from "../../../middleware";
import SignpostIcon from "@mui/icons-material/Signpost";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  // Modal,
  // Box,
  // Typography,
  // IconButton,
  // Grid,
  Avatar,
  Chip,
  Divider,
  // Paper
} from "@mui/material";
// import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CakeIcon from "@mui/icons-material/Cake";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import FeaturedVideoIcon from "@mui/icons-material/FeaturedVideo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SearchIcon from "@mui/icons-material/Search";
import RestoreIcon from "@mui/icons-material/Restore";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
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

const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  "@media(max-width:767.98px)": {
    width: "90%",
  },
  height: "600px",
  overflowY: "scroll",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  // boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const style3 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  overflowY: "scroll",
  // bgcolor: 'background.paper',
  // border: '2px solid #000',
  // boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const styleNew = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 700 },
  maxHeight: "90vh",
  overflow: "auto",
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
  p: { xs: 2, sm: 4 },
};

const images = [
  "https://source.unsplash.com/random/150x150?portrait=1",
  "https://source.unsplash.com/random/150x150?portrait=2",
  "https://source.unsplash.com/random/150x150?portrait=3",
];

const userData = {
  name: "John Doe",
  username: "@johndoe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  dob: "January 15, 1990",
  avatar: "https://source.unsplash.com/random/200x200?portrait",
};

export default function Compliance() {
  // create popup open and close

  const theme = useTheme();
  const mdScreen = useMediaQuery(theme.breakpoints.up("md"));

  const MobileScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const [usertype, setUserType] = useState("");
  const token = localStorage.getItem("Rikosta");

  const subAdminDetails = JSON.parse(localStorage.getItem("subadmin"));

  useEffect(() => {
    if (token) {
      var user = window.localStorage.getItem("userType");
      const userType = decryptData(user);
      setUserType(userType);
    }
  }, [token]);

  const [openNew, setOpenNew] = useState(false);

  const handleOpenNew = () => setOpenNew(true);
  const handleCloseNew = () => setOpenNew(false);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [openimport, setOpenImport] = useState(false);

  const handleClickImport = () => {
    setOpenImport(true);
  };
  const handleCloseImport = () => {
    setOpenImport(false);
  };

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

  // popup selector 1

  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // selector 2 data

  const [age, setAge] = React.useState("All");

  const handleSelectChange = (event) => {
    setAge(event.target.value);
  };

  //  select file

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // const handleUpload = () => {
  //   if (selectedFile) {
  //     console.log('File Selected:', selectedFile.name);
  //     // You can add your upload logic here
  //   }
  // };

  // table data
  function createdData(title, name, description, entry, type, date, time, gmt) {
    return { title, name, description, entry, type, date, time, gmt };
  }

  const List = [
    createdData(
      "sdad",
      "sdad",
      "asdasd",
      "Applicant ids",
      "Blocklist",
      "Aug 6, 2024,",
      "5:12 PM",
      "(GMT+5:30)"
    ),
    createdData(
      "asdsdas",
      "asdsdas",
      "asdasd",
      "Key",
      "Custom",
      "Aug 6, 2024,",
      "5:12 PM",
      "(GMT+5:30)"
    ),
    createdData(
      "sds",
      "sds",
      "wwewe",
      "Key",
      "Custom",
      "Aug 6, 2024,",
      "5:12 PM",
      "(GMT+5:30)"
    ),
    createdData(
      "Gr",
      "gr",
      "sddf",
      "Key",
      "Custom",
      "Aug 6, 2024,",
      "5:12 PM",
      "(GMT+5:30)"
    ),
  ];

  const [clientList, setClientList] = useState([]);
  const [filterClientList, setFilterClientList] = useState([]);
  const [clientLoading, setClientLoading] = useState(false);

  const paginatedClientList = filterClientList.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const getClientList = async (reset = false) => {
    try {
      const payload = reset
        ? { start: null, end: null, search: "" }
        : {
          start: startDate ? startDate.format("YYYY-MM-DD") : null,
          end: endDate ? endDate.format("YYYY-MM-DD") : null,
          search: searchQuery || "",

        };

      setClientLoading(true);

      const { data } = await Axios.post("/clientlist", payload, {
        headers: {
          Authorization: window.localStorage.getItem("Rikosta"),
        },
      });

      // Handle successful response
      if (data?.success) {
        setClientList(data.result);
        setFilterClientList(data.result);

      } else {
        toast.error(data?.message || "No clients found.");
        setClientList([]);
        setFilterClientList([]);
      }
    } catch (error) {
      setFilterClientList([]);
      if (error?.response?.status === 499) {
        toast.error(
          error?.response?.data?.message ||
          "Session expired. Please log in again."
        );
        window.localStorage.removeItem("Rikosta");
        window.localStorage.removeItem("userType");
        setTimeout(() => {
          window.location.replace("/login");
        }, 1000);
      } else {
        toast.error("An error occurred while fetching client data.");
      }
    } finally {
      setClientLoading(false);
    }
  };

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setSearchQuery("");
    getClientList(true);
  };

  useEffect(() => {
    getClientList();
  }, []);
  useEffect(() => {
    if (age === "PEP") {
      const filteredList = clientList.filter((client) => client?.highrisk === "true");
      setFilterClientList(filteredList);
    } else if (age === "Sanctions") {
      const filteredList = clientList.filter((client) => !client?.highrisk || client?.highrisk === "false");
      setFilterClientList(filteredList);
    } else {
      setFilterClientList(clientList);
    }
  }, [age, clientList])

  const [openOrg, setOpenOrg] = useState(false);

  const handleOpenOrg = () => setOpenOrg(true);
  const handleCloseOrg = () => setOpenOrg(false);

  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const [selcDoc, setSelcDoc] = useState("");

  const itemData = [
    {
      img: selcDoc?.address_proof,
      title: "Address Document: ",
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: selcDoc?.ID_Image_front,
      title: "Id FrontSide Image:",
    },
    {
      img: selcDoc?.ID_Image_Back,
      title: "Id BackSide Image:",
    },
    {
      img: selcDoc?.faceImage,
      title: "Id BackSide Image:",
    },
  ];

  const [openOrgTab2, setOpenOrgTab2] = useState(false);
  const [zoom, setZoom] = useState(null);
  const handleOpenOrgTab2 = (val) => {
    setOpenOrgTab2(true);
    setZoom(val);
  };
  const handleCloseOrgTab2 = () => setOpenOrgTab2(false);
  const exportData = async () => {
    try {
      const { data } = await Axios.post(
        "/exportKycDetails",
        {
          status: age === "All" ? "all" : age === "PEP" ? "true" : "false",
        },
        {
          headers: {
            Authorization: window.localStorage.getItem("Rikosta"),
          },
        }
      );
      if (data?.success) {
        const result = data?.result || [];
        const ws = XLSX.utils.aoa_to_sheet([
          [`Total KYC Verifications: ${result.length}`], // first row: summary
          [], // empty row for spacing
        ]);
        XLSX.utils.sheet_add_json(ws, result, { origin: 2, skipHeader: false });
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "KYC");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], {
          type: "application/octet-stream",
        });
        saveAs(blob, "kyc-details.xlsx");
      } else {
        toast.error(data?.message || "Failed to export data.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to export data.");
    }
  };
  return (
    <div>
      <Box sx={{ display: mdScreen ? "flex" : "block" }}>
        <Sidebar />
        <Box
          component="main"
          className="clientList-body"
          sx={{ flexGrow: 1, p: 3, marginTop: "80px" }}
        >
          {usertype === "organization" ||
            subAdminDetails?.access?.client_lists === true ? (
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
              // sx={{ display: "flex", gap: 2, marginTop: "0px" }}
              >
                <div className="display-2">
                  <span>
                    Total KYC Verification : {filterClientList?.length || 0}
                  </span>
                  <div className="display-4">
                    <FormControl sx={{ m: 0, width: 160, margin: 0 }}>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        placeholder="Select"
                        className="select-item-list email-field"
                        value={age}
                        onChange={handleSelectChange}
                      >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Sanctions">Sanctions</MenuItem>
                        <MenuItem value="PEP">PEP</MenuItem>
                      </Select>
                    </FormControl>
                    <Button
                      variant="contained"
                      component="span"
                      className="upload-btn"
                      sx={{
                        "&.Mui-disabled": {
                          backgroundColor: "#8b8b8b !important",
                          color: "#fff !important",
                          cursor: "not-allowed !important",
                        },
                      }}
                      onClick={exportData}
                      disabled={clientLoading}
                    >
                      <FileUploadOutlinedIcon />
                      Export
                    </Button>
                  </div>
                </div>
              </Grid>

              <Grid item xs={12}>
                <div className="item-list-table">
                  <TableContainer>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Name</TableCell>
                          <TableCell align="left">ID Number</TableCell>
                          <TableCell align="left">Liveness verified</TableCell>
                          <TableCell align="left">Id verified</TableCell>
                          <TableCell align="left">Email</TableCell>
                          <TableCell align="left">Country</TableCell>
                          <TableCell align="left">ApiKey</TableCell>
                          <TableCell align="center">Created at</TableCell>
                          {(usertype === "organization" ||
                            subAdminDetails?.access?.client_view === true) && (
                              <TableCell align="center">Actions</TableCell>
                            )}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {clientLoading ? (
                          <TableRow>
                            <TableCell
                              colSpan={8}
                              style={{ textAlign: "center" }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: "100px",
                                }}
                              >
                                <Triangle
                                  color='var(--theme-color)'
                                  height={80}
                                  width={80}
                                />
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : paginatedClientList.length > 0 ? (
                          paginatedClientList.map((list, index) => {

                            return <TableRow key={index}>
                              <TableCell>{`${list?.Firstname || ""} ${list?.Lastname || ""
                                }`}</TableCell>
                              <TableCell>{list?.ID_Number || "-"}</TableCell>
                              <TableCell>
                                {list?.Liveness_verify ? (
                                  <CheckCircleOutlineIcon
                                    style={{ color: "green" }}
                                  />
                                ) : (
                                  <CancelOutlinedIcon
                                    style={{ color: "red" }}
                                  />
                                )}
                              </TableCell>
                              <TableCell>
                                {list?.Id_verify ? (
                                  <CheckCircleOutlineIcon
                                    style={{ color: "green" }}
                                  />
                                ) : (
                                  <CancelOutlinedIcon
                                    style={{ color: "red" }}
                                  />
                                )}
                              </TableCell>
                              <TableCell>{list?.email || "-"}</TableCell>
                              <TableCell>{list?.Country || "-"}</TableCell>
                              <TableCell>
                                {list?.apikey
                                  ? `${list?.apikey.slice(
                                    0,
                                    5
                                  )}...${list?.apikey.slice(-5)}`
                                  : "-"}
                              </TableCell>
                              <TableCell>
                                {list?.createdAt
                                  ? list.createdAt.split("T")[0]
                                  : "-"}
                              </TableCell>
                              {(usertype === "organization" ||
                                subAdminDetails?.access?.client_view ===
                                true) && (
                                  <TableCell>
                                    <Button
                                      variant="contained"
                                      className="view-btn"
                                      style={{
                                        color: "#fff",
                                        backgroundColor: 'var(--theme-color)',
                                        padding: "5px 5px",
                                        display: "flex",
                                        alignItems: "center",
                                        borderRadius: "5px",
                                        fontWeight: "bold",
                                        "&:hover": {
                                          backgroundColor: 'var(--theme-color)',
                                        },
                                      }}
                                      onClick={() => {
                                        setSelcDoc(list);
                                        handleOpenNew();
                                      }}
                                    >
                                      View
                                      <VisibilityOutlinedIcon />
                                    </Button>
                                  </TableCell>
                                )}
                            </TableRow>
                          })
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={8}
                              style={{ textAlign: "center", fontSize: "20px" }}
                            >
                              No Data Found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {/* <>
                  <div className='add-false-content'>
                    There are no items yet
                  </div>
                </> */}
                </div>

                <TablePagination
                  component="div"
                  count={filterClientList?.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Grid>

              <Modal
                open={openOrg}
                // onClose={handleCloseOrg}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style2}>
                  <div className="text-right">
                    <CloseIcon
                      onClick={handleCloseOrg}
                      className="cursor cls-ic"
                    />
                  </div>
                  <div
                    className={
                      matches
                        ? "kyc-submit-user-main"
                        : "kyc-submit-user-main kyb-mob"
                    }
                  >
                    <div className="display-2 m-10">
                      <strong>First Name: </strong>
                      <div> {selcDoc?.Firstname}</div>
                    </div>
                    <div className="display-2 m-10">
                      <strong>Last Name: </strong>
                      <div> {selcDoc?.Lastname}</div>
                    </div>
                    <div className="display-2 m-10">
                      <strong>Date Of Birth </strong>
                      <div> {selcDoc?.dob}</div>
                    </div>
                    <div className="display-2 m-10">
                      <strong>Email: </strong>
                      <div> {selcDoc?.email}</div>
                    </div>
                    <div className="display-2 m-10">
                      <strong>Phone Number: </strong>
                      <div> {selcDoc?.phone}</div>
                    </div>
                    {/* <div className='display-3 m-10' style={{ flexDirection: "column", gap: "10px" }}>
                                            <strong>Address Document: </strong>
                                            <div>
                                                <div >
                                                    <img src={selcDoc?.Address_Proof} width={200} height={200} />
                                                </div>
                                            </div>
                                        </div> */}
                    <div className="display-2 m-10">
                      <strong>Address Line 1: </strong>
                      <div> {selcDoc?.address_line1}</div>
                    </div>
                    {/* <div className='display-3 m-10' style={{ flexDirection: "column", gap: "10px" }}>
                                            <strong>VAT Document: </strong>
                                            <div>
                                                <div >
                                                    <img src={selcDoc?.VatNumber_Proof} width={200} height={200} />
                                                </div>
                                            </div>
                                        </div> */}
                    <div className="display-2 m-10">
                      <strong>Address Line 2: </strong>
                      <div> {selcDoc?.address_line2}</div>
                    </div>

                    <div className="display-2 m-10">
                      <strong>City: </strong>
                      <div> {selcDoc?.city}</div>
                    </div>
                    <div className="display-2 m-10">
                      <strong>State: </strong>
                      <div> {selcDoc?.stateOrProvince}</div>
                    </div>
                    <div className="display-2 m-10">
                      <strong>Country: </strong>
                      <div> {selcDoc?.Country}</div>
                    </div>
                    <div className="display-2 m-10">
                      <strong>Postalcode: </strong>
                      <div> {selcDoc?.postalcode}</div>
                    </div>
                    <div className="display-2 m-10">
                      <strong>Id Country: </strong>
                      <div> {selcDoc?.ID_country}</div>
                    </div>
                    <div className="display-2 m-10">
                      <strong>Id Type: </strong>
                      <div> {selcDoc?.ID_type}</div>
                    </div>

                    <div className="display-2 m-10">
                      <strong>Id Number: </strong>
                      <div> {selcDoc?.ID_Number}</div>
                    </div>
                    <div className="display-2 m-10">
                      <strong>ApiKey: </strong>
                      <div>
                        {" "}
                        {selcDoc?.apikey?.slice(0, 10)}....
                        {selcDoc?.apikey?.slice(-10)}
                      </div>
                    </div>
                    <div className="display-2 m-10">
                      <strong>Name Check: </strong>
                      <div>
                        {" "}
                        {selcDoc?.Name_Check == true ? (
                          <CheckCircleOutlineIcon style={{ color: "green" }} />
                        ) : (
                          <CancelOutlinedIcon style={{ color: "red" }} />
                        )}
                      </div>
                    </div>
                    <div className="display-2 m-10">
                      <strong>Id Verify: </strong>
                      <div>
                        {" "}
                        {selcDoc?.Id_verify == true ? (
                          <CheckCircleOutlineIcon style={{ color: "green" }} />
                        ) : (
                          <CancelOutlinedIcon style={{ color: "red" }} />
                        )}
                      </div>
                    </div>
                    <div className="display-2 m-10">
                      <strong>Liveness Verify: </strong>
                      <div>
                        {" "}
                        {selcDoc?.Liveness_verify == true ? (
                          <CheckCircleOutlineIcon style={{ color: "green" }} />
                        ) : (
                          <CancelOutlinedIcon style={{ color: "red" }} />
                        )}
                      </div>
                    </div>
                    <div className="display-2 m-10">
                      <strong>Liveness Photo Match With ID: </strong>
                      <div>
                        {" "}
                        {selcDoc?.Liveness_verify == true ? (
                          <CheckCircleOutlineIcon style={{ color: "green" }} />
                        ) : (
                          <CancelOutlinedIcon style={{ color: "red" }} />
                        )}
                      </div>
                    </div>

                    {selcDoc?.ID_type == "NationalId" && (
                      <>
                        {selcDoc?.results?.verification_Result?.sources
                          ?.length > 0 &&
                          selcDoc?.results?.verification_Result?.sources?.map(
                            (item, index) => {
                              return (
                                <div className="display-2 m-10">
                                  <strong>{item?.name}: </strong>
                                  <div>
                                    {" "}
                                    {selcDoc?.results?.verification_Result
                                      ?.results?.length > 0 &&
                                      selcDoc?.results?.verification_Result
                                        ?.results[0]?.matchCount == 0 ? (
                                      <CheckCircleOutlineIcon
                                        style={{ color: "green" }}
                                      />
                                    ) : (
                                      <CancelOutlinedIcon
                                        style={{ color: "red" }}
                                      />
                                    )}
                                  </div>
                                </div>
                              );
                            }
                          )}
                      </>
                    )}
                    <div className="display-2 m-10">
                      <strong>Confidence: </strong>
                      <div>
                        {" "}
                        {selcDoc?.Confidence ? selcDoc?.Confidence : 0}
                      </div>
                    </div>

                    {/* <div className='display-3 m-10' style={{ flexDirection: "column", gap: "10px" }}>
                                            <strong>Income Tax Document: </strong>
                                            <div>
                                                <div >
                                                    <img src={selcDoc?.ITNumber_Proof} width={200} height={200} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='display-3 m-10' style={{ flexDirection: "column", gap: "10px" }}>
                                            <strong>Bank Document: </strong>
                                            <div>
                                                <div >
                                                    <img src={selcDoc?.Bank_Proof} width={200} height={200} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='display-3 m-10' style={{ flexDirection: "column", gap: "10px" }}>
                                            <strong>Director's Document: </strong>
                                            <div>
                                                <div >
                                                    <img src={selcDoc?.Diretors?.length > 0 && selcDoc?.Diretors[0]} width={200} height={200} />
                                                </div>
                                            </div>
                                        </div> */}

                    <ImageList
                      sx={{ width: "100%", height: 450 }}
                      className={!matches && "imagelist"}
                    >
                      <ImageListItem key="Subheader" cols={2}>
                        <ListSubheader className="m-10" component="div">
                          {" "}
                          Documents
                        </ListSubheader>
                      </ImageListItem>
                      {itemData?.map((item) => {
                        if (item?.img) {
                          return (
                            <ImageListItem key={item.img}>
                              <img
                                // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item.img}?w=248&fit=crop&auto=format`}
                                alt={item.title}
                                loading="lazy"
                                style={{ width: "100%", height: "200px" }}
                              />
                              <ImageListItemBar
                                title={item.title}
                                subtitle={item.author}
                                actionIcon={
                                  <IconButton
                                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                                    aria-label={`info about ${item.title}`}
                                  >
                                    <ZoomOutMapIcon
                                      onClick={() => {
                                        handleOpenOrgTab2(item.img);
                                      }}
                                    />
                                  </IconButton>
                                }
                              />
                            </ImageListItem>
                          );
                        }
                      })}
                    </ImageList>
                    <div>
                      {/* {
                      selcDoc?.Verify == "Pending" ?
                        <div className='display-2' style={{ gap: "10px" }}>
                          <Button className="view-btn" disabled={sts} variant='contained' onClick={() => { changeStatus("Approved") }} >Approve</Button>
                          <Button className="view-btn" disabled={sts} variant='contained' onClick={() => { handleOpenOrgTab(); }} >Reject</Button>
                        </div>
                        :
                        <div>
                          <div>Status: {selcDoc?.Verify == "Rejected" ? selcDoc?.reason : selcDoc?.Verify}</div>
                        </div>
                    } */}
                    </div>
                  </div>
                </Box>
              </Modal>

              <Modal
                open={openOrgTab2}
                onClose={handleCloseOrgTab2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style3}>
                  <div className="text-right">
                    <CloseIcon
                      onClick={handleCloseOrgTab2}
                      className="cursor cls-ic"
                    />
                  </div>
                  <div className="text-center display-3 Zoomimg">
                    <img src={zoom} alt="orgImg" />
                  </div>
                </Box>
              </Modal>

              <Modal
                open={openNew}
                onClose={handleCloseNew}
                aria-labelledby="user-modal-title"
                aria-describedby="user-modal-description"
                sx={{
                  backdropFilter: "blur(5px)",
                }}
              >
                <Paper elevation={24} sx={styleNew}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      background: "#fff",
                      zIndex: 100,
                      position: "sticky",
                      top: "-35px",

                      // mt: -3,
                      pt: 3.5,
                      backdropFilter: "blur(5px)",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { xs: "center", sm: "flex-start" },
                        mb: 4,
                        pt: 2,
                      }}
                    >
                      <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
                        <Typography
                          variant="h4"
                          component="h2"
                          fontWeight="bold"
                          sx={{ mb: 1, color: "#1a237e" }}
                        >
                          {selcDoc?.Firstname}
                        </Typography>
                        <Chip
                          icon={<CakeIcon />}
                          label={selcDoc?.dob}
                          variant="outlined"
                          size="medium"
                          sx={{
                            borderRadius: "16px",
                            bgcolor: 'color-mix(in srgb, var(--theme-color) 30%, transparent)',
                            borderColor: "var(--theme-color) ",
                            color: "var(--theme-color) ",
                            "& .MuiChip-icon": {
                              color: "var(--theme-color) ",
                            },
                          }}
                        />
                      </Box>
                    </Box>

                    <IconButton
                      aria-label="close"
                      onClick={handleCloseNew}
                      sx={{
                        bgcolor: "rgba(0,0,0,0.05)",
                        "&:hover": {
                          bgcolor: "rgba(0,0,0,0.1)",
                        },
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          p: 2,
                          bgcolor: 'color-mix(in srgb, var(--theme-color) 30%, transparent)',
                          borderRadius: 2,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            bgcolor: 'color-mix(in srgb, var(--theme-color) 30%, transparent)',
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        <EmailIcon
                          sx={{ fontSize: 24, mr: 2, color: "var(--theme-color) " }}
                        />
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{ color: "text.secondary" }}
                          >
                            Email
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {selcDoc?.email}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          p: 2,
                          bgcolor: 'color-mix(in srgb, var(--theme-color) 30%, transparent)',
                          borderRadius: 2,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            bgcolor: 'color-mix(in srgb, var(--theme-color) 30%, transparent)',
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        <PhoneIcon
                          sx={{ fontSize: 24, mr: 2, color: "var(--theme-color) " }}
                        />
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{ color: "text.secondary" }}
                          >
                            Phone
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {selcDoc?.phone}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          p: 2,
                          bgcolor: 'color-mix(in srgb, var(--theme-color) 30%, transparent)',
                          borderRadius: 2,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            bgcolor: 'color-mix(in srgb, var(--theme-color) 30%, transparent)',
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        <LocationCityIcon
                          sx={{ fontSize: 24, mr: 2, color: "var(--theme-color) " }}
                        />
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{ color: "text.secondary" }}
                          >
                            City
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {selcDoc?.city}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          p: 2,
                          bgcolor: 'color-mix(in srgb, var(--theme-color) 30%, transparent)',
                          borderRadius: 2,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            bgcolor: 'color-mix(in srgb, var(--theme-color) 30%, transparent)',
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        <HouseIcon
                          sx={{ fontSize: 24, mr: 2, color: "var(--theme-color) " }}
                        />
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{ color: "text.secondary" }}
                          >
                            State
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {selcDoc?.stateOrProvince}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          p: 2,
                          bgcolor: 'color-mix(in srgb, var(--theme-color) 30%, transparent)',
                          borderRadius: 2,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            bgcolor: 'color-mix(in srgb, var(--theme-color) 30%, transparent)',
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        <OutlinedFlagIcon
                          sx={{ fontSize: 24, mr: 2, color: "var(--theme-color) " }}
                        />
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{ color: "text.secondary" }}
                          >
                            Country
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {selcDoc?.Country}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          p: 2,
                          bgcolor: 'color-mix(in srgb, var(--theme-color) 30%, transparent)',
                          borderRadius: 2,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            bgcolor: 'color-mix(in srgb, var(--theme-color) 30%, transparent)',
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        <SignpostIcon
                          sx={{ fontSize: 24, mr: 2, color: "var(--theme-color) " }}
                        />
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{ color: "text.secondary" }}
                          >
                            Postalcode
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {selcDoc?.postalcode}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          p: 2,
                          bgcolor: 'color-mix(in srgb, var(--theme-color) 30%, transparent)',
                          borderRadius: 2,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            bgcolor: 'color-mix(in srgb, var(--theme-color) 30%, transparent)',
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        <FeaturedVideoIcon
                          sx={{ fontSize: 24, mr: 2, color: "var(--theme-color) " }}
                        />
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{ color: "text.secondary" }}
                          >
                            ID Country
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {selcDoc?.ID_country}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          p: 2,
                          bgcolor: 'color-mix(in srgb, var(--theme-color) 30%, transparent)',
                          borderRadius: 2,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            bgcolor: 'color-mix(in srgb, var(--theme-color) 30%, transparent)',
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        <FeaturedVideoIcon
                          sx={{ fontSize: 24, mr: 2, color: "var(--theme-color) " }}
                        />
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{ color: "text.secondary" }}
                          >
                            ID Type
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {selcDoc?.ID_type}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          p: 2,
                          bgcolor: 'color-mix(in srgb, var(--theme-color) 30%, transparent)',
                          borderRadius: 2,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            bgcolor: 'color-mix(in srgb, var(--theme-color) 30%, transparent)',
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        <FeaturedVideoIcon
                          sx={{ fontSize: 24, mr: 2, color: "var(--theme-color) " }}
                        />
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{ color: "text.secondary" }}
                          >
                            ID Number
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {selcDoc?.ID_Number}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          p: 2,
                          bgcolor: 'color-mix(in srgb, var(--theme-color) 30%, transparent)',
                          borderRadius: 2,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            bgcolor: 'color-mix(in srgb, var(--theme-color) 30%, transparent)',
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        <FeaturedVideoIcon
                          sx={{ fontSize: 24, mr: 2, color: "var(--theme-color) " }}
                        />
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{ color: "text.secondary" }}
                          >
                            API ID
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {selcDoc?.apikey?.slice(0, 10)}....
                            {/* {selcDoc?.apikey?.slice(-10)} */}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          p: 2,
                          bgcolor: 'color-mix(in srgb, var(--theme-color) 30%, transparent)',
                          borderRadius: 2,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            bgcolor: 'color-mix(in srgb, var(--theme-color) 30%, transparent)',
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        <ContactMailIcon
                          sx={{ fontSize: 24, mr: 2, color: "var(--theme-color) " }}
                        />
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{ color: "text.secondary" }}
                          >
                            Address
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {selcDoc?.address_line1} , {selcDoc?.address_line2}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Box
                        sx={{
                          // display: 'flex',
                          // alignItems: 'center',
                          p: 2,
                          bgcolor: 'color-mix(in srgb, var(--theme-color) 30%, transparent)',
                          borderRadius: 2,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            bgcolor: 'color-mix(in srgb, var(--theme-color) 30%, transparent)',
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        {/* <EmailIcon sx={{ fontSize: 24, mr: 2, color: 'var(--theme-color) ' }} /> */}
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "text.secondary",
                              fontWeight: 700,
                              fontSize: "20px",
                            }}
                          >
                            Verification Check
                          </Typography>
                          <div className="display-2 m-10">
                            <div>Name Check: </div>
                            <div>
                              {" "}
                              {selcDoc?.Name_Check == true ? (
                                <CheckCircleOutlineIcon
                                  style={{ color: "green" }}
                                />
                              ) : (
                                <CancelOutlinedIcon style={{ color: "red" }} />
                              )}
                            </div>
                          </div>
                          <div className="display-2 m-10">
                            <div>Id Verify: </div>
                            <div>
                              {" "}
                              {selcDoc?.Id_verify == true ? (
                                <CheckCircleOutlineIcon
                                  style={{ color: "green" }}
                                />
                              ) : (
                                <CancelOutlinedIcon style={{ color: "red" }} />
                              )}
                            </div>
                          </div>
                          <div className="display-2 m-10">
                            <div>Liveness Verify: </div>
                            <div>
                              {" "}
                              {selcDoc?.Liveness_verify == true ? (
                                <CheckCircleOutlineIcon
                                  style={{ color: "green" }}
                                />
                              ) : (
                                <CancelOutlinedIcon style={{ color: "red" }} />
                              )}
                            </div>
                          </div>
                          <div className="display-2 m-10">
                            <div>Liveness Photo Match With ID: </div>
                            <div>
                              {" "}
                              {selcDoc?.Liveness_verify == true ? (
                                <CheckCircleOutlineIcon
                                  style={{ color: "green" }}
                                />
                              ) : (
                                <CancelOutlinedIcon style={{ color: "red" }} />
                              )}
                            </div>
                          </div>

                          {selcDoc?.ID_type == "NationalId" && (
                            <>
                              {selcDoc?.results?.verification_Result?.sources
                                ?.length > 0 &&
                                selcDoc?.results?.verification_Result?.sources?.map(
                                  (item, index) => {
                                    return (
                                      <div className="display-2 m-10">
                                        <div>{item?.name}: </div>
                                        <div>
                                          {" "}
                                          {selcDoc?.results?.verification_Result
                                            ?.results?.length > 0 &&
                                            selcDoc?.results?.verification_Result
                                              ?.results[0]?.matchCount == 0 ? (
                                            <CheckCircleOutlineIcon
                                              style={{ color: "green" }}
                                            />
                                          ) : (
                                            <CancelOutlinedIcon
                                              style={{ color: "red" }}
                                            />
                                          )}
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                            </>
                          )}
                          <div className="display-2 m-10">
                            <div>Confidence: </div>
                            <div>
                              {" "}
                              {selcDoc?.Confidence ? selcDoc?.Confidence : 0}
                            </div>
                          </div>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 3,
                      fontWeight: 600,
                      color: "#1a237e",
                      position: "relative",
                      "&:after": {
                        content: '""',
                        position: "absolute",
                        bottom: -1,
                        left: 0,
                        width: 40,
                        height: 3,
                        bgcolor: "var(--theme-color) ",
                        borderRadius: 1,
                      },
                    }}
                  >
                    Documents
                  </Typography>
                  <Grid container spacing={2}>
                    {itemData.map((image, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box
                          component="img"
                          src={image.img}
                          alt={`Gallery image ${index + 1}`}
                          sx={{
                            width: "100%",
                            height: 200,
                            objectFit: "cover",
                            borderRadius: 2,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "scale(1.03)",
                              boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                              cursor: "pointer",
                            },
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  <Typography
                    variant="h6"
                    sx={{
                      mt: 4,
                      mb: 3,
                      fontWeight: 600,
                      color: '#1a237e',
                      position: 'relative',
                      '&:after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -1,
                        left: 0,
                        width: 40,
                        height: 3,
                        bgcolor: 'var(--theme-color) ',
                        borderRadius: 1,
                      }
                    }}
                  >
                    AML Checking
                  </Typography>
                  <Grid container spacing={2}>

                    <Grid item xs={12}>
                      <div class="container">
                        <div class="window window-client" >
                          <div class="window-title ">
                            <p>Console Window</p>
                            <div class="window-buttons">
                              <div class="window-button fullscreen"></div>
                              <div class="window-button reduce"></div>
                              <div class="window-button cloose"></div>
                            </div>
                          </div>
                          <div class="console console-client">
                            <Box sx={{ width: '100%' }}>

                              {selcDoc?.AmlData ? <pre style={{
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-word",
                                background: "#1e1e1e",
                                color: "#d4d4d4",
                                padding: "10px",
                                borderRadius: "6px",
                                fontSize: "14px",
                                fontFamily: "monospace"
                              }}>
                                {JSON.stringify(selcDoc?.AmlData, null, 2)}
                              </pre> : "No Data Found"}

                            </Box>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Paper>
              </Modal>
            </Grid>
          ) : (
            <Grid container spacing={2}>
              You Dont Have Permission To View
            </Grid>
          )}
        </Box>
      </Box>
    </div>
  );
}
