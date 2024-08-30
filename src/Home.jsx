import { Text } from '@chakra-ui/react'
import Teacher from './components/teacher'
import Student from './components/student'

function Home() {

  return (
    <>
    <div style={{width: "100vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "10px"}}>
    <Text as='h2'>Learning Management System</Text>
    <div style={{display: "flex", flexDirection: "row", width: "100%", marginTop: "10%"}}>
      <div style={{width: "50%", textAlign: "center"}}><Teacher /></div>
      <div style={{width: "50%", textAlign: "center"}}><Student /></div>
    </div>
    </div>
    </>
  )
}

export default Home;
