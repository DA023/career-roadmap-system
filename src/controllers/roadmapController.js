const pdfParse = require('pdf-parse'); 
const { generateRoadmapFromAI } = require('../services/aiService');

const analyzeRoadmap = async (req, res) => {
    try {
        let textToAnalyze = "";

        if (req.file) {

            const dataBuffer = req.file.buffer;
            
            // Simplified & reliable PDF parsing (this is the standard way)
            const pdfData = await pdfParse(dataBuffer);
            textToAnalyze = pdfData.text;

        } else if (req.body.skills) {
            textToAnalyze = req.body.skills;
        } else {
            return res.status(400).json({ error: "No data provided." });
        }

        const roadmapData = await generateRoadmapFromAI(textToAnalyze);
        res.status(200).json({ success: true, data: roadmapData });

    } catch (error) {
        console.error("Controller Error:", error);
        
        if (error.message.includes('pdf-parse')) {
            return res.status(500).json({ 
                success: false, 
                error: "Failed to parse PDF. Please try a different file or use manual entry." 
            });
        }
        
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { analyzeRoadmap };