import React from 'react'
import { learnMoreData } from '../data/learn-more'
import HighlightText from '../components/core/HomePage/HighlightText'
import Footer from '../components/common/Footer'
const Learnmore = () => {
  return (
    <div className='w-[100%]  mt-[3rem] '>
            
        <div className='w-[80%] lg:w-[60%] mx-auto flex flex-col gap-y-7' >
            {
                learnMoreData.map((data) => (
                    <div key={data.id} className='flex flex-col gap-y-3'>
                    
                    <h1 className='text-3xl'>
                     <HighlightText text={data.heading}/>
                     </h1>
                    
                        <p
                        className='text-richblack-300 inter  
                        text-[16px] leading-[24px] font-[700] mb-[1rem]'
                        >{data.description}</p>
                    </div>
                    
                ))
            }
        </div>
        <Footer/>
    </div>
  )
}

export default Learnmore