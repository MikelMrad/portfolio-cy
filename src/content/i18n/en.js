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
    viewProjects: 'View projects',
    latestProject: 'Latest project',
    exploreAll: 'View all projects',
    learnMore: 'Learn more',
    getInTouch: 'Get in touch',
    emailMe: 'Email me',
    selectedWork: 'Selected work',
    approach: 'Approach',
    about: 'About',
    tools: 'Tools I work with',
    viewProject: 'View project',
  },
  contact: {
    title: 'Let’s talk',
    formTitle: 'Send a message',
    fullName: 'Full name',
    email: 'Email',
    message: 'Message',
    send: 'Send message',
    sending: 'Sending…',
    success: 'Thank you. Your message has been sent.',
    error: 'Something went wrong. Please try again.',
    required: 'This field is required.',
    invalidEmail: 'Please enter a valid email address.',
  },
  about: {
    downloadCv: 'Download CV',
  },
  footer: {
    pagesTitle: 'Pages',
    socialTitle: 'Social',
    rights: 'All rights reserved.',
    backHome: 'Back home',
  },
  notFound: {
    title: 'Page not found',
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
