# GitHub Publish Steps

This project is ready to be published to your GitHub account.

## What is already prepared

- `.gitignore` has been cleaned up
- `README.md` has been added
- deployment and handoff docs are already in `docs/`

## What still needs to happen on your machine

This Codex session could not create the `.git` directory directly in this workspace, so the final Git initialization step needs to be run locally on your machine.

## Recommended repo setup

- GitHub account owner: you
- Repository visibility: `Private`
- Suggested repo name: `azoe-afh-site`
- Default branch: `main`

## Create the empty GitHub repo first

In GitHub:

1. Create a new repository
2. Name it `azoe-afh-site` or your preferred final name
3. Set it to `Private`
4. Do not add a README, `.gitignore`, or license during creation

## Then publish this folder

From the project root, run:

```bash
npm run handoff:check
chmod +x ./scripts/publish-to-github.sh
./scripts/publish-to-github.sh <your-github-repo-url> main
```

Example:

```bash
./scripts/publish-to-github.sh git@github.com:YOUR-USER/azoe-afh-site.git main
```

Or with HTTPS:

```bash
./scripts/publish-to-github.sh https://github.com/YOUR-USER/azoe-afh-site.git main
```

## After the push succeeds

1. Open the owner’s Cloudflare account
2. Create a Pages project with `Connect to Git`
3. Select this GitHub repo
4. Use:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`

## Important ownership note

This launch model intentionally uses:

- your GitHub account for the source repo
- the owner’s Cloudflare account for hosting
- the owner’s domain account for DNS and registrar ownership
