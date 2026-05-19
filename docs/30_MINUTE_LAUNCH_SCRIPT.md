# 30 Minute Launch Script

Use this runbook for a quick owner handoff and launch of the current streamlined AZOE site.

## Goal

Launch the static site on Cloudflare Pages and confirm visitors can contact AZOE by phone or email directly from the page.

## What the owner should have ready

- Cloudflare account access
- Domain registrar access
- Final production domain
- Business email inbox access

## Preflight

Say:

`We’ll do one quick preflight, launch the site, and then verify the phone and email contact paths.`

Checklist:

- [ ] Run `npm run handoff:check` in the project folder and confirm it passes.
- [ ] Confirm `wrangler.jsonc` has the intended Cloudflare Pages project name.
- [ ] Confirm the phone numbers and email address shown on the site are current.

## Launch path A: Connect GitHub to Cloudflare Pages

1. Open Cloudflare Pages in the owner’s account.
2. Create a new Pages project.
3. Connect the intended GitHub repository.
4. Use:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`
5. Start the first deployment.

## Launch path B: Deploy with Wrangler

From the project folder:

```bash
npm run cf:project:create
npm run cf:deploy
```

Use `npm run cf:project:create` only if the Pages project does not exist yet.

## Test the Cloudflare URL first

Do this before attaching the custom domain.

- [ ] Open the Cloudflare-provided `pages.dev` URL.
- [ ] Confirm the homepage loads.
- [ ] Confirm the logo and styling load correctly.
- [ ] Confirm the contact section renders.
- [ ] Confirm the phone links are present.
- [ ] Confirm the email link opens a compose action.

## Attach the custom domain

- [ ] Add the final domain in Cloudflare Pages.
- [ ] Add `www` too if desired.
- [ ] Confirm the intended production domain is attached before leaving the screen.

## Final production checks

- [ ] Open the final domain.
- [ ] Confirm assets load correctly.
- [ ] Confirm phone links work on desktop and mobile.
- [ ] Confirm the email link is correct.
- [ ] Confirm no part of the page references a tour request form.

## Ownership closeout

Before ending the session, confirm:

- [ ] Domain ownership is in the owner’s account.
- [ ] Cloudflare ownership is in the owner’s account.
- [ ] Business email access is in the owner’s account.
- [ ] The owner received the website ownership sheet.
