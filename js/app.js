import { db } from "./firebase-config.js";
import {
  AVATARS,
  PLAYER_COLORS,
  GAME_MODES,
  DIFFICULTIES,
  QUESTIONS_PER_GAME,
  QUESTION_TIME_SECONDS,
  buildGameQuestions,
  getQuestionBankStats
} from "./question-bank.js";
import {
  UI_TEXT,
  DEFAULT_LANGUAGE,
  getStoredLanguage,
  storeLanguage
} from "./translations.js";

const DEFAULT_SETTINGS = {
  mode: "mixed",
  difficulty: "mixed",
  questionTime: QUESTION_TIME_SECONDS
};

const POWERUP_DEFS = [
  { id: "fiftyFifty", icon: "✂️" },
  { id: "doublePoints", icon: "✨" },
  { id: "freezeTime", icon: "⏳" },
  { id: "shield", icon: "🛡️" }
];

const TOTAL_POWERUP_USES = 3;
const BASE_POINTS = 10;
const WRONG_PENALTY = 5;
const FREEZE_TIME_MS = 5000;

const els = {
  nameInput: document.getElementById("input-name"),
  codeInput: document.getElementById("input-code"),
  joinError: document.getElementById("join-error"),
  lobbyCode: document.getElementById("lobby-code"),
  lobbyPlayers: document.getElementById("lobby-players"),
  modeOptions: document.getElementById("mode-options"),
  difficultyOptions: document.getElementById("difficulty-options"),
  settingsSummary: document.getElementById("settings-summary"),
  resultSettingsSummary: document.getElementById("result-settings-summary"),
  startBtn: document.getElementById("btn-start"),
  qNum: document.getElementById("q-num"),
  qBar: document.getElementById("q-bar"),
  qCat: document.getElementById("q-cat"),
  qMode: document.getElementById("q-mode"),
  qFlag: document.getElementById("q-flag"),
  qText: document.getElementById("q-text"),
  qHint: document.getElementById("q-hint"),
  powerupsGrid: document.getElementById("powerups-grid"),
  powerupsLeft: document.getElementById("powerups-left"),
  qOpts: document.getElementById("q-opts"),
  qFb: document.getElementById("q-fb"),
  qScores: document.getElementById("q-scores"),
  oppStatus: document.getElementById("opp-status"),
  waitingNext: document.getElementById("waiting-next"),
  timerPill: document.getElementById("timer-pill"),
  timerBar: document.getElementById("timer-bar"),
  leaderLine: document.getElementById("leader-line"),
  resTrophy: document.getElementById("res-trophy"),
  resHeadline: document.getElementById("res-headline"),
  resSub: document.getElementById("res-sub"),
  championCard: document.getElementById("champion-card"),
  leaderboardTitle: document.getElementById("leaderboard-title"),
  scoreboard: document.getElementById("scoreboard")
};

let currentLanguage = getStoredLanguage();
let myId = null;
let myName = "";
let roomCode = "";
let roomRef = null;
let amHost = false;
let gameQuestions = [];
let playersData = {};
let roomState = null;
let currentQIdx = 0;
let renderedQuestionIndex = -1;
let answered = false;
let myScore = 0;
let timerInterval = null;
let roomListener = null;
let advancingKey = null;

document.getElementById("btn-create-room").addEventListener("click", createRoom);
document.getElementById("btn-join-room").addEventListener("click", joinRoom);
document.getElementById("btn-start").addEventListener("click", startGame);
document.getElementById("btn-leave-room").addEventListener("click", leaveRoom);
document.getElementById("btn-play-again").addEventListener("click", playAgain);
document.getElementById("btn-go-home").addEventListener("click", goHome);
document.querySelectorAll(".lang-btn").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang || DEFAULT_LANGUAGE));
});

setupSettingsButtons();
renderStaticText();
renderLanguageButtons();

function t() {
  return UI_TEXT[currentLanguage] || UI_TEXT[DEFAULT_LANGUAGE];
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function randomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  return Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

function randomAvatar() {
  return AVATARS[Math.floor(Math.random() * AVATARS.length)];
}

function show(id) {
  document.querySelectorAll(".screen").forEach((screen) => screen.classList.remove("active"));
  document.getElementById(`screen-${id}`).classList.add("active");
}

function setLanguage(language) {
  currentLanguage = UI_TEXT[language] ? language : DEFAULT_LANGUAGE;
  storeLanguage(currentLanguage);
  renderLanguageButtons();
  renderStaticText();
  applySettingButtons(roomState?.settings || DEFAULT_SETTINGS);
  renderSettingsSummary(roomState?.settings || DEFAULT_SETTINGS);
  if (roomState?.status === "lobby") renderLobby(roomState);
  if (roomState?.status === "playing") {
    renderQuestion();
    renderScores();
    renderLeaderLine();
    checkOpponentStatus();
    updateTimerUi();
  }
  if (roomState?.status === "finished") renderResults(roomState);
}

function renderLanguageButtons() {
  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === currentLanguage);
  });
}

function renderStaticText() {
  document.documentElement.lang = currentLanguage;
  document.title = t().pageTitle;
  document.getElementById("home-title").innerHTML = t().homeTitle;
  document.getElementById("home-sub").textContent = t().homeSub;
  document.getElementById("name-card-title").textContent = t().nameCardTitle;
  els.nameInput.placeholder = t().namePlaceholder;
  document.getElementById("btn-create-room").textContent = t().createRoom;
  document.getElementById("join-card-title").textContent = t().joinCardTitle;
  els.codeInput.placeholder = t().codePlaceholder;
  document.getElementById("btn-join-room").textContent = t().joinRoom;
  document.getElementById("lobby-code-title").textContent = t().lobbyCodeTitle;
  document.getElementById("lobby-hint").textContent = t().lobbyHint;
  document.getElementById("match-settings-title").textContent = t().matchSettingsTitle;
  document.getElementById("mode-label").textContent = t().modeLabel;
  document.getElementById("difficulty-label").textContent = t().difficultyLabel;
  document.getElementById("powerups-title").textContent = t().powerupsTitle;
  document.getElementById("waiting-text").textContent = t().waitingPlayers;
  document.getElementById("result-settings-title").textContent = t().resultSettingsTitle;
  els.leaderboardTitle.textContent = t().leaderboardTitle;
  document.getElementById("btn-play-again").textContent = t().playAgain;
  document.getElementById("btn-go-home").textContent = t().goHome;
}

function getModeLabel(id) {
  return t().modes[id] || id;
}

function getDifficultyLabel(id) {
  return t().difficulties[id] || id;
}

function getCategoryLabel(key) {
  return t().categories[key] || key;
}

function getLocalizedText(value) {
  if (typeof value === "string") return value;
  return value?.[currentLanguage] || value?.[DEFAULT_LANGUAGE] || "";
}

function createInitialPowerupState() {
  return {
    usesLeft: TOTAL_POWERUP_USES,
    used: {
      fiftyFifty: false,
      doublePoints: false,
      freezeTime: false,
      shield: false
    },
    active: {
      doublePoints: false,
      shield: false
    },
    extraTimeMs: 0
  };
}

function normalizePowerupState(player) {
  return {
    ...createInitialPowerupState(),
    ...(player?.powerups || {}),
    used: {
      ...createInitialPowerupState().used,
      ...(player?.powerups?.used || {})
    },
    active: {
      ...createInitialPowerupState().active,
      ...(player?.powerups?.active || {})
    }
  };
}

function getMyPlayer() {
  return playersData[myId] || null;
}

function getMyPowerups() {
  return normalizePowerupState(getMyPlayer());
}

function getPlayerRemainingMs(player) {
  const baseMs = (roomState?.settings?.questionTime || QUESTION_TIME_SECONDS) * 1000;
  const startedAt = roomState?.questionStartedAt || Date.now();
  const extraTimeMs = normalizePowerupState(player).extraTimeMs || 0;
  return Math.max(0, baseMs + extraTimeMs - (Date.now() - startedAt));
}

function getPowerupButtonDisabled(id, powerups) {
  if (answered) return true;
  if (!roomState || roomState.status !== "playing") return true;
  if ((powerups.usesLeft || 0) <= 0) return true;
  if (powerups.used[id]) return true;
  if (id === "freezeTime" && getRemainingMs() === 0) return true;
  return false;
}

function getSettingsSummary(settings) {
  return t().settingsSummary(
    getModeLabel(settings.mode),
    getDifficultyLabel(settings.difficulty),
    QUESTIONS_PER_GAME,
    settings.questionTime || QUESTION_TIME_SECONDS
  );
}

function setupSettingsButtons() {
  renderOptionButtons(els.modeOptions, GAME_MODES, "mode", "modes");
  renderOptionButtons(els.difficultyOptions, DIFFICULTIES, "difficulty", "difficulties");
  renderSettingsSummary(DEFAULT_SETTINGS);
}

function renderOptionButtons(container, options, key, dictKey) {
  container.innerHTML = "";

  options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "chip-btn";
    button.type = "button";
    button.textContent = t()[dictKey][option.labelKey];
    button.dataset.value = option.id;
    button.dataset.settingKey = key;
    button.dataset.dictKey = dictKey;
    button.dataset.labelKey = option.labelKey;
    button.addEventListener("click", () => updateRoomSettings(key, option.id));
    container.appendChild(button);
  });
}

function refreshOptionLabels() {
  document.querySelectorAll(".chip-btn").forEach((button) => {
    const dictKey = button.dataset.dictKey;
    const labelKey = button.dataset.labelKey;
    if (dictKey && labelKey) {
      button.textContent = t()[dictKey][labelKey];
    }
  });
}

function applySettingButtons(settings) {
  refreshOptionLabels();
  document.querySelectorAll(".chip-btn").forEach((button) => {
    const settingKey = button.dataset.settingKey;
    button.classList.toggle("active", settings[settingKey] === button.dataset.value);
    button.disabled = !amHost;
  });
}

function renderSettingsSummary(settings) {
  const summary = getSettingsSummary(settings);
  els.settingsSummary.textContent = summary;
  if (els.resultSettingsSummary) {
    els.resultSettingsSummary.textContent = summary;
  }
}

async function updateRoomSettings(key, value) {
  if (!amHost || !roomRef || !roomState || roomState.status !== "lobby") return;
  await roomRef.child("settings").update({
    ...(roomState.settings || DEFAULT_SETTINGS),
    [key]: value
  });
}

async function createRoom() {
  const name = els.nameInput.value.trim();
  if (!name) {
    alert(t().needName);
    return;
  }

  myId = uid();
  myName = name;
  amHost = true;
  roomCode = randomCode();
  roomRef = db.ref(`rooms/${roomCode}`);

  await roomRef.set({
    host: myId,
    status: "lobby",
    currentQ: 0,
    questionStartedAt: null,
    settings: { ...DEFAULT_SETTINGS },
    questions: [],
    players: {
      [myId]: {
        name: myName,
        score: 0,
        color: PLAYER_COLORS[0],
        avatar: randomAvatar(),
        currentQ: -1,
        correct: 0
        ,
        powerups: createInitialPowerupState()
      }
    }
  });

  roomRef.child(`players/${myId}`).onDisconnect().remove();
  listenRoom();
  show("lobby");
  els.lobbyCode.textContent = roomCode;
}

async function joinRoom() {
  const name = els.nameInput.value.trim();
  const code = els.codeInput.value.trim().toUpperCase();
  els.joinError.textContent = "";

  if (!name) {
    els.joinError.textContent = t().needName;
    return;
  }
  if (code.length !== 4) {
    els.joinError.textContent = t().roomCodeLength;
    return;
  }

  const snap = await db.ref(`rooms/${code}`).get();
  if (!snap.exists()) {
    els.joinError.textContent = t().roomNotFound;
    return;
  }

  const data = snap.val();
  if (data.status !== "lobby") {
    els.joinError.textContent = t().gameStarted;
    return;
  }

  const playerCount = Object.keys(data.players || {}).length;
  if (playerCount >= 4) {
    els.joinError.textContent = t().roomFull;
    return;
  }

  myId = uid();
  myName = name;
  amHost = false;
  roomCode = code;
  roomRef = db.ref(`rooms/${code}`);

  await roomRef.child(`players/${myId}`).set({
    name: myName,
    score: 0,
    color: PLAYER_COLORS[playerCount % PLAYER_COLORS.length],
    avatar: randomAvatar(),
    currentQ: -1,
    correct: 0
    ,
    powerups: createInitialPowerupState()
  });

  roomRef.child(`players/${myId}`).onDisconnect().remove();
  listenRoom();
  show("lobby");
  els.lobbyCode.textContent = code;
}

function listenRoom() {
  if (roomListener && roomRef) {
    roomRef.off("value", roomListener);
  }

  roomListener = roomRef.on("value", (snap) => {
    if (!snap.exists()) {
      goHome();
      return;
    }

    roomState = snap.val();
    playersData = roomState.players || {};
    gameQuestions = roomState.questions || [];
    renderSettingsSummary(roomState.settings || DEFAULT_SETTINGS);
    applySettingButtons(roomState.settings || DEFAULT_SETTINGS);

    if (roomState.status === "lobby") {
      renderedQuestionIndex = -1;
      stopTimer();
      renderLobby(roomState);
      return;
    }

    if (roomState.status === "playing") {
      handlePlayingState(roomState);
      return;
    }

    if (roomState.status === "finished") {
      stopTimer();
      renderResults(roomState);
    }
  });
}

function renderLobby(data) {
  const players = Object.entries(data.players || {});
  els.lobbyPlayers.innerHTML = "";

  players.forEach(([id, player]) => {
    const row = document.createElement("div");
    row.className = "player-slot";
    row.innerHTML = `
      <div class="avatar" style="background:${player.color}">${player.avatar || "🌍"}</div>
      <span style="font-weight:600">${player.name}${id === myId ? ` (${t().you})` : ""}</span>
      <div class="status-dot"></div>
    `;
    els.lobbyPlayers.appendChild(row);
  });

  for (let i = players.length; i < 4; i += 1) {
    const row = document.createElement("div");
    row.className = "player-slot waiting";
    row.innerHTML = `<div class="avatar"></div><span style="color:var(--muted)">${t().waitingPlayerSlot}</span>`;
    els.lobbyPlayers.appendChild(row);
  }

  if (amHost && players.length >= 2) {
    els.startBtn.disabled = false;
    els.startBtn.textContent = t().startWithCount(players.length);
  } else if (amHost) {
    els.startBtn.disabled = true;
    els.startBtn.textContent = t().needFriend;
  } else {
    els.startBtn.disabled = true;
    els.startBtn.textContent = t().waitingHost;
  }

  document.getElementById("btn-leave-room").textContent = t().leave;
}

async function startGame() {
  if (!amHost || !roomRef || !roomState) return;

  const settings = roomState.settings || DEFAULT_SETTINGS;
  const questions = buildGameQuestions(settings);
  const resetPlayers = {};

  Object.entries(playersData).forEach(([id, player]) => {
    resetPlayers[id] = {
      ...player,
      score: 0,
      currentQ: -1,
      correct: 0
      ,
      powerups: createInitialPowerupState()
    };
  });

  await roomRef.update({
    status: "playing",
    currentQ: 0,
    questionStartedAt: Date.now(),
    settings,
    questions,
    players: resetPlayers
  });
}

function handlePlayingState(data) {
  currentQIdx = data.currentQ || 0;

  if (!document.getElementById("screen-quiz").classList.contains("active")) {
    show("quiz");
  }

  if (renderedQuestionIndex !== currentQIdx) {
    renderedQuestionIndex = currentQIdx;
    answered = false;
    renderQuestion();
  }

  myScore = playersData[myId]?.score || 0;
  renderScores();
  renderPowerups();
  renderLeaderLine();
  checkOpponentStatus();
  updateTimerUi();
  startTimer();

  if (amHost) {
    maybeAdvanceGame(data);
  }
}

function renderQuestion() {
  const question = gameQuestions[currentQIdx];
  if (!question) return;

  els.qNum.textContent = t().questionCounter(currentQIdx + 1, gameQuestions.length);
  els.qBar.style.width = `${(currentQIdx / gameQuestions.length) * 100}%`;
  els.qCat.textContent = getCategoryLabel(question.category);
  els.qMode.textContent = t().questionTagDifficulty(getDifficultyLabel(roomState?.settings?.difficulty || "mixed"));
  els.qFlag.textContent = question.flag;
  els.qText.textContent = getLocalizedText(question.question);
  els.qHint.textContent = `${t().hintPrefix} ${getLocalizedText(question.hint)}`;
  els.qFb.className = "feedback";
  els.qFb.textContent = "";
  els.oppStatus.textContent = "";
  els.waitingNext.style.display = "none";
  els.qOpts.innerHTML = "";
  renderPowerups();

  question.optionOrder.forEach((optionId) => {
    const button = document.createElement("button");
    button.className = "opt";
    button.type = "button";
    button.textContent = getLocalizedText(question.options[optionId]);
    button.dataset.optionId = optionId;
    button.addEventListener("click", () => submitAnswer(optionId));
    els.qOpts.appendChild(button);
  });
}

function renderPowerups() {
  const powerups = getMyPowerups();
  els.powerupsLeft.textContent = t().powerupsLeft(powerups.usesLeft || 0);
  els.powerupsGrid.innerHTML = "";

  POWERUP_DEFS.forEach((def) => {
    const button = document.createElement("button");
    const isActive = def.id !== "fiftyFifty" && powerups.active?.[def.id];
    const isUsed = !!powerups.used?.[def.id];
    button.type = "button";
    button.className = `powerup-btn${isActive ? " active" : ""}${isUsed ? " used" : ""}`;
    button.disabled = getPowerupButtonDisabled(def.id, powerups);
    button.setAttribute("aria-label", t().powerupDescriptions[def.id]);
    button.innerHTML = `
      <span class="powerup-icon">${def.icon}</span>
      <span class="powerup-label">${t().powerups[def.id]}</span>
      <span class="powerup-tooltip${isUsed ? " is-used" : ""}">${isUsed ? t().powerupUsed : t().powerupDescriptions[def.id]}</span>
    `;
    button.addEventListener("click", () => activatePowerup(def.id));
    els.powerupsGrid.appendChild(button);
  });
}

function renderScores() {
  els.qScores.innerHTML = "";
  Object.values(playersData).forEach((player) => {
    const chip = document.createElement("div");
    chip.className = "score-chip";
    chip.style.borderColor = player.color;
    chip.style.color = player.color;
    chip.textContent = t().scoreChip(player.avatar || "🌍", player.name.split(" ")[0], player.score);
    els.qScores.appendChild(chip);
  });
}

function renderLeaderLine() {
  const sorted = Object.values(playersData).sort((a, b) => b.score - a.score);
  const leader = sorted[0];
  if (!leader) {
    els.leaderLine.textContent = "";
    return;
  }
  const second = sorted[1];
  if (!second) {
    els.leaderLine.textContent = t().leaderSolo(leader.name);
    return;
  }
  const diff = leader.score - second.score;
  if (diff >= 20) {
    els.leaderLine.textContent = t().leaderFire(leader.name);
  } else if (diff > 0) {
    els.leaderLine.textContent = t().leaderClose(second.name, diff);
  } else {
    els.leaderLine.textContent = t().leaderTie;
  }
}

function disableOptions() {
  document.querySelectorAll(".opt").forEach((button) => {
    button.disabled = true;
  });
}

async function submitAnswer(selectedOptionId, isTimeout = false) {
  if (answered || !roomRef) return;
  answered = true;

  const question = gameQuestions[currentQIdx];
  const correct = selectedOptionId === question.answerId;
  let gained = 0;
  const currentPlayer = playersData[myId] || {};
  const powerups = normalizePowerupState(currentPlayer);
  const hadDoublePoints = !!powerups.active.doublePoints;
  const hadShield = !!powerups.active.shield;

  document.querySelectorAll(".opt").forEach((button) => {
    button.disabled = true;
    if (button.dataset.optionId === question.answerId) {
      button.classList.add("correct");
    } else if (selectedOptionId && button.dataset.optionId === selectedOptionId && !correct) {
      button.classList.add("wrong");
    }
  });

  const localizedAnswer = getLocalizedText(question.options[question.answerId]);
  let feedbackSuffix = "";

  if (correct) {
    gained = hadDoublePoints ? BASE_POINTS * 2 : BASE_POINTS;
    myScore += gained;
    els.qFb.textContent = t().correct(gained, getLocalizedText(question.fact));
    els.qFb.className = "feedback ok show";
    if (hadDoublePoints) {
      feedbackSuffix = ` ${t().bonusActivated.doublePoints}`;
    }
  } else if (isTimeout) {
    if (!hadShield) {
      myScore -= WRONG_PENALTY;
      feedbackSuffix = ` ${t().penaltyNotice(WRONG_PENALTY)}`;
    } else {
      feedbackSuffix = ` ${t().shieldSaved}`;
    }
    els.qFb.textContent = t().timeout(localizedAnswer, getLocalizedText(question.fact));
    els.qFb.className = "feedback bad show";
  } else {
    if (!hadShield) {
      myScore -= WRONG_PENALTY;
      feedbackSuffix = ` ${t().penaltyNotice(WRONG_PENALTY)}`;
    } else {
      feedbackSuffix = ` ${t().shieldSaved}`;
    }
    els.qFb.textContent = t().wrong(localizedAnswer, getLocalizedText(question.fact));
    els.qFb.className = "feedback bad show";
  }
  els.qFb.textContent += feedbackSuffix;

  await roomRef.child(`players/${myId}`).update({
    score: myScore,
    currentQ: currentQIdx,
    correct: (currentPlayer.correct || 0) + (correct ? 1 : 0),
    powerups: {
      ...powerups,
      active: {
        ...powerups.active,
        doublePoints: false,
        shield: false
      }
    }
  });

  els.waitingNext.style.display = "block";
  renderPowerups();
}

function getRemainingMs() {
  return getPlayerRemainingMs(getMyPlayer());
}

function updateTimerUi() {
  const totalMs = (roomState?.settings?.questionTime || QUESTION_TIME_SECONDS) * 1000;
  const remainingMs = getRemainingMs();
  const secondsLeft = Math.ceil(remainingMs / 1000);
  const ratio = totalMs === 0 ? 0 : (remainingMs / totalMs) * 100;

  els.timerPill.textContent = t().secondsShort(secondsLeft);
  els.timerBar.style.width = `${Math.max(0, ratio)}%`;

  if (remainingMs === 0) {
    disableOptions();
    if (!answered) {
      submitAnswer(null, true);
    }
  }
}

function startTimer() {
  stopTimer();
  timerInterval = window.setInterval(() => {
    updateTimerUi();
    if (amHost && roomState?.status === "playing") {
      maybeAdvanceGame(roomState);
    }
  }, 250);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function checkOpponentStatus() {
  if (!answered) {
    els.oppStatus.textContent = "";
    return;
  }

  const others = Object.entries(playersData).filter(([id]) => id !== myId);
  const answeredCount = others.filter(([, player]) => player.currentQ >= currentQIdx).length;

  if (answeredCount === others.length) {
    els.oppStatus.textContent = "";
  } else {
    els.oppStatus.textContent = t().waitingAnswers(others.length - answeredCount, others.length);
  }
}

async function maybeAdvanceGame(data) {
  const questionIndex = data.currentQ || 0;
  const players = Object.values(data.players || {});
  const allAnswered = players.every((player) => player.currentQ >= questionIndex);
  const allExpired = players.every((player) => getPlayerRemainingMs(player) === 0 || player.currentQ >= questionIndex);
  const advanceKey = `${data.status}:${questionIndex}:${data.questionStartedAt}`;

  if ((!allAnswered && !allExpired) || advancingKey === advanceKey) return;
  advancingKey = advanceKey;

  if (questionIndex + 1 >= (data.questions || []).length) {
    await roomRef.update({ status: "finished" });
    return;
  }

  await roomRef.update({
    currentQ: questionIndex + 1,
    questionStartedAt: Date.now(),
    players: Object.fromEntries(
      Object.entries(playersData).map(([id, player]) => [
        id,
        {
          ...player,
          powerups: {
            ...normalizePowerupState(player),
            extraTimeMs: 0,
            active: {
              ...normalizePowerupState(player).active,
              doublePoints: false,
              shield: false
            }
          }
        }
      ])
    )
  });
}

function renderResults(data) {
  show("results");

  const sorted = Object.values(data.players || {}).sort((a, b) => b.score - a.score);
  const medals = ["🥇", "🥈", "🥉", "4️⃣"];
  const me = data.players?.[myId];
  const winner = sorted[0];
  const tie = sorted.filter((player) => player.score === winner.score).length > 1;
  const iWon = me && winner && me.name === winner.name && me.score === winner.score && !tie;

  els.resTrophy.textContent = tie ? "🤝" : (iWon ? "🏆" : "😤");
  els.resHeadline.textContent = tie ? t().resultTie : (iWon ? t().resultWinYou : t().resultWinOther(winner.name));
  els.resSub.textContent = t().resultPlayersQuestions(sorted.length, gameQuestions.length);
  els.leaderboardTitle.textContent = t().leaderboardTitle;

  const winnerAccuracy = gameQuestions.length ? Math.round(((winner.correct || 0) / gameQuestions.length) * 100) : 0;
  els.championCard.innerHTML = `
    <div class="champion-place">${t().placeLabel(1)}</div>
    <div class="champion-avatar" style="background:${winner.color}">${winner.avatar || "🌍"}</div>
    <div class="champion-name">${winner.name}</div>
    <div class="champion-score">${t().championScore(winner.score, winner.correct || 0, winnerAccuracy)}</div>
  `;

  els.scoreboard.innerHTML = "";
  sorted.slice(1).forEach((player, index) => {
    const place = index + 2;
    const accuracy = gameQuestions.length ? Math.round(((player.correct || 0) / gameQuestions.length) * 100) : 0;
    const row = document.createElement("div");
    row.className = "sb-row";
    row.innerHTML = `
      <div class="sb-rank">${medals[place - 1] || "•"}</div>
      <div class="avatar" style="background:${player.color}">${player.avatar || "🌍"}</div>
      <div class="sb-info">
        <div class="sb-name">${player.name}</div>
        <div class="sb-place">${t().placeLabel(place)}</div>
        <div class="sb-detail">${t().scoreDetail(player.score, player.correct || 0, accuracy)}</div>
      </div>
      <div class="sb-pts">${player.score}</div>
    `;
    els.scoreboard.appendChild(row);
  });
}

async function playAgain() {
  if (!roomRef || !roomState) return;

  if (amHost) {
    const settings = roomState.settings || DEFAULT_SETTINGS;
    const questions = buildGameQuestions(settings);
    const resetPlayers = {};

    Object.entries(playersData).forEach(([id, player]) => {
      resetPlayers[id] = {
        ...player,
        score: 0,
        currentQ: -1,
      correct: 0
      ,
      powerups: {
        ...normalizePowerupState(player),
        extraTimeMs: 0,
        active: {
          ...normalizePowerupState(player).active,
          doublePoints: false,
          shield: false
        }
      }
    };
  });

    await roomRef.update({
      status: "lobby",
      currentQ: 0,
      questionStartedAt: null,
      questions,
      players: resetPlayers
    });
  } else {
    await roomRef.child(`players/${myId}`).update({
      score: 0,
      currentQ: -1,
      correct: 0
      ,
      powerups: {
        ...normalizePowerupState(playersData[myId]),
        extraTimeMs: 0,
        active: {
          ...normalizePowerupState(playersData[myId]).active,
          doublePoints: false,
          shield: false
        }
      }
    });
  }
}

async function activatePowerup(id) {
  if (!roomRef || answered || !roomState || roomState.status !== "playing") return;

  const player = getMyPlayer();
  const powerups = normalizePowerupState(player);
  if (getPowerupButtonDisabled(id, powerups)) return;

  const nextPowerups = {
    ...powerups,
    usesLeft: Math.max(0, (powerups.usesLeft || 0) - 1),
    used: {
      ...powerups.used,
      [id]: true
    },
    active: {
      ...powerups.active
    }
  };

  if (id === "fiftyFifty") {
    applyFiftyFifty();
  } else if (id === "doublePoints") {
    nextPowerups.active.doublePoints = true;
  } else if (id === "freezeTime") {
    nextPowerups.extraTimeMs = (nextPowerups.extraTimeMs || 0) + FREEZE_TIME_MS;
  } else if (id === "shield") {
    nextPowerups.active.shield = true;
  }

  await roomRef.child(`players/${myId}/powerups`).set(nextPowerups);
  playersData[myId] = {
    ...player,
    powerups: nextPowerups
  };
  renderPowerups();

  if (id !== "fiftyFifty") {
    els.qFb.textContent = t().bonusActivated[id];
    els.qFb.className = "feedback ok show";
  }
}

function applyFiftyFifty() {
  const question = gameQuestions[currentQIdx];
  const wrongButtons = Array.from(document.querySelectorAll(".opt")).filter(
    (button) => button.dataset.optionId !== question.answerId
  );
  wrongButtons.slice(0, 2).forEach((button) => {
    button.disabled = true;
    button.style.opacity = "0.35";
  });
  els.qFb.textContent = t().bonusActivated.fiftyFifty;
  els.qFb.className = "feedback ok show";
}

function leaveRoom() {
  if (roomRef && myId) {
    roomRef.child(`players/${myId}`).remove();
  }
  goHome();
}

function goHome() {
  stopTimer();

  if (roomListener && roomRef) {
    roomRef.off("value", roomListener);
  }

  roomRef = null;
  roomListener = null;
  roomState = null;
  playersData = {};
  gameQuestions = [];
  renderedQuestionIndex = -1;
  answered = false;
  amHost = false;
  myId = null;
  myName = "";
  roomCode = "";
  advancingKey = null;
  els.joinError.textContent = "";
  show("home");
}

console.log("GeoQuiz question bank:", getQuestionBankStats());
