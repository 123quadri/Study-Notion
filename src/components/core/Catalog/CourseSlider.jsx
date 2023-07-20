import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import SwiperCore from 'swiper';

import Course_Card from './Course_Card';

SwiperCore.use([]);

const CourseSlider = ({ Courses }) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
           
            1024: {
             
              slidesPerView: 3,
            },
          }}
          modules={[ Pagination]}
          className="w-full "
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i} >
              <Course_Card course={course} Height="h-[100%] md:h-[250px]" />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  );
};

export default CourseSlider;
