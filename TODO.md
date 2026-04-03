# Performance Optimization TODO - Fix Vercel Slow First Load

## Plan Breakdown (Approved by User)
1. **[x] Update next.config.js** - Added SWC minify, poweredByHeader:false, trailingSlash, experimental flags (optimizeCss etc.), headers for caching (images 1y), images: formats(WebP/AVIF), deviceSizes/imageSizes. ✅
2. **[x] Optimize src/app/layout.jsx** - Added preconnect (Cloudinary, Google Fonts), preload Open Sans CSS. ✅ Reduces FCP.
3. **[x] Optimize src/app/page.jsx** - Added sizes/priority to key images, replaced 6 autoplay MP4 (~40MB) with WebP posters + play overlay. Major TTI/LCP win. ✅
4. **[x] Fixed next.config.js** - Next.js 15.5 compat (removed deprecated, bundlePagesRouterDependencies). ✅
5. **[ ] Run image-optimizer.js** - Convert all public JPG/PNG->WebP, generate video posters.
6. **[ ] Bundle analyzer** - Add/test analyzer, audit deps.
7. **[ ] Test build** - `npm run build`, analyze sizes, Lighthouse.
8. **[ ] Vercel deploy & verify** - Redeploy, test cold load in incognito.

## Progress Tracking
- Start: All pending.

Next step after each: Update this file with [x] and notes.

