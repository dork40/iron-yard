/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AUTHORITY_URL?: string;
  readonly VITE_ARENA_SERVER_URL?: string;
  readonly VITE_ARENA_WEBTRANSPORT_URL?: string;
  readonly VITE_ARENA_REGIONS?: string;
  readonly VITE_ARENA_NET_SIMULATION?: string;
}
