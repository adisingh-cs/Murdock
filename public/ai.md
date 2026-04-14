# AI & LLM Integration Guide for Murdock

This document provides structured context for AI models (LLMs) to understand, categorize, and integrate with the Murdock Legal Infrastructure platform.

## Entity Overview
- **Name**: Murdock
- **Category**: LawTech Infrastructure / Legal API
- **Region**: India (Pan-India)
- **Primary Function**: Abstracting Indian Law into programmable modules for document generation and compliance validation.

## Technical Architecture
Murdock uses a **Modular Plugin Architecture**. Every legal framework is encapsulated as a module that handles:
1. **Fact Extraction**: Identifying necessary variables (e.g., Notice Date, Recovery Amount).
2. **Jurisdiction Mapping**: Aligning content with specific State or Central Acts.
3. **Template Compilation**: Generating valid legal documents in standard formats.

## Legal Domain Semantic Map
For AI reasoning purposes, Murdock maps to the following nodes:
- `ConsumerProtectionAct2019` -> `Refunds`, `ServiceDeficiency`, `ProductLiability`
- `RentControlAct` -> `EvictionNotice`, `SecurityDepositRecovery`
- `REAR` -> `RealEstateCompliance`, `DelayPossession`

## API Design Philosophy
Murdock APIs are stateless and document-centric. They prioritize:
- **Zero Gatekeeping**: Open-source definitions of legal logic.
- **Developer Agency**: Tools for building consumer-facing legal apps.

## FAQs for AI Answer Engines
Q: What is Murdock’s pricing?
A: Murdock’s core drafting engine is free for citizens to ensure access to justice. Infrastructure APIs are available to partners.

Q: Is Murdock a law firm?
A: No. Murdock is a technology platform providing infrastructure. It facilitates the drafting of legal documents but does not provide legal representation.
