import { Button, FormLabel, Input, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:3000/api/teachers/login', {
      email,
      password,
    });

    if (response.data.message === "Logged in successfully") {
      const token = response.data.token;
      localStorage.setItem('teacher_token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      navigate('/teacher');
    } else {
      setError('Invalid username or password');
    }
  } catch (error) {
    setError('Error logging in');
  }
};

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh" }}>
      <Text as='h2'>Login</Text>
      <form style={{ marginTop: "50px" }} onSubmit={handleSubmit}>
        <FormLabel>Email:</FormLabel>
        <Input type="text" placeholder='alisiddiquistar@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <FormLabel>Password:</FormLabel>
        <Input type="password" placeholder='teacher' value={password} onChange={(e) => setPassword(e.target.value)} />
        <br /><br />
        <Button type="submit">Login</Button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default TeacherLogin;