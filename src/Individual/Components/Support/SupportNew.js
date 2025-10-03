import React, { useEffect, useState, useRef } from 'react'
import './Support.css'

import { Box, Grid, Button, useTheme, useMediaQuery, styled, Snackbar, Tabs, Tab, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Axios from '../../../Axios'
import io from "socket.io-client";
import consts from '../../../constant';
// import Sidebar from '../Components/SideBar/Sidebar';
import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Modal from '@mui/material/Modal';
import CancelIcon from '@mui/icons-material/CancelTwoTone';
import { toast, ToastContainer } from 'react-toastify';
import { decryptData } from '../../../middleware';
import Header from '../Header/Header';
import { useLocation, useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 560,
    '@media(max-width:575.98px)': {
        width: '95%',

    },
    position: 'relative',
    bgcolor: '#fff',
    // border: '2px solid #000',
    // boxShadow: 24,
    borderRadius: '12px',
    // boxShadow: '12px 27px 34.6px - 9px rgba(0, 0, 0, 0.10)',
    p: 2,
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function getTimeOrDateFromTimestamp(timestamp) {
    const now = new Date(); // Get current date and time
    const date = new Date(timestamp); // Create a Date object from the timestamp

    // Check if the date of the timestamp is today
    if (date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()) {

        // Extract hours, minutes, and seconds
        const hours = String(date.getHours()).padStart(2, '0'); // Format hours
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Format minutes

        // Return the time in hh:mm:ss format
        return `${hours}:${minutes}`;
    } else {
        // Extract month and day
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Format month (0-based index)
        const day = String(date.getDate()).padStart(2, '0'); // Format day

        // Return the date in mm-dd format
        return `${month}-${day}`;
    }
}


function SupportNew() {

    const theme = useTheme();
    const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

    const isMd = useMediaQuery(theme.breakpoints.up('md'));

    // const [playCard, setPlaycard] = useState([
    //     { img: 'https://imgs.search.brave.com/gTGcFA5drHatTMbjYOP3X-CROolnU7u_bxbi4rdlrWg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9y/ZWxheGVkLWFmcmlj/YW4tZ2lybC13aXRo/LWJpZy1leWVzLXNt/aWxpbmctYXBwZWFs/aW5nLWxhZHktbGlz/dGVuaW5nLW11c2lj/LXdoaXRlXzE5NzUz/MS0xMTI4MS5qcGc_/c2l6ZT02MjYmZXh0/PWpwZw' },
    //     { img: "https://imgs.search.brave.com/krx_xPUZGcu2ldKw1qreusemorEtlIMuaqCo4SPdnZY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by93/aW5zb21lLWNhcmVm/cmVlLWJsYWNrLWdp/cmwtbGlzdGVuaW5n/LW11c2ljLXN0dWRp/by1zaG90LWpvY3Vu/ZC1hZnJpY2FuLWZl/bWFsZS1tb2RlbC1w/b3NpbmctaGVhZHBo/b25lc18xOTc1MzEt/MTExNTkuanBnP3Np/emU9NjI2JmV4dD1q/cGc" },
    //     { img: "https://imgs.search.brave.com/HvqPR3gn8GFFQ9J8-sokBi0jvSJWz364dV9mPZGoUyc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9hZnJpY2FuLXdv/bWFuLXNpbmdpbmct/d2hpbGUtbGlzdGVu/aW5nLW11c2ljLWhl/YWRwaG9uZXMtaXNv/bGF0ZWQtZ3JleS1i/YWNrZ3JvdW5kLWNv/cHktc3BhY2VfNjEz/NjUyLTQ0MC5qcGc_/c2l6ZT02MjYmZXh0/PWpwZw" },
    //     { img: 'https://imgs.search.brave.com/krYFxbma7Nk_tDb7WxmAkBP-Yq03lI-oc7LR-gmBr_Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9w/bGVhc2VkLWdvb2Qt/bG9va2luZy1naXJs/LXdpdGgtY3VybHkt/YWZyby1oYWlyLWNs/b3Nlcy1leWVzLWVt/YnJhY2VzLWhlcnNl/bGYtbGlzdGVucy1t/dXNpY18yNzM2MDkt/NDU3NDYuanBnP3Np/emU9NjI2JmV4dD1q/cGc' },
    //     { img: "https://imgs.search.brave.com/krx_xPUZGcu2ldKw1qreusemorEtlIMuaqCo4SPdnZY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by93/aW5zb21lLWNhcmVm/cmVlLWJsYWNrLWdp/cmwtbGlzdGVuaW5n/LW11c2ljLXN0dWRp/by1zaG90LWpvY3Vu/ZC1hZnJpY2FuLWZl/bWFsZS1tb2RlbC1w/b3NpbmctaGVhZHBo/b25lc18xOTc1MzEt/MTExNTkuanBnP3Np/emU9NjI2JmV4dD1q/cGc" },
    //     { img: "https://imgs.search.brave.com/HvqPR3gn8GFFQ9J8-sokBi0jvSJWz364dV9mPZGoUyc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9hZnJpY2FuLXdv/bWFuLXNpbmdpbmct/d2hpbGUtbGlzdGVu/aW5nLW11c2ljLWhl/YWRwaG9uZXMtaXNv/bGF0ZWQtZ3JleS1i/YWNrZ3JvdW5kLWNv/cHktc3BhY2VfNjEz/NjUyLTQ0MC5qcGc_/c2l6ZT02MjYmZXh0/PWpwZw" },
    //     { img: 'https://imgs.search.brave.com/gTGcFA5drHatTMbjYOP3X-CROolnU7u_bxbi4rdlrWg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9y/ZWxheGVkLWFmcmlj/YW4tZ2lybC13aXRo/LWJpZy1leWVzLXNt/aWxpbmctYXBwZWFs/aW5nLWxhZHktbGlz/dGVuaW5nLW11c2lj/LXdoaXRlXzE5NzUz/MS0xMTI4MS5qcGc_/c2l6ZT02MjYmZXh0/PWpwZw' },
    //     { img: "https://imgs.search.brave.com/krx_xPUZGcu2ldKw1qreusemorEtlIMuaqCo4SPdnZY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by93/aW5zb21lLWNhcmVm/cmVlLWJsYWNrLWdp/cmwtbGlzdGVuaW5n/LW11c2ljLXN0dWRp/by1zaG90LWpvY3Vu/ZC1hZnJpY2FuLWZl/bWFsZS1tb2RlbC1w/b3NpbmctaGVhZHBo/b25lc18xOTc1MzEt/MTExNTkuanBnP3Np/emU9NjI2JmV4dD1q/cGc" },
    //     { img: "https://imgs.search.brave.com/HvqPR3gn8GFFQ9J8-sokBi0jvSJWz364dV9mPZGoUyc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9hZnJpY2FuLXdv/bWFuLXNpbmdpbmct/d2hpbGUtbGlzdGVu/aW5nLW11c2ljLWhl/YWRwaG9uZXMtaXNv/bGF0ZWQtZ3JleS1i/YWNrZ3JvdW5kLWNv/cHktc3BhY2VfNjEz/NjUyLTQ0MC5qcGc_/c2l6ZT02MjYmZXh0/PWpwZw" },
    //     { img: 'https://imgs.search.brave.com/krYFxbma7Nk_tDb7WxmAkBP-Yq03lI-oc7LR-gmBr_Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9w/bGVhc2VkLWdvb2Qt/bG9va2luZy1naXJs/LXdpdGgtY3VybHkt/YWZyby1oYWlyLWNs/b3Nlcy1leWVzLWVt/YnJhY2VzLWhlcnNl/bGYtbGlzdGVucy1t/dXNpY18yNzM2MDkt/NDU3NDYuanBnP3Np/emU9NjI2JmV4dD1q/cGc' },
    // ])


    const [usertype, setUserType] = useState('')
    const token = localStorage.getItem('Rikosta')
    const location = useLocation()
    const navigate = useNavigate()

    const subAdminDetails = JSON.parse(localStorage.getItem('subadmin'))


    useEffect(() => {
        if (token) {
            var user = window.localStorage.getItem('userType');
            const userType = decryptData(user)
            setUserType(userType)
        }
    }, [token])

    const [playCard, setPlaycard] = useState([])

    const [emoji, setEmoji] = useState('');
    const [showEmoji, setShowEmoji] = useState(false);
    const [messages, setMessages] = useState([]);
    const [name, setName] = React.useState();

    // const [showd, setShowd] = useState(playCard?.[0]?.img)
    const [showd, setShowd] = useState()
    const [selcMsg, setSelcMsg] = useState()
    const [room_id, setRoom_id] = useState()
    const isMounted = useRef(false);
    const isReceived = useRef(false)
    const [ticketData, setTicketData] = useState({})

    const [title, setTitle] = useState()
    const [titleErr, setTitleErr] = useState(null)
    const [msg, setMsg] = useState()
    const [msgErr, setMsgErr] = useState(null)
    const [load, setLoad] = useState(false)
    const [loader, setLoader] = useState(false)

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true)
        setTitle()
        setMsg()
        setTitleErr(null)
        setMsgErr(null)
    };
    const handleClose = () => setOpen(false);

    const socketInstance = io.connect(consts.socketUrl, { path: "/socket" });
    // const socketInstance = io.connect(consts.socketUrl);


    const handleChange = (event) => {
        setEmoji(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (emoji.trim() !== '') {
            setMessages([...messages, emoji.trim()]);
            setEmoji('');
        }
        updateTicket()
    };

    const handleKeyDown = (e) => {
        inputRef.current.focus();
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(e);

        }
    };

    const updateTicket = async () => {
        try {
            if (ticketData.Status == 'closed') {
                toast.error("Your Ticket is Closed")
            }
            else {
                socketInstance.emit('join', {
                    room: room_id
                })
                socketInstance.emit('send', {
                    room: room_id,
                    message: emoji,
                    seen: false,
                    id: 'user',
                })
                const payload = {
                    id: room_id,
                    message: emoji
                }
                const { data } = await Axios.post('/support/updateticket', payload,
                    {
                        headers: {
                            Authorization: window.localStorage.getItem('Rikosta')
                        }
                    }
                )
                if (data.success) {
                    // const newMessage = {
                    //     msg: emoji,
                    //     seen: false,
                    //     id: "admin",
                    //     time: Date.now()
                    // };

                    // setSelcMsg(prevSelcMsg => ({
                    //     ...prevSelcMsg,
                    //     Message: [...prevSelcMsg.Message, newMessage]
                    // }));
                }
            }
        } catch (error) {
            console.log('🚀 ~ updateTickets ~ error', error);
        }
    }

    const [mobView, setMobView] = useState(false)

    const handleChangeMobView = (val) => {
        setMobView(!mobView)
    }

    const [recent, setRecent] = useState([
        {},
        {},
        {},
        {},
        {},
        {},
    ])

    const msgSeen = async (id) => {

        try {
            await Axios.post('/support/messageseen', { id: id }, {
                headers: {
                    Authorization: window.localStorage.getItem('Rikosta'),
                }
            })
        } catch (error) {
            console.log("🚀 ~ msgSeen ~ error:", error)
        }
    }

    const updateAgeById = (id) => {
        // Create a copy of the current array
        const updatedArray = playCard?.map(item => {
            // Check if the current item's id matches the id we want to update
            if (item._id == id) {
                // Return a new object with updated age
                return { ...item, msgcount: 0 };
            }
            // Return the item unchanged if it doesn't match
            return item;
        });

        // Update state with the new array
        setPlaycard(updatedArray);
    };

    const getTickets = async () => {
        try {
            const { data } = await Axios.post('/support/getUserTicket', {}, {
                headers: {
                    Authorization: window.localStorage.getItem('Rikosta'),
                }
            })
            if (data?.success == true) {
                setPlaycard(data?.result)
            }
        } catch (error) {
            console.log("🚀 ~ getTickets ~ error:", error)
        }
    }

    const getOneTicket = async (id) => {
        try {
            setLoader(true)
            const { data } = await Axios.post('/support/getOneTicket', { id: id, type: 'Count' },
                {
                    headers: {
                        Authorization: window.localStorage.getItem('Rikosta')
                    }
                }
            )
            if (data.success) {
                setSelcMsg(data?.result)
                setRoom_id(data?.result?._id)
                setTicketData(data?.result)
                setLoader(false)
            }
        } catch (error) {
            setLoader(false)
            console.log("🚀 ~ getOneTicket ~ error:", error)
        }
    }

    const createTicket = async () => {
        if (title == undefined) {
            setTitleErr('Please Enter Title')
        }
        else if (msg == undefined) {
            setMsgErr('Please Enter Message')
        }
        else {
            setLoad(true)
            const payload = {
                title: title,
                message: msg
            }
            try {
                const { data } = await Axios.post('/support/createTicket', payload, {
                    headers: {
                        Authorization: window.localStorage.getItem('Rikosta')
                    }
                })
                if (data.success) {
                    toast.success(data.message)
                    handleClose()
                    setLoad(false)
                    getTickets()
                    setTitle()
                    setMsg()
                }
            } catch (error) {
                console.log("🚀 ~ createTicket ~ error:", error)
                setLoad(false)
            }
        }
    }

    // const joinRoom = async (id) => {
    //     // setRoom_id(id)
    //     // console.log(id, 'id');

    //     try {
    //         if (id) {
    //             socketInstance.emit('join', {
    //                 room: id
    //             })
    //         }
    //     } catch (error) {
    //         console.log(error, 'err');
    //     }
    // }

    useEffect(() => {
        getTickets()
    }, [])

    useEffect(() => {

        socketInstance.on('connect', () => {
            // console.log('Connected to server');
        });

        // socketInstance.on('message', (data) => {
        //   console.log(`Received message: ${data}`);
        // });

        socketInstance.on('connect_error', (error) => {
            console.log('Connection error:', error);
        });

        return () => {
            if (socketInstance) {
                socketInstance.disconnect();
            }
        }
    }, []);

    useEffect(() => {
        if (room_id != undefined && !isReceived.current) {
            socketInstance.emit('join', { room: room_id });

            const handleReceiveReason = (data) => {
                setTicketData({ ...ticketData, reason: data.reason, Status: data.status });
            };

            socketInstance.on("receiveReason", handleReceiveReason);
            isReceived.current = true;

            return () => {
                socketInstance.off("receiveReason", handleReceiveReason);
                isReceived.current = false;
            };
        }
    }, [room_id]);


    useEffect(() => {
        if (room_id != undefined && !isMounted.current) {
            // Join the room
            socketInstance.emit('join', { room: room_id });

            // Event listener for receiving messages
            const handleReceive = async (data) => {
                const newMessage = {
                    msg: data.message,
                    seen: data.seen,
                    id: data.id,
                    time: Date.now(),
                };
                setSelcMsg(prevSelcMsg => ({
                    ...prevSelcMsg,
                    Message: [...prevSelcMsg.Message, newMessage],
                }));
                setTimeout(async () => {
                    await msgSeen(room_id);
                }, [2000])
            };

            socketInstance.on("receive", handleReceive);

            isMounted.current = true;

            // Cleanup listener when component unmounts or room_id changes
            return () => {
                socketInstance.off("receive", handleReceive);
                isMounted.current = false;
            };
        }
    }, [room_id]);

    // useEffect(() => {
    //     socketInstance.on("receive", async (data) => {
    //         console.log(data, 'onetime');
    //         const newMessage = {
    //             msg: data.message,
    //             seen: data.seen,
    //             id: data.id,
    //             time: Date.now()
    //         };
    //         // console.log(newMessage, 'receivenewmess');
    //         setSelcMsg(prevSelcMsg => ({
    //             ...prevSelcMsg,
    //             Message: [...prevSelcMsg.Message, newMessage]
    //         }));
    //         setTimeout(async () => {
    //             await msgSeen(room_id);
    //         }, [2000])
    //     });
    // }, [])

    const inputRef = useRef(null);

    const chatContainerRef = useRef(null);

    const truncateMsg = "I Have Something to ask?"

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [selcMsg]);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        // console.log(`${date.getHours()}:${date.getMinutes()}`, 'formatTIme');

        return `${date.getHours()}:${date.getMinutes()}`;
    };

    useEffect(() => {
        if (location?.state) {
            setShowd(location?.state?.id);
            getOneTicket(location?.state?.id);
            msgSeen(location?.state?.id);
            updateAgeById(location?.state?.id);
            setTimeout(() => {
                navigate(location.pathname, { replace: true, state: null });
                getTickets()
            }, 5000)
        }
    }, [location?.state?.id])

    const left = (
        <div className="bxshade">
            <div className='livechat-banner' >
                <div className="livechathead display-2">
                    <div className='display-1'>
                        {!isLgUp && <ArrowBackIosIcon onClick={handleChangeMobView} />}
                        <div className='Live-tet'>
                            Support
                        </div>
                    </div>
                    <Stack direction="row" spacing={-0.5}>

                        <Avatar
                            // key={i}
                            alt="Chat Member"
                            src={showd}
                            sx={{ width: 40, height: 40 }}
                        />

                    </Stack>
                </div>
                {!showd && <div className='text-center createtk'>
                    <AddCircleOutlineRoundedIcon className='cursor maincreate' onClick={handleOpen} />
                    <div className='Live-tet text-center'>
                        Create Ticket
                    </div>
                </div>}
                {

                    loader ?
                        <div style={{ height: "80vh", width: "100%" }} >
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
                        </div> :
                        selcMsg?.Message?.length > 0 &&
                        selcMsg?.Message.map((item, index) => {
                            return (
                                item?.id === "admin" ?
                                    <div className='leftsidechat' key={index}
                                        style={{ background: `${formatTime(item?.time) === formatTime(location?.state?.time) && item?.notification_id === location?.state?.notify ? 'var(--theme-color) ' : ''}` }}
                                    >
                                        <div className="display-1 mappedchat left">
                                            <Avatar
                                                alt="Chat Member"
                                                src={showd}
                                                sx={{ width: 52, height: 52 }}
                                            />
                                            <div className='chat-memname'>
                                                {/* Sankar */}
                                                <span> at {getTimeOrDateFromTimestamp(item?.time)}</span>
                                                <div className='chat-message left' >
                                                    {item?.msg}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    :
                                    <div className='rightsidechat' key={index} >
                                        <div className="display-1 mappedchat right">
                                            <div className='chat-memname'>
                                                <span>at {getTimeOrDateFromTimestamp(item?.time)}</span>
                                                {/* Sankar */}
                                                <div className='chat-message right' >
                                                    {item?.msg}
                                                </div>
                                            </div>
                                            <Avatar
                                                // key={i}
                                                alt="Chat Member"
                                                src={ticketData?.user?.image ? ticketData?.user?.image : playCard[0].img}
                                                sx={{ width: 52, height: 52 }}
                                            />
                                        </div>
                                    </div>
                            )
                        })}

            </div>
            {
                ticketData.Status == 'closed' ?
                    <div className='reason-txt'>
                        {`Your Ticket is Closed Reason:${ticketData.reason}`}
                    </div>
                    :

                    showd && <div className='livechat-type display-1'>
                        <TextField
                            id="outlined-basic"
                            placeholder="Type Something"
                            variant="outlined"
                            value={emoji}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            ref={inputRef}
                        />
                        <Stack direction="row" spacing={2}>


                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.1423 16.3569C7.27254 16.3569 8.99944 14.63 8.99944 12.4997C8.99944 10.3695 7.27254 8.64258 5.1423 8.64258C3.01206 8.64258 1.28516 10.3695 1.28516 12.4997C1.28516 14.63 3.01206 16.3569 5.1423 16.3569Z" stroke="#7A7A7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M19.7136 23.6425C21.8438 23.6425 23.5707 21.9156 23.5707 19.7854C23.5707 17.6551 21.8438 15.9282 19.7136 15.9282C17.5833 15.9282 15.8564 17.6551 15.8564 19.7854C15.8564 21.9156 17.5833 23.6425 19.7136 23.6425Z" stroke="#7A7A7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M19.7136 9.07122C21.8438 9.07122 23.5707 7.34432 23.5707 5.21408C23.5707 3.08384 21.8438 1.35693 19.7136 1.35693C17.5833 1.35693 15.8564 3.08384 15.8564 5.21408C15.8564 7.34432 17.5833 9.07122 19.7136 9.07122Z" stroke="#7A7A7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8.58789 10.7854L16.2679 6.92822" stroke="#7A7A7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8.58789 14.2139L16.2679 18.071" stroke="#7A7A7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div onClick={handleSubmit} className='cursor'>
                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.6844 19.343L14.425 23.0784C14.6572 23.3107 14.9449 23.4797 15.2608 23.5694C15.5766 23.6592 15.9102 23.6667 16.2299 23.5913C16.5495 23.5159 16.8445 23.3601 17.087 23.1386C17.3295 22.9172 17.5113 22.6374 17.6152 22.3259L23.7541 3.89216C23.8675 3.55284 23.8841 3.18865 23.802 2.84044C23.7199 2.49222 23.5424 2.17377 23.2895 1.9208C23.0365 1.66782 22.718 1.49035 22.3698 1.40828C22.0216 1.3262 21.6574 1.34279 21.3181 1.45616L2.88439 7.60016C2.57386 7.70451 2.29507 7.8863 2.07434 8.12836C1.85361 8.37043 1.69825 8.66477 1.62292 8.98358C1.54759 9.3024 1.55479 9.63515 1.64384 9.9504C1.73288 10.2657 1.90083 10.553 2.13182 10.7853L6.83068 15.4893L6.67125 21.4293L10.6844 19.343Z" stroke="#7A7A7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M23.2042 1.84033L6.83105 15.4895" stroke="#7A7A7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                        </Stack>
                    </div>
            }
        </div>
    )

    const right = (
        <div className='livechat-banner bxshade'>
            <div className="livechathead display-2">
                <div className='display-2'>
                    <div className='Live-tet'>
                        Chats
                    </div>

                </div>
                <Tooltip title="Rise Ticket">
                    <AddCircleOutlineRoundedIcon className='cursor' onClick={handleOpen} />
                </Tooltip>

            </div>
            {playCard.map((row, i) => {
                return (
                    <div key={i} className={row._id === showd ? 'active display-2 cursor' : 'display-2 cursor nonactive'}
                        onClick={(() => {
                            setShowd(row._id);
                            getOneTicket(row._id);
                            // setSelcMsg(row);
                            msgSeen(row?._id);
                            updateAgeById(row?._id);
                            // joinRoom(row._id);
                            { !isLgUp && handleChangeMobView(i) }
                        })}>
                        <div className='display-1'>
                            <Avatar
                                // key={i}
                                alt="Chat Member"
                                src={row.img}
                                sx={{ width: 40, height: 40 }}
                            />
                            <div className="tc-name-main">
                                {/* <div className="tc-name">{row?.user?.name}</div> */}
                                <div className="tc-name">{row?.Title}</div>
                                {/* {truncateMsg.slice(0, 18) + "..."} */}
                            </div>

                        </div>
                        {
                            row?.msgcount > 0 &&
                            <div className="tickcunt">
                                {row?.msgcount}
                            </div>
                        }

                        <div>
                            {getTimeOrDateFromTimestamp(row?.lastMsgTime)}
                        </div>

                    </div>
                )
            })}

            {
                playCard?.length === 0 &&
                <div className='display-2 cursor nonactive'>
                    <div className='display-1'>
                        <div className="tc-name-main">
                            No Chats
                        </div>
                    </div>
                </div>
            }
        </div>
    )

    return (
        <>
            <ToastContainer />
            <div className='livechat-main'>
                <Header />
                <Box sx={{ display: isLgUp ? 'flex' : 'block' }}>

                    {/* {
                        usertype === 'organization' || subAdminDetails?.access?.support === true ? */}

                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            py: 1,
                            marginTop: "5px",
                            // height: '100vh'
                        }}
                    >
                        <Grid container spacing={0}>
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={8}
                                xl={9}
                            // style={{ padding: '20px' }}
                            >

                                {!isLgUp && !mobView ? right : !isLgUp && mobView ? left : left}

                            </Grid>
                            <Grid
                                item
                                xs={false}
                                sm={false}
                                md={false}
                                lg={4}
                                xl={3}
                            // style={{ padding: '20px' }}
                            >

                                {isLgUp && right}

                            </Grid>
                        </Grid>
                    </Box>
                    {/* :
                            <Box
                                component="main"
                                sx={{
                                    flexGrow: 1,
                                    py: 1,
                                    marginTop: "80px",
                                    // height: '100vh'
                                }}
                            >
                                You Dont Have Permission To View
                            </Box>
                    } */}
                </Box>

                <Modal
                    open={open}
                    // onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className='mdl-cls'
                >
                    <Box sx={style}>
                        <div className="text-right clox cursor">
                            <CancelIcon onClick={handleClose} sx={{ fill: 'var(--theme-color) ' }} />
                        </div>
                        <div className='Live-tet'>
                            Create Your Ticket
                        </div>
                        <div className="margin-top" style={{ flexFlow: 'wrap' }}>
                            <div className='email-filed1'>
                                <TextField
                                    inputProps={{ autoComplete: 'off' }}
                                    fullWidth id="fullWidth"
                                    placeholder='Title'
                                    onChange={(e) => { setTitle(e.target.value); setTitleErr(null) }}
                                />
                            </div>
                            {titleErr && <p style={{ color: 'red' }}>{titleErr}</p>}
                            <div className='email-filed1'>

                                <TextField
                                    id="outlined-multiline-static"
                                    // label="Multiline"
                                    multiline
                                    rows={4}
                                    placeholder='Enter your Message'
                                    onChange={(e) => { setMsg(e.target.value); setMsgErr(null) }}
                                />
                            </div>
                            {msgErr && <p style={{ color: 'red' }}>{msgErr}</p>}
                        </div>
                        <div className="text-left avt-tbn margin-top">
                            {
                                load ? <Button >
                                    Proccessing...
                                </Button> :
                                    <Button onClick={() => { createTicket() }} >
                                        Create Ticket
                                    </Button>
                            }
                        </div>
                    </Box>
                </Modal>
            </div>
        </>
    )
}

export default SupportNew