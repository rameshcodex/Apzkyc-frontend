import React from 'react'
import coming from './Images/err.png'
import Header from './Business/Components/Header/Header'
import Sidebar from './Business/Components/SideBar/Sidebar'
import { Box } from '@mui/material'
import { Button } from '@mui/material'
// import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Comingsoon() {
    const navigate = useNavigate()
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                {/* <CssBaseline /> */}
                {<Sidebar />}
                <Box component="main" sx={{ flexGrow: 1, p: 0 }} className='udbg'>
                    <div className='comingsoon text-center'>

                        <img src={coming} alt="coming" />


                    </div>
                    <div className="Coms text-center">
                        404 - Page not found
                    </div>

                    <div className="avt-tbn margin-top text-center" >
                        <Button onClick={(() => { navigate('/') })}>
                            Go to HomePage
                        </Button>
                    </div>
                </Box>
            </Box>
            {/* <Sidebar /> */}

        </>

    )
}

export default Comingsoon
