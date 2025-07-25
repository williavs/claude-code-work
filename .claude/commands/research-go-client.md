---
name: research-go-client
description: Deploys a research team to analyze OpenAPI schema and plan Go client generation
tools: Task, Read, Bash, Grep, Glob, LS, TodoWrite, WebFetch
---

# research-go-client

Deploys a specialized research team to analyze OpenAPI schema and plan deterministic Go client generation using oapi-codegen.

## Phase 1: Information Gathering

Ask user these questions ONE AT A TIME:

1. **Service name?** (e.g., "payroll-platform")
2. **OpenAPI schema URL or file path?** (REQUIRED - this drives everything)
3. **Target module name?** (e.g., "github.com/justworkshr/payroll-platform-go-client")
4. **Authentication type?** (OAuth2, API Key, Bearer token, etc.)

## Phase 2: Directory Verification

**🚨 MANDATORY VERIFICATION:**
```bash
pwd
basename $(pwd)
git remote -v 2>/dev/null || echo "Not a git repo"
ls -la
```

**VERIFY:** We're in the target client repo directory. If not, guide user to correct location.

## Phase 3: Deploy Research Team

Deploy 3 specialized agents simultaneously:

### Agent 1: OpenAPI Schema Analyst
```
Task: Thoroughly analyze the OpenAPI schema for code generation.

Your mission:
1. Fetch/read the OpenAPI schema from {schema-url-or-path}
2. Analyze schema structure:
   - OpenAPI version (2.0/3.0/3.1)
   - Available endpoints and operations
   - Data models and schemas
   - Authentication/security schemes
   - Server configurations

Report back:
- Schema version and validity
- Complete endpoint inventory
- All data models/schemas defined
- Authentication requirements
- Any schema issues or warnings
```

### Agent 2: oapi-codegen Configuration Expert
```
Task: Plan optimal oapi-codegen configuration for this schema.

Your mission:
1. Research oapi-codegen best practices
2. Determine optimal generation config:
   - Package name and structure
   - Client vs types vs server generation
   - Interface style (client-with-responses, etc.)
   - Additional options needed

Report back:
- Recommended oapi-codegen version
- Configuration file structure
- Generation command options
- Package organization strategy
- Any special flags needed
```

### Agent 3: Integration Patterns Researcher
```
Task: Research how generated client will integrate with existing code.

Your mission:
1. Analyze JW authentication patterns
2. Research existing Go client usage patterns
3. Plan integration approach:
   - How to wrap generated client if needed
   - Authentication injection pattern
   - Error handling approach
   - Testing strategy for generated code

Report back:
- Authentication integration pattern
- Any wrapper code needed
- Mock generation approach
- Integration examples
- Testing recommendations
```

## Phase 4: Synthesis & Validation

Consolidate findings into actionable plan:

1. **Validate Schema** - Ensure OpenAPI schema is complete and valid
2. **Config Strategy** - Finalize oapi-codegen configuration
3. **Integration Plan** - Document how generated client will be used
4. **Identify Gaps** - Any manual code needed beyond generation

## Phase 5: Present Generation Plan

```
🔍 OPENAPI ANALYSIS COMPLETE

📋 SCHEMA DETAILS:
- Version: {openapi-version}
- Endpoints: {endpoint-count}
- Models: {model-count}
- Auth: {auth-schemes}

📋 GENERATION PLAN:
- Tool: oapi-codegen {version}
- Package: {package-name}
- Structure: {client|types|server}
- Config file: oapi-codegen.yaml

📋 COMMAND:
oapi-codegen --config oapi-codegen.yaml {schema-source} > client.gen.go

📋 INTEGRATION:
- Authentication: {auth-pattern}
- Wrapper needed: {yes/no}
- Mock strategy: Use generated interfaces

📋 NEXT STEPS:
1. Install oapi-codegen
2. Create config file
3. Generate client
4. Add authentication wrapper if needed
5. Generate mocks from interfaces

✅ READY FOR GENERATION
```

## Critical Rules:

- 🚨 OpenAPI schema is the SINGLE SOURCE OF TRUTH
- 🚨 Generated code should NOT be manually edited
- 🚨 Use deterministic generation over manual coding
- 🚨 Focus on configuration, not implementation

## Success Criteria:

- [ ] Valid OpenAPI schema analyzed
- [ ] oapi-codegen configuration ready
- [ ] Integration pattern documented
- [ ] Generation command tested
- [ ] User approves approach

This research ensures clean, deterministic client generation from OpenAPI spec.