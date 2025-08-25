require("dotenv").config();
const { AssemblyAI } = require('assemblyai');
const fetch = require('node-fetch'); // Import fetch for making HTTP requests
const { GoogleGenerativeAI }  = require('@google/generative-ai');

const assemblyaiClient = new AssemblyAI({
    apiKey: process.env.ASSEMBLY_AI_KEY
  });

const audioTotext = async (video_url) => {
    const transcript = await assemblyaiClient.transcripts.create({ audio_url:  video_url });
    return transcript.text
}
exports.summarizeVideo = async (req, res) => {
	try {
		const { video_url } = req.body;		
        const transcript = await audioTotext(video_url);
        const genAI = new GoogleGenerativeAI(process.env.GEN_AI_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        const prompt = `Summarize the following text:\n\n${transcript}\n\n`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const summary = response.text();
        console.log("Summary is :",summary);
 
		return res.status(200).json({
			success: true,
			message: "Video Summarized successfully",
			data: summary,
			transcript:transcript
		});
	} catch (error) {
		// console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

exports.aiDoubtRequest = async (req, res) => {
	try {
		const { question,context} = req.body;
        const genAI = new GoogleGenerativeAI(process.env.GEN_AI_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        const prompt= `${context}\n\nQuestion: ${question}\nAnswer:`
		console.log("In ask  ai:");
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const answer = response.text();

        return res.status(200).json({
			success: true,
			message: "Ai response given successfully",
			data:answer,
		});
	} catch (error) {
		console.log(" error in ask ai :",error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};