# Ali1_Visuals | Cinematic Photography Portfolio 📸

A high-performance, editorial-grade photography portfolio built for **Asad Alibhai**. This project showcases a blend of automotive, sports, and portrait photography, engineered with a focus on **speed**, **accessibility**, and **seamless content management**.

---

## Performance Snapshot
Optimized for the modern web, achieving near-instant load times through strategic asset management.

* **First Contentful Paint (FCP):** 0.6s.
* **Largest Contentful Paint (LCP):** 0.6s.
* **Speed Index:** 0.6s.
* **Cumulative Layout Shift (CLS):** 0.
* **SEO Score:** 92.

---

## Innovative Features

### Cloudinary-Powered Asset Pipeline
The website utilizes a sophisticated Cloudinary integration to handle high-resolution raw assets without compromising performance.
* **Auto-Optimization:** Every image is served in modern **WebP/AVIF** formats via `f_auto` and `q_auto`.
* **Dynamic Resizing:** Images are dynamically scaled to match the user's viewport, preventing the delivery of over-sized files.
* **Fetch Prioritization:** Critical hero assets use `fetchpriority="high"` to ensure the "Largest Contentful Paint" happens as early as possible.

### Headless CMS & Sanity Admin Page
Designed as a "Data Coordinator" for the photographer, the custom Sanity Admin panel allows for effortless gallery updates.
* **Sanity + Cloudinary Sync:** Asad can browse his Cloudinary library directly within Sanity, picking photos and assigning categories like "Automotive" or "Sports".
* **On-Demand Rendering:** Built with `output: 'server'`, the site reflects CMS changes instantly without requiring a code redeploy.

### Liquid UX & Custom Lightbox
A custom, SPA-safe Lightbox component built to handle Astro’s **View Transitions**.
* **Staggered Animations:** Mobile navigation utilizes a CSS Grid-based staggered reveal for a "liquid" editorial feel.
* **Touch-Optimized:** Full swipe gesture support and keyboard navigation (Esc, Arrows) for a high-end desktop experience.

---

## Architectural Principles

### 1. Zero-JS by Default (Astro)
Chosen for its "Islands Architecture," Astro ensures that the portfolio remains incredibly lightweight. JavaScript is only shipped for the Lightbox and Mobile Nav components, keeping the main thread clear for content rendering.

### 2. Atomic Design with Tailwind 4
The styling follows a strict "Utility-First" approach using **Tailwind 4**.
* **Mobile-First Scaling:** Typography and layouts are defined for vertical displays first, then expanded for ultra-wide monitors.
* **Design System:** A cohesive palette centered around `obsidian` and `brand-gold` creates a premium, boutique aesthetic.

### 3. SEO-Driven Metadata
* **Dynamic Meta Tags:** Every category page generates unique OpenGraph and meta descriptions to improve search visibility.
* **Semantic HTML:** Strict adherence to semantic tags ensures a perfect score in Lighthouse Accessibility and Best Practices.

---

## Tech Stack
* **Framework:** Astro 5.0 (Server-side Rendering)
* **CMS:** Sanity.io (Headless)
* **Media:** Cloudinary (Dynamic CDN)
* **Styling:** Tailwind CSS 4
* **Deployment:** Vercel

---

## Contact & Inquiry System
The site features a secure contact form integrated with **Resend** for professional email delivery.
* **API-First:** Submissions are handled via Astro API routes.
* **UX-Focused:** Real-time validation and success/error micro-interactions for a seamless user journey.

---

## API and Contact Form Details

The contact form submits a `POST` request to `/api/send-email` using `FormData`.

Request fields:

* `name` (required)
* `email` (required)
* `category` (optional, defaults to user-selected subject)
* `message` (required)

Response behavior:

* `200` with `{ "message": "Success" }` when the email is sent successfully.
* `200` with `{ "message": "Dry run success (no email sent)" }` when `EMAIL_DRY_RUN=true`.
* `500` with `{ "error": "Forced failure for testing" }` when `EMAIL_FORCE_FAIL=true`.
* `500` with `{ "error": "Failed to send" }` for provider or server failures.

Environment variables used by the endpoint:

* `RESEND_API_KEY` for Resend authentication.
* `EMAIL_DRY_RUN` to test success UI without sending an email.
* `EMAIL_FORCE_FAIL` to test error UI and fallback behavior.

---

## CMS Workflow (Sanity + Cloudinary)

This workflow is used to add or update gallery images from the Sanity Admin Page, which serves as a "Data Coordinator" for the photographer:

1. Open the Sanity Admin Page and go to **Gallery Photos**.
2. Create a new photo document or open an existing one.
3. Set **Photo Title** (used for display and alt text).
4. Set **Display Order** (lower numbers appear first).
5. Select a **Cloudinary Image** using the Cloudinary picker.
6. Choose a **Category**: portraits, nature, automotive, or sports.
7. Toggle **Featured on Homepage?** as needed.
8. Publish the document.
9. Reload the site to verify category pages and homepage ordering.

Notes:

* Category pages are generated from CMS data, and records are fetched in ascending `order`.
* Because the site runs with server output, published CMS changes are reflected without a full redeploy.

---

**Designed & Developed by Muhammad Taha**