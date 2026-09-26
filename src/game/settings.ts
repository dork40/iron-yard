export type GraphicsQuality = "low" | "medium" | "high";
export type GraphicsSettings = { quality: GraphicsQuality; pixelRatio: number; shadows: boolean };
export type BindingAction = "forward" | "back" | "left" | "right" | "reload" | "jump";
export type KeyBindings = Record<BindingAction, string>;
export type FpsSettings = { sensitivity: number; fov: number; crosshair: CrosshairSettings; graphics: GraphicsSettings; bindings: KeyBindings };
export type CrosshairSettings = { color: string; size: number; gap: number; thickness: number; dot: boolean; outline: boolean };

const key = "iron-yard-settings-v1";
export const defaultSettings: FpsSettings = { sensitivity: 0.0022, fov: 78, crosshair: { color: "#f3d78b", size: 9, gap: 5, thickness: 2, dot: true, outline: true }, graphics: { quality: "high", pixelRatio: 1.75, shadows: true }, bindings: { forward: "KeyW", back: "KeyS", left: "KeyA", right: "KeyD", reload: "KeyR", jump: "Space" } };
export const graphicsPresets: Record<GraphicsQuality, GraphicsSettings> = { low: { quality: "low", pixelRatio: 1, shadows: false }, medium: { quality: "medium", pixelRatio: 1.4, shadows: true }, high: { quality: "high", pixelRatio: 1.75, shadows: true } };
export function loadSettings(): FpsSettings { try { const saved = JSON.parse(localStorage.getItem(key) ?? "{}") as Partial<FpsSettings>; return { ...defaultSettings, ...saved, crosshair: { ...defaultSettings.crosshair, ...saved.crosshair }, graphics: { ...defaultSettings.graphics, ...saved.graphics }, bindings: { ...defaultSettings.bindings, ...saved.bindings } }; } catch { return structuredClone(defaultSettings); } }
export function saveSettings(settings: FpsSettings) { try { localStorage.setItem(key, JSON.stringify(settings)); } catch { /* Storage is optional. */ } }
export function crosshairCode(value: CrosshairSettings) { return btoa(JSON.stringify(value)); }
export function importCrosshair(code: string): CrosshairSettings | null { try { const value = JSON.parse(atob(code.trim())) as CrosshairSettings; return typeof value.color === "string" && [value.size, value.gap, value.thickness].every(Number.isFinite) ? { color: value.color, size: Math.max(1, Math.min(24, value.size)), gap: Math.max(0, Math.min(20, value.gap)), thickness: Math.max(1, Math.min(5, value.thickness)), dot: Boolean(value.dot), outline: Boolean(value.outline) } : null; } catch { return null; } }
