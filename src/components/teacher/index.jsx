import { Button, Link, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";

const Teacher = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div>
        <Text as='h4'>Are You a</Text>
        <Button as={Link} href={isLoggedIn ? "/teacher" : "/teacher/login"}>Teacher</Button>
    </div>
  )
}

export default Teacher