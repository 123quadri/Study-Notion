import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { getPasswordResetToken } from "../services/operations/authAPI";

const ForgotPassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();

  const handleOnSubmit =  (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent));
  }
  return (
    <div className="flex items-center justify-center w-11/12 mx-auto mt-[10%] ">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className=" flex flex-col gap-5 w-[100%] sm:w-[35%]  ">
          <h1 className="text-richblack-25 text-3xl font-[600]">
            {emailSent ? "Check Tour Email" : "Reset your password"}
          </h1>

          <p className="text-richblack-100 leading-[26px]">
            {emailSent
              ? `we have sent the reset emai to ${email}`
              : "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery "}
          </p>
          <form onSubmit={handleOnSubmit} className="flex flex-col gap-8">
            {!emailSent && (
              <label>
                <p className="text-richblack-100  mb-[5px] font-inter">
                  Email Address <sup className="text-[red]">*</sup>
                </p>
                <input
                 autoComplete="off"
                  className="bg-richblack-800 px-[6px] 
                                    w-[100%] py-[12px] rounded-md text-richblack-25"
                  type="email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter you email"
                />
              </label>
            )}
            <button
              type="submit"
              className="bg-[#FFD60A] text-richblack-900 w-[100%] h-[48px] rounded-[8px] font-bold leading-[24px] "
            >
              {emailSent ? "Resend Email" : "Reset Password"}
            </button>
          </form>
          <div>
            <NavLink to="/login">
              <p className="text-richblack-100 flex items-center gap-2">
                {" "}
                <BsArrowLeft /> Back to login
              </p>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
