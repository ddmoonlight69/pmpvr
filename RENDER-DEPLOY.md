# Deploying to Render

This repo includes a `render.yaml` manifest which defines two services:

- `pmpvr-api` — a Docker web service built from `api/Dockerfile` (listens on port 4000)
- `pmpvr-site` — a Static Site that publishes the `site/` folder

Steps:

1. Login to Render and create a new service using "Create from Manifest" and select this repository.
2. Confirm the services and branch (main). Render will create and deploy the services described in `render.yaml`.
3. After deployment, note the API URL and update `site/app.js` to point to the production endpoints.
