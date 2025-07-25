---
description: Reviews SQL documentation and helps you pull data from the transcript database
---

# SQL Data Assistant

This command reviews all SQL documentation in the willy-eval/docs directory and then helps you create queries to pull data from the customer interaction transcript database.

## Review Documentation

First, I'll review all the documentation files to understand the available data model:

@evals/langsmith/willy-eval/docs/data-model-customer-interactions.md
@evals/langsmith/willy-eval/docs/prodanalyticsdbdimsalesaccounts.md
@evals/langsmith/willy-eval/docs/transcript_data_model_llm_digest.md
@evals/langsmith/willy-eval/docs/Transcript Data Model ERD.csv

## Now I'll help you query the data

Based on the documentation I've reviewed, I can help you pull data from the customer interaction transcript database. The main tables available are:

**Core Tables:**
- `fact_transcripts` - Central fact table with all transcripts
- `dim_gong_transcripts` - Gong call details
- `dim_salesloft_transcripts` - Salesloft email details
- `dim_talkdesk_transcripts` - Talkdesk call details
- `dim_sales_accounts` - Salesforce account details (key for joining company information)
- Bridge tables linking to Salesforce and JW entities

**Key Relationships:**
- Join transcripts to companies via bridge tables and dim_sales_accounts
- dim_sales_accounts contains critical business attributes like industry, employee count, ARR, etc.
- Use bridge tables to handle many-to-many relationships between transcripts and entities

**What type of data would you like to pull?** Some examples:
- Gong sales calls for specific industries or company sizes
- Customer interactions for accounts with specific ARR ranges
- Transcripts for companies in particular sales stages or territories
- Calls linked to won/lost opportunities with account context
- Email conversations for prospects vs. existing customers
- Interactions for PEO companies with CA employees
- Analysis by account owner, team, or sales segment

Please describe what data you need and I'll help you write the appropriate SQL query with proper joins to dim_sales_accounts and other relevant tables.