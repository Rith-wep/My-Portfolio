# Animated Portfolio

A React and Vite portfolio configured for deployment on Vercel.

## Local development

Use Node.js 22, then install dependencies and start Vite:

```bash
npm ci
npm run dev
```

Create a production build with:

```bash
npm run build
```

The generated site is written to `dist/`.

## Deploy to Vercel

The repository includes a `vercel.json` file that selects the Vite preset, runs the production build, and publishes `dist/`.

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. In the Vercel dashboard, choose **Add New > Project**.
3. Import the repository and click **Deploy**.

Vercel detects Vite automatically. Each push to the production branch creates a production deployment, while other branches and pull requests receive preview deployments.

You can also deploy from the project directory with the Vercel CLI:

```bash
npx vercel
npx vercel --prod
```

Any Vite environment variables must begin with `VITE_`. They are embedded in the browser bundle during the build, so do not put secrets in them.
