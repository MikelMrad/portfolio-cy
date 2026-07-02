// All user-visible CHROME strings (nav, home section actions, form, footer, 404, a11y).
// Project/capability CONTENT lives in its own content files — content ≠ chrome.
// Any missing key renders its own path via t() — greppable, never silent.
const en = {
  nav: {
    home: 'Home',
    projects: 'Projects',
    about: 'About',
    contact: 'Contact',
    menu: 'Menu',
    close: 'Close',
  },
  home: {
    viewProjects: 'View Projects',
    latestProject: 'Latest Project',
    exploreAll: 'Explore all projects',
    learnMore: 'Learn more',
    getInTouch: 'Get in touch',
  },
  contact: {
    title: 'Let’s talk',
    formTitle: 'Get in touch!',
    fullName: 'Full Name',
    email: 'Email',
    message: 'Message',
    send: 'Send Message',
    sending: 'Sending…',
    success: 'Thank you — your message has been sent.',
    error: 'Something went wrong. Please try again.',
    required: 'This field is required.',
    invalidEmail: 'Please enter a valid email address.',
  },
  footer: {
    pagesTitle: 'Pages',
    socialTitle: 'Social',
    rights: 'All rights reserved.',
    backHome: 'Back home',
  },
  notFound: {
    line: 'The page you’re looking for has moved or no longer exists.',
    backHome: 'Back home',
  },
  a11y: {
    skipToContent: 'Skip to content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
};

export default en;
