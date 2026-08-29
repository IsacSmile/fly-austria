import { drizzle as drizzleLibsql } from 'drizzle-orm/libsql';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import { createClient } from '@libsql/client';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

const dbUrl = process.env.DATABASE_URL || 'file:local.db';
const authToken = process.env.TURSO_AUTH_TOKEN;

const isPostgres = dbUrl.startsWith('postgres://') || dbUrl.startsWith('postgresql://');

function getDbInstance() {
  if (isPostgres) {
    const sql = neon(dbUrl);
    return drizzleNeon(sql, { schema });
  } else {
    const client = createClient({
      url: dbUrl,
      authToken: authToken || undefined,
    });

    // Auto-create SQLite tables if local file
    if (!dbUrl.startsWith('libsql://')) {
      try {
        client.executeMultiple(`
          CREATE TABLE IF NOT EXISTS enquiries (
            id TEXT PRIMARY KEY,
            full_name TEXT NOT NULL,
            whatsapp_number TEXT NOT NULL,
            email TEXT,
            highest_qualification TEXT,
            target_degree TEXT,
            preferred_intake TEXT,
            additional_notes TEXT,
            source TEXT NOT NULL DEFAULT 'hero_form',
            status TEXT NOT NULL DEFAULT 'new',
            admin_notes TEXT,
            follow_up_date TEXT,
            destination TEXT NOT NULL DEFAULT 'Austria',
            last_contacted_at TEXT,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
          );
          CREATE TABLE IF NOT EXISTS admins (
            id TEXT PRIMARY KEY,
            email TEXT NOT NULL,
            password_hash TEXT NOT NULL,
            name TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'Executive Advisor',
            created_at TEXT NOT NULL
          );
          CREATE TABLE IF NOT EXISTS universities (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            german_name TEXT NOT NULL,
            city TEXT NOT NULL,
            tuition_fee TEXT NOT NULL,
            ranking TEXT NOT NULL,
            popular_courses TEXT NOT NULL,
            image_url TEXT NOT NULL,
            website_url TEXT NOT NULL,
            description TEXT NOT NULL,
            is_featured INTEGER NOT NULL DEFAULT 1,
            display_order INTEGER NOT NULL DEFAULT 0
          );
          CREATE TABLE IF NOT EXISTS testimonials (
            id TEXT PRIMARY KEY,
            student_name TEXT NOT NULL,
            home_city TEXT NOT NULL,
            university_name TEXT NOT NULL,
            course TEXT NOT NULL,
            graduation_year TEXT NOT NULL,
            quote TEXT NOT NULL,
            image_url TEXT NOT NULL,
            visa_approved_date TEXT NOT NULL,
            rating INTEGER NOT NULL DEFAULT 5
          );
          CREATE TABLE IF NOT EXISTS consultations (
            id TEXT PRIMARY KEY,
            lead_id TEXT NOT NULL,
            lead_name TEXT NOT NULL,
            date_time TEXT NOT NULL,
            mode TEXT NOT NULL DEFAULT 'WhatsApp Call',
            notes TEXT,
            outcome TEXT,
            status TEXT NOT NULL DEFAULT 'scheduled',
            created_at TEXT NOT NULL
          );
          CREATE TABLE IF NOT EXISTS services (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            highlights TEXT NOT NULL,
            icon TEXT NOT NULL,
            display_order INTEGER NOT NULL DEFAULT 0,
            is_active INTEGER NOT NULL DEFAULT 1,
            created_at TEXT NOT NULL
          );
          CREATE TABLE IF NOT EXISTS blog_posts (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            slug TEXT NOT NULL,
            excerpt TEXT NOT NULL,
            content TEXT NOT NULL,
            cover_image TEXT NOT NULL,
            author TEXT NOT NULL DEFAULT 'FlyAustria Admissions Team',
            status TEXT NOT NULL DEFAULT 'published',
            published_at TEXT NOT NULL DEFAULT '2026-08-29',
            tags TEXT NOT NULL DEFAULT 'Study in Austria',
            created_at TEXT NOT NULL
          );
          CREATE TABLE IF NOT EXISTS settings (
            id TEXT PRIMARY KEY,
            key TEXT NOT NULL,
            value TEXT NOT NULL,
            updated_at TEXT NOT NULL
          );
          CREATE TABLE IF NOT EXISTS faqs (
            id TEXT PRIMARY KEY,
            category TEXT NOT NULL,
            question TEXT NOT NULL,
            answer TEXT NOT NULL,
            "order" INTEGER NOT NULL DEFAULT 0,
            is_published INTEGER NOT NULL DEFAULT 1
          );
        `).catch(() => {});
      } catch (e) {}
    }

    return drizzleLibsql(client, { schema });
  }
}

export const db = getDbInstance() as any;
export { isPostgres, schema };
export * from './schema';
