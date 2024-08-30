import React, { useState, useEffect } from 'react'; // Corrected typo
import axios from 'axios';
import MeetingForm from './MeetingForm';
import MeetHourComponent from './MeetHourComponent';

const Display = () => {
  const [jwtToken, setJwtToken] = useState('');
  const [meetingId, setMeetingId] = useState('');
  const accessToken = 'YOUR_ACCESS_TOKEN'; // Replace with your access token

  useEffect(() => {
    // Define the createMeeting function inside useEffect
    const createMeeting = async (meetingData) => {
      try {
        const response = await axios.post(
          'https://api.meethour.io/v1/meetings',
          meetingData,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            },
          }
        );

        const meetingId = response.data.id;

        // Call the Generate JWT Token API to generate a JWT token for the meeting
        const jwtResponse = await axios.post(
          `https://api.meethour.io/v1/meetings/${meetingId}/jwt`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            },
          }
        );

        const jwtToken = jwtResponse.data.jwt;

        setJwtToken(jwtToken);
        setMeetingId(meetingId);
      } catch (error) {
        console.error('Error creating meeting:', error);
      }
    };

    // Assuming MeetingForm component calls createMeeting on form submission
    // You might need to adjust this part based on how MeetingForm works
  }, []); // Added empty dependency array

  return (
    <div>
      <MeetingForm onSubmit={createMeeting} />
      {jwtToken && meetingId ? (
        <MeetHourComponent jwtToken={jwtToken} meetingId={meetingId} />
      ) : (
        <p>Please create a meeting first</p>
      )}
    </div>
  );
};

export default Display;
