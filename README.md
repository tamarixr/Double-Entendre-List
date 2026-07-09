# Deploying the Demon List to Vercel

Your original file used `window.storage`, an API that only exists inside
Claude.ai's artifact preview — it doesn't exist on a real website. This
project swaps that out for a tiny serverless API (`/api/storage.js`) backed
by **Vercel KV**, so the site keeps working exactly the same, but the data
(demons, players, submissions, settings) is now stored in a real,
shared database that every visitor sees.

## File list

```
demon-list-vercel/
├── public/
│   └── index.html      # your site, with window.storage calls replaced by fetch()
├── api/
│   └── storage.js       # serverless function: GET/POST to Vercel KV
├── package.json          # declares the @vercel/kv dependency
├── vercel.json           # minor routing config
└── README.md
```

## Steps to go live

1. **Push this folder to a GitHub repo** (or drag-and-drop deploy via the
   Vercel dashboard / `vercel` CLI — either works).

2. **Import the repo in Vercel** (vercel.com → Add New → Project).
   Framework preset: leave as "Other" — no build step is needed.

3. **Attach a KV store** (one-time, free tier available):
   - In your Vercel project → **Storage** tab → **Create Database** → **KV**.
   - Vercel automatically injects the required env vars
     (`KV_REST_API_URL`, `KV_REST_API_TOKEN`, etc.) into your project —
     you don't need to copy anything manually.

4. **Deploy.** Your site will be live at `your-project.vercel.app`.

That's it — no other backend, database signup, or config is required.

## Notes on the existing "auth"

The admin logins (`tamari` / `hakku`) are still hardcoded in `index.html`
with a reversed-base64 obfuscated password, exactly as in your original
file. This is **not real security** — anyone who views source can recover
the credentials. It was fine as a private artifact; on a public URL,
anyone can find and use it. If this list is going to be public, I'd
recommend moving admin auth into a real server-side check (e.g. a
password verified inside `api/storage.js` or a dedicated `api/login.js`,
using an environment variable for the actual password) rather than
anything shipped in the client-side HTML. Happy to build that out if
you want it.

## Local testing

```bash
npm install -g vercel
cd demon-list-vercel
vercel dev
```

This runs the static file + the `/api/storage` function locally with the
same routing Vercel uses in production.
