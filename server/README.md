# Zema Backend (minimal)

This is a minimal Express backend used for local development and to provide demo API endpoints for the Zema frontend.

Run (from `server/`):

```powershell
npm install
npm run start
```

The server will listen on `http://localhost:4000` by default.

Available endpoints:

- `GET /api/health` — health check
- `GET /api/songs` — list songs (query `q` for simple search)
- `GET /api/songs/:id` — get a single song
- `GET /api/artists` — list artists
- `GET /api/playlists` — list playlists
- `GET /api/search?q=term` — search songs/artists/playlists

If you'd like, I can now update the frontend to fetch from these endpoints and adapt the dev proxy in `vite.config.ts`.
