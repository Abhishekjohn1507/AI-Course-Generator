import React, { useContext } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { UserInputContext } from '@/app/_context/UserInputContext'


function TopicDescription() {
  const {userCourseInput,setUserCourseInput}=useContext(UserInputContext)


  const handleInputChange=(fieldName,value)=>{
    setUserCourseInput(prev=>({
      ...prev,
      [fieldName]:value
    }))
  }
  return (
    <div className='mx-20 lg:mx-44'>
{/* Input topic */}
<div className='pb-10'>
  <label > 💡Write the topic for which you want to Generate a course (e.g., python course, yoga, etc) </label>
<Input  placeholder={'Topic'} 
className='h-14 text-xl'
defaultValue={userCourseInput?.topic}
onChange={(e)=>handleInputChange('topic',e.target.value)} />
</div>






{/* Text Area Desc */}
<div>
  <label htmlFor="">📝Write Brief  Description of the topic (optional)</label>
  <Textarea placeholder={'About your Course'}
   className='h-24 text-xl'
   defaultValue={userCourseInput?.description}
  onChange={(e)=>handleInputChange('description',e.target.value)}/>
</div>

    </div>
  )
}

export default TopicDescription