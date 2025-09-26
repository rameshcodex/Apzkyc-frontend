import React, { useEffect, useState, useRef } from "react";
import {
    Box,
    TextField,
    Paper,
    Typography,
    Container,
    Button,
    IconButton,
    createTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LogoutIcon from "@mui/icons-material/Logout";
import { io } from "socket.io-client";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Axios from "../../../Axios";
import consts from "../../../constant";

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#f50057',
        },
        background: {
            default: '#f9f9f9',
        },
    },
});

const socket = io(consts.socketUrl, { path: "/socket" });

const PlanSubChat = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const userData = location?.state?.datass;
    const userId = userData?._id;
    const name = userData?.name;
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!userData) {
            toast.error("User data is missing");
            navigate("/login");
            return;
        }

        if (userId && name) {
            socket.emit("join_user", { userId, name });
            Axios.get(`/users/plansupportmessage/${userId}`)
                .then((response) => {
                    setMessages(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching messages:", error);
                });

            socket.on("receive_message", (newMessage) => {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });

            return () => {
                socket.off("receive_message");
            };
        }
    }, [userId, name, navigate, userData]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = () => {
        if (message.trim()) {
            const timestamp = new Date().toISOString();
            socket.emit("user_message", { userId, message, name });

            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "user", message, name, createdAt: timestamp },
            ]);
            setMessage("");
        }
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
        });
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f9f9f9" }}>
            <Toaster />
            <Container maxWidth="sm">
                <Paper elevation={4} sx={{ display: "flex", flexDirection: "column", height: "80vh", overflow: "hidden", borderRadius: 2 }}>
                    <Box sx={{ p: 2, backgroundColor: "#1976d2", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h6">Chat</Typography>
                        <IconButton color="inherit" onClick={() => navigate("/login")}>
                            <LogoutIcon />
                        </IconButton>
                    </Box>

                    <Box sx={{ flex: 1, p: 2, overflowY: "auto", backgroundColor: "#f4f6f9", borderRadius: 2, boxShadow: 1, display: "flex", flexDirection: "column" }}>
                        {messages.map((msg, index) => (
                            <Box key={index} sx={{ mb: 1, display: "flex", justifyContent: msg.sender === "user" ? "flex-end" : "flex-start" }}>
                                <Box sx={{ p: 2, borderRadius: 2, maxWidth: "75%", backgroundColor: msg.sender === "user" ? "#1976d2" : "#81c784", color: "white", boxShadow: 1 }}>
                                    <Typography variant="body1">
                                        <strong>{msg.sender === "user" ? name : "Admin"}:</strong> {msg.message}
                                    </Typography>
                                    <Typography variant="caption">{formatTimestamp(msg.createdAt)}</Typography>
                                </Box>
                            </Box>
                        ))}
                        <div ref={messagesEndRef} />
                    </Box>

                    <Box
                        sx={{
                            p: 2,
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "#ffffff",
                            borderRadius: "8px",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Type a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            sx={{
                                mr: 1,
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px",
                                    backgroundColor: "#f9f9f9",
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#ddd",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#ccc",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#1976d2",
                                },
                            }}
                        />
                        <Button
                            sx={{
                                p: 1.5,
                                minWidth: "auto",
                                fontSize: { xs: "0.85rem", sm: "1rem" },
                                backgroundColor: "#1976d2",
                                color: "#fff",
                                borderRadius: "50%",
                                width: "48px",
                                height: "48px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                "&:hover": {
                                    backgroundColor: "#115293",
                                },
                            }}
                            variant="contained"
                            onClick={handleSendMessage}
                        >
                            <SendIcon sx={{ fontSize: "1.5rem" }} />
                        </Button>
                    </Box>

                </Paper>
            </Container>
        </Box >
    );
};

export default PlanSubChat;
