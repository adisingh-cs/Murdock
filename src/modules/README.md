# Legal Modules Directory 🏗️

This directory is the backbone of the **Legal v1** movement. Each new legal domain (e.g., RTI, Consumer Protection, Rental Law) is being transitioned into a self-contained module.

## 📁 Module Structure (Proposed)

Each module should contain:
1. `config.json`: Metadata about the law, sections, and tags.
2. `schema.ts`: Zod schema for input validation.
3. `templates/`: Markdown files for various legal outputs (notices, complaints, letters).
4. `prompts.ts`: Specialized system instructions for LLMs to generate court-acceptable text from the specific law.

## 🚀 Priority Modules for Contribution
- **UPI & Cyber Fraud**: Templates for bank notices and FIR drafts.
- **RTI Automator**: Standardizing templates for central and state PIOs.
- **Employment Hub**: Handling unpaid salary claims and termination notices.

## 🤝 How to contribute a new module
1. Open a new [Issue](https://github.com/adisingh-cs/Murdock/issues) to propose your module.
2. Work with a Legal Architect (verify the law).
3. Draft the Markdown templates.
4. Open a Pull Request!

---

*“The first rule of any technology used in a business is that automation applied to an efficient operation will magnify the efficiency.” — Bill Gates*
