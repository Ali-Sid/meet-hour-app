import { CalendarIcon, TimeIcon } from '@chakra-ui/icons';
import { Box, Card, CardBody, CardHeader, Heading, HStack, Text } from '@chakra-ui/react';
import ApiServices from 'meet-hour-react-web-sdk';
import React, { useState, useEffect } from 'react';
import useUserStore from '../../../../stores/student/userStore';
import useFetchMissedMeetings from '../../../../hooks/student/useFetchMissedMeetings';
import useMissedMeetingsStore from '../../../../stores/student/missedMeetingStore';

const MissedMeetings = ({tabIndex}) => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [meetingIds, setMeetingIds] = useState([])
  const [views, setViews] = useState([])
  // const { user, fetchUser } = useUserStore();

  useFetchMissedMeetings()

  const { missedMeetings, isMissedLoading, missedError } = useMissedMeetingsStore();

  // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMzl6dDUzdnNxbXYzOGxweGx5c3E1eGxtdDFvdTE3NHV0NXUiLCJqdGkiOiI1ODI5MDhhNzM4Y2M2NDlkOTJlOGM2OTNlODgzZmZiMTE1NjA5MmZlZWQ1N2Q0N2I3ZmQxZDY1NGE3ODczODNmYzliYmM0MDFhODIzODYwMCIsImlhdCI6MTcyMzAxOTgzMS42NDM5ODEsIm5iZiI6MTcyMzAxOTgzMS42NDM5ODQsImV4cCI6MTc1NDU1NTgzMS41OTQ5MTIsInN1YiI6IjI5NjgxIiwic2NvcGVzIjpbXX0.W8TImuVR56ZfSdJW_OCM6vWYjWCN4sanr3YQwEXQbSJ2-myiRo3_EF3ERpdYzJsKf5CXkjjDeWk64AOpVFOWQw'

  // const fetchMeetings = async () => {
  //   if (!user) return;
  //   setLoading(true);
  //   try {
  //     const response = await ApiServices.missedMeetings(token, {
  //       limit: 10,
  //       page: 1,
  //     });
  //     console.log(response, "missedMeetings==");
  //     setMeetings(response.meetings);
  //     setMeetingIds(response.meetings.map((m) => m.meeting_id))

  //     const meetingDetails = await Promise.all(
  //       meetingIds.map((id) => ApiServices.viewMeeting(token, { meeting_id: id }))
  //     );
  //     console.log(meetingDetails, 'viewMeeting================================')

  //     // const meetingEmails = meetingDetails.map(e => e.meeting_attendees.email)
      
  //     const meetingEmails = meetingDetails.flatMap(e => {
  //       console.log(e, "all details: ")
  //       return e.meeting_attendees.filter(m => m.email === user.email).map(() => e.meeting.meeting_id)});
  //     console.log(meetingEmails, "email meetiiiiiiiiiiiing details")
  //     console.log(meetingIds, "88888888")

  //     const matchedMissedMeetings = meetingIds.filter(m => meetingEmails.includes(m));
  //     console.log(matchedMissedMeetings, "meetings maatccheeddd!!!")

  //     const filteredMissedMeetings = await response.meetings.filter(meeting => 
  //       matchedMissedMeetings.includes(meeting.meeting_id)
  //     );

  //     setMeetings(filteredMissedMeetings)

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
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //     console.log(user.email, "user's email")
  //     console.log(meetings, "mmmmmm132132132123")
  //   }
  // };

  // useEffect(() => {
  //   fetchMeetings()
  // }, [user]);

  if (isMissedLoading) {
    return <div>Loading...</div>;
  }

  if (missedError) {
    return <div>Error: {error}</div>;
  }

  // console.log(user, "user detailss")
  // console.log(meetings.map((m) => m.meeting_id), "meetings data")
  // console.log(meetingIds, "what the hellll?")
  // console.log(meetings, "meetingsssss")




  return (
    <div>
      <Text sx={{ marginBottom: "10px" }} as="h3">Missed Classes</Text>
      <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {missedMeetings.map((meeting) => (
          <Card key={meeting.meeting_id}>
            <CardHeader><Heading size='md'>{meeting.title || meeting.topic || meeting.agenda}</Heading></CardHeader>
            <CardBody>
              <HStack justifyContent='space-between'>
                <Box display='flex' flexDirection='row' alignItems='center' gap={2}><Box display='flex' flexDirection='row' gap={1} alignItems='center'><CalendarIcon /><Text py={2} color='grey'>{new Date(meeting.start_time).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</Text></Box><Box display='flex' flexDirection='row' gap={1} alignItems='center'><TimeIcon /><Text py={2} color='grey'>{new Date(meeting.start_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</Text></Box></Box>
              </HStack>
            </CardBody>
            {/* <span>
              {meeting.title} - {meeting.start_time} - {meeting.joinURL}
            </span> */}
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default MissedMeetings;