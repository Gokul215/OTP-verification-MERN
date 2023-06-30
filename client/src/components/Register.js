import React, { useState } from "react";
import avatar from "../assets/profile.png";
import {Link} from "react-router-dom"
import {useFormik} from 'formik';
import {Toaster} from 'react-hot-toast';
import {validatepassword} from "../helper/validate";
import convert from "../helper/convert";





export default function Register() {

  const [file,setfile]=useState();
 
  const formik=useFormik({
       initialValues:
       {
         password:''
       }, 
       validateOnBlur:false,
       validateOnChange:false,
       validate:validatepassword,

       onSubmit:async values=>{
        values = await Object.assign(values, { profile : file || ''})
        console.log(values)
       }
      
       
  })


  const  onUpload = async e =>{
    const base64 = convert(e.target.files[0]);
    setfile(base64);

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

     
      <form onSubmit={formik.handleSubmit}>

      <div className="row justify-content-center ">
      <div class="col-md-2-sm-1  px-0"  >

      <label htmlFor="proile">
        <img style={{height:200}}
          className="img-responsive "
          src={file || avatar}
          alt="proile"
        /></label>

        <input  onChange={onUpload} type="file" id="profile" name="profile" />
        </div>
    
      </div>
      <div className="row justify-content-center " onSubmit={formik.handleSubmit}>
          <input className="text  " style={{marginTop:10}} type="email" name="email" onChange={formik.handleChange} value={formik.values.email} placeholder="email" ></input>
        

        </div>
        <div className="row justify-content-center " onSubmit={formik.handleSubmit}>
        
          <input className="text " style={{marginTop:10}} type="Username" name="Username" onChange={formik.handleChange} value={formik.values.Username} placeholder="username" ></input>
        

        </div>
        <div className="row justify-content-center " onSubmit={formik.handleSubmit}>
          
          <input className="text  " style={{marginTop:10}} type="password" name="password" onChange={formik.handleChange} value={formik.values.password} placeholder="password" ></input>

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

