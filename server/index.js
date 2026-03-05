import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, 'data');
const USERS_FILE = join(DATA_DIR, 'users.json');

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
