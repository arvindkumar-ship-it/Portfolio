# Arvind Kumar — Portfolio

Final minimal portfolio built with Next.js App Router, React and TypeScript. Includes project cards, 12 individual project case studies, Medium articles, recognition, skills, light/dark themes and contact form.

## Run locally

Requires Node.js 20 or newer.

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

## Production

```bash
npm run build
npm run start
```

The Next.js build output is configured as `.next-build`. Deploy as a Next.js application; project detail pages are statically generated.

## Edit content

- `lib/data.ts`: projects, metrics, scope, skills, recognition and social links.
- `lib/articles.ts`: Medium profile and published article links. The AIAA article is included.
- `public/projects/`: real project screenshots. Set each project's `image` path in `lib/data.ts`.
- `public/arvind_portfolio.png`: profile photograph.

Three project screenshots are included. The remaining nine display a labelled preview placeholder until screenshots are added. No fabricated project screenshots or article metadata are included.

Contact uses the existing Formspree endpoint in `components/ContactDrawer.tsx`; confirm that endpoint belongs to your account before deploying. The form has not been submitted during verification.

Typography uses Manrope and DM Sans with system fallbacks. The layout supports mobile screens, keyboard focus and reduced motion. `/preview` redirects to the final homepage.

## Validation

Production build and TypeScript checks pass. Dependencies and generated build output are excluded from the source ZIP; install them with `npm ci`.
