import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from "../HomePage/Button"
import { FaArrowRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from '../../../utils/constants'

const InstructorSection = () => {
  const {user} = useSelector((state) => state.profile);
  return (
    <div className='mt-16'>
      <div className='flex flex-col  sm:flex-row gap-20 items-center'>

        <div className='w-[50%]'>
            <img
                src={Instructor}
                alt=""
                className='shadow-white'
            />
        </div>

        <div className='w-[80%] sm:w-[50%] flex flex-col gap-10'>
            <div className='text-4xl font-semobold w-[50%]'>
                Become an
                <HighlightText text={"Instructor"} />
            </div>

            <p className='font-medium text-[16px] w-[80%] text-richblack-300'>
            Instructors from around the world teach millions of students on Intelli Study. We provide the tools and skills to teach what you love.
            </p>

            <div className='w-[100%] sm:w-fit'>
                <CTAButton active={true} 
                linkto={ user?.accountType === ACCOUNT_TYPE.STUDENT ? "/dashboard/enrolled-courses" : "/dashboard/add-course"}>
                    <div className='flex flex-row gap-2 justify-center items-center'>
                        Start Learning Today
                        <FaArrowRight />
                    </div>
                </CTAButton>
            </div>


        </div>

      </div>
    </div>
  )
}

export default InstructorSection
