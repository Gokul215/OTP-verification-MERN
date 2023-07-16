import React, { useState,useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from '../store/store';
import { generateOTP, verifyOTP } from '../helper/helper';
import { useNavigate } from 'react-router-dom';

export default function Recovery() {
  const { username } = useAuthStore((state) => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();

 
    const [timerDuration, setTimerDuration] = useState(30); // Timer duration in seconds
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  
    useEffect(() => {
      let interval;
      if (isTimerRunning && timerDuration > 0) {
        interval = setInterval(() => {
          setTimerDuration((prevDuration) => prevDuration - 1);
        }, 1000);
        
      }  if (timerDuration === 0) {
        setIsButtonDisabled(true);
        setIsTimerRunning(false);
        setTimerDuration(30);
      }
  
      return () => clearInterval(interval);
    }, [isTimerRunning, timerDuration]);
  
    
   
    
  
 // useEffect(() => {
  //  generateOTP(username)
  //     .then((OTP) => {
  //       console.log(OTP);
  //       if (OTP) {
  //         toast.success('OTP has been sent to your email!');
  //       } else {
  //         toast.error('Problem while generating OTP!');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       toast.error('An error occurred while generating OTP!');
  //     });
  //}, [username]);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code: OTP });
      if (status === 201) {
        toast.success('Verify Successfully!');
        return navigate('/reset');
      }
    } catch (error) {
      return toast.error('Wrong OTP! Check email again!');
    }
  }

  function resendOTP() {
    setIsTimerRunning(true);
    setIsButtonDisabled(true);
  
  

//  if(timerDuration === 0){
//     setIsTimerRunning(false);
//     setIsButtonDisabled(true);
//     setTimerDuration(5); // Reset timer duration
//  }
    
    toast.promise(
      generateOTP(username),
      {
        loading: 'Sending...',
        success: <b>OTP has been sent to your email!</b>,
        error: <b>Could not Send it!</b>,
      }
    ).then((OTP) => {
      console.log(OTP);
    });
  }

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container-well mt-5 ">
        <div className="row justify-content-center  ">
          <h3 className="col-2 mt-10">Recovery</h3>
        </div>
        <div className="row justify-content-center">
          <p className="col-2.5">Enter OTP to recovery</p>
        </div>

        <div className="row justify-content-center ">
          {/* <button className="btn"  style={{color: "red"}} >Generate otp</button> */}
        </div>
        <form onSubmit={onSubmit}>
          <div className="row justify-content-center ">
            <input
              className="text"
              style={{ marginTop: 10 }}
              type="text"
              name="password"
              onChange={(e) => setOTP(e.target.value)}
              placeholder="OTP"
            />
          </div>
          <div className="row justify-content-center  ">
            <button type="submit" style={{ marginTop: 10 }} className="btn btn-success">
              Recover
            </button>
          </div>
        </form>
        <div className="row justify-content-center  ">
          <span style={{ marginTop: '10px' }}>
             get otp? <button className="btn" disabled={isTimerRunning || !isButtonDisabled} onClick={resendOTP} style={{ color: 'red' }}>Send</button>{timerDuration+"s"}
          </span>
        </div>
      </div>
    </div>
  );
}


