import React from 'react'
import "./Sidebar.css"
import { RiHome6Line } from "react-icons/ri";
import { SiGooglemeet } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";

function Sidebar() {
  return (
    <div className='sidebar'>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}><SiGooglemeet size='25px' /></div>
      <div className='div2-container'>
        <div className='div2'><RiHome6Line size='25px' /></div>
        <div className='div2'><RiHome6Line size='25px' /></div>
        <div className='div2'><RiHome6Line size='25px' /></div>
        <div className='div2'><RiHome6Line size='25px' /></div>
      </div>
      <div className='div2'><AiOutlineLogout size='25px' /></div>
    </div>
  )
}

export default Sidebar