import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'
import PrivateRoute from './components/PrivateRoute'
import DemoNotice from './components/DemoNotice'

// Pages
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import StudentDashboard from './pages/student/Dashboard'
import TeacherDashboard from './pages/teacher/Dashboard'
import CreateCourse from './pages/teacher/CreateCourse'
import ManageCourse from './pages/teacher/ManageCourse'
import CreateChapter from './pages/teacher/CreateChapter'
import Corrections from './pages/teacher/Corrections'
import AdminDashboard from './pages/admin/Dashboard'
import CourseList from './pages/CourseList'
import CourseDetail from './pages/CourseDetail'
import ChapterView from './pages/ChapterView'
import QuizView from './pages/QuizView'
import AssignmentView from './pages/AssignmentView'
import Messages from './pages/Messages'
import Profile from './pages/Profile'

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <DemoNotice />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Routes Étudiant */}
          <Route path="/student/dashboard" element={<PrivateRoute role="STUDENT"><StudentDashboard /></PrivateRoute>} />
          
          {/* Routes Enseignant */}
          <Route path="/teacher/dashboard" element={<PrivateRoute role="TEACHER"><TeacherDashboard /></PrivateRoute>} />
          <Route path="/teacher/create-course" element={<PrivateRoute role="TEACHER"><CreateCourse /></PrivateRoute>} />
          <Route path="/teacher/manage-course/:id" element={<PrivateRoute role="TEACHER"><ManageCourse /></PrivateRoute>} />
          <Route path="/teacher/create-chapter/:courseId" element={<PrivateRoute role="TEACHER"><CreateChapter /></PrivateRoute>} />
          <Route path="/teacher/corrections" element={<PrivateRoute role="TEACHER"><Corrections /></PrivateRoute>} />
          
          {/* Routes Admin */}
          <Route path="/admin/dashboard" element={<PrivateRoute role="ADMIN"><AdminDashboard /></PrivateRoute>} />
          
          {/* Routes communes */}
          <Route path="/courses" element={<PrivateRoute><CourseList /></PrivateRoute>} />
          <Route path="/courses/:id" element={<PrivateRoute><CourseDetail /></PrivateRoute>} />
          <Route path="/chapters/:id" element={<PrivateRoute><ChapterView /></PrivateRoute>} />
          <Route path="/quiz/:id" element={<PrivateRoute><QuizView /></PrivateRoute>} />
          <Route path="/assignments/:id" element={<PrivateRoute><AssignmentView /></PrivateRoute>} />
          <Route path="/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          </Routes>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  )
}

export default App
