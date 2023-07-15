import React from "react";
import avatar from "../assets/profile.png";
import {Link,useNavigate} from "react-router-dom"
import {useFormik} from 'formik';
import toast,{Toaster} from 'react-hot-toast';
import {validatepassword} from "../helper/validate";
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store'
import { verifyPassword } from '../helper/helper'

export default function Password() {

  const navigate = useNavigate()
  const { username } = useAuthStore(state => state.auth)
 
  const [{ isLoading, apiData, serverError }] = useFetch(`user/${username}`)
 
  const formik=useFormik({
       initialValues:
       {
         password:''
       }, 
       validateOnBlur:false,
       validateOnChange:false,
       validate:validatepassword,

       onSubmit:async values=>{
       // let loginPromise = verifyPassword({ username, password : values.password })
        toast.promise(verifyPassword({ username, password : values.password }), {
          loading: 'Checking...',
          success : <b>Login Successfully...!</b>,
          error : <b>Password Not Match!</b>
        })
  
        .then(res => {
          let { token } = res.data;
          localStorage.setItem('token', token);
          navigate('/profile')
        })
      }
       })
  if(isLoading) return <h1 className=''>isLoading</h1>;
   if(serverError) return <h1 className=''>{serverError.message}</h1>

  return (
    <div>
     <Toaster position="top-center" reverseOrder={false}></Toaster>
     <div className="container-well mt-5 ">
      <div className="row justify-content-center  ">
      
        <h3 className="col-2 mt-10">Hello {apiData?.firstName || apiData?.username}</h3>
      </div>
      <div className="row justify-content-center">
        <p className="col-2.5">Explore more by connecting with us</p>
      </div>

      <div className="row justify-content-center ">
      <div class="col-md-2-sm-1  px-0">
        <img style={{height:200}}
          className="img-responsive "
          src={apiData?.profile || avatar}
          alt="proile"
        ></img>
        </div>
    
      </div>
      <form onSubmit={formik.handleSubmit}>
      <div className="row justify-content-center " onSubmit={formik.handleSubmit}>
          <input className="text" style={{marginTop:10}} type="text" name="password" onChange={formik.handleChange} value={formik.values.password} placeholder="password" ></input>

        </div>
        <div  className="row justify-content-center  ">
          <button  type='submit' style={{marginTop:10}} onSubmit={formik.handleSubmit} className="btn btn-success">Let's go</button>
        </div>
        <div className="row justify-content-center  ">
          <p>Forgot password? <Link to="/recovery">Recover now</Link></p>
        </div>
      
        </form>
    </div>
    </div>
  );
}
