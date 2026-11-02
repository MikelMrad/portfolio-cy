// Primary pages, shared by the nav, the mobile menu and the footer.
export const pages = [
  { href: '/projects', key: 'projects' },
  { href: '/about', key: 'about' },
];

export const contactPage = { href: '/contact', key: 'contact' };

// Active when the route matches exactly, or (for section roots like /projects)
// when the current path sits under it, so a project detail marks "Projects".
export const isActive = (pathname, href) => pathname === href || pathname.startsWith(`${href}/`);
