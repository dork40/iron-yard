# High Noon Authority Service

This is a deployable TURN credential issuer and authority-round foundation. It also hosts the live Iron Yard private 1v1 arena WebSocket. Arena rooms are in memory and browser sockets are origin-checked but not identity-authenticated, so it needs durable storage, identity verification, abuse controls, and observability before competitive/ranked use.

## Deploy

1. Create a separate Node/Docker service on Render, Fly.io, Railway, or another long-running WebSocket-capable container host. Do not deploy this WebSocket service to Vercel, a static host, or a Vercel function runtime. Vercel can host only the frontend.
2. Copy `.env.example` values into the host secret settings. Generate `TURN_SHARED_SECRET` and `TURN_TICKET_SECRET` independently with a password manager. Configure `TURN_SHARED_SECRET` as coturn's `static-auth-secret`; never place either secret in `VITE_` variables or browser storage.
3. Set `ALLOWED_ORIGINS` to exact browser origins, for example `https://game.example`. Wildcards, paths, and trailing slashes are not accepted. Set `TURN_URLS` to public `turn:`/`turns:` coturn URLs and open the corresponding UDP/TCP relay ports in the coturn host firewall.
4. Publish this service behind HTTPS. Build with `npm install && npm run build`, or run `docker build -t high-noon-authority .` followed by `docker run --env-file .env -p 8080:8080 high-noon-authority`. The image has a `/health` health check.
5. Set `VITE_AUTHORITY_URL=https://authority.example` only when optional relay retrieval is needed. Set `VITE_ARENA_SERVER_URL=https://authority.example` in the browser build environment to enable Iron Yard 1v1.

## TURN Credential API

`GET /v1/turn-credentials` is browser-origin restricted, rate-limited, and sends `Cache-Control: no-store`. It requires an exact allowed `Origin` and `Authorization: Bearer <ticket>`.

The ticket is `base64url(JSON payload).base64url(HMAC-SHA256(payload, TURN_TICKET_SECRET))`. The payload must contain a non-empty `sub` string and an integer Unix `exp` no more than 15 minutes in the future. A trusted identity service must authenticate the player, create this ticket server-side, and place only the short-lived ticket into the current browser session. This scaffold deliberately does not include identity issuance.

Successful responses are `{ "iceServers": [{ "urls": [...], "username": "...", "credential": "..." }], "expiresAt": "..." }`. Credentials use coturn's REST shared-secret scheme and expire at the earlier of `TURN_TTL_SECONDS` and the ticket expiry. Invalid tickets return `401`; unknown browser origins return `403`; missing TURN configuration returns `503`. Do not log tickets or responses.

The game reads the ephemeral ticket from `sessionStorage["high-noon-turn-ticket"]` and sends it only to the configured HTTPS authority. If the URL, ticket, response, relay, or browser WebRTC support is unavailable, the client clearly reports that state and continues with public STUN and Supabase database fallback.

`/v1/rounds` demonstrates a server-timed, validated WebSocket message shape. Its volatile memory is deliberately unsuitable for production ranking. Authenticate the WebSocket upgrade, issue room-scoped signed tickets, persist match state, and measure/validate actions server-side before connecting it to a ranked UI.

## Iron Yard Arena WebSocket

`/v1/arena` accepts browser WebSockets only from `ALLOWED_ORIGINS` when that variable is set. The client sends `{ "type": "create" }` to receive a six-character room code, or `{ "type": "join", "room": "ABC123" }` to take its only guest seat. The match starts automatically when both seats are connected. The host can copy/share the displayed code; this is private-code matchmaking only, with no server browser.

Clients send bounded `{ "type": "state", "x", "z", "yaw", "pitch" }` updates at approximately 15 Hz and `{ "type": "shot", "loadout", "yaw", "pitch" }`. Strict Zod schemas, a 1 KiB payload cap, state cadence limit, movement-distance/collision checks, fire cadence, and aim-drift bounds reject basic bad input. The server owns accepted positions, hit rays, damage, health, eliminations/deaths, respawns, and disconnect broadcasts; snapshots expose only public player state.

Each seat receives an opaque reconnect token in its `joined` event. An unexpected close reserves that seat for 30 seconds; the browser retries `{ "type": "resume", "room", "reconnectToken" }` up to three times. `{ "type": "leave" }` frees the seat immediately. Tokens are only reconnect capability for this in-memory casual room, not player identity or an anti-cheat credential.

Room state is intentionally volatile: a deployment restart ends active matches, scores, reservations, and reconnects. This is a casual protocol, not cheat-proof matchmaking or ranked play. The browser still controls its movement and aim snapshots; validation is deliberately basic and does not detect modified clients. The browser uses Three.js/WebGL and generates its world materials locally.
