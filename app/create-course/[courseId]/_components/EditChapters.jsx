import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { HiMiniPencilSquare } from 'react-icons/hi2'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { db } from '@/configs/db'
import { eq } from 'drizzle-orm'
import { CourseList } from '@/configs/schema'

function EditChapters({ course, index,refreshData }) {
    const Chapters = course?.courseOutput?.chapters;
    const [chapterName, setName] = useState();
    const [about, setAbout] = useState();


useEffect(()=>{
    setName(Chapters?.[index].chapterName);
    setAbout(Chapters?.[index].about);
},[course])

    const onUpdateHandler = async() => {
        course.courseOutput.chapters[index].chapterName=chapterName;
        course.courseOutput.chapters[index].about=about;
        
        const result = await db.update(CourseList)
      .set({
        courseOutput: course?.courseOutput
      })
      .where(eq(CourseList?.id, course?.id))
      .returning({ id: CourseList.id });

      refreshData(true)

    }
    return (
        <Dialog>
            <DialogTrigger><HiMiniPencilSquare /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Chapters</DialogTitle>
                    <DialogDescription>
                        <div className='mt-3'>
                            <label >Chapter Title</label>
                            <Input defaultValue={Chapters?.[index].chapterName}

                                onChange={(e) => setName(e?.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="">Chapter Description</label>
                            <Textarea
                                className='h-40'
                                defaultValue={Chapters?.[index].about}
                                onChange={(e) => setAbout(e.target.value)}
                            />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button onClick={onUpdateHandler}>Update</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default EditChapters