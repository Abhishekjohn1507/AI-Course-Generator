
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddCourse from './_components/AddCourse'
import CourseList from './_components/UserCourseList'
import UserCourseList from './_components/UserCourseList'

function page() {
  return (
    <div>
      <div > 
        
        </div>
     <AddCourse/>
     {/* Display List of Course */}
     <UserCourseList/>
      </div>
  )
}

export default page