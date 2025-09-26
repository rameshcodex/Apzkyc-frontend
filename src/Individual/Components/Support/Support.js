import React, { useState,useEffect, useRef } from 'react';
import {
  Box, TextField, Button, List, ListItem, ListItemText, Avatar, Typography, Paper, Divider, Grid, Stepper
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { deepPurple, deepOrange } from '@mui/material/colors';
import './Support.css'
import Header from '../Header/Header'
import HelpCenter from '../Kyc/HelpCenter';

const Support    = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() !== '') {
      const newMessage = {
        text: input,
        timestamp: new Date().toLocaleTimeString(),
        sender: 'You', // Placeholder sender
      };
      setMessages([...messages, newMessage]);
      setInput('');
    }
  };

  const [msg, setMsg] = useState([]);
  const chatEndRef = useRef(null);

  const addMessage = (message) => {
    setMsg((prevMessages) => [...prevMessages, message]);
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [msg]);

  
  return (
    <div className='chatBox'>
    <Header />
    <Grid container className='margin-top support_whole_grid' sx={{ height: '88%' }}>
        <Grid xs={12} sm={12} md={12} lg={3} xl={4} className='dcBk'>
                    <div className="support-left-main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
                    <HelpCenter />
                       
                    </div>
        </Grid>

        <Grid xs={12} sm={12} md={12} lg={9} xl={8}>
        <Box className='ChatBox_grid_box'>
        <Typography variant="h5" gutterBottom className='display-1'>
        Minerva Barnett
        <div><span>Friends</span></div>
        </Typography>
        <List sx={{ height: 400, overflowY: 'auto', mt: 2 }}>
            {messages.map((msg, index) => (
                
            <ListItem key={index} alignItems="flex-start">
                <Avatar sx={{ bgcolor: deepPurple[500], mr: 2 }}>
                {msg.sender[0]}
                </Avatar>
                <ListItemText className='sender_chat'
                primary={
                    <React.Fragment className="sender">
                    <Typography
                        component="span"
                        variant="body1"
                        color="text.primary"
                        sx={{ fontWeight: 'bold' }}
                        className="sender"
                    >
                        {msg.sender}
                    </Typography>
                    <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                        sx={{ ml: 2 }}
                        className='current_time'
                    >
                        {msg.timestamp}
                    </Typography>
                    </React.Fragment>
                }
                secondary={msg.text}
              
                />
            </ListItem>
            
            ))}
            <li alignItems="flex-start"  className='userTwoChat'>
                    <Avatar sx={{ bgcolor: deepPurple[500], mr: 2 }}>
                    </Avatar>
                    <ListItemText
                    primary={
                        <React.Fragment>
                        <Typography
                            component="span"
                            variant="body1"
                            color="text.primary"
                            sx={{ fontWeight: 'bold' }}
                            className="sender"
                        >
                        Friend
                        </Typography>
                        <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                            sx={{ ml: 2 }}
                            className='current_time'
                        >
                       3:31:18 PM
                        </Typography>
                        </React.Fragment>
                    }
                    // secondary={msg.text}
                    secondary={
                            <Typography className='receiver_chat'>The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.Contrary to popular belief, Lorem Ipsum is not simply random text is the model text for your company.
                                </Typography>
                    }
                    />
                </li>
        </List>


        <Divider sx={{ mt: 2 }} />
        <Box display="flex" mt={2} className="chat_send_div">
            <TextField
            variant="outlined"
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write massage"
            className='chat_textField'
            />
            <Button
            variant="contained"
            onClick={handleSend}
            endIcon={<SendIcon />}
            sx={{ ml: 2 }}
            className='send_btn'
            >
            Send
            </Button>
        </Box>
        <div ref={chatEndRef} />
        </Box>
        </Grid>

    </Grid>

    </div>
   
  );
};

export default Support;
