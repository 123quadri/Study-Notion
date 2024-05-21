const express = require("express")
const router = express.Router()


const { auth, isStudent } = require("../middlewares/auth")
const {summarizeVideo,aiDoubtRequest} = require("../controllers/Ai");

router.post("/summarize", auth , isStudent,summarizeVideo);
router.post("/ask-question", auth , isStudent,aiDoubtRequest);


module.exports = router