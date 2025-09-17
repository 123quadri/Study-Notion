// require("dotenv").config();
// const { AssemblyAI } = require('assemblyai');
// const fetch = require('node-fetch'); // Import fetch for making HTTP requests
// const { GoogleGenerativeAI }  = require('@google/generative-ai');

// const assemblyaiClient = new AssemblyAI({
//     apiKey: process.env.ASSEMBLY_AI_KEY
//   });

// const audioTotext = async (video_url) => {
//     const transcript = await assemblyaiClient.transcripts.create({ audio_url:  video_url });
//     return transcript.text
// }
// exports.summarizeVideo = async (req, res) => {
// 	try {
// 		const { video_url } = req.body;		
		
// 		console.log("IN video summarize ");
//         const transcript = await audioTotext(video_url);
// 		console.log("Transcript is :",transcript);
//         const genAI = new GoogleGenerativeAI(process.env.GEN_AI_KEY);
// 		console.log("After gen ai");
		
//         const model = genAI.getGenerativeModel({ model: "gemini-pro"});
// 				console.log("After model");
//         const prompt = `Summarize the following text:\n\n${transcript}\n\n`;
// 				console.log("Prompt is :",prompt);
//         const result = await model.generateContent(prompt);
// 		console.log("After result");
//         const response = await result.response;
//         const summary = response.text();
//         console.log("Summary is :",summary);
 
// 		return res.status(200).json({
// 			success: true,
// 			message: "Video Summarized successfully",
// 			data: summary,
// 			transcript:transcript
// 		});
// 	} catch (error) {
// 		console.log(" error in summarize video :",error);
// 		return res.status(500).json({
// 			success: false,
// 			error: error.message,
// 		});
// 	}
// };

// exports.aiDoubtRequest = async (req, res) => {
// 	try {
// 		const { question,context} = req.body;
//         const genAI = new GoogleGenerativeAI(process.env.GEN_AI_KEY);
//         const model = genAI.getGenerativeModel({ model: "gemini-pro"});
//         const prompt= `${context}\n\nQuestion: ${question}\nAnswer:`
// 		console.log("In ask  ai:");
//         const result = await model.generateContent(prompt);
//         const response = await result.response;
//         const answer = response.text();

//         return res.status(200).json({
// 			success: true,
// 			message: "Ai response given successfully",
// 			data:answer,
// 		});
// 	} catch (error) {
// 		console.log(" error in ask ai :",error);
// 		return res.status(500).json({
// 			success: false,
// 			error: error.message,
// 		});
// 	}
// };

require("dotenv").config();
const { AssemblyAI } = require('assemblyai');
const fetch = require('node-fetch'); // Import fetch for making HTTP requests
const { GoogleGenerativeAI } = require('@google/generative-ai');

const assemblyaiClient = new AssemblyAI({
    apiKey: process.env.ASSEMBLY_AI_KEY
});

const audioTotext = async (video_url) => {
    const transcript = await assemblyaiClient.transcripts.create({ audio_url: video_url });
    return transcript.text
}

exports.summarizeVideo = async (req, res) => {
    try {
        const { video_url } = req.body;
        const transcript = await audioTotext(video_url);
        
        // Initialize with your new API key
        const genAI = new GoogleGenerativeAI(process.env.GEN_AI_KEY);
        // Updated model name to gemini-2.0-flash-exp (Gemini 2.5 Flash)
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });        
        const prompt = `Summarize the following text:\n\n${transcript}\n\n`;
        const result = await model.generateContent(prompt);
        
        const response = result.response;
        const summary = response.text();
        return res.status(200).json({
            success: true,
            message: "Video Summarized successfully",
            data: summary,
            transcript: transcript
        });
    } catch (error) {
        console.log(" error in summarize video :", error);
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.aiDoubtRequest = async (req, res) => {
    try {
        const { question, context } = req.body;
        
        // Initialize with your new API key
        const genAI = new GoogleGenerativeAI(process.env.GEN_AI_KEY);
        
        // Updated model name to gemini-2.0-flash-exp (Gemini 2.5 Flash)
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
        
        const prompt = `${context}\n\nQuestion: ${question}\nAnswer:`
        const result = await model.generateContent(prompt);
        const response = result.response;
        const answer = response.text();
        
        return res.status(200).json({
            success: true,
            message: "Ai response given successfully",
            data: answer,
        });
    } catch (error) {
        console.log(" error in ask ai :", error);
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};