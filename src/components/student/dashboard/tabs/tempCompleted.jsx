import { CalendarIcon, TimeIcon } from '@chakra-ui/icons';
import { Box, Card, CardBody, CardHeader, Heading, HStack, Text } from '@chakra-ui/react';
import ApiServices from 'meet-hour-react-web-sdk';
import React, { useState, useEffect } from 'react';
import useUserStore from '../../../../stores/student/userStore';
import useCompletedMeetingsStore from '../../../../stores/student/completedMeetingStore';

const Completed = ({completedMeetings}) => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [meetingIds, setMeetingIds] = useState([]);
  const { user, fetchUser } = useUserStore();
  // const { completedMeetings } = useCompletedMeetingsStore();

  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMzl6dDUzdnNxbXYzOGxweGx5c3E1eGxtdDFvdTE3NHV0NXUiLCJqdGkiOiI1ODI5MDhhNzM4Y2M2NDlkOTJlOGM2OTNlODgzZmZiMTE1NjA5MmZlZWQ1N2Q0N2I3ZmQxZDY1NGE3ODczODNmYzliYmM0MDFhODIzODYwMCIsImlhdCI6MTcyMzAxOTgzMS42NDM5ODEsIm5iZiI6MTcyMzAxOTgzMS42NDM5ODQsImV4cCI6MTc1NDU1NTgzMS41OTQ5MTIsInN1YiI6IjI5NjgxIiwic2NvcGVzIjpbXX0.W8TImuVR56ZfSdJW_OCM6vWYjWCN4sanr3YQwEXQbSJ2-myiRo3_EF3ERpdYzJsKf5CXkjjDeWk64AOpVFOWQw'


  // if (isCompletedLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (completedError) {
  //   return <div>Error: {error}</div>;
  // }




  return (
    <div>
      <Text sx={{ marginBottom: "10px" }} as="h3">Completed Classes</Text>
      <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {completedMeetings.map((meeting) => (
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

export default Completed;