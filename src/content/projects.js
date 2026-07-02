// Projects — single source of truth, ordered 01→08.
// Descriptions are cleaned from the owner's portfolio PDF and are ground-truth content.
// Shapes: see src/content/types.js. Array order = display order.

const img = (slug, name, w, h, alt) => ({
  src: `/images/projects/${slug}/${name}.svg`,
  width: w,
  height: h,
  alt,
});

const renders = (slug, n) =>
  Array.from({ length: n }, (_, i) =>
    img(slug, `render-${String(i + 1).padStart(2, '0')}`, 1920, 1080, `TODO: render ${i + 1} — ${slug}`)
  );

const drawings = (slug, n) =>
  Array.from({ length: n }, (_, i) =>
    img(slug, `drawing-${String(i + 1).padStart(2, '0')}`, 1600, 1200, `TODO: drawing ${i + 1} — ${slug}`)
  );

// execution-drawings is a technical set — both galleries are 4:3 (1600×1200) drawing-type
// boards. Keep render-NN filenames (so the two galleries never collide on disk) but override
// the ratio to 1600×1200 per prompt 01 ("keep ratio 1600×1200 via drawings() for BOTH arrays").
const boards = (slug, n) => renders(slug, n).map((im) => ({ ...im, width: 1600, height: 1200 }));

const hero = (slug, title) => img(slug, 'hero', 1920, 1080, `TODO: hero — ${title}`);

/** @type {import('./types').Project[]} */
export const projects = [
  {
    slug: 'student-dorms',
    number: '01',
    title: 'Student Dorms',
    year: 2022, // TODO:confirm-years
    academicContext: '2nd Year Project',
    location: 'Mansourieh, Lebanon',
    tools: ['SketchUp', 'Revit', 'Lumion'],
    categories: ['Residential', 'Education'],
    summary: 'Student housing terraced into a hillside, balancing collective life with private retreat.',
    description:
      'Sited on a slope in Mansourieh, the residence is distributed across multiple levels that follow the natural terrain, each level carrying its own connected program — public dining, open green spaces, shared study rooms.\n\nIndividual rooms are oriented to draw natural light without compromising the intimacy and quiet needed for rest, holding a careful balance between openness and seclusion so students can relax, focus and feel at home.',
    heroImage: hero('student-dorms', 'Student Dorms'),
    renders: renders('student-dorms', 5),
    drawings: drawings('student-dorms', 3),
    featured: false,
  },
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
      'The project reimagines the municipality as an open, interactive civic tool — one that serves administrative functions while fostering community engagement and connection to the city. By carving space out of a solid, inward-facing mass, the building opens toward the main street; internal courtyards and pathways emerge as green, social gathering areas that are visually and physically connected to the city.\n\nThe architecture mirrors the project’s goal: drawing people inward, encouraging them to participate, gather and interact. The municipality becomes a bridge between people and place.',
    heroImage: hero('municipality-of-beirut', 'Municipality of Beirut'),
    renders: renders('municipality-of-beirut', 5),
    drawings: drawings('municipality-of-beirut', 3),
    featured: true,
  },
  {
    slug: 'convention-center',
    number: '03',
    title: 'Convention Center',
    year: 2023, // TODO:confirm-years
    academicContext: '3rd Year Project',
    location: 'Sodeco, Beirut',
    tools: ['AutoCAD', 'Revit', 'Lumion'],
    categories: ['Civic', 'Hospitality'],
    summary: 'A hybrid convention center and boutique hotel in dialogue with Beit Beirut.',
    description:
      'Positioned between two contrasting streets near the historically significant Beit Barakat — Beit Beirut — the project answers each edge in kind: a boutique hotel sits along the quieter, residential Monot side as a retreat, while the convention center opens toward active Sodeco street for accessibility, visibility and public engagement.\n\nAt the heart of the project, a green communal space weaves the two programs together and holds a visual and spatial dialogue with Beit Beirut — a mediator between past and present, calm and activity, private and public.',
    heroImage: hero('convention-center', 'Convention Center'),
    renders: renders('convention-center', 5),
    drawings: drawings('convention-center', 3),
    featured: false,
    relatedSlug: 'execution-drawings',
  },
  {
    slug: 'affordable-housing',
    number: '04',
    title: 'Affordable Housing',
    year: 2024, // TODO:confirm-years
    academicContext: '4th Year Project',
    location: 'Adlieh, Beirut',
    tools: ['AutoCAD', 'Revit', 'Lumion'],
    categories: ['Residential'],
    summary: 'Corridor-free modular housing for Adlieh’s working population, built from a 4×4 m unit.',
    description:
      'Starting from a modular 4×4 m room as the core building block, the plans are reconfigured to eliminate corridors entirely, giving each apartment an open, interconnected and more generous layout while minimizing construction cost. Three unit models — a two-bedroom, a one-bedroom studio and a duplex — stack with alternating balcony orientations and studied window placements to preserve domestic intimacy.\n\nThe ground floor carries the daily needs of residents: a supermarket, a pharmacy, a gym, a restaurant, a common lobby and shared green outdoor space.',
    heroImage: hero('affordable-housing', 'Affordable Housing'),
    renders: renders('affordable-housing', 5),
    drawings: drawings('affordable-housing', 3),
    featured: false,
  },
  {
    slug: 'temporary-theatre',
    number: '05',
    title: 'Temporary Theatre',
    year: 2024, // TODO:confirm-years
    academicContext: '4th Year Project',
    location: 'Beit Al Shams, Sharjah, UAE',
    tools: ['AutoCAD', 'Revit', 'Lumion'],
    categories: ['Cultural', 'Temporary'],
    summary: 'A demountable wood-and-fabric theatre, assembled and dismantled within three days.',
    description:
      'Built from a 2×2 m modular unit in wood and fabric, the theatre is joined mechanically using traditional mortise-and-tenon connections — light to handle, fast to raise, and gentle on the heritage courtyard of Beit Al Shams that it inhabits.\n\nThe units rearrange into multiple spatial prototypes, letting performers adapt the space to each piece, while a pathway of base modules ties the new structure back to the original house, integrating the theatre visually and functionally within its context.',
    heroImage: hero('temporary-theatre', 'Temporary Theatre'),
    renders: renders('temporary-theatre', 5),
    drawings: drawings('temporary-theatre', 3),
    featured: true,
  },
  {
    slug: 'municipality-of-nabatieh',
    number: '06',
    title: 'Municipality of Nabatieh',
    year: 2024, // TODO:confirm-years
    academicContext: '4th Year Project',
    location: 'Nabatieh, Lebanon',
    tools: ['AutoCAD', 'Revit', 'Lumion', 'Photoshop'],
    categories: ['Civic', 'Urban'],
    summary: 'A post-war municipality re-anchored in the urban fabric, rebuilding trust between a city and its people.',
    description:
      'After destruction severed the bond between a neighborhood and its institutions, this project treats architecture as a tool of rapprochement rather than simple reconstruction. The new municipality is blended into the life of the quarter — accessible, visible, human — no longer closed or isolated.\n\nPublic spaces are designed for exchange, transparency and inclusion, with housing woven around the civic core as the active climate of a new dialogue between the spatial and the social: a renewed sense of belonging.',
    heroImage: hero('municipality-of-nabatieh', 'Municipality of Nabatieh'),
    renders: renders('municipality-of-nabatieh', 5),
    drawings: drawings('municipality-of-nabatieh', 3),
    featured: false,
  },
  {
    slug: 'execution-drawings',
    number: '07',
    title: 'Execution Drawings',
    year: 2023, // TODO:confirm-years
    academicContext: '3rd Year Project',
    location: 'Sodeco, Beirut',
    tools: ['AutoCAD'],
    categories: ['Technical'],
    summary: 'Execution package for the Sodeco Convention Center — stairs, wall sections and wet-area details at 1/20.',
    description:
      'A full execution set developed from the Convention Center project: stair details, detailed wall sections from foundation to parapet, and toilet-block details drawn at 1/20 — with complete material call-outs covering waterproofing, thermal insulation, curtain-wall fixings and finish build-ups.',
    heroImage: hero('execution-drawings', 'Execution Drawings'),
    renders: boards('execution-drawings', 5), // 4:3 drawing-type boards (see boards() above)
    drawings: drawings('execution-drawings', 4),
    featured: false,
    relatedSlug: 'convention-center',
  },
  {
    slug: 'opera-de-beyrouth',
    number: '08',
    title: 'Opera de Beyrouth',
    year: 2026, // TODO:confirm-years
    academicContext: 'Thesis Project',
    location: 'Beirut, Lebanon',
    tools: ['TODO:opera-tools'],
    categories: ['Cultural', 'Civic'],
    summary: 'TODO:opera-summary — thesis project for an opera house in Beirut.',
    description:
      'TODO:opera-description — confirm program and narrative with owner. Elements to verify before writing: Grand Auditorium (~836 seats), petit auditorium (~506 seats), site, concept.',
    heroImage: hero('opera-de-beyrouth', 'Opera de Beyrouth'),
    renders: renders('opera-de-beyrouth', 5),
    drawings: drawings('opera-de-beyrouth', 3),
    featured: true,
    latest: true,
  },
];

/** @param {string} slug */
export const getProject = (slug) => projects.find((p) => p.slug === slug);

// Explicit editorial order for the Home featured section (ui-spec §4.6):
// Opera de Beyrouth → Municipality of Beirut → Temporary Theatre.
export const featuredProjects = ['opera-de-beyrouth', 'municipality-of-beirut', 'temporary-theatre']
  .map(getProject)
  .filter(Boolean);

// Exactly one project is flagged `latest` (the hero mini-card target).
export const latestProject = projects.find((p) => p.latest) || null;
