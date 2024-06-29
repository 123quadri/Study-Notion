import React from 'react'
import { Terms } from '../data/Terms'
import HighlightText from '../components/core/HomePage/HighlightText'
import Footer from '../components/common/Footer'

const TermsPage = () => {
  return (
    <div className='w-[100%] mt-[3rem] text-white'>
     <h1 className='w-[80%] font-[600] text-[36px] leading-[44px] 
        font-inter text-richblack-5 mx-auto text-center'>Terms of Use</h1>

        <div className='w-[80%] lg:w-[60%] mx-auto flex flex-col gap-y-7 mt-[2rem]'> 
            {
                Terms.map((term) => (
                    <div key={term.id}  className='flex flex-col gap-y-3'>
                        <h1 className='text-3xl'>
                            <HighlightText text={term.heading}/>
                        </h1>

                        <p
                        className='text-richblack-300 inter  
                        text-[16px] leading-[24px] font-[700] mb-[1rem]'
                        >{term.description}</p>
                    </div>
                ) )
            }

        </div>
        <h1
        className='w-[80%] font-[500] text-[16px] leading-[20px] mt-[2rem]
        font-inter text-richblack-5 mx-auto text-center'
        >These Terms of Use represent the entire agreement between 
        you and Intelli Study regarding your use of the platform.</h1>

        
        <Footer/> 

    </div>
  )
}

export default TermsPage