import React, { useState, useEffect } from 'react';
import ApiServices, { MeetHourMeeting } from 'meet-hour-react-web-sdk';

function MeetHourComponent() {
  const [accessToken, setAccessToken] = useState('');
  const [meetingId, setMeetingId] = useState('');
  const [jwtToken, setJwtToken] = useState('');
  const [getPcode, setGetPcode] = useState('');

  async function initializeMeeting() {
    try {
      const tokenResponse = await ApiServices.login({
        grant_type: 'password',
        client_id: "139zt53vsqmv38lpxlysq5xlmt1ou174ut5u",
        client_secret: "a91c1ae4be74545553c26391bdaf501e053bddf1b3b8af45e2686b587cc187ef",
        username: 'alisiddiquistar@gmail.com',
        password: "aaaa1111",
      });
      setAccessToken(tokenResponse.access_token);
      console.log("Token:", accessToken)

      const meetingResponse = await ApiServices.scheduleMeeting(tokenResponse.access_token, {
        meeting_name: "Schedule Meeting API",
        agenda: 'Test Meeting',
        duration_hr: 1,
        passcode: '123456',
        timezone: "Asia/Kolkata",
        meeting_date: '2024-08-10',
        meeting_time: '10:00',
        meeting_meridiem: "AM",
        meeting_topic: 'Test Topic',
        options: [
          "ALLOW_GUEST",
          "JOIN_ANYTIME",
        ]
      });
      setMeetingId(meetingResponse.data.meeting_id);
      setGetPcode(meetingResponse.data.pcode);
      console.log("MeetingId:", meetingId, meetingResponse);

      const jwtBody = {
        config: {},
        contact_id: null,
        meeting_id: meetingResponse.data.meeting_id,
        ui_config: {},
      };

      const jwtResponse = await ApiServices.generateJwt(tokenResponse.access_token, jwtBody);
      setJwtToken(jwtResponse.jwt);
      console.log('Test1234', jwtToken)
    } catch (error) {
      console.error('Error initializing meeting:', error);
    }
  }

  useEffect(() => {
    initializeMeeting();
  }, []);

  return (
    <div>
      {accessToken && meetingId && jwtToken ? (
        <div style={{height: "800px"}}>
          <MeetHourMeeting
          class="ali"
          domain="meethour.io"
          roomName={meetingId}
          apiKey="95665fbf4817f7c26136f0f60c89566fb7a57b051b066ebeb183e82030976574"
          apiBaseURL="api.meethour.io"
          jwt={jwtToken}
          pcode={getPcode}
          onApiReady={(externalApi) => console.log('External API Ready:', externalApi)}
          onReadyToClose={() => console.log('Meeting is ready to close')}
          
        />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MeetHourComponent;
