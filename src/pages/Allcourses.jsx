import React, { useEffect, useState } from 'react'
import { getAllCourses } from '../services/operations/courseDetailsAPI';
import RatingStars from '../components/common/RatingStars';
import GetAvgRating from '../utils/avgRating';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import Footer from '../components/common/Footer';
import SingleCourseCard from '../components/common/SingleCourseCard';


const Allcourses = () => {
    const[courses , setCourses] = useState([]);
    const navigate = useNavigate();
    
    const fetchAllCourses = async () => {
        const result =  await getAllCourses();
        // console.log("All courses are ", result);
        setCourses(result);
    }

    useEffect(() => {
      fetchAllCourses();  
    },[])
  return (

    courses.length > 0 ? (
        <div className='text-white w-[100%] mx-auto mt-[3rem]' >
        <h1
        className='text-center mx-auto font-[600] text-[36px] leading-[44px] w-[80%] font-inter text-richblack-5'>Explore All Courses</h1>
            <div className='w-[80%] gap-x-4 mx-auto grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4'>
    
                {
                    courses.map((course,index) => (
                        <div key={index} className='mt-[2rem] overflow-hidden' >
                            <SingleCourseCard course={course}/>
                        </div>
    
                    ))
                }
    
            </div>
    
            <Footer/>
        </div>
    ) :  (
        <div className='w-[100%]  mx-auto text-center text-3xl font-[600] mt-[10rem]
         text-richblack-5 leading-[30px] '>
            <h1 className=''>There are currently no courses available. Please check back later.</h1>
            <button className='
                text-center text-[16px] px-6 py-2 rounded-md font-bold 
                 bg-yellow-50 text-black mt-[3rem] 
                hover:scale-95 transition-all  duration-200'
                onClick={() => navigate(-1)}
                >
                Go Back</button>
            <Footer/>  
        </div>
    )
    
  )
}

export default Allcourses