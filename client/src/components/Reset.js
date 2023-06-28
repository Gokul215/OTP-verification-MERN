import React from "react";


import {useFormik} from 'formik';
import {Toaster} from 'react-hot-toast';
import {resetpassword} from "../helper/validate";





export default function Reset() {
 
  const formik=useFormik({
       initialValues:
       {
         password:'',
         confpassword:''
       }, 
       validateOnBlur:false,
       validateOnChange:false,
       validate:resetpassword,

       onSubmit:async values=>{
        console.log(values)
       }
      
       
  })

  return (
    <div>
     <Toaster position="top-center" reverseOrder={false}></Toaster>
     <div className="container-well mt-5 ">
      <div className="row justify-content-center  ">
      
        <h3 className="col-3 mt-10">Reset your password</h3>
      </div>
      <div className="row justify-content-center">
       
      </div>

      <div className="row justify-content-center ">
     
    
      </div>
      <form onSubmit={formik.handleSubmit}>
      <div className="row justify-content-center " onSubmit={formik.handleSubmit}>
          <input className="text" style={{marginTop:10}} type="text" name="password" onChange={formik.handleChange} value={formik.values.password} placeholder="New password" ></input>
         

        </div>
        <div className="row justify-content-center " onSubmit={formik.handleSubmit}>
         
          <input className="text" style={{marginTop:10}} type="text" name="confpassword" onChange={formik.handleChange} value={formik.values.confpassword} placeholder="Confirm password" ></input>

        </div>
        <div  className="row justify-content-center  ">
          <button  type='submit' style={{marginTop:10}} onSubmit={formik.handleSubmit} className="btn btn-success">Reset</button>
        </div>
      
      
        </form>
    </div>
    </div>
  );
}

