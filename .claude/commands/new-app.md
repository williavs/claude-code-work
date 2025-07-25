# /new-app - Integrate New Streamlit App into Deployment Pipeline

This command automates the integration of a new Streamlit application into the AI Sandbox deployment pipeline.

## Usage
```
/new-app "app-name"
```

## Prerequisites
- Application code already copied to repository root (e.g., `ai-sandbox/app-name/`)
- Application uses Python 3.11 with `requirements.txt`
- Streamlit app configured to serve on port 8501

## Pre-flight Checks

Before proceeding, I'll confirm:

1. **Dockerfile Status**
   - Does your app directory already have a Dockerfile?
   - If not, I'll copy one from an existing app

2. **Secrets Requirements**
   - Does your app require any new secrets/environment variables?
   - These will need to be configured separately with the platform team

3. **Naming Confirmation**
   - App name: `{{APP_NAME}}`
   - Directory: `{{APP_NAME}}/`
   - URL: `{{APP_NAME}}.nonprod.vibe.justworks.com`
   - Helm release: `{{APP_NAME}}`

## Automated Steps

Once confirmed, I will:

### 1. Dockerfile Setup (if needed)
```bash
cp gtm-scrape-1/Dockerfile {{APP_NAME}}/Dockerfile
```
Then modify ENTRYPOINT to match your main script

### 2. Create Helm Chart
```bash
cp -r helm/gtm_scrape helm/{{APP_NAME_UNDERSCORE}}
```

Then modify:
- `helm/{{APP_NAME_UNDERSCORE}}/Chart.yaml`:
  - name: `{{APP_NAME}}`
  - description: Updated for new app
  - alias: `{{APP_NAME}}`

- `helm/{{APP_NAME_UNDERSCORE}}/values.yaml`:
  - Replace top-level key from `gtm-scrape:` to `{{APP_NAME}}:`
  - nameOverride: `{{APP_NAME}}`
  - fullnameOverride: `{{APP_NAME}}`
  - service.name: `{{APP_NAME}}`
  - backend.service.name: `{{APP_NAME}}`
  - hosts: `- {{APP_NAME}}.nonprod.vibe.justworks.com`
  - datadog.service: `{{APP_NAME}}`
  - Add required resources block:
    ```yaml
    resources:
      requests:
        memory: "256Mi"
        cpu: "100m"
      limits:
        memory: "512Mi"
        cpu: "200m"
    ```
  - Add required TLS block:
    ```yaml
    tls:
      - hosts:
          - {{APP_NAME}}.nonprod.vibe.justworks.com
        secretName: {{APP_NAME}}-tls
    ```

### 3. Update CircleCI Config
Duplicate and modify three jobs in `.circleci/config.yml`:

- `build-image-{{APP_NAME_UNDERSCORE}}`:
  - context: `./{{APP_NAME}}`
  - tag-override: `${CIRCLE_SHA1}-{{APP_NAME}}`
  
- `helm-lint-nonprod-{{APP_NAME_UNDERSCORE}}`:
  - Update paths to `./helm/{{APP_NAME_UNDERSCORE}}`
  - Set parameter: `--set {{APP_NAME}}.image.tag=${CIRCLE_SHA1}-{{APP_NAME}}`

- `helm-release-nonprod-{{APP_NAME_UNDERSCORE}}`:
  - chart: `./helm/{{APP_NAME_UNDERSCORE}}`
  - release-name: `{{APP_NAME}}`
  - values-to-override: `{{APP_NAME}}.image.tag=${CIRCLE_SHA1}-{{APP_NAME}}`

Add to workflow with proper dependencies.

### 4. Git Staging Instructions
After completion, stage all changes:
```bash
git add {{APP_NAME}}/
git add helm/{{APP_NAME_UNDERSCORE}}/
git add .circleci/config.yml
git commit -m "feat: Add {{APP_NAME}} application, Helm chart, and CI pipeline"
```

## Post-Integration Steps
1. Push changes to trigger CI/CD pipeline
2. Monitor CircleCI for successful deployment
3. Access app at `https://{{APP_NAME}}.nonprod.vibe.justworks.com`
4. Contact platform team if TLS secret needs creation

## Notes
- App name will be normalized (lowercase, hyphens for spaces)
- Underscore version used for file paths where needed
- All existing app references will be replaced with new app name