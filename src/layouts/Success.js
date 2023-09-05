import React, { useEffect, useState } from 'react'

function Success() {
  const [subscriptionDetails, setSubscriptionDetails] = useState({})
  const [sessionID,setSessionID] = useState()

  const handleSession = async() => {
    const res = await fetch('http://localhost:1337/get-user')
    const userData = await res.json()
    console.log('userData',userData[0])
    // sessionDetails = JSON.parse(userData[0].subscription)
    // console.log(sessionDetails.sessionId)
    setSessionID(userData[0].sessionId)
    console.log('sessionID',sessionID)
  };

  const handleSubscription=async(id)=>{
    try{
      const res = await fetch('http://localhost:1337/api/subscription-details',{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({sessionId:id})
      })
     
        const data = await res.json()
        console.log('data',data)
        
      
    }catch(e){
      console.error(e)
    }
  }


	useEffect(() => {
		handleSession();
	}, []);

  useEffect(()=>{
    if(sessionID){
      handleSubscription(sessionID);
    }
  },[sessionID])

  return (
		<div className='m-0 p-0'>
			<div className='w-full min-h-[80vh] flex flex-col justify-center items-center'>
				<div className='my-10 text-green-600 text-2xl mx-auto flex flex-col justify-center items-center'>
					<h3 className='text-4xl pt-20 lg:pt-0 font-bold text-center text-slate-700'>Payment Successful</h3>
					<div className='flex flex-col text-left'> 
						<span>Payment Status:</span>
						<span>Plan Type: </span>
						<span>Start Date: </span>
						<span>End Date: </span>
						<span>Paid on: </span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Success