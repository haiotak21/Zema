const express = require("express");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const DATA_PATH = path.join(__dirname, "data.json");
let DATA = require(DATA_PATH);

const JWT_SECRET = process.env.JWT_SECRET || "dev_jwt_secret";

// Ensure users array exists and create a demo admin if missing
if (!Array.isArray(DATA.users)) DATA.users = [];
const ensureAdmin = () => {
  const adminEmail = "zemasupport@contact.com";
  const existing = DATA.users.find((u) => u.email === adminEmail);
  if (!existing) {
    const hashed = bcrypt.hashSync("zema#000", 10);
    const admin = {
      id: "admin-1",
      name: "Zema Administrator",
      email: adminEmail,
      role: "ADMIN",
      avatar: "https://picsum.photos/seed/admin/100",
      passwordHash: hashed,
    };
    DATA.users.push(admin);
  }
};

ensureAdmin();

const persistData = () => {
  try {
    const fs = require("fs");
    fs.writeFileSync(DATA_PATH, JSON.stringify(DATA, null, 2));
  } catch (err) {
    console.warn("Could not persist data.json:", err.message);
  }
};

// Simple auth middleware
const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer "))
    return res.status(401).json({ error: "Unauthorized" });
  const token = auth.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Auth: register
app.post("/api/auth/register", (req, res) => {
  const { name, email, password, avatar, extra, requestedRole } = req.body;
  if (!email || !password || !name)
    return res.status(400).json({ error: "Missing fields" });
  const exists = DATA.users.find((u) => u.email === email.toLowerCase());
  if (exists) return res.status(409).json({ error: "User already exists" });
  const passwordHash = bcrypt.hashSync(password, 10);
  const newUser = {
    id: `u-${Date.now()}`,
    name,
    email: email.toLowerCase(),
    // Always create regular listeners via public registration to avoid client-side role injection.
    role: "LISTENER",
    avatar:
      avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    passwordHash,
  };

  // If the registrant requests an artist account, create a pending artist request
  // We DO NOT set role to ARTIST here. Admin must approve.
  if (requestedRole === "ARTIST") {
    newUser.pendingArtist = true;
    // Store any artist-specific info separately so it's reviewable by admins
    newUser.pendingArtistInfo = extra || {};
  } else {
    // Public listener extra data
    Object.assign(newUser, extra || {});
  }
  DATA.users.push(newUser);
  persistData();
  const payload = { id: newUser.id, email: newUser.email, role: newUser.role };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
  const userOut = { ...newUser };
  delete userOut.passwordHash;
  res.json({ user: userOut, token });
});

// Auth: login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Missing fields" });
  const user = DATA.users.find((u) => u.email === email.toLowerCase());
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  const ok = bcrypt.compareSync(password, user.passwordHash || "");
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });
  const payload = { id: user.id, email: user.email, role: user.role };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
  const userOut = { ...user };
  delete userOut.passwordHash;
  res.json({ user: userOut, token });
});

// Current user
app.get("/api/me", authMiddleware, (req, res) => {
  const u = DATA.users.find(
    (x) => x.id === req.user.id || x.email === req.user.email
  );
  if (!u) return res.status(404).json({ error: "Not found" });
  const userOut = { ...u };
  delete userOut.passwordHash;
  res.json({ user: userOut });
});

// Admin: promote user role
app.post("/api/admin/promote", authMiddleware, (req, res) => {
  // Only admins can promote
  if (!req.user || req.user.role !== "ADMIN")
    return res.status(403).json({ error: "Forbidden" });
  const { email, role } = req.body;
  if (!email || !role) return res.status(400).json({ error: "Missing fields" });
  const validRoles = ["LISTENER", "ARTIST", "ADMIN"];
  if (!validRoles.includes(role))
    return res.status(400).json({ error: "Invalid role" });
  const user = DATA.users.find(
    (u) => u.email === email.toLowerCase() || u.id === email
  );
  if (!user) return res.status(404).json({ error: "User not found" });
  user.role = role;
  persistData();
  const userOut = { ...user };
  delete userOut.passwordHash;
  res.json({ user: userOut });
});

// Admin: list users
app.get("/api/admin/users", authMiddleware, (req, res) => {
  if (!req.user || req.user.role !== "ADMIN")
    return res.status(403).json({ error: "Forbidden" });
  const usersOut = (DATA.users || []).map((u) => {
    const copy = { ...u };
    delete copy.passwordHash;
    return copy;
  });
  res.json({ users: usersOut });
});

// Admin: list pending artist requests
app.get("/api/admin/artist-requests", authMiddleware, (req, res) => {
  if (!req.user || req.user.role !== "ADMIN")
    return res.status(403).json({ error: "Forbidden" });
  const requests = (DATA.users || [])
    .filter((u) => u.pendingArtist)
    .map((u) => {
      const copy = { ...u };
      delete copy.passwordHash;
      return copy;
    });
  res.json({ requests });
});

// Admin: approve artist request
app.post("/api/admin/artist-requests/approve", authMiddleware, (req, res) => {
  if (!req.user || req.user.role !== "ADMIN")
    return res.status(403).json({ error: "Forbidden" });
  const { id, email } = req.body;
  if (!id && !email) return res.status(400).json({ error: "Missing fields" });
  const user = DATA.users.find(
    (u) => u.id === id || u.email === (email || "").toLowerCase()
  );
  if (!user) return res.status(404).json({ error: "User not found" });
  if (!user.pendingArtist)
    return res.status(400).json({ error: "No pending artist request" });
  user.role = "ARTIST";
  user.pendingArtist = false;
  // Move pendingArtistInfo into profile (if any)
  if (user.pendingArtistInfo) {
    user.stageName = user.pendingArtistInfo.stageName || user.stageName;
    user.bio = user.pendingArtistInfo.bio || user.bio;
    user.primaryGenre =
      user.pendingArtistInfo.primaryGenre || user.primaryGenre;
    delete user.pendingArtistInfo;
  }
  persistData();
  const userOut = { ...user };
  delete userOut.passwordHash;
  res.json({ user: userOut });
});

// Admin: reject artist request
app.post("/api/admin/artist-requests/reject", authMiddleware, (req, res) => {
  if (!req.user || req.user.role !== "ADMIN")
    return res.status(403).json({ error: "Forbidden" });
  const { id, email } = req.body;
  if (!id && !email) return res.status(400).json({ error: "Missing fields" });
  const user = DATA.users.find(
    (u) => u.id === id || u.email === (email || "").toLowerCase()
  );
  if (!user) return res.status(404).json({ error: "User not found" });
  if (!user.pendingArtist)
    return res.status(400).json({ error: "No pending artist request" });
  // Clear pending fields but keep user as listener
  user.pendingArtist = false;
  delete user.pendingArtistInfo;
  persistData();
  res.json({ ok: true });
});

// Existing public endpoints
app.get("/api/songs", (req, res) => {
  const { q } = req.query;
  let songs = DATA.songs || [];
  if (q && q.toString().trim()) {
    const ql = q.toString().toLowerCase();
    songs = songs.filter((s) =>
      (s.title + " " + s.artist).toLowerCase().includes(ql)
    );
  }
  res.json(songs);
});

app.get("/api/songs/:id", (req, res) => {
  const song = (DATA.songs || []).find((s) => s.id === req.params.id);
  if (!song) return res.status(404).json({ error: "Not found" });
  res.json(song);
});

app.get("/api/artists", (req, res) => {
  res.json(DATA.artists || []);
});

app.get("/api/playlists", (req, res) => {
  res.json(DATA.playlists || []);
});

app.get("/api/search", (req, res) => {
  const q = (req.query.q || "").toString().toLowerCase();
  if (!q) return res.json({ songs: [], artists: [], playlists: [] });
  const songs = (DATA.songs || []).filter((s) =>
    (s.title + " " + s.artist).toLowerCase().includes(q)
  );
  const artists = (DATA.artists || []).filter((a) =>
    a.name.toLowerCase().includes(q)
  );
  const playlists = (DATA.playlists || []).filter((p) =>
    p.title.toLowerCase().includes(q)
  );
  res.json({ songs, artists, playlists });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Zema backend running on http://localhost:${PORT}`);
});
