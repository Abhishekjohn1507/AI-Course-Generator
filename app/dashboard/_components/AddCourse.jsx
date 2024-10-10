'use client'
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'




function AddCourse() {

    const router=useRouter();
    const { user } = useUser();
    const {userCourseList,setUserCourseList}=useContext(UserCourseListContext)
    return (
        <div className='flex items-center justify-between'>
            <div>
                <h2 className='text-3xl'>Hello, <span className='font-bold'>{user?.fullName}</span> </h2>
                <p className='text-xs text-gray-500'>
                    Create new  course with AI, share with friends and earn rewards

                </p>
            </div>

            <Link href={userCourseList>=5?'/dashboard/billing': '/create-course'}    >

                <Button  >+ Create Course</Button>


            </Link>

        </div>
    )
}

export default AddCourse