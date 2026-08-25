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
    emojis: ["🐛", "🐣", "🪲", "👶"],
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

  oddsSummary.textContent = `${totalBalls} ${totalBalls === 1 ? "ball" : "balls"} remaining`;
  oddsDescription.textContent = "Current odds to win the #1 pick, recalculated using only balls still in the hopper.";

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


let soundMode = "on"; // on -> fx -> off
let soundEnabled = true; // compatibility: true whenever FX are enabled
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
const PICK_ONE_TRANSITION_MUSIC_URL = "https://lambda.vgmtreasurechest.com/soundtracks/tecmo-super-bowl-nes-gamerip/rosyoajt/29_Touchdown%20%2B%20Cheer.mp3";
const TOP_PICK_REVEAL_MUSIC_URL = "https://lambda.vgmtreasurechest.com/soundtracks/tecmo-super-bowl-nes-gamerip/puemvsaz/30_Touchdown%20Fanfare.mp3";
const DRAFT_ORDER_STING_URL = "https://lambda.vgmtreasurechest.com/soundtracks/tecmo-super-bowl-nes-gamerip/fctmenye/17_First%20Down%202.mp3";
const POST_LOTTERY_MUSIC_URL = "https://jetta.vgmtreasurechest.com/soundtracks/bases-loaded-2-nes/kwdasldg/Bases%20Loaded%202%20Away%20team%20at%20bat.mp3";
let finalPickMusicActivated = false;
let postLotteryMusicActivated = false;

const MUSIC_VOLUMES = {
  nbaJam: 0.24,
  topSix: 0.12,
  pickTwo: 0.20,
  pickOneTransition: 0.20,
  topPickReveal: 0.22,
  draftOrder: 0.22,
  postLottery: 0.18
};
let backgroundMusicTargetVolume = MUSIC_VOLUMES.nbaJam;
let pickOneTransitionMusicActivated = false;
let topPickRevealMusicActivated = false;
let draftOrderStingActive = false;
let pendingPostLotteryMusic = false;

let dropAlertAudio = null;



const TEAM_PRESS_GOAL = 5;
const teamPressCounts = new Map();

const easterEggPressCounts = new Map();
let wetBanditWaterLevel = 0;
let teamBeerLevel = 0;
let teamBeerDrainTimer = null;
let wetBanditDrainTimer = null;
let slickDiscoActive = false;
let beltSequenceProgress = 0;
const BELT_IMAGE_URL = "http://commissioner.club/assets/img/template/tfc-championship-trophy.jpg";

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
  backgroundMusic.volume = soundMode === "on" ? backgroundMusicTargetVolume : 0;

  return backgroundMusic;
}

function startBackgroundMusic() {
  backgroundMusicTargetVolume = MUSIC_VOLUMES.nbaJam;
  const music = getBackgroundMusic();
  backgroundMusicStarted = true;

  if (soundMode === "on") {
    music.volume = backgroundMusicTargetVolume;
    const playPromise = music.play();
    if (playPromise?.catch) playPromise.catch(() => {});
  }
}

function switchBackgroundTrack(url, { volume = backgroundMusicTargetVolume, loop = true, onEnded = null } = {}) {
  backgroundMusicTargetVolume = volume;

  const oldMusic = backgroundMusic;
  const nextMusic = new Audio(url);
  nextMusic.loop = loop;
  nextMusic.preload = "auto";
  nextMusic.volume = soundMode === "on" ? backgroundMusicTargetVolume : 0;

  backgroundMusic = nextMusic;
  backgroundMusicStarted = true;

  if (oldMusic) {
    oldMusic.pause();
    oldMusic.currentTime = 0;
  }

  if (!loop && typeof onEnded === "function") {
    nextMusic.addEventListener("ended", onEnded, { once: true });
  }

  if (soundMode === "on") {
    const playPromise = nextMusic.play();
    if (playPromise?.catch) playPromise.catch(() => {});
  }

  return nextMusic;
}

async function playDropAlertSound() {
  if (soundMode === "off") return;

  const musicToResume = backgroundMusic;
  const musicWasPlaying = musicToResume && !musicToResume.paused;

  if (musicToResume) musicToResume.pause();

  if (dropAlertAudio) {
    dropAlertAudio.pause();
    dropAlertAudio.currentTime = 0;
  }

  dropAlertAudio = new Audio(DROP_ALERT_SOUND_URL);
  dropAlertAudio.volume = 0.52;

  await new Promise(resolve => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };

    dropAlertAudio.addEventListener("ended", finish, { once: true });
    const playPromise = dropAlertAudio.play();
    if (playPromise?.catch) playPromise.catch(finish);
    window.setTimeout(finish, 2600);
  });

  if (soundMode === "on" && musicWasPlaying && musicToResume === backgroundMusic) {
    musicToResume.volume = backgroundMusicTargetVolume;
    const resumePromise = musicToResume.play();
    if (resumePromise?.catch) resumePromise.catch(() => {});
  }
}

function switchToFinalPickMusic() {
  if (finalPickMusicActivated) return;
  finalPickMusicActivated = true;
  switchBackgroundTrack(TOP_PICK_REVEAL_MUSIC_URL, { volume: MUSIC_VOLUMES.pickTwo });
}

function switchToPickOneTransitionMusic() {
  if (pickOneTransitionMusicActivated) return;
  pickOneTransitionMusicActivated = true;
  switchBackgroundTrack(PICK_ONE_TRANSITION_MUSIC_URL, { volume: MUSIC_VOLUMES.pickOneTransition });
}

function switchToTopPickRevealMusic() {
  if (topPickRevealMusicActivated) return;
  topPickRevealMusicActivated = true;
  switchBackgroundTrack(TOP_PICK_REVEAL_MUSIC_URL, { volume: MUSIC_VOLUMES.topPickReveal });
}

function playDraftOrderStingThenPostLottery() {
  // This function is called ONLY by an explicit Draft Order press.
  postLotteryMusicActivated = false;
  draftOrderStingActive = true;
  pendingPostLotteryMusic = true;

  switchBackgroundTrack(DRAFT_ORDER_STING_URL, {
    volume: MUSIC_VOLUMES.draftOrder,
    loop: false,
    onEnded: () => {
      draftOrderStingActive = false;
      if (!pendingPostLotteryMusic) return;

      pendingPostLotteryMusic = false;

      // Let the First Down sting fully clear before the next track enters.
      window.setTimeout(() => {
        switchToPostLotteryMusic();
      }, 1200);
    }
  });
}

function switchToPostLotteryMusic() {
  if (postLotteryMusicActivated) return;
  postLotteryMusicActivated = true;
  switchBackgroundTrack(POST_LOTTERY_MUSIC_URL, { volume: MUSIC_VOLUMES.postLottery });
}

function switchToTopSixMusic() {
  if (topSixMusicActivated) return;
  topSixMusicActivated = true;
  switchBackgroundTrack(TOP_SIX_MUSIC_URL, { volume: MUSIC_VOLUMES.topSix });
}
function syncBackgroundMusicVolume() {
  if (!backgroundMusic) return;

  if (soundMode !== "on") {
    backgroundMusic.pause();
    return;
  }

  backgroundMusic.volume = backgroundMusicTargetVolume;

  if (backgroundMusicStarted && backgroundMusic.paused) {
    const playPromise = backgroundMusic.play();
    if (playPromise?.catch) playPromise.catch(() => {});
  }
}

function resetBackgroundMusic() {
  if (backgroundMusic) {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
  }

  // Throw away the current track entirely. This prevents a finished
  // Bases Loaded / Tecmo / Sonic Audio object from being reused when
  // the lottery starts again.
  backgroundMusic = null;
  backgroundMusicStarted = false;
  backgroundMusicTargetVolume = MUSIC_VOLUMES.nbaJam;
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

function updateSoundControl() {
  soundEnabled = soundMode !== "off";

  if (soundButton) {
    if (soundMode === "on") {
      soundButton.textContent = "🔊";
      soundButton.setAttribute("aria-label", "Sound on: music and effects");
      soundButton.title = "Sound: music + FX";
    } else if (soundMode === "fx") {
      soundButton.textContent = "🔉";
      soundButton.setAttribute("aria-label", "Music off, sound effects on");
      soundButton.title = "Sound: FX only";
    } else {
      soundButton.textContent = "🔇";
      soundButton.setAttribute("aria-label", "All sound off");
      soundButton.title = "Sound: off";
    }
  }

  // Music only plays in the full ON state.
  if (backgroundMusic) {
    if (soundMode === "on") {
      backgroundMusic.volume = backgroundMusicTargetVolume;
      if (backgroundMusicStarted && backgroundMusic.paused) {
        const playPromise = backgroundMusic.play();
        if (playPromise?.catch) playPromise.catch(() => {});
      }
    } else {
      backgroundMusic.pause();
    }
  }

  // A currently-playing Drop Alert is FX, so FX-only keeps it audible.
  if (dropAlertAudio) {
    if (soundMode === "off") {
      dropAlertAudio.pause();
    } else {
      dropAlertAudio.volume = 0.52;
    }
  }
}

function toggleSound() {
  const now = Date.now();
  soundToggleTimes = soundToggleTimes.filter(time => now - time < 1600);
  soundToggleTimes.push(now);

  if (soundMode === "on") soundMode = "fx";
  else if (soundMode === "fx") soundMode = "off";
  else soundMode = "on";

  updateSoundControl();

  if (soundToggleTimes.length >= 5 && !soundSecretActive) {
    soundSecretActive = true;
    soundToggleTimes = [];
    playArcadeStartupJingle();

    const normalIcon = soundMode === "on" ? "🔊" : soundMode === "fx" ? "🔉" : "🔇";
    soundButton.textContent = "👾";
    window.setTimeout(() => {
      soundButton.textContent = normalIcon;
      soundSecretActive = false;
    }, 1100);
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
function burstTeamEmoji(team, sourceElement, options = {}) {
  if (!team?.emojis?.length || !sourceElement) return;

  const density = Math.max(0.2, Math.min(1, options.density ?? 1));
  const includeRain = options.includeRain ?? true;

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
  const burstItems = Math.max(10, Math.round(38 * density));
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
  const rainItems = includeRain ? Math.max(6, Math.round(22 * density)) : 0;

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

        // Independent systems: championship milestone banners and
        // team-specific Easter eggs do not share counters.
        handleTeamMilestoneTap(team);
        handleTeamSpecificEasterEgg(team);
        return;
      }

      if (row.classList.contains("awaiting") && Number(row.dataset.pick) === nextPickToReveal) {
        handleReveal();
      }
    });
  });
}



function incrementEggCount(teamName) {
  const next = (easterEggPressCounts.get(teamName) || 0) + 1;
  easterEggPressCounts.set(teamName, next);
  return next;
}

function resetEggCount(teamName) {
  easterEggPressCounts.set(teamName, 0);
}

function triggerCentipedeCrawl() {
  const layer = document.createElement("div");
  layer.className = "centipede-crawl";
  layer.setAttribute("aria-hidden", "true");

  const leader = document.createElement("span");
  leader.className = "centipede-leader";
  leader.textContent = "🐛";
  layer.appendChild(leader);

  document.body.appendChild(layer);
  requestAnimationFrame(() => layer.classList.add("active"));

  window.setTimeout(() => layer.remove(), 5200);
}

function triggerDarfBoxEgg(team) {
  const layer = document.createElement("div");
  layer.className = "darf-box-egg";
  layer.setAttribute("aria-hidden", "true");
  layer.innerHTML = `
    <div class="darf-box-caption">WHAT'S IN THE BOX?!</div>
    <div class="darf-box-object">
      <span class="darf-box-lid">📦</span>
    </div>
  `;
  document.body.appendChild(layer);

  requestAnimationFrame(() => layer.classList.add("active"));

  window.setTimeout(() => {
    const box = layer.querySelector(".darf-box-object");
    if (box) {
      const rect = box.getBoundingClientRect();
      const fakeButton = document.createElement("span");
      fakeButton.style.position = "fixed";
      fakeButton.style.left = `${rect.left}px`;
      fakeButton.style.top = `${rect.top}px`;
      fakeButton.style.width = `${rect.width}px`;
      fakeButton.style.height = `${rect.height}px`;
      fakeButton.style.pointerEvents = "none";
      document.body.appendChild(fakeButton);
      burstTeamEmoji(team, fakeButton);
      window.setTimeout(() => fakeButton.remove(), 2500);
    }
  }, 1200);

  window.setTimeout(() => layer.remove(), 3200);
}

function addWetBanditDrop() {
  const drop = document.createElement("span");
  drop.className = "wet-bandit-drop";
  drop.textContent = "💧";
  drop.setAttribute("aria-hidden", "true");
  drop.style.left = `${8 + Math.random() * 84}%`;
  drop.style.setProperty("--drop-delay", `${Math.random() * 140}ms`);
  document.body.appendChild(drop);
  window.setTimeout(() => drop.remove(), 1800);

  wetBanditWaterLevel = Math.min(6, wetBanditWaterLevel + 1);

  let water = document.querySelector(".wet-bandit-water");
  if (!water) {
    water = document.createElement("div");
    water.className = "wet-bandit-water";
    water.setAttribute("aria-hidden", "true");
    document.body.appendChild(water);
  }

  water.style.setProperty("--water-height", `${4 + wetBanditWaterLevel * 5}px`);
  water.classList.add("active");

  if (wetBanditDrainTimer) window.clearTimeout(wetBanditDrainTimer);
  wetBanditDrainTimer = window.setTimeout(() => {
    water.classList.add("draining");
    wetBanditWaterLevel = 0;
    window.setTimeout(() => water.remove(), 1200);
    wetBanditDrainTimer = null;
  }, 2600);
}


function addTeamBeerSplash() {
  const drop = document.createElement("span");
  drop.className = "team-beer-drop";
  drop.textContent = Math.random() < 0.5 ? "🍺" : "💧";
  drop.setAttribute("aria-hidden", "true");
  drop.style.left = `${8 + Math.random() * 84}%`;
  drop.style.setProperty("--beer-drop-delay", `${Math.random() * 140}ms`);
  document.body.appendChild(drop);
  window.setTimeout(() => drop.remove(), 1800);

  teamBeerLevel = Math.min(6, teamBeerLevel + 1);

  let beer = document.querySelector(".team-beer-puddle");
  if (!beer) {
    beer = document.createElement("div");
    beer.className = "team-beer-puddle";
    beer.setAttribute("aria-hidden", "true");
    document.body.appendChild(beer);
  }

  beer.style.setProperty("--beer-height", `${4 + teamBeerLevel * 5}px`);
  beer.classList.add("active");

  if (teamBeerDrainTimer) window.clearTimeout(teamBeerDrainTimer);
  teamBeerDrainTimer = window.setTimeout(() => {
    beer.classList.add("draining");
    teamBeerLevel = 0;
    window.setTimeout(() => beer.remove(), 1200);
    teamBeerDrainTimer = null;
  }, 2600);
}

function triggerSlickDisco() {
  if (slickDiscoActive) return;
  slickDiscoActive = true;

  const layer = document.createElement("div");
  layer.className = "slick-disco-layer";
  layer.setAttribute("aria-hidden", "true");
  layer.innerHTML = `
    <div class="slick-disco-ball">🪩</div>
    <div class="slick-disco-rays"></div>
  `;
  document.body.appendChild(layer);

  requestAnimationFrame(() => {
    layer.classList.add("active");
    document.body.classList.add("slick-disco-mode");
  });

  window.setTimeout(() => {
    layer.classList.add("leaving");
    document.body.classList.remove("slick-disco-mode");
    slickDiscoActive = false;
  }, 4000);

  window.setTimeout(() => layer.remove(), 4500);
}

function maybeTriggerSkyThunder() {
  // Rare enough to feel accidental.
  if (Math.random() > 0.18) return;

  const flash = document.createElement("div");
  flash.className = "sky-thunder-flash";
  flash.setAttribute("aria-hidden", "true");
  document.body.appendChild(flash);

  tone(105, .08, "sawtooth", .028);
  tone(65, .18, "square", .018, .04);

  requestAnimationFrame(() => flash.classList.add("active"));
  window.setTimeout(() => flash.remove(), 180);
}

function triggerChampionshipBelt() {
  const layer = document.createElement("div");
  layer.className = "championship-belt-egg";
  layer.setAttribute("aria-hidden", "true");
  layer.innerHTML = `
    <div class="championship-belt-title">TFC CHAMPIONSHIP BELT</div>
    <img src="${BELT_IMAGE_URL}" alt="" class="championship-belt-image">
  `;
  document.body.appendChild(layer);

  requestAnimationFrame(() => layer.classList.add("active"));
  window.setTimeout(() => layer.classList.add("leaving"), 3000);
  window.setTimeout(() => layer.remove(), 3600);
}

function handleTeamSpecificEasterEgg(team) {
  const count = incrementEggCount(team.teamName);

  if (team.teamName === "Baby Centipedes" && count >= 8) {
    resetEggCount(team.teamName);
    triggerCentipedeCrawl();
  }

  if (team.teamName === "Darf Box" && count >= 6) {
    resetEggCount(team.teamName);
    triggerDarfBoxEgg(team);
  }

  if (team.teamName === "Wet Bandits") {
    addWetBanditDrop();
    if (count >= 10) resetEggCount(team.teamName);
  }

  if (team.teamName === "Team BEER") {
    addTeamBeerSplash();
    if (count >= 10) resetEggCount(team.teamName);
  }

  if (team.teamName === "Slick Nicks" && count >= 5) {
    resetEggCount(team.teamName);
    triggerSlickDisco();
  }

  if (team.teamName === "Sky Clouds") {
    maybeTriggerSkyThunder();
  }

  // Hidden belt sequence: tap the league's 2X champs ONCE,
  // in the order they joined the 2X club.
  // Team BEER -> Sky Clouds -> Slick Nicks -> 55 -> Dead Birds.
  // Any unrelated team resets the sequence.
  const beltSteps = [
    ["Team BEER", 1],
    ["Sky Clouds", 1],
    ["Slick Nicks", 1],
    ["55 WRs 55 QBs 55 TEs 55 RBs", 1],
    ["dead birds", 1]
  ];

  const expectedTeam = beltSteps[beltSequenceProgress]?.[0];

  if (team.teamName === expectedTeam) {
    const sequenceKey = `belt:${beltSequenceProgress}`;
    const sequenceCount = (easterEggPressCounts.get(sequenceKey) || 0) + 1;
    easterEggPressCounts.set(sequenceKey, sequenceCount);

    if (sequenceCount >= beltSteps[beltSequenceProgress][1]) {
      beltSequenceProgress += 1;

      if (beltSequenceProgress >= beltSteps.length) {
        beltSequenceProgress = 0;
        beltSteps.forEach((_, index) => easterEggPressCounts.set(`belt:${index}`, 0));
        triggerChampionshipBelt();
      }
    }
  } else if (
    !beltSteps.some(([beltTeam]) => beltTeam === team.teamName)
  ) {
    beltSequenceProgress = 0;
    beltSteps.forEach((_, index) => easterEggPressCounts.set(`belt:${index}`, 0));
  }
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
 if(!topSixDrama)return;

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
    .sort((a, b) => ballsFor(a.lottoPosition) - ballsFor(b.lottoPosition));
 const total = remaining.reduce((sum, team) => sum + ballsFor(team.lottoPosition), 0);

 topSixDrama.dataset.remaining = String(remaining.length);
 topSixDrama.classList.toggle("full-hopper", remaining.length > 6);
 topSixDrama.classList.toggle("opening-hopper", pick === 12);

 topSixOdds.innerHTML=remaining.map((team,index)=>{
  const pct = total ? ((ballsFor(team.lottoPosition) / total) * 100).toFixed(1) : "0.0";
  const championshipRematch = pick === 12 && (
    team.teamName === "dead birds" ||
    team.teamName === "KFC Karaokee"
  );
  const rematchClass = championshipRematch ? " championship-rematch" : "";
  return `<div class="top-six-odds-row ${index===0?"leader":""}${rematchClass}" data-pick="${team.draftPick}">
      <span class="top-six-team">${team.emojis[0]} ${team.teamName}</span>
      <span class="top-six-pct">${pct}%</span>
    </div>`;
 }).join("");
 const note = TOP_SIX_COUNTDOWN_NOTES[pick] || "";
 topSixNote.textContent = note;

 if (note) {
   countdownLayer.dataset.tapeNote = note;
 } else {
   delete countdownLayer.dataset.tapeNote;
 }

 topSixDrama.classList.add("active");
 topSixDrama.setAttribute("aria-hidden","false");
}

async function highlightTopSixWinner(pick, { allowEarly = false } = {}) {
  const isTopSixHighlight = pick >= 3 && pick <= 6;
  if ((!isTopSixHighlight && !allowEarly) || !topSixOdds) return;

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
  // Every pick now gets the live-hopper countdown presentation.
  renderTopSixDrama(pick);
  countdownLayer.classList.add("top-six-mode");

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

  // Picks 6–3 retain the winner highlight.
  // For the first two reveals (12 & 11), highlight only when the result
  // is NOT a Drop Alert. A Drop Alert stays secret until its own sequence.
  const pendingTeam = lotteryResults.find(team => team.draftPick === pick);
  const isEarlyReveal = pick === 12 || pick === 11;
  const shouldHighlightEarly = isEarlyReveal && !isCatastrophicDrop(pendingTeam);
  const shouldHighlightTopSix = pick >= 3 && pick <= 6;

  if (shouldHighlightEarly || shouldHighlightTopSix) {
    countdownLayer.classList.remove("tick");
    await highlightTopSixWinner(pick, { allowEarly: shouldHighlightEarly });
  }

  countdownLayer.classList.remove("active", "tick");
  countdownLayer.setAttribute("aria-hidden", "true");
}



function isCatastrophicDrop(team) {
  return team && (team.draftPick - team.lottoPosition) >= 4;
}

async function showKillScreen(team) {
  if (!team || !countdownEnabled || !isCatastrophicDrop(team)) return;

  // Put DROP ALERT on screen first, then start Game Over immediately.
  // Do NOT await the audio before rendering: the visual and music should
  // run together as one interstitial.
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

  // playDropAlertSound pauses the normal soundtrack while Game Over plays.
  // Keep the alert visible for that entire cue.
  const gameOverPromise = playDropAlertSound();
  await Promise.all([
    gameOverPromise,
    sleep(1450)
  ]);

  layer.classList.add("leaving");
  await sleep(300);
  layer.remove();
}

function autoCelebrateReveal(team, burstButton, pick) {
  if (!team || !burstButton) return;

  if (pick !== 1) {
    window.setTimeout(() => burstTeamEmoji(team, burstButton), 420);
    return;
  }

  for (let i = 0; i < 10; i += 1) {
    window.setTimeout(() => {
      burstTeamEmoji(team, burstButton, {
        density: i % 2 === 0 ? 0.52 : 0.34,
        includeRain: i % 4 === 0
      });
    }, 500 + (i * 560));
  }

  if (team.teamName === "KFC Karaokee") {
    window.setTimeout(dropLonelyChicken, 7600);
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

  if (pick === 1) {
    switchToTopPickRevealMusic();
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
    // Keep Touchdown Fanfare running after #1. Bases Loaded must not
    // start until the user explicitly presses SHOW DRAFT ORDER.
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

  playDraftOrderStingThenPostLottery();
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
  pickOneTransitionMusicActivated = false;
  topPickRevealMusicActivated = false;
  draftOrderStingActive = false;
  pendingPostLotteryMusic = false;
  backgroundMusicTargetVolume = MUSIC_VOLUMES.nbaJam;
  finalPickMusicActivated = false;
  postLotteryMusicActivated = false;
  if (dropAlertAudio) {
    dropAlertAudio.pause();
    dropAlertAudio.currentTime = 0;
    dropAlertAudio = null;
  }

  deadBirdsClicks = 0;
  teamPressCounts.clear();
  easterEggPressCounts.clear();
  beltSequenceProgress = 0;
  wetBanditWaterLevel = 0;
  teamBeerLevel = 0;
  slickDiscoActive = false;

  if (wetBanditDrainTimer) {
    window.clearTimeout(wetBanditDrainTimer);
    wetBanditDrainTimer = null;
  }

  if (teamBeerDrainTimer) {
    window.clearTimeout(teamBeerDrainTimer);
    teamBeerDrainTimer = null;
  }

  document.querySelectorAll(
    ".centipede-crawl, .darf-box-egg, .wet-bandit-drop, .wet-bandit-water, .team-beer-drop, .team-beer-puddle, .slick-disco-layer, .sky-thunder-flash, .championship-belt-egg"
  ).forEach(node => node.remove());

  document.body.classList.remove("slick-disco-mode");
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

  if (pick === 1 && !pickOneTransitionMusicActivated) {
    switchToPickOneTransitionMusic();
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
