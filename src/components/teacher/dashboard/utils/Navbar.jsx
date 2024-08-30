import { Avatar, Text } from '@chakra-ui/react'
import React from 'react'
import './Navbar.css'
import ThemeToggle from './tools/ThemeToggle'

function Navbar() {
  return (
    <div className='navbar'>
        <div><Text fontWeight='400px'>Classroom Scheduler</Text></div>
        <div><ThemeToggle /></div>
        <div><Avatar /></div>
    </div>
  )
}

export default Navbar