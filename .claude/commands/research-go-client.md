---
name: research-go-client
description: Deploys a research team to analyze existing service SDKs and plan optimal Go client approach
tools: Task, Read, Bash, Grep, Glob, LS, TodoWrite
---

# research-go-client

Deploys a specialized multi-agent research team to thoroughly analyze an existing service's SDK and plan the optimal Go client wrapper approach.

## Phase 1: Information Gathering

Ask user these questions ONE AT A TIME:

1. **Service name?** (e.g., "payroll-platform")
2. **GitHub source URL?** 
3. **OpenAPI schema URL or file?** (Critical for build phase)
4. **Endpoints needed for reporting?** (List specific ones)

## Phase 2: Directory Safety Check

**🚨 MANDATORY VERIFICATION:**
```bash
pwd
basename $(pwd) 
git remote -v 2>/dev/null || echo "Not a git repo"
```

**SAFETY:** Must be in safe directory (like `/reporting`). If unclear, ASK USER.

## Phase 3: Deploy Research Swarm

Deploy 4 specialized research agents simultaneously:

### Agent 1: SDK Structure Analyst
```
Task: Analyze the service's official Go SDK structure and capabilities.

Your mission:
1. Clone {github-url} to temp-analysis
2. Find official SDK (look in /sdk/go/, /client/, /api/)
3. Analyze SDK structure:
   - Main client interfaces
   - Available API methods  
   - Authentication patterns
   - Module/package structure
   - Version and maintenance status

Report back:
- SDK location and module path
- All available client interfaces
- Authentication mechanism (OAuth2, etc.)
- List of ALL available methods
- SDK version and last updated
```

### Agent 2: Type System Expert
```
Task: Catalog all data types and models from the service SDK.

Your mission:
1. Examine all model/type files in the SDK
2. Map data structures to user's needed endpoints
3. Identify core types for reporting use cases

Report back:
- Complete list of relevant data types
- Type definitions (structs, enums, etc.)
- Relationships between types
- Which types are needed for user's endpoints
- Any custom types we might need to create
```

### Agent 3: JW Patterns Researcher  
```
Task: Research established JW client patterns from the codebase.

Your mission:
1. Examine existing JW client implementations (health-benefits, etc.)
2. Document standard patterns for:
   - Client interface design
   - OAuth2 configuration
   - Error handling approaches
   - Mock generation strategies
   - Integration with reporting service

Report back:
- Standard JW client interface patterns
- OAuth2 setup patterns
- Error handling conventions
- Mock generation approach
- Integration patterns for reporting service
```

### Agent 4: OpenAPI Integration Specialist
```
Task: Analyze the OpenAPI schema to complement SDK analysis.

Your mission:
1. Parse the provided OpenAPI schema
2. Cross-reference with SDK findings
3. Identify any gaps or additional insights

Report back:
- Schema version and completeness
- Endpoint coverage vs user needs
- Authentication requirements from schema
- Any discrepancies with SDK
- Additional context for client design
```

## Phase 4: Research Coordination

After all agents complete, synthesize findings:

1. **Consolidate Reports** - Merge all agent findings
2. **Identify Gaps** - What's missing or unclear
3. **Assess Completeness** - Do we have everything needed?
4. **Plan Validation** - Cross-check agent findings

## Phase 5: Present Unified Plan

Present comprehensive plan to user:

```
🔍 RESEARCH COMPLETE

📋 SDK ANALYSIS:
- Location: {sdk-path}
- Module: {module-path} 
- Version: {version}
- Interfaces: {list-interfaces}
- Auth: {auth-method}

📋 TYPE SYSTEM:
- Core types: {core-types}
- Required for endpoints: {endpoint-types}
- Custom types needed: {custom-types}

📋 JW PATTERNS:
- Interface pattern: {pattern}
- OAuth2 setup: {oauth-pattern}
- Error handling: {error-pattern}
- Mock strategy: {mock-pattern}

📋 OPENAPI INSIGHTS:
- Schema version: {version}
- Coverage: {coverage-assessment}
- Auth requirements: {auth-reqs}

📋 RECOMMENDED APPROACH:
- Client interface with {X} methods
- Re-export {Y} core types
- Use {auth-pattern} for authentication
- Generate mocks with {mock-strategy}

📋 IMPLEMENTATION PLAN:
1. Create client.go with {specific-methods}
2. Create types.go with {specific-types}
3. Setup go.mod with {dependencies}
4. Generate mocks with {approach}

✅ READY FOR BUILD PHASE
```

## Critical Research Rules:

- 🚨 DEPLOY ALL 4 AGENTS SIMULTANEOUSLY for parallel research
- 🚨 NEVER modify any source code during research
- 🚨 CROSS-VALIDATE findings between agents
- 🚨 IDENTIFY any inconsistencies or gaps
- 🚨 PRESENT unified, actionable plan to user

## Success Criteria:

- [ ] Complete SDK structure documented
- [ ] All relevant types cataloged
- [ ] JW patterns identified and documented
- [ ] OpenAPI schema analyzed
- [ ] Unified implementation plan ready
- [ ] User approves plan before build phase

This research phase ensures the build team has perfect information to create an optimal client wrapper.