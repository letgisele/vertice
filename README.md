# Vértice

Vértice is a modern corporate landing page for a consulting and technology studio focused on business strategy, data,
automation, and AI. The project is built with Next.js, TypeScript, and Tailwind, and includes a multilingual marketing
site, dark/light theme switching, lead capture, and a product-style assistant demo.

## Overview

This app presents a consulting brand positioned around:

- Business intelligence and financial visibility
- Data strategy and SQL/data integration work
- Process automation and workflow optimization
- AI, chatbots, and agent-based solutions
- Custom web applications and internal systems

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Lucide React
- Radix UI primitives

## Features

- Multilingual experience: Portuguese, English, and Spanish
- Responsive marketing layout with sections for expertise, process, team, and CTA
- Dark/light theme toggle
- Contact form with downloadable project brief
- Assistant demo with local fallback behavior and optional external AI endpoint
- Flexible base-path support for hosted deployments under a subdirectory

## Prerequisites

- Node.js 20+ recommended
- npm

## Getting started

1. Install dependencies:

   npm install

2. Create your local environment file:

   cp .env.example .env.local

3. Update the environment variables if needed:

    - NEXT_PUBLIC_CONTACT_EMAIL: contact email used in the contact modal
    - NEXT_PUBLIC_AI_ENDPOINT: optional external HTTPS endpoint for the assistant
    - NEXT_PUBLIC_BASE_PATH: optional base path for hosting under a subdirectory

4. Run the development server:

   npm run dev

5. Open the site in your browser:

   http://127.0.0.1:3000

## Available scripts

- npm run dev
  Starts the Next.js development server.

- npm run build
  Builds the application for production.

- npm run typecheck
  Runs TypeScript validation without emitting build artifacts.

## Project structure

- app/: App routes and page layout
- components/: UI components and shared interface pieces
- lib/: content, configuration, and reusable app data
- public/: static assets such as illustrations and images
- .env.example: sample environment configuration

## Environment variables

The app reads public variables from the browser runtime. These values are intentionally kept client-safe and should
never include secrets.

- NEXT_PUBLIC_CONTACT_EMAIL
  Email address shown in the contact flow.

- NEXT_PUBLIC_AI_ENDPOINT
  Optional backend endpoint used by the AI assistant. If empty, the assistant runs using local demo responses.

- NEXT_PUBLIC_BASE_PATH
  Optional subpath when the project is served from a folder such as /vertice.

## Notes

- The assistant is implemented as a front-end experience with a local fallback, so the project runs without a backend by
  default.
- The content and professional messaging are editable in lib/content.ts and lib/config.ts.
- The brand experience is designed for a service business, but the structure can be adapted for other marketing
  products.

## License

This project is licensed under the ISC license.

