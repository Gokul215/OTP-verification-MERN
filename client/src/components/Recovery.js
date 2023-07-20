import React, { useState,useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from '../store/store';
import { generateOTP, verifyOTP } from '../helper/helper';
import { useNavigate } from 'react-router-dom';

export default function Recovery() {
  const { username } = useAuthStore((state) => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();

 
    // const [timerDuration, setTimerDuration] = useState(10); // Timer duration in seconds
    // const [isTimerRunning, setIsTimerRunning] = useState(false);
    // const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    
    const [timer, setTimer] = useState(0);
    const timerRef = useRef(null);
 
   
  //   useEffect(() => {
  //    generateOTP(username).then(()=>{
  // setIsButtonDisabled(true);
  // // if (timerDuration > 1){
  // //   setTimerDuration(timerDuration-1);
  // //  }

  // let interval= setInterval(() => {
  //   if (isTimerRunning && timerDuration > 1){
  //     setTimerDuration((timerDuration)=>timerDuration-1);
  //    }
  //      }, 1000);
  //      return () => {
  //        clearInterval(interval);
  //      };
  //     },[]);
  //     });
  //     if (timerDuration===0){
  //     return  ()=>{setIsButtonDisabled(false)
  //       setTimerDuration(10)
  //       setIsTimerRunning(false)}
  //     }
//     //let interval;
//     let interval;
//     if (isTimerRunning && timerDuration > 0) {
//       setIsButtonDisabled(true);
//       interval = setInterval(() => {
//         setTimerDuration((prevDuration) => prevDuration - 1);
     
      
//     //   if (timerDuration === 0) {
//     //   setIsButtonDisabled(true);
//     //   setIsTimerRunning(false);
//     //   setTimerDuration(10);
//     // }
//   }, 1000);
      
// } 

//     return () => clearInterval(interval);
//   }, [isTimerRunning, timerDuration]); 
// })
      // if (timerDuration === 0) {
      //   setIsButtonDisabled(false);
      //   setIsTimerRunning(false);
      //   setTimerDuration(30);
        
      // }
      
  
      
   
  
 
   
    
  
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
    
    
    toast.promise(
      generateOTP(username),
      {
        loading: 'Sending...',
        success: <b>OTP has been sent to your email!</b>,
        error: <b>Could not Send it!</b>,
      }
    ).then((OTP) => {
      console.log(OTP);
      setTimer(30); // Replace '10' with your desired starting time in seconds
      
      timerRef.current = setInterval(() => {
       
        setTimer(prevTimer => {
          if (prevTimer === 0) {
            clearInterval(timerRef.current);
            return prevTimer;
          }
          return prevTimer - 1;
        });
      }, 1000);
   
    });
  }
  const disableButton = timer !== 0;
  console.log(disableButton,timer);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container-well mt-4">
        <div className="row justify-content-center  ">
          <h3 className="col-2.5 ">Recovery</h3>
        </div>
        <div className="row justify-content-center">
          <p className="col-4-md-4">Enter OTP to recovery</p>
        </div>

        <div className="row justify-content-center ">
          {/* <button className="btn"  style={{color: "red"}} >Generate otp</button> */}
        </div>
        <form onSubmit={onSubmit}>
          <div className="row justify-content-center ">
            <input
              className="text"
             
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
          <span style={{ marginTop: 10 }}>
             get otp? <button className="btn" onClick={resendOTP} disabled={disableButton}style={{ color: 'red' }}>Send</button>  {timer+"s"}
          </span>
        </div>
      </div>
    </div>
  );
}


