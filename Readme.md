# CareerPath.ai: Applied AI Career Architect

CareerPath.ai is a **production-grade Applied AI system** that transforms unstructured professional data—resumes and career goals—into precise, actionable career roadmaps. By orchestrating Google’s Gemini LLM with strict grounding and deterministic data schemas, it provides a high-fidelity execution protocol for professional growth.

## Project Overview

Most career advice is generic and non-actionable. This project applies Large Language Models (LLMs) to solve the **"Career Discovery"** problem by:

- Ingesting raw professional telemetry from PDF resumes or manual intent.
- Performing Gap Analysis against industry-standard benchmarks for specific roles.
- Visualizing the Delta between current competencies and target requirements using dynamic radar charts.
- Synthesizing Execution Protocols with time-boxed milestones and specific tasks.

## Folder Structure

The project follows a modular **Model-Controller-Service** architecture to ensure scalability and separation of concerns:

```plaintext
career-roadmap-system/
├── public/                    # Optimized Frontend Assets
│   └── index.html             # SPA with Tailwind CSS & Chart.js
├── src/                       # Backend Source Code
│   ├── config/                # Environment & Fail-fast settings
│   ├── controllers/           # Request/Response orchestration
│   ├── middlewares/           # Security & Validation (Multer)
│   ├── routes/                # REST API endpoint definitions
│   ├── services/              # AI Logic & Multi-model Fallback Engine
│   └── app.js                 # Express app configuration
├── .env                       # Protected Environment Secrets
├── .gitignore                 # Dependency & Secret masking
├── package.json               # Dependency manifest
├── README.md                  # Project documentation
└── server.js                  # Application entry point
```

## Core Applied AI Highlights

### Deterministic Output Engineering
To solve model non-determinism, the system utilizes **Gemini SchemaType enforcement**. This ensures the LLM returns a strictly formatted JSON object rather than prose, guaranteeing that the frontend visualization pipeline never encounters parsing errors.

### Resilient LLM Fallback & Recovery
The backend implements a sophisticated fail-over logic loop to maintain availability during API rate-limiting:

- **Primary**: Gemini 2.5 Flash (Optimized for speed)  
- **Secondary**: Gemini 1.5 Flash (Availability fallback)  
- **Tertiary**: Gemini 1.5 Pro (Optimized for deep reasoning)

The system includes a **2000ms "cool-down"** delay between attempts to handle transient high-traffic states.

### Privacy-Centric Data Handling
The system uses **In-Memory Buffering** (`memoryStorage`) via Multer. Resumes are analyzed entirely in volatile RAM and are never saved to disk, significantly reducing the risk of data leakage.

## Technology Stack

- **AI Engine**: Google Gemini API (`@google/generative-ai`)
- **Backend**: Node.js & Express.js
- **Parsing**: `pdf-parse` & `multer`
- **Frontend**: Tailwind CSS, Chart.js, & Vanilla JS

## Getting Started

### 1. Prerequisites
- **Runtime**: Node.js v18.x or higher
- **AI Access**: Google Gemini API Key

### 2. Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/career-roadmap-system.git
```
2. Install dependencies
```bash
npm install
```
3. Setup Environment
* Create a **.env** file in the root directory of your project.
* Define your environment variables as shown below:
```env
PORT=3000
GEMINI_API_KEY=your_actual_api_key_here
```
4. Run the Application
* Once the environment is configured, launch the server using the following command:
```bash
npm start
```
## Future Improvements

1. **Vectorized Market Alignment (RAG)**  
   Implement Retrieval-Augmented Generation to connect the AI to live job boards (LinkedIn, Indeed). This would allow the roadmap to suggest skills based on actual real-time job openings rather than static training data.

2. **Interactive Parameter "Steerability"**  
   Add UI sliders to let users adjust the AI's logic. Users could choose between **"Conservative Growth"** (safe career moves) or **"Aggressive Pivot"** (high-risk, high-reward transitions), allowing the model to adjust its temperature and reasoning accordingly.

3. **Automated Resume Refactoring**  
   Beyond identifying gaps, the system could generate the exact bullet points or project descriptions a user should add to their resume once they complete a roadmap milestone.

4. **Multi-Modal Analysis**  
   Upgrade the ingestion layer to support Image-to-Text for certificates and Audio-to-Text for career objective voice memos, creating a more holistic user profile.