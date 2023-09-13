import React, { useEffect, useState } from 'react'
import moment from 'moment'

function Success() {
  const [subscriptionDetails, setSubscriptionDetails] = useState({})
  
  // const checkdate = moment.unix(1694608813).format('YYYY-MM-DD')
  // console.log(checkdate)

  const handleSession = async() => {
    const res = await fetch('http://localhost:1337/api/subscription-details')
    const userData = await res.json()
    console.log(userData.user[0])
    //  const {current_period_start,} = userData.customer.subscriptions.data[0]
    setSubscriptionDetails({
			startDate: userData.user[0].subscriptions.startDate,
			endDate: userData.user[0].subscriptions.endDate,
      durationInDays: userData.user[0].subscriptions.durationInDays,
			customerEmail: userData.user[0].subscriptions.customerEmail,
      price: userData.user[0].subscriptions.price
		});
    // sessionDetails = JSON.parse(userData[0].subscription)
    // console.log(sessionDetails.sessionId)
    // setSessionID(userData[0].sessionId)
    // console.log('sessionID',sessionID)
  };

  // const handleSubscription=async(id)=>{
  //   try{
  //     const res = await fetch('http://localhost:1337/api/subscription-details',{
  //       method:"POST",
  //       headers:{
  //         'Content-Type':'application/json'
  //       },
  //       body:JSON.stringify({sessionId:id})
  //     })
     
  //       const data = await res.json()
  //       const {payment_status,created,expires_at,status
  //       } = data.successSession
  //       const startDate = moment.unix(created).format('YYYY-MM-DD');
  //       const endDate = moment.unix(expires_at).format('YYYY-MM-DD');
  //       const durationInSeconds = expires_at - created
  //       const durationInDays = moment.duration(durationInSeconds, 'seconds').asDays();
  //       setSubscriptionDetails({paymentStatus:payment_status,startDate,endDate,durationInDays, subscriptionStatus:status})
  //       console.log('data',data.successSession)
        
      
  //   }catch(e){
  //     console.error(e)
  //   }
  // }


	useEffect(() => {
		handleSession();
	}, []);

  // useEffect(()=>{
  //   if(sessionID){
  //     handleSubscription(sessionID);
  //   }
  // },[sessionID])

  return (
		<div className='m-0 p-0'>
			<div className='w-full min-h-[80vh] flex flex-col justify-center items-center'>
				<div className='my-10 text-green-600 text-2xl mx-auto flex flex-col justify-center items-center'>
					<h3 className='text-4xl pt-20 lg:pt-0 font-bold text-center text-slate-700'>Payment Successful</h3>
					<div className='flex flex-col text-left'> 
						<span>Customer Email: {subscriptionDetails.customerEmail}</span>
						<span>Start Date: {subscriptionDetails.startDate}</span>
						<span>End Date: {subscriptionDetails.endDate}</span>
						<span>Final Invoice Amount : {subscriptionDetails.price}</span>
						<span>Duration (in Days): {subscriptionDetails.durationInDays}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Success