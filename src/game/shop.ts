// Premium shop catalog. Prices are in USD and must stay exactly in sync with
// the payment provider's products once payments are enabled.
//
// Payments are not available yet on this workspace, so nothing here can be
// bought — `PAYMENTS_ENABLED` stays false and ownership is never granted from
// the local save. When built-in payments are enabled, flip this on and back
// ownership with verified account entitlements.

export const PAYMENTS_ENABLED = false;

export type PremiumId = "magnet" | "airbag" | "noads";

export type Premium = {
  id: PremiumId;
  name: string;
  tagline: string;
  desc: string;
  /** USD cents; 599 = $5.99 */
  cents: number;
  kind: "once" | "subscription";
  trial: string;
};

export const PREMIUMS: Premium[] = [
  {
    id: "magnet",
    name: "PERMANENT COIN MAGNET",
    tagline: "Coins fly to you",
    desc: "A super-powered magnet pulls every nearby wheel coin straight to your car — forever, on every run.",
    cents: 599,
    kind: "once",
    trial: "Drive around the trial pad and watch coins zip to you from far away.",
  },
  {
    id: "airbag",
    name: "AIRBAG",
    tagline: "One rescue per run",
    desc: "Crash once per run and the airbag saves you: no wipeout, and your car is placed back on clear road.",
    cents: 999,
    kind: "once",
    trial: "Floor it into the crash wall — the airbag deploys and puts you back safely.",
  },
  {
    id: "noads",
    name: "ALL ADS FOREVER",
    tagline: "Zero ads, ever",
    desc: "Removes every advertisement from the game while your subscription is active.",
    cents: 99,
    kind: "subscription",
    trial: "There are no ads in the game yet — this removes them the moment any appear.",
  },
];

export const premiumById = (id: PremiumId) => {
  const item = PREMIUMS.find((p) => p.id === id);
  if (!item) throw new Error(`Unknown premium item: ${id}`);
  return item;
};

export const priceText = (p: Premium) =>
  `$${(p.cents / 100).toFixed(2)}${p.kind === "subscription" ? "/mo" : ""}`;

// --- Item trials (free, isolated, never grant ownership or real coins) -----

export type TrialId = "magnet" | "airbag";

/** Trial pad lives inside the test-track bounds, west of the oval. */
export const TRIAL = { x: 140, z: 70 };
/** Where the airbag trial's crash wall stands (drive north into it). */
export const TRIAL_WALL = { x: TRIAL.x, z: TRIAL.z - 22, w: 14, h: 4 };

/** Scatter of trial coins for the magnet trial — visual only, worth 0 wheels. */
export function trialCoins(): { x: number; z: number }[] {
  const out: { x: number; z: number }[] = [];
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2;
    const r = 6 + (i % 3) * 4;
    out.push({ x: TRIAL.x + Math.cos(a) * r, z: TRIAL.z + Math.sin(a) * r });
  }
  return out;
}
