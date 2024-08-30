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
    <div className="dashboard">
    <div style={{width: "95vw"}}>
    <h2>Welcome to Your Dashboard</h2>
    <Button onClick={handleLogout}>Logout</Button>
    {/* <nav className="dashboard-nav">
      <ul>
        <li><a href="#create-meeting">Create Meeting</a></li>
        <li><a href="#scheduled-meetings">Scheduled Meetings</a></li>
        <li><a href="#calendar">Calendar</a></li>
      </ul>
    </nav> */}
    </div>
    {/* <section className="quick-actions">
      <button onClick={toggleCreateMeeting}>Create New Meeting</button>
      <button onClick={toggleViewMeeting}>View Scheduled Meetings</button>
      <button onClick={toggleMissedMeeting}>Missed Meetings</button>
      <button onClick={toggleCompleteMeeting}>Completed Meetings</button>
    </section> */}
    <section>
    <Tabs borderRadius="25px" isFitted onChange={(index) => setTabIndex(index)} bg={bg}>
        <TabList>
          <Tab>Create New</Tab>
          <Tab>Upcoming</Tab>
          <Tab>Missed</Tab>
          <Tab>Completed</Tab>
        </TabList>
        <TabPanels p='2rem'>
          <TabPanel><MeetingForm /></TabPanel>
          <TabPanel><UpcomingMeetings /></TabPanel>
          <TabPanel><MissedMeetings /></TabPanel>
          <TabPanel><CompletedMeetings /></TabPanel>
        </TabPanels>
      </Tabs>
    </section>
    {/* <section id="create-meeting" className="dashboard-section">
      {isCreateMeetingActive && (
        <MeetingForm />
      )}
    </section>
    <section id="view-meeting" className="dashboard-section">
      {isViewMeeting && (
        <UpcomingMeetings />
      )}
    </section>
    <section id="create-meeting" className="dashboard-section">
      {isMissedMeeting && (
        <MissedMeetings />
      )}
    </section>
    <section id="view-meeting" className="dashboard-section">
      {isCompletedMeeting && (
        <CompletedMeetings />
      )}
    </section> */}
    <section id="scheduled-meetings" className="dashboard-section">
      <h3 style={{marginBottom: "10px"}}>Active Class</h3>
      {isMeetingActive ? (
          <MeetHourComponent />
      ) : (
        <Button onClick={toggleMeeting}>Start Instant Class</Button>
      )}
    </section>
    <section id="calendar" className="dashboard-section">
      
    </section>
  </div>
  );
}

export default TeacherDashboard;
