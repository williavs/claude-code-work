---
name: build-go-client
description: Uses oapi-codegen to generate Go client from OpenAPI specification
tools: Task, Read, Write, Edit, Bash, LS, TodoWrite
---

# build-go-client

Uses oapi-codegen to deterministically generate a Go client from OpenAPI specification. Must only be used AFTER research-go-client is complete.

## Phase 1: Prerequisite Check

**MANDATORY:** Verify research is complete:
- [ ] research-go-client command was run
- [ ] OpenAPI schema validated and analyzed
- [ ] oapi-codegen configuration planned
- [ ] User approved the generation approach

**If research not complete:** STOP and run research-go-client first.

## Phase 2: Setup Verification

**🚨 DIRECTORY CHECK:**
```bash
pwd
basename $(pwd)
git remote -v
ls -la
```

**VERIFY:** In target client repository before proceeding.

## Phase 3: Deploy Generation Team

Deploy 3 specialized agents:

### Agent 1: Environment Setup
```
Task: Install oapi-codegen and prepare environment.

Your mission:
1. Install oapi-codegen:
   go install github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen@latest
2. Verify installation: oapi-codegen --version
3. Create project structure:
   - mkdir -p api/{service}
   - Create go.mod with module path from research
4. Download/copy OpenAPI schema to project root

Report back:
- oapi-codegen version installed
- Project structure created
- Schema file location
```

### Agent 2: Configuration Creator
```
Task: Create oapi-codegen configuration file.

Your mission:
1. Create oapi-codegen.yaml based on research findings
2. Configuration should include:
   - package: {service}
   - output: api/{service}/client.gen.go
   - generate: types,client
   - client-package: {service}
   - output-options for clean code

Example config:
```yaml
package: {service}
generate:
  - types
  - client
output: api/{service}/client.gen.go
output-options:
  skip-prune: true
  client-with-responses: true
import-mapping:
  time.Time: time
```

3. Save as oapi-codegen.yaml in project root
```

### Agent 3: Client Generator & Wrapper
```
Task: Generate client and create minimal wrapper if needed.

Your mission:
1. Run generation command:
   oapi-codegen --config oapi-codegen.yaml {schema-file}
   
2. If authentication wrapper needed (from research):
   - Create api/{service}/auth_client.go
   - Wrap generated client with auth injection
   - Keep wrapper minimal - just auth handling

3. Create README.md with:
   - How to regenerate client
   - Usage examples
   - Authentication setup
   - Note that client.gen.go is auto-generated

4. Add .gitattributes to mark generated files:
   api/{service}/*.gen.go linguist-generated=true
```

## Phase 4: Post-Generation Tasks

After generation complete:

1. **Module Setup:**
   ```bash
   go mod init {module-path}
   go get -u github.com/oapi-codegen/oapi-codegen/v2
   go get -u github.com/oapi-codegen/runtime
   go mod tidy
   ```

2. **Verify Compilation:**
   ```bash
   go build ./...
   go vet ./...
   ```

3. **Generate Mocks (if interfaces exist):**
   ```bash
   # Only if wrapper created custom interfaces
   go install go.uber.org/mock/mockgen@latest
   mockgen -source=api/{service}/auth_client.go -destination=api/{service}/mock/client.go -package=mock
   ```

## Phase 5: Validation & Documentation

1. **Validate Generated Code:**
   - Check client methods match schema
   - Verify all types generated correctly
   - Ensure authentication integrated

2. **Document Regeneration Process:**
   Create REGENERATE.md:
   ```markdown
   # Regenerating the Client
   
   This client is auto-generated from OpenAPI spec.
   
   To regenerate:
   1. Update OpenAPI schema if needed
   2. Run: oapi-codegen --config oapi-codegen.yaml {schema}
   3. Run: go mod tidy
   
   DO NOT manually edit *.gen.go files!
   ```

## Phase 6: Delivery Report

```
🔨 GENERATION COMPLETE

📦 GENERATED FILES:
✅ api/{service}/client.gen.go - Auto-generated client
✅ api/{service}/auth_client.go - Auth wrapper (if needed)
✅ oapi-codegen.yaml - Generation config
✅ go.mod - Module configuration
✅ README.md - Usage documentation
✅ REGENERATE.md - Regeneration instructions

🧪 VERIFICATION:
✅ Code compiles successfully
✅ All endpoints from schema included
✅ Types match OpenAPI definitions
✅ Marked as generated in git

🚀 READY FOR USE:
- No manual testing needed (deterministic generation)
- Can regenerate anytime schema changes
- Ready for integration
```

## Critical Rules:

- 🚨 NEVER manually edit *.gen.go files
- 🚨 OpenAPI schema is single source of truth
- 🚨 Use oapi-codegen for ALL generation
- 🚨 Keep wrappers minimal (auth only)
- 🚨 Document regeneration process clearly

## Success Criteria:

- [ ] Client generated from OpenAPI spec
- [ ] Code compiles without errors
- [ ] Authentication wrapper added if needed
- [ ] Regeneration documented
- [ ] Ready for immediate use

This approach ensures deterministic, maintainable client generation.