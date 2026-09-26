import type { ArenaConfig, ArenaPhase } from "./arena-state";
import { weapons, type WeaponId } from "./weapons";

const weaponIds: WeaponId[] = ["frontier-rifle", "modern-rifle", "pistol"];

function weaponButton(id: WeaponId, action: "buy" | "equip") {
  const weapon = weapons[id];
  const attribute = action === "buy" ? "data-arena-loadout" : "data-arena-equip";
  return `<button class="arena-shop-item" ${attribute}="${id}" data-weapon="${id}"><span><b>${weapon.name}</b><small>${weapon.price ? `$${weapon.price}` : "STANDARD ISSUE"}</small></span><em data-weapon-state="${id}">AVAILABLE</em></button>`;
}

function panelHeader(label: string, title: string) {
  return `<header><div><p class="eyebrow">${label}</p><h2>${title}</h2></div><button class="arena-panel-close" data-arena-close>CLOSE</button></header>`;
}

export function arenaView(online: boolean, config: ArenaConfig) {
  return `<section class="arena-game" id="arena-game">
    <div class="arena-heading"><p class="eyebrow">IRON YARD // TACTICAL PRACTICE</p><h1>IRON YARD</h1><p>Original procedural industrial yard. Practice tactical rounds, run drills, or open a lightweight private 1v1.</p></div>
    <div class="arena-menu" id="arena-menu">
      <div><p class="eyebrow">OFFLINE BOT MATCH</p><h2>SET THE YARD</h2><label>BOT DISCIPLINE<select id="arena-difficulty"><option value="rookie" ${config.difficulty === "rookie" ? "selected" : ""}>ROOKIE</option><option value="standard" ${config.difficulty === "standard" ? "selected" : ""}>STANDARD</option><option value="veteran" ${config.difficulty === "veteran" ? "selected" : ""}>VETERAN</option></select></label><label>OPPOSITION<select id="arena-bot-count"><option value="1" ${config.botCount === 1 ? "selected" : ""}>1 BOT</option><option value="2" ${config.botCount === 2 ? "selected" : ""}>2 BOTS</option><option value="3" ${config.botCount === 3 ? "selected" : ""}>3 BOTS</option></select></label><div class="arena-menu-actions"><button id="arena-bot" class="primary">PLAY BOT MATCH</button><button id="arena-drill" class="outline">RECOIL DRILL</button></div></div>
      <div><p class="eyebrow">ONLINE 1V1</p><h2>PRIVATE YARD</h2>${online ? `<button id="arena-create" class="outline">CREATE 1V1</button><label>ROOM <input id="arena-room-code" maxlength="6" /></label><button id="arena-join" class="outline">JOIN ROOM</button>` : `<p class="arena-muted">Set VITE_ARENA_SERVER_URL to enable server-validated private rooms.</p>`}<button id="arena-return" class="text-button">RETURN TO SITE</button></div>
    </div>
    <div class="arena-frame" aria-label="Iron Yard game view">
      <div id="arena-canvas"></div>
      <div class="arena-round-hud"><span id="arena-rival"></span><b id="arena-phase"></b><span id="arena-score"></span></div>
      <div class="arena-status"><span id="arena-health"></span><span id="arena-ammo"></span><span id="arena-cash"></span></div>
      <p class="arena-message" id="arena-message" aria-live="polite">SELECT A MATCH TYPE TO ENTER THE YARD.</p>
      <div class="arena-reticle" id="arena-crosshair" aria-hidden="true"><i></i><b></b><em></em></div>
      <p class="arena-feedback" id="arena-feedback" aria-live="polite"></p>
      <button class="arena-lock" id="arena-lock" hidden>CLICK TO DEPLOY</button>
      <div class="arena-pause" id="arena-pause" hidden><b>PAUSED</b><span>CLICK THE YARD TO RESUME</span></div>
      <div class="arena-action-bar" aria-label="Iron Yard actions"><button data-arena-panel="buy">BUY <kbd>B</kbd></button><button data-arena-panel="loadout">LOADOUT</button><button data-arena-panel="settings">SETTINGS</button><button data-arena-panel="pause">PAUSE / RETURN</button><button id="arena-fullscreen" aria-pressed="false">IRON YARD FULLSCREEN <kbd>F</kbd></button></div>
      <section class="arena-panel" id="arena-buy-panel" hidden>${panelHeader("ARMORY", "BUY WEAPONS")}<div class="arena-buy-readout"><b id="arena-buy-cash"></b><span id="arena-buy-phase"></span><span id="arena-buy-zone"></span></div><p class="arena-panel-note" id="arena-buy-requirement"></p><div class="arena-shop-list">${weaponIds.map(id => weaponButton(id, "buy")).join("")}</div></section>
      <section class="arena-panel" id="arena-loadout-panel" hidden>${panelHeader("ARMORY", "LOADOUT")}<p class="arena-panel-note">Choose an owned weapon before you deploy.</p><div class="arena-shop-list">${weaponIds.map(id => weaponButton(id, "equip")).join("")}</div></section>
      <section class="arena-panel arena-settings-panel" id="arena-settings-panel" hidden>${panelHeader("FIELD SETTINGS", "SETTINGS")}<div class="arena-settings-grid"><label>SENSITIVITY<input id="fps-sensitivity" type="range" min="0.0005" max="0.006" step="0.0001" /><output id="fps-sensitivity-value"></output></label><label>RETICLE COLOR<input id="cross-color" type="color" /></label><label>RETICLE SIZE<input id="cross-size" type="range" min="3" max="24" step="1" /></label><label>GRAPHICS<select id="graphics-quality"><option value="low">LOW</option><option value="medium">MEDIUM</option><option value="high">HIGH</option></select></label><label>RENDER SCALE<input id="graphics-pixel-ratio" type="range" min="1" max="2" step="0.1" /></label><label class="arena-check">SHADOWS<input id="graphics-shadows" type="checkbox" /></label></div><div class="binding-grid">${(["forward", "back", "left", "right", "reload", "jump"] as const).map(action => `<button data-bind="${action}">${action.toUpperCase()} <b></b></button>`).join("")}</div><p id="binding-notice" class="arena-panel-note"></p><div class="arena-settings-actions"><button id="settings-reset" class="outline">RESET DEFAULTS</button><button id="cross-share" class="outline">COPY RETICLE</button><label>IMPORT RETICLE<input id="cross-import" /></label></div></section>
      <section class="arena-panel arena-pause-panel" id="arena-pause-panel" hidden>${panelHeader("IRON YARD", "PAUSE")}<p class="arena-panel-note">Pointer lock is released while this panel is open.</p><div class="arena-pause-actions"><button data-arena-close class="primary">RESUME</button><button id="arena-return-panel" class="outline">RETURN TO SITE</button></div></section>
    </div>
  </section>`;
}

export function updateArenaHud(elements: { health: HTMLElement; ammo: HTMLElement; rival: HTMLElement; phase: HTMLElement; cash: HTMLElement; score: HTMLElement }, value: { health: number; ammo: string; rival: string; phase: ArenaPhase; phaseLabel: string; cash: number; eliminations: number; deaths: number }) {
  elements.health.textContent = `HEALTH ${Math.ceil(value.health)}`;
  elements.ammo.textContent = value.ammo;
  elements.rival.textContent = value.rival;
  elements.phase.textContent = value.phaseLabel;
  elements.phase.dataset.phase = value.phase;
  elements.cash.textContent = `$${value.cash}`;
  elements.score.textContent = `${value.eliminations} ELIMS · ${value.deaths} DEATHS`;
}
