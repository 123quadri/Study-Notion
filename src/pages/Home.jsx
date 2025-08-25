import React, { useState } from 'react'
import {FaArrowRight} from "react-icons/fa"
import { NavLink, useNavigate } from 'react-router-dom'
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from "../components/core/HomePage/Button"
import Banner from "../assets/Images/banner.mp4"
import Banner2 from "../assets/Images/Banner2.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import Footer from '../components/common/Footer'
import TimelineSection from '../components/core/HomePage/TimelineSection'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import ReviewSlider from '../components/common/ReviewSlider'
import ConfirmationModal from '../components/common/ConfirmationModal'
import { logout } from "../services/operations/authAPI"
import { useDispatch, useSelector } from 'react-redux'
import {ACCOUNT_TYPE} from "../utils/constants"


const Home = () => {
    const [showModal , setShowModal] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const{user} = useSelector((state) => state.profile);
    const continueLessonLink = user?.accountType === ACCOUNT_TYPE.STUDENT  ? "/dashboard/enrolled-courses" : "/dashboard/my-courses";
    // console.log("User typen is :" , continueLessonLink);
  return (
    
    <div className='w-full mx-auto'>
    
        {/* Section 1 */}
        <div className='relative mx-auto flex flex-col w-11/12  
         text-white max-w-maxContent items-center justify-between'>

            {/* <NavLink to={"/signup"}> */}
                <div 
                     onClick={() =>
                        setShowModal({
                        text1: "Are you sure?",
                        text2: "Logout and sign up with anothert account to become an instructor",
                        btn1Text: "Logout",
                        btn2Text: "Cancel",
                        btn1Handler: () => dispatch(logout(navigate)),
                        btn2Handler: () => setShowModal(null),
              })
            }
                className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold 
                transition-all duration-200 hover:scale-95 w-fit text-richblack-200 '>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight/>            
                    </div>
                </div>
            {/* </NavLink> */}

            <div className='text-center font-semibold text-4xl mt-7'>
                Empower Your Future with  <HighlightText text = {"Coding Skills"} />
            </div>

            <div className='mt-4 text-center w-[90%] text-lg text-richblack-300 font-bold'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, 
                including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            <div className=' flex flex-col  sm:flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={"/learn-more"}>
                    Learn More
                </CTAButton>

                <CTAButton  active={false} linkto={"/allcourses"}>
                    Book a Demo
                </CTAButton>
            </div>

            <div className='mx-3 my-12  shadow-lg shadow-white'>
                <video muted autoPlay loop>
                <source src={Banner} type="video/mp4"/>
                </video>

            </div>

            {/* Code-Section-1 */}
            <div className='w-11/12 mx-auto'>
                <CodeBlocks
                    position={" md:flex-row"}
                    subheading = {
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
                    }
                    heading = {
                        <div className='text-4xl font-semibold'>
                            Unlock Your <HighlightText text={"coding potentials "}/> 
                            with our online courses
                        </div>
                    }
                    ctabtn1={
                        {
                            btnText : "Try it Yourself",
                            linkto:"/allcourses",
                            active:true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText : "Learn More",
                            linkto:"/learn-more",
                            active:false,
                        }
                    }
                    codeblock={`<!DOCTYPE html>\n<html>\nhead><>Example</\ntitle>
                    <linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>
                    nav><ahref="one/">One</a><ahref="two/">Two<\n/a><ahref="three/">Three</a>\n/nav>`}
                    codeColor={"text-yellow-25"}
                />
               
            </div>

                {/* Code-Section-2  */}
                <div className='w-11/12 mx-auto'>
                <CodeBlocks
                    position={" md:flex-row-reverse"}
                    subheading = {
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                    }
                    heading = {
                        <div className='text-4xl font-semibold'>
                           Start  <HighlightText text={"coding in seconds "}/> 
                           
                        </div>
                    }

                    
                    ctabtn1={
                        {
                            btnText : "Continue Lesson",
                            linkto:continueLessonLink,
                            active:true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText : "Learn More",
                            linkto:"/learn-more",
                            active:false,
                        }
                    }
                    codeblock={`<!DOCTYPE html>\n<html>\nhead><>Example</\ntitle>
                    <linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>
                    nav><ahref="one/">One</a><ahref="two/">Two<\n/a><ahref="three/">Three</a>\n/nav>`}
                    codeColor={"text-[#12D8FA]"}
                    
                />
            
            </div>
            <ExploreMore />
        </div>

        {/* Section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='homepage_bg h-[310px]'>

                <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                    <div className='h-[150px]'></div>
                    <div className='flex flex-row gap-7 text-white '>
                        <CTAButton active={true} linkto={"/allcourses"}>
                            <div className='flex items-center gap-3' >
                                Explore Full Catalog
                                <FaArrowRight />
                            </div>
                            
                        </CTAButton>
                        <CTAButton active={false} linkto={"/learn-more"}>
                            <div>
                                Learn more
                            </div>
                        </CTAButton>
                    </div>

                </div>
            </div>

            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>

                <div className='flex flex-col sm:flex-row gap-5 mb-10 mt-[95px]'>
                    <div className='text-4xl font-semibold w-[100%] sm:w-[45%] '>
                        Get the Skills you need for a
                        <HighlightText text={"Job that is in demand"} />
                    </div>

                    <div className='flex flex-col gap-10w-[100%] sm:w-[45%] items-start'>
                    <div className='text-[16px] mb-[10px]'>
                    The modern Intelli Study is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                    </div>
                    <CTAButton active={true} linkto={"/learn-more"}>
                        <div>
                            Learn more
                        </div>
                    </CTAButton>
                    </div>

                </div>
                
                

                <TimelineSection />

                <LearningLanguageSection />

            </div>

            

      </div>

        {/* Section 3 */}
        <div className='w-[100%]  lg:w-11/12 mx-auto max-w-maxContent 
        flex-col items-center justify-between gap-8 
        first-letter bg-richblack-900 text-white'>

            <InstructorSection />

        <h2 className='text-center text-4xl font-semobold mt-10'>Review from Other Learners</h2>
                {/* Review Slider here */}
                <ReviewSlider/>
        </div>
        {/* Footer  */}
        <Footer/>

        {showModal && <ConfirmationModal modalData={showModal} />}
    </div>
  )
}

export default Home