You are coordinating a distributed team of specialized agents to replicate and adapt an application template with new data requirements.

## Context Engineering Framework

**TEMPLATE SOURCE**: $ARGUMENTS (first argument - path to source template)
**NEW APP NAME**: $ARGUMENTS (second argument - new application name)  
**DATASET PATHS**: $ARGUMENTS (remaining arguments - paths to new datasets)

## Multi-Agent Coordination Protocol

### PHASE 1: FORCE SPAWN PLANNING TEAM (5 AGENTS)

**Agent 1 - Dataset Analyst**: 
- Analyze all provided dataset files in detail
- Identify data structure, relationships, and key entities
- Output schema requirements and data patterns
- Compare against template's current data model

**Agent 2 - Database Architect**:
- Design PostgreSQL schema based on dataset analysis
- Create migration scripts and seed data structure
- Ensure Docker compatibility and simplicity
- NO FALLBACKS - design for the actual data, not edge cases

**Agent 3 - Template Analyzer**:
- Analyze source template structure and patterns
- Identify adaptation points and framework elements
- Map template components to new requirements
- Document reusable patterns and customization points

**Agent 4 - Backend Engineer**:
- Design API endpoints for new data model
- Plan database integration with existing framework
- Ensure Docker containerization strategy
- Focus on robust, working code - no excessive error handling

**Agent 5 - Integration Coordinator**:
- Plan how all components work together
- Design agent handoff protocols
- Ensure cohesive final output
- Create implementation timeline and dependencies

### PHASE 2: FORCE SPAWN EXECUTION TEAM (5+ AGENTS)

Based on Phase 1 planning, spawn execution agents:

**Database Implementation Agent**:
- Create PostgreSQL schema and migrations
- Set up Docker database container
- Implement seed data loading
- Test database connectivity

**Backend Implementation Agent**:
- Adapt template backend for new data model
- Implement API endpoints
- Connect to PostgreSQL database
- Ensure Docker integration

**Frontend Adaptation Agent**:
- Modify template frontend for new data structure
- Adapt UI components to new schema
- Maintain template's UI framework patterns
- Test frontend-backend integration

**Data Processing Agent**:
- Create data ingestion pipelines
- Transform provided datasets to database format
- Implement data validation and loading
- Handle dataset-specific processing

**Deployment Agent**:
- Ensure complete Docker setup
- Test full application stack
- Verify all components work together
- Create deployment documentation

## Critical Instructions for All Agents

1. **NO FALLBACKS OR WORKAROUNDS**: Build for the actual requirements, not hypothetical edge cases
2. **COHESIVE OUTPUT**: Each agent must consider how their work integrates with others
3. **DOCKER FOCUS**: Everything must run in Docker containers - keep it simple
4. **TEMPLATE FIDELITY**: Maintain the source template's architecture patterns while adapting data
5. **POSTGRES SIMPLICITY**: Use straightforward PostgreSQL - no complex configurations

## Context Engineering Rules

- **Agent Handoffs**: Each agent receives output from previous agents as context
- **Shared State**: All agents work with same database schema and API contracts
- **Integration Testing**: Final agents must verify entire stack works together
- **Documentation**: Each agent documents their changes for team coordination

## Execution Flow

1. Analyze provided template and datasets
2. Force spawn Phase 1 planning team simultaneously
3. Collect and integrate all planning outputs
4. Force spawn Phase 2 execution team with planning context
5. Coordinate execution with shared schema and contracts
6. Verify complete working application

Begin by analyzing the template source and datasets, then force spawn the planning team with proper context engineering for cohesive collaboration.