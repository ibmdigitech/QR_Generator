# QR Certificate Generator V2

A browser-only React + Vite + TypeScript app that generates a printable certificate and a QR code containing the certificate data as plain text.

## Setup

1. `npm install`
2. `npm run dev`

## Build

- `npm run build`
- `npm run preview`

## Vercel Deployment

1. Push the project to GitHub.
2. Go to https://vercel.com and log in.
3. Create a new project and connect your GitHub repository.
4. Set the framework preset to "Vite" if prompted.
5. Use these settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Deploy.

If you need a custom domain, configure it in the Vercel dashboard.

## Features

- Certificate data entered in form
- QR contains plain certificate text only
- Print / save certificate PDF
- Web Share API with fallback copy
- QR debug preview and copy
- Local state stored in `localStorage`
- Responsive layout and print styling
