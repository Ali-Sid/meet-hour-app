import { CalendarIcon, TimeIcon } from '@chakra-ui/icons';
import { Box, Button, Card, CardBody, CardHeader, Heading, HStack, Link, List, Text } from '@chakra-ui/react';
import ApiServices from 'meet-hour-react-web-sdk';
import React, { useState, useEffect, useMemo } from 'react';
import { FaVideo } from "react-icons/fa";


const UpcomingMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMzl6dDUzdnNxbXYzOGxweGx5c3E1eGxtdDFvdTE3NHV0NXUiLCJqdGkiOiI1ODI5MDhhNzM4Y2M2NDlkOTJlOGM2OTNlODgzZmZiMTE1NjA5MmZlZWQ1N2Q0N2I3ZmQxZDY1NGE3ODczODNmYzliYmM0MDFhODIzODYwMCIsImlhdCI6MTcyMzAxOTgzMS42NDM5ODEsIm5iZiI6MTcyMzAxOTgzMS42NDM5ODQsImV4cCI6MTc1NDU1NTgzMS41OTQ5MTIsInN1YiI6IjI5NjgxIiwic2NvcGVzIjpbXX0.W8TImuVR56ZfSdJW_OCM6vWYjWCN4sanr3YQwEXQbSJ2-myiRo3_EF3ERpdYzJsKf5CXkjjDeWk64AOpVFOWQw'

  const fetchMeetings = useMemo(() => {
    return async () => {
      const response = await ApiServices.upcomingMeetings(token, {
        limit: 10,
        page: 1,
      });
      setMeetings(response.meetings);
    };
  }, [token]);


  useEffect(() => {
    fetchMeetings();
  }, [fetchMeetings]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Text sx={{ marginBottom: "10px" }} as="h3">Upcoming Classes</Text>
      <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {meetings.map((meeting) => (
          <Card key={meeting.meeting_id}>
            <CardHeader>
              <Heading size='md'>{meeting.topic || meeting.title || meeting.agenda}</Heading>
            </CardHeader>
            <CardBody>
              <HStack justifyContent='space-between'>
                <Box display='flex' flexDirection='row' alignItems='center' gap={2}><Box display='flex' flexDirection='row' gap={1} alignItems='center'><CalendarIcon /><Text py={2} color='grey'>{new Date(meeting.start_time).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</Text></Box><Box display='flex' flexDirection='row' gap={1} alignItems='center'><TimeIcon /><Text py={2} color='grey'>{new Date(meeting.start_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</Text></Box></Box>
                <Button as={Link} href={meeting.joinURL} display='flex' flexDirection='row' alignItems='center' gap={2}><span><Text>Join Class</Text></span> <span><FaVideo /></span></Button>
              </HStack>
            </CardBody>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingMeetings;