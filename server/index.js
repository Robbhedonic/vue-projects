import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, 'data');
const USERS_FILE = join(DATA_DIR, 'users.json');
const UPLOADS_DIR = join(__dirname, 'uploads');

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';
function stripEnv(value) {
  if (value == null || value === '') return '';
  const s = String(value).trim();
  return s.replace(/^["']|["']$/g, '');
}
const OWNER_EMAIL = stripEnv(process.env.OWNER_EMAIL)?.toLowerCase() || '';
const OWNER_PASSWORD = stripEnv(process.env.OWNER_PASSWORD) || '';
const PORT = Number(process.env.PORT) || 3000;

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

async function ensureUploadsDir() {
  await mkdir(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    ensureUploadsDir().then(() => cb(null, UPLOADS_DIR)).catch(cb);
  },
  filename: (_req, file, cb) => {
    const ext = (file.mimetype === 'image/jpeg' ? '.jpg' : file.mimetype === 'image/png' ? '.png' : file.mimetype === 'image/webp' ? '.webp' : '.img');
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${ext}`;
    cb(null, name);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ok = /^image\/(jpeg|png|webp|gif)$/.test(file.mimetype);
    cb(null, ok);
  },
});

app.use('/uploads', express.static(UPLOADS_DIR));

async function ensureDataDir() {
  await mkdir(DATA_DIR, { recursive: true });
}

async function readUsers() {
  try {
    const raw = await readFile(USERS_FILE, 'utf-8');
    const data = JSON.parse(raw);
    return Array.isArray(data.users) ? data.users : [];
  } catch {
    return [];
  }
}

async function writeUsers(users) {
  await ensureDataDir();
  await writeFile(USERS_FILE, JSON.stringify({ users }, null, 2), 'utf-8');
}

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// Create owner account on first run (only account allowed)
async function ensureOwner() {
  try {
    if (!OWNER_EMAIL || !OWNER_PASSWORD) {
      console.log('Owner not created: set OWNER_EMAIL and OWNER_PASSWORD in server/.env');
      return;
    }
    if (OWNER_PASSWORD.length < 6) {
      console.log('Owner not created: OWNER_PASSWORD must be at least 6 characters (current length: ' + OWNER_PASSWORD.length + ')');
      return;
    }
    const users = await readUsers();
    if (users.length > 0) {
      console.log('Owner already exists. Users in DB:', users.length);
      return;
    }
    const hash = await bcrypt.hash(OWNER_PASSWORD, 10);
    const owner = {
      id: crypto.randomUUID(),
      email: OWNER_EMAIL,
      passwordHash: hash,
      name: OWNER_EMAIL.split('@')[0],
      createdAt: new Date().toISOString(),
      preferences: {},
    };
    await writeUsers([owner]);
    console.log('Owner account created for', OWNER_EMAIL);
  } catch (err) {
    console.error('ensureOwner error:', err);
    throw err;
  }
}

// Health check (to verify backend is reachable)
app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

// Setup status: is owner configured and does the account exist?
app.get('/api/setup-status', async (_req, res) => {
  try {
    const users = await readUsers();
    res.json({
      ownerConfigured: !!(OWNER_EMAIL && OWNER_PASSWORD && OWNER_PASSWORD.length >= 6),
      usersCount: users.length,
    });
  } catch (err) {
    console.error('setup-status error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Registration disabled: login is owner-only
app.post('/api/auth/register', (_req, res) => {
  res.status(403).json({ error: 'Registration is disabled' });
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  const sendError = (code, msg) => {
    if (!res.headersSent) res.status(code).json({ error: msg });
  };
  try {
    const { email, password } = req.body || {};
    const emailNorm = String(email ?? '').trim().toLowerCase();
    const passwordStr = String(password ?? '');

    if (!emailNorm || !passwordStr) {
      return sendError(400, 'Email and password are required');
    }

    const users = await readUsers();
    const user = users.find((u) => u.email.toLowerCase() === emailNorm);
    if (!user) {
      return sendError(401, 'Invalid email or password');
    }

    const hash = user.passwordHash;
    if (!hash || typeof hash !== 'string') {
      console.error('Login: user has no passwordHash', user.email);
      return sendError(500, 'Account error. Delete server/data folder and restart server to recreate your account.');
    }

    let match = false;
    try {
      match = await bcrypt.compare(passwordStr, hash);
    } catch (err) {
      console.error('Login: bcrypt.compare failed', err.message);
      return sendError(500, 'Account error. Delete server/data folder and restart server to recreate your account.');
    }

    if (!match) {
      return sendError(401, 'Invalid email or password');
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    if (!res.headersSent) {
      return res.json({
        token,
        user: { id: user.id, email: user.email, name: user.name },
      });
    }
  } catch (err) {
    console.error('Login error (full):', err?.stack || err);
    if (!res.headersSent) {
      res.status(500).json({ error: err?.message || 'Login failed' });
    }
  }
});

// GET /api/me (protected)
app.get('/api/me', authMiddleware, async (req, res) => {
  const users = await readUsers();
  const user = users.find((u) => u.id === req.user.sub);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({ user: { id: user.id, email: user.email, name: user.name } });
});

const DEFAULT_PREFERENCES = {
  navbarColor: null,
  footerColor: null,
  backgroundColor: null,
  homeImageUrl: null,
  aboutImageUrl: null,
};

function sanitizePreferences(body) {
  const prefs = { ...DEFAULT_PREFERENCES };
  if (body == null || typeof body !== 'object') return prefs;
  if (typeof body.navbarColor === 'string' && body.navbarColor.trim()) prefs.navbarColor = body.navbarColor.trim().slice(0, 50);
  if (typeof body.footerColor === 'string' && body.footerColor.trim()) prefs.footerColor = body.footerColor.trim().slice(0, 50);
  if (typeof body.backgroundColor === 'string' && body.backgroundColor.trim()) prefs.backgroundColor = body.backgroundColor.trim().slice(0, 50);
  if (typeof body.homeImageUrl === 'string' && body.homeImageUrl.trim()) prefs.homeImageUrl = body.homeImageUrl.trim().slice(0, 2048);
  if (typeof body.aboutImageUrl === 'string' && body.aboutImageUrl.trim()) prefs.aboutImageUrl = body.aboutImageUrl.trim().slice(0, 2048);
  if (body.navbarColor === '' || body.navbarColor === null) prefs.navbarColor = null;
  if (body.footerColor === '' || body.footerColor === null) prefs.footerColor = null;
  if (body.backgroundColor === '' || body.backgroundColor === null) prefs.backgroundColor = null;
  if (body.homeImageUrl === '' || body.homeImageUrl === null) prefs.homeImageUrl = null;
  if (body.aboutImageUrl === '' || body.aboutImageUrl === null) prefs.aboutImageUrl = null;
  return prefs;
}

// GET /api/me/settings (protected)
app.get('/api/me/settings', authMiddleware, async (req, res) => {
  try {
    const users = await readUsers();
    const user = users.find((u) => u.id === req.user.sub);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const prefs = { ...DEFAULT_PREFERENCES, ...(user.preferences || {}) };
    res.json({ settings: prefs });
  } catch (err) {
    console.error('GET settings error:', err);
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/me/settings (protected)
app.put('/api/me/settings', authMiddleware, async (req, res) => {
  try {
    const users = await readUsers();
    const idx = users.findIndex((u) => u.id === req.user.sub);
    if (idx === -1) return res.status(404).json({ error: 'User not found' });
    const updated = sanitizePreferences(req.body);
    users[idx].preferences = { ...(users[idx].preferences || {}), ...updated };
    await writeUsers(users);
    res.json({ settings: users[idx].preferences });
  } catch (err) {
    console.error('PUT settings error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/me/upload (protected) — upload image, returns { path: '/uploads/...' }
app.post('/api/me/upload', authMiddleware, (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') return res.status(400).json({ error: 'File too large (max 5MB)' });
      if (err.message) return res.status(400).json({ error: err.message });
      return res.status(500).json({ error: 'Upload failed' });
    }
    if (!req.file) return res.status(400).json({ error: 'No file' });
    res.json({ path: '/uploads/' + req.file.filename });
  });
});

// Catch any unhandled errors in routes
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

ensureOwner()
  .then(async () => {
    const users = await readUsers();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      console.log(`Owner configured: ${OWNER_EMAIL ? 'yes' : 'no'}. Users in DB: ${users.length}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start:', err);
    process.exit(1);
  });
