import React from "react";
import {useFormik} from 'formik';
import toast, {Toaster} from 'react-hot-toast';
import {resetpassword} from "../helper/validate";
import { resetPassword } from '../helper/helper'
import { useAuthStore } from '../store/store';
import { useNavigate, Navigate } from 'react-router-dom';
import useFetch from '../hooks/fetch.hook'
import {Vortex} from 'react-loader-spinner'


export default function Reset() {
  const { username } = useAuthStore(state => state.auth);
  const navigate = useNavigate();
  const [{ isLoading,  status, serverError }] = useFetch('createResetSession')

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
        let resetPromise = resetPassword({ username, password: values.password })
        toast.promise(resetPromise, {
          loading: 'Updating...',
          success: <b>Reset Successfully...!</b>,
          error : <b>Could not Reset!</b>
        });
  
        resetPromise.then(function(){ navigate('/password') })
       }
      
       
  })
  if(isLoading) {
    return ( <div className="row justify-content-center">
    <Vortex
  visible={true}
  height="80"
  width="80"
  ariaLabel="vortex-loading"
  wrapperStyle={{}}
  wrapperClass="vortex-wrapper"
  colors={['red', 'green', 'blue', 'purple']}
/>
</div>)}
   if(serverError) return <h1 className='row justify-content-center text-danger'>{serverError.message}</h1>
   if(status && status !== 201) return <Navigate to={'/password'} replace={true}></Navigate>

  return (
    <div>
     <Toaster position="top-center" reverseOrder={false}></Toaster>
     <div className="container-well mt-4 ">
      <div className="row justify-content-center  ">
      
        <h3 className="col-6 mt-10">Reset your password</h3>
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

