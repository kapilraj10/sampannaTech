export const siteConfig = {
  name: 'Sampanna Tech',
  tagline: 'Technology That Helps Your Business Grow.',
  shortDescription:
    'Sampanna Tech builds modern websites, mobile applications, business software and digital solutions designed to help businesses work smarter, grow faster and operate efficiently.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  location: 'Kathmandu, Nepal',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '',
  social: {
    facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || 'https://facebook.com/sampannatech',
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || 'https://instagram.com/sampannatech',
    linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || 'https://linkedin.com/company/sampannatech',
    github: process.env.NEXT_PUBLIC_SOCIAL_GITHUB || 'https://github.com/sampannatech',
  },
  stats: {
    projectsDelivered: 50,
    businessesServed: 20,
    yearsExperience: 5,
    support: '24/7',
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
  { name: 'Products', href: '/products' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
] as const;