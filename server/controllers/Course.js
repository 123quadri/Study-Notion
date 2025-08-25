const Course = require("../models/Course");
const User = require("../models/User");
const Category = require("../models/Category");
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const {uploadImageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();
const { convertSecondsToDuration } = require("../utils/secToDuration")
const CourseProgress = require("../models/CourseProgress")
const client = require("../config/redis");
const { CACHE_KEY, CACHE_EXPIRATION } = require("../../src/utils/constants");

exports.createCourse = async (req, res) => {
	try {
		let useCache = client.isConnected;
        if (useCache) {
            try {
                cachedCourses = await client.del(CACHE_KEY.ALL_COURSES);
            } catch (redisError) {
                console.log("Error in deleting courses from redis:", redisError.message);
            }
        }	
		// Get user ID from request object
		const userId = req.user.id;

		// Get all required fields from request body
		let {
			courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			tag,
			category,
			status,
			instructions,
		} = req.body;

		// Get thumbnail image from request files
		const thumbnail = req.files.thumbnailImage;

		// Check if any of the required fields are missing
		if (
			!courseName ||
			!courseDescription ||
			!whatYouWillLearn ||
			!price ||
			!tag.length ||
			!thumbnail ||
			!category||
			!instructions.length
		) {
			return res.status(400).json({
				success: false,
				message: "All Fields are Mandatory",
			});
		}
		if (!status || status === undefined) {
			status = "Draft";
		}
		// Check if the user is an instructor
		const instructorDetails = await User.findById(userId, {
			accountType: "Instructor",
		});

		if (!instructorDetails) {
			return res.status(404).json({
				success: false,
				message: "Instructor Details Not Found",
			});
		}

		// Check if the tag given is valid
		const categoryDetails = await Category.findById(category);
		if (!categoryDetails) {
			return res.status(404).json({
				success: false,
				message: "Category Details Not Found",
			});
		}
		// Upload the Thumbnail to Cloudinary
		const thumbnailImage = await uploadImageToCloudinary(
			thumbnail,
			process.env.FOLDER_NAME
		);
		// console.log(thumbnailImage);
		// Create a new course with the given details
		let currentDate = new Date();
		const newCourse = await Course.create({
			courseName,
			courseDescription,
			instructor: instructorDetails._id,
			whatYouWillLearn: whatYouWillLearn,
			price,
			tag: tag,
			category: categoryDetails._id,
			thumbnail: thumbnailImage.secure_url,
			status: status,
			instructions: instructions,
			createdAt : currentDate,
		});

		// Add the new course to the User Schema of the Instructor
		await User.findByIdAndUpdate(
			{
				_id: instructorDetails._id,
			},
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);
		// Add the new course to the Categories
		await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);
		// Return the new course and a success message
		res.status(200).json({
			success: true,
			data: newCourse,
			message: "Course Created Successfully",
		});
	} catch (error) {
		// Handle any errors that occur during the creation of the course
		// console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to create course",
			error: error.message,
		});
	}
};

// Edit Course Details
exports.editCourse = async (req, res) => {
	try {
	  const { courseId } = req.body
	  const updates = req.body
	  const course = await Course.findById(courseId)
  
	  if (!course) {
		return res.status(404).json({ error: "Course not found" })
	  }
  
	  // If Thumbnail Image is found, update it
	  if (req.files) {
		// console.log("thumbnail update")
		const thumbnail = req.files.thumbnailImage
		const thumbnailImage = await uploadImageToCloudinary(
		  thumbnail,
		  process.env.FOLDER_NAME
		)
		course.thumbnail = thumbnailImage.secure_url
	  }
  
	  // Update only the fields that are present in the request body
	  for (const key in updates) {
		if (updates.hasOwnProperty(key)) {
		  if (key === "tag" || key === "instructions") {
			course[key] = JSON.parse(updates[key])
		  } else {
			course[key] = updates[key]
		  }
		}
	  }
  
	  await course.save()
  
	  const updatedCourse = await Course.findOne({
		_id: courseId,
	  })
		.populate({
		  path: "instructor",
		  populate: {
			path: "additionalDetails",
		  },
		})
		.populate("category")
		.populate("ratingAndReviews")
		.populate({
		  path: "courseContent",
		  populate: {
			path: "subSection",
		  },
		})
		.exec()
  
	  res.json({
		success: true,
		message: "Course updated successfully",
		data: updatedCourse,
	  })
	} catch (error) {
	//   console.error(error)
	  res.status(500).json({
		success: false,
		message: "Internal server error",
		error: error.message,
	  })
	}
};

exports.getAllCourses = async (req, res) => {
    try {
        let useCache = client.isConnected;
        let cachedCourses = null;

        if (useCache) {
            try {
                cachedCourses = await client.get(CACHE_KEY.ALL_COURSES);
            } catch (redisError) {
                console.log("Redis error, falling back to database:", redisError.message);
                useCache = false;
            }
        }
        
        if (useCache && cachedCourses) {
            return res.status(200).json({
                success: true,
                data: JSON.parse(cachedCourses),
                fromCache: true 
            });
        }
    
        // Get data from database
        const allCourses = await Course.find(
            {},
            {
                courseName: true,
                price: true,
                thumbnail: true,
                instructor: true,
                ratingAndReviews: true,
                studentsEnrolled: true,
            }
        )
            .populate("instructor")
            .exec();

        // Try to cache if Redis is available
        if (useCache) {
            try {
                await client.setEx(CACHE_KEY.ALL_COURSES, CACHE_EXPIRATION, JSON.stringify(allCourses));
            } catch (redisCacheError) {
                console.log("Failed to cache results:", redisCacheError.message);
            }
        }
            
        return res.status(200).json({
            success: true,
            data: allCourses,
            fromCache: false
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            success: false,
            message: `Can't Fetch Course Data`,
            error: error.message,
        });
    }
};


//getCourseDetails
exports.getCourseDetails = async (req, res) => {
    try {
            //get id
            const {courseId} = req.query;
			// console.log("Course id in backend :" , courseId );
            //find course details
            const courseDetails = await Course.find(
                                        {_id:courseId})
                                        .populate(
                                            {
                                                path:"instructor",
                                                populate:{
                                                    path:"additionalDetails",
                                                },
                                            }
                                        )
                                        .populate("category")
                                        // .populate("ratingAndreviews")
                                        .populate({
                                            path:"courseContent",
                                            populate:{
                                                path:"subSection",
                                            },
                                        })
                                        .exec();

                //validation
                if(!courseDetails) {
                    return res.status(400).json({
                        success:false,
                        message:`Could not find the course with id : ${courseId}`,
                    });
                }
				
                //return response
                let totalDurationInSeconds = 0
				
    courseDetails[0]?.courseContent?.forEach((content) => {
      content?.subSection?.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
	// const coursedetails = courseDetails[0];

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
      },
    })

    }
    catch(error) {
        // console.log("Error in getCourseDetails :",error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

exports.getFullCourseDetails = async (req, res) => {
	try {
	  const { courseId } = req.body
	  const userId = req.user.id
	  const courseDetails = await Course.findOne({
		_id: courseId,
	  })
		.populate({
		  path: "instructor",
		  populate: {
			path: "additionalDetails",
		  },
		})
		.populate("category")
		// .populate("ratingAndReviews")
		.populate({
		  path: "courseContent",
		  populate: {
			path: "subSection",
		  },
		})
		.exec()
  
	  let courseProgressCount = await CourseProgress.findOne({
		courseID: courseId,
		userId: userId,
	  })
  
	//   console.log("courseProgressCount : ", courseProgressCount)
  
	  if (!courseDetails) {
		return res.status(400).json({
		  success: false,
		  message: `Could not find course with id: ${courseId}`,
		})
	  }
  
	  // if (courseDetails.status === "Draft") {
	  //   return res.status(403).json({
	  //     success: false,
	  //     message: `Accessing a draft course is forbidden`,
	  //   });
	  // }
  
	  let totalDurationInSeconds = 0
	  courseDetails?.courseContent.forEach((content) => {
		content?.subSection.forEach((subSection) => {
		  const timeDurationInSeconds = parseInt(subSection?.timeDuration)
		  totalDurationInSeconds += timeDurationInSeconds
		})
	  })
  
	  const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
	  return res.status(200).json({
		success: true,
		data: {
		  courseDetails,
		  totalDuration,
		  completedVideos: courseProgressCount?.completedVideos
			? courseProgressCount?.completedVideos
			: [],
		},
	  })
	} catch (error) {
	  return res.status(500).json({
		success: false,
		message: error.message,
	  })
	}
}

// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
	try {
	  // Get the instructor ID from the authenticated user or request body
	  const instructorId = req.user.id
  
	  // Find all courses belonging to the instructor
	  const instructorCourses = await Course.find({
		instructor: instructorId,
	  }).sort({ createdAt: -1 })
	  .populate({
		path: "courseContent",
		populate: {
		  path: "subSection",
		},
	  })
	  .exec()
	//   console.log("Instructor courses are:"  ,instructorCourses);

	const coursesWithTotalTime = instructorCourses.map((courseDetails) => {
		let totalDurationInSeconds = 0;
		courseDetails?.courseContent?.forEach((content) => {
		  content?.subSection?.forEach((subSection) => {
			const timeDurationInSeconds = parseInt(subSection?.timeDuration);
			if (!isNaN(timeDurationInSeconds)) {
			  totalDurationInSeconds += timeDurationInSeconds;
			}
		  });
		});
  
		const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
  
		return {
		  ...courseDetails.toObject(),
		  totalTime: totalDuration,
		};
	  });
  
	  // Return the instructor's courses
	  res.status(200).json({
		success: true,
		data: coursesWithTotalTime,
	  })
	} catch (error) {
	//   console.error(error)
	  res.status(500).json({
		success: false,
		message: "Failed to retrieve instructor courses",
		error: error.message,
	  })
	}
};

// Delete the Course
exports.deleteCourse = async (req, res) => {
	try {
	  const { courseId } = req.body
	  const instructorId = req.user.id;
	  

	  //remove the course from the instructor
	  await User.findByIdAndUpdate(
        { _id: instructorId },
        {
          $pull: {
            courses: courseId,
          },
        }
      )
  
	  // Find the course
	  const course = await Course.findById(courseId)
	  if (!course) {
		return res.status(404).json({ message: "Course not found" })
	  }

	  const categoryId = course.category;
	  const updatedCategory = await Category.findByIdAndUpdate({_id : categoryId}
															 , {$pull:{courses : courseId}}
															  , {new:true});
	 
  
	  // Unenroll students from the course
	  const studentsEnrolled = course.studentsEnrolled
	  for (const studentId of studentsEnrolled) {
		await User.findByIdAndUpdate(studentId, {
		  $pull: { courses: courseId },
		})
	  }
  
	  // Delete sections and sub-sections
	  const courseSections = course.courseContent
	  for (const sectionId of courseSections) {
		// Delete sub-sections of the section
		const section = await Section.findById(sectionId)
		if (section) {
		  const subSections = section.subSection
		  for (const subSectionId of subSections) {
			await SubSection.findByIdAndDelete(subSectionId)
		  }
		}
  
		// Delete the section
		await Section.findByIdAndDelete(sectionId)
	  }
  
	  // Delete the course
	  await Course.findByIdAndDelete(courseId)
  
	  return res.status(200).json({
		success: true,
		message: "Course deleted successfully",
	  })
	} catch (error) {
	//   console.error(error)
	  return res.status(500).json({
		success: false,
		message: "Server error",
		error: error.message,
	  })
	}
};