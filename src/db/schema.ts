import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { pgTable, text as pgText, integer as pgInteger } from 'drizzle-orm/pg-core';

const dbUrl = process.env.DATABASE_URL || 'file:local.db';
const isPostgres = dbUrl.startsWith('postgres://') || dbUrl.startsWith('postgresql://');

// --- SQLite Tables (Turso / Local DB) ---
export const sqliteLeads = sqliteTable('leads', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  highestQualification: text('highest_qualification').notNull(),
  targetDegree: text('target_degree').notNull(),
  preferredIntake: text('preferred_intake').notNull(),
  message: text('message'),
  createdAt: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
});

export const sqliteEnquiries = sqliteTable('enquiries', {
  id: text('id').primaryKey(),
  fullName: text('full_name').notNull(),
  whatsappNumber: text('whatsapp_number').notNull(),
  email: text('email'),
  highestQualification: text('highest_qualification'),
  targetDegree: text('target_degree'),
  preferredIntake: text('preferred_intake'),
  additionalNotes: text('additional_notes'),
  source: text('source').notNull().default('hero_form'), // hero_form | modal | service_enquiry | checklist | other
  status: text('status').notNull().default('new'), // new | follow_up | contacted | rejected | closed
  adminNotes: text('admin_notes'),
  followUpDate: text('follow_up_date'),
  destination: text('destination').notNull().default('Austria'),
  lastContactedAt: text('last_contacted_at'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const sqliteAdmins = sqliteTable('admins', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
  passwordHash: text('password_hash').notNull(),
  name: text('name').notNull(),
  role: text('role').notNull().default('Executive Advisor'),
  createdAt: text('created_at').notNull(),
});

export const sqliteUniversities = sqliteTable('universities', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  germanName: text('german_name').notNull(),
  city: text('city').notNull(),
  tuitionFee: text('tuition_fee').notNull(),
  ranking: text('ranking').notNull(),
  popularCourses: text('popular_courses').notNull(),
  imageUrl: text('image_url').notNull(),
  websiteUrl: text('website_url').notNull(),
  description: text('description').notNull(),
  isFeatured: integer('is_featured').notNull().default(1),
  displayOrder: integer('display_order').notNull().default(0),
});

export const sqliteTestimonials = sqliteTable('testimonials', {
  id: text('id').primaryKey(),
  studentName: text('student_name').notNull(),
  homeCity: text('home_city').notNull(),
  universityName: text('university_name').notNull(),
  course: text('course').notNull(),
  graduationYear: text('graduation_year').notNull(),
  quote: text('quote').notNull(),
  imageUrl: text('image_url').notNull(),
  visaApprovedDate: text('visa_approved_date').notNull(),
  rating: integer('rating').notNull().default(5),
});

export const sqliteFaqs = sqliteTable('faqs', {
  id: text('id').primaryKey(),
  category: text('category').notNull(),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  order: integer('order').notNull().default(0),
  isPublished: integer('is_published').notNull().default(1),
});

export const sqliteConsultations = sqliteTable('consultations', {
  id: text('id').primaryKey(),
  leadId: text('lead_id').notNull(),
  leadName: text('lead_name').notNull(),
  dateTime: text('date_time').notNull(),
  mode: text('mode').notNull().default('WhatsApp Call'), // WhatsApp Call | Zoom | In-Person Kochi
  notes: text('notes'),
  outcome: text('outcome'),
  status: text('status').notNull().default('scheduled'), // scheduled | completed | cancelled
  createdAt: text('created_at').notNull(),
});

export const sqliteServices = sqliteTable('services', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  highlights: text('highlights').notNull(), // JSON string array
  icon: text('icon').notNull(),
  displayOrder: integer('display_order').notNull().default(0),
  isActive: integer('is_active').notNull().default(1),
  createdAt: text('created_at').notNull(),
});

export const sqliteBlogPosts = sqliteTable('blog_posts', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  coverImage: text('cover_image').notNull(),
  author: text('author').notNull().default('FlyAustria Admissions Team'),
  status: text('status').notNull().default('published'), // draft | published
  publishedAt: text('published_at').notNull(),
  tags: text('tags').notNull().default('Study in Austria'),
  createdAt: text('created_at').notNull(),
});

export const sqliteSettings = sqliteTable('settings', {
  id: text('id').primaryKey(),
  key: text('key').notNull(),
  value: text('value').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const sqliteLeadStatusHistory = sqliteTable('lead_status_history', {
  id: text('id').primaryKey(),
  leadId: text('lead_id').notNull(),
  previousStatus: text('previous_status').notNull(),
  newStatus: text('new_status').notNull(),
  changedBy: text('changed_by').notNull().default('Admin Counselor'),
  createdAt: text('created_at').notNull(),
});

// --- Postgres Tables (Neon Serverless) ---
export const pgLeads = pgTable('leads', {
  id: pgText('id').primaryKey(),
  name: pgText('name').notNull(),
  phone: pgText('phone').notNull(),
  email: pgText('email').notNull(),
  highestQualification: pgText('highest_qualification').notNull(),
  targetDegree: pgText('target_degree').notNull(),
  preferredIntake: pgText('preferred_intake').notNull(),
  message: pgText('message'),
  createdAt: pgText('created_at').notNull().default('NOW()'),
});

export const pgEnquiries = pgTable('enquiries', {
  id: pgText('id').primaryKey(),
  fullName: pgText('full_name').notNull(),
  whatsappNumber: pgText('whatsapp_number').notNull(),
  email: pgText('email'),
  highestQualification: pgText('highest_qualification'),
  targetDegree: pgText('target_degree'),
  preferredIntake: pgText('preferred_intake'),
  additionalNotes: pgText('additional_notes'),
  source: pgText('source').notNull().default('hero_form'),
  status: pgText('status').notNull().default('new'),
  adminNotes: pgText('admin_notes'),
  followUpDate: pgText('follow_up_date'),
  destination: pgText('destination').notNull().default('Austria'),
  lastContactedAt: pgText('last_contacted_at'),
  createdAt: pgText('created_at').notNull(),
  updatedAt: pgText('updated_at').notNull(),
});

export const pgAdmins = pgTable('admins', {
  id: pgText('id').primaryKey(),
  email: pgText('email').notNull(),
  passwordHash: pgText('password_hash').notNull(),
  name: pgText('name').notNull(),
  role: pgText('role').notNull().default('Executive Advisor'),
  createdAt: pgText('created_at').notNull(),
});

export const pgUniversities = pgTable('universities', {
  id: pgText('id').primaryKey(),
  name: pgText('name').notNull(),
  germanName: pgText('german_name').notNull(),
  city: pgText('city').notNull(),
  tuitionFee: pgText('tuition_fee').notNull(),
  ranking: pgText('ranking').notNull(),
  popularCourses: pgText('popular_courses').notNull(),
  imageUrl: pgText('image_url').notNull(),
  websiteUrl: pgText('website_url').notNull(),
  description: pgText('description').notNull(),
  isFeatured: pgInteger('is_featured').notNull().default(1),
  displayOrder: pgInteger('display_order').notNull().default(0),
});

export const pgTestimonials = pgTable('testimonials', {
  id: pgText('id').primaryKey(),
  studentName: pgText('student_name').notNull(),
  homeCity: pgText('home_city').notNull(),
  universityName: pgText('university_name').notNull(),
  course: pgText('course').notNull(),
  graduationYear: pgText('graduation_year').notNull(),
  quote: pgText('quote').notNull(),
  imageUrl: pgText('image_url').notNull(),
  visaApprovedDate: pgText('visa_approved_date').notNull(),
  rating: pgInteger('rating').notNull().default(5),
});

export const pgFaqs = pgTable('faqs', {
  id: pgText('id').primaryKey(),
  category: pgText('category').notNull(),
  question: pgText('question').notNull(),
  answer: pgText('answer').notNull(),
  order: pgInteger('order').notNull().default(0),
  isPublished: pgInteger('is_published').notNull().default(1),
});

export const pgConsultations = pgTable('consultations', {
  id: pgText('id').primaryKey(),
  leadId: pgText('lead_id').notNull(),
  leadName: pgText('lead_name').notNull(),
  dateTime: pgText('date_time').notNull(),
  mode: pgText('mode').notNull().default('WhatsApp Call'),
  notes: pgText('notes'),
  outcome: pgText('outcome'),
  status: pgText('status').notNull().default('scheduled'),
  createdAt: pgText('created_at').notNull(),
});

export const pgServices = pgTable('services', {
  id: pgText('id').primaryKey(),
  title: pgText('title').notNull(),
  description: pgText('description').notNull(),
  highlights: pgText('highlights').notNull(),
  icon: pgText('icon').notNull(),
  displayOrder: pgInteger('display_order').notNull().default(0),
  isActive: pgInteger('is_active').notNull().default(1),
  createdAt: pgText('created_at').notNull(),
});

export const pgBlogPosts = pgTable('blog_posts', {
  id: pgText('id').primaryKey(),
  title: pgText('title').notNull(),
  slug: pgText('slug').notNull(),
  excerpt: pgText('excerpt').notNull(),
  content: pgText('content').notNull(),
  coverImage: pgText('cover_image').notNull(),
  author: pgText('author').notNull().default('FlyAustria Admissions Team'),
  status: pgText('status').notNull().default('published'),
  publishedAt: pgText('published_at').notNull(),
  tags: pgText('tags').notNull().default('Study in Austria'),
  createdAt: pgText('created_at').notNull(),
});

export const pgSettings = pgTable('settings', {
  id: pgText('id').primaryKey(),
  key: pgText('key').notNull(),
  value: pgText('value').notNull(),
  updatedAt: pgText('updated_at').notNull(),
});

export const pgLeadStatusHistory = pgTable('lead_status_history', {
  id: pgText('id').primaryKey(),
  leadId: pgText('lead_id').notNull(),
  previousStatus: pgText('previous_status').notNull(),
  newStatus: pgText('new_status').notNull(),
  changedBy: pgText('changed_by').notNull().default('Admin Counselor'),
  createdAt: pgText('created_at').notNull(),
});

// Uniform exported schema binding based on DATABASE_URL format
export const leads = isPostgres ? pgLeads : sqliteLeads;
export const enquiries = isPostgres ? pgEnquiries : sqliteEnquiries;
export const admins = isPostgres ? pgAdmins : sqliteAdmins;
export const universities = isPostgres ? pgUniversities : sqliteUniversities;
export const testimonials = isPostgres ? pgTestimonials : sqliteTestimonials;
export const faqs = isPostgres ? pgFaqs : sqliteFaqs;
export const consultations = isPostgres ? pgConsultations : sqliteConsultations;
export const services = isPostgres ? pgServices : sqliteServices;
export const blogPosts = isPostgres ? pgBlogPosts : sqliteBlogPosts;
export const settings = isPostgres ? pgSettings : sqliteSettings;
export const leadStatusHistory = isPostgres ? pgLeadStatusHistory : sqliteLeadStatusHistory;

export type Lead = typeof leads.$inferSelect;
export type Enquiry = typeof enquiries.$inferSelect;
export type Admin = typeof admins.$inferSelect;
export type University = typeof universities.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type FAQ = typeof faqs.$inferSelect;
export type Consultation = typeof consultations.$inferSelect;
export type Service = typeof services.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type Setting = typeof settings.$inferSelect;
export type LeadStatusHistory = typeof leadStatusHistory.$inferSelect;
