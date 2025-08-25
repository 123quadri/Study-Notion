import React from 'react'


const Stats = [
    {count: "5K", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"},
];

const StatsComponent = () => {
  return (
    <section className='w-full bg-richblack-800 mt-[6rem]'>
        <div className='w-[80%] mx-auto py-[6rem]'>
            <div className='grid grid-cols-2 gap-y-[2rem] md:grid-cols-4 gap-x-[3rem] justify-center items-center'>
                {
                    Stats.map( (data, index) => {
                        return (
                            <div key={index} className='flex flex-col justify-center items-center gap-3'>
                                <h1 className='inter 
                                font-[700] text-[30px]
                                leading-[38px] text-richblack-5
                                '>
                                    {data.count}
                                </h1>
                                <h2 className='text-richblack-500 text-[16px]
                                font-[600] leading-[24px] text-center
                                '>
                                    {data.label}
                                </h2>
                            </div>
                        )
                    } )
                }
            </div>
        </div>
    </section>
  )
}

export default StatsComponent
