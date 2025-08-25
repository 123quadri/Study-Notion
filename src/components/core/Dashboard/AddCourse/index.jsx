import React from 'react'
import RenderSteps from './RenderSteps'

const AddCourse = () => {
  return (
    <>
        <div className=' flex gap-y-7  flex-col lg:flex-row w-full items-start gap-x-6'>
            <div className='w-[100%] lg:w-[70%]' >
                <h1
                className="mb-14 text-3xl font-medium text-richblack-5"
                >Add Course</h1>
                <div>
                    <RenderSteps/>
                </div>
            </div>

            <div className='flex flex-col gap-4 sticky bg-richblack-800 w-[384px] h-[390px]
            rounded-md p-[24px]'>
                <p className='inter font-[600] leading-[26px] text-richblack-5 text-[18px]'>⚡Course Upload Tips</p>
                <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Course Builder is where you create & organize a course.</li>
                    <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                    <li>Information from the Additional Data section shows up on the course single page.</li>
                    <li>Make Announcements to notify any important</li>
                    <li>Notes to all enrolled students at once.</li>
                </ul>
            </div>
        </div>
    </>
  )
}

export default AddCourse