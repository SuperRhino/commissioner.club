# The Fantasy Commission — 2026 Draft Lottery

A mobile-first, single-page draft lottery reveal for **The Fantasy Commission** fantasy football league.

It is intentionally overdramatic: part *Family Feud* board, part arcade leaderboard, part NBA Jam, part extremely legitimate ping-pong-ball operation.

The app is completely static — just **HTML, CSS, and vanilla JavaScript**. No framework, build step, package manager, database, or server-side code is required.

## Running it

Open `index.html` in a browser.

For local development, you can also serve the folder with any simple static server, but the app has no build process and no dependencies.

```text
tfc-2026-draft-lottery/
├── index.html
├── styles.css
├── app.js
└── README.md
```

## How the lottery works

There are 12 teams. Each team has a pre-lottery `lottoPosition` and a final `draftPick`.

Lottery balls are derived automatically from `lottoPosition`:

| Lotto position | Balls |
| ---: | ---: |
| 1 | 12 |
| 2 | 11 |
| 3 | 10 |
| ... | ... |
| 11 | 2 |
| 12 | 1 |

After a team is selected, that team's balls are removed from the hopper. The **Live Odds** view recalculates the percentage odds using only teams that have not yet been revealed.

The board starts in reveal order, **Pick 12 → Pick 1**. Once all 12 picks have been revealed, the board can be flipped into normal **Draft Order, Pick 1 → Pick 12**.

## Editing the results

The main dataset is at the top of `app.js`:

```js
const lotteryResults = [
  {
    teamName: "KFC Karaokee",
    emojis: ["🍗", "🎤", "🎙️"],
    reaction: "BOOMSHAKALAKA!",
    draftPick: 1,
    lottoPosition: 11,
    funFact: "Never picked Top 2 before. Naturally, they get #1."
  },

  // ...
];
```

Each team has:

- `teamName` — display name.
- `emojis` — team-specific emojis used on the board and in celebration bursts.
- `reaction` — the NBA Jam-style marquee reaction shown after the reveal.
- `draftPick` — the team's actual 2026 draft pick.
- `lottoPosition` — its position entering the lottery. This determines its starting number of balls.
- `funFact` — the short post-reveal commentary displayed beneath the board.

You do **not** need to enter odds, ball counts, or movement manually.

The app derives ball count with:

```js
balls = 13 - lottoPosition;
```

It also derives movement automatically. For example:

```text
lottoPosition: 6
draftPick: 2
movement: +4
```

That team jumped four spots.

## Reveal flow

The lottery begins at **Pick 12** and works backward to **Pick 1**.

Press **START LOTTERY**, then **NEXT PICK**, or tap the flashing unrevealed row itself.

A normal reveal is approximately:

```text
NEXT PICK
   ↓
3 · 2 · 1
   ↓
special transition, when applicable
   ↓
board flip
   ↓
marquee reaction
   ↓
team emoji burst
   ↓
fun fact
```

Revealed team tiles remain clickable. Tapping one fires its emoji celebration again.

## Top 6 mode

Starting at Pick 6, the countdown becomes a more dramatic live-lottery screen.

For Picks **6 through 2**, it shows the recalculated **Live Lottery Odds** while a smaller `3 → 2 → 1` countdown runs.

For Picks **6 through 3**, once the countdown finishes:

1. The other live-odds rows dim.
2. The team about to be revealed lights up with a **SELECTED!** treatment.
3. The result holds on screen briefly.
4. The overlay closes.
5. The board reveal happens.

The commentary for these screens is configured near the top of `app.js`:

```js
const TOP_SIX_COUNTDOWN_NOTES = {
  6: "REAL LOTTO WINNERS ONLY.",
  5: "ABOUT TO GET LUCKY.",
  4: "FINAL FOUR. WHERE BRACKETS GO TO DIE.",
  3: "WHO GETS THE BRONZE?",
  2: "SIMON SWEEP! SIMON SWEEP OF TOP TWO!",
  1: "ONE CLUCKER LEFT. CROWN THE COLONEL."
};
```

These notes replace the normal `TFC` copy in the existing yellow caution-tape banners during the Top 6 countdown.

### Pick 1

There is no one-team Live Odds table for the final pick.

Instead, the screen switches to:

**IT'S THE FINAL COUNTDOWN**

with:

**ONE CLUCKER LEFT. CROWN THE COLONEL.**

The #1 reveal also fires **10 automatic emoji bursts** because restraint is no longer useful at that point.

## Drop Alert

A team that falls **4 or more spots** triggers a generic video-game-style **DROP ALERT** between the countdown and the actual board reveal.

The alert deliberately does **not** identify the team before the reveal.

The threshold is controlled by:

```js
function isCatastrophicDrop(team) {
  return team && (team.draftPick - team.lottoPosition) >= 4;
}
```

Change `4` if the league eventually develops a different definition of humiliation.

## Live Odds

The **LIVE ODDS** button opens the current hopper at any point during the lottery.

Odds are recalculated based on the balls belonging to the remaining unrevealed teams. As teams are selected, their balls disappear and everyone else's percentage changes.

The current odds leader receives a subtle dark-silver shimmer treatment. The rest of the table stays in the same grey/charcoal visual family.

Once no useful live odds remain, the button is hidden.

## Controls

**🔊 Sound** toggles the app's generated sound effects.

**3·2·1 / SKIP** toggles the dramatic reveal sequence. When set to `SKIP`, the app bypasses the countdown and the associated dramatic interstitials, including Drop Alerts.

**LIVE ODDS** opens the current hopper odds.

**START LOTTERY / NEXT PICK** advances the reveal.

After the lottery is complete, **DRAFT ORDER** flips the board from `12 → 1` into normal `1 → 12` draft order. Once flipped, that control becomes **RESET**.

## Reactions

Each team has a short marquee reaction in its dataset. Current reactions are:

```text
12  dead birds                         DYNOMITE!
11  Darf Box                           RIMMED OUT!
10  TheProfessional 19                 DENIED!
 9  55 WRs 55 QBs 55 TEs 55 RBs       NOT AGAIN!
 8  Sky Clouds                         BRICK! OUCH!
 7  Baby Centipedes                    REJECTED!
 6  24 Garrett Gold                    COUNT IT!
 5  My Ditka Her Butkus                FROM DOWNTOWN!
 4  Wet Bandits                        NAILED IT!
 3  Team BEER                          HE'S HEATING UP!
 2  Slick Nicks                        HE'S ON FIRE!
 1  KFC Karaokee                       BOOMSHAKALAKA!
```

The marquee briefly replaces the normal **DRAFT LOTTERY EXTRAVAGANZA** masthead, holds the reaction, then returns to the regular banner.

## Emoji celebrations

Every team can have multiple emojis:

```js
emojis: ["🐛", "🐣", "🪲"]
```

The celebration burst is intentionally dominated by those team emojis, with only a few `🎉` mixed in.

A burst automatically fires after each reveal. Clicking any already-revealed team fires another.

## Design notes

The page is designed **mobile first**.

The visual language intentionally mixes:

- vintage game-show reveal boards;
- 1990s arcade / sports-game graphics;
- NBA Jam-style reactions;
- theatre marquees;
- caution/crime-scene-tape graphics;
- fantasy-football commissioner nonsense.

Most visual changes live in `styles.css`. The app deliberately uses CSS effects and browser-native APIs instead of external assets or libraries, keeping the entire project portable as a static page.

## Files

### `index.html`

The page structure: masthead, lottery board, controls, Live Odds modal, countdown overlay, and finale layer.

### `styles.css`

All visual styling and animation: board tiles, flip reveals, marquee, Live Odds, Top 6 presentation, Drop Alert, countdown treatments, and emoji effects.

### `app.js`

Lottery data and all application behavior: odds calculations, reveal state, movement calculations, countdowns, sound, reactions, emoji bursts, Drop Alerts, board ordering, and reset behavior.

## Deployment

Because this is a static app, the contents of the folder can be deployed directly to any static host such as GitHub Pages, Netlify, Cloudflare Pages, Vercel static hosting, S3, or an ordinary web server.

There are no environment variables, API keys, backend services, or build commands.

---

**The Fantasy Commission — 2026 Draft Lottery**

*12 teams enter. One commissioner presses a button.*


## Background music

Starting the lottery starts the NBA Jam **Team Select ~ Match-Up Intro** track as looping background music. When the Pick 6 reveal begins, the soundtrack switches to **Emerald Hill Zone** for the Top 6. The existing sound toggle controls both the generated arcade sound effects and the background track.

The current version loads the MP3 from its source URL at runtime rather than bundling a local copy. Resetting the lottery stops the track and rewinds it.


### Soundtrack cues

- Picks 12–7: NBA Jam — Team Select / Match-Up Intro
- Picks 6–2: Emerald Hill Zone
- Drop Alert: Super Mario Bros. — Game Over Theme (one-shot over the current music)
- Picks 2–1 countdowns + reveals: Tecmo Super Bowl — Touchdown Fanfare
- Lottery complete: Bases Loaded 2 — Away Team at Bat

All cues obey the app's sound toggle.
