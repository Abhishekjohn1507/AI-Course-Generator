'use client'
import Image from 'next/image'
import React from 'react'
import { MdOutlineMenuBook } from "react-icons/md";
import { FaEllipsisVertical } from "react-icons/fa6";
import DropdownOption from './DropdownOption';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { db } from 'configs/db';
import { CourseList } from 'configs/schema';


function CourseCard({ course, refreshData, displayUser = false }) {
    const handleOnDelete = async () => {
        const resp = await db.delete(CourseList)
            .where(eq(CourseList.id, course?.id))
            .returning({ id: CourseList?.id })

        if (resp) {
            refreshData()
        }
    }
    return (
        // hover:scale-105 transition-all
        <div className='shadow-lg rounded-lg border p-2  mt-5 cursor-pointer hover:border-primary '>
            <Link href={'/course/' + course?.courseId}>
                <Image src={course?.courseBanner} width={300} height={200}
                    className='w-full h-[200px] object-contain rounded-lg' /></Link>
            <div className='p-2'>
                <h2 className='font-bold text-lg flex justify-between items-center g-4'>{course?.courseOutput?.courseName}
                   
                   
                   {!displayUser&& <DropdownOption
                        handleOnDelete={() => handleOnDelete()}
                    ><FaEllipsisVertical /></DropdownOption>}

                </h2>
                <p className='text-sm text-gray-400 my1'>{course?.category}</p>
                <div className='flex items-center justify-between'>
                    <h2 className='flex gap-2 items-center p-1 bg-purple-50 text-primary text-sm rounded-sm'><MdOutlineMenuBook />
                        {course?.courseOutput?.noOfChapters} Chapters</h2>
                    <h2 className='flex gap-2 items-center p-1 bg-purple-50 text-primary text-sm rounded-sm'>{course?.level}</h2>
                </div>

              {displayUser&&  <div className='flex gap-3 items-center mt-3'>
                    <Image src={course?.userProfileImage} width={35} height={35} className='rounded-full' />
                    <h2 className='text-sm'>{course?.username}</h2>
                </div>}

            </div>
        </div>
    )
}

export default CourseCard