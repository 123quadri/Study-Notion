import { toast } from "react-hot-toast"

import { updateCompletedLectures } from "../../slices/viewCourseSlice"
// import { setLoading } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector"
import { aiEndpoints } from "../apis"
const {
    SUMMARIZE_VIDEO, ASK_DOUBT
  } = aiEndpoints

export const sendSummarizationRequest = async (data, token) => {
    let result = {}
 
    try {
      const response = await apiConnector("POST",SUMMARIZE_VIDEO, data, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })
      console.log("VIDEO SUMMARIZATION  API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Summarize video")
      }
      toast.success("Video summarized successfully")
      const summmary = response?.data?.data;
      const transcript = response?.data?.transcript;

      result.summmary = summmary;
      result.transcript = transcript;

    } catch (error) {
      console.log("VIDEO SUMMARIZATIONAPI ERROR............", error)
      toast.error(error.message)
    }
   
    return result
  }

  export const askQuestionRequest = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let result = null
 
    try {
      const response = await apiConnector("POST", ASK_DOUBT, data, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })
      console.log("GEN AI API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Answer Your Question")
      }
      result = response?.data?.data
    } catch (error) {
      // console.log("CREATE COURSE API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }