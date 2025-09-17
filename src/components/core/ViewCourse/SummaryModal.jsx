import React from "react";

const SummaryModal = ({ modalData }) => {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-[80%] overflow-y-auto h-[85%] rounded-lg border border-richblack-400 bg-richblack-800 p-6 relative">
        {/* Close button */}
        <button
          onClick={modalData?.btn1Handler}
          className="absolute top-4 right-4 text-richblack-200 hover:text-white transition-all duration-200"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <h1 className="text-xl font-semibold">Transcript is :</h1>
        <p className="text-[yellow] mt-2 mb-2">
          {modalData?.videoTranscript ? (
            modalData?.videoTranscript
          ) : (
            <div className="spinner"></div>
          )}
        </p>
        
        <h1 className="text-xl font-semibold mt-4">Summary is :</h1>
        <p className="text-[yellow] mt-2 mb-2">
          {modalData?.summary ? (
            modalData?.summary
          ) : (
            <div className="spinner"></div>
          )}
        </p>
        
        <button
          className="cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900"
          onClick={modalData?.btn1Handler}
        >
          {modalData?.btn1Text}
        </button>
      </div>
    </div>
  );
};

export default SummaryModal;