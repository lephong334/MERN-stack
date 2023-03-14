import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Dashboard from './features/auth/Dashboard'

import StudentsList from './features/students/StudentsList'
import NewStudentForm from './features/students/NewStudentForm'
import EditStudent from './features/students/EditStudent'

import ClassesList from './features/classes/ClassesList'
import NewClass from './features/classes/NewClass'
import EditClass from './features/classes/EditClass'

import AttendanceList from './features/attendance/AttendanceList'

import MembersList from './features/members/MembersList'
import NewMember from './features/members/NewMember'
import EditMember from './features/members/EditMember'

import SubjectsList from './features/subjects/SubjectsList'
import NewSubjectForm from './features/subjects/NewSubjectForm'
import EditSubject from './features/subjects/EditSubject'

import UsersList from './features/users/UsersList'
import NewUserForm from './features/users/NewUserForm'
import EditUser from './features/users/EditUser'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />

        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
            <Route path='dash' element={<DashLayout />}>
              
              <Route index element={<Dashboard />} />

              <Route path='students'>

                <Route index element={<StudentsList />} />
                <Route path='new' element={<NewStudentForm />} />
                <Route path=':id' element={<EditStudent />} />

              </Route>

              <Route path='classes'>

                <Route index element={<ClassesList />} />
                <Route path='new' element={<NewClass />} />
                <Route path=':id'>

                  <Route index element={<EditClass />} />
                  <Route path='members'>

                    <Route index element={<MembersList />} />
                    <Route path='add' element={<NewMember />} />
                    <Route path='edit' element={<EditMember />} />
                  </Route>

                  <Route path='attendance'>

                    <Route index element={<AttendanceList />} />
                  </Route>
                </Route>
              </Route>
               
              <Route path='subjects'>

                <Route index element={<SubjectsList />} />
                <Route path='new' element={<NewSubjectForm />} />
                <Route path=':id' element={<EditSubject />} />
              </Route>     

              <Route path='users'>

                <Route index element={<UsersList />} />
                <Route path='new' element={<NewUserForm />} />
                <Route path=':id' element={<EditUser />} />
              </Route>
            </Route> {/* End Dash */}
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
