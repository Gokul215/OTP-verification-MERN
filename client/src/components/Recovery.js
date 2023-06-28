import React from "react";

import {useFormik} from 'formik';
import {Toaster} from 'react-hot-toast';






export default function Recovery() {
 
  const formik=useFormik({
       initialValues:
       {
         password:''
       }, 
       validateOnBlur:false,
       validateOnChange:false,
       

       onSubmit:async values=>{
        console.log(values)
       }
      
       
  })

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
      <form onSubmit={formik.handleSubmit}>
      <div className="row justify-content-center " >
          <input className="text" style={{marginTop:10}} type="text" name="password" onChange={formik.handleChange} value={formik.values.password} placeholder="OTP" ></input>

        </div>
        <div  className="row justify-content-center  ">
          <button  type='submit' style={{marginTop:10}} onSubmit={formik.handleSubmit} className="btn btn-success">Recover</button>
        </div>
        <div className="row justify-content-center  ">
          <span style={{marginTop:"10px"}}>can't get otp? <button className="btn" style={{color: "red"}} >Resend</button></span>
        </div>
      
        </form>
    </div>
    </div>
  );
}

