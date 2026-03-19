import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Pool } from 'pg';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'data');
const USERS_FILE = join(DATA_DIR, 'users.json');

export const DEFAULT_PREFERENCES = {
  navbarColor: null,
  footerColor: null,
  backgroundColor: null,
  homeImageUrl: null,
  aboutImageUrl: null,
};

const DATABASE_URL = stripEnv(process.env.DATABASE_URL);
const STORAGE_MODE = DATABASE_URL ? 'postgres' : 'json';

let pool = null;

function stripEnv(value) {
  if (value == null || value === '') return '';
  return String(value).trim().replace(/^["']|["']$/g, '');
}

function shouldUseSsl() {
  if (!DATABASE_URL) return false;
  const sslMode = stripEnv(process.env.PGSSLMODE).toLowerCase();
  return sslMode !== 'disable';
}

function normalizeRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.passwordHash,
    name: row.name,
    role: row.role || 'owner',
    createdAt: row.createdAt,
    preferences: {
      ...DEFAULT_PREFERENCES,
      navbarColor: row.navbarColor ?? null,
      footerColor: row.footerColor ?? null,
      backgroundColor: row.backgroundColor ?? null,
      homeImageUrl: row.homeImageUrl ?? null,
      aboutImageUrl: row.aboutImageUrl ?? null,
    },
  };
}

async function ensureDataDir() {
  await mkdir(DATA_DIR, { recursive: true });
}

async function readUsersFile() {
  try {
    const raw = await readFile(USERS_FILE, 'utf-8');
    const data = JSON.parse(raw);
    return Array.isArray(data.users) ? data.users : [];
  } catch {
    return [];
  }
}

async function writeUsersFile(users) {
  await ensureDataDir();
  await writeFile(USERS_FILE, JSON.stringify({ users }, null, 2), 'utf-8');
}

async function createPool() {
  if (!DATABASE_URL) return null;
  if (pool) return pool;
  pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: shouldUseSsl() ? { rejectUnauthorized: false } : undefined,
  });
  return pool;
}

async function initializePostgres() {
  const client = await createPool();
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'owner',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await client.query(`
    CREATE TABLE IF NOT EXISTS user_settings (
      user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
      navbar_color TEXT,
      footer_color TEXT,
      background_color TEXT,
      home_image_url TEXT,
      about_image_url TEXT,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

async function migrateJsonUsersToPostgres() {
  const count = await getUsersCount();
  if (count > 0) return;

  const legacyUsers = await readUsersFile();
  if (legacyUsers.length === 0) return;

  const client = await createPool();
  for (const user of legacyUsers) {
    await client.query(
      `
        INSERT INTO users (id, email, password_hash, name, role, created_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (email) DO NOTHING
      `,
      [
        user.id,
        String(user.email || '').toLowerCase(),
        user.passwordHash,
        user.name || String(user.email || '').split('@')[0] || 'owner',
        user.role || 'owner',
        user.createdAt || new Date().toISOString(),
      ]
    );

    const preferences = { ...DEFAULT_PREFERENCES, ...(user.preferences || {}) };
    await client.query(
      `
        INSERT INTO user_settings (
          user_id,
          navbar_color,
          footer_color,
          background_color,
          home_image_url,
          about_image_url,
          updated_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, NOW())
        ON CONFLICT (user_id) DO UPDATE SET
          navbar_color = EXCLUDED.navbar_color,
          footer_color = EXCLUDED.footer_color,
          background_color = EXCLUDED.background_color,
          home_image_url = EXCLUDED.home_image_url,
          about_image_url = EXCLUDED.about_image_url,
          updated_at = NOW()
      `,
      [
        user.id,
        preferences.navbarColor,
        preferences.footerColor,
        preferences.backgroundColor,
        preferences.homeImageUrl,
        preferences.aboutImageUrl,
      ]
    );
  }
}

export async function initializeStorage() {
  if (STORAGE_MODE !== 'postgres') return;
  await initializePostgres();
  await migrateJsonUsersToPostgres();
}

export function getStorageMode() {
  return STORAGE_MODE;
}

export async function getUsersCount() {
  if (STORAGE_MODE === 'postgres') {
    const client = await createPool();
    const result = await client.query('SELECT COUNT(*)::int AS count FROM users');
    return result.rows[0]?.count || 0;
  }
  const users = await readUsersFile();
  return users.length;
}

export async function findUserByEmail(email) {
  const emailNorm = String(email || '').trim().toLowerCase();
  if (!emailNorm) return null;

  if (STORAGE_MODE === 'postgres') {
    const client = await createPool();
    const result = await client.query(
      `
        SELECT
          u.id,
          u.email,
          u.password_hash AS "passwordHash",
          u.name,
          u.role,
          u.created_at AS "createdAt",
          s.navbar_color AS "navbarColor",
          s.footer_color AS "footerColor",
          s.background_color AS "backgroundColor",
          s.home_image_url AS "homeImageUrl",
          s.about_image_url AS "aboutImageUrl"
        FROM users u
        LEFT JOIN user_settings s ON s.user_id = u.id
        WHERE u.email = $1
        LIMIT 1
      `,
      [emailNorm]
    );
    return normalizeRow(result.rows[0]);
  }

  const users = await readUsersFile();
  const user = users.find((item) => String(item.email || '').toLowerCase() === emailNorm);
  return user
    ? {
        ...user,
        preferences: { ...DEFAULT_PREFERENCES, ...(user.preferences || {}) },
      }
    : null;
}

export async function findUserById(userId) {
  if (!userId) return null;

  if (STORAGE_MODE === 'postgres') {
    const client = await createPool();
    const result = await client.query(
      `
        SELECT
          u.id,
          u.email,
          u.password_hash AS "passwordHash",
          u.name,
          u.role,
          u.created_at AS "createdAt",
          s.navbar_color AS "navbarColor",
          s.footer_color AS "footerColor",
          s.background_color AS "backgroundColor",
          s.home_image_url AS "homeImageUrl",
          s.about_image_url AS "aboutImageUrl"
        FROM users u
        LEFT JOIN user_settings s ON s.user_id = u.id
        WHERE u.id = $1
        LIMIT 1
      `,
      [userId]
    );
    return normalizeRow(result.rows[0]);
  }

  const users = await readUsersFile();
  const user = users.find((item) => item.id === userId);
  return user
    ? {
        ...user,
        preferences: { ...DEFAULT_PREFERENCES, ...(user.preferences || {}) },
      }
    : null;
}

export async function ensureOwnerAccount({ ownerEmail, ownerPassword }) {
  if (!ownerEmail || !ownerPassword) {
    console.log('Owner not created: set OWNER_EMAIL and OWNER_PASSWORD in environment variables');
    return;
  }
  if (ownerPassword.length < 6) {
    console.log(`Owner not created: OWNER_PASSWORD must be at least 6 characters (current length: ${ownerPassword.length})`);
    return;
  }

  const usersCount = await getUsersCount();
  if (usersCount > 0) {
    console.log('Owner already exists. Users in storage:', usersCount);
    return;
  }

  const owner = {
    id: crypto.randomUUID(),
    email: ownerEmail,
    passwordHash: await bcrypt.hash(ownerPassword, 10),
    name: ownerEmail.split('@')[0] || 'owner',
    role: 'owner',
    createdAt: new Date().toISOString(),
    preferences: { ...DEFAULT_PREFERENCES },
  };

  if (STORAGE_MODE === 'postgres') {
    const client = await createPool();
    await client.query(
      `
        INSERT INTO users (id, email, password_hash, name, role, created_at)
        VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [owner.id, owner.email, owner.passwordHash, owner.name, owner.role, owner.createdAt]
    );
    await client.query(
      `
        INSERT INTO user_settings (
          user_id,
          navbar_color,
          footer_color,
          background_color,
          home_image_url,
          about_image_url,
          updated_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, NOW())
      `,
      [
        owner.id,
        owner.preferences.navbarColor,
        owner.preferences.footerColor,
        owner.preferences.backgroundColor,
        owner.preferences.homeImageUrl,
        owner.preferences.aboutImageUrl,
      ]
    );
  } else {
    await writeUsersFile([owner]);
  }

  console.log('Owner account created for', ownerEmail);
}

export async function loadUserSettings(userId) {
  const user = await findUserById(userId);
  return user ? { ...DEFAULT_PREFERENCES, ...(user.preferences || {}) } : null;
}

export async function saveUserSettings(userId, preferences) {
  const sanitized = { ...DEFAULT_PREFERENCES, ...(preferences || {}) };

  if (STORAGE_MODE === 'postgres') {
    const client = await createPool();
    await client.query(
      `
        INSERT INTO user_settings (
          user_id,
          navbar_color,
          footer_color,
          background_color,
          home_image_url,
          about_image_url,
          updated_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, NOW())
        ON CONFLICT (user_id) DO UPDATE SET
          navbar_color = EXCLUDED.navbar_color,
          footer_color = EXCLUDED.footer_color,
          background_color = EXCLUDED.background_color,
          home_image_url = EXCLUDED.home_image_url,
          about_image_url = EXCLUDED.about_image_url,
          updated_at = NOW()
      `,
      [
        userId,
        sanitized.navbarColor,
        sanitized.footerColor,
        sanitized.backgroundColor,
        sanitized.homeImageUrl,
        sanitized.aboutImageUrl,
      ]
    );
    return sanitized;
  }

  const users = await readUsersFile();
  const index = users.findIndex((item) => item.id === userId);
  if (index === -1) return null;
  users[index].preferences = {
    ...DEFAULT_PREFERENCES,
    ...(users[index].preferences || {}),
    ...sanitized,
  };
  await writeUsersFile(users);
  return users[index].preferences;
}