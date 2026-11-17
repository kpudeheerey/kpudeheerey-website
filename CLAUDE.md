# kpudeheerey.ca: notes for Claude

This is the website for the Instagram page @kpu_de_heerey. The owner, Anshul, asks for changes in plain words. He is not technical, so make each change yourself, push it, and tell him in one or two sentences what changed.

## How publishing works
- GitHub repo: kpudeheerey/kpudeheerey-website. Netlify project: `kpudeheerey`, in the KPU Netlify team (kpudeheerey@gmail.com).
- Every push to `main` publishes the site in about a minute. There's no build step: Netlify publishes the repo root as-is.
- Before pushing, check the page at 1440px and 390px wide (Playwright screenshots). The page must not scroll sideways on a phone.

## Design rules
- Background #060606. KPU red is #DE0A0A, with #FF3D3D for glows. **Never use yellow.**
- Fonts are self-hosted in `assets/fonts`: Poppins (body), Instrument Serif italic (the `<em>` words in headings), JetBrains Mono (small labels).
- Never use the word "news" anywhere on the site.
- Fact-check anything new before it goes up. Hiring ads must be open to everyone (BC Human Rights Code).
- Only use graphics the page made itself. Don't use other people's photos or video stills.

## Forms
Netlify Forms handles three forms: `send-it-in` (with file upload, 8 MB limit), `advertise` and `corrections`. If you add a form, give it `data-netlify="true"`, the honeypot field, and `action="/thank-you"`.

## Prices shown on the site (CAD)
Story $50 · 4-story pack $150 · Reel or post $150. Change them only when Anshul says so.
