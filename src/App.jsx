import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Home from "./Home"
import TeacherDashboard from "./components/teacher/dashboard/Dashboard"
import StudentDashboard from "./components/student/dashboard/Dashboard"
import StudentLogin from "./components/student/dashboard/Login"
import TeacherLogin from "./components/teacher/dashboard/Login"
import TeacherHome from "./components/teacher/dashboard/Home"


const App = () => {
  return (
    <div>
        <Router>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/teacher" element={<TeacherHome />} />
                <Route path="/student" element={<StudentDashboard />} />
                <Route path="/student/login" element={<StudentLogin />} />
                <Route path="/teacher/login" element={<TeacherLogin />} />
            </Routes>
        </Router>
    </div>
  )
}

export default App