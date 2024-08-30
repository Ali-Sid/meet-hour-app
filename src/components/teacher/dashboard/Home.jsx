import React from 'react'
import StudentDashboard from '../../student/dashboard/Dashboard'
import TeacherDashboard from './Dashboard'
import Sidebar from './utils/Sidebar'
import Navbar from './utils/Navbar'
import { Box, useColorMode } from '@chakra-ui/react'

const TeacherHome = () => {
    const { colorMode } = useColorMode();

  return (
    <Box bg={colorMode === 'light' ? 'linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)' : 'linear-gradient(60deg, #29323c 0%, #485563 100%)'} transition="background-color 0.2s, background-image 0.2s" style={{display: "flex", flexDirection: "row", width: "100vw", height: "100vh"}}>
        <div style={{width: "10%", height: "100%"}}><Sidebar /></div>
        <div style={{width: "90%", height: "100%"}}>
            <div style={{height: "10%"}}><Navbar /></div>
            <div style={{height: "90%"}}><TeacherDashboard /></div>
        </div>
    </Box>
  )
}

export default TeacherHome