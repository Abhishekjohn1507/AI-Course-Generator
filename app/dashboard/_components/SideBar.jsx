'use client';

import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { HiOutlineHome } from 'react-icons/hi';
import { HiOutlineSquare3Stack3D } from 'react-icons/hi2';
import { GiArmorUpgrade } from 'react-icons/gi';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
import { UserSubscriptionContext } from '../../_context/UserSubsCriptionContext';
import { db } from '@/configs/db';
import { UserSubscription } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';

function SideBar() {
  const { userCourseList } = useContext(UserCourseListContext);
  const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);
  const path = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const [maxCourses, setMaxCourses] = useState(5);

  // Check if user is subscribed and update subscription status
  const checkUserSubscription = async () => {
    if (!user) return; // Early return if user is not available
    try {
      const result = await db
        .select()
        .from(UserSubscription)
        .where(eq(UserSubscription.email, user?.primaryEmailAddress?.emailAddress));

      console.log('Subscription Query Result:', result);

      // Update subscription status based on query result
      if (result.length > 0 && result[0]?.active) {
        setUserSubscription({ isActive: true });
        setMaxCourses(10); // Active subscription allows 10 courses
      } else {
        setUserSubscription({ isActive: false });
        setMaxCourses(5); // Default to 5 courses for free plan
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  };

  // Fetch subscription info when user changes
  useEffect(() => {
    checkUserSubscription();
  }, [user]);

  // Redirect to billing if course limit exceeded without subscription
  useEffect(() => {
    if (userCourseList.length >= maxCourses && !UserSubscription.isActive) {
      router.push('/dashboard/billing');
    }
  }, [userCourseList, UserSubscription.isActive, maxCourses, router]);

  // Redirect to dashboard only if the user has an active subscription and the current path is not '/dashboard'
  useEffect(() => {
    if (UserSubscription.isActive && path !== '/dashboard') {
      router.push('/dashboard');
    }
  }, [UserSubscription.isActive, path, router]);

  // Sidebar menu items
  const Menu = [
    { id: 1, name: 'Home', icon: <HiOutlineHome />, path: '/dashboard' },
    { id: 2, name: 'Explore', icon: <HiOutlineSquare3Stack3D />, path: '/dashboard/explore' },
    { id: 3, name: 'Upgrade', icon: <GiArmorUpgrade />, path: '/dashboard/billing' },
    { id: 4, name: 'Logout', icon: <RiLogoutCircleRLine />, path: '/dashboard/logout' },
  ];

  return (
    <div className='fixed h-full md:w-64 p-5 shadow-md'>
      {/* Logo */}
      <Link href={'/'}>
        <Image src={'/logo.svg'} width={150} height={100} alt="Logo" />
      </Link>
      <hr className='my-10' />

      {/* Menu */}
      <ul>
        {Menu.map((item) => (
          <Link key={item.id} href={item.path}>
            <div className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg mb-3 
              ${path === item.path ? 'bg-gray-100 text-black' : ''}`}>
              <div className='text-2xl'>{item.icon}</div>
              <h2>{item.name}</h2>
            </div>
          </Link>
        ))}
      </ul>

      {/* Progress Bar */}
      <div className='absolute bottom-10 w-[80%]'>
        <Progress value={(userCourseList.length / maxCourses) * 100} />
        <h2 className='text-sm my-2'>{userCourseList.length} out of {maxCourses} Courses Created</h2>

        {/* Subscription Message */}
        <h2 className='text-xs text-gray-500'>
          {UserSubscription.active
            ? `You have an active subscription. Create up to ${maxCourses} courses.`
            : 'You can create up to 5 courses with the free plan. Upgrade for unlimited course creation.'}
        </h2>
      </div>
    </div>
  );
}

export default SideBar;
