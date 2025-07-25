---
name: build-go-client
description: Deploys a 3-agent build team to create Go client files based on research findings
tools: Task, Read, Write, Edit, Bash, LS, TodoWrite
---

# build-go-client

Deploys a specialized 3-agent build team to create the Go client wrapper files based on completed research findings. Must only be used AFTER research-go-client is complete.

## Phase 1: Prerequisite Check

**MANDATORY:** Verify research is complete:
- [ ] research-go-client command was run
- [ ] User approved the research plan
- [ ] All SDK, types, and patterns documented
- [ ] OpenAPI schema analyzed

**If research not complete:** STOP and run research-go-client first.

## Phase 2: Directory Verification

**🚨 CRITICAL SAFETY CHECK:**
```bash
pwd
basename $(pwd)
git remote -v
ls -la
```

**VERIFICATION QUESTIONS:**
- Are we in the NEW client repo (ending in `-go-client`)?
- Does git remote show the NEW client repo URL?
- Are we NOT in the source service repo?
- Is this directory empty/minimal (new repo)?

**IF ANY CHECK FAILS:** STOP and ask user to navigate to correct NEW client repo.

## Phase 3: Team Preparation

Brief all 3 agents with research findings and JW patterns:

**Shared Context for All Agents:**
- SDK module path: {from-research}
- Required endpoints: {from-research} 
- Core types needed: {from-research}
- JW patterns to follow: {from-research}
- Authentication approach: {from-research}
- OpenAPI schema insights: {from-research}

**Compliance Rules for All Agents:**
- ✅ Use research findings as source of truth
- ✅ Follow established JW patterns exactly
- ✅ Keep interfaces minimal and focused
- ✅ Never duplicate SDK functionality
- ❌ No custom types unless absolutely necessary
- ❌ No complex abstractions
- ❌ No more than 2 main files (client.go, types.go)

## Phase 4: Deploy Build Team

### Agent 1: Client Interface Builder
```
Task: Create the main client interface and implementation.

Your mission:
1. Create api/{service}/client.go
2. Build clean interface with ONLY methods user needs for reporting
3. Implement interface using SDK wrapper pattern
4. Follow JW authentication patterns from research
5. Handle errors appropriately

Requirements:
- Import SDK: {sdk-module-path}
- Create Client interface with methods: {specific-methods-from-research}
- Implement client struct wrapping SDK
- NewClient() function with OAuth2 setup
- Follow error handling patterns from research
- Keep it simple and focused

Code Structure:
```go
package {service}

import (
    "context" 
    {service}sdk "{sdk-module-path}"
    "golang.org/x/oauth2"
)

type Client interface {
    // Methods from research findings
}

type client struct {
    sdk *{service}sdk.APIClient
}

func NewClient(host string, oauth2Config oauth2.Config) Client {
    // Implementation following JW patterns
}
```
```

### Agent 2: Types System Builder
```
Task: Create the types file with clean type re-exports.

Your mission:
1. Create api/{service}/types.go  
2. Re-export ONLY types needed for user's endpoints
3. Use research findings to identify required types
4. No custom types unless research identified gaps

Requirements:
- Import SDK: {sdk-module-path}
- Re-export types: {types-from-research}
- Add type aliases for clean interfaces
- Include any enums/constants needed
- Keep it minimal and focused

Code Structure:
```go
package {service}

import {service}sdk "{sdk-module-path}"

// Re-export core types from research
type {MainType} = {service}sdk.{MainType}
type {SecondType} = {service}sdk.{SecondType}
// etc. based on research findings
```
```

### Agent 3: Module & Mock Builder  
```
Task: Set up Go module and generate mocks.

Your mission:
1. Create proper go.mod file
2. Set up dependencies correctly
3. Generate mocks from client interface
4. Create basic README

Requirements:
- Module path: github.com/justworkshr/{service-name}-go-client
- Dependencies: SDK module, oauth2, mock tools
- Generate mocks in api/{service}/mock/client.go
- Follow JW module patterns from research

Setup Process:
1. Create go.mod with proper module path
2. Add SDK dependency: {sdk-module-path}
3. Add oauth2 dependency
4. Run go mod tidy
5. Generate mocks: mockgen -source=api/{service}/client.go -destination=api/{service}/mock/client.go -package=mock
6. Create README with usage examples
```

## Phase 5: Build Coordination

Deploy all 3 agents SIMULTANEOUSLY:

1. **Agent 1** builds client.go
2. **Agent 2** builds types.go  
3. **Agent 3** sets up module & mocks

**Coordination Rules:**
- All agents work in parallel
- Use research findings as single source of truth
- Follow established JW patterns exactly
- Cross-reference each other's work for consistency

## Phase 6: Integration Verification

After build complete:

1. **Verify Structure:**
   ```
   api/{service}/client.go     ✓
   api/{service}/types.go      ✓  
   api/{service}/mock/client.go ✓
   go.mod                      ✓
   README.md                   ✓
   ```

2. **Test Compilation:**
   ```bash
   go mod tidy
   go build ./...
   ```

3. **Verify Mocks:**
   ```bash
   ls -la api/{service}/mock/
   grep -c "Mock" api/{service}/mock/client.go
   ```

## Phase 7: Delivery Report

Present final deliverables:

```
🔨 BUILD COMPLETE

📦 DELIVERABLES:
✅ api/{service}/client.go - {X} methods, OAuth2 ready  
✅ api/{service}/types.go - {Y} types re-exported
✅ api/{service}/mock/client.go - Generated mocks
✅ go.mod - Dependencies configured
✅ README.md - Usage documentation

🧪 VERIFICATION:
✅ Code compiles successfully
✅ Mocks generated correctly
✅ Dependencies resolved
✅ Follows JW patterns

🚀 READY FOR:
- Tag and release (v1.0.0)
- Integration into reporting service
- Following health API integration patterns
```

## Critical Build Rules:

- 🚨 DEPLOY ALL 3 AGENTS SIMULTANEOUSLY
- 🚨 USE RESEARCH FINDINGS AS SINGLE SOURCE OF TRUTH
- 🚨 FOLLOW JW PATTERNS EXACTLY
- 🚨 VERIFY DIRECTORY BEFORE ANY WRITES
- 🚨 KEEP IT SIMPLE - NO OVER-ENGINEERING
- 🚨 TEST COMPILATION BEFORE DELIVERY

## Success Criteria:

- [ ] All files created successfully
- [ ] Code compiles without errors
- [ ] Mocks generated and working
- [ ] Follows research plan exactly
- [ ] Ready for integration into reporting service

This build phase creates production-ready client wrapper following all established patterns and research findings.