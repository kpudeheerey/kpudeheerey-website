# kpudeheerey.ca

Website for **@kpu_de_heerey**, live at https://kpudeheerey.ca. It's a plain static site with no build step. Netlify publishes whatever is on the `main` branch.

## Files

| Path | What it is |
| --- | --- |
| `index.html` | Homepage. Sections, top to bottom: hero, feed, reach, send it in, advertise, hiring, corrections, footer. |
| `privacy.html` | Privacy page, served at `/privacy`. |
| `thank-you.html` | Page people see after sending any form. |
| `404.html` | Page shown for a broken link. |
| `assets/site.css` | All the styling. Colours and fonts are set at the top, in `:root`. |
| `assets/site.js` | The moving red ribbons, scroll reveals, the number count-up and the phone menu. |
| `assets/feed/` | The six posts shown under "Fresh off the feed" (760×950 JPG). |
| `assets/og.jpg` | The preview image that shows when the link is shared (1200×630). |
| `netlify.toml` | Netlify settings: sends www to the main address, adds security headers and caches fonts. |

## Forms (Netlify Forms)

There are three forms: `send-it-in`, `advertise` and `corrections`. Submissions show up in Netlify under **Forms**.

- For Netlify to see the forms, form detection has to be switched on: **Project configuration → Forms → Enable form detection**. After that, redeploy once.
- File uploads are limited to 8 MB, so the form also asks for a link for bigger videos.
- Email alerts are set under **Forms → Form notifications**.

## Making changes

Ask Claude for the change. Claude edits these files and pushes to `main`, and Netlify publishes the new version in about a minute.

## Rules for content on this site

- Black and KPU red (#DE0A0A) only. No yellow.
- Don't use the word "news".
- Fact-check before anything goes up.
- Paid posts are labelled as paid partnerships.
- Hiring ads must be open to everyone.
