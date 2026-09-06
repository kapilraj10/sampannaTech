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

dotenv.config();

const mongoUri =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/sampannatech';

const seedServices = async (): Promise<void> => {
  const services = [
    {
      title: 'Website Development',
      slug: 'website-development',
      description:
        'Fast, responsive and professional websites designed to represent your brand and convert visitors into customers.',
      icon: 'Globe',
      order: 1,
      active: true,
    },
    {
      title: 'Mobile App Development',
      slug: 'mobile-app-development',
      description:
        'Modern Android and iOS applications built for performance, usability and scalability.',
      icon: 'Smartphone',
      order: 2,
      active: true,
    },
    {
      title: 'Custom Software Development',
      slug: 'custom-software-development',
      description:
        'Business-specific software designed around your workflow, operations and goals.',
      icon: 'Code',
      order: 3,
      active: true,
    },
    {
      title: 'POS & Business Management Systems',
      slug: 'pos-and-business-management-systems',
      description:
        'Powerful solutions for billing, inventory, sales, reports and day-to-day business operations.',
      icon: 'LayoutDashboard',
      order: 4,
      active: true,
    },
    {
      title: 'UI/UX Design',
      slug: 'ui-ux-design',
      description:
        'Simple, intuitive and modern interfaces that make digital products easier to use.',
      icon: 'PenTool',
      order: 5,
      active: true,
    },
    {
      title: 'IT Consulting',
      slug: 'it-consulting',
      description:
        'Technology guidance to help businesses choose the right tools, architecture and digital strategy.',
      icon: 'Lightbulb',
      order: 6,
      active: true,
    },
    {
      title: 'Digital Solutions',
      slug: 'digital-solutions',
      description:
        'Integrated digital solutions that connect your business, customers and operations.',
      icon: 'Network',
      order: 7,
      active: true,
    },
    {
      title: 'Maintenance & Support',
      slug: 'maintenance-and-support',
      description:
        'Reliable technical support, updates, improvements and long-term maintenance.',
      icon: 'LifeBuoy',
      order: 8,
      active: true,
    },
  ];

  await Service.deleteMany({});
  await Service.insertMany(services);
  console.log('  Seeded services');
};

const seedProducts = async (): Promise<void> => {
  const products = [
    {
      name: 'Sampanna POS',
      slug: 'sampanna-pos',
      tagline:
        'Modern point-of-sale and business management for growing businesses.',
      description:
        'Sampanna POS is a modern point-of-sale and business management solution designed to simplify billing, inventory, sales tracking and business operations.',
      features: [
        'Billing',
        'Inventory Management',
        'Sales Reports',
        'Product Management',
        'Customer Management',
        'Order Management',
        'Multi-branch support',
        'Business insights',
      ],
      featured: true,
      active: true,
    },
  ];

  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('  Seeded products');
};

const seedProjects = async (): Promise<void> => {
  const projects = [
    {
      name: 'Retail Store POS Dashboard',
      slug: 'demo-retail-store-pos',
      category: 'POS System',
      description:
        'A demo project showing a point-of-sale dashboard for retail stores, including billing, inventory tracking and daily sales reporting.',
      technologies: ['Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
      isDemo: true,
      isFeatured: true,
      active: true,
    },
    {
      name: 'Business Website for a Service Company',
      slug: 'demo-business-website',
      category: 'Website',
      description:
        'A demo corporate website project featuring modern design, fast performance and SEO-optimized pages.',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      isDemo: true,
      isFeatured: true,
      active: true,
    },
    {
      name: 'E-commerce Store Platform',
      slug: 'demo-ecommerce-platform',
      category: 'E-commerce',
      description:
        'A demo e-commerce platform with product catalog, cart flow and order management features.',
      technologies: ['Next.js', 'Node.js', 'MongoDB'],
      isDemo: true,
      isFeatured: true,
      active: true,
    },
    {
      name: 'Restaurant Management System',
      slug: 'demo-restaurant-management-system',
      category: 'Business Software',
      description:
        'A demo business management project covering order handling, menu management and sales reporting for restaurants.',
      technologies: ['React', 'Express', 'MongoDB'],
      isDemo: true,
      isFeatured: false,
      active: true,
    },
  ];

  await Project.deleteMany({});
  await Project.insertMany(projects);
  console.log('  Seeded projects');
};

const seedBlogs = async (): Promise<void> => {
  const now = new Date();
  const blogs = [
    {
      title: 'Why Every Growing Business Needs a Modern Point-of-Sale System',
      slug: 'why-every-growing-business-needs-modern-pos-system',
      category: 'Business',
      excerpt:
        'Billing, inventory and sales tracking are at the heart of every business. Here is why modern POS software helps you stay organized and grow with confidence.',
      content:
        'Running a business involves more than selling products. You also need to track inventory, manage billing and understand how your sales are performing.\n\nA modern point-of-sale system brings these tasks together in one place. Instead of relying on notebooks, calculators or disconnected spreadsheets, you get a clear overview of your operations.\n\n**Billing made simple.**\nEvery sale can be recorded accurately, with printed receipts, digital records and multiple payment methods supported.\n\n**Inventory you can trust.**\nKnow what is in stock, what is running low and how fast products move, so you can reorder at the right time.\n\n**Reports that help you decide.**\nDaily, weekly and monthly sales reports show you where your business stands and where it is heading.\n\nFor businesses in Nepal and beyond, modern technology is no longer a luxury, it is a practical tool for staying competitive.',
      author: 'Sampanna Tech',
      tags: ['POS', 'Business Operations', 'Technology'],
      published: true,
      publishedAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
    },
    {
      title: 'How to Choose the Right Technology For Your Business',
      slug: 'how-to-choose-right-technology-for-your-business',
      category: 'Technology',
      excerpt:
        'Not every business needs the same tools. Learn how to evaluate technology choices based on your operations, budget and long-term goals.',
      content:
        'Technology decisions affect how your business works every single day. Choosing the right tools starts with understanding what you actually need.\n\n**Start with the problem, not the trend.**\nA new technology is only useful if it solves a real problem. List the tasks that take the most time, cost the most money or cause the most errors.\n\n**Think about the long term.**\nThe cheapest option today may become expensive later if it cannot grow with your business or be maintained easily.\n\n**Keep it simple.**\nThe best solution is often the one your team can actually use. Complicated systems quickly get abandoned.\n\nAt Sampanna Tech we help businesses evaluate these choices honestly, so the technology you adopt works for your goals.',
      author: 'Sampanna Tech',
      tags: ['Technology Strategy', 'Business Growth', 'Consulting'],
      published: true,
      publishedAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
    },
    {
      title: 'Digital Transformation: Where Most Businesses Should Start',
      slug: 'digital-transformation-where-most-businesses-should-start',
      category: 'Digital Transformation',
      excerpt:
        'Digital transformation sounds broad, but it starts with small practical steps. Here are the areas that bring the quickest value.',
      content:
        'Digital transformation does not mean replacing everything at once. It means using technology to make important parts of your business more effective.\n\n**Start with customer-facing systems.**\nWebsites, contact forms and online ordering are direct ways to serve customers better.\n\n**Digitize your records.**\nSales, inventory, customer and financial records become far more useful when they are searchable and organized.\n\n**Automate repetitive work.**\nInvoices, reports and reminders can often be automated, freeing your team for higher-value work.\n\nTake it one step at a time. Practical improvements, done well, build the foundation for larger changes later.',
      author: 'Sampanna Tech',
      tags: ['Digital Transformation', 'Business Software', 'Digital Solutions'],
      published: true,
      publishedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
    },
  ];

  await Blog.deleteMany({});
  await Blog.insertMany(blogs);
  console.log('  Seeded blogs');
};

const seedJobs = async (): Promise<void> => {
  await Job.deleteMany({});
  console.log('  No jobs seeded (open positions are managed through the admin)');
};

const seedSettings = async (): Promise<void> => {
  await SiteSettings.deleteMany({});
  await SiteSettings.create({
    companyName: 'Sampanna Tech',
    tagline: 'Technology That Helps Your Business Grow.',
    description:
      'Sampanna Tech builds modern websites, mobile applications, business software and digital solutions designed to help businesses work smarter, grow faster and operate efficiently.',
    location: 'Kathmandu, Nepal',
    stats: {
      projectsDelivered: 50,
      businessesServed: 20,
      yearsExperience: 5,
      support: '24/7',
    },
  });
  console.log('  Seeded site settings');
};

const seedAdmin = async (): Promise<void> => {
  const existing = await User.findOne({ email: 'admin@sampannatech.com' });
  if (existing) {
    console.log('  Admin user already exists, skipping');
    return;
  }

  const password = process.env.ADMIN_INITIAL_PASSWORD || 'ChangeMe123!';
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
    await seedBlogs();
    await seedJobs();
    await seedAdmin();

    console.log('Seeding complete.');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seed();