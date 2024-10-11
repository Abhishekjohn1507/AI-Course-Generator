'use client'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import { UserSubscription } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs/db';
import moment from 'moment';
import UserSubscriptionContext from '../_context/UserSubscriptionContext'; // Adjust this path as necessary.




const Billing = () => {
    const {user}=useUser();
  const [loading, setLoading] = useState(false);
  const [razorpayReady, setRazorpayReady] = useState(false);
  const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);


  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => setRazorpayReady(true);
      document.body.appendChild(script);
    };
    loadRazorpayScript();
  }, []);

  const CreateSubscription = async () => {
    setLoading(true);
    try {
      const resp = await axios.post('/api/create-subscription', {});
      console.log(resp.data);
      // Extract the subscription ID from the response
      if (resp.data.success && resp.data.subscription) {
        const subId = resp.data.subscription.id;
        OnPayment(subId);
      } else {
        console.error('Subscription creation failed:', resp.data);
      }
    } catch (error) {
      console.error('Error creating subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const OnPayment = (subId) => {
    if (!razorpayReady) {
      console.error('Razorpay is not loaded yet');
      return;
    }
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      subscription_id: subId,
      name: 'AI Course Generator by SKILLZEE',
      description: 'AI Course Generator by SKILLZEE',
      handler: async (resp) => {
        console.log(resp);
        if(resp){
            SaveSubscription(resp?.razorpay_payment_id)
        }
        setLoading(false)
        // Handle successful payment response here
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  }
  const SaveSubscription=async(paymentId)=>{
    const result=await db.insert(UserSubscription)
    .values({
        email:user?.primaryEmailAddress?.emailAddress,
        userName:user?.fullName,
        active:true,
        paymentId:paymentId,
        joinDate:moment().format('DD/MM/yyyy')

        });
        console.log(result);
        if(result){
            window.location.reload();
        }

  }










    return (
    <div>
       
      
      <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 pb-10 mx-auto" >
    
      <div className="flex flex-col text-center w-full mb-10 mt-10" >
      <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1"> Pricing</h2>
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">All Premium Plans </h1>
    </div>
    <div className="flex flex-wrap -m-4" >
      <div className="p-4 xl:w-1/4 md:w-1/2 w-full " >
        <div className="h-full p-6 rounded-lg border-2 shadow-lg border-gray-300 flex flex-col relative overflow-hidden" >
          <h2 className="text-sm tracking-widest title-font mb-1 font-medium">START</h2>
          <h1 className="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">Free</h1>
          <p className="flex items-center text-gray-600 mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Unlimited Content Generation
          </p>
          <p className="flex items-center text-gray-600 mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Priority Support
          </p>
          <p className="flex items-center text-gray-600 mb-6">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Advanced Analytics
          </p>
          
          <button 
          
           className="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">Subscribe
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
          
        </div>
      </div>
      <div className="p-4 xl:w-1/4 md:w-1/2 w-full" >
        <div className="h-full p-6 rounded-lg border-2 shadow-lg border-indigo-500 flex flex-col relative overflow-hidden" >
          <span className="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">POPULAR</span>
          <h2 className="text-sm tracking-widest title-font mb-1 font-medium">PRO</h2>
          <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
            <span>₹350</span>
            <span className="text-lg ml-1 font-normal text-gray-500">/mo</span>
          </h1>
          <p className="flex items-center text-gray-600 mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Unlimited Content Generation
          </p>
          <p className="flex items-center text-gray-600 mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Priority Support
          </p>
          <p className="flex items-center text-gray-600 mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Team Collaboration
          </p>
          <p className="flex items-center text-gray-600 mb-6">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Advanced Analytics
          </p>
          
          <button
  disabled={loading || UserSubscription?.Isactive} // Disable only if loading or the subscription is active
  onClick={() => CreateSubscription()}
  className={`flex items-center mt-auto py-2 px-4 w-full focus:outline-none rounded ${
    UserSubscription?.Isactive
      ? 'bg-transparent text-gray-500 border border-gray-500'  // Style when the plan is active
      : 'bg-indigo-500 text-white hover:bg-indigo-600'         // Style when no active plan (button is enabled)
  }`}>
  
  {loading && <Loader2Icon className='animate-spin' />}
  
  {/* Set to "Subscribe" when no active plan, otherwise "Active Plan" */}
  {UserSubscription?.Isactive?'Active Plan':'Subscribe'  }
  
  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7"></path>
  </svg>
</button>



          
        </div>
      </div>
     
    </div>
  </div>
</section>
    </div>
  )
}

export default Billing
