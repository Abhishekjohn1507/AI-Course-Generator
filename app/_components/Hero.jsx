import React from 'react'



function Hero() {
  return (
    <div><section className="bg-gray-50">
    <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex  lg:items-stretch">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-extrabold sm:text-5xl">
         AI Course Generator
          <strong className="font-extrabold text-primary sm:block"> Create Custom Learning Paths, Powered By </strong>
        </h1>
  
        <p className="mt-4 sm:text-xl/relaxed">
          
The AI Course Generator is a cutting-edge tool that simplifies educational content creation by generating structured lesson plans and quizzes tailored to specific learning objectives
        </p>
  
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
            href="dashboard"
          >
            Get Started
          </a>
  
          
        </div>

      </div>
    </div>
  </section></div>
  )
}

export default Hero