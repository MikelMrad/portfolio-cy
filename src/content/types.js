// Content shapes for the portfolio. No CMS — all content is local JS modules.
// JavaScript project → shapes are documented as JSDoc typedefs and enforced by review.

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
 * @property {string} slug            // kebab-case, stable, used in routes
 * @property {string} number          // '01'..'08' display index
 * @property {string} title
 * @property {number} year            // TODO:confirm-years
 * @property {string} academicContext // '2nd Year Project' | ... | 'Thesis Project'
 * @property {string} location        // 'Sodeco, Beirut'
 * @property {string[]} tools         // ['AutoCAD','Revit','Lumion']
 * @property {string[]} categories    // 1–3 chips: 'Civic','Residential','Cultural','Urban','Hospitality','Technical'
 * @property {string} summary         // one line, card + featured overlay
 * @property {string} description     // 1–2 short paragraphs, detail page '// concept'
 * @property {ProjectImage} heroImage
 * @property {ProjectImage[]} renders   // >= 5
 * @property {ProjectImage[]} drawings  // >= 2
 * @property {boolean} featured
 * @property {boolean} [latest]       // exactly one project: hero mini-card target
 * @property {string} [relatedSlug]   // e.g. execution-drawings <-> convention-center
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

export {};
