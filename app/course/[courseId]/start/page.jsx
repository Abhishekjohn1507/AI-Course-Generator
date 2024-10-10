'use client'
import { db } from '@/configs/db'
import { Chapters, CourseList } from '@/configs/schema'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import ChapterListCard from './_components/ChapterListCard'
import ChapterContent from './_components/ChapterContent'
import Header from '@/app/dashboard/_components/Header'

function CourseStart({ params }) {

    const [course, setCourse] = useState();
    const [selectedChapter, setSelectedChapter] = useState();
    const [chapterContent,setChapterContent]=useState();
    
    useEffect(() => {
        GetCourse();
    }, [])

    const GetCourse = async () => {
        const result = await db.select().from(CourseList)
            .where(eq(CourseList?.courseId,params?.courseId));
        setCourse(result[0]);
        console.log(result);
       
    }

    const GetSelectedChapterContent = async (chapterId) => {
        const result = await db.select().from(Chapters)
            .where(and(eq(Chapters.chapterId, chapterId),
                eq(Chapters.courseId, course?.courseId)));

                setChapterContent(result[0]);
                
             
                
        // You can handle the result here
    }

    return (
        <div>
             <Header/>
            {/* chapter list side bar */}
            <div className='fixed md:w-64 hidden md:block  h-screen border-r shadow-sm'>
               
                <h2 className=' text-lg bg-primary p-3 font-bold text-white'>{course?.courseOutput?.courseName}</h2>
                <div>
                    {course?.courseOutput?.chapters.map((chapter, index) => (
                        <div key={index}
                            className={`cursor-pointer
                                hover:bg-purple-50
                                ${selectedChapter?.chapterName == chapter?.chapterName && 'bg-purple-100'}
                                `}
                            onClick={() => {
                                setSelectedChapter(chapter);
                                GetSelectedChapterContent(index)
                            }}>
                            <ChapterListCard chapter={chapter} index={index} />
                        </div>
                    ))}
                </div>
            </div>

            {/* content list div */}
            <div className='md:ml-64'>
                <ChapterContent chapter={selectedChapter} 
                content={chapterContent}
                />
            </div>
        </div>
    );
}

export default CourseStart;
