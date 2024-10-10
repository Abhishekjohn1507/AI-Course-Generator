'use client'
import { db } from '@/configs/db'
import { Chapters, CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import CourseBasicInfo from './_components/CourseBasicInfo'
import CourseDetails from './_components/CourseDetails'
import ChapterList from './_components/ChapterList'
import { Button } from '@/components/ui/button'
import { GenerateChapterContent_AI } from '@/configs/AiModel'
import LoadingDialog from '../_components/LoadingDialog'
import service from '@/configs/service'
import { useRouter } from 'next/navigation'



function courseLayout({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState([])
  const [loading, setLoading] = useState(false);
  const router=useRouter();

  useEffect(() => {
    params && GetCourse();
    // console.log(params)
  }, [params, user])

  const GetCourse = async () => {
    const result = await db.select().from(CourseList)
      .where(and(eq(CourseList.courseId, params?.courseId),
        eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)))

    setCourse(result[0]);

    console.log("Result", result);
  }
  const GenerateChapterContent = () => {
    setLoading(true)
    const chapters = course?.courseOutput?.chapters;
    chapters.forEach(async (chapter, index) => {
      const PROMPT = "Explain the concept in Details on Topic:" + course?.name + ", Chapter:" + chapter?.chapterName + ", in JSON Format with list of array with field as title, description, in details,explanation on given chapter in detail, Code Example( Code field in <precode> format) if applicable "
      console.log(PROMPT)
      // if (index == 0) {
      try {
        let videoId = '';

        // Generate video url
        service.getVIdeos(course?.name + ":" + chapter?.chapterName).then(resp => {
          console.log(resp);
          videoId = resp[0]?.id?.videoId
        })

      //  generate chapter content
        const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
        console.log(result.response?.text());
        const content = JSON.parse(result?.response?.text())

        setLoading(false)




        // save Chapter Content + Video Url
        await db.insert(Chapters).values({
          chapterId: index,
          courseId: course?.courseId,
          content: content,
          videoId: videoId
        })
      } catch (e) 
      {
        setLoading(false)
        console.log("Error", e)
      }
      await db.update(CourseList).set({
        publish:true
      })
      router.replace('/create-course/'+course?.courseId+"/finish")

    })
  }
  return (
    <div className='mt-10 px-7 md:px-20 lg:px-44'>
      <h1 className='font-bold text-center text-2xl'>Course Layout</h1>

      <LoadingDialog loading={loading} />

      {/* Basic Info */}
      <CourseBasicInfo course={course} refreshData={() => GetCourse()} />

      {/* Course Details */}
      <CourseDetails course={course} />

      {/* List of Lession */}
      <ChapterList course={course} refreshData={() => GetCourse()} />


      <Button onClick={GenerateChapterContent}
        className={'my-10'}>
        Generate Course Content
      </Button>
    </div>
  )
}

export default courseLayout