import { Button, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorModeValue } from '@chakra-ui/react'
import './student.css'
import { useEffect, useState } from 'react'
import UpcomingMeetings from '../../teacher/dashboard/UpcomingMeeting'
import MissedMeetings from '../../teacher/dashboard/MissedMeeting'
import CompletedMeetings from '../../teacher/dashboard/CompletedMeeting'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import useUserStore from '../../../stores/student/userStore'
import Upcoming from './tabs/Upcoming'
import Missed from './tabs/Missed'
import Completed from './tabs/Completed'
import ApiServices from 'meet-hour-react-web-sdk'
import useCompletedMeetingsStore from '../../../stores/student/completedMeetingStore'
import useFetchCompletedMeetings from '../../../hooks/student/useFetchCompletedMeetings'
import useFetchMissedMeetings from '../../../hooks/student/useFetchMissedMeetings'


const StudentDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const { user, setUser, fetchUser } = useUserStore();
  const [completedMeetings, setCompletedMeetings] = useState([])
  const [isCompletedLoading, setIsCompletedLoading] = useState([])
  const [completedError, setCompletedError] = useState([])

  const [missedMeetings, setMissedMeetings] = useState([])
  const [isMissedLoading, setIsMissedLoading] = useState([]);
  const [missedError, setMissedError] = useState([]);

  const getToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMzl6dDUzdnNxbXYzOGxweGx5c3E1eGxtdDFvdTE3NHV0NXUiLCJqdGkiOiI1ODI5MDhhNzM4Y2M2NDlkOTJlOGM2OTNlODgzZmZiMTE1NjA5MmZlZWQ1N2Q0N2I3ZmQxZDY1NGE3ODczODNmYzliYmM0MDFhODIzODYwMCIsImlhdCI6MTcyMzAxOTgzMS42NDM5ODEsIm5iZiI6MTcyMzAxOTgzMS42NDM5ODQsImV4cCI6MTc1NDU1NTgzMS41OTQ5MTIsInN1YiI6IjI5NjgxIiwic2NvcGVzIjpbXX0.W8TImuVR56ZfSdJW_OCM6vWYjWCN4sanr3YQwEXQbSJ2-myiRo3_EF3ERpdYzJsKf5CXkjjDeWk64AOpVFOWQw'


  const navigate = useNavigate()
  const colors = useColorModeValue(
    ['green.50', 'teal.50', 'blue.50'],
    ['green.900', 'teal.900', 'blue.900'],
  )
  const [tabIndex, setTabIndex] = useState(0)
  const bg = colors[tabIndex]

  const tokenCheck = () => {
    if (getToken) {
      setToken(getToken)
      setIsLoggedIn(true);
      fetchUser()
    } else {
      navigate('/student/login')
    }
  }

  // const fetchCompletedMeetings = async () => {
  //   setIsCompletedLoading(true);
  //   try {
  //     const response = await ApiServices.completedMeetings(token, {
  //       limit: 10,
  //       page: 1,
  //       show_all: 1
  //     });
  //     const completedMeetingIds = await response.meetings.map((id) => id.meeting_id)

  //     const completedMeetingDetails = await Promise.all(
  //       completedMeetingIds.map((id) => ApiServices.viewMeeting(token, { meeting_id: id }))
  //     );
  //     // const meetingEmails = meetingDetails.map(e => e.meeting_attendees.email)
  //     const completedMeetingEmails = completedMeetingDetails.flatMap(async detail => {
  //      console.log(detail, 'Step1: detail of completedMeetingDetails')
  //     //  const matchedCompletedData = await detail.meeting_attendees.filter(attendee => attendee.email === user.email).map(() => detail.meeting.meeting_id)
  //      const matchedCompletedData = await detail.meeting_attendees
  //      console.log(matchedCompletedData, "Step2: MATCHED-COMPLETED-DATA from detail")
  //      const matchedData2 = await matchedCompletedData.filter(attendee => attendee.email === user.email)
  //      console.log(matchedData2, "Step3: matchedData2 data of matchedCompletedData") 
  //      const matchedMappedData = await matchedData2.map(() => detail.meeting.meeting_id)
  //      console.log(matchedMappedData, "Step4: matchedMappedData data of matchedData2")
  //      return matchedMappedData
  //     });
  //       console.log(completedMeetingEmails, "Step 5: Completed Meeting Emails Data after multiple steps")
  //     const matchedCompletedMeetings = await completedMeetingIds.filter(meetData => meetData.length > 0 ? meetData === )
  //     console.log(matchedCompletedMeetings, "Step 6: matchedCompletedMeetings data of completedMeetingEmails")

  //     // const filteredCompletedMeetings = await response.meetings.filter(meeting => 
  //     //   matchedCompletedMeetings.includes(meeting.meeting_id)
  //     // );

  //     // const filteredCompletedMeetings = await matchedCompletedMeetings

  //     console.log(filteredCompletedMeetings, 'filteredCompletedMeetings')

  //     setCompletedMeetings(filteredCompletedMeetings)

  //     // const filteredMissedMeetings = response.meetings.filter(meeting => 
  //     //   meeting.meeting.meeting_id === matchedMissedMeetings)
  //     // );
      

  //     // const meetingsWithAttendees = response.meetings.map((meeting) => {
  //     //   const meetingDetail = meetingDetails.find(detail => detail.email === user.email);
  //     //   return {
  //     //     ...meeting,
  //     //     attendees: meetingDetail ? meetingDetail.attendees : [],
  //     //   };
  //     // });
  //     // setMeetings(meetingsWithAttendees);

  //   } catch (error) {
  //     setCompletedError(error.message);
  //   } finally {
  //     setIsCompletedLoading(false);
  //   }
  // };

  const fetchCompletedMeetings = async () => {
    setIsCompletedLoading(true);
    try {
      const response = await ApiServices.completedMeetings(token, {
        limit: 10,
        page: 1,
	show_all: 1
      })
      const completedMeetingIds = await response.meetings.map((id) => id.meeting_id)
      const completedMeetingDetails = await Promise.all(
        completedMeetingIds.map((id) => ApiServices.viewMeeting(token, { meeting_id: id }))
      );

      // const completedMeetingEmails = completedMeetingDetails.map(detail => detail.meeting_attendees.email)
      const completedMeetingEmails = completedMeetingDetails.flatMap(e => {
        return e.meeting_attendees.filter(m => m.email === user.email).map(() => e.meeting.meeting_id)})
      console.log(completedMeetingEmails, "response of completed meeting123 emails data")
      

      const matchedCompletedMeetings = completedMeetingIds.filter(m => completedMeetingEmails.includes(m));
      console.log(matchedCompletedMeetings, "response of matched completed meeting ID...")

      const filteredCompletedMeetings = await response.meetings.filter(meeting => 
        matchedCompletedMeetings.includes(meeting.meeting_id)
      );
      console.log(filteredCompletedMeetings, "FILTERED....")
      setCompletedMeetings(filteredCompletedMeetings)
      
    } catch (error) {
      setCompletedError(error.message);
    } finally {
      setIsCompletedLoading(false);
    }
  };

  const fetchMissedMeetings = async () => {
    setIsMissedLoading(true);
    try {
      const response = await ApiServices.missedMeetings(token, {
        limit: 10,
        page: 1,
      });
      const meetingIds = await response.meetings.map((m) => m.meeting_id)

      const missedMeetingDetails = await Promise.all(
        meetingIds.map((id) => ApiServices.viewMeeting(token, { meeting_id: id }))
      );

      // const meetingEmails = meetingDetails.map(e => e.meeting_attendees.email)
      
      const missedMeetingEmails = missedMeetingDetails.flatMap(e => {
        return e.meeting_attendees.filter(m => m.email === user.email).map(() => e.meeting.meeting_id)});

      const matchedMissedMeetings = meetingIds.filter(m => missedMeetingEmails.includes(m));

      const filteredMissedMeetings = await response.meetings.filter(meeting => 
        matchedMissedMeetings.includes(meeting.meeting_id)
      );
      setMissedMeetings(filteredMissedMeetings)

      // const filteredMissedMeetings = response.meetings.filter(meeting => 
      //   meeting.meeting.meeting_id === matchedMissedMeetings)
      // );
      

      // const meetingsWithAttendees = response.meetings.map((meeting) => {
      //   const meetingDetail = meetingDetails.find(detail => detail.email === user.email);
      //   return {
      //     ...meeting,
      //     attendees: meetingDetail ? meetingDetail.attendees : [],
      //   };
      // });
      // setMeetings(meetingsWithAttendees);

    } catch (error) {
      setMissedError(error.message);
    } finally {
      setIsMissedLoading(false);
    }
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('student_token');
    navigate('/student/login');
    setIsLoggedIn(false);
  };
  
  return (
    <div className="student-container">
      <div className="student-hero">
        <Text as="h3">Hello, {user ? `${user.first_name}` : `Student`}!</Text>
        <Button mt={5} onClick={handleLogout}>Logout</Button>
      </div>
      <div className='tabs-container'>
        <Tabs borderRadius="25px" isFitted onChange={(index) => setTabIndex(index)} bg={bg}>
          <TabList>
            <Tab>Upcoming</Tab>
            <Tab>Missed</Tab>
            <Tab>Completed</Tab>
          </TabList>
          <TabPanels p='2rem'>
            <TabPanel><Upcoming tabIndex={tabIndex}/></TabPanel>
            {user !== null ? <TabPanel><Missed user={user} fetchMissedMeetings={fetchMissedMeetings} missedMeetings={missedMeetings}/></TabPanel>
             : <></>}
             {user !== null ? <TabPanel><Completed user={user} fetchCompletedMeetings={fetchCompletedMeetings} completedMeetings={completedMeetings}/></TabPanel> : <></>}
          </TabPanels>
        </Tabs>
      </div>
    </div>
  )
}

export default StudentDashboard