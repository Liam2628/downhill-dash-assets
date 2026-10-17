# Downhill Dash premium shop

## What will change
- Place a distinct blue shop truck beside the lobby gate, close to your car in the reference image. Add a cart logo with SHOP above it; approaching it opens the shop, and the top-right cart opens the same shop.
- Create a polished shop with exactly three products: Permanent Coin Magnet ($5.99 one-time), Airbag ($9.99 one-time, one rescue per run), and ALL ADS FOREVER ($0.99/month, only while subscribed).
- Give every item a product picture, a rotatable 3D preview, and a permanently visible Try it! button. Gently pulse the red subscription price, except for players who disable animations.
- Upgrade the vehicle practice area with racing curbs, clear lanes, test features and attractive surroundings. Add an isolated short item trial with coins and a crash target, without granting ownership or farming real coins.
- Add visible coin attraction and a satisfying airbag deployment that returns the car to a verified clear road position. Remove loop support pillars and matching pillar collisions, while retaining playable loop decks.
- Stop Command-based Mac screenshot shortcuts from activating boost.

## Payment limitation
The available Stripe setup reports that this workspace needs a qualifying paid plan. After approval, attempt the built-in Stripe setup once. If it remains blocked, complete the shop and trials, clearly mark purchases unavailable, and explain upgrading and finishing Stripe verification. Never simulate a successful purchase or grant paid ownership from editable game saves. There are currently no advertisements in the game, so the subscription has no ads to hide yet; do not add ads merely to sell removal.

## Technical details
- Keep shop product definitions and trial state separate from wheel purchases and existing tuning menus.
- Paid ownership must come from verified account-backed entitlements when payments are enabled, never local storage or cheats.
- Share practice geometry, trial targets, and recovery clearance between rendering and driving logic.
- Add focused tests for exact product prices, once-per-run rescue, trial isolation and screenshot shortcut handling. Verify the shop, model rotation, and trial return flow in the running game.