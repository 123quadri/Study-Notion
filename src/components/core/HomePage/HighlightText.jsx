import React from 'react'

const HighlightText = ({text}) => {
  return (
<span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#12D8FA] to-[#A6FFCB]">
  {" "} {text}
</span>
  )
}

export default HighlightText