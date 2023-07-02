import React, { useState } from "react";
import avatar from "../assets/profile.png";


import {useFormik} from 'formik';
import {Toaster} from 'react-hot-toast';
import {profileValidation} from "../helper/validate";
import { useRef } from "react";
// import convert from "../helper/convert";





export default function Profile() {

  const [file,setfile]=useState();
  const image=useRef("");
 
  const formik=useFormik({
       initialValues:
       {
        email: '',
        Firstname: '',
        LastName:'',
        mobile:'',
        address: ''
       }, 
       validateOnBlur:false,
       validateOnChange:false,
       validate:profileValidation,

       onSubmit:async values=>{
        values = await Object.assign(values, { profile : file })
        console.log(values)
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
      
        <h3 className="col-1.5 mt-10">Profile</h3>
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
      <div className="row justify-content-center " onSubmit={formik.handleSubmit}>
          <input className="text  " style={{marginTop:10}} type="email" name="email" onChange={formik.handleChange} value={formik.values.email} placeholder="email" ></input>
        
          
        </div>
        <div className="row justify-content-center " onSubmit={formik.handleSubmit}>
        
          <input className="text " style={{marginTop:10}} type="text" name="Firstname" onChange={formik.handleChange} value={formik.values.Firstname} placeholder="firstname" ></input>
         

        </div>
        <div className="row justify-content-center " onSubmit={formik.handleSubmit}>
        
        <input className="text " style={{marginTop:10}} type="text" name="Lastname" onChange={formik.handleChange} value={formik.values.Lastname} placeholder="Lastname" ></input>
       

      </div>
        <div className="row justify-content-center " onSubmit={formik.handleSubmit}>
          
          <input className="text  " style={{marginTop:10}} type="text" name="mobile" onChange={formik.handleChange} value={formik.values.mobile} placeholder="mobile" ></input>
         
        </div>
        <div className="row justify-content-center " onSubmit={formik.handleSubmit}>
        
        <input className="text " style={{marginTop:10}} type="text" name="Address" onChange={formik.handleChange} value={formik.values.Address} placeholder="Address" ></input>
       

      </div>
        <div  className="row justify-content-center  ">
          <button  type='submit' style={{marginTop:10}} onSubmit={formik.handleSubmit} className="btn btn-success">Update</button>
        </div>
        <div className="row justify-content-center  ">
          <p style={{marginTop:"10px"}}>Come back later? <button className="btn" style={{color: "red"}}>Logout</button></p>
        </div>
      
        </form>
    </div>
    </div>
  );
}


