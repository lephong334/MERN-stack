import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { store } from '../../app/store'
import { studentsApiSlice } from '../students/studentsApiSlice'
import { classesApiSlice } from '../classes/classesApiSlice'
import { subjectsApiSlice } from '../subjects/subjectsApiSlice'
import { usersApiSlice } from '../users/usersApiSlice'
import { membersApiSlice } from '../members/membersApiSlice'

const Prefetch = () => {
    useEffect(() => {
        // console.log('subscribing')
        // const members = store.dispatch(membersApiSlice.endpoints.getMembers.initiate())
        const students = store.dispatch(studentsApiSlice.endpoints.getStudents.initiate())
        const classes = store.dispatch(classesApiSlice.endpoints.getClasses.initiate())
        const subjects = store.dispatch(subjectsApiSlice.endpoints.getSubjects.initiate())
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

        return () => {
            // console.log('unsubscribing')
            // members.unsubscribe()
            students.unsubscribe()
            classes.unsubscribe()
            subjects.unsubscribe()
            users.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch