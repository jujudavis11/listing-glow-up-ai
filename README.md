# Listing Glow Up AI

A simple React/Vite lead-magnet tool for real estate agents.

## What it does

- Collects listing details: address, price, bedrooms, description
- Sends them to Claude API for a quick listing optimization analysis
- Displays actionable recommendations
- Captures the user's email after analysis
- Shows an upsell to the Pro tool

## Tech stack

- React + TypeScript
- Vite
- Tailwind CSS
- Claude API

## Setup

1. Copy `.env.example` to `.env`
2. Add your Claude API key to `.env`:

```env
VITE_CLAUDE_API_KEY=your_claude_api_key_here
```

3. Install dependencies:

```bash
npm install
```

4. Start the app:

```bash
npm run dev
```

## Notes

- The current implementation calls Claude API directly from the browser using `VITE_CLAUDE_API_KEY`.
- Do not commit your `.env` file.
- For production, move the API call into a server-side route or function to keep the key secure.
