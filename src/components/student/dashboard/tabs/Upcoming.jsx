import { CalendarIcon, TimeIcon } from '@chakra-ui/icons'
import { Box, Button, Card, CardBody, CardHeader, Heading, HStack, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaVideo } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import useUserStore from '../../../../stores/student/userStore'

const Upcoming = ({tabIndex}) => {
    const [val, setVal] = useState([])
    const { user, fetchUser } = useUserStore();
    const [token, setToken] = useState(null)
    const navigate = useNavigate()

    // useEffect(() => {
    //     // const token = localStorage.getItem('student_token');
    //     // if (token) {
    //     //   setToken(token)

    //     // fetchUser().then(() => {
    //       fetchData();
    //   // });
    //     // }
    //   }, []);

    const fetchData = async () => {
      if (!user) return;
        try {
            const email = {
                params: {
                    email: user.email
                }
            }
            const response = await axios.get('http://localhost:3000/api/students/upcoming', email)
            setVal(response.data)
            // const currentDate = new Date();
            // const missedMeetings = [];
            // response.data.forEach(value => {
            //   const meetingDate = new Date(value.meeting_date);
            //   if (meetingDate < currentDate) {
            //     missedMeetings.push(value);
            //     console.log(missedMeetings, "missed meetings````````")
            //   } else {
                // setVal(prevState => [...prevState, value]);
              // }
            // });
            // if (missedMeetings.length > 0) {
            //   try {
            //     const movedMeetings = await axios.post('http://localhost:3000/api/students/move-to-missed', missedMeetings);
            //     console.log(movedMeetings.data, "meetings moved to student_missed_data table");
            //   } catch (error) {
            //     console.error(error, "error moving meetings to student_missed_data table");
            //   }
            // }
          } catch (error) {
            console.error(error, "error fetching upcoming class data");
          }
        }

    useEffect(() => {
        fetchData()
    }, [user])


    const handleJoinClass = (meeting) => {
        Promise.all([
          axios.post('http://localhost:3000/api/students/move-to-completed', { id: meeting.id, meetingId: meeting.meeting_id }),
        ])
          .then((responses) => {
            console.log(responses[0].data, "meeting moved to student_completed_data table");
            navigate(meeting.joinURL)
          })
          .catch((error) => {
            console.error(error, "error moving meeting to student_completed_data table");
          });
      }
      
      

    return (
        <div>
            {val.length > 0 ? (
                <ul>
                    {Array.isArray(val) ? (
                        val.map((value) => (
                            <Card key={value.id}>
                                {/* <CardHeader>{value.first_name + " " + value.last_name}</CardHeader> */}
                                <CardHeader>
                                    <Heading size='md'>{value.meeting_topic}</Heading>
                                </CardHeader>
                                <CardBody>
                                    <HStack justifyContent='space-between'>
                                        <Box display='flex' flexDirection='row' alignItems='center' gap={2}><Box display='flex' flexDirection='row' gap={1} alignItems='center'><CalendarIcon /><Text py={2} color='grey'>{new Date(value.meeting_date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</Text></Box><Box display='flex' flexDirection='row' gap={1} alignItems='center'><TimeIcon /><Text py={2} color='grey'>{value.meeting_time}</Text></Box></Box>
                                        <Button as={Link} to={value.joinURL} onClick={handleJoinClass} display='flex' flexDirection='row' alignItems='center' gap={2}><span><Text>Join Class</Text></span> <span><FaVideo /></span></Button>
                                    </HStack>
                                </CardBody>
                            </Card>
                        ))
                    ) : (
                        <Card>
                            <CardHeader>{val.data}</CardHeader>
                        </Card>
                    )}
                </ul>
            ) : (
                <>
                    <Text as='h3'>Data Not available</Text>
                </>
            )}
        </div>
    )
}

export default Upcoming