import React, { useState, useEffect, useRef } from 'react'
import './Integration.css'
import { Box } from '@mui/material'
import Sidebar from '../SideBar/Sidebar'
import { Grid } from '@mui/material'
import { Button, useTheme, useMediaQuery, styled, Snackbar, Tabs, Tab, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

function Integration() {

    const theme = useTheme();
    const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

    const [accord, setAccord] = useState([
        {
            name: 'What is API integration?',
            content: `
             API integration is the process of using APIs to connect two or more software systems in order to facilitate the seamless transfer of data.

                                        APIs are code-based instructions that enable different software components to communicate. If you think of APIs as the building blocks of modern applications, API integration is like the mortar—it's what actually holds the APIs together. Teams can integrate private APIs in order to build highly scalable microservice meshes, or they can incorporate third-party functionality into their application by integrating a public API. APIs are powerful on their own, but API integration is what unlocks the most sophisticated use cases, such as the automation of business-critical workflows.
            `},
        {
            name: 'What is API authentication?',
            content: `
                API authentication is the process of verifying the identity of a user who is making an API request, and it is a crucial pillar of API security. There are many types of API authentication, such as HTTP basic authentication, API key authentication, JWT, and OAuth, and each one has its own benefits, trade-offs, and ideal use cases. Nevertheless, all API authentication mechanisms share the goal of protecting sensitive data and ensuring the API is not misused.

Here, we'll discuss the primary benefits of API authentication, review some common methods of API authentication, explain the difference between API authentication and API authorization, and explore some API authentication best practices. We'll also highlight how the Postman API Platform supports healthy API authentication practices for producers and consumers alike.
                `},
        {
            name: 'What is API versioning?',
            content: `
                       API versioning is the process of managing and tracking changes to an API. It also involves communicating those changes to the API's consumers.

Change is a natural part of API development. Sometimes, developers have to update their API's code to fix security vulnerabilities, while other changes introduce new features or functionality. Some changes do not affect consumers at all, while others, which are known as “breaking changes,” lead to backward-compatibility issues, such as unexpected errors and data corruption. API versioning ensures that these changes are rolled out successfully in order to preserve consumer trust while keeping the API secure, bug-free, and highly performant.
                        `},
        {
            name: 'What is API test automation?',
            content: `
                                      API test automation is the process of using a testing tool to programmatically execute API tests at certain times or frequencies, or in CI/CD pipelines. It is particularly important for agile development teams, as it enables them to maintain fast-paced development cycles while continuously and systematically verifying that their API is working as expected. API test automation helps prevent breaking changes from reaching production, and it is intended to augment—rather than replace—the manual approach. Teams that automate their API tests are able to deliver new features quickly and confidently while conserving developer bandwidth.
                                        `},

    ])

    return (
        <div className='integration'>
            <Box sx={{ display: isLgUp ? 'flex' : 'block' }}>
                <Sidebar />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        py: 1,
                        marginTop: "50px",
                        // height: '100vh'
                        p: 5
                    }}
                >
                    <Grid container spacing={2} justifyContent={'center'}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <h2>API integration</h2>
                            {accord.map((row, i) => {
                                return (
                                    <Accordion className='integration-accord margin-top'>
                                        <AccordionSummary
                                            expandIcon={<AddIcon />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                        >
                                            <h3>{row.name}</h3>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography className='typo'>
                                                {row.content}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                )
                            })}


                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div>
    )
}

export default Integration
