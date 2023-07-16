import React, { useState } from "react";
import avatar from "../assets/profile.png";

import {Link,useNavigate} from "react-router-dom"
import {useFormik} from 'formik';
import toast,{Toaster} from 'react-hot-toast';
import {registerValidation} from "../helper/validate";
import { useRef } from "react";
// import convert from "../helper/convert";
import { registerUser } from '../helper/helper'




export default function Register() {
  const navigate = useNavigate()
  const [file,setfile]=useState();
  const image=useRef("");
 
  const formik=useFormik({
       initialValues:
       {
        email: '',
        username: '',
        password : ''
       }, 
       validateOnBlur:false,
       validateOnChange:false,
       validate:registerValidation,

       onSubmit:async values=>{
        values = await Object.assign(values, { profile : file })
       // console.log(values)
      
        //let registerPromise = await registerUser(values)
       
        toast.promise(registerUser(values), {
        
          loading: 'Creating...',
          success : <b>Register Successfully...!</b>,
          error : <b>Could not Register.</b>
        })
        .then(function(){ navigate('/')})
          .catch((err)=>{
            console.log("Error", err)
          });
         }
      
      })
       


  const  onUpload = async e =>{
    // const base64 = convert(e.target.files[0]);
    // setfile(base64);
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setfile(reader.result);
      };

     
    }

  }

  const uploadphoto =()=>{
    image.current.click();
  }

  return (
    <div>
     <Toaster position="top-center" reverseOrder={false}></Toaster>
     <div className="container-well mt-5 ">
      <div className="row justify-content-center  "> 
      
        <h3 className="col-1.5 mt-10">Register</h3>
      </div>
      <div className="row justify-content-center">
        <p className="col-2.5">Explore more by connecting with us</p>
      </div>

     
      <form name="form" onSubmit={formik.handleSubmit}>

      <div className="row justify-content-center ">
      <div class="col-md-2-sm-1  px-0"  >

      <label htmlFor="proile">

      
        <img style={{height:200}}
          className="img-responive "
          src={file || avatar}
           onClick={uploadphoto}
          
          alt="proile"
        
        />
      
      </label>

        <input  values= {formik.values.profile} style={{display:"none"}} ref={image}  onChange={onUpload} type="file" id="profile" name="profile" />
        </div>
    
      </div>
      <div className="row justify-content-center " >
          <input className="text  " style={{marginTop:10}} type="email" name="email" onChange={formik.handleChange} value={formik.values.email} placeholder="email" ></input>
        
          
        </div>
        <div className="row justify-content-center " >
        
          <input className="text " style={{marginTop:10}} type="text" name="username" onChange={formik.handleChange} value={formik.values.username} placeholder="username" ></input>
         

        </div>
        <div className="row justify-content-center ">
          
          <input className="text  " style={{marginTop:10}} type="password" name="password" autoComplete="false"  onChange={formik.handleChange} value={formik.values.password} placeholder="password" ></input>
         
        </div>
        <div  className="row justify-content-center  ">
          <button  type='submit' style={{marginTop:10}} onSubmit={formik.handleSubmit} className="btn btn-success">Sign in</button>
        </div>
        <div className="row justify-content-center  ">
          <p>Already registered? <Link to="/">Login now</Link></p>
        </div>
      
        </form>
    </div>
    </div>
  );
}

