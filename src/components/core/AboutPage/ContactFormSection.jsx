import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'
const ContactFormSection = () => {
  return (
    <div className='mx-auto flex flex-col gap-4 w-11/12'>
        <h1 className="text-center text-4xl font-semibold mt-8">
            Get in Touch
        </h1>

        <p className='inter font-[600] text-[16px] leading-[24px] text-center text-richblack-300 mb-[3rem]'>
            We'd love to here for you  , Please fill out this form
        </p>
        <div className=' w-[80%] md:w-[45%] mx-auto'>
            <ContactUsForm/>
        </div>

    </div>
  )
}

export default ContactFormSection