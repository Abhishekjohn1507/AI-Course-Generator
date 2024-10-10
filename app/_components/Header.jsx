import Image from 'next/image'

import React from 'react'


function Header() {
  return (
    <div className='flex justify-between p-5 shadow-md bg-slate-100'>
     
        <Image src={'/logo.svg'} width={150} height={100}/>
  {/* <Button>
    GetStarted
  </Button> */}

<a
            className="block w-full  rounded-2xl bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-primary focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
            href="/dashboard"
          >
            Get Started
          </a>
          
    </div>
  )
}

export default Header