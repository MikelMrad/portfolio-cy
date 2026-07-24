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
 * @property {number} year
 * @property {string} academicContext // '2nd Year Project' | ... | 'Thesis Project'
 * @property {string} location        // 'Sodeco, Beirut'
 * @property {string[]} tools         // ['AutoCAD','Revit','Lumion']
 * @property {string[]} categories    // 1–3 chips: 'Civic','Residential','Cultural','Urban','Hospitality','Technical'
 * @property {string} summary         // one line, card + featured overlay
 * @property {string} description     // 1–2 short paragraphs, detail page '// concept'
 * @property {ProjectImage} heroImage
 * @property {ProjectImage[]} renders   // >= 5
 * @property {ProjectImage[]} drawings  // >= 2
 * @property {ProjectImage[]} [sheets]  // full-page plans (e.g. from PDFs), stacked full-width below the concept text in order
 * @property {string} [sheetsLabel]  // section heading for `sheets` (default 'plans')
 * @property {number} [sheetsColumns] // lay the sheets out N-across on md+ (default: stacked full-width)
 * @property {string|ProjectImage} [conceptImage] // image beside the concept prose: a name ('render-02','hero') or im() object; defaults to renders[0]
 * @property {(string|ProjectImage)[]} [conceptImages] // several images stacked beside the concept prose (overrides conceptImage)
 * @property {boolean} [conceptMatchHeight] // single concept image fills the column to match the text height
 * @property {boolean} [drawingsSingle] // stack the drawings gallery full-width, one per row
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
 * @property {string} href   // omit from render when unset (empty list hides the column)
 */

/**
 * @typedef {Object} SiteMeta
 * @property {string} name        // 'Cynthia Nahra'
 * @property {string} wordmark    // 'cynthia nahra.'
 * @property {string} role        // 'Junior Architect'
 * @property {string} location    // 'Beirut, Lebanon'
 * @property {string} email       // 'cynthianahra.work@gmail.com'
 * @property {string} phone       // '+961 81 726 981'
 * @property {string} education   // 'Saint-Joseph University of Beirut (USJ)'
 * @property {SocialLink[]} socials
 * @property {string[]} tools     // ToolsStrip
 */

export {};
