
"use strict";

// ========================================
// 아준이의 레일댄스 콘서트
// ========================================

const VEHICLES = [
  // 고속열차
  {id:"ktx1", name:"KTX 산천", emoji:"🚄", type:"high"},
  {id:"ktx2", name:"KTX 청룡", emoji:"🚅", type:"high"},
  {id:"ktx3", name:"KTX-1", emoji:"🚄", type:"high"},
  {id:"srt", name:"SRT", emoji:"🚄", type:"high"},
  {id:"srt2", name:"SRT 320", emoji:"🚅", type:"high"},
  {id:"haemu", name:"해무", emoji:"🚄", type:"high"},

  // 일반열차
  {id:"mugunghwa", name:"무궁화호", emoji:"🚃", type:"normal"},
  {id:"cdc", name:"무궁화 CDC", emoji:"🚞", type:"normal"},
  {id:"saemaeul", name:"새마을호", emoji:"🚆", type:"normal"},
  {id:"itxsae", name:"ITX 새마을", emoji:"🚆", type:"normal"},
  {id:"itxmaeum", name:"ITX 마음", emoji:"🚈", type:"normal"},
  {id:"itxchun", name:"ITX 청춘", emoji:"🚆", type:"normal"},
  {id:"nuriro", name:"누리로", emoji:"🚃", type:"normal"},
  {id:"mugunghwa2", name:"무궁화 객차", emoji:"🚋", type:"normal"},

  // 지하철과 전동열차
  {id:"line1", name:"수도권 1호선", emoji:"🚇", type:"metro"},
  {id:"line2", name:"서울 2호선", emoji:"🚇", type:"metro"},
  {id:"line3", name:"서울 3호선", emoji:"🚇", type:"metro"},
  {id:"line4", name:"서울 4호선", emoji:"🚇", type:"metro"},
  {id:"line5", name:"서울 5호선", emoji:"🚇", type:"metro"},
  {id:"line6", name:"서울 6호선", emoji:"🚇", type:"metro"},
  {id:"line7", name:"서울 7호선", emoji:"🚇", type:"metro"},
  {id:"line8", name:"서울 8호선", emoji:"🚇", type:"metro"},
  {id:"line9", name:"서울 9호선", emoji:"🚇", type:"metro"},
  {id:"airport", name:"공항철도", emoji:"🚈", type:"metro"},
  {id:"ui", name:"우이신설선", emoji:"🚝", type:"metro"},
  {id:"shinbundang", name:"신분당선", emoji:"🚇", type:"metro"},
  {id:"gimhae", name:"부산김해경전철", emoji:"🚝", type:"metro"},
  {id:"busan", name:"부산 1호선", emoji:"🚇", type:"metro"},
  {id:"incheon", name:"인천 1호선", emoji:"🚇", type:"metro"},
  {id:"gtx", name:"GTX-A", emoji:"🚄", type:"metro"},

  // 토미카 스타일 자동차
  {id:"police", name:"토미카 경찰차", emoji:"🚓", type:"car"},
  {id:"fire", name:"토미카 소방차", emoji:"🚒", type:"car"},
  {id:"ambulance", name:"토미카 구급차", emoji:"🚑", type:"car"},
  {id:"tow", name:"견인차", emoji:"🚚", type:"car"},
  {id:"taxi", name:"토미카 택시", emoji:"🚕", type:"car"},
  {id:"bus", name:"토미카 버스", emoji:"🚌", type:"car"},
  {id:"race", name:"레이싱카", emoji:"🏎️", type:"car"},
  {id:"truck", name:"덤프트럭", emoji:"🚛", type:"car"},
  {id:"excavator", name:"굴착기", emoji:"🚜", type:"car"},
  {id:"car", name:"승용차", emoji:"🚗", type:"car"}
];

const SONGS = [
  {id:"uiu", title:"우이우하하", emoji:"🎵"},
  {id:"gangnam", title:"강남스타일", emoji:"🕺"},
  {id:"danza", title:"단자로카", emoji:"🎶"},
  {id:"party", title:"펭귄 댄스파티", emoji:"🐧"},
  {id:"train", title:"기차 디스코", emoji:"🚄"},
  {id:"hero", title:"히어로 댄스", emoji:"🚓"}
];

const STAGES = [
  {id:"rainbow", title:"무지개 콘서트", emoji:"🌈"},
  {id:"city", title:"도시 야경", emoji:"🌃"},
  {id:"space", title:"우주 공연장", emoji:"🚀"},
  {id:"snow", title:"눈꽃 축제", emoji:"❄️"},
  {id:"lava", title:"불꽃 콘서트", emoji:"🔥"}
];

const MISSIONS = [
  {
    text:"고속열차 2대와 경찰차 1대를 출연시켜라!",
    check: list =>
      list.filter(v => v.type === "high").length === 2 &&
      list.some(v => v.id === "police")
  },
  {
    text:"무궁화호를 가운데 2번 무대에 배치하라!",
    check: list => list[1] && list[1].id === "mugunghwa"
  },
  {
    text:"서로 다른 고속열차 3대로 공연하라!",
    check: list => list.length === 3 &&
      list.every(v => v.type === "high")
  },
  {
    text:"지하철 2대와 소방차 1대를 출연시켜라!",
    check: list =>
      list.filter(v => v.type === "metro").length === 2 &&
      list.some(v => v.id === "fire")
  },
  {
    text:"KTX 청룡, SRT, 무궁화호를 함께 출연시켜라!",
    check: list =>
      ["ktx2","srt","mugunghwa"].every(
        id => list.some(v => v.id === id)
      )
  },
  {
    text:"토미카 특수차량 3대로 공연하라!",
    check: list =>
      ["police","fire","ambulance"].every(
        id => list.some(v => v.id === id)
      )
  },
  {
    text:"우이신설선을 첫 번째 출연진으로 배치하라!",
    check: list => list[0] && list[0].id === "ui"
  },
  {
    text:"일반열차 1대, 지하철 1대, 자동차 1대를 출연시켜라!",
    check: list =>
      ["normal","metro","car"].every(
        type => list.some(v => v.type === type)
      )
  },
  {
    text:"ITX 마음과 ITX 청춘을 함께 출연시켜라!",
    check: list =>
      ["itxmaeum","itxchun"].every(
        id => list.some(v => v.id === id)
      )
  },
  {
    text:"경찰차를 맨 마지막 3번 무대에 배치하라!",
    check: list => list[2] && list[2].id === "police"
  },
  {
    text:"부산김해경전철과 KTX 산천을 함께 출연시켜라!",
    check: list =>
      ["gimhae","ktx1"].every(
        id => list.some(v => v.id === id)
      )
  },
  {
    text:"자동차 1대와 기차 2대를 조합하라!",
    check: list =>
      list.filter(v => v.type === "car").length === 1 &&
      list.filter(v => v.type !== "car").length === 2
  }
];

const SURPRISES = [
  {
    title:"💡 무대 조명이 꺼졌어요!",
    text:"공연 기획자는 어떻게 해야 할까요?",
    choices:[
      "🔧 안전하게 조명 담당자 부르기",
      "💥 조명 기계 때리기",
      "🙈 그냥 모른 척하기",
      "🚀 무대에서 뛰어내리기"
    ],
    correct:0
  },
  {
    title:"🚄 기차가 무대 위치를 잊었어요!",
    text:"기차 3대가 안전하게 공연하려면?",
    choices:[
      "📍 정해진 위치로 안내하기",
      "💨 아무 데나 달리게 하기",
      "🚧 서로 부딪히게 하기",
      "🙈 그냥 기다리기"
    ],
    correct:0
  },
  {
    title:"🎤 마이크가 고장 났어요!",
    text:"어떻게 공연을 계속할까요?",
    choices:[
      "🎤 예비 마이크 사용하기",
      "💦 마이크에 물 붓기",
      "🗑️ 모두 버리기",
      "😴 공연장에 눕기"
    ],
    correct:0
  },
  {
    title:"🚓 경찰차가 늦게 도착했어요!",
    text:"공연 순서를 어떻게 관리할까요?",
    choices:[
      "📋 출연 순서 다시 확인하기",
      "🏎️ 무대에서 과속하기",
      "❌ 다른 차량 밀어내기",
      "🙈 손님 무시하기"
    ],
    correct:0
  },
  {
    title:"🎉 관객들이 앙코르를 외쳐요!",
    text:"기획자는 어떤 선택을 할까요?",
    choices:[
      "🎶 앙코르 댄스 준비하기",
      "😠 관객에게 화내기",
      "🔌 갑자기 전원 끄기",
      "🚪 관객을 밀어내기"
    ],
    correct:0
  },
  {
    title:"🌧️ 공연장에 비가 와요!",
    text:"안전하게 공연을 계속하려면?",
    choices:[
      "🏠 실내 무대로 이동하기",
      "⚡ 젖은 전선 만지기",
      "💦 물을 더 뿌리기",
      "🏃 무대에서 달리기"
    ],
    correct:0
  }
];

const $ = id => document.getElementById(id);

let lineup = [];
let selectedSong = SONGS[0];
let selectedStage = STAGES[0];
let currentMission = null;
let currentCategory = "all";

let stars = 0;
let shows = 0;
let elapsed = 0;
let playing = false;
let currentDance = "bounce";
let surpriseSolved = false;
let surpriseTriggered = false;
let missionCompleted = false;

let timerId = null;
let noteId = null;
let surpriseTimeout = null;

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle(items) {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function init() {
  bindButtons();
  newMission();
  renderVehicles();
  renderLineup();
  renderSongs();
  renderStages();
  updateStats();
}

function bindButtons() {
  $("newMissionBtn").addEventListener("click", newMission);
  $("randomLineupBtn").addEventListener("click", randomLineup);
  $("clearLineupBtn").addEventListener("click", clearLineup);
  $("startShowBtn").addEventListener("click", startShow);
  $("backBtn").addEventListener("click", returnToSetup);
  $("pauseBtn").addEventListener("click", togglePause);
  $("finishBtn").addEventListener("click", finishShow);
  $("againBtn").addEventListener("click", nextShow);

  document.querySelectorAll(".tab").forEach(button => {
    button.addEventListener("click", () => {
      currentCategory = button.dataset.category;

      document.querySelectorAll(".tab").forEach(tab => {
        tab.classList.toggle("active", tab === button);
      });

      renderVehicles();
    });
  });

  document.querySelectorAll(".dance-btn").forEach(button => {
    button.addEventListener("click", () => {
      changeDance(button.dataset.dance);
    });
  });
}

function updateStats() {
  $("starCount").textContent = "⭐ " + stars;
  $("showCount").textContent = "🎤 " + shows + "회";
}

// ========================================
// 공연 미션
// ========================================

function newMission() {
  const candidates = MISSIONS.filter(
    mission => mission !== currentMission
  );

  currentMission = randomItem(candidates);
  $("missionText").textContent = currentMission.text;
}

function checkMission() {
  return currentMission && currentMission.check(lineup);
}

// ========================================
// 차량 선택
// ========================================

function renderVehicles() {
  const grid = $("vehicleGrid");
  grid.innerHTML = "";

  const visible = VEHICLES.filter(vehicle =>
    currentCategory === "all" ||
    vehicle.type === currentCategory
  );

  visible.forEach(vehicle => {
    const selected = lineup.some(v => v.id === vehicle.id);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "vehicle-card" +
      (selected ? " selected" : "");

    const emoji = document.createElement("span");
    emoji.className = "vehicle-emoji";
    emoji.textContent = vehicle.emoji;

    const name = document.createElement("span");
    name.className = "vehicle-name";
    name.textContent = vehicle.name;

    button.append(emoji, name);
    button.addEventListener("click", () => selectVehicle(vehicle));

    grid.appendChild(button);
  });
}

function selectVehicle(vehicle) {
  const index = lineup.findIndex(v => v.id === vehicle.id);

  if (index >= 0) {
    lineup.splice(index, 1);
  } else {
    if (lineup.length >= 3) {
      $("setupMessage").textContent =
        "출연진은 3대까지예요! 먼저 한 대를 빼 주세요.";
      return;
    }

    lineup.push(vehicle);
  }

  $("setupMessage").textContent = "";
  renderVehicles();
  renderLineup();
}

function renderLineup() {
  const container = $("lineup");
  container.innerHTML = "";

  for (let i = 0; i < 3; i++) {
    const vehicle = lineup[i];
    const slot = document.createElement("div");

    if (vehicle) {
      slot.className = "lineup-slot";

      const number = document.createElement("span");
      number.className = "slot-number";
      number.textContent = (i + 1) + "번 출연진";

      const emoji = document.createElement("span");
      emoji.className = "vehicle-emoji";
      emoji.textContent = vehicle.emoji;

      const name = document.createElement("span");
      name.textContent = vehicle.name;

      slot.append(number, emoji, name);
    } else {
      slot.className = "empty-slot";
      slot.textContent = (i + 1) + "번 출연진";
    }

    container.appendChild(slot);
  }
}

function randomLineup() {
  lineup = shuffle(VEHICLES).slice(0, 3);
  $("setupMessage").textContent = "";
  renderVehicles();
  renderLineup();
}

function clearLineup() {
  lineup = [];
  $("setupMessage").textContent = "";
  renderVehicles();
  renderLineup();
}

// ========================================
// 노래와 무대
// ========================================

function renderSongs() {
  const container = $("songChoices");
  container.innerHTML = "";

  SONGS.forEach(song => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-card" +
      (selectedSong.id === song.id ? " active" : "");

    button.textContent = song.emoji + " " + song.title;

    button.addEventListener("click", () => {
      selectedSong = song;
      renderSongs();
    });

    container.appendChild(button);
  });
}

function renderStages() {
  const container = $("stageChoices");
  container.innerHTML = "";

  STAGES.forEach(stage => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-card" +
      (selectedStage.id === stage.id ? " active" : "");

    button.textContent = stage.emoji + " " + stage.title;

    button.addEventListener("click", () => {
      selectedStage = stage;
      renderStages();
    });

    container.appendChild(button);
  });
}

// ========================================
// 공연 시작
// ========================================

function startShow() {
  if (lineup.length !== 3) {
    $("setupMessage").textContent =
      "🚄 출연진 3대를 모두 선택해야 공연할 수 있어요!";
    return;
  }

  missionCompleted = checkMission();
  surpriseSolved = false;
  surpriseTriggered = false;
  elapsed = 0;
  playing = true;
  currentDance = "bounce";

  $("setupScreen").classList.add("hidden");
  $("showScreen").classList.remove("hidden");
  $("surpriseBox").classList.add("hidden");

  $("showSongTitle").textContent =
    selectedSong.emoji + " " + selectedSong.title;

  $("showStageTitle").textContent = selectedStage.title;
  $("stage").className = "stage " + selectedStage.id;

  $("showStatus").textContent = "🎉 신나는 공연 시작!";
  $("showTimer").textContent = "00:00";
  $("pauseBtn").textContent = "⏸️ 일시정지";

  renderPerformers();
  changeDance("bounce");

  clearTimers();

  timerId = setInterval(() => {
    if (!playing) return;

    elapsed++;
    updateTimer();

    // 자동으로 춤 변경
    if (elapsed % 5 === 0) {
      changeDance(randomItem([
        "bounce","sway","spin","wave","shuffle"
      ]));
    }

    // 공연 중 한 번 돌발 미션
    if (
      elapsed >= 12 &&
      !surpriseTriggered &&
      Math.random() < 0.45
    ) {
      showSurprise();
    }

    if (elapsed >= 40 && !surpriseTriggered) {
      showSurprise();
    }
  }, 1000);

  noteId = setInterval(() => {
    if (playing) createMusicNote();
  }, 300);

  window.scrollTo(0, 0);
}

function renderPerformers() {
  const container = $("performers");
  container.innerHTML = "";

  lineup.forEach((vehicle, index) => {
    const performer = document.createElement("div");
    performer.className = "performer bounce";
    performer.dataset.index = index;

    const emoji = document.createElement("div");
    emoji.className = "performer-vehicle";
    emoji.textContent = vehicle.emoji;

    const name = document.createElement("div");
    name.className = "performer-name";
    name.textContent = vehicle.name;

    performer.append(emoji, name);
    container.appendChild(performer);
  });
}

function changeDance(dance) {
  currentDance = dance;

  document.querySelectorAll(".performer").forEach(performer => {
    performer.className = "performer " + dance;
  });

  document.querySelectorAll(".dance-btn").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.dance === dance
    );
  });

  const labels = {
    bounce:"⬆️ 통통 점프 댄스!",
    sway:"↔️ 좌우로 흔들흔들!",
    spin:"🔄 빙글빙글 댄스!",
    wave:"🌊 신나는 파도타기!",
    shuffle:"🎲 깜짝 랜덤 댄스!"
  };

  $("showStatus").textContent = labels[dance];
}

function createMusicNote() {
  const container = $("musicNotes");

  if (container.childElementCount > 25) return;

  const note = document.createElement("span");
  note.className = "note";
  note.textContent = randomItem(["🎵","🎶","♪","♫","✨","💖"]);

  note.style.left = (5 + Math.random() * 85) + "%";
  note.style.animationDuration =
    (2 + Math.random() * 2) + "s";

  container.appendChild(note);

  setTimeout(() => {
    note.remove();
  }, 4200);
}

function updateTimer() {
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  $("showTimer").textContent =
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0");
}

// ========================================
// 공연 중 돌발 미션
// ========================================

function showSurprise() {
  surpriseTriggered = true;
  playing = false;

  const event = randomItem(SURPRISES);

  $("surpriseBox").classList.remove("hidden");
  $("surpriseTitle").textContent = event.title;
  $("surpriseText").textContent = event.text;
  $("showStatus").textContent = "⚠️ 공연 긴급 미션!";

  const container = $("surpriseChoices");
  container.innerHTML = "";

  const options = shuffle(
    event.choices.map((text, index) => ({
      text,
      correct: index === event.correct
    }))
  );

  options.forEach(option => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "surprise-choice";
    button.textContent = option.text;

    button.addEventListener("click", () => {
      if (option.correct) {
        surpriseSolved = true;
        $("surpriseBox").classList.add("hidden");
        $("showStatus").textContent =
          "🌟 문제 해결! 공연을 계속해요!";
        playing = true;
        $("pauseBtn").textContent = "⏸️ 일시정지";
      } else {
        $("surpriseText").textContent =
          "🤔 조금 더 생각해 봐요! 안전한 방법을 골라 주세요.";
      }
    });

    container.appendChild(button);
  });
}

function togglePause() {
  if (!$("surpriseBox").classList.contains("hidden")) {
    return;
  }

  playing = !playing;

  $("pauseBtn").textContent =
    playing ? "⏸️ 일시정지" : "▶️ 계속 공연";

  $("showStatus").textContent =
    playing ? "🎉 공연을 계속합니다!" : "⏸️ 잠시 쉬는 시간!";
}

// ========================================
// 공연 결과
// ========================================

function finishShow() {
  clearTimers();
  playing = false;

  shows++;

  let earned = 1;
  let messages = [];

  if (missionCompleted) {
    earned += 2;
    messages.push("📋 공연 기획 미션 성공! +2⭐");
  } else {
    messages.push("📋 이번 미션은 다음에 다시 도전!");
  }

  if (surpriseSolved) {
    earned += 1;
    messages.push("🔧 돌발 미션 해결! +1⭐");
  }

  if (elapsed >= 20) {
    earned += 1;
    messages.push("🎶 멋진 공연 진행! +1⭐");
  }

  stars += earned;
  updateStats();

  $("resultText").textContent =
    lineup.map(v => v.name).join(" · ") +
    "\n\n" +
    selectedSong.title + " 공연 완료!\n\n" +
    messages.join("\n") +
    "\n\n이번 공연 보상: ⭐ " + earned + "개";

  $("resultStars").textContent =
    "⭐".repeat(Math.min(earned, 5));

  $("resultOverlay").classList.remove("hidden");
}

function nextShow() {
  $("resultOverlay").classList.add("hidden");
  returnToSetup();
  newMission();
  clearLineup();
}

function returnToSetup() {
  clearTimers();
  playing = false;

  $("resultOverlay").classList.add("hidden");
  $("surpriseBox").classList.add("hidden");
  $("showScreen").classList.add("hidden");
  $("setupScreen").classList.remove("hidden");

  $("musicNotes").innerHTML = "";
  window.scrollTo(0, 0);
}

function clearTimers() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }

  if (noteId !== null) {
    clearInterval(noteId);
    noteId = null;
  }

  if (surpriseTimeout !== null) {
    clearTimeout(surpriseTimeout);
    surpriseTimeout = null;
  }
}

// ========================================
// 실행
// ========================================

document.addEventListener("DOMContentLoaded", init);
