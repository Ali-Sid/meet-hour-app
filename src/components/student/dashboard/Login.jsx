import { Button, FormLabel, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // const secret_key = "d294189d6b24ac4abb8610f3c85ffff550799c882f5d555d0db3b2f456788b63"

  // sessionStorage.setItem('secret_key', secret_key);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch("http://localhost:3000/api/students/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, password }),
  //     });
  //     if (response.ok) {
  //       const data = await response.json();
  //       if (data.message === "Logged in successfully") {
  //         const token = data.token;
  //         sessionStorage.setItem('student_token', token);
  //         navigate("/student");
  //       } else {
  //         setError(data.message);
  //       }
  //     } else {
  //       setError("Error logging in");
  //     }
  //   } catch (error) {
  //     setError("Error logging in");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/students/login", {
        email,
        password
      });
      if (response.data.message === "Logged in successfully") {
        const token = response.data.token;
        localStorage.setItem('student_token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        navigate("/student");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Error logging in");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Text as="h2">Student Login</Text>
      <form style={{ marginTop: "50px" }} onSubmit={handleSubmit}>
        <FormLabel>Email:</FormLabel>
        <Input
          type="text"
          placeholder="alisiddiqui2001@hotmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <FormLabel>Password:</FormLabel>
        <Input
          type="password"
          placeholder="student"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <Button type="submit">Login</Button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default StudentLogin;
