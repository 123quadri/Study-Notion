import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { resetPassword } from '../services/operations/authAPI';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const {loading} = useSelector((state) => state.auth);

    const[showPassword , setShowPassword] = useState(false);
    const[showConfirmPassword , setShowConfirmPassword] = useState(false);

    const[formData , setFormData] = useState({password:"" , confirmPassword:""});


    const handleOnChange = (e) => {
        setFormData((prev) => {
            return{
                ...prev,
                [e.target.name] : e.target.value
            }
        })
    }
    const {password , confirmPassword} = formData;

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split("/").at(-1);
        dispatch(resetPassword(password , confirmPassword,token,navigate));
    }

  return (
    <div className="flex items-center justify-center w-11/12 mx-auto mt-[10%]">
        {
            loading ? (
                <div className='spinner'></div>
            ) : (
                    <div className='flex flex-col gap-3'>
                        <h1  className="text-richblack-25 text-3xl font-[600]">Choose  new Password</h1>
                        <p
                        className="text-richblack-100 leading-[26px]"
                        >Almost done. Enter your new password and youre all set.</p>

                        <form onSubmit={handleOnSubmit} className='flex flex-col gap-3'>
                            <label className="relative">
                                <p
                                className="text-richblack-100 leading-2 font-thin text-sm  mb-[5px] font-inter"
                                >New Password <sup className="text-pink-200">*</sup></p>
                               
                                <input 
                                 autoComplete="off"
                                className="bg-richblack-800 px-[6px] 
                                    w-[100%] py-[12px] rounded-md text-richblack-25"
                                type={showPassword ? "text" : "password"}
                                required
                                name='password'
                                value={password}
                                onChange={handleOnChange}
                                placeholder=' Password'
                                />

                                <span
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                                onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {
                                        showPassword ? 
                                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> 
                                        : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
                                    }
                                </span>
                            </label>

                            <label className='relative'>
                                <p
                                 className="text-richblack-100 leading-2 font-thin text-sm mt-[5px]  mb-[5px] font-inter"
                                >Confirm New Password <sup className="text-pink-200">*</sup></p>
                                <input
                                 autoComplete="off"
                                className="bg-richblack-800 px-[6px] 
                                    w-[100%] py-[12px] rounded-md text-richblack-25" 
                                type={showConfirmPassword ? "text" : "password"}
                                required
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={handleOnChange}
                                placeholder='Confirm Password'
                                />

                                <span
                                className="absolute right-3 top-[42px] z-[10] cursor-pointer"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                >
                                    {
                                        showConfirmPassword ? 
                                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> 
                                        : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
                                    }
                                </span>
                            </label>

                            <button 
                             className="bg-[#FFD60A] text-richblack-900 w-[100%] h-[48px] 
                             rounded-[8px] font-bold leading-[24px] mt-[15px] "
                            type='submit'>
                                Reset password
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
            )
        }

    </div>
  );
};

export default UpdatePassword;