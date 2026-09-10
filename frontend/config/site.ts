export const siteConfig = {
  name: 'Sampanna Tech',
  tagline: 'Technology That Helps Your Business Grow.',
  shortDescription:
    'Sampanna Tech builds modern websites, mobile applications, business software and digital solutions designed to help businesses work smarter, grow faster and operate efficiently.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3015',
  apiUrl:
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    'http://localhost:5015/api',
  location: 'Kathmandu, Nepal',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '',
  social: {
    facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || '',
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || '',
    linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || '',
    github: process.env.NEXT_PUBLIC_SOCIAL_GITHUB || '',
    youtube: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || '',
    tiktok: process.env.NEXT_PUBLIC_SOCIAL_TIKTOK || '',
  },
  stats: {
    projectsDelivered: 0,
    businessesServed: 0,
    yearsExperience: 0,
    support: '',
  },
  services: {
    options: [
      'Website Development',
      'Mobile App Development',
      'Custom Software Development',
      'POS & Business Management Systems',
      'UI/UX Design',
      'IT Consulting',
      'Digital Solutions',
      'Maintenance & Support',
    ],
  },
} as const;

export const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Team', href: '/team' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
] as const;