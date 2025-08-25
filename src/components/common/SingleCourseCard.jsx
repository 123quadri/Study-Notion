import React, { useEffect, useState } from "react";
import RatingStars from "./RatingStars";
import GetAvgRating from "../../utils/avgRating";
import { NavLink,Link } from "react-router-dom";

const SingleCourseCard = ({ course }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);

  return (

    <Link to={`/courses/${course._id}`}>
    
    <div className="text-white bg-richblack-600 flex flex-col gap-y-2  rounded-md h-[350px]  ">
      <img
        src={course?.thumbnail}
        alt="thumbnail"
        className="object-cover rounded-md w-[100%] h-[55%] "
      />

      <p className="font-[600] text-richblack-5 text-[20px] leading-[24px] px-2">
        {course?.courseName}
      </p>

      <p className="font-[500] text-richblack-5 text-[15px] leading-[20px] px-2">
        {course?.instructor?.firstName} {course?.instructor?.lastName}
      </p>

      <div className="flex items-center gap-2 px-2">
        <span className="text-yellow-5">{avgReviewCount || 0}</span>
        <RatingStars Review_Count={avgReviewCount} />
        <span className="text-richblack-400">
          {course?.ratingAndReviews?.length} Ratings
        </span>
      </div>

      <p className="text-xl text-richblack-5 mb-[4px] px-2">Rs. {course?.price}</p>
    </div>
    </Link>
  );
};

export default SingleCourseCard;
