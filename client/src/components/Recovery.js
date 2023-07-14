import React, { useEffect, useState } from 'react'

import toast,{Toaster} from 'react-hot-toast';
import { useAuthStore } from  '../store/store'
import { generateOTP, verifyOTP } from '../helper/helper';
import { useNavigate } from 'react-router-dom'


export default function Recovery() {
  const { username } = useAuthStore(state => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      console.log(OTP)
      if(OTP) return toast.success('OTP has been send to your email!');
      return toast.error('Problem while generating OTP!')
    })
  }, [username]);
 
  async function onSubmit(e){
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code : OTP })
      if(status === 201){
        toast.success('Verify Successfully!')
        return navigate('/reset')
      }  
    } catch (error) {
      return toast.error('Wront OTP! Check email again!')
    }
  }
  // handler of resend OTP
  function resendOTP(){

    let sentPromise = generateOTP(username);

    toast.promise(sentPromise ,
      {
        loading: 'Sending...',
        success: <b>OTP has been send to your email!</b>,
        error: <b>Could not Send it!</b>,
      }
    );

    sentPromise.then((OTP) => {
      console.log(OTP)
    });
    
  }
  // const formik=useFormik({
  //      initialValues:
  //      {
  //        password:''
  //      }, 
  //      validateOnBlur:false,
  //      validateOnChange:false,
       

  //      onSubmit:async values=>{
  //       console.log(values)
  //      }
      
       
  // })

  return (
    <div>
     <Toaster position="top-center" reverseOrder={false}></Toaster>
     <div className="container-well mt-5 ">
      <div className="row justify-content-center  ">
      
        <h3 className="col-2 mt-10">Recovery</h3>
      </div>
      <div className="row justify-content-center">
        <p className="col-2.5">Enter OTP to recovery</p>
      </div>

      <div className="row justify-content-center ">
    
    
      </div>
      <form  onSubmit={onSubmit}>
      <div className="row justify-content-center " >
          <input className="text" style={{marginTop:10}} type="text" name="password"  onChange={(e) => setOTP(e.target.value) }   placeholder="OTP" ></input>

        </div>
        <div  className="row justify-content-center  ">
          <button  type='submit' style={{marginTop:10}}  className="btn btn-success">Recover</button>
        </div>
        </form>
        <div className="row justify-content-center  ">
          <span style={{marginTop:"10px"}}>can't get otp? <button className="btn" onClick={resendOTP} style={{color: "red"}} >Resend</button></span>
        </div>
      
       
    </div>
    </div>
  );
}

