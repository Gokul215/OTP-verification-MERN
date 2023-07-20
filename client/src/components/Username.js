import React from "react";
import avatar from "../assets/profile.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { validateuser } from "../helper/validate";
import { useAuthStore } from "../store/store";
import "../index.css";

export default function Username() {
  const setUsername = useAuthStore((state) => state.setUsername);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: validateuser,

    onSubmit: async (values) => {
      // console.log(values)
      setUsername(values.username);
      navigate("/password");
    },
  });

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="container-well mt-5 ">
        <div className="row justify-content-center">
          <h3 className="col-4-md-4 mt-10">Hello Again</h3>
        </div>
        <div className="row justify-content-center">
          <p className="col-2.5">Explore more by connecting with us</p>
        </div>

        <div className="row justify-content-center ">
          <div class="col-md-2-sm-1  px-0">
            <img
              style={{ height: 200 }}
              className="img-responsive "
              src={avatar}
              alt="proile"
            ></img>
          </div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div
            className="row justify-content-center "
            onSubmit={formik.handleSubmit}
          >
            <input
              className="text"
              style={{ marginTop: 10 }}
              type="text"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              placeholder="Username"
            ></input>
          </div>
          <div className="row justify-content-center  ">
            <button
              type="submit"
              style={{ marginTop: 10 }}
              onSubmit={formik.handleSubmit}
              className="btn btn-success"
            >
              Let's go
            </button>
          </div>
          <div className="row justify-content-center  ">
            <p>
              Not a member? <Link to="/register">Register now</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
