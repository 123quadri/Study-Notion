import React, { useState } from "react";
import toast from "react-hot-toast";
import { askQuestionRequest } from "../../../services/operations/ai";
import { useSelector } from "react-redux";

const AskAiModal = ({ setAskAi, context }) => {
  const { token } = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  
  const handleChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async () => {
    if (question.length === 0) {
      toast.error("Please type question");
      return;
    }

    setMessages((prev) => [...prev, question]);
    const formData = new FormData();
    formData.append("question", question);
    formData.append("context", context);
    const response = await askQuestionRequest(formData, token);
    setMessages((prev) => [...prev, response]);
    setQuestion("");
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default form submit behavior
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-[80%] h-[85%] rounded-lg border border-richblack-400 bg-richblack-800 p-6 relative">
        {/* Close button */}
        <button
          onClick={() => setAskAi(false)}
          className="absolute top-4 right-4 text-richblack-200 hover:text-white transition-all duration-200 z-10"
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

        <div className="h-[86%] overflow-y-auto">
          {messages.length > 0 &&
            messages.map((message, index) => (
              <p
                className="bg-[#24272b] w-fit px-4 rounded-md py-1 mt-2"
                key={index}
              >
                {message}
              </p>
            ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-x-4 w-[100%] mt-[1%]">
          <input
            name="question"
            id="question"
            value={question}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            placeholder="Type your question..."
            className="rounded-md h-[38px] mb-2 text-[#CCCCCC] bg-[#36393e] p-2 items-center w-[91%]"
          />

          <button
            className="bg-yellow-50 text-richblack-900 cursor-pointer rounded-md py-[6px] px-5 mb-2 font-semibold w-[7%]"
            onClick={handleSubmit}
          >
            Send
          </button>
        </div>

        <button
          className="cursor-pointer rounded-md bg-richblack-200 py-[4px] px-[20px] font-semibold text-richblack-900"
          onClick={() => setAskAi(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AskAiModal;