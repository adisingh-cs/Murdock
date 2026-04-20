# Murdock — AI-Powered Indian Legal Document Compiler

Murdock enables Indian citizens, lawyers, businesses, and developers to generate legally structured, court-acceptable plain-paper documents using AI assistance. 

## Features
- **7 Core Legal Modules:** Covers Consumer Complaints, RTI Applications, Legal Notices, FIR Drafts, Employment Grievances, Rental Disputes, and Banking/UPI frauds.
- **Multilingual Support:** English, Hindi, Marathi, and Gujarati generation perfectly structured with local legislative glossaries.
- **Async AI Generation:** Reliable and scalable queues handled by Netlify Background Functions.
- **Supabase Authentication:** Secure, open-source identity management with role-based access.
- **Zero-Infra Architecture:** Completely serverless leveraging Netlify, React 18, and Supabase.

---

## Technical Stack Overview

- **Frontend:** React 18 + Vite + Tailwind CSS + shadcn/ui + Framer Motion
- **Authentication:** Supabase Auth
- **Backend APIs:** Netlify Functions (Node.js/TypeScript)
- **Database:** Supabase PostgreSQL

---

## 🛠️ Getting Started & Deployment

The architecture and background functions are automatically bootstrapped. Below is your checklist for local development and Netlify deployment.

### 1. Local Setup
```bash
git clone https://github.com/adisingh-cs/Murdock.git
cd Murdock
npm install
npm run dev
```

> [!TIP]
> Create a `.env.local` file with your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

### 2. Finalizing Netlify Deployment

#### Netlify Env Variables
When you link this GitHub repository in Netlify, you **must** supply these environment variables:
```env
# Supabase Keys
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI Provider Key
OPENAI_API_KEY=your_openai_api_key
```

#### Build Settings
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`

---

## 🤝 Contributing & Collaboration

Murdock is an **Open Source** project and we welcome contributions from developers and legal experts alike.

- **Coders**: Help us build new legal modules or improve the AI pipeline.
- **Lawyers**: Help us verify the accuracy of legal templates for different Indian states.

**Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.**

---

## 📜 License
Licensed under the [Apache License 2.0](LICENSE).
