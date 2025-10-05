# 🏛️ PolityWatch AI

> **AI-Powered Political Transparency Dashboard for Indian Democracy**

[![Docker](https://img.shields.io/badge/docker-ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Cerebras](https://img.shields.io/badge/Cerebras-AI-FF6B6B)](https://cerebras.ai/)
[![Llama](https://img.shields.io/badge/Meta-Llama%203.1-0668E1)](https://llama.meta.com/)

**Demo Video:** [https://youtu.be/NebXp_kdRqw]  
**Submission:** FutureStack GenAI Hackathon 2025

---

## 📌 The Problem

India's 543 Members of Parliament file complex financial affidavits with the Election Commission. These documents contain critical transparency data - assets, liabilities, criminal cases - but are buried in lengthy PDFs that average citizens cannot easily analyze.

**Impact:** Voters lack accessible tools to assess political accountability, making informed democratic choices difficult.

---

## 💡 Our Solution

PolityWatch AI transforms political financial data into actionable insights using cutting-edge AI technology. We analyze politician declarations in real-time, detect suspicious patterns, and enable natural language queries - making political transparency accessible to every voter.

---

## ✨ Key Features

### Real-Time AI Analysis
- **Accountability Score:** AI calculates risk scores (0-100) by analyzing wealth growth, legal cases, and disclosure patterns
- **Red Flag Detection:** Automated identification of suspicious wealth increases, pending cases, and unusual patterns
- **Response Time:** Under 1 second analysis powered by Cerebras Cloud

### Natural Language Intelligence
- **Conversational AI:** Ask questions in plain language - "What are the corruption allegations?"
- **Context-Aware:** Multi-turn conversations that understand follow-up questions
- **Detailed Insights:** AI-generated explanations of complex financial patterns

### Interactive Visualizations
- **Wealth Timeline:** Track asset growth across election cycles
- **Distribution Analysis:** Family-wise breakdown (Self/Spouse/HUF/Dependents)
- **News Sentiment:** AI-powered timeline of media coverage

### Production-Ready Deployment
- **One-Command Deploy:** `docker-compose up` - fully containerized application
- **Health Checks:** Automated monitoring and auto-restart
- **Optimized Build:** Multi-stage Docker builds for minimal image size

---

## 🛠️ Tech Stack

### AI & Machine Learning
```
Cerebras Cloud → Ultra-fast inference (under 1s response time)
Meta Llama 3.1 → Natural language understanding & generation
Custom Risk Models → Pattern detection algorithms
```

### Backend
```
FastAPI → High-performance async API
Python 3.11 → Core backend logic
Pydantic → Data validation
HTTPx → Async HTTP client
```

### Frontend
```
React 18 → UI framework
Vite → Build tool & dev server
Tailwind CSS → Styling
Recharts → Data visualization
Lucide React → Icon system
```

### Infrastructure
```
Docker → Containerization
Docker Compose → Service orchestration
Nginx → Production web server
```

---

## 🎯 Sponsor Technology Deep Dive

### Why Cerebras Cloud?

**Decision Rationale:**
- **Speed Requirement:** Political transparency demands real-time analysis. Citizens shouldn't wait 5+ seconds for AI responses.
- **Scale Goal:** Planning to analyze all 543 MPs - need infrastructure that can handle concurrent requests.
- **Performance:** Cerebras delivers 3-5x faster inference than traditional cloud GPUs.

**Implementation:**
- Risk score calculation: ~800ms average response time
- Pattern detection across 12+ data points simultaneously
- Batch processing capability for full MP database analysis

**Benchmark Comparison:**
```
Traditional GPU: 2.5-4s per analysis
Cerebras Cloud: 0.8-1.2s per analysis
Performance Gain: 3.5x faster
```

**Code Location:** `backend/app/services/cerebras_service.py`

---

### Why Meta Llama 3.1?

**Decision Rationale:**
- **Context Understanding:** Political data requires nuanced analysis beyond simple keyword matching
- **Open Source:** Cost-effective at scale - critical for a civic tech platform
- **Factual Accuracy:** Llama excels at structured data analysis and explanation

**Implementation:**
- Conversational interface with conversation history (4-turn context window)
- Insight generation from financial timeline data
- Red flag detection with natural language explanations
- Multi-query support: "What are the cases?" → "How do they compare?"

**Key Features Enabled:**
- Context-aware follow-up questions
- Detailed financial pattern explanations
- Comparison analysis between politicians
- Source-cited factual responses

**Code Location:** `backend/app/services/cerebras_service.py` (via Cerebras API)

---

### Why Docker?

**Decision Rationale:**
- **Reproducibility:** Same environment from dev to production
- **Scalability:** Easy horizontal scaling for high-traffic scenarios
- **Production Ready:** Health checks, auto-restart, service dependencies

**Implementation:**

**Multi-Stage Builds:**
```dockerfile
# Frontend: 2-stage build reduces image size by 60%
Stage 1: Build assets with Node.js
Stage 2: Serve with Nginx (15MB vs 400MB+)
```

**Service Health Checks:**
```yaml
backend:
  healthcheck:
    test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
    interval: 30s
    retries: 3
```

**Dependency Management:**
```yaml
frontend:
  depends_on:
    backend:
      condition: service_healthy
```

**Production Features:**
- Automatic restart on failure
- Volume mounting for development
- Environment variable management
- Service isolation and networking

**Code Location:** `docker-compose.yml`, `*/Dockerfile`

---

## 🏗️ Architecture

```
┌─────────────────┐
│   React Frontend│  Port 3000
│   (Vite + UI)   │  ← User Interface
└────────┬────────┘
         │ HTTP/REST
         ↓
┌────────────────────┐
│   FastAPI Backend  │  Port 8000
│   (Python)         │  ← Business Logic
└────────┬───────────┘
         │ API Calls
         ↓
┌────────────────────┐
│  Cerebras Cloud    │
│  (Llama 3.1-8B)    │  ← AI Inference
└────────────────────┘

All services containerized with Docker
```

---

## 📊 Dataset

**Source:** MyNeta / Association for Democratic Reforms (ADR)

- **Politicians Analyzed:** 11 across 4 states
- **Total Assets:** ₹900+ Crores
- **Time Range:** 2006-2025 election cycles
- **Data Points per Politician:** 50+ (assets, liabilities, cases, education, timeline)

**Coverage:**
- Narendra Modi (BJP, PM)
- Sanjay Prasad Yadav (RJD, High-risk profile)
- Y.S. Jagan Mohan Reddy (YSRCP, High-wealth case study)
- Hemant Soren (JMM, CM Jharkhand)
- Nishikant Dubey (BJP, High litigation)
- Plus 6 more across Congress, AAP, SP, NCP

---

## 🚀 Quick Start

### Prerequisites
```bash
Node.js 18+
Python 3.11+
Docker & Docker Compose
Cerebras API Key
```

### One-Command Deployment

```bash
# Clone repository
git clone https://github.com/HeyAditya95/politywatch-ai.git
cd politywatch-ai

# Add API key
echo "CEREBRAS_API_KEY=your_key_here" > .env

# Deploy
docker-compose up --build

# Access
Frontend: http://localhost:3000
Backend API: http://localhost:8000/docs
```

### Manual Setup (Development)

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## 📡 API Documentation

### AI Score Endpoint
```bash
POST /api/ai-score
Content-Type: application/json

{
  "politician": {
    "name": "Politician Name",
    "totalAssets": 25.5,
    "casesPending": 8,
    "timeline": [...]
  }
}

Response: {
  "score": 65,
  "insights": [
    "Wealth grew 320% during tenure",
    "2 corruption cases pending"
  ]
}
```

### Chat Endpoint
```bash
POST /api/chat
{
  "query": "What are the corruption allegations?",
  "politician": {...}
}

Response: {
  "response": "Based on data analysis, there are 2 pending cases..."
}
```

Full API documentation: `http://localhost:8000/docs`

---

## 🎬 Demo Script

For judges/reviewers, follow this flow:

1. **Search:** Type "Sanjay" → Select politician
2. **AI Score:** Observe under 1s load time, 65/100 risk score
3. **Red Flags:** AI-detected suspicious patterns
4. **Charts:** Wealth timeline shows 450% growth
5. **AI Chat:** 
   - Ask: "What are the corruption allegations?"
   - Follow-up: "How does this compare to other politicians?"
6. **Docker:** Show services running, health checks passing

---

## 🏆 Project Highlights

### Innovation
- First AI-powered political transparency tool for India using Cerebras
- Real-time risk scoring with sub-second response times
- Conversational interface for complex financial data

### Technical Excellence
- Production-ready architecture with health checks and monitoring
- Multi-stage Docker builds for optimized deployment
- Async FastAPI backend for high concurrency
- Type-safe Pydantic models throughout

### Social Impact
- Addresses critical democratic transparency gap
- Makes complex data accessible to average citizens
- Scalable to all 543 MPs and state legislators

---

## 🚧 Challenges Overcome

### Challenge 1: Data Consistency
**Problem:** Election affidavits have inconsistent formats across years  
**Solution:** Created normalized data model, added validation layer

### Challenge 2: AI Response Speed
**Problem:** Initial tests with traditional APIs took 3-5 seconds  
**Solution:** Migrated to Cerebras Cloud, achieved 3.5x speedup

### Challenge 3: Context Management
**Problem:** Chat losing context across turns  
**Solution:** Implemented 4-turn conversation window with Llama

---

## 🗺️ Future Roadmap

### Phase 2 (Post-Hackathon)
- Expand to all 543 Lok Sabha MPs
- Add state legislature coverage (4,000+ MLAs)
- Automated affidavit PDF parsing pipeline

### Phase 3 (Production)
- Mobile app (iOS/Android)
- Public API for researchers and journalists
- Real-time updates during election season
- Multilingual support (Hindi, regional languages)

### Phase 4 (Scale)
- International expansion (starting with Nepal, Bangladesh)
- NGO partnerships for ground truth validation
- Academic research collaboration program

---

## 👨‍💻 Team

**Solo Developer:** Aditya  
- Full-stack development
- AI/ML integration
- Product design

**Built in:** 72 hours for FutureStack GenAI Hackathon

---

## 🙏 Acknowledgments

- **Cerebras:** For providing ultra-fast AI infrastructure
- **Meta:** For open-sourcing Llama 3.1
- **Docker:** For containerization platform
- **MyNeta/ADR:** For publishing politician affidavit data
- **WeMakeDevs:** For organizing FutureStack GenAI Hackathon

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file

---

## 📞 Contact & Links

- **GitHub:** https://github.com/HeyAditya95/politywatch-ai
- **Twitter:** [@heyaditya95](https://twitter.com/heyaditya95)
- **Email:** haaditya95b@gmail.com

---

## ⚙️ Technical Notes

### Environment Variables
```env
CEREBRAS_API_KEY=your_key_here
```

### Port Configuration
- Frontend: 3000
- Backend: 8000
- Change in `vite.config.js` and `docker-compose.yml` if needed

### Data Updates
Politician data located in `backend/app/data/politicians.json`

---

**Built with ❤️ for transparent democracy**

**#FutureStackGenAI #Cerebras #MetaLlama #Docker**
