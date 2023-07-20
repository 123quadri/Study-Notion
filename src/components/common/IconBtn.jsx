import React from 'react'

const IconBtn = ({text,onclick,children,disabled,outline,customClasses,type}) => {
  return (
        <button
        className={`flex items-center ${
          outline ? "border border-yellow-50 bg-transparent text-yellow-50" : "bg-yellow-50 text-richblack-900"
        } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold  ${customClasses}`}
        disabled={disabled}
        onClick={onclick}
        type={type}
        >
            {
                children ? (
                    <>
                        <span>
                            {text}
                        </span>
                        {children}
                    </>
                ) : (text)
            }
        </button>
  )
}

export default IconBtn