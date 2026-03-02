<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/f842473a-6eff-425e-a47f-cc6e956b65a6

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Demo Enhancements (Roadshow)

- AI assistant upgraded from fixed Q&A to intent-based conversation flow (GP, Sick Note, emergency, progress, benefits).
- Booking flow now creates request numbers and writes to shared demo state.
- Academic documents page now syncs with booking requests and supports status refresh + export.
- Invite code login, FAQ search, and support/contact actions are now interactive for live demos.

### Demo reset

This app stores demo state in browser localStorage key: `yuntu-demo-state-v1`.
If you need a clean demo run, clear this key in DevTools and refresh.
