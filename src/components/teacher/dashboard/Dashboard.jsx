import React, { useEffect, useState } from 'react';
import './TeacherDashboard.css';
import MeetHourComponent from './MeetHourComponent';
import MeetingForm from './MeetingForm';
import { Button, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from '@chakra-ui/react';
import UpcomingMeetings from './UpcomingMeeting';
import MissedMeetings from './MissedMeeting';
import CompletedMeetings from './CompletedMeeting';
import { Navigate, useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const [isMeetingActive, setIsMeetingActive] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  // const [isCreateMeetingActive, setIsCreateMeetingActive] = useState(false);
  // const [isViewMeeting, setIsViewMeeting] = useState(false);
  // const [isMissedMeeting, setIsMissedMeeting] = useState(false);
  // const [isCompletedMeeting, setIsCompletedMeeting] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('teacher_token');
    if (token) {
      setToken(token)
      setIsLoggedIn(true);
    } else {
      navigate('/teacher/login')
    }
  }, []);



  const handleLogout = () => {
    localStorage.removeItem('teacher_token');
    navigate('/teacher/login');
    setIsLoggedIn(false);
  };
  
  const toggleMeeting = () => {
    setIsMeetingActive(!isMeetingActive);
  };

  // const toggleCreateMeeting = () => {
  //   setIsCreateMeetingActive(!isCreateMeetingActive);
  // }

  // const toggleViewMeeting = () => {
  //   setIsViewMeeting(!isViewMeeting);
  // }

  // const toggleMissedMeeting = () => {
  //   setIsMissedMeeting(!isMissedMeeting)
  // }

  // const toggleCompleteMeeting = () => {
  //   setIsCompletedMeeting(!isCompletedMeeting)
  // }

  const colors = useColorModeValue(
    ['cyan.50', 'green.50', 'teal.50', 'blue.50'],
    ['cyan.900', 'green.900', 'teal.900', 'blue.900'],
  )
  const [tabIndex, setTabIndex] = useState(0)
  const bg = colors[tabIndex]

  return (
    <div className='dashboard'>
      <h2 style={{fontWeight: "500"}}>Good morning, Mike!</h2>
    </div>
  );
}

export default TeacherDashboard;
