import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Service from '../models/Service';
import Product from '../models/Product';
import Project from '../models/Project';
import Blog from '../models/Blog';
import Job from '../models/Job';
import SiteSettings from '../models/SiteSettings';
import User from '../models/User';
import Technology from '../models/Technology';
import ProcessStep from '../models/ProcessStep';
import WhyChooseUs from '../models/WhyChooseUs';
import HomeSection from '../models/HomeSection';
import CaseStudy from '../models/CaseStudy';

dotenv.config();

const mongoUri =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/sampannatech';

const seedServices = async (): Promise<void> => {
  const services = [
    {
      title: 'Product Development',
      slug: 'product-development',
      description: 'End-to-end product development from concept to launch, building scalable digital products that solve real business problems.',
      icon: 'Rocket',
      features: ['MVP Development', 'Full Product Build', 'Product Strategy', 'Technical Architecture'],
      technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'TypeScript'],
      order: 1,
      active: true,
    },
    {
      title: 'Web App Development',
      slug: 'web-app-development',
      description: 'Modern, performant web applications built with cutting-edge technologies for speed, scalability and exceptional user experience.',
      icon: 'Globe',
      features: ['Single Page Applications', 'Progressive Web Apps', 'E-commerce Platforms', 'SaaS Products'],
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'],
      order: 2,
      active: true,
    },
    {
      title: 'Mobile App Development',
      slug: 'mobile-app-development',
      description: 'Native and cross-platform mobile applications for iOS and Android that deliver smooth, reliable experiences.',
      icon: 'Smartphone',
      features: ['iOS Development', 'Android Development', 'Cross-platform Apps', 'App Store Optimization'],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
      order: 3,
      active: true,
    },
    {
      title: 'UI/UX Design',
      slug: 'ui-ux-design',
      description: 'Human-centered design that transforms complex workflows into intuitive, beautiful digital experiences.',
      icon: 'PenTool',
      features: ['User Research', 'Wireframing & Prototyping', 'Visual Design', 'Design Systems'],
      technologies: ['Figma', 'Adobe XD', 'Sketch'],
      order: 4,
      active: true,
    },
    {
      title: 'Cloud & DevOps',
      slug: 'cloud-devops',
      description: 'Cloud infrastructure setup, CI/CD pipelines and DevOps automation for reliable, scalable deployments.',
      icon: 'Cloud',
      features: ['Cloud Migration', 'CI/CD Pipelines', 'Infrastructure as Code', 'Monitoring & Logging'],
      technologies: ['AWS', 'Docker', 'GitHub Actions', 'Linux', 'Nginx'],
      order: 5,
      active: true,
    },
    {
      title: 'AI & Automation',
      slug: 'ai-automation',
      description: 'AI-powered solutions and intelligent automation to streamline operations and unlock new possibilities.',
      icon: 'Brain',
      features: ['AI Integration', 'Chatbots & Assistants', 'Data Processing', 'Workflow Automation'],
      technologies: ['OpenAI', 'Python', 'LLM', 'AI Automation'],
      order: 6,
      active: true,
    },
    {
      title: 'E-commerce Solutions',
      slug: 'ecommerce-solutions',
      description: 'Complete e-commerce platforms with inventory management, payment processing and order fulfillment.',
      icon: 'ShoppingCart',
      features: ['Custom Stores', 'Payment Integration', 'Inventory Management', 'Multi-vendor Platforms'],
      technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
      order: 7,
      active: true,
    },
    {
      title: 'Custom Software',
      slug: 'custom-software',
      description: 'Tailor-made software solutions designed around your unique business processes and operational needs.',
      icon: 'Code',
      features: ['ERP Systems', 'CRM Solutions', 'Workflow Tools', 'API Development'],
      technologies: ['Node.js', 'Fastify', 'Express', 'PostgreSQL', 'MongoDB'],
      order: 8,
      active: true,
    },
  ];

  for (const service of services) {
    await Service.updateOne(
      { slug: service.slug },
      { $set: service },
      { upsert: true, setDefaultsOnInsert: true }
    );
  }
  console.log('  Seeded services');
};

const seedProducts = async (): Promise<void> => {
  const products = [
    {
      name: 'Sampanna POS',
      slug: 'sampanna-pos',
      tagline: 'Modern point-of-sale and business management for growing businesses.',
      description: 'Sampanna POS is a modern point-of-sale and business management solution designed to simplify billing, inventory, sales tracking and business operations.',
      features: ['Billing', 'Inventory Management', 'Sales Reports', 'Product Management', 'Customer Management', 'Order Management', 'Multi-branch support', 'Business insights'],
      featured: true,
      active: true,
    },
  ];

  for (const product of products) {
    await Product.updateOne(
      { slug: product.slug },
      { $set: product },
      { upsert: true, setDefaultsOnInsert: true }
    );
  }
  console.log('  Seeded products');
};

const seedProjects = async (): Promise<void> => {
  const projects = [
    {
      name: 'Thakali House Hotel Management System',
      slug: 'thakali-house-hotel-management',
      category: 'Web Application',
      client: 'Hamro Thakali Bhancha Ghar',
      description: 'Hotel management and booking website built for Hamro Thakali Bhancha Ghar.',
      coverImage: 'https://i.postimg.cc/6qd1P3yM/Screenshot-From-2026-09-10-18-48-54.png',
      technologies: ['HTML', 'CSS', 'Bootstrap', 'PHP', 'MySQL'],
      solution: 'Built a hotel management and booking website to support online reservations and day-to-day hotel operations.',
      isDemo: false,
      isFeatured: true,
      active: true,
    },
    {
      name: 'Sampanna POS',
      slug: 'sampanna-pos',
      category: 'POS System',
      client: 'Retail / Restaurant / Business',
      description: 'Businesses need a reliable and easy-to-use system to manage daily sales, products, inventory, and transactions while reducing manual work and improving operational efficiency.',
      coverImage: 'https://i.postimg.cc/NjPbpTdY/Screenshot-From-2026-09-10-18-55-48.png',
      technologies: ['Node.js', 'Tailwind CSS', 'Java', 'Spring Boot'],
      solution: 'Built a centralized POS platform for billing, product management, inventory tracking and transaction reporting.',
      isDemo: false,
      isFeatured: true,
      active: true,
    },
    {
      name: 'Tekora',
      slug: 'tekora',
      category: 'Web Application',
      client: 'Technology',
      description: 'Modern digital product built by Sampanna Tech, focused on delivering a fast, scalable, and user-friendly web experience.',
      coverImage: 'https://i.postimg.cc/7hYTFt6r/Screenshot-From-2026-09-10-19-01-24.png',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      solution: 'Built a fast and scalable web experience with a modern interface and responsive user experience.',
      isDemo: false,
      isFeatured: true,
      active: true,
    },
  ];

  for (const project of projects) {
    await Project.updateOne(
      { slug: project.slug },
      { $set: project },
      { upsert: true, setDefaultsOnInsert: true }
    );
  }
  console.log('  Seeded projects');
};

const seedCaseStudies = async (): Promise<void> => {
  const studies = [
    {
      title: 'How Retail Corp Reduced Checkout Time by 40%',
      slug: 'retail-corp-pos-case-study',
      clientName: 'Retail Corp',
      industry: 'Retail',
      problem: 'Retail Corp was struggling with slow checkout processes, inaccurate inventory tracking and poor sales visibility across their 5 store locations. The existing legacy system could not handle the growing transaction volume and was causing customer frustration.',
      solution: 'We built a custom POS system with real-time inventory sync, barcode scanning, offline-first architecture and comprehensive analytics dashboard. The system integrates with their existing accounting software and provides real-time insights to management.',
      results: 'Checkout time reduced by 40%, inventory accuracy improved to 99.5%, sales reporting available in real-time, and the system handles 3x more transactions without performance degradation.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Redis', 'WebSocket'],
      testimonial: 'Sampanna Tech transformed our retail operations. The new POS system is fast, reliable and our staff loves using it.',
      testimonialAuthor: 'Ram Sharma',
      testimonialRole: 'Operations Director, Retail Corp',
      featured: true,
      active: true,
    },
    {
      title: 'ServicePro: 3x Organic Traffic Growth',
      slug: 'servicepro-website-case-study',
      clientName: 'ServicePro',
      industry: 'Professional Services',
      problem: 'ServicePro had an outdated website that was slow, not mobile-friendly and ranking poorly on search engines. They were losing potential customers to competitors with better online presence.',
      solution: 'Designed and developed a modern, SEO-optimized website using Next.js with static generation, structured data, optimized images and a content management system for easy blog updates.',
      results: 'Organic traffic increased by 3x within 6 months, page load time under 1 second, Lighthouse score of 97, and lead generation improved by 150%.',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CMS', 'Vercel'],
      testimonial: 'The website Sampanna Tech built for us is not just beautiful, it actually brings us business. Best investment we made.',
      testimonialAuthor: 'Priya Gupta',
      testimonialRole: 'Marketing Head, ServicePro',
      featured: true,
      active: true,
    },
  ];

  for (const study of studies) {
    await CaseStudy.updateOne(
      { slug: study.slug },
      { $set: study },
      { upsert: true, setDefaultsOnInsert: true }
    );
  }
  console.log('  Seeded case studies');
};

const seedTechnologies = async (): Promise<void> => {
  const technologies = [
    { name: 'React', category: 'Frontend', sortOrder: 1, active: true },
    { name: 'Next.js', category: 'Frontend', sortOrder: 2, active: true },
    { name: 'TypeScript', category: 'Frontend', sortOrder: 3, active: true },
    { name: 'Tailwind CSS', category: 'Frontend', sortOrder: 4, active: true },
    { name: 'Node.js', category: 'Backend', sortOrder: 1, active: true },
    { name: 'Fastify', category: 'Backend', sortOrder: 2, active: true },
    { name: 'Express', category: 'Backend', sortOrder: 3, active: true },
    { name: 'Python', category: 'Backend', sortOrder: 4, active: true },
    { name: 'MongoDB', category: 'Database', sortOrder: 1, active: true },
    { name: 'PostgreSQL', category: 'Database', sortOrder: 2, active: true },
    { name: 'MySQL', category: 'Database', sortOrder: 3, active: true },
    { name: 'AWS', category: 'Cloud & DevOps', sortOrder: 1, active: true },
    { name: 'Docker', category: 'Cloud & DevOps', sortOrder: 2, active: true },
    { name: 'GitHub Actions', category: 'Cloud & DevOps', sortOrder: 3, active: true },
    { name: 'Linux', category: 'Cloud & DevOps', sortOrder: 4, active: true },
    { name: 'Nginx', category: 'Cloud & DevOps', sortOrder: 5, active: true },
    { name: 'OpenAI', category: 'AI', sortOrder: 1, active: true },
    { name: 'LLM', category: 'AI', sortOrder: 2, active: true },
    { name: 'AI Automation', category: 'AI', sortOrder: 3, active: true },
  ];

  for (const tech of technologies) {
    await Technology.updateOne(
      { name: tech.name },
      { $set: tech },
      { upsert: true, setDefaultsOnInsert: true }
    );
  }
  console.log('  Seeded technologies');
};

const seedProcessSteps = async (): Promise<void> => {
  const steps = [
    { number: 1, title: 'Discovery', description: 'We dive deep into understanding your business, goals, challenges and requirements through collaborative workshops.', icon: 'Search', sortOrder: 1, active: true },
    { number: 2, title: 'Planning', description: 'We define the project scope, architecture, technology stack and create a detailed roadmap with clear milestones.', icon: 'FileText', sortOrder: 2, active: true },
    { number: 3, title: 'UI/UX Design', description: 'We design intuitive wireframes and polished visual designs that align with your brand and delight users.', icon: 'Palette', sortOrder: 3, active: true },
    { number: 4, title: 'Development', description: 'Our engineering team builds your product using modern technologies, following best practices and clean code principles.', icon: 'Code', sortOrder: 4, active: true },
    { number: 5, title: 'Testing', description: 'Rigorous quality assurance including functional testing, performance testing and security audits before launch.', icon: 'FlaskConical', sortOrder: 5, active: true },
    { number: 6, title: 'Deployment', description: 'We handle the complete deployment process, ensuring smooth production launch with zero downtime.', icon: 'Rocket', sortOrder: 6, active: true },
    { number: 7, title: 'Support', description: 'Ongoing maintenance, monitoring, updates and dedicated support to keep your product running perfectly.', icon: 'HeadphonesIcon', sortOrder: 7, active: true },
  ];

  for (const step of steps) {
    await ProcessStep.updateOne(
      { number: step.number },
      { $set: step },
      { upsert: true, setDefaultsOnInsert: true }
    );
  }
  console.log('  Seeded process steps');
};

const seedWhyChooseUs = async (): Promise<void> => {
  const items = [
    { title: 'Modern Technology', description: 'Built with modern frameworks, cloud-native architecture and industry best practices for performance and scalability.', icon: 'Zap', sortOrder: 1, active: true },
    { title: 'Experienced Team', description: 'A skilled team of engineers, designers and strategists with deep experience across industries and technologies.', icon: 'Users', sortOrder: 2, active: true },
    { title: 'Transparent Process', description: 'Clear communication, regular updates and complete visibility into project progress at every stage.', icon: 'Eye', sortOrder: 3, active: true },
    { title: 'Scalable Solutions', description: 'Architecture designed to grow with your business, handling increased load without costly rewrites.', icon: 'TrendingUp', sortOrder: 4, active: true },
    { title: 'Dedicated Support', description: 'We stay available after launch for maintenance, updates and any technical challenges that arise.', icon: 'Shield', sortOrder: 5, active: true },
    { title: 'Quality Focused', description: 'Rigorous testing, clean code and attention to detail ensure a reliable, polished final product.', icon: 'Award', sortOrder: 6, active: true },
  ];

  for (const item of items) {
    await WhyChooseUs.updateOne(
      { title: item.title },
      { $set: item },
      { upsert: true, setDefaultsOnInsert: true }
    );
  }
  console.log('  Seeded why choose us');
};

const seedHomeSections = async (): Promise<void> => {
  const sections = [
    {
      sectionKey: 'hero',
      title: 'Technology That Helps Your Business Grow.',
      subtitle: 'We build modern digital products, scalable software and technology solutions that help businesses grow faster.',
      buttonText: 'Start a Project',
      buttonUrl: '/contact',
      buttonText2: 'View Our Work',
      buttonUrl2: '/projects',
      active: true,
    },
    {
      sectionKey: 'cta',
      title: 'Have a Project in Mind?',
      subtitle: "Let's turn your idea into a reliable, scalable and beautiful digital product.",
      buttonText: 'Start a Project',
      buttonUrl: '/contact',
      buttonText2: 'Contact Us',
      buttonUrl2: '/contact',
      active: true,
    },
  ];

  for (const section of sections) {
    await HomeSection.updateOne(
      { sectionKey: section.sectionKey },
      { $set: section },
      { upsert: true, setDefaultsOnInsert: true }
    );
  }
  console.log('  Seeded home sections');
};

const seedBlogs = async (): Promise<void> => {
  const now = new Date();
  const blogs = [
    {
      title: 'Why Every Growing Business Needs a Modern Point-of-Sale System',
      slug: 'why-every-growing-business-needs-modern-pos-system',
      category: 'Business',
      excerpt: 'Billing, inventory and sales tracking are at the heart of every business. Here is why modern POS software helps you stay organized and grow with confidence.',
      content: 'Running a business involves more than selling products. You also need to track inventory, manage billing and understand how your sales are performing.\n\nA modern point-of-sale system brings these tasks together in one place. Instead of relying on notebooks, calculators or disconnected spreadsheets, you get a clear overview of your operations.\n\n**Billing made simple.**\nEvery sale can be recorded accurately, with printed receipts, digital records and multiple payment methods supported.\n\n**Inventory you can trust.**\nKnow what is in stock, what is running low and how fast products move, so you can reorder at the right time.\n\n**Reports that help you decide.**\nDaily, weekly and monthly sales reports show you where your business stands and where it is heading.\n\nFor businesses in Nepal and beyond, modern technology is no longer a luxury, it is a practical tool for staying competitive.',
      author: 'Sampanna Tech',
      tags: ['POS', 'Business Operations', 'Technology'],
      published: true,
      publishedAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
    },
    {
      title: 'How to Choose the Right Technology For Your Business',
      slug: 'how-to-choose-right-technology-for-your-business',
      category: 'Technology',
      excerpt: 'Not every business needs the same tools. Learn how to evaluate technology choices based on your operations, budget and long-term goals.',
      content: 'Technology decisions affect how your business works every single day. Choosing the right tools starts with understanding what you actually need.\n\n**Start with the problem, not the trend.**\nA new technology is only useful if it solves a real problem. List the tasks that take the most time, cost the most money or cause the most errors.\n\n**Think about the long term.**\nThe cheapest option today may become expensive later if it cannot grow with your business or be maintained easily.\n\n**Keep it simple.**\nThe best solution is often the one your team can actually use. Complicated systems quickly get abandoned.\n\nAt Sampanna Tech we help businesses evaluate these choices honestly, so the technology you adopt works for your goals.',
      author: 'Sampanna Tech',
      tags: ['Technology Strategy', 'Business Growth', 'Consulting'],
      published: true,
      publishedAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
    },
    {
      title: 'Digital Transformation: Where Most Businesses Should Start',
      slug: 'digital-transformation-where-most-businesses-should-start',
      category: 'Digital Transformation',
      excerpt: 'Digital transformation sounds broad, but it starts with small practical steps. Here are the areas that bring the quickest value.',
      content: 'Digital transformation does not mean replacing everything at once. It means using technology to make important parts of your business more effective.\n\n**Start with customer-facing systems.**\nWebsites, contact forms and online ordering are direct ways to serve customers better.\n\n**Digitize your records.**\nSales, inventory, customer and financial records become far more useful when they are searchable and organized.\n\n**Automate repetitive work.**\nInvoices, reports and reminders can often be automated, freeing your team for higher-value work.\n\nTake it one step at a time. Practical improvements, done well, build the foundation for larger changes later.',
      author: 'Sampanna Tech',
      tags: ['Digital Transformation', 'Business Software', 'Digital Solutions'],
      published: true,
      publishedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
    },
  ];

  for (const blog of blogs) {
    await Blog.updateOne(
      { slug: blog.slug },
      { $set: blog },
      { upsert: true, setDefaultsOnInsert: true }
    );
  }
  console.log('  Seeded blogs');
};

const seedJobs = async (): Promise<void> => {
  console.log('  No jobs seeded (managed through admin)');
};

const seedSettings = async (): Promise<void> => {
  await SiteSettings.findOneAndUpdate(
    { companyName: 'Sampanna Tech' },
    {
      $set: {
        companyName: 'Sampanna Tech',
        tagline: 'Technology That Helps Your Business Grow.',
        description: 'Sampanna Tech builds modern digital products, scalable software and technology solutions that help businesses grow faster.',
        location: 'Kathmandu, Nepal',
        email: 'hello@sampannatech.com',
        phone: '+977-9800000000',
        stats: {
          projectsDelivered: 50,
          businessesServed: 30,
          yearsExperience: 5,
          support: 'Mon-Sat',
        },
      },
    },
    { upsert: true, setDefaultsOnInsert: true }
  );
  console.log('  Seeded site settings');
};

const seedAdmin = async (): Promise<void> => {
  const existing = await User.findOne({ email: 'admin@sampannatech.com' });
  if (existing) {
    console.log('  Admin user already exists, skipping');
    return;
  }

  const password = process.env.ADMIN_INITIAL_PASSWORD;
  if (!password) {
    throw new Error(
      'ADMIN_INITIAL_PASSWORD env variable is required. Run with: ADMIN_INITIAL_PASSWORD=YourPassword npm run seed'
    );
  }
  const hashedPassword = await bcrypt.hash(password, 12);

  await User.create({
    name: 'Admin',
    email: 'admin@sampannatech.com',
    password: hashedPassword,
    role: 'admin',
  });
  console.log('  Seeded admin user (admin@sampannatech.com)');
};

const seed = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB, seeding...');

    await seedSettings();
    await seedServices();
    await seedProducts();
    await seedProjects();
    await seedCaseStudies();
    await seedTechnologies();
    await seedProcessSteps();
    await seedWhyChooseUs();
    await seedHomeSections();
    await seedBlogs();
    await seedJobs();
    await seedAdmin();

    console.log('\nSeeding complete.');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seed();
