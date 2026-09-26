# High Noon Authority Service v5.0.4

This deployable service hosts the optional TURN credential issuer, the legacy server-timed rounds example, and Iron Yard private 1v1 rooms. The arena is a competitive networking foundation, not a production matchmaker or ranked service.

## Deploy

1. Deploy `server/` as a long-running Node/Docker service on Render, Fly.io, Railway, or another WebSocket-capable container host. Do not deploy it to Vercel, a static host, or a function runtime.
2. Set `ALLOWED_ORIGINS` to exact frontend origins and set `ARENA_REGION` to a stable deployment label such as `us-east`.
3. Set `TICK_RATE=60`, `SNAPSHOT_RATE=30`, `MAX_REWIND_MS=150`, and `PING_WARN_MS=120` unless you have measured a reason to change them. Values are bounded by the service.
4. Publish behind HTTPS and configure `VITE_ARENA_SERVER_URL=https://authority.example` in the frontend build. The WebSocket path is derived as `/v1/arena`.
5. Build with `npm install && npm run build`, or build the supplied Docker image. `/health` is the container health endpoint.

## Arena Protocol

Private create, join, leave, and resume rooms remain compatible conceptually: a host sends `{ "type": "create" }`, a guest sends `{ "type": "join", "room": "ABC123" }`, and a reconnecting client sends its opaque room reconnect token. Rooms, scores, tokens, history, and reservations are memory-only and disappear on process restart.

After both seats connect, the client sends bounded sequenced input packets:

```json
{ "type": "input", "sequence": 42, "moveX": 0, "moveZ": 1, "sprint": false, "crouch": false, "jump": false, "yaw": 1.2, "pitch": 0.1 }
```

The server simulates movement at `TICK_RATE`, emits snapshots at `SNAPSHOT_RATE`, and includes `serverTick`, `serverTime`, and each seat's acknowledged input sequence. It does not accept client position or client hit claims. Shot packets use a latest-observed `shotTick`; target position is selected from server history clamped to `MAX_REWIND_MS`, then the server performs the ray, wall, cooldown, damage, elimination, and respawn checks.

Packets are limited to 1 KiB and 150 messages per second per socket. Zod schemas, sequence monotonicity, movement/collision bounds, aim drift, fire cadence, origin checks, and reconnect reservation checks are enforced. These checks reduce malformed and obvious bad packets; they are not an anti-cheat system and do not authenticate players.

`GET /health` and `GET /v1/status` return region, configured tick/snapshot rates, current tick, tick lag, last tick duration, room count, and connected player count. A static frontend region configuration can measure `/v1/status` RTT before connecting. It does not implement server discovery or matchmaking.

## Transport

The bundled service supports WebSocket only. The frontend normally uses this path and reconnects a reserved seat up to three times. A client WebTransport datagram adapter exists only for `VITE_ARENA_WEBTRANSPORT_URL` pointing at a separately deployed compatible endpoint. Do not point that variable at this Node `ws` service or claim WebTransport is live here; the client falls back to WebSocket when that attempt cannot open.

## What This Does Not Provide

There is no public FFA, party system, challenge system, public server browser, ranked queue, region allocator, durable match records, player identity, session tickets, anti-cheat, DDoS protection, or result guarantee. Those features require an authenticated matchmaker, persistent regional arena processes, durable storage, telemetry/alerting, and operational capacity management.

## TURN Credential API

`GET /v1/turn-credentials` is browser-origin restricted, rate-limited, and sends `Cache-Control: no-store`. It requires `Authorization: Bearer <ticket>`. The ticket is `base64url(JSON payload).base64url(HMAC-SHA256(payload, TURN_TICKET_SECRET))`, with non-empty `sub` and an integer `exp` no more than 15 minutes ahead. A trusted identity service must issue it. Successful responses contain coturn REST shared-secret credentials; never put TURN secrets or long-lived tickets in `VITE_` variables.
