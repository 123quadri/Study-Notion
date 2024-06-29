import React from 'react'
import { privacyPolicyData } from '../data/privacy-policy'
import Footer from '../components/common/Footer'

const Privacypolicy = () => {
  return (
    <div className='w-[100%] mt-[3rem] text-white'>
    <h1 className='w-[80%] font-[600] text-[36px] leading-[44px] 
    font-inter text-richblack-5 mx-auto text-center'>Intelli Study Privacy Statement</h1>

        <div className='w-[80%] lg:w-[60%] mx-auto flex flex-col gap-y-7 mt-[2rem]'>
            {
                privacyPolicyData.map((privacyPolicy) => (
                    <div key={privacyPolicy?.id}>
                        <h1
                        className="font-bold bg-clip-text text-transparent bg-gradient-to-r
                         from-[#F09819] to-[#E65C00]
                         text-[36px] mb-[0.5rem]
                         "
                        >{privacyPolicy?.heading}</h1>

                        <p
                        className='text-richblack-300 inter  
                        text-[18px] leading-[24px] font-[600] mb-[1rem]'
                        >{privacyPolicy?.description}</p>
                        {
                            privacyPolicy?.subData && 
                            <ul className='flex flex-col gap-y-2'>
                            {
                                privacyPolicy?.subData.map((subPrivacyPolicy) => (
                                    <li key={subPrivacyPolicy.id}>
                                        <span
                                        className='text-richblack-100 inter  
                                text-[18px] leading-[24px] font-[600] mb-[1rem] mr-[4px]'
                                        > {subPrivacyPolicy?.subHeading}</span>
                                        <span
                                         className='text-richblack-50 inter  
                                text-[16px] leading-[24px] font-[500] mb-[1rem] '
                                        >{subPrivacyPolicy.subDescription}</span>
                                    </li>
                                ))
                            }
                            </ul>
                        }
                    </div>
                ))
            }
        </div>
        <Footer/>

    </div>
  )
}

export default Privacypolicy