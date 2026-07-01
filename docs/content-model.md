# Content Model — data shapes & locations

No CMS. All content is local JS modules under `src/content/`. JavaScript project → shapes are documented as **JSDoc typedefs** in `src/content/types.js` and enforced by review, not a compiler.

## File layout
```
src/content/
  site.js            // SiteMeta (identity, contact, socials, tools)
  capabilities.js    // Capability[]
  projects.js        // Project[]  (single source of truth, ordered 01→08)
  i18n/
    index.js         // t() helper + LOCALE constant ('en')
    en.js            // all UI strings (nav, home sections, forms, footer, 404)
public/images/
  projects/{slug}/hero.jpg|svg, render-01..NN, drawing-01..NN
  about/portrait.jpg|svg, preview.jpg|svg
  home/belief.jpg|svg
```

## Typedefs (`src/content/types.js`)
```js
/**
 * @typedef {Object} ProjectImage
 * @property {string} src        // e.g. '/images/projects/student-dorms/render-01.svg'
 * @property {number} width
 * @property {number} height
 * @property {string} alt        // required, descriptive — never empty
 * @property {string} [caption]
 */

/**
 * @typedef {Object} Project
 * @property {string} slug           // kebab-case, stable, used in routes
 * @property {string} number         // '01'..'08' display index
 * @property {string} title
 * @property {number} year           // TODO:confirm-years
 * @property {string} academicContext // '2nd Year Project' | ... | 'Thesis Project'
 * @property {string} location       // 'Sodeco, Beirut'
 * @property {string[]} tools        // ['AutoCAD','Revit','Lumion']
 * @property {string[]} categories   // 1–3 chips: 'Civic','Residential','Cultural','Urban','Hospitality','Technical'
 * @property {string} summary        // one line, card + featured overlay
 * @property {string} description    // 1–2 short paragraphs, detail page '// concept'
 * @property {ProjectImage} heroImage
 * @property {ProjectImage[]} renders   // >= 5
 * @property {ProjectImage[]} drawings  // >= 2
 * @property {boolean} featured
 * @property {boolean} [latest]      // exactly one project: hero mini-card target
 * @property {string} [relatedSlug]  // e.g. execution-drawings <-> convention-center
 */

/**
 * @typedef {Object} Capability
 * @property {string} index  // '01'..'04'
 * @property {string} title
 * @property {string} blurb  // one line
 */

/**
 * @typedef {Object} SocialLink
 * @property {string} label  // 'LinkedIn'
 * @property {string} href   // TODO until confirmed — omit from render if href === '#'
 */

/**
 * @typedef {Object} SiteMeta
 * @property {string} name        // 'Cynthia Nahra'
 * @property {string} wordmark    // 'cynthia nahra.'
 * @property {string} role        // 'Junior Architect'
 * @property {string} location    // 'Beirut, Lebanon'
 * @property {string} email       // 'cynthianohra11@gmail.com' TODO:confirm-email-spelling
 * @property {string} phone       // '+961 81 726 981'
 * @property {string} education   // 'USJ — ESAR' TODO:confirm-school-label
 * @property {SocialLink[]} socials
 * @property {string[]} tools     // ToolsStrip
 */
```

## Filled example — one real Project entry
```js
{
  slug: 'municipality-of-beirut',
  number: '02',
  title: 'Municipality of Beirut',
  year: 2023, // TODO:confirm-years
  academicContext: '3rd Year Project',
  location: 'Sodeco, Beirut',
  tools: ['SketchUp', 'AutoCAD', 'Lumion'],
  categories: ['Civic', 'Urban'],
  summary: 'A closed civic block carved open into an interactive public space for Sodeco.',
  description:
    'The project reimagines the municipality as an open, interactive civic tool — one that serves administrative functions while fostering community engagement and connection to the city. By carving space out of a solid, inward-facing mass, the building opens toward the main street; internal courtyards and pathways emerge as green, social gathering areas that are visually and physically connected to the city.\n\nThe architecture mirrors the project\u2019s goal: drawing people inward, encouraging them to participate, gather and interact. The municipality becomes a bridge between people and place.',
  heroImage: { src: '/images/projects/municipality-of-beirut/hero.svg', width: 1920, height: 1080, alt: 'TODO: exterior render of the Municipality of Beirut in Sodeco' },
  renders: [ /* 5+ ProjectImage */ ],
  drawings: [ /* 2+ ProjectImage — plans, elevations, sections */ ],
  featured: true,
  latest: false,
}
```

## i18n rule
Every user-visible UI string (nav labels, section headings that aren't content, form labels/errors, footer, 404) comes from `en.js` via `t('nav.projects')`. **Project/capability content itself stays in its content files** (content ≠ chrome). `LOCALE` is a constant `'en'`; adding FR later means adding `fr.js` and a locale mechanism — nothing in the UI references FR today.

## Editing rules for Claude Code
- Never invent facts: unknown copy = `TODO:` string rendered verbatim (visible on the page and greppable), and logged in `docs/progress.md`.
- Adding a project: append to `projects.js`, create image folder, run `npm run placeholders` if images missing. Order in the array = display order.
