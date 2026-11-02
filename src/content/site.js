/** @type {import('./types').SiteMeta} */
export const site = {
  name: 'Cynthia Nahra',
  wordmark: 'cynthia nahra.',
  role: 'Junior Architect',
  location: 'Beirut, Lebanon',
  email: 'cynthianahra.work@gmail.com', // from portfolio PDF
  phone: '+961 81 726 981',
  education: 'Saint-Joseph University of Beirut (USJ)', // Architecture Diploma, 2021–2026
  // Add real profiles when confirmed, e.g. { label: 'LinkedIn', href: 'https://…' }.
  // The footer renders only entries with a real href, so an empty list hides the column.
  socials: [],
  cv: { href: '/files/Cynthia-Nahra-CV.pdf', size: 'PDF, 112 KB' }, // public/files
  credit: { name: 'Mikel Mrad', href: 'https://mikelmrad.dev' }, // footer "Site by"
  tools: ['AutoCAD', 'Revit', 'Lumion', 'SketchUp', 'Photoshop', 'InDesign'],
};
