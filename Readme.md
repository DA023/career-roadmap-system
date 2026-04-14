# CareerPath.ai 🚀 
**AI-Powered Career Architecture & Roadmap API**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

CareerPath.ai is a full-stack, AI-driven application that ingests professional backgrounds (via PDF resumes or manual input) and generates highly specific, actionable career roadmaps. By leveraging Google's Gemini API with strict structured data constraints, the system acts as a personalized career architect.

## ✨ Key Architectural Features

* **Deterministic LLM Output:** Utilizes Gemini's `SchemaType` and `responseSchema` to enforce strict JSON outputs. This completely eliminates the need for flaky regex parsing of markdown strings and guarantees pipeline stability.
* **Resilient Model Fallback System:** Implements an automated retry loop across multiple Gemini models (`2.5-flash`, `1.5-pro`, etc.). If the primary model hits an overloaded `503` state, the system automatically delays and falls back to the next available model.
* **Secure File Processing:** Utilizes `multer` with `memoryStorage()`, strictly validating `application/pdf` mime-types and enforcing a 5MB size limit to prevent server overload and memory exhaustion.
* **Dynamic Visualization:** The frontend dynamically maps the user's current baseline against target architectural requirements using Chart.js radar graphs.

---

## 🛠️ Tech Stack

**Backend**
* Node.js & Express.js (REST API architecture)
* `@google/generative-ai` (Core LLM Engine)
* `multer` & `pdf-parse` (Document ingestion and extraction)

**Frontend**
* HTML5 / Vanilla JavaScript
* Tailwind CSS (Styling & Animations)
* Chart.js (Data Visualization)

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+ recommended)
* A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/career-roadmap-system.git](https://github.com/yourusername/career-roadmap-system.git)
   cd career-roadmap-system