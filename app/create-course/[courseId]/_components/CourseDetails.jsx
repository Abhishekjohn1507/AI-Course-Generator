import React from 'react'
import { HiOutlineChartBar, HiOutlineClock, HiOutlineBookOpen, HiMiniPlayPause, HiOutlinePlay } from "react-icons/hi2";



function CourseDetails({ course }) {
  return (
    <div className='border p-6 rounded-xl shadow-sm mt-3'>
      <div className='grid grid-col-2 md:grid-cols-4 gap-5'>

        <div className='flex gap-2'>
          <HiOutlineChartBar className='text-4xl text-primary' />
          <div>
            <h2 className='text-xs text-gray-500'>Skill Level</h2>
            <h2 className='font-bold text-lg '>{course?.level}</h2>
          </div>
        </div>

        {/* duration */}
        <div className='flex gap-2'>
          <HiOutlineClock
            className='text-4xl text-primary' />
          <div>
            <h2 className='text-xs text-gray-500'>Duration</h2>
            <h2 className='font-bold text-lg'>{course?.courseOutput?.duration}</h2>
          </div>
        </div>

        {/* no of chapters */}
        <div className='flex gap-2'>
          <HiOutlineBookOpen className='text-4xl text-primary' />
          <div>
            <h2 className='text-xs text-gray-500'>No of Chapters</h2>
            <h2 className='font-bold text-lg'>{course?.courseOutput?.noOfChapters}</h2>
          </div>
        </div>

        {/* video included */}
        <div className='flex gap-2'>
          <HiOutlinePlay className='text-4xl text-primary' />
          <div>
            <h2 className='text-xs text-gray-500'>Video Included</h2>
            <h2 className='font-bold text-lg'>{course?.includeVideo}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails