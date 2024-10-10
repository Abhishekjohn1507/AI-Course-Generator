import React, { useContext } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { UserInputContext } from '@/app/_context/UserInputContext'


function SelectOptions() {
  const {userCourseInput,setUserCourseInput}=useContext(UserInputContext)


  const handleInputChange=(fieldName,value)=>{
    setUserCourseInput(prev=>({
      ...prev,
      [fieldName]:value
    }))
  }
  return (
    <div className='px-10 md:px-20 lg:px-44'>
      <div className='grid grid-cols-2 gap-10'>
        <div>
          <label htmlFor="">🎓 Difficulty Level</label>

          <Select onValueChange={(value)=>handleInputChange('level',value)}
            defaultValue={userCourseInput?.level}>
            <SelectTrigger className="">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Begineer">Begineer</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advance">Advance</SelectItem>
            </SelectContent>
          </Select>

        </div>

        <div>
          <label htmlFor=""> ⏲️ Course Duration</label>

          <Select onValueChange={(value)=>handleInputChange('duration',value)}
            defaultValue={userCourseInput?.duration}>
            <SelectTrigger className="">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 Hours">1 Hours</SelectItem>
              <SelectItem value="2 Hours">2 Hours</SelectItem>
              <SelectItem value="More than 3 Hours">More than 3 Hours</SelectItem>
            </SelectContent>
          </Select>

        </div>
        <div>
          <label htmlFor="">▶️ Add Video</label>

          <Select onValueChange={(value)=>handleInputChange('DisplayVideo',value)}
            defaultValue={userCourseInput?.DisplayVideo}>
            <SelectTrigger className="">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>

        </div>
        <div>
          <label className='text-sm'> 📔No of Chapters</label>
          <Input type="number" 
          onChange={(event)=>handleInputChange('noOfChapter',event.target.value)} 
          defaultValue={userCourseInput?.noOfChapter}/>
         
        </div>


      </div>
    </div>
  )
}

export default SelectOptions