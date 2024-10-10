import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { Input } from '@/components/ui/input';
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CourseList } from '@/configs/schema';
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm';

function EditCourseBasicInfo({ course,refreshData }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Set the initial course values when the component mounts or the course changes
  useEffect(() => {
    setName(course?.courseOutput?.courseName || '');
    setDescription(course?.courseOutput?.description || '');
  }, [course]);

  const onUpdateHandler = async () => {
    // Update the course output with the new values
    course.courseOutput.courseName = name;
    course.courseOutput.description = description;

    // Perform the database update
    const result = await db.update(CourseList)
      .set({
        courseOutput: course?.courseOutput
      })
      .where(eq(CourseList?.id, course?.id))
      .returning({ id: CourseList.id });

      refreshData(true)
  };

  return (
    <Dialog>
      <DialogTrigger>
        <HiMiniPencilSquare />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course Title & Description</DialogTitle>
          <DialogDescription>
            <div className='mt-3'>
              <label htmlFor="">Course Title</label>
              <Input 
                value={name} // Use the controlled state value
                onChange={(e) => setName(e.target.value)} 
              />
            </div>
            <div>
              <label htmlFor="">Course Description</label>
              <Textarea 
                className='h-40' 
                value={description} // Use the controlled state value
                onChange={(e) => setDescription(e.target.value)} 
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
  );
}

export default EditCourseBasicInfo;
