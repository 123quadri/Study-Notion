import React from 'react'
import HighlightText from "../components/core/HomePage/HighlightText"
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from '../components/core/AboutPage/Quote'
import FoundingStory from "../assets/Images/FoundingStory.png"
import StatsComponent from '../components/core/AboutPage/StatsComponent '
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from "../components/common/Footer"
import ReviewSlider from '../components/common/ReviewSlider'

const About = () => {
  return (
    <div className='text-white  w-full mx-auto'>
        {/* Section 1 */}

        <section className="bg-richblack-700">
            <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
            <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
                Driving Innovation in Online Education for a
                <HighlightText text={"Brighter Future"} />
                <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
                Intelli Study is at the forefront of driving innovation in online
                education. We're passionate about creating a brighter future by
                offering cutting-edge courses, leveraging emerging technologies,
                and nurturing a vibrant learning community.
                </p>
            </header>
            <div className="sm:h-[70px] lg:h-[150px]"></div>
            <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
                <img src={BannerImage1} alt="" />
                <img src={BannerImage2} alt="" />
                <img src={BannerImage3} alt="" />
            </div>
            </div>
      </section>

        {/* section 2 */}
        <section className='w-[80%] mx-auto mt-[6rem] sm:mt-[12rem]'>
            <div>
                <Quote/>
            </div>
        </section>

        {/* section 3 */}
        <section className='w-[80%]  mx-auto mt-[4rem] sm:mt-[6rem]'>
            <div className='flex flex-col w-[90%] mx-auto'>
                {/* foudning story wala div */}
                <div className='flex flex-col md:flex-row gap-8'>
                    {/* founding story left box */}
                    <div className='w-[100%] md:w-[50%]'>
                        <h1
                        className=" bg-clip-text text-transparent 
                        bg-gradient-to-r from-[#FD1D1D] to-[#FCB045]
                         font-[600] text-[36px] mb-[1.5rem]"
                        >Our Founding Story</h1>

                        <p className='text-richblack-300 inter  
                        text-[16px] leading-[24px] font-[700] mb-[1rem]'>
                        Our e-learning platform was born out of a shared vision and passion for 
                        transforming education. It all began with a group of educators, technologists, 
                        and lifelong learners who recognized the need for accessible, flexible, 
                        and high-quality learning opportunities in a rapidly evolving digital world.</p>

                        <p
                        className='text-richblack-300 inter  text-[16px] leading-[24px] font-[700] mb-[1rem]'
                        >As experienced educators ourselves, we witnessed firsthand the 
                        limitations and challenges of traditional education systems. 
                        We believed that education should not be confined to the walls of a 
                        classroom or restricted by geographical boundaries. We envisioned a 
                        platform that could bridge these gaps and empower individuals from all walks 
                        of life to unlock their full potential.</p>
                    </div>
                    {/* foudning story right box */}
                    <div className='w-[100%] md:w-[50%]'>
                        <img  src={FoundingStory} alt='founding image'
                        
                         />
                    </div>
                </div>

                {/* vision and mission wala parent div */}
                <div className='flex flex-col md:flex-row gap-8 mt-[5rem]' >
                    {/* left box */}
                    <div className='w-[100%] md:w-[50%]'>
                        <h1
                        className="font-bold bg-clip-text text-transparent bg-gradient-to-r
                         from-[#F09819] to-[#E65C00]
                         text-[36px] mb-[1.5rem]
                         "
                        >Our Vision</h1>
                        <p
                         className='text-richblack-300 inter  
                        text-[16px] leading-[24px] font-[700] mb-[1rem]'
                        >With this vision in mind, we set out on a journey to create an e-learning 
                        platform that would revolutionize the way people learn. 
                        Our team of dedicated experts worked tirelessly to develop a 
                        robust and intuitive platform that combines cutting-edge technology with 
                        engaging content, fostering a dynamic and interactive learning experience.</p>
                    </div>

                    {/* right box */}
                    <div className='w-[100%] md:w-[50%]'>
                        <h1
                        className="font-bold bg-clip-text text-transparent 
                        bg-gradient-to-r from-[#12D8FA] to-[#A6FFCB]
                         text-[36px] mb-[1.5rem]
                        "
                        >
                            Our Mission
                        </h1>
                        <p
                         className='text-richblack-300 inter  
                        text-[16px] leading-[24px] font-[700] mb-[1rem]'
                        >Our mission goes beyond just delivering courses online. 
                        We wanted to create a vibrant community of learners, where 
                        individuals can connect, collaborate, and learn from one another. 
                        We believe that knowledge thrives in an environment of sharing and dialogue, 
                        and we foster this spirit of collaboration through forums, live sessions, 
                        and networking opportunities.</p>
                    </div>
                </div>
            </div>
        </section>  

        {/* section 4 */}
      <StatsComponent/>

      {/* section 5 */}
      <section className='mx-auto flex flex-col items-center justify-between gap-5 mb-[140px]'>
        <LearningGrid />
        <ContactFormSection />
      </section>


      <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white'>

           

        <h2 className='text-center text-4xl font-semobold mt-10'>Review from Other Learners</h2>
                {/* Review Slider here */}
                <ReviewSlider/>
        </div>
      <Footer />
    </div>
  )
}

export default About