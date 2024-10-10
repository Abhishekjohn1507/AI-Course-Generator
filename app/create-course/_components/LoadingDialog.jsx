import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import Image from 'next/image'
  

function LoadingDialog({loading}) {
  return (
    <AlertDialog open={loading}>
    
    <AlertDialogContent>
      <AlertDialogHeader>       
        <AlertDialogDescription>
         <div className='flex flex-col items-center py-10 bg-white'>
            <Image src={'/loader.gif'} width={200} height={200} alt='image' />
         <h2>Please wait... Ai Working on Your Course</h2>
         </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
    </AlertDialogContent>
  </AlertDialog>
  
  )
}

export default LoadingDialog