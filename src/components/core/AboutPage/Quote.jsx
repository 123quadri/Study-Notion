import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className='inter font-[600] text-[18px] sm:text-[36px] text-richblack-100 w-[90%] mx-auto'>
      <span className='text-richblack-600'>" </span>
      We are passionate about revolutionizing the way we learn. Our innovative platform
      <HighlightText text={"combines technology"}/>
      <span 
      className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#F09819] to-[#E65C00]"
      >
        {" "}
        expertise
      </span>
      , and community to create an 
      <span 
      className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#F9D423] to-[#F09819]"
      >
      {" "}
        unparalleled educational experience.<span className='text-richblack-600'> "</span>
      </span>
    </div>
  )
}

export default Quote
