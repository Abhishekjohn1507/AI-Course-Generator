'use client'
import React, { useContext, useEffect, useState } from 'react'
import { TbStack2Filled } from "react-icons/tb";
import { FaRegLightbulb } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import SelectCategory from './_components/SelectCategory';
import TopicDescription from './_components/TopicDescription';
import Options from './_components/SelectOptions';
import SelectOptions from './_components/SelectOptions';
import { UserInputContext } from '../_context/UserInputContext';
import { GenerateCourseLayout_AI } from '@/configs/AiModel';
import LoadingDialog from './_components/LoadingDialog';
import { CourseList } from '@/configs/schema';
import uuid4 from "uuid4";

import { useUser } from '@clerk/nextjs';
import { db } from '@/configs/db';
import { useRouter } from 'next/navigation';
function CreateCourse() {

  const SteppperOptions = [
    {
      id: 1,
      name: 'Category',
      icon: <TbStack2Filled />

    }, {
      id: 2,
      name: 'Topic & Desc',
      icon: <FaRegLightbulb />


    }, {
      id: 3,
      name: 'Optons',
      icon: <FaClipboardList />


    },
  ]

  
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext)
  const [loading, setloading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { user } = useUser();
  const router = useRouter();


  useEffect(() => {
    // setUserCourseInput({category:'',topic:'',options:''})
    console.log(userCourseInput)
  }, [userCourseInput])

  // used to chek the next button enable status
  const checkStatus = () => {
    if (userCourseInput?.length == 0) {
      return true;
    }
    if (activeIndex == 0 && (userCourseInput?.category?.length == 0 || userCourseInput?.category == undefined)) {
      return true;
    }
    if (activeIndex == 1 && (userCourseInput?.topic?.length == 0 || userCourseInput?.topic == undefined)) {
      return true;
    }
    else if (activeIndex == 2 && (userCourseInput?.level == undefined || userCourseInput?.duration == undefined || userCourseInput?.DisplayVideo == undefined || userCourseInput?.noOfChapter == undefined)) {
      return true;
    }

  }

  const GenerateCourseLayout = async () => {
    setloading(true)

    const BASIC_PROMPT = 'Generate A Course Tutorial on Following Detail With field Course Name, Description, Along with Chapter Name, about, Duration:'
    const USER_INPUT_PROMPT = 'Category: ' + userCourseInput?.category + ', Topic: ' + userCourseInput?.topic + ', Level: ' + userCourseInput?.level + ' , Duration: ' + userCourseInput?.duration + ', NoOfChapters: ' + userCourseInput?.noOfChapter + ', in JSON format'
    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
    console.log(FINAL_PROMPT);
    const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
    console.log(result.response?.text());
    console.log(JSON.parse(result.response?.text()))
    setloading(false);
    SaveCourseLayoutInDb(JSON.parse(result.response?.text()));
  }

  const SaveCourseLayoutInDb = async (courseLayout) => {
    // Generate a new UUID
    var id = uuid4();
     // true
    console.log(id)
    setloading(true)
    const result = await db.insert(CourseList).values({
      courseId: id|| uuid4() , // Ensure CourseId has a value
      
      name: userCourseInput?.topic,
      level: userCourseInput?.level,
      category: userCourseInput?.category,
      courseOutput: courseLayout,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      username: user?.fullName,
      userProfileImage: user?.imageUrl
    })
    console.log('Generated id:', id); // Log the id value
   
    console.log("FINISH")
    setloading(false);
    router.replace('/create-course/' + id)
  

  }
  return (
    <div>

      {/* Stepper */}


      <div className='flex flex-col justify-center items-center mt-10'>
        <h2 className='text-4xl  text-primary font-medium mb-3'>
          Create Course
        </h2>
        <div className='flex mt-10'>
          {SteppperOptions.map((item, index) => (
            <div className='flex items-center'>
              <div className='flex flex-col items-center w-[50px] md:w-[100px]'>
                <div className={`bg-gray-200 p-3 rounded-full text-white
                  ${activeIndex >= index && 'bg-primary'}`}>
                  {item.icon}
                </div>
                <h2 className='hidden md:block md:text-sm'>{item.name}</h2>

              </div>
              {index !== SteppperOptions?.length - 1 &&
                <div className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300
              ${activeIndex >= index && 'bg-primary'}`}></div>}


            </div>
          ))}
        </div>
      </div>

      <div className='px-10 md:px-20 lg:px-44 mt-10'>


        {/* Components */}

        {activeIndex == 0 ? <SelectCategory /> :
          activeIndex == 1 ? <TopicDescription /> : <SelectOptions />
        }
        {/* next and previous  */}

        <div className='flex justify-between mt-10'>

          <Button disabled={activeIndex == 0}
            variant='outline'
            onClick={() => setActiveIndex(activeIndex - 1)}> Previous</Button>

          {activeIndex < 2 && <Button disabled={checkStatus()} onClick={() => setActiveIndex(activeIndex + 1)}>
            Next
          </Button>}

          {activeIndex == 2 && <Button disabled={checkStatus()} onClick={() => GenerateCourseLayout()}>
            Generate Now
          </Button>}
        </div>
      </div>


      <LoadingDialog loading={loading} />
    </div>
  )
}

export default CreateCourse