import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../services/apiconnector";
import { contactusEndpoint } from "../../services/apis";
import CountryCode from "../../data/countrycode.json";
import { toast } from "react-hot-toast";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    // console.log("Form data is :" , data) ;
    const toastId = toast.loading("Loading...")
        try {
            setLoading(true);
            const response = await apiConnector('POST', contactusEndpoint.CONTACT_US_API , data);
            // console.log("Form response is :" , response); 
            setLoading(false); 
            toast.success("Your request has been sent successfully.")
        } 
        catch (error) {
            // console.log("error is :" ,  error.message);
            setLoading(false);
            toast.error(error.message)
        }
        toast.dismiss(toastId)
        
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);
  return (
    <form onSubmit={handleSubmit(submitContactForm)}
    className="mx-auto"
    >
      <div className="flex flex-col gap-12">
        <div className="flex flex-col  justify-between gap-12 lg:flex-row">
          <div className="flex flex-col gap-2">
            <label htmlFor="firstname"
            className="inter font-[400] text-richblack-5 text-[14px] leading-[22px]"
            > First Name <sup className="text-[red]">*</sup></label>
            <input
            autoComplete="off"
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter First Name"
              {...register("firstname", { required: true })}
              className="bg-richblack-800 rounded-md p-[12px]"
            />
            {errors.firstname && <span
              className="text-[red]  text-[13px]"
            >Please enter Your name</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="lastname"
             className="inter font-[400] text-richblack-5 text-[14px] leading-[22px]"
            > Last Name</label>
            <input
            autoComplete="off"
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Enter First Name"
              {...register("lastname")}
              className="bg-richblack-800 rounded-md p-[12px]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email"
           className="inter font-[400] text-richblack-5 text-[14px] leading-[22px]"
          >Email Address <sup className="text-[red]">*</sup></label>
          <input
          autoComplete="off"
            type="email"
            id="email"
            name="email"
            placeholder="Enter  email address"
            {...register("email", { required: true })}
            className="bg-richblack-800 rounded-md p-[12px]"
          />
          {errors.email && <span
          className="text-[red]  text-[13px]"
          >Please Enter your email address</span>}
        </div>

        <div className="flex flex-col gap-2">
                <label htmlFor="phonenumber"
                 className="inter font-[400] text-richblack-5 text-[14px] leading-[22px]"
                >
                Phone Number <sup className="text-[red]">*</sup>
                </label>

                <div className="flex gap-5">
                <div className="flex w-[80px] flex-col gap-2">
                    <select
                    type="text"
                    name="dropdown"
                    id="dropdown"
                    placeholder="Enter first name"
                    className="bg-richblack-800 rounded-md p-[12px]"
                    {...register("countrycode", { required: true })}
                    >
                    {CountryCode.map((ele, i) => {
                        return (
                        <option key={i} value={ele.code}>
                            {ele.code} -{ele.country}
                        </option>
                        )
                    })}
                    </select>
                </div>
                <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                    <input
                    autoComplete="off"
                    type="number"
                    name="phonenumber"
                    id="phonenumber"
                    placeholder="12345 67890"
                    className="
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
                     [&::-webkit-inner-spin-button]:appearance-none
                    bg-richblack-800 rounded-md p-[12px]"
                    {...register("phoneNo", {
                        required: {
                        value: true,
                        message: "Please enter your Phone Number.",
                        },
                        maxLength: { value: 12, message: "Invalid Phone Number" },
                        minLength: { value: 10, message: "Invalid Phone Number" },
                    })}
                    />
                </div>
                </div>
            {errors.phoneNo && (
            <span className=" text-[13px] text-[red]">
                {errors.phoneNo.message}
            </span>
            )}
      </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message"
           className="inter font-[400] text-richblack-5 text-[14px] leading-[22px]"
          >Message
           <sup className="text-[red]">*</sup></label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="10"
            {...register("message", { required: true })}
            className="bg-richblack-800 rounded-md p-[12px]"
          />
          {errors.message && <span
           className="text-[red]  text-[13px]"
          >Please enter message.</span>}
        </div>

        <button type="submit"
            className="text-center text-[16px] px-6 py-3 rounded-md font-bold 
            bg-yellow-50 text-black
            hover:scale-95 transition-all  duration-200">
            send Message
        </button>
      </div>
    </form>
  );
};

export default ContactUsForm;
