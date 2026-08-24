const TOP_SIX_COUNTDOWN_NOTES = {"6": "REAL LOTTO WINNERS ONLY.", "5": "ABOUT TO GET LUCKY.", "4": "FINAL FOUR. WHERE BRACKETS GO TO DIE.", "3": "WHO GETS THE BRONZE?", "2": "SIMON SWEEP! SIMON SWEEP OF TOP TWO!", "1": "ONE CLUCKER LEFT. CROWN THE COLONEL."};
// -----------------------------------------------------------------------------
// 2026 THE FANTASY COMMISSION DRAFT LOTTERY
//
// Replace this placeholder data later with the real results.
// draftPick: final pick awarded in the lottery
// lottoPosition: pre-lottery rank (1 = best odds, 12 = worst odds)
// balls are derived: lottoPosition 1 => 12 balls, ... lottoPosition 12 => 1 ball
// -----------------------------------------------------------------------------

const lotteryResults = [
  {
    teamName: "KFC Karaokee",
    emojis: ["🍗", "🎤", "🎙️"],
    reaction: "BOOMSHAKALAKA!",
    draftPick: 1,
    lottoPosition: 11,
    funFact: "Never picked Top 2 before. Naturally, they get #1."
  },
  {
    teamName: "Slick Nicks",
    emojis: ["👨🏻", "🪩", "🕺"],
    reaction: "HE'S ON FIRE!",
    draftPick: 2,
    lottoPosition: 6,
    funFact: "Third time finishing as the lottery runner-up. Elite at almost."
  },
  {
    teamName: "Team BEER",
    emojis: ["🍺", "🍻"],
    reaction: "HE'S HEATING UP!",
    draftPick: 3,
    lottoPosition: 3,
    funFact: "Three-time champ at number 3. Cheers champ!"
  },
  {
    teamName: "Wet Bandits",
    emojis: ["🚰", "💧"],
    reaction: "NAILED IT!",
    draftPick: 4,
    lottoPosition: 7,
    funFact: "Five-time lotto winner. Hasn't won one in six years. Washed?"
  },
  {
    teamName: "My Ditka Her Butkus",
    emojis: ["🍆", "🍑"],
    reaction: "FROM DOWNTOWN!",
    draftPick: 5,
    lottoPosition: 8,
    funFact: "My Ditka Her Butkus beats the board by three spots, jumping from 8 to 5."
  },
  {
    teamName: "24 Garrett Gold",
    emojis: ["🏅", "💉", "🧁", "👆", "💥"],
    reaction: "COUNT IT!",
    draftPick: 6,
    lottoPosition: 9,
    funFact: "24 Garrett Gold turns four balls into Pick 6 — a three-spot jump."
  },
  {
    teamName: "Baby Centipedes",
    emojis: ["🐛", "🐣", "🪲"],
    reaction: "REJECTED!",
    draftPick: 7,
    lottoPosition: 1,
    funFact: "Brutal. Baby Centipedes entered with the most balls in the hopper and slides all the way to Pick 7."
  },
  {
    teamName: "Sky Clouds",
    emojis: ["🌥️", "⚡️", "⛈️"],
    reaction: "BRICK! OUCH!",
    draftPick: 8,
    lottoPosition: 2,
    funFact: "Sky Clouds had the second-best starting odds and still tumbles six spots to Pick 8."
  },
  {
    teamName: "55 WRs 55 QBs 55 TEs 55 RBs",
    emojis: ["🍔", "🍟", "5️⃣"],
    reaction: "NOT AGAIN!",
    draftPick: 9,
    lottoPosition: 5,
    funFact: "Another big lottery drop. A cherished annual tradition."
  },
  {
    teamName: "TheProfessional 19",
    emojis: ["🏟️", "1️⃣", "9️⃣"],
    reaction: "DENIED!",
    draftPick: 10,
    lottoPosition: 4,
    funFact: "Won the lottery last year. The hopper has corrected itself."
  },
  {
    teamName: "Darf Box",
    emojis: ["🎁", "📦", "📥"],
    reaction: "RIMMED OUT!",
    draftPick: 11,
    lottoPosition: 10,
    funFact: "Sleeper-era league-best 38 wins. Pick 11. Thoughts and prayers."
  },
  {
    teamName: "dead birds",
    emojis: ["🦅", "💀", "🐦", "🦜"],
    reaction: "DYNOMITE!",
    draftPick: 12,
    lottoPosition: 12,
    funFact: "Reigning champs. Pick 12. As it should be."
  }
];

const board = document.querySelector("#lottery-board");
const revealButton = document.querySelector("#reveal-button");
const buttonLabel = revealButton.querySelector(".button-label");
const revealProgress = document.querySelector("#reveal-progress");
const statusKicker = document.querySelector("#status-kicker");
const statusLine = document.querySelector("#status-line");
const countdownLayer = document.querySelector("#countdown-layer");
const countdownNumber = document.querySelector("#countdown-number");
const topSixDrama=document.querySelector("#top-six-drama");
const topSixOdds=document.querySelector("#top-six-odds");
const topSixNote=document.querySelector("#top-six-note");
const countdownKicker = document.querySelector("#countdown-kicker");
const countdownSubline = document.querySelector("#countdown-subline");
const finaleBurst = document.querySelector("#finale-burst");
const oddsButton = document.querySelector("#odds-button");
const oddsPanel = document.querySelector("#odds-panel");
const oddsClose = document.querySelector("#odds-close");
const oddsList = document.querySelector("#odds-list");
const oddsSummary = document.querySelector("#odds-summary");
const oddsDescription = document.querySelector("#odds-description");
const soundButton = document.querySelector("#sound-button");
const countdownButton = document.querySelector("#countdown-button");
const reactionMarquee = document.querySelector("#reaction-marquee");
const reactionMarqueeText = document.querySelector("#reaction-marquee-text");

let nextPickToReveal = 12;
let isAnimating = false;
revealButton.dataset.mode = "reveal";

function ballsFor(lottoPosition) {
  return 13 - lottoPosition;
}

function movementFor(team) {
  // Positive means the team jumped toward pick #1.
  // Example: lottoPosition 6 -> draftPick 2 = +4.
  return team.lottoPosition - team.draftPick;
}

function movementMarkup(team) {
  const movement = movementFor(team);

  if (movement > 0) {
    return `<span class="movement up" title="Jumped ${movement} spots">▲ ${movement}</span>`;
  }

  if (movement < 0) {
    return `<span class="movement down" title="Moved down ${Math.abs(movement)} spots">▼ ${Math.abs(movement)}</span>`;
  }

  return `<span class="movement held" title="Held expected position">—</span>`;
}

function teamForPick(pick) {
  return lotteryResults.find(team => team.draftPick === pick);
}

function unrevealedTeams() {
  return lotteryResults
    .filter(team => team.draftPick <= nextPickToReveal)
    .sort((a, b) => a.lottoPosition - b.lottoPosition);
}

function liveOdds() {
  const teams = unrevealedTeams();
  const totalBalls = teams.reduce((sum, team) => sum + ballsFor(team.lottoPosition), 0);

  return {
    teams: teams.map(team => ({
      ...team,
      balls: ballsFor(team.lottoPosition),
      odds: totalBalls > 0 ? ballsFor(team.lottoPosition) / totalBalls : 0
    })),
    totalBalls
  };
}

function formatOdds(value) {
  return `${(value * 100).toFixed(2)}%`;
}

function updateOddsButtonVisibility() {
  oddsButton.hidden = nextPickToReveal < 1;
}

function renderLiveOdds() {
  const { teams, totalBalls } = liveOdds();

  if (!teams.length) {
    oddsSummary.textContent = "Lottery complete";
    oddsDescription.textContent = "There are no teams left in the hopper.";
    oddsList.innerHTML = `
      <div class="odds-empty">
        The final draft order has been determined.
      </div>
    `;
    return;
  }

  const nextPick = nextPickToReveal;
  oddsSummary.textContent = `${totalBalls} ${totalBalls === 1 ? "ball" : "balls"} remaining`;
  oddsDescription.textContent = `Odds to be selected for Pick ${nextPick}, recalculated using only balls still in the hopper.`;

  oddsList.innerHTML = teams.map((team, index) => `
    <div class="odds-row">
      <div class="odds-rank">${index + 1}</div>
      <div class="odds-team">
        <strong>${team.teamName}</strong>
        <span>${team.balls} ${team.balls === 1 ? "ball" : "balls"} · started at lotto position ${team.lottoPosition}</span>
      </div>
      <div class="odds-percent">${formatOdds(team.odds)}</div>
    </div>
  `).join("");
}

function openOdds() {
  renderLiveOdds();
  oddsPanel.classList.add("active");
  oddsPanel.setAttribute("aria-hidden", "false");
  oddsButton.setAttribute("aria-expanded", "true");
  oddsClose.focus();
}

function closeOdds() {
  oddsPanel.classList.remove("active");
  oddsPanel.setAttribute("aria-hidden", "true");
  oddsButton.setAttribute("aria-expanded", "false");
  oddsButton.focus();
}


let soundEnabled = true;
let countdownEnabled = true;

let deadBirdsClicks = 0;
let soundToggleTimes = [];
let soundSecretActive = false;

let backgroundMusic = null;
let backgroundMusicStarted = false;
const BACKGROUND_MUSIC_URL = "https://nu.vgmtreasurechest.com/soundtracks/nba-jam-arcade/vwteruar/04-Team%20Select%20~%20Match-Up%20Intro.mp3";
const TOP_SIX_MUSIC_URL = "https://jetta.vgmtreasurechest.com/soundtracks/sonic-2-archives-sega-genesis-hack-genesis-gamerip-2022/yucemxcu/10.%20Emerald%20Hill%20Zone.mp3";
let topSixMusicActivated = false;

const DROP_ALERT_SOUND_URL = "https://nu.vgmtreasurechest.com/soundtracks/super-mario-bros/clusfvmy/09.%20Game%20Over%20Theme.mp3";
const FINAL_PICK_MUSIC_URL = "https://lambda.vgmtreasurechest.com/soundtracks/tecmo-super-bowl-nes-gamerip/puemvsaz/30_Touchdown%20Fanfare.mp3";
const POST_LOTTERY_MUSIC_URL = "https://jetta.vgmtreasurechest.com/soundtracks/bases-loaded-2-nes/kwdasldg/Bases%20Loaded%202%20Away%20team%20at%20bat.mp3";
let finalPickMusicActivated = false;
let postLotteryMusicActivated = false;
let dropAlertAudio = null;



const TEAM_PRESS_GOAL = 5;
const teamPressCounts = new Map();
let chickenRainTimer = null;


let audioContext = null;

function getAudioContext() {
  if (!soundEnabled) return null;

  if (!audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    audioContext = new AudioCtx();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume().catch(() => {});
  }

  return audioContext;
}


function getBackgroundMusic() {
  if (backgroundMusic) return backgroundMusic;

  backgroundMusic = new Audio(BACKGROUND_MUSIC_URL);
  backgroundMusic.loop = true;
  backgroundMusic.preload = "auto";
  backgroundMusic.volume = soundEnabled ? 0.24 : 0;

  return backgroundMusic;
}

function startBackgroundMusic() {
  const music = getBackgroundMusic();
  backgroundMusicStarted = true;

  if (soundEnabled) {
    music.volume = 0.24;
    const playPromise = music.play();
    if (playPromise?.catch) playPromise.catch(() => {});
  }
}

function switchBackgroundTrack(url, { restart = true } = {}) {
  const oldMusic = backgroundMusic;
  const nextMusic = new Audio(url);
  nextMusic.loop = true;
  nextMusic.preload = "auto";
  nextMusic.volume = soundEnabled ? 0.24 : 0;

  backgroundMusic = nextMusic;
  backgroundMusicStarted = true;

  if (oldMusic) {
    oldMusic.pause();
    if (restart) oldMusic.currentTime = 0;
  }

  if (soundEnabled) {
    const playPromise = nextMusic.play();
    if (playPromise?.catch) playPromise.catch(() => {});
  }
}

function playDropAlertSound() {
  if (!soundEnabled) return;

  if (dropAlertAudio) {
    dropAlertAudio.pause();
    dropAlertAudio.currentTime = 0;
  }

  dropAlertAudio = new Audio(DROP_ALERT_SOUND_URL);
  dropAlertAudio.volume = 0.48;
  const playPromise = dropAlertAudio.play();
  if (playPromise?.catch) playPromise.catch(() => {});
}

function switchToFinalPickMusic() {
  if (finalPickMusicActivated) return;
  finalPickMusicActivated = true;
  switchBackgroundTrack(FINAL_PICK_MUSIC_URL);
}

function switchToPostLotteryMusic() {
  if (postLotteryMusicActivated) return;
  postLotteryMusicActivated = true;
  switchBackgroundTrack(POST_LOTTERY_MUSIC_URL);
}

function switchToTopSixMusic() {
  if (topSixMusicActivated) return;
  topSixMusicActivated = true;
  switchBackgroundTrack(TOP_SIX_MUSIC_URL);
}
function syncBackgroundMusicVolume() {
  if (!backgroundMusic) return;

  backgroundMusic.volume = soundEnabled ? 0.24 : 0;

  if (soundEnabled && backgroundMusicStarted && backgroundMusic.paused) {
    const playPromise = backgroundMusic.play();
    if (playPromise?.catch) playPromise.catch(() => {});
  }
}

function resetBackgroundMusic() {
  if (backgroundMusic) {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
  }
  backgroundMusicStarted = false;
}

function tone(frequency, duration = 0.12, type = "square", volume = 0.045, delay = 0) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  const start = ctx.currentTime + delay;
  const end = start + duration;

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, start);

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, end);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(start);
  osc.stop(end + 0.02);
}

function noiseBurst(duration = 0.14, volume = 0.035) {
  const ctx = getAudioContext();
  if (!ctx) return;

  // Short filtered noise hit instead of raw white noise — more arcade cabinet,
  // less static. A resonant band-pass gives it a synthetic "zap" character.
  const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * duration));
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i += 1) {
    const decay = Math.pow(1 - i / bufferSize, 2.2);
    data[i] = (Math.random() * 2 - 1) * decay;
  }

  const source = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();

  const start = ctx.currentTime;
  filter.type = "bandpass";
  filter.Q.setValueAtTime(8, start);
  filter.frequency.setValueAtTime(1850, start);
  filter.frequency.exponentialRampToValueAtTime(620, start + duration);

  gain.gain.setValueAtTime(Math.max(volume * 0.72, 0.0001), start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  source.buffer = buffer;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  source.start(start);
  source.stop(start + duration);
}
function playCountdownTick(number, pick) {
  const base = pick <= 3 ? 260 : 220;
  const frequency = base + (4 - number) * 70;

  // Chunky arcade countdown: square-wave body + quick octave sparkle.
  tone(frequency, 0.11, "square", pick === 1 ? 0.06 : 0.045);
  tone(frequency * 2, 0.055, "square", 0.018, 0.018);
  tone(frequency * 1.5, 0.08, "triangle", 0.016, 0.045);
}

function playRevealSound(pick) {
  noiseBurst(pick === 1 ? 0.34 : 0.16, pick === 1 ? 0.055 : 0.035);

  if (pick === 1) {
    tone(164.81, .22, "sawtooth", .06, 0);
    tone(246.94, .3, "square", .055, .09);
    tone(329.63, .5, "sawtooth", .06, .18);
    tone(493.88, .65, "square", .045, .28);
  } else if (pick <= 3) {
    tone(180, .18, "square", .05, 0);
    tone(270, .22, "sawtooth", .045, .08);
    tone(405, .28, "square", .04, .16);
  } else {
    tone(150, .12, "square", .045, 0);
    tone(260, .18, "square", .035, .07);
  }
}

function playButtonSound() {
  tone(520, .045, "square", .022);
  tone(780, .055, "square", .014, .035);
}


function toggleCountdown() {
  countdownEnabled = !countdownEnabled;
  countdownButton.setAttribute("aria-pressed", String(countdownEnabled));
  countdownButton.textContent = countdownEnabled ? "3·2·1" : "SKIP";
  countdownButton.title = countdownEnabled
    ? "Countdown on"
    : "Countdown off — reveal immediately";
  playButtonSound();
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  soundButton.setAttribute("aria-pressed", String(soundEnabled));
  soundButton.textContent = soundEnabled ? "🔊" : "🔇";

  if (soundEnabled) {
    getAudioContext();
    playButtonSound();
  }
  handleSoundSecret();
  syncBackgroundMusicVolume();
  if (dropAlertAudio) {
    dropAlertAudio.volume = soundEnabled ? 0.48 : 0;
  }
}


function showReactionMarquee(team) {
  if (!team?.reaction) return;

  reactionMarqueeText.textContent = team.reaction;
  reactionMarquee.classList.remove("active", "holding", "leaving");
  reactionMarquee.setAttribute("aria-hidden", "false");

  // Fade in and do one quick NBA-Jam-ish flash.
  requestAnimationFrame(() => {
    reactionMarquee.classList.add("active");
  });

  // After the flash, hold the marquee steady for seven full seconds.
  window.setTimeout(() => {
    reactionMarquee.classList.remove("active");
    reactionMarquee.classList.add("holding");
  }, 850);

  // Then fade back to the normal masthead.
  window.setTimeout(() => {
    reactionMarquee.classList.remove("holding");
    reactionMarquee.classList.add("leaving");
  }, 7850);

  window.setTimeout(() => {
    reactionMarquee.classList.remove("leaving");
    reactionMarquee.setAttribute("aria-hidden", "true");
  }, 8350);
}
function burstTeamEmoji(team, sourceElement) {
  if (!team?.emojis?.length || !sourceElement) return;

  const rect = sourceElement.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  playButtonSound();

  const layer = document.createElement("div");
  layer.className = "tada-layer";
  layer.setAttribute("aria-hidden", "true");
  document.body.appendChild(layer);

  const primaryEmoji = team.emojis[0];

  // Big center pop: primary team emoji + tada.
  const center = document.createElement("div");
  center.className = "tada-center";
  center.innerHTML = `<span class="tada-team">${primaryEmoji}</span><span class="tada-pop">🎉</span>`;
  center.style.left = `${originX}px`;
  center.style.top = `${originY}px`;
  layer.appendChild(center);

  requestAnimationFrame(() => center.classList.add("go"));

  // Only this team's emojis + 🎉.
  // Weight team emojis more heavily than the tada symbol.
  const burstItems = 38;
  const burstSymbols = Array.from(
    { length: burstItems - 3 },
    (_, index) => team.emojis[index % team.emojis.length]
  );

  // Exactly three tada emojis; everything else belongs to the team.
  burstSymbols.push("🎉", "🎉", "🎉");

  // Shuffle so the three tada emojis land naturally in the spray.
  for (let i = burstSymbols.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [burstSymbols[i], burstSymbols[j]] = [burstSymbols[j], burstSymbols[i]];
  }

  for (let i = 0; i < burstItems; i += 1) {
    const piece = document.createElement("span");
    piece.className = "tada-piece";
    piece.textContent = burstSymbols[i];
    piece.style.left = `${originX}px`;
    piece.style.top = `${originY}px`;

    const angle = (-Math.PI * 0.95) + (Math.PI * 1.9 * i / Math.max(1, burstItems - 1));
    const jitter = (Math.random() - 0.5) * 0.42;
    const a = angle + jitter;
    const distance = 120 + Math.random() * 250;
    const x = Math.cos(a) * distance;
    const y = Math.sin(a) * distance - 90 - Math.random() * 95;
    const rotation = -280 + Math.random() * 560;
    const scale = 0.72 + Math.random() * 1.18;

    piece.style.setProperty("--x", `${x}px`);
    piece.style.setProperty("--y", `${y}px`);
    piece.style.setProperty("--r", `${rotation}deg`);
    piece.style.setProperty("--s", scale.toFixed(2));
    piece.style.setProperty("--delay", `${Math.random() * 100}ms`);
    layer.appendChild(piece);

    requestAnimationFrame(() => piece.classList.add("go"));
  }

  // Follow-up rain uses exactly the same team-specific symbol pool.
  const rainItems = 22;

  for (let i = 0; i < rainItems; i += 1) {
    const drop = document.createElement("span");
    drop.className = "tada-rain";
    drop.textContent = team.emojis[Math.floor(Math.random() * team.emojis.length)];
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.setProperty("--drift", `${-75 + Math.random() * 150}px`);
    drop.style.setProperty("--spin", `${-260 + Math.random() * 520}deg`);
    drop.style.setProperty("--delay", `${350 + Math.random() * 500}ms`);
    drop.style.setProperty("--fall", `${950 + Math.random() * 700}ms`);
    layer.appendChild(drop);

    requestAnimationFrame(() => drop.classList.add("go"));
  }

  window.setTimeout(() => layer.remove(), 2400);
}
function wireTeamBurstButtons() {
  board.querySelectorAll(".pick-row").forEach(row => {
    const button = row.querySelector(".team-burst-button");
    if (!button) return;

    const team = teamForPick(Number(row.dataset.pick));

    button.addEventListener("click", () => {
      if (row.classList.contains("revealed")) {
        burstTeamEmoji(team, button);
        handleTeamMilestoneTap(team);
        return;
      }

      if (row.classList.contains("awaiting") && Number(row.dataset.pick) === nextPickToReveal) {
        handleReveal();
      }
    });
  });
}


function showMilestoneBanner(team) {
  const milestones = {
    "dead birds": {
      className: "royal",
      text: "🏆 DEFENDING CHAMPS. SOMEHOW. 🏆",
      subtext: "2X CHAMP CLUB • MAY THEY REIGN."
    },
    "Team BEER": {
      className: "beer",
      text: "🍺 THREE-TIME CHAMPS 🍻",
      subtext: "CHEERS, CHAMP."
    },
    "Wet Bandits": {
      className: "water",
      text: "🚰 FIVE-TIME LOTTO LEGENDS 💧",
      subtext: "THE HOPPER REMEMBERS."
    },
    "Slick Nicks": {
      className: "disco",
      text: "🪩🏆 2X CHAMP CLUB 🏆🕺",
      subtext: ""
    },
    "Sky Clouds": {
      className: "storm",
      text: "⚡️🏆 2X CHAMP CLUB 🏆⚡️",
      subtext: ""
    },
    "55 WRs 55 QBs 55 TEs 55 RBs": {
      className: "burger",
      text: "🍔🏆 2X CHAMP CLUB 🏆🍔",
      subtext: ""
    }
  };

  const milestone = milestones[team.teamName];
  if (!milestone) return;

  const banner = document.createElement("div");
  banner.className = `milestone-banner ${milestone.className}`;
  banner.innerHTML = `
    <div class="milestone-crown">♛</div>
    <div class="milestone-text">${milestone.text}</div>
    <div class="milestone-subtext">${milestone.subtext}</div>
  `;
  document.body.appendChild(banner);

  requestAnimationFrame(() => banner.classList.add("active"));

  window.setTimeout(() => banner.classList.add("leaving"), 3600);
  window.setTimeout(() => banner.remove(), 4300);
}

function handleTeamMilestoneTap(team) {
  const key = team.draftPick;
  const current = (teamPressCounts.get(key) || 0) + 1;

  if (current >= TEAM_PRESS_GOAL) {
    teamPressCounts.set(key, 0);
    showMilestoneBanner(team);
    return;
  }

  teamPressCounts.set(key, current);
}


function dropAmbientChicken() {
  const count = Math.random() < 0.45 ? 2 : 1;

  for (let i = 0; i < count; i += 1) {
    const chicken = document.createElement("div");
    chicken.className = "ambient-chicken";
    chicken.textContent = "🍗";
    chicken.setAttribute("aria-hidden", "true");
    chicken.style.left = `${15 + Math.random() * 70}%`;
    chicken.style.setProperty("--ambient-delay", `${i * 220}ms`);
    chicken.style.setProperty("--ambient-drift", `${-100 + Math.random() * 200}px`);
    chicken.style.setProperty("--ambient-spin", `${-420 + Math.random() * 840}deg`);
    document.body.appendChild(chicken);

    window.setTimeout(() => chicken.remove(), 3200);
  }
}

function scheduleAmbientChicken() {
  if (chickenRainTimer) return;

  const scheduleNext = () => {
    if (nextPickToReveal !== 0) {
      chickenRainTimer = null;
      return;
    }

    const delay = 3500 + Math.random() * 5000;
    chickenRainTimer = window.setTimeout(() => {
      dropAmbientChicken();
      chickenRainTimer = null;
      scheduleNext();
    }, delay);
  };

  scheduleNext();
}

function stopAmbientChicken() {
  if (chickenRainTimer) {
    window.clearTimeout(chickenRainTimer);
    chickenRainTimer = null;
  }
}

function dropLonelyChicken() {
  const chicken = document.createElement("div");
  chicken.className = "lonely-chicken";
  chicken.textContent = "🍗";
  chicken.setAttribute("aria-hidden", "true");
  document.body.appendChild(chicken);

  requestAnimationFrame(() => chicken.classList.add("active"));

  window.setTimeout(() => chicken.remove(), 2600);
}

function playArcadeStartupJingle() {
  const notes = [
    [261.63, 0],
    [329.63, .09],
    [392.00, .18],
    [523.25, .29],
    [659.25, .42],
    [783.99, .55]
  ];

  notes.forEach(([freq, delay], index) => {
    tone(freq, index < 3 ? .1 : .15, index % 2 ? "square" : "triangle", .035, delay);
  });
}

function handleSoundSecret() {
  const now = Date.now();
  soundToggleTimes = soundToggleTimes.filter(time => now - time < 1800);
  soundToggleTimes.push(now);

  if (soundToggleTimes.length < 5 || soundSecretActive) return;

  soundSecretActive = true;
  soundToggleTimes = [];

  getAudioContext();
  playArcadeStartupJingle();

  const normalIcon = soundEnabled ? "🔊" : "🔇";
  soundButton.textContent = "👾";
  soundButton.classList.add("secret-active");

  window.setTimeout(() => {
    soundButton.textContent = normalIcon;
    soundButton.classList.remove("secret-active");
    soundSecretActive = false;
  }, 2200);
}

async function showHighScoresTransition() {
  const layer = document.createElement("div");
  layer.className = "high-scores-layer";
  layer.innerHTML = `
    <div class="high-scores-title">HIGH SCORES</div>
    <div class="high-scores-subtitle">2026 DRAFT ORDER</div>
    <div class="high-scores-lines">
      <span>1UP</span><span>INSERT COIN</span><span>TFC</span>
    </div>
  `;
  document.body.appendChild(layer);

  playArcadeStartupJingle();
  requestAnimationFrame(() => layer.classList.add("active"));

  await sleep(1150);

  layer.classList.add("leaving");
  await sleep(350);
  layer.remove();
}

function buildBoard() {
  board.innerHTML = "";

  // Reveal mode starts in suspense order: #12 at the top -> #1 at the bottom.
  // Once the lottery is complete, the button can flip the board into the
  // conventional final draft order: #1 -> #12.
  [...lotteryResults]
    .sort((a, b) => b.draftPick - a.draftPick)
    .forEach(team => {
      const row = document.createElement("li");
      row.className = "pick-row";
      row.dataset.pick = team.draftPick;
      row.dataset.lottoPosition = team.lottoPosition;
      row.dataset.balls = ballsFor(team.lottoPosition);

      row.innerHTML = `
        <button class="team-burst-button" type="button" disabled
          aria-label="Pick ${team.draftPick}: unrevealed">
          <div class="pick-number" aria-label="Pick ${team.draftPick}">
            ${team.draftPick}
          </div>

          <div class="pick-panel">
            <div class="panel-face panel-front" aria-hidden="true">
              <span class="blank-line"></span>
            </div>

            <div class="panel-face panel-back">
              <span class="team-identity">
                <span class="team-emoji" aria-hidden="true">${team.emojis[0]}</span>
                <span class="team-name">${team.teamName}</span>
              </span>
              ${movementMarkup(team)}
            </div>
          </div>
        </button>
      `;

      board.appendChild(row);
    });

  wireTeamBurstButtons();
  markAwaitingRow();
}
function markAwaitingRow() {
  document.querySelectorAll(".pick-row").forEach(row => {
    row.classList.remove("awaiting");
  });

  if (nextPickToReveal < 1) return;

  const nextRow = document.querySelector(`.pick-row[data-pick="${nextPickToReveal}"]`);
  nextRow?.classList.add("awaiting");

  board.querySelectorAll(".pick-row").forEach(row => {
    const button = row.querySelector(".team-burst-button");
    if (!button || row.classList.contains("revealed")) return;

    const isNext = row.classList.contains("awaiting");
    button.disabled = !isNext;

    if (isNext) {
      button.setAttribute("aria-label", `Reveal Pick ${row.dataset.pick}`);
      button.title = `Reveal Pick ${row.dataset.pick}`;
    }
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function dramaProfile(pick) {
  if (pick === 1) {
    return {
      stepMs: 950,
      preRevealMs: 720,
      kicker: "FIRST OVERALL PICK",
      subline: "THE HOPPER HAS SPOKEN"
    };
  }

  if (pick <= 3) {
    return {
      stepMs: 820,
      preRevealMs: 460,
      kicker: `TOP ${pick} REVEAL`,
      subline: "THIS IS GETTING SERIOUS"
    };
  }

  if (pick <= 5) {
    return {
      stepMs: 700,
      preRevealMs: 260,
      kicker: `PICK ${pick}`,
      subline: "LOCKING IN..."
    };
  }

  return {
    stepMs: 590,
    preRevealMs: 140,
    kicker: `PICK ${pick}`,
    subline: "LOCKING IN..."
  };
}


function renderTopSixDrama(pick){
 if(!topSixDrama||pick>6)return;

 if (pick === 1) {
   topSixDrama.classList.add("final-countdown");
   topSixOdds.innerHTML = "";
   const kicker = topSixDrama.querySelector(".top-six-kicker");
   if (kicker) kicker.textContent = "IT'S THE FINAL COUNTDOWN";
   topSixNote.textContent = TOP_SIX_COUNTDOWN_NOTES[pick] || "";
  countdownLayer.dataset.tapeNote = TOP_SIX_COUNTDOWN_NOTES[pick] || "";
   topSixDrama.classList.add("active");
   topSixDrama.setAttribute("aria-hidden","false");
   return;
 }

 topSixDrama.classList.remove("final-countdown");
 const kicker = topSixDrama.querySelector(".top-six-kicker");
 if (kicker) kicker.textContent = "LIVE LOTTERY ODDS";

 const remaining = lotteryResults
    .filter(team => team.draftPick <= nextPickToReveal)
    .sort((a, b) => ballsFor(a.lottoPosition) - ballsFor(b.lottoPosition))
    .reverse();
 const total = remaining.reduce((sum, team) => sum + ballsFor(team.lottoPosition), 0);
 topSixOdds.innerHTML=remaining.map((team,index)=>{
  const pct = total ? ((ballsFor(team.lottoPosition) / total) * 100).toFixed(1) : "0.0";
  return `<div class="top-six-odds-row ${index===0?"leader":""}" data-pick="${team.draftPick}">
      <span class="top-six-team">${team.emojis[0]} ${team.teamName}</span>
      <span class="top-six-pct">${pct}%</span>
    </div>`;
 }).join("");
 const note = TOP_SIX_COUNTDOWN_NOTES[pick] || "";
  topSixNote.textContent = note;
   countdownLayer.dataset.tapeNote = TOP_SIX_COUNTDOWN_NOTES[pick] || "";
 topSixDrama.classList.add("active");topSixDrama.setAttribute("aria-hidden","false");
}

async function highlightTopSixWinner(pick) {
  if (pick < 3 || pick > 6 || !topSixOdds) return;

  const winningRow = topSixOdds.querySelector(`[data-pick="${pick}"]`);
  if (!winningRow) return;

  topSixOdds.querySelectorAll(".top-six-odds-row").forEach(row => {
    row.classList.add("lottery-dimmed");
  });

  winningRow.classList.remove("lottery-dimmed");
  winningRow.classList.add("lottery-winner");

  playButtonSound();
  await sleep(1800);
}

function hideTopSixDrama(){
  if (topSixDrama) {
    topSixDrama.classList.remove("active");
    topSixDrama.setAttribute("aria-hidden","true");
  }
  delete countdownLayer.dataset.tapeNote;
}
async function runCountdown(pick) {
  if (pick <= 6) {
    renderTopSixDrama(pick);
    countdownLayer.classList.add("top-six-mode");
  } else {
    hideTopSixDrama();
    countdownLayer.classList.remove("top-six-mode");
  }

  const profile = dramaProfile(pick);

  countdownKicker.textContent = profile.kicker;
  countdownSubline.textContent = profile.subline;

  countdownLayer.classList.toggle("top-three", pick <= 3);
  countdownLayer.classList.toggle("number-one", pick === 1);
  countdownLayer.classList.add("active");
  countdownLayer.setAttribute("aria-hidden", "false");

  for (const number of [3, 2, 1]) {
    countdownNumber.textContent = number;
    playCountdownTick(number, pick);
    countdownLayer.classList.remove("tick");

    // Force a reflow so the animation restarts every number.
    void countdownLayer.offsetWidth;

    countdownLayer.classList.add("tick");
    await sleep(profile.stepMs);
  }

  await sleep(profile.preRevealMs);

  // For Picks 6–3, keep the entire countdown overlay visible while
  // the selected live-odds row lights up and holds.
  if (pick >= 3 && pick <= 6) {
    countdownLayer.classList.remove("tick");
    await highlightTopSixWinner(pick);
  }

  countdownLayer.classList.remove("active", "tick");
  countdownLayer.setAttribute("aria-hidden", "true");
}



function isCatastrophicDrop(team) {
  return team && (team.draftPick - team.lottoPosition) >= 4;
}

async function showKillScreen(team) {
  if (!team || !countdownEnabled || !isCatastrophicDrop(team)) return;

  // Only play the Game Over cue once we've confirmed this pick
  // actually qualifies for the DROP ALERT interstitial.
  playDropAlertSound();

  const layer = document.createElement("div");
  layer.className = "kill-screen";
  layer.innerHTML = `
    <div class="kill-screen-noise"></div>
    <div class="kill-screen-card drop-alert-card">
      <div class="kill-screen-kicker">DROP ALERT</div>
      <div class="drop-alert-icon">▼</div>
      <div class="kill-screen-message">SOMEBODY JUST GOT COOKED.</div>
    </div>
  `;
  document.body.appendChild(layer);
  requestAnimationFrame(() => layer.classList.add("active"));
  playButtonSound();
  await sleep(1450);
  layer.classList.add("leaving");
  await sleep(300);
  layer.remove();
}

function autoCelebrateReveal(team, burstButton, pick) {
  if (!team || !burstButton) return;

  const bursts = pick === 1 ? 10 : 1;
  for (let i = 0; i < bursts; i += 1) {
    window.setTimeout(() => {
      burstTeamEmoji(team, burstButton);
    }, 360 + (i * 260));
  }

  // One unexplained chicken after KFC's full #1 barrage.
  if (pick === 1 && team.teamName === "KFC Karaokee") {
    window.setTimeout(dropLonelyChicken, 5200);
  }
}

function revealPick(pick) {
  const row = document.querySelector(`.pick-row[data-pick="${pick}"]`);

  if (!row) return;

  row.classList.remove("awaiting");

  if (pick <= 3) {
    row.classList.add("big-reveal");
  }

  if (pick === 1) {
    row.classList.add("final-reveal");
    finaleBurst.classList.add("active");
    finaleBurst.setAttribute("aria-hidden", "false");

    setTimeout(() => {
      finaleBurst.classList.remove("active");
      finaleBurst.setAttribute("aria-hidden", "true");
    }, 1400);
  }

  row.classList.add("revealed");

  const team = teamForPick(pick);
  const burstButton = row.querySelector(".team-burst-button");

  if (burstButton) {
    burstButton.disabled = false;
    burstButton.setAttribute(
      "aria-label",
      `Pick ${pick}: ${team.teamName}. Tap for ${team.emoji} burst.`
    );
    burstButton.title = `${team.emojis.join(" ")} Tap for trouble`;
  }

  showReactionMarquee(team);
  playRevealSound(pick);

  // Automatic one-time celebration after every reveal.
  // The tile remains clickable afterward for additional manual blasts.
  autoCelebrateReveal(team, burstButton, pick);

  document.body.classList.add("reveal-hit");
  setTimeout(() => document.body.classList.remove("reveal-hit"), 380);
}

function updateInterfaceAfterReveal(pick) {
  const revealedCount = 13 - pick;
  revealProgress.textContent = `${revealedCount} / 12 REVEALED`;

  if (pick === 1) {
    nextPickToReveal = 0;
    switchToPostLotteryMusic();
    scheduleAmbientChicken();
    buttonLabel.textContent = "SHOW DRAFT ORDER";
    revealButton.querySelector(".button-icon").textContent = "↕";
    revealButton.disabled = false;
    revealButton.dataset.mode = "draft-order";
    updateOddsButtonVisibility();
    statusKicker.textContent = "PICK 1";
    statusLine.textContent = teamForPick(1).funFact;
    document.body.classList.remove("suspense");
    return;
  }

  nextPickToReveal = pick - 1;
  buttonLabel.textContent = "NEXT PICK";
  revealButton.querySelector(".button-icon").textContent = "▶";

  const revealedTeam = teamForPick(pick);
  statusKicker.textContent = `PICK ${pick} REVEALED`;
  statusLine.textContent = revealedTeam.funFact;

  if (nextPickToReveal <= 3) {
    document.body.classList.add("suspense");
  }

  markAwaitingRow();
}

async function showDraftOrder() {
  if (revealButton.dataset.mode !== "draft-order" || isAnimating) return;

  isAnimating = true;
  revealButton.disabled = true;

  await showHighScoresTransition();

  const rows = [...board.querySelectorAll(".pick-row")];
  const firstRects = new Map(rows.map(row => [row, row.getBoundingClientRect()]));

  rows
    .sort((a, b) => Number(a.dataset.pick) - Number(b.dataset.pick))
    .forEach(row => board.appendChild(row));

  // FLIP animation: rows move from their old reveal-order positions into
  // conventional #1 -> #12 draft order.
  rows.forEach(row => {
    const first = firstRects.get(row);
    const last = row.getBoundingClientRect();
    const deltaY = first.top - last.top;

    row.animate(
      [
        { transform: `translateY(${deltaY}px)`, zIndex: 3 },
        { transform: "translateY(0)", zIndex: 3 }
      ],
      {
        duration: 720,
        easing: "cubic-bezier(.2,.8,.2,1)"
      }
    );
  });

  board.classList.add("draft-order-mode");
  buttonLabel.textContent = "RESET";
  revealButton.querySelector(".button-icon").textContent = "↻";
  revealButton.dataset.mode = "reset";
  statusKicker.textContent = "OFFICIAL DRAFT ORDER";
  statusLine.textContent = "Pick 1 through Pick 12.";
  revealButton.disabled = false;

  setTimeout(() => {
    isAnimating = false;
  }, 740);
}

function resetLottery() {
  if (isAnimating) return;

  resetBackgroundMusic();
  topSixMusicActivated = false;
  finalPickMusicActivated = false;
  postLotteryMusicActivated = false;
  if (dropAlertAudio) {
    dropAlertAudio.pause();
    dropAlertAudio.currentTime = 0;
    dropAlertAudio = null;
  }

  deadBirdsClicks = 0;
  teamPressCounts.clear();
  stopAmbientChicken();

  isAnimating = true;

  nextPickToReveal = 12;
  revealButton.dataset.mode = "reveal";
  revealButton.disabled = false;
  buttonLabel.textContent = "START LOTTERY";
  revealButton.querySelector(".button-icon").textContent = "▶";

  revealProgress.textContent = "0 / 12 REVEALED";
  statusKicker.textContent = "READY";
  statusLine.textContent = "12 picks. One board. Maximum unnecessary drama.";

  document.body.classList.remove("suspense");
  board.classList.remove("draft-order-mode");
  updateOddsButtonVisibility();

  // Rebuild restores the original #12 -> #1 order and unrevealed faces.
  buildBoard();

  isAnimating = false;
}

async function handleReveal() {
  if (isAnimating || nextPickToReveal < 1) return;

  isAnimating = true;
  revealButton.disabled = true;

  const pick = nextPickToReveal;

  if (pick === 12 && !backgroundMusicStarted) {
    startBackgroundMusic();
  }

  if (pick === 6 && !topSixMusicActivated) {
    switchToTopSixMusic();
  }

  if (pick === 2 && !finalPickMusicActivated) {
    switchToFinalPickMusic();
  }

  statusKicker.textContent = "IN THE HOPPER";
  statusLine.textContent = `Determining Pick ${pick}...`;

  if (countdownEnabled) {
    await runCountdown(pick);
  } else {
    await sleep(120);
  }

  countdownLayer.classList.remove("top-six-mode");
  hideTopSixDrama();

  const revealingTeam = teamForPick(pick);
  await showKillScreen(revealingTeam);

  revealPick(pick);

  // Let the physical board-flip animation land before enabling NEXT.
  await sleep(pick <= 3 ? 980 : 760);

  updateInterfaceAfterReveal(pick);

  if (nextPickToReveal > 0) {
    revealButton.disabled = false;
  }

  isAnimating = false;
}

revealButton.addEventListener("click", () => {
  if (revealButton.dataset.mode === "draft-order") {
    showDraftOrder();
    return;
  }

  if (revealButton.dataset.mode === "reset") {
    resetLottery();
    return;
  }

  handleReveal();
});

// Keyboard support for desktop presentation mode.
window.addEventListener("keydown", event => {
  if (event.repeat) return;

  if (event.code === "Space" || event.code === "Enter" || event.code === "ArrowRight") {
    event.preventDefault();

    if (revealButton.dataset.mode === "draft-order") {
      showDraftOrder();
    } else if (revealButton.dataset.mode === "reset") {
      resetLottery();
    } else {
      handleReveal();
    }
  }
});


soundButton.addEventListener("click", toggleSound);
countdownButton.addEventListener("click", toggleCountdown);
oddsButton.addEventListener("click", openOdds);
oddsClose.addEventListener("click", closeOdds);

oddsPanel.addEventListener("click", event => {
  if (event.target === oddsPanel) closeOdds();
});

window.addEventListener("keydown", event => {
  if (event.code === "Escape" && oddsPanel.classList.contains("active")) {
    event.preventDefault();
    closeOdds();
  }
});

buildBoard();


function primeAudioOnce() {
  getAudioContext();
  window.removeEventListener("pointerdown", primeAudioOnce);
  window.removeEventListener("keydown", primeAudioOnce);
}

window.addEventListener("pointerdown", primeAudioOnce, { once: true });
window.addEventListener("keydown", primeAudioOnce, { once: true });
