import { Button, FormLabel, IconButton, Input, Select } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ApiServices from 'meet-hour-react-web-sdk';
import TimePicker from 'react-time-picker';

const MeetingForm = () => {
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingId, setMeetingId] = useState('');
  const [meetingDescription, setMeetingDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  // const [accessToken, setAccessToken] = useState('');
  const [jwtToken, setJwtToken] = useState('');
  const [startTime, setStartTime] = useState('');
  const [displayTime, setDisplayTime] = useState('');
  const [meridiem, setMeridiem] = useState('');
  const [duration, setDuration] = useState(60);
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [password, setPassword] = useState('');
  const [getPcode, setGetPcode] = useState('');
  const [agenda, setAgenda] = useState('');
  const [hostEmail, setHostEmail] = useState('');
  const [attendeesEmails, setAttendeesEmails] = useState(['']);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [attendees, setAttendees] = useState([
    {
      first_name: '',
      last_name: '',
      email: '',
    },
  ]);
  const [newContact, setNewContact] = useState({
    email: '',
    firstname: '',
    lastname: '',
  });
  const [showAddContactForm, setShowAddContactForm] = useState(false)

  const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMzl6dDUzdnNxbXYzOGxweGx5c3E1eGxtdDFvdTE3NHV0NXUiLCJqdGkiOiI1ODI5MDhhNzM4Y2M2NDlkOTJlOGM2OTNlODgzZmZiMTE1NjA5MmZlZWQ1N2Q0N2I3ZmQxZDY1NGE3ODczODNmYzliYmM0MDFhODIzODYwMCIsImlhdCI6MTcyMzAxOTgzMS42NDM5ODEsIm5iZiI6MTcyMzAxOTgzMS42NDM5ODQsImV4cCI6MTc1NDU1NTgzMS41OTQ5MTIsInN1YiI6IjI5NjgxIiwic2NvcGVzIjpbXX0.W8TImuVR56ZfSdJW_OCM6vWYjWCN4sanr3YQwEXQbSJ2-myiRo3_EF3ERpdYzJsKf5CXkjjDeWk64AOpVFOWQw'

  const contactHeaders = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  };

  const contactBody = {
    "limit": 0,
    "page": 0,
    "exclude_hosts": 0
  };

  // useEffect(async () => {
  //   const tokenResponse = ApiServices.login({
  //     grant_type: 'password',
  //     client_id: "139zt53vsqmv38lpxlysq5xlmt1ou174ut5u",
  //     client_secret: "a91c1ae4be74545553c26391bdaf501e053bddf1b3b8af45e2686b587cc187ef",
  //     username: 'alisiddiquistar@gmail.com',
  //     password: "aaaa1111",
  //     access_token: accessToken
  //   });

  //   const contactBody = {
  //     limit: 10,
  //     page: 1,
  //     exclude_hosts: 1
  //   }
  //   console.log(token,contactBody,"contactBodycontactBody")
  //   const contactResponse = await ApiServices.contactsList(tokenResponse.access_token, contactBody);
  //   setStudents(contactResponse)

  // }, [])


  const handleAddAttendee = () => {
    setAttendees([...attendees, {
      first_name: '',
      last_name: '',
    }]);
  };


  const handleRemoveAttendee = (index) => {
    const newAttendees = [...attendees];
    newAttendees.splice(index, 1);
    setAttendees(newAttendees);
  };

  const handleAttendeeChange = async (index, email) => {
    try {
      const selectedContact = students.contacts.find((contact) => contact.email === email);
      console.log(students, "studentsstudents")
      console.log(selectedContact, "selectedContact")
      if (selectedContact) {
        const newAttendees = [...attendees];
        newAttendees[index] = {
          first_name: selectedContact.first_name,
          last_name: selectedContact.last_name,
          email: selectedContact.email,
          contactId: selectedContact.id,
          id: selectedContact.user_id,
        };
        // console.log(newAttendees,"newAttendees")

        setAttendees(newAttendees)
        console.log(attendees, "fdsffdf")
      }
    } catch (error) {
      console.error('Error updating attendee:', error);
    }
  };

  const handleAddNewContact = () => {
    setShowAddContactForm(true);
  };

  const handleNewContactChange = (event) => {
    const { name, value } = event.target;
    setNewContact((prevContact) => ({ ...prevContact, [name]: value }));
  };

  const handleSaveNewContact = async () => {
    try {
      const response = await ApiServices.addContact(accessToken, newContact);
      const newAttendees = [...attendees];
      console.log(response)
      newAttendees.push({
        firstname: response.firstname,
        lastname: response.lastname,
        email: response.email,
        contactId: response.id,
        id: response.user_id,
      });
      setAttendees(newAttendees);
      setShowAddContactForm(false);
    } catch (error) {
      console.error('Error adding new contact:', error);
    }
  };



  const handleTimeChange = (event) => {
    const time = event.target.value;
    const [hours, minutes] = time.split(':').map(Number);
    const meridiemValue = hours >= 12 ? 'PM' : 'AM';

    const adjustedHours = hours % 12 || 12;
    const formattedHours = adjustedHours.toString().padStart(2, '0');
    const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, '0')}`;
    setDisplayTime(time);
    setStartTime(formattedTime);
    setMeridiem(meridiemValue);
  };


  // useEffect(() => {
  //   axios.get('http://localhost:3000/api/students/data').then((res) => {
  //     setStudents(res.data)
  //   }).then(() => {
  //     console.log(students);  
  //   });
  // }, [])

  const fetchStudents = async () => {
    try {
      // const response = await axios.post(
      //   'https://api.meethour.io/api/v1.2/customer/contacts',
      //   contactBody,
      //   { headers: contactHeaders }
      // );
      const response = await ApiServices.contactsList(accessToken, contactBody);
      setStudents(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      // const contactsResponse = await ApiServices.contactsList(tokenResponse.access_token);
      // const contacts = contactsResponse.contacts;
      // setStudents(contacts)

      // const contactsBody = {
      //   exclude_host: 1,
      //   limit: 10,
      //   page: 1
      // }

      // const contactList = await ApiServices.contactsList(accessToken, contactsBody)
      // setAttendees(contactList)
      console.log(attendees, "submit attendees")

      const meetingData = {
        meeting_name: meetingTitle,
        agenda: agenda,
        duration_hr: 1,
        passcode: '123456',
        timezone: timezone,
        meeting_date: startDate,
        meeting_time: startTime,
        meeting_meridiem: meridiem,
        meeting_topic: meetingDescription,
        options: [
          "ALLOW_GUEST",
          "JOIN_ANYTIME",
        ],
        send_calendar_invite: 1,
        is_show_portal: 1,
        attend: attendees.map((attendee) => (
          {
            first_name: attendee.first_name,
            last_name: attendee.last_name,
            email: attendee.email
          }))



        // meeting_attendees: attendees.map((attendee, index) => ({
        //   meeting_attendee_id: index + 1,
        //   first_name: attendee.first_name,
        //   last_name: attendee.last_name,
        //   email: attendee.email,
        //   // contact_id: 1,
        //   is_host: 0,
        // })),
      }

      const meetingResponse = await ApiServices.scheduleMeeting(accessToken, meetingData);
      console.log(students)
      console.log("Meeting Response:", meetingResponse);
      const meetingId = meetingResponse.data.meeting_id;
      const attendeesData = attendees.map((attendee) => {
        return {
          first_name: attendee.first_name,
          last_name: attendee.last_name,
          email: attendee.email,
          contact_id: attendee.contact_id
        };
      })

      const joinUrl = meetingResponse.data.joinURL;
      if (meetingResponse) {
        const sentResponse = axios.post('http://localhost:3000/api/students/meeting_data', { ...meetingData, attendees: attendeesData, meeting_id: meetingId, joinURL: joinUrl })
        console.log(sentResponse, "sentResponse to the backend")
        setMeetingId(meetingResponse.data.meeting_id);
        setGetPcode(meetingResponse.data.pcode);
        console.log("MeetingId:", meetingId, meetingResponse);
      } else {
        console.error("Error: Meeting response data is undefined.");
      }

      const jwtBody = {
        config: {},
        contact_id: null,
        meeting_id: meetingId,
        ui_config: {},
      };

      const jwtResponse = await ApiServices.generateJwt(accessToken, jwtBody);
      setJwtToken(jwtResponse.jwt);
      console.log('Test1234', jwtToken)
      console.log(attendees)
      console.log('Meetings initialized')

      if (meetingResponse.status === 200) {
        setAttendees([{ first_name: '', last_name: '', email: '' }])
      } else {
        console.log('Status code is not 200:', meetingResponse.status)
      }

    } catch (error) {
      console.error('Error initializing meeting:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormLabel>Class Title:</FormLabel>
      <Input type="text" value={meetingTitle} onChange={(event) => setMeetingTitle(event.target.value)} />
      <br />
      <FormLabel>Class Description:</FormLabel>
      <Input type="text" value={meetingDescription} onChange={(event) => setMeetingDescription(event.target.value)} />
      <br />
      <br />
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <FormLabel>Start Date:</FormLabel>
        <Input style={{ width: "20%" }} type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
        <FormLabel>Start Time:</FormLabel>
        <Input style={{ width: "20%" }} type="time" value={displayTime} onChange={handleTimeChange} />
        <span><p>{startTime} {meridiem}</p></span></div>
      <br />
      <FormLabel>Duration:</FormLabel>
      <Input disabled type="number" value={duration} onChange={(event) => setDuration(event.target.value)} />
      <br />
      <FormLabel>Timezone:</FormLabel>
      <Select value={timezone} onChange={(event) => setTimezone(event.target.value)}>
        <option value="Asia/Kolkata">Asia/Kolkata</option>
        <option value="America/New_York">America/New_York</option>
      </Select>
      <br />
      <FormLabel>Password:</FormLabel>
      <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      <br />
      <FormLabel>Topic:</FormLabel>
      <Input type="text" value={agenda} onChange={(event) => setAgenda(event.target.value)} />
      <br />
      <FormLabel>Teacher's Email:</FormLabel>
      <Input type="email" value={hostEmail} onChange={(event) => setHostEmail(event.target.value)} />
      <br />
      <br />
      <FormLabel>Select Students</FormLabel>
      {attendees.map((attendee, index) => (
        <div key={index} style={{ display: "flex", flexDirection: "row", gap: "10px", marginBottom: "10px" }}>
          <Select value={attendees[index].email} onChange={(event) => handleAttendeeChange(index, event.target.value)}>
            {students && students.contacts && (
              <>
                <option value="Select Student" disabled>Select Student</option>
                {students.contacts.map((contact) => (
                  <option key={contact.id} value={contact.email}>
                    {contact.first_name} {contact.last_name}
                  </option>
                ))}
              </>
            )}
          </Select>
          {index > 0 && (
            <IconButton color='red' onClick={() => handleRemoveAttendee(index)} icon={<DeleteIcon />} />
          )}
        </div>
      ))}
      <br />
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
        {students.contacts && attendees.length <= students.contacts.length && (
          <Button color='blue' onClick={handleAddAttendee}>Add Student</Button>
        )}
        <Button onClick={handleAddNewContact}>Add new contact</Button>
      </div>
      {showAddContactForm && (
        <div>
          <FormLabel>Email:</FormLabel>
          <Input type="email" name="email" value={newContact.email} required onChange={handleNewContactChange} />
          <br />
          <FormLabel>First Name:</FormLabel>
          <Input type="text" name="firstname" value={newContact.firstname} required onChange={handleNewContactChange} />
          <br />
          <FormLabel>Last Name:</FormLabel>
          <Input type="text" name="lastname" value={newContact.lastname} onChange={handleNewContactChange} />
          <br />
          <Button mt={5} onClick={handleSaveNewContact}>Save</Button>
        </div>
      )}
      <br />
      <br />
      <Button type="submit">Create Class</Button>
    </form>
  );
};

export default MeetingForm;