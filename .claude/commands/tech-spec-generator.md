---
name: tech-spec-generator
description: Generates comprehensive technical specs using research data in JW format
tools: Task, Read, Write, Grep, Glob
---

# tech-spec-generator

Creates detailed technical specification documents using research findings and following established JW formatting patterns.

## Phase 1: Research Input Gathering

Ask user these questions ONE AT A TIME:

1. **Feature/Epic name?** (e.g., "Payroll Integration Client")
2. **Initiative ID?** (e.g., "SHARED-123") 
3. **Research source?** (Command used like `/research-go-client` or specific findings)
4. **Target service/system?** (What are we building for?)
5. **Document owner?** (Defaults to @William VanSickle III)

## Phase 2: Research Data Collection

Deploy research agent to gather existing findings:

### Agent 1: Research Synthesizer
```
Task: Collect and synthesize all available research data for the tech spec.

Your mission:
1. Search for research outputs, API documentation, existing patterns
2. Identify architecture patterns from similar implementations
3. Catalog data models, endpoints, and integration patterns
4. Map user requirements to technical implementation
5. Identify risks, unknowns, and dependencies

Report back:
- Architecture overview with ASCII diagrams
- Complete data model definitions  
- API endpoint requirements (new/modified)
- Performance and security considerations
- Risk assessment with mitigations
- Implementation timeline with estimates
```

## Phase 3: Spec Structure Generation

Generate spec following JW template with these sections:

### Required Sections:
- **Initiative/Epic** - Project identifier and scope
- **👷 Architecture Considerations** - System design with ASCII diagrams
- **🔄 Expected Flow** - User journey and data flow
- **➡️ New/Existing Endpoints** - API changes required
- **🔢 Data Models** - Complete type definitions
- **👨‍👩‍👧‍👦 Related Actors** - Users, systems, objects, relationships
- **🙅‍♂️ Permissions** - Access control and security
- **❓ Unknowns** - Open questions and assumptions
- **🎲 Risks** - Technical, business, security risks with mitigations
- **👕 Estimation** - Development effort and timeline
- **Implementation Status** - Current progress and next steps

### Format Requirements:
- Use ASCII diagrams for architecture
- Include code examples for data models
- Provide specific endpoint paths and methods
- Estimate in days/weeks with clear deliverables
- Mark completion status with ✅/🚧/⏳ emojis

## Phase 4: Technical Deep Dive

### Agent 2: Implementation Planner
```
Task: Create detailed implementation plan with technical specifics.

Your mission:
1. Design system architecture with component interactions
2. Define exact API contracts and data structures
3. Identify technology stack and dependencies
4. Plan development phases with clear milestones
5. Assess integration points and testing strategy

Report back:
- Detailed component architecture
- Complete API specification
- Technology and dependency choices
- Phase-by-phase implementation plan
- Testing and deployment strategy
```

## Phase 5: Risk and Estimation Analysis

### Agent 3: Risk Assessor
```
Task: Comprehensive risk analysis and effort estimation.

Your mission:
1. Identify technical risks and mitigation strategies
2. Assess business and security implications
3. Estimate development effort with buffer
4. Plan rollout and deployment timeline
5. Identify success metrics and monitoring

Report back:
- Complete risk matrix with mitigations
- Detailed effort estimates by component
- Deployment timeline with milestones
- Success criteria and monitoring plan
- Rollback and contingency planning
```

## Phase 6: Spec Generation and Review

Compile comprehensive tech spec:

```
Last updated: {current-date}

Product Requirements Doc
{feature-name} - {initiative-id}

Initiative or Epic
{initiative-id}: {description}

Document Owner
{document-owner}

👷 Architecture Considerations
{architecture-overview-with-diagrams}

🔄 Expected Flow
{user-flows-and-data-flows}

➡️ New Endpoint(s) to Create
{new-api-endpoints}

➡️ Existing Endpoint(s) to Edit
{modified-endpoints}

🔢 Data Models
{complete-type-definitions}

👨‍👩‍👧‍👦 Related Actors and Objects
{actors-objects-relationships}

🙅‍♂️ Permissions
{security-and-access-control}

❓ Unknowns
{open-questions-and-assumptions}

🎲 Risks
{risk-analysis-with-mitigations}

👕 Estimation
{development-timeline-and-effort}

Implementation Status
{current-progress-and-status}
```

## Phase 7: Validation and Finalization

Present spec to user for review:

```
📋 TECH SPEC GENERATED

📄 Document: {filename}
🎯 Feature: {feature-name}
🏷️ Initiative: {initiative-id}

📐 Architecture: {architecture-summary}
🔧 Implementation: {implementation-approach}
⏱️ Timeline: {estimated-timeline}
⚠️ Key Risks: {top-3-risks}

✅ READY FOR REVIEW
```

## Critical Generation Rules:

- 🚨 FOLLOW JW template format exactly
- 🚨 INCLUDE ASCII diagrams for architecture
- 🚨 PROVIDE specific technical details, not abstractions
- 🚨 ESTIMATE with concrete deliverables and timelines
- 🚨 ADDRESS security, performance, and scalability
- 🚨 IDENTIFY clear success criteria

## Phase 8: Confluence Integration (Optional)

After spec generation, offer Confluence publishing:

```
📋 TECH SPEC COMPLETE

Would you like to publish this spec to Confluence?

Options:
1. Create page in your personal Confluence space
2. Create page in a team space (Technology, etc.)
3. Save locally only
4. Both Confluence + local file
```

### Confluence Publishing Flow:

#### Step 1: Discover Available Spaces
```
1. Get user's Confluence access with getAccessibleAtlassianResources
2. List available spaces with getConfluenceSpaces
3. Find user's personal space automatically using their account ID pattern
4. Show user available team spaces for selection
```

#### Step 2: Smart Space Selection
```
If user says "personal space" or similar:
- Search for space key pattern: ~{account_id}
- Use getConfluenceSpaces with type="personal" to find user's space
- Extract numeric space ID from results

If user specifies team space:
- Search spaces by key (e.g., "Technology" → "Prod")
- Allow user to specify space key directly
- Validate space exists and user has write access
```

#### Step 3: Robust Page Creation
```
Try to create page with error handling:
1. Use createConfluencePage with:
   - cloudId: from getAccessibleAtlassianResources
   - spaceId: numeric ID (not account ID string!)
   - title: "Tech Spec: {feature-name} - {initiative-id}"  
   - body: markdown content

2. Handle common errors:
   - 400 Bad Request: Check if spaceId is numeric, not string
   - 403 Forbidden: User lacks write permission to space
   - 409 Conflict: Page with same title already exists
   
3. On success: Provide full Confluence URL for editing
```

#### Step 4: Error Recovery
```
If page creation fails:
1. Explain the specific error to user
2. Offer alternative spaces or suggest different title
3. Fall back to local file creation
4. Provide manual steps for Confluence upload if needed
```

### Confluence Troubleshooting Guide:

**Common Issues & Solutions:**

1. **"Invalid spaceId type" Error**
   - Problem: Using account ID string instead of numeric space ID
   - Solution: Extract numeric `id` field from space search results

2. **Personal Space Not Found**
   - Problem: User's personal space key format varies
   - Solution: Search by account ID pattern or user email domain

3. **Permission Denied**  
   - Problem: User lacks write access to target space
   - Solution: Suggest personal space or request space access

4. **Page Title Conflicts**
   - Problem: Page with same title already exists
   - Solution: Append timestamp or version number to title

### Enhanced Confluence Integration:
```
async function publishToConfluence(spec, userPreference) {
  try {
    // Get Confluence access
    const resources = await getAccessibleAtlassianResources()
    const cloudId = resources[0].id
    
    // Find target space
    let targetSpace
    if (userPreference === "personal") {
      targetSpace = await findPersonalSpace(cloudId)
    } else {
      targetSpace = await findSpaceByName(cloudId, userPreference)
    }
    
    // Create page with retry logic
    const page = await createConfluencePage({
      cloudId,
      spaceId: parseInt(targetSpace.id), // Ensure numeric!
      title: generatePageTitle(spec),
      body: spec.content
    })
    
    return `✅ Published to Confluence: ${page._links.webui}`
    
  } catch (error) {
    return handleConfluenceError(error, spec)
  }
}
```

## Success Criteria:

- [ ] Complete technical specification generated
- [ ] Architecture clearly defined with diagrams
- [ ] Data models and APIs fully specified
- [ ] Risks identified with mitigation strategies
- [ ] Implementation timeline with realistic estimates
- [ ] Document follows JW formatting standards
- [ ] User approves specification for implementation
- [ ] Optional: Confluence draft created for collaboration