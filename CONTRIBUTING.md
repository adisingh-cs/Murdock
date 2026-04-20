# Contributing to Murdock 🚀

Thank you for your interest in Murdock! We are building the **Legal v1 Movement** – an open-source initiative to turn complex Indian laws into programmable, accessible, and structured infrastructure for every citizen.

Murdock is currently a **serverless React application** powered by **Supabase** and **Netlify**.

---

## 🏛️ Our Mission

Law should be a public utility, not a gated service. We believe that by building modular law engines, we can:
1. Reduce the barrier to legal access for Indian citizens.
2. Automate the generation of court-acceptable documents.
3. Establish a standard for "Law as an API."

---

## 🛡️ Contributor Roles

We welcome specialized help across multiple domains:

### 1. Legal Architects (Lawyers & Legal Students)
- **What you do**: Verify the legal accuracy of our document templates.
- **How you help**: Audit existing modules for compliance with the latest Indian legislation (e.g., CPA 2019, RERA).
- **Tooling**: You don't need to code! You can edit our Markdown templates in the `src/modules` directory (planned).

### 2. Module Developers (React & TypeScript)
- **What you do**: Implement the logic and UI for new legal domains.
- **Priority List**: 
    - **UPI & Cyber Fraud** (Emergency response templates)
    - **RTI Automator** (Standardizing information requests)
    - **Employment Hub** (Salary/PF disputes)

### 3. Core Orchestrators (Backend & AI)
- **What you do**: Improve the AI processing pipeline and Netlify functions.
- **Focus**: Improving prompt accuracy, multi-LLM failover, and PDF/DOCX generation quality.

---

## 🛠️ Technical Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/adisingh-cs/Murdock.git
   cd Murdock
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Copy `.env.local.example` to `.env.local` and add your Supabase keys.
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run local development**:
   ```bash
   npm run dev
   ```

---

## 🤝 How to Help Today

1. **Propose a Module**: Use [GitHub Issues](https://github.com/adisingh-cs/Murdock/issues) to suggest new modules or legal domains.
2. **Submit a Module**: Check our roadmap in the **Community** page on the site.
3. **Report Issues**: If you find a legal inaccuracy, please open an issue immediately.

---

## 📜 License

By contributing to Murdock, you agree that your contributions will be licensed under the **Apache License 2.0**.
