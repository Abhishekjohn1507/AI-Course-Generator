import React from 'react'
import { HiOutlineCheckBadge, HiOutlineClock } from "react-icons/hi2";
import EditChapters from './EditChapters';
function ChapterList({ course,refreshData,edit=true }) {
    return (
        <div className='mt-3'>
            <h2 className='text-xl text-medium'> Chapters</h2>
            <div className='mt-2'>
                {course?.courseOutput?.chapters.map((chapter, index) => (
                    <div className='border p-5 rounded-lg mb-5 flex items-center justify-between'>

                    <div className='flex gap-5 items-center pb-5'>

                        <h2 className='bg-primary flex-none h-10 w-10 text-white rounded-full text-center p-2'> {index + 1} </h2>
                        <div className='gap-2'>
                            <h2 className='font-bold text-lg'>{chapter.chapterName}{edit&&<EditChapters course={course} index={index} refreshData={refreshData}/>}</h2>
                            <p className='text-sm text-gray-500'>{chapter?.about}</p>
                            <p className='flex gap-2 text-primary items-center'><HiOutlineClock />{chapter?.duration}</p>
                        </div>
                    </div>
                    <HiOutlineCheckBadge className='text-4xl text-gray-300 flex-none' />
                    </div>
                ))}

            </div>
        </div>
    )
}

export default ChapterList