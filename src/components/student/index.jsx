import { Button, Link, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";

const Student = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('student_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
        <Text as='h4'>Are You a</Text>
        <Button as={Link} href={isLoggedIn ? "/student" : "/student/login"}>Student</Button>
    </div>
  )
}

export default Student