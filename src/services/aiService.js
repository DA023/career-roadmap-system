const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const roadmapSchema = {
    type: SchemaType.OBJECT,
    properties: {
        suggestedCareers: {
            type: SchemaType.ARRAY,
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    role: { type: SchemaType.STRING },
                    matchScore: { type: SchemaType.INTEGER, description: "Score from 0 to 100" }
                },
                required: ["role", "matchScore"]
            }
        },
        skillGaps: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING }
        },
        skillScores: {
            type: SchemaType.OBJECT,
            properties: {
                labels: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
                current: { type: SchemaType.ARRAY, items: { type: SchemaType.INTEGER } },
                target: { type: SchemaType.ARRAY, items: { type: SchemaType.INTEGER } }
            },
            required: ["labels", "current", "target"]
        },
        roadmapSteps: {
            type: SchemaType.ARRAY,
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    stepNumber: { type: SchemaType.INTEGER },
                    focusArea: { type: SchemaType.STRING },
                    actionableTask: { type: SchemaType.STRING },
                    estimatedTimeframe: { type: SchemaType.STRING }
                },
                required: ["stepNumber", "focusArea", "actionableTask", "estimatedTimeframe"]
            }
        }
    },
    required: ["suggestedCareers", "skillGaps", "skillScores", "roadmapSteps"]
};

const generateRoadmapFromAI = async (userInput) => {
    const modelsToTry = [
        "gemini-2.5-flash",
        "gemini-1.5-flash-latest",
        "gemini-1.5-pro-latest",
        "gemini-pro"
    ];

    const strictPrompt = `
    DOCUMENT TEXT TO ANALYZE:
    """
    ${userInput}
    """
    TASK: Extract explicit career data from the text above and format it according to the required JSON schema. Remember: NO INVENTED DATA.`;

    let lastError = null;

    for (let i = 0; i < modelsToTry.length; i++) {
        const currentModelName = modelsToTry[i];
        
        try {            
            const model = genAI.getGenerativeModel({ 
                model: currentModelName, 
                
                systemInstruction: `You are an elite Career Data Extraction and Architecture API. 
                
CRITICAL DIRECTIVES:
1. STRICT GROUNDING: You must base your entire analysis EXCLUSIVELY on the provided user text/resume. 
2. ZERO HALLUCINATION: DO NOT guess, assume, or invent skills, job titles, or experiences that are not explicitly stated in the text.
3. ABSOLUTE TRUTH: Treat the provided text as the only source of truth. If a skill is not in the text, the current score for that skill is 0.
4. HONESTY: If the resume is sparse, entry-level, or lacks detail, your roadmap must reflect that reality. Do not output a senior-level roadmap for a beginner's resume.
5. VALIDATION: If the provided text is gibberish or contains no career/skill information, output a generic roadmap focused purely on "Career Discovery" with 0 for all skill scores.`,
                
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: roadmapSchema, 
                    temperature: 0.0, 
                    topK: 1, 
                }
            });

            const result = await model.generateContent(strictPrompt);
            return JSON.parse(result.response.text());

        } catch (error) {
            console.warn(`Model ${currentModelName} failed: ${error.message}`);
            lastError = error;
            
            const isOverloaded = error.status === 503 || (error.message && error.message.includes('503'));
            
            // If overloaded and we have another model to try, wait 2s before the next attempt
            if (isOverloaded && i < modelsToTry.length - 1) {
                console.warn(`⏳ High traffic detected. Waiting 2 seconds before trying the next model...`);
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }
    }

    // 3. If loop finishes without returning, all models failed
    console.error("All AI models failed. Final error:", lastError);
    const isFinalErrorOverloaded = lastError && (lastError.status === 503 || (lastError.message && lastError.message.includes('503')));
    
    throw new Error(isFinalErrorOverloaded 
        ? "The AI service is currently experiencing extremely high traffic. Please try again in a minute." 
        : `Gemini API Error: ${lastError.message}`);
};
module.exports = { generateRoadmapFromAI };