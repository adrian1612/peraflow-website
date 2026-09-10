# PeraFlow Website

The official PeraFlow landing page: an Android personal-finance cashbook with useful free tracking and optional Premium. Plain HTML, CSS, and small progressive-enhancement JavaScript; GitHub Pages serves the repository root with no production build or dependencies.

## Design and content

The navy (`#17233c`) and emerald (`#16845b`) identity carries through a product-led hero, an asymmetric feature showcase, a three-step introduction, financial visibility, backup/privacy, Free and Premium, FAQ, and an honest pre-launch CTA.

The Summary illustration retains the existing account-card structure and uses explicitly labeled sample amounts. Other financial examples are illustrations, not screenshots or product usage statistics. The page does not imply that PeraFlow connects to banks or moves real money.

## Files

- `index.html`: semantic page content, icons, SEO/Open Graph text metadata, real assets, and default Coming Soon state.
- `brand.css`: shared colors, typography, and design tokens.
- `styles.css`: layout, components, responsive rules, focus states, and reduced-motion support.
- `script.js`: mobile navigation, current year, and the centralized future Google Play link.
- `assets/`: optimized official images and favicon.
- `package.json` and `tools/preview.mjs`: optional dependency-free development preview. Neither is required by GitHub Pages.

## Official assets

Reviewed all three source images in Google Drive, `Projects / PeraFlow / Resources`:

| Source | Website use |
| --- | --- |
| `appicon-peraflow.png` | Optimized 256 × 256 WebP in the navigation, final CTA, and footer; 64 × 64 PNG favicon. |
| `banner-peraflow.png` | Optimized 1600 × 783 WebP showing the official Summary and Transactions artwork. |
| `splash.png` | Reviewed; omitted because it repeats branding without adding product information. |

The source designs are preserved; only image size and encoding were optimized. Original files remain in Drive. Explicit image dimensions reserve layout space; below-the-fold artwork is lazy-loaded. The page has no analytics, third-party scripts, embedded video, or runtime libraries. Inter is loaded from Google Fonts with a system-font fallback and `display=swap`.

No social-sharing image was generated. Open Graph and Twitter metadata currently provide the page title and description.

## Preview and maintenance

Requires Node.js 18 or later only for the optional local preview:

```sh
npm run dev
```

Open the local URL printed by the command. The server accepts `--host`, `--port`, and `--strictPort` for supervised preview environments. `http://localhost:4173/__review` is an optional local-only responsive review surface with 320, 390, 768, 1024, and 1440-pixel frames. It is not a route on GitHub Pages.

Alternatively, serve the root using any static HTTP server. No installation is needed. Edit brand tokens in `brand.css` and keep layout rules in `styles.css`.

Accessibility includes a skip link, one main landmark, named sections, visible keyboard focus, a mobile disclosure menu with Escape support, and native FAQ disclosure controls. Navigation and FAQ content remain usable without JavaScript. Motion is limited to a brief hero entrance and control feedback; reduced-motion preferences disable both and smooth scrolling.

## Google Play launch

**The app is not publicly available. Keep `PLAY_STORE_URL` empty until the public listing is verified.**

When the listing is public:

1. Set `PLAY_STORE_URL` in `script.js` to the actual Google Play URL. The script checks for HTTPS, `play.google.com/store/apps/details`, and the PeraFlow package ID. It then updates the header, hero, final download CTA, launch description, and availability FAQ.
2. Update the static HTML CTA fallbacks and launch text so visitors with JavaScript disabled also receive the public link. Update the description, Open Graph, and Twitter metadata to remove Coming Soon wording.
3. Replace or supplement illustrative previews with current screenshots from the released app; review the artwork caption at that time.
4. Verify the download link on an Android device and check the latest in-app Free/Premium entitlements. Keep prices localized through Google Play rather than hardcoding amounts.

No Play Store URL, release date, user counts, ratings, testimonials, awards, or localized prices are invented.

## Scope and hosting

Designed for GitHub Pages from `main`, repository root. Keep this privacy-policy destination:

https://adrian1612.github.io/peraflow-privacy/

This website work does not require changes to the Android application, `peraflow-privacy`, Google Play Console, or AdMob. Publishing the website does not submit an app release.
