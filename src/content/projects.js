// Projects — single source of truth. Content is transcribed from the owner's
// portfolio PDF ("Portfolio Cynthia Nahra"), lightly copy-edited for the web
// (PDF line-break hyphenation and obvious typos fixed; wording preserved).
// Ordered chronologically, earliest → latest year, matching the PDF's table of
// contents (01→07). Array order = display order; `number` tracks the same order.
//
// Images were extracted from the same PDF and are web-resolution (≤ 800 px).
// Each ProjectImage carries the file's REAL pixel dimensions so the gallery
// aspect-ratio frames match (see ui/ImageFigure.js). Swap in higher-res files
// later by overwriting the .webp at the same path.
//
// NOTE on years: the PDF states academic level only (2nd/3rd/4th/Final year) and
// an enrolment span of Sep 2021 – Jun 2026. Years below are derived from that
// (2nd→2023, 3rd→2024, 4th→2025, Final→2026) and are best-estimates — confirm
// with the owner. Per-project `tools` are also not itemised in the PDF; the sets
// below reflect the skills she lists (AutoCAD, Revit, Lumion, SketchUp, Photoshop).

const im = (slug, name, w, h, alt) => ({
  src: `/images/projects/${slug}/${name}.webp`,
  width: w,
  height: h,
  alt,
});

/** @type {import('./types').Project[]} */
export const projects = [
  {
    slug: 'student-dorms',
    number: '01',
    title: 'Student Dorms',
    year: 2023, // derived from 2nd Year Project — TODO:confirm-years
    academicContext: '2nd Year Project',
    location: 'Mansourieh, Lebanon',
    tools: ['SketchUp', 'Revit', 'Lumion'],
    categories: ['Residential', 'Education'],
    summary: 'Student housing terraced into a sloped site, balancing collective life with private retreat.',
    description:
      'Located on a sloped site, the project uses the natural terrain as a main design strategy. The architecture is distributed across multiple levels, allowing the dormitory to follow the slope while organizing the different functions clearly: dining areas, green spaces, shared study rooms, and private student rooms.\n\nPrivacy, comfort, and functionality were key priorities. The rooms are oriented to receive natural light while preserving intimacy and quietness, creating spaces suitable for rest and personal life. Meanwhile, the shared areas encourage interaction and community between USJ students.\n\nThis balance between openness and privacy creates a calm and productive environment where students can study, socialize, relax, and feel at home.',
    heroImage: im('student-dorms', 'hero', 640, 360, 'Student Dorms — aerial exterior render across the sloped site'),
    conceptImage: 'drawing-01', // image shown beside the concept text — see conceptImageFor() below
    renders: [
      im('student-dorms', 'render-01', 800, 450, 'Student Dorms — interior circulation render'),
      im('student-dorms', 'render-02', 640, 360, 'Student Dorms — shared interior space render'),
      im('student-dorms', 'render-03', 640, 360, 'Student Dorms — courtyard render'),
    ],
    drawings: [
      im('student-dorms', 'drawing-01', 585, 536, 'Student Dorms — massing study and plans'),
    ],
    // Full-page floor plans (from PDFs), shown full-width below the concept text
    // in numeric order. See the `sheets` gallery on the project detail page.
    sheetsLabel: 'plans & axonometric',
    sheets: [
      im('student-dorms', '1', 1600, 1132, 'Student Dorms — floor plan with study rooms, dining rooms and student rooms'),
      im('student-dorms', '2', 1600, 1132, 'Student Dorms — floor plan with lobbies, offices, study area and student rooms'),
      im('student-dorms', '3', 1600, 1132, 'Student Dorms — floor plan with teachers zone, dining and working areas and student rooms'),
      im('student-dorms', '4', 1600, 1132, 'Student Dorms — amenities floor plan: restaurant, library, gym, pool and sports courts'),
      im('student-dorms', 'axo-s5', 1131, 1600, 'Student Dorms — exploded axonometric of the stacked levels'),
    ],
    featured: false,
  },
  {
    slug: 'municipality-of-beirut',
    number: '02',
    title: 'Municipality of Beirut',
    year: 2024, // derived from 3rd Year Project — TODO:confirm-years
    academicContext: '3rd Year Project',
    location: 'Sodeco, Beirut',
    tools: ['SketchUp', 'AutoCAD', 'Lumion'],
    categories: ['Civic', 'Urban'],
    summary: 'A closed civic block carved open into an interactive public space for Sodeco.',
    description:
      'This project reimagines the municipality as an open and interactive civic space — a place that serves administrative functions while encouraging community engagement and a stronger connection to the city.\n\nLocated in Sodeco, a dynamic urban area, the design is based on openness, accessibility, and fluid interaction with the public realm. The sequence of sketches shows the transformation of a closed, inward-looking volume into a welcoming and inclusive urban form. By carving spaces out of the solid mass, the project opens toward the main street, creating a natural flow that invites people in. As the form evolves, an internal courtyard and pathways emerge, shaping green and social gathering spaces that are both visually and physically connected to the city.\n\nThe architecture reflects the main goal of the project: to draw people inward, encourage participation, and create moments of gathering and interaction. The municipality becomes a bridge between people, public life, and the urban context.',
    heroImage: im('municipality-of-beirut', 'hero', 640, 360, 'Municipality of Beirut — exterior render with vertical louvers and planting'),
    conceptImage: 'drawing-01',
    renders: [
      im('municipality-of-beirut', 'render-01', 800, 449, 'Municipality of Beirut — interior lounge render'),
      im('municipality-of-beirut', 'render-03', 640, 360, 'Municipality of Beirut — stone corridor render'),
      im('municipality-of-beirut', 'render-04', 560, 336, 'Municipality of Beirut — green wall interior render'),
      im('municipality-of-beirut', 'render-05', 1600, 900, 'Municipality of Beirut — exterior render with wooden louver facade and entry plaza'),
      im('municipality-of-beirut', 'render-06', 1280, 720, 'Municipality of Beirut — sunken courtyard render at sunset'),
      im('municipality-of-beirut', 'render-07', 1280, 720, 'Municipality of Beirut — sunken courtyard and steps render with figures'),
      im('municipality-of-beirut', 'render-08', 1280, 720, 'Municipality of Beirut — close-up render of the wooden louver facade'),
    ],
    drawings: [
      im('municipality-of-beirut', 'drawing-01', 170, 789, 'Municipality of Beirut — concept evolution sketch'),
    ],
    sheetsLabel: 'floor plans',
    sheetsColumns: 3, // show the three floor plans side by side
    sheets: [
      im('municipality-of-beirut', 'plan-01', 1415, 2000, 'Municipality of Beirut — floor plan with auditorium, foyer and public courtyard'),
      im('municipality-of-beirut', 'plan-02', 1415, 2000, 'Municipality of Beirut — floor plan with offices, meeting rooms and courtyard'),
      im('municipality-of-beirut', 'plan-03', 1415, 2000, 'Municipality of Beirut — floor plan with offices, archives and courtyard'),
    ],
    featured: true,
  },
  {
    slug: 'convention-center',
    number: '03',
    title: 'Convention Center',
    year: 2024, // derived from 3rd Year Project — TODO:confirm-years
    academicContext: '3rd Year Project',
    location: 'Sodeco, Beirut',
    tools: ['AutoCAD', 'Revit', 'Lumion'],
    categories: ['Civic', 'Hospitality'],
    summary: 'A hybrid convention center and boutique hotel in dialogue with Beit Beirut.',
    description:
      'This project is a hybrid civic and hospitality space, combining a convention center and a boutique hotel. It is strategically located between two contrasting streets, Monot and Sodeco, near the historically significant Beit Barakat — Beit Beirut.\n\nThe concept is based on integration and contextual sensitivity. The project responds to the different character of each street: the boutique hotel is placed along Monot, the calmer and more residential side, offering guests a sense of retreat, intimacy, and comfort. In contrast, the convention center opens toward the lively and active Sodeco street, ensuring visibility, accessibility, and public engagement.\n\nAt the heart of the project, a central green communal space acts as a transition between the two programs. It connects the hotel and convention center while creating a calm shared environment for gathering and interaction. This green space also establishes a visual and spatial dialogue with Beit Beirut, paying homage to its historical and cultural importance — a mediator between past and present, calm and activity, private and public.',
    heroImage: im('convention-center', 'hero', 800, 450, 'Convention Center — exterior entry render'),
    conceptImage: 'render-01',
    renders: [
      im('convention-center', 'render-01', 800, 497, 'Convention Center — aerial massing model'),
      im('convention-center', 'render-02', 560, 331, 'Convention Center — interior courtyard steps render'),
      im('convention-center', 'render-03', 640, 360, 'Convention Center — exterior render with lawn'),
      im('convention-center', 'render-04', 640, 360, 'Convention Center — communal courtyard render'),
      im('convention-center', 'render-05', 640, 360, 'Convention Center — entry plaza render'),
      im('convention-center', 'render-06', 1600, 900, 'Convention Center — aerial render of the central green courtyard and terraces'),
    ],
    drawings: [
      im('convention-center', 'drawing-01', 699, 800, 'Convention Center — exploded axonometric'),
    ],
    featured: false,
  },
  {
    slug: 'affordable-housing',
    number: '04',
    title: 'Affordable Housing',
    year: 2025, // derived from 4th Year Project — TODO:confirm-years
    academicContext: '4th Year Project',
    location: 'Adlieh, Beirut',
    tools: ['AutoCAD', 'Revit', 'Lumion'],
    categories: ['Residential'],
    summary: 'Corridor-free modular housing for Adlieh’s working population, built from a 4×4 m unit.',
    description:
      'The central concept of this project is to introduce affordable housing units in Adlieh, designed for the working population of the neighborhood. The aim is to create compact, functional living spaces that offer comfort and privacy while maximizing space efficiency and reducing construction costs.\n\nThe design is based on a modular 4×4 m room unit, used as the main building block. By avoiding traditional corridors and reorganizing the rooms into open, interconnected layouts, each apartment becomes more spacious, efficient, and practical. The project includes three housing models: a two-bedroom unit for small families or roommates, a one-bedroom studio, and a compact duplex — each containing the essential elements of urban living, such as a balcony, open-plan kitchen, living area, and bedrooms.\n\nPrivacy is ensured through the careful stacking of units, alternating balcony orientations, controlled window placement, and avoiding direct views between apartments. The building also supports daily life through shared facilities such as a supermarket, pharmacy, gym, restaurant, common lobby, and green outdoor spaces. The project therefore creates more than affordable housing; it offers a compact urban living environment where residents can live comfortably and access their daily needs within the same place.',
    heroImage: im('affordable-housing', 'hero', 1600, 900, 'Affordable Housing — exterior render of the modular towers and plaza'),
    conceptImage: 'render-07',
    renders: [
      im('affordable-housing', 'render-00', 800, 333, 'Affordable Housing — unit models: apartment types in axonometric and plan'),
      im('affordable-housing', 'render-01', 1600, 900, 'Affordable Housing — courtyard and stacked balconies at sunset'),
      im('affordable-housing', 'render-02', 1600, 900, 'Affordable Housing — communal courtyard render with a mature tree'),
      im('affordable-housing', 'render-03', 1600, 900, 'Affordable Housing — exterior render of the modular towers at dusk'),
      im('affordable-housing', 'render-04', 1600, 900, 'Affordable Housing — ground-level undercroft render with raised walkway'),
      im('affordable-housing', 'render-05', 1600, 900, 'Affordable Housing — courtyard render with pedestrian bridge and ground-floor gym'),
      im('affordable-housing', 'render-06', 1600, 900, 'Affordable Housing — elevated render between the stacked modular units'),
      im('affordable-housing', 'render-07', 800, 588, 'Affordable Housing — aerial site render of the building on its triangular plot'),
    ],
    drawings: [
      im('affordable-housing', 'drawing-02', 800, 560, 'Affordable Housing — plan sheet'),
      im('affordable-housing', 'drawing-03', 715, 720, 'Affordable Housing — elevations and sections'),
    ],
    drawingsSingle: true, // stack drawings full-width, one per row
    featured: false,
  },
  {
    slug: 'modulable-theatre',
    number: '05',
    title: 'Modulable Theatre',
    year: 2025, // derived from 4th Year Project — TODO:confirm-years
    academicContext: '4th Year Project',
    location: 'Beit Al Shams, Sharjah, UAE',
    tools: ['AutoCAD', 'Revit', 'Lumion'],
    categories: ['Cultural', 'Temporary'],
    summary: 'A demountable 2×2 m wood-and-fabric theatre, assembled and dismantled within three days.',
    description:
      'The purpose of this project was to create a temporary theatre that can be assembled and disassembled within 3 days, located inside Beit Al Shams in Sharjah. The design approach prioritized simplicity, flexibility and harmony with the existing architecture. To achieve this, I selected wood and fabric as the primary materials due to their ease of handling, lightweight nature, and compatibility with rapid construction. The components are mechanically joined, specifically with the traditional Chinese mortise-and-tenon technique, to join the wooden bars and stabilize the structure.\n\nThe theatre is based on a modular system using a 2×2 meter square unit. These units can be rearranged in many configurations, allowing artists and performers to adapt the space according to their specific performance needs. This flexibility enables the creation of multiple spatial prototypes.\n\nA critical design goal was to ensure that the theatre would blend seamlessly with the existing structure of Beit Al Shams — achieved not only through the choice of materials but also by considering the placement and orientation of the modular units. A pathway created from the base units connects the new structure to the original house, integrating the theatre both visually and functionally within its context. Ultimately the project seeks to create a dynamic and transformable performance space that respects and enhances its surroundings while offering performers and audiences a unique experience.',
    heroImage: im('modulable-theatre', 'hero', 800, 585, 'Modulable Theatre — courtyard render of the wood-and-fabric structure'),
    conceptImage: 'drawing-01',
    conceptMatchHeight: true, // concept drawing fills the column to match the text height
    renders: [
      im('modulable-theatre', 'render-01', 640, 360, 'Modulable Theatre — aerial render in the courtyard'),
      im('modulable-theatre', 'render-02', 640, 360, 'Modulable Theatre — covered walkway render'),
      im('modulable-theatre', 'render-03', 640, 360, 'Modulable Theatre — modular structure render'),
      im('modulable-theatre', 'render-04', 640, 360, 'Modulable Theatre — performance / gathering render'),
    ],
    drawings: [
      im('modulable-theatre', 'drawing-01', 484, 800, 'Modulable Theatre — module and joint details'),
      im('modulable-theatre', 'drawing-04', 1600, 1491, 'Modulable Theatre — ground floor plan with courtyard and tiered seating'),
      im('modulable-theatre', 'drawing-05', 1600, 1049, 'Modulable Theatre — colored elevations with level markers'),
      im('modulable-theatre', 'drawing-06', 1600, 768, 'Modulable Theatre — building sections with level markers'),
      im('modulable-theatre', 'drawing-03', 800, 799, 'Modulable Theatre — spatial prototypes A–E'),
    ],
    drawingsSingle: true, // stack drawings full-width, one per row
    featured: true,
  },
  {
    slug: 'municipality-of-nabatieh',
    number: '06',
    title: 'Municipality of Nabatieh',
    year: 2025, // derived from 4th Year Project — TODO:confirm-years
    academicContext: '4th Year Project',
    location: 'Nabatieh, Lebanon',
    tools: ['AutoCAD', 'Revit', 'Lumion', 'Photoshop'],
    categories: ['Civic', 'Urban'],
    summary: 'A post-war municipality re-anchored in the urban fabric, rebuilding trust between a city and its people.',
    description:
      'A neighborhood turned into ashes, a broken bond between a lost municipality and its people. A war has not only destroyed walls, it has tried to erase trust, to dissolve belonging, to fray the invisible fabric that unites citizens to their city. Therefore a question arises: how to re-establish the link between the neighborhood, the people, and the municipality? That is why my project is not simply about rebuilding roofs — it is about retracing this thread.\n\nThus, my project is not a simple response to ruins, but a living bridge between the inhabitants and their city: a continuity where the privacy of residential buildings dialogues with the transparency of the municipality. Where you can live and also be heard. Public spaces are designed to encourage exchange, transparency, and inclusion. Municipal buildings are no longer closed or isolated but blended into the life of the neighborhood — accessible, visible, human.\n\nThe answer I propose is an architecture that goes beyond its institutional function to become a tool of rapprochement, strengthening the relationship between people and government through a new municipality anchored in the heart of the urban fabric. The houses built around it are not only witnesses of repaired ties but the active climate of a new dialogue between the spatial and the social: from public spaces to meeting places. A renewed sense of belonging — architecture becomes a language of living together.',
    heroImage: im('municipality-of-nabatieh', 'hero', 640, 360, 'Municipality of Nabatieh — street-level urban render'),
    // Two drawings stacked beside the concept text: the aerial context model over
    // the concept evolution diagram. (Both are dropped from the drawings gallery.)
    conceptImages: ['drawing-01', 'drawing-02'],
    renders: [
      im('municipality-of-nabatieh', 'render-01', 640, 360, 'Municipality of Nabatieh — facade render at sunset'),
      im('municipality-of-nabatieh', 'render-02', 640, 360, 'Municipality of Nabatieh — public underpass render'),
      im('municipality-of-nabatieh', 'render-03', 640, 360, 'Municipality of Nabatieh — aerial massing model'),
      im('municipality-of-nabatieh', 'render-04', 640, 360, 'Municipality of Nabatieh — exterior render'),
      im('municipality-of-nabatieh', 'render-05', 640, 360, 'Municipality of Nabatieh — street and window render'),
      im('municipality-of-nabatieh', 'render-06', 640, 360, 'Municipality of Nabatieh — public plaza render'),
      im('municipality-of-nabatieh', 'render-07', 640, 360, 'Municipality of Nabatieh — plaza render with figures'),
    ],
    drawings: [
      im('municipality-of-nabatieh', 'drawing-01', 800, 619, 'Municipality of Nabatieh — aerial context model'),
      im('municipality-of-nabatieh', 'drawing-02', 720, 198, 'Municipality of Nabatieh — concept evolution diagram'),
      im('municipality-of-nabatieh', 'drawing-03', 590, 720, 'Municipality of Nabatieh — site plan'),
      im('municipality-of-nabatieh', 'drawing-04', 536, 640, 'Municipality of Nabatieh — site plan'),
      im('municipality-of-nabatieh', 'drawing-05', 600, 720, 'Municipality of Nabatieh — site plan'),
      im('municipality-of-nabatieh', 'drawing-06', 699, 720, 'Municipality of Nabatieh — sections and elevations'),
    ],
    featured: false,
  },
  {
    slug: 'beirut-opera',
    number: '07',
    title: 'Beirut Opera',
    year: 2026, // Final Year Project — TODO:confirm-years
    academicContext: 'Final Year Project',
    location: 'Beirut Waterfront, Lebanon',
    tools: ['AutoCAD', 'Revit', 'Lumion', 'Photoshop'],
    categories: ['Cultural', 'Civic'],
    summary: 'A waterfront opera rising between Beirut’s towers and the sea, where architecture floats on water.',
    description:
      'The project is set within the context of the new Beirut, on the waterfront, in an area dominated by high-rise towers. The opera emerges from the urban ground like a stage inhabited by light. It shines between the towers and asserts its presence on a podium elevated from the ground, standing apart from their verticality. It therefore appears as a cultural figure at the heart of this urban composition, visible from both the city and the sea.\n\nThe architecture of the opera does not seek to represent either the Eastern or the Western world. Instead, it chooses to position itself between these two universes, as a space of encounter and dialogue. The opera is not dedicated to one culture over another, but to the entire world. It becomes a mosaic of voices, traditions, and influences that meet and enrich one another.\n\nAnchored on the Mediterranean Sea, it evokes the very soul of Beirut, a city whose history and identity have always maintained a privileged relationship with the sea and with everything that lies beyond the horizon. Its volumes settle along the shore as if floating on water, while creating a vast esplanade that weaves a connection between the city and the sea. Water becomes a material of the project: it moves through the spaces, reflects the light, extends the pathways, and makes the architecture vibrate like a silent melody.\n\nThe sea is not considered a simple backdrop, but an essential element of the spatial experience. Music is not only performed inside the building; it extends outward. The landscape, the waves, and the wind — in both their turmoil and their calm — take part in this permanent symphony. Thus, the opera does not simply seek to belong to a place; it seeks to reveal it, to give it a voice, and to celebrate the music that already lives within it.',
    heroImage: im('beirut-opera', 'hero', 800, 450, 'Beirut Opera — waterfront exterior render at sunset'),
    conceptImage: 'render-01',
    renders: [
      im('beirut-opera', 'render-01', 640, 360, 'Beirut Opera — waterfront render'),
      im('beirut-opera', 'render-02', 640, 360, 'Beirut Opera — esplanade render at sunset'),
      im('beirut-opera', 'render-03', 640, 360, 'Beirut Opera — aerial render over the water'),
      im('beirut-opera', 'render-04', 640, 360, 'Beirut Opera — aerial render at sunset'),
      im('beirut-opera', 'render-05', 640, 360, 'Beirut Opera — exterior render at dusk'),
      im('beirut-opera', 'render-06', 640, 360, 'Beirut Opera — night exterior render'),
      im('beirut-opera', 'render-07', 640, 360, 'Beirut Opera — rooftop terrace render'),
      im('beirut-opera', 'render-08', 640, 360, 'Beirut Opera — glazed gallery render at sunset'),
      im('beirut-opera', 'render-09', 640, 360, 'Beirut Opera — steps to the water render'),
      im('beirut-opera', 'render-10', 640, 360, 'Beirut Opera — auditorium interior render'),
      im('beirut-opera', 'render-11', 640, 360, 'Beirut Opera — interior gallery render'),
      im('beirut-opera', 'render-12', 640, 360, 'Beirut Opera — Lebanese music gallery render'),
    ],
    drawings: [
      im('beirut-opera', 'drawing-01', 800, 611, 'Beirut Opera — site plan'),
      im('beirut-opera', 'drawing-02', 800, 611, 'Beirut Opera — roof plan'),
      im('beirut-opera', 'drawing-04', 800, 611, 'Beirut Opera — floor plan'),
      im('beirut-opera', 'drawing-05', 800, 611, 'Beirut Opera — floor plan'),
      im('beirut-opera', 'drawing-03', 800, 611, 'Beirut Opera — sections'),
      im('beirut-opera', 'drawing-06', 800, 611, 'Beirut Opera — elevations'),
      im('beirut-opera', 'drawing-07', 800, 611, 'Beirut Opera — elevations'),
    ],
    featured: true,
    latest: true,
  },
];

/** @param {string} slug */
export const getProject = (slug) => projects.find((p) => p.slug === slug);

// Concept image(s) (project detail page): shown beside the concept prose. Choose
// per project via either:
//   • `conceptImage`  — a single image (name string or im() object)
//   • `conceptImages` — an array (stacked vertically beside the text)
// Each entry is either an image NAME string ('render-02', 'drawing-01', 'hero')
// or a full im(...) object (for an image not otherwise in the project). Omit both
// to default to the first render. Whichever images are chosen are removed from
// their galleries on the page so they never show twice.
const nameOf = (img) => img.src.split('/').pop().replace(/\.[^.]+$/, '');

// Resolve one concept reference (name string or im() object) to an image object.
const resolveConcept = (p, ref) => {
  if (ref && typeof ref === 'object') return ref;
  if (typeof ref === 'string') {
    return [p.heroImage, ...p.renders, ...p.drawings].find((img) => nameOf(img) === ref) || null;
  }
  return null;
};

/** The primary concept image (first one). @param {import('./types').Project} p */
export const conceptImageFor = (p) => conceptImagesFor(p)[0] || null;

/** All concept images, in display order. @param {import('./types').Project} p */
export const conceptImagesFor = (p) => {
  const refs = Array.isArray(p.conceptImages) && p.conceptImages.length ? p.conceptImages : [p.conceptImage];
  const list = refs.map((ref) => resolveConcept(p, ref)).filter(Boolean);
  return list.length ? list : [p.renders[0] || p.heroImage].filter(Boolean);
};

// Explicit editorial order for the Home featured section (ui-spec §4.6):
// Beirut Opera → Municipality of Beirut → Modulable Theatre.
export const featuredProjects = ['beirut-opera', 'municipality-of-beirut', 'modulable-theatre']
  .map(getProject)
  .filter(Boolean);

// Exactly one project is flagged `latest` (the hero mini-card target).
export const latestProject = projects.find((p) => p.latest) || null;
