Analyze the provided dataset(s) and design a PostgreSQL database schema.

## Dataset Analysis

**DATASET PATHS**: $ARGUMENTS (space-separated paths to CSV/data files)

Please analyze each provided dataset file:

1. **Data Structure Analysis**:
   - Column names, types, and relationships
   - Data patterns and constraints
   - Key entities and foreign key relationships
   - Data quality and completeness

2. **PostgreSQL Schema Design**:
   - Table definitions with appropriate data types
   - Primary keys, foreign keys, and indexes
   - Constraints and validation rules
   - Migration SQL scripts

3. **Docker Integration**:
   - Simple PostgreSQL Docker setup
   - Database initialization scripts
   - Connection configuration
   - No complex fallbacks - focus on working setup

4. **Data Loading Strategy**:
   - CSV import procedures
   - Data transformation requirements
   - Seed data preparation
   - Validation procedures

## Output Requirements

Provide:
- Complete PostgreSQL schema DDL
- Docker compose configuration
- Data loading scripts
- Basic connection examples

Focus on simplicity and functionality - make it work, not bulletproof.