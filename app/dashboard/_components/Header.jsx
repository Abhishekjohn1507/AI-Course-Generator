import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-between items-center p-5 shadow-md'>
        <Link href={'/'}> 

        <Image src={'/logo.svg'} width={80} height={40}/></Link>
        <UserButton/>
    </div>
  )
}

export default Header