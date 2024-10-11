'use client';

import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import React, { useContext, useEffect, useState } from 'react';
import CourseCard from './CourseCard';
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
import { CourseList, UserSubscription } from 'configs/schema';
import { db } from 'configs/db';
import { UserSubscriptionContext } from '../../_context/UserSubsCriptionContext';

function UserCourseList() {
  const [courseList, setCourseList] = useState([]); // List of courses
  const { userCourseList, setUserCourseList } = useContext(UserCourseListContext); // User's course list context
  const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext); // Subscription context

  const { user } = useUser(); // Clerk user object

  // Function to check if user has a subscription
  const isUserSubscribed = async () => {
    const result = await db
      .select()
      .from(UserSubscription)
      .where(eq(UserSubscription.email, user?.primaryEmailAddress?.emailAddress));
    
    // If a subscription is found and it's active, set it to true, else set to false
    if (result && result[0]?.active) {
      setUserSubscription(true);
    } else {
      setUserSubscription(false);
    }
  };

  // Get user courses and check subscription on mount
  useEffect(() => {
    if (user) {
      getUserCourses();
      isUserSubscribed();
    }
  }, [user]);

  // Fetch the user's courses from the database
  const getUserCourses = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress));
    
    setCourseList(result); // Set the course list state
    setUserCourseList(result); // Update course list in the context
  };

  return (
    <div className='mt-10'>
      <h2 className='font-bold text-xl'>My AI Courses</h2>

      {/* Display the user's courses or placeholders if not available */}
      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {courseList.length > 0
          ? courseList.slice(0, userSubscription ? 10 : 5).map((course, index) => (
              <CourseCard
                course={course}
                key={index}
                refreshData={() => getUserCourses()}
              />
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div key={index} className='w-full mt-5 bg-slate-200 animate-pulse rounded-lg h-[200px]'>
              </div>
            ))}
      </div>
    </div>
  );
}

export default UserCourseList;
