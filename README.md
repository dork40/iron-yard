# High Noon Showdown

High Noon Showdown v4.0.1 is an original Wild West browser game with local player progression, synthesized Web Audio effects, an AI-only Ghost Challenge personal-best race, casual multiplayer, and Iron Yard: a normal desktop browser FPS vertical slice. Iron Yard uses locally bundled CC0 Kenney character assets; its maps, weapons, sounds, dialogue, and branding remain original.

## v4.0.1 Iron Yard Buy Phase

Offline bot matches now start directly in a 30-second buy phase at the start zone with `$3200` shown in the HUD. The Ranger Pistol is standard issue; BRAMBLE-47 costs `$1800` and YARDLINE-5 costs `$2400`. Purchases deduct cash, equip the selected weapon, and update the armory immediately. `B` opens the usable weapon-buy overlay after pointer lock is released. Buy and weapon-selection overlays do not stop the round timer; Settings and Pause do. After live play and round end, the next round returns to the buy phase and respawns the player at the start zone. The Iron Yard labels are also reduced to direct game actions and status.

## Previous: Iron Yard Bot Visibility And Fullscreen

Iron Yard now has an in-frame **IRON YARD FULLSCREEN** action (`F`) that fullscreen-targets only the arena shell and keeps the canvas and combat HUD usable. The original first-person weapon meshes retain the existing local wood and metal albedo maps with clearer UV placement; the Ranger Pistol now has visibly separate textured wood-grip and metal-receiver geometry. Gameplay bots keep an unlit stylized body, helmet, and weapon silhouette while locally hosted Kenney GLBs load. Valid GLBs are centered, floor-fitted, double-sided, and use their base-color maps without depending on scene lighting, so model, texture, camera, or material differences cannot make a bot disappear.

## Previous: Textured Fighter And Weapon Motion

Iron Yard bots and the online rival now begin as dependable low-poly placeholders, then asynchronously swap to locally hosted Kenney Blocky Characters 2.0 GLB variants with their embedded/supplied materials, texture maps, and mesh shadows. Included GLB clips play when present; models without clips use a procedural walk bob, turn, and firing pose. The original first-person weapon meshes retain their local wood/metal textures and now animate muzzle kick, slide movement, reload magazine motion, and movement sway. See [`ASSETS.md`](ASSETS.md) and the bundled `public/characters/License.txt` for CC0 attribution.

## Previous: Iron Yard In-Game HUD

Iron Yard now keeps its armory, owned loadout, settings, and pause/return controls in an in-game HUD overlay. The bottom action bar exposes **BUY** (`B`), **LOADOUT**, **SETTINGS**, and **PAUSE / RETURN**; buying visibly reports cash, weapon price, ownership/equipped state, buy phase, and start-zone lock state before it enables a purchase. Escape releases pointer lock first and then closes an open action panel. Settings now visibly include sensitivity, graphics quality, shadows, rebindable controls, and a reset-to-default action. Weapon meshes use the shipped gun wood and gun metal maps.

## v3.7.2 Iron Yard Tactical Shell

Iron Yard moved to a dedicated tactical game shell rather than an auto-start website section. That release introduced configurable rookie/standard/veteran opposition, one to three bots, early warmup/buy/live round states, cash awards and death penalties, a start-zone buy rule, a recoil drill, hit/damage feedback, and a compact combat HUD. Core movement/reload/jump bindings can be reassigned with conflict indication and are saved locally. Private 1v1 keeps the compatible server-validated protocol and now interpolates rival visuals between snapshots.

## Previous: Iron Yard Arsenal

Iron Yard bot training now includes a cash buy menu, the wood-and-steel curved-magazine Bramble-47, the polymer Yardline-5, and the Ranger Pistol. First-person weapon models, original synthesized fire/reload/impact effects, and locally generated steel, wood, polymer, concrete, and brick textures make each loadout and the yard more distinct. Private 1v1 remains compatible with the existing carbine/sidearm server categories.

## Previous: Iron Yard Tactical Bot AI

The normal training bot now uses collider-aware line of sight, pursuit and cover points, range-aware strafing, deterministic reaction and reload pauses, and difficulty-scaled aim and fire cadence. Bot shots cannot pass through walls.

## v3.5.2 Immediate Training

Iron Yard now opens straight into bot training with a Click to Play prompt, while creating or joining an online room cleanly removes the bot before the live match begins.

## v3.5.1 Arena Controls And Networking Fix

Fixes the click-to-play overlay, forward movement direction, ADS FOV interpolation, online spawn synchronization, respawn synchronization, and server-side shot direction.

## v3.5.0 Iron Yard Desktop FPS Slice

Iron Yard uses normal desktop browser controls only: no WebVR or WebXR. It starts with an offline training bot and optionally supports lightweight 1v1 rooms through the authority service. The slice includes pointer lock and Escape pause, responsive WASD/sprint/crouch/jump movement, sensitivity, ADS, reload/ammo, an original rifle and pistol, recoil, raycast head/body hits, bot respawns, procedural geometry/materials, lighting/shadows, tracers, hit feedback, persistent reticle editing/import/share code, HUD, and pause state. It is not represented as cheat-proof matchmaking.

## v3.4.2 Arena Entry Fix

The Enter Arena control now stays hidden until both players are connected, reports when a rival is still required, and shows a clear message if the browser blocks mouse lock.

## v3.4.1 Build Fix

Adds the Three.js TypeScript declarations required by Vercel, so the WebGL arena build can complete.

## v3.4.0 Three-Dimensional Arena

Iron Yard now renders its compact multiplayer arena with Three.js/WebGL and locally generated textures. The release also fixes player movement being overwritten by server snapshots.

## Iron Yard Arena Mode

Iron Yard is an original compact 1v1 arena shooter rendered with Three.js/WebGL, with procedural brick, concrete, and floor textures, first-person mouse look, WASD movement, two weapon loadouts, and a live rival. Start it from `PLAY`, select **Iron Yard**, then create a room code or join a friend's. The dedicated WebSocket server provides 15 Hz player-state snapshots and server-side hit/damage resolution. It does not use or imitate third-party shooter branding or assets.

## v3.1.0 Visual Refresh

The frontier interface now uses a more deliberate saloon-print visual system: clearer heading and label hierarchy, stronger selected and focus states, consistent panel and button treatment, compact active navigation, and refined lobby, profile, scoreboard, tutorial, and game surfaces. The expanded navigation remains usable on small screens through a touch-scrollable navigation row; no routes, modes, controls, or game behavior changed.

## Run

```sh
npm install
npm run dev
```

Copy `.env.example` to `.env.local`. Supabase values enable the existing shared multiplayer modes; `VITE_ARENA_SERVER_URL` optionally enables Iron Yard private 1v1 while offline bot training always works. Use `npm run build` to type-check and create a production build.

## Controls

- Quick Draw: click, tap, or press Space after `DRAW!`. On phones, the wait state has no shoot control; a large safe-area-aware Shoot button appears only at the signal.
- Beat Your Best / Ghost Challenge: use Quick Draw controls to beat your saved personal-best reaction. Before a record exists, the game labels a 1500 ms starter target; the first successful draw becomes your record.
- Word Duel: type the shown word in either uppercase or lowercase, then press Enter.
- Trail Trace: press and hold on the canvas, follow the winding gold path, then release to submit a score based on progress and accuracy.
- Rock Paper Scissors: choose Rock, Paper, or Scissors simultaneously in a best-of-five match; first to three round wins takes the match.
- Sound: use the visible `MUTE` / `UNMUTE` control. Web Audio starts only after interaction and safely does nothing when unavailable.
- Navigation: the top navigation is ordered `HOME`, `PLAY`, `MULTI`, `MUTE` / `UNMUTE`, and `HOW TO PLAY`. `HOME` and the High Noon Showdown brand return to the main menu; `PLAY` opens AI modes and `MULTI` opens multiplayer.
- During any versus-AI or live multiplayer duel, select `FULL SCREEN` to expand the game. Select `EXIT FULL SCREEN`, or use the browser's fullscreen exit gesture, to return.

## Multiplayer Setup

1. In Supabase Authentication, enable anonymous sign-ins.
2. Run this idempotent block in the Supabase SQL Editor. It creates the private-room table, Quick Game queue, Realtime publication entries, and browser-safe policies/RPCs for users signed in anonymously (the Supabase `authenticated` role).

```sql
create table if not exists public.duel_rooms (
  code text primary key check (code ~ '^[A-Z0-9]{6}$'),
  host_id uuid not null references auth.users(id) on delete cascade,
  guest_id uuid references auth.users(id) on delete set null,
  mode text not null default 'original-quick-draw' check (mode in ('original-quick-draw', 'word-duel', 'trail-trace', 'bottle-shot', 'rock-paper-scissors', 'showdown-series')),
  status text not null default 'lobby' check (status in ('lobby', 'ready', 'playing')),
  round_state jsonb not null default '{"hostReady": false, "guestReady": false}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.duel_rooms enable row level security;

-- Remove stale rooms before enforcing the reduced mode allowlist; queue references become null.
delete from public.duel_rooms where mode not in ('original-quick-draw', 'word-duel', 'trail-trace', 'bottle-shot', 'rock-paper-scissors', 'showdown-series');
alter table public.duel_rooms drop constraint if exists duel_rooms_mode_check;
alter table public.duel_rooms add constraint duel_rooms_mode_check check (mode in ('original-quick-draw', 'word-duel', 'trail-trace', 'bottle-shot', 'rock-paper-scissors', 'showdown-series'));

drop policy if exists "duel rooms are readable by signed-in players" on public.duel_rooms;
drop policy if exists "signed-in players can create rooms" on public.duel_rooms;
drop policy if exists "host or vacant-seat guest can update a room" on public.duel_rooms;
drop policy if exists "hosts can delete their rooms" on public.duel_rooms;

create policy "duel rooms are readable by signed-in players"
on public.duel_rooms for select to authenticated using (true);

create policy "signed-in players can create rooms"
on public.duel_rooms for insert to authenticated
with check (auth.uid() = host_id);

create policy "host or vacant-seat guest can update a room"
on public.duel_rooms for update to authenticated
using (auth.uid() = host_id or auth.uid() = guest_id or guest_id is null)
with check (auth.uid() = host_id or auth.uid() = guest_id);

create policy "hosts can delete their rooms"
on public.duel_rooms for delete to authenticated using (auth.uid() = host_id);

create table if not exists public.quick_match_queue (
  user_id uuid primary key references auth.users(id) on delete cascade,
  mode text not null constraint quick_match_queue_mode_check check (mode in ('original-quick-draw', 'word-duel', 'trail-trace', 'bottle-shot', 'rock-paper-scissors', 'showdown-series')),
  room_code text references public.duel_rooms(code) on delete set null,
  created_at timestamptz not null default now(),
  matched_at timestamptz
);

alter table public.quick_match_queue enable row level security;

-- Remove stale unmatched or orphaned searches before enforcing the reduced allowlist.
delete from public.quick_match_queue where mode not in ('original-quick-draw', 'word-duel', 'trail-trace', 'bottle-shot', 'rock-paper-scissors', 'showdown-series');
alter table public.quick_match_queue drop constraint if exists quick_match_queue_mode_check;
alter table public.quick_match_queue add constraint quick_match_queue_mode_check check (mode in ('original-quick-draw', 'word-duel', 'trail-trace', 'bottle-shot', 'rock-paper-scissors', 'showdown-series'));

drop policy if exists "players can read their quick match entry" on public.quick_match_queue;
drop policy if exists "players can add their quick match entry" on public.quick_match_queue;
drop policy if exists "players can remove their unmatched quick match entry" on public.quick_match_queue;

create policy "players can read their quick match entry"
on public.quick_match_queue for select to authenticated using (auth.uid() = user_id);

create policy "players can add their quick match entry"
on public.quick_match_queue for insert to authenticated with check (auth.uid() = user_id);

create policy "players can remove their unmatched quick match entry"
on public.quick_match_queue for delete to authenticated
using (auth.uid() = user_id and room_code is null);

create or replace function public.request_quick_match(p_mode text)
returns setof public.duel_rooms
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_existing_mode text;
  v_existing_room text;
  v_opponent_id uuid;
  v_code text;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;
  if p_mode not in ('original-quick-draw', 'word-duel', 'trail-trace', 'bottle-shot', 'rock-paper-scissors', 'showdown-series') then raise exception 'Invalid duel mode'; end if;

  -- One lock per mode makes selecting a waiting player and assigning both seats atomic.
  perform pg_advisory_xact_lock(hashtextextended('high-noon-quick-match:' || p_mode, 0));
  select mode, room_code into v_existing_mode, v_existing_room
  from public.quick_match_queue where user_id = v_user_id for update;

  if found and v_existing_room is not null then
    return query select * from public.duel_rooms where code = v_existing_room;
    return;
  end if;
  if found and v_existing_mode = p_mode then return; end if;
  if found then delete from public.quick_match_queue where user_id = v_user_id; end if;

  select user_id into v_opponent_id
  from public.quick_match_queue
  where mode = p_mode and room_code is null and user_id <> v_user_id
  order by created_at
  for update skip locked
  limit 1;

  if v_opponent_id is null then
    insert into public.quick_match_queue (user_id, mode)
    values (v_user_id, p_mode)
    on conflict (user_id) do update set mode = excluded.mode, room_code = null, created_at = now(), matched_at = null;
    return;
  end if;

  loop
    v_code := upper(substr(md5(random()::text || clock_timestamp()::text || v_user_id::text), 1, 6));
    begin
      insert into public.duel_rooms (code, host_id, guest_id, mode, status, round_state)
      values (v_code, v_opponent_id, v_user_id, p_mode, 'lobby', '{"hostReady": false, "guestReady": false}'::jsonb);
      exit;
    exception when unique_violation then
      -- A code collision is exceptionally unlikely; retry without exposing it to clients.
    end;
  end loop;

  update public.quick_match_queue
  set room_code = v_code, matched_at = now()
  where user_id in (v_user_id, v_opponent_id);
  return query select * from public.duel_rooms where code = v_code;
end;
$$;

create or replace function public.cancel_quick_match()
returns setof public.duel_rooms
language plpgsql
security definer
set search_path = public
as $$
declare v_user_id uuid := auth.uid(); v_room_code text;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;
  select room_code into v_room_code from public.quick_match_queue where user_id = v_user_id for update;
  if v_room_code is not null then
    return query select * from public.duel_rooms where code = v_room_code;
    return;
  end if;
  delete from public.quick_match_queue where user_id = v_user_id;
end;
$$;

revoke all on function public.request_quick_match(text) from public;
revoke all on function public.cancel_quick_match() from public;
grant execute on function public.request_quick_match(text) to authenticated;
grant execute on function public.cancel_quick_match() to authenticated;

do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'duel_rooms') then
    alter publication supabase_realtime add table public.duel_rooms;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'quick_match_queue') then
    alter publication supabase_realtime add table public.quick_match_queue;
  end if;
end;
$$;
```

In the Supabase dashboard, Database > Replication is the equivalent place to enable `duel_rooms` and `quick_match_queue`.

Set these public Vite environment variables in your static-host build configuration:

```text
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-or-publishable-key
VITE_ARENA_SERVER_URL=https://authority.example
```

Use the project's publishable/anon key only. Never expose a service-role key in Vite client variables. Rebuild after changing public variables because Vite embeds them at build time.

## Modes And Controls

- **Original Quick Draw:** after a random 2-6 second wait, `DRAW!` appears. Click, tap, or press `Space` once to shoot before the AI reacts. The reaction clock starts with `performance.now()` immediately after the local `DRAW!` UI is rendered and interactive. Mobile AI and live rounds show a wait-only state without a shoot control, then reveal a large tap-safe Shoot button at `DRAW!`.
- **Beat Your Best / Ghost Challenge:** an AI-only Quick Draw race against your saved personal-best reaction, using the same random wait, local `performance.now()` clock, and false-start rules. Beat the target to win and immediately replace it with your faster time. With no saved personal best, the clearly labeled approachable **1500 ms starter target** is used; your first success becomes the record. Ghost Challenge is not available in rooms, Quick Game, or Showdown Series.
- **Word Duel:** after a random wait, type `SHOOT`, `DRAW`, or `POW` exactly and press Enter. Its local reaction clock starts immediately after the word input is rendered and enabled.
- **Trail Trace:** trace the generated winding target line with a mouse, touch, or pen. The final score combines farthest target progress with average line accuracy, with a small completion bonus.
- **Bottle Shot:** a 30-second target range with six smaller, touch-accessible bottles visible at once. Click or tap each active bottle once to break it: green and blue bottles add +10, while the more-common red bottles subtract 10. A shot or tap on the range that misses an active bottle also subtracts 10. A new seeded six-bottle wave appears every 1.5 seconds; Ash's target hits, red-bottle mistakes, and range misses vary by difficulty.
- **Rock Paper Scissors:** a simultaneous best-of-five, first-to-three match. Rock beats Scissors, Scissors beats Paper, and Paper beats Rock; matching choices tie and replay without awarding a round.
- **Iron Yard:** normal desktop Three.js/WebGL FPS. Start a Bot Match without any service, or create/join a private 1v1 room with `VITE_ARENA_SERVER_URL`. Offline matches begin with a 30-second buy phase in the start zone; press `B` to buy/equip weapons before the live round. Click to capture the mouse; `WASD` moves, `Shift` sprints, `Ctrl` crouches, `Space` jumps, click fires, right-click toggles ADS, and `R` reloads. `Escape` pauses/releases the mouse. Reticle and sensitivity persist locally.
- **Showdown Series:** best of five, first to three wins. A lightweight cinematic title card opens the series, then every round reveals its randomly selected Quick Draw, Word Duel, Trail Trace, Bottle Shot, or Rock Paper Scissors test with a three-second countdown. The persistent series strip shows score, round, revealed test, and the next controller; win/loss announcements lead into a final champion screen with rematch and return controls. Ghost Challenge is excluded. In multiplayer, the prior-round winner controls the next round; a tie returns control to the host for a replay.
- In every AI mode, acting before the signal is a false start and loses the round.

Before starting a versus-AI mode, choose Ash Mercer's difficulty: **Easy** reacts randomly in 1200-2200 ms and traces around 48-72 points, **Normal** reacts randomly in 550-1400 ms and traces around 68-88 points, and **Hard** reacts randomly in 250-650 ms and traces around 84-98 points. Trail Trace begins immediately; the two existing signal modes keep their random 2-6 second waiting period. The active difficulty appears during the AI duel, and wins, losses, and the fastest successful reaction remain stored locally when browser storage is available.

## Multiplayer Behavior

Create a six-character private room code or join an available room as before. Quick Game selects a mode and queues the signed-in player; the next player requesting that same mode is atomically paired into a new `duel_rooms` row. A search remains queued when navigating away and is restored on return. Realtime delivers changes promptly, while a 2.5-second authenticated queue fetch checks for a missed event or a reconnect; only one local subscription/poll loop is active and cancel or leave stops it. Both sessions then subscribe to the room and can mark themselves ready. Cancel Search only removes an unmatched queue entry.

When both players are ready, the round controller briefly allows an in-flight peer handshake up to 1.2 seconds to settle, then writes a shared future `startAt` padded by at least 3 seconds with direct transport or 4.5 seconds on database fallback (plus the normal random draw wait where applicable). Each joined room creates one `RTCPeerConnection` using public STUN servers. Supabase Realtime Broadcast carries SDP/ICE signaling only; after the DataChannel opens, the guest sends five clock pings and estimates its offset from the host using the lowest-round-trip sample. Each browser converts that shared target to its local monotonic `performance.now()` timeline, arms the signal locally, renders/enables it, and only then records the reaction clock. If no peer link is available, browsers still use the padded shared timestamp, but start alignment is less precise.

For Quick Draw and Word Duel, each browser renders and activates its own signal/control before recording `performance.now()`. A shot or correct word reports elapsed milliseconds from that local mark through both the DataChannel event and the durable `round_state` action, so displayed reaction results are local measurements rather than stale signal or wall-clock timestamps. The host compares those measured values, not database/action arrival timestamps. Reactions within 3 ms are a tie; a short 1.2-second fallback window lets a missing peer action arrive before a lone valid reaction is awarded. Actions before a local activation are false starts; two false starts tie.

For Trail Trace, the deterministic path is scored locally and a submission is accepted only when it reaches the final target with at least 95% progress and 55% accuracy. Multiplayer repeats those bounds checks before accepting a payload. Bottle Shot uses a host-created `targetSeed`, shared `startAt`, and `endAt` exactly 30 seconds later. Rock Paper Scissors choices are sent simultaneously, revealed once both arrive, and ties replay without a point. The host may use an already received peer action as an early resolution hint, but the database state remains the fallback record.

### Transport Guarantees And Limits

- A connected DataChannel gives direct browser-to-browser delivery for live actions, a small guest-to-host clock-offset estimate, and reduced dependence on database subscription latency. The padded start and monotonic local arming reduce avoidable startup skew; they do not guarantee a fixed latency, exact clock alignment, an identical rendered frame, ordering across the database fallback, delivery after disconnect, or perfect fairness.
- STUN-only WebRTC works on many networks but cannot traverse every symmetric NAT, carrier network, enterprise firewall, VPN, or browser privacy policy. An optional authenticated TURN relay can improve this when deployed; unavailable/missing/rejected relay credentials remain on the Supabase database fallback.
- WebRTC requires a current browser with `RTCPeerConnection` and DataChannel support. Unsupported or failed connections continue with Supabase state updates.
- This remains **client-timed casual play**, not cheat-proof or server-authoritative timing. A client can tamper with its measured reaction, clock-ping replies, choices, or scores. Different clocks, timer throttling, rendering/compositor delays, input-device latency, network asymmetry, and fallback database delivery can still affect perceived fairness; direct peer transport does not remove those limits.

### SQL Requirement

Existing users who have not applied the v3.2.2 SQL block must rerun it. v3.4.0 adds no Supabase schema migration: Series presentation uses the existing shared round, score, and next-round-controller fields. Ghost Challenge remains local-only.

## Profile, Queues, And Authority

`PROFILE` stores a display name, original frontier title, badges, streaks, mode results, and best successful draw locally in browser storage. It requires no external account. Room hosts and guests share the display name they entered only in that room's `round_state`; do not use it for identity or moderation.

Multiplayer begins with an explicit **Casual** or **Ranked** choice. Casual is the existing Supabase/WebRTC implementation, so its P2P/fallback badge and the limits above remain visible. Ranked intentionally cannot queue, simulate a match, or award a ranking in this release. A real ranked deployment needs authoritative timing, verified identities, durable match records, anti-abuse controls, and an operational endpoint.

`VITE_AUTHORITY_URL` is optional and must be an HTTPS URL (or localhost during development). It enables only optional TURN relay lookup, never ranked play. The client reads a short-lived authenticated TURN ticket from `sessionStorage["high-noon-turn-ticket"]`; a trusted identity service must issue that ticket after authenticating the player. The client sends it to `GET /v1/turn-credentials` as a bearer token, validates the credential response, and visibly falls back to STUN/Supabase when the URL, ticket, origin, response, relay, or browser support is unavailable. Do not place a TURN secret or long-lived ticket in any `VITE_` variable. See [`server/README.md`](server/README.md) for the signed-ticket protocol, exact CORS origin rules, coturn configuration, and Docker deployment.

`VITE_ARENA_SERVER_URL` is required for Iron Yard and must be the HTTPS base URL of the deployed authority service (or `http://localhost:8080` for local development). The browser derives its `ws:`/`wss:` connection to `/v1/arena`; this value is public build configuration, not a credential. Set the server's `ALLOWED_ORIGINS` to the exact Vite site origin.

## Validation

GitHub Actions in `.github/workflows/build.yml` installs and builds both the browser client and `server/` on every push and pull request. The repository intentionally has no lockfile, so the workflow uses `npm install` rather than `npm ci`.

## Files

- `src/services/multiplayer.ts` - Supabase anonymous auth, private rooms, Quick Game RPC/Realtime queue, and shared-round state updates
- `src/types.ts` - shared room and round types
- `src/main.ts` - browser UI, AI gameplay, and multiplayer lobby wiring
- `src/game/rules.ts` - pure versus-AI timing and duel resolution rules
- `src/game/arena.ts` - Iron Yard runtime composition and UI bridge
- `src/game/input.ts`, `player.ts`, `weapons.ts`, `recoil.ts`, `bots.ts`, `maps.ts`, `rendering.ts`, `networking.ts`, `crosshair.ts`, `settings.ts` - focused desktop FPS systems
- `src/style.css` - v3.1 frontier visual system, responsive game surfaces, and mobile-safe target styling
- `src/services/authority.ts` - optional authenticated TURN ticket and credential contract
- `server/` - separately deployable HTTP/WebSocket service, including the live Iron Yard 1v1 room protocol and TURN credential foundation; not a production ranked system
