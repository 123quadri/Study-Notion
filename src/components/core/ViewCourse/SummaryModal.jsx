import React from "react";

const SummaryModal = ({ modalData }) => {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-[80%]  overflow-y-auto h-[85%]  rounded-lg border border-richblack-400 bg-richblack-800 p-6">
      <h1 className=" text-xl font-semibold">Transcript is :</h1>
      <p className="text-[yellow] mt-2 mb-2">
        {
            modalData?.videoTranscript ? (  modalData?.videoTranscript) : 
            (
                <div className="spinner"></div>
            )
        }
        </p>
        <h1 className=" text-xl font-semibold mt-4">Summary is :</h1>
        <p className="text-[yellow] mt-2 mb-2">
        {
            modalData?.summary ? (  modalData?.summary) : 
            (
                <div className="spinner"></div>
            )
        }
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
