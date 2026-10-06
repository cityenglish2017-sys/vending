/* ======================================== */
/* 등장인물 */
/* ======================================== */

const characters = {

  ajun: {
    name: "아준 관제사",
    emoji: "👦"
  },

  wheelTeam: {
    name: "바퀴 정비팀",
    emoji: "👨‍🔧"
  },

  doorTeam: {
    name: "출입문 정비팀",
    emoji: "👩‍🔧"
  },

  electricTeam: {
    name: "전기 정비팀",
    emoji: "🧑‍🔧"
  },

  trackTeam: {
    name: "선로 정비팀",
    emoji: "👷"
  },

  radioTeam: {
    name: "통신팀",
    emoji: "🧑‍💻"
  },

  inspector: {
    name: "안전 점검팀",
    emoji: "🕵️"
  }

};


/* ======================================== */
/* 임무 */
/* ======================================== */

const missions = [

  {
    phase: "1단계",

    type: "상황 파악",

    icon: "🚨",

    title: "두 열차가 멈췄어요",

    characters: [
      "ajun"
    ],

    text:
      "KTX-산천과 무궁화호가 저속으로 접촉한 뒤 선로 위에 멈췄어요. 가장 먼저 무엇을 해야 할까요?",

    choices: [
      "다른 열차가 접근하지 못하도록 신호를 정지한다",
      "어느 기차가 더 빠른지 확인한다",
      "열차 사진을 찍는다",
      "두 열차를 바로 다시 출발시킨다"
    ],

    answer: 0,

    feedback:
      "맞아요! 사고가 생겼을 때는 다른 열차가 들어오지 못하도록 안전을 확보하는 것이 먼저예요.",

    speech:
      "“모든 열차는 현재 위치에서 정지해 주세요. 선로 안전을 확인하겠습니다.”라고 말해보세요.",

    progress: {
      ktx: 5,
      mugunghwa: 5
    },

    team: "inspect"
  },


  {
    phase: "2단계",

    type: "우선순위",

    icon: "👀",

    title: "어떤 고장인지 확인해요",

    characters: [
      "ajun",
      "inspector"
    ],

    text:
      "KTX-산천은 출입문과 전기 계통에 이상이 있고, 무궁화호는 바퀴와 선로 쪽을 확인해야 해요. 무엇을 먼저 하면 좋을까요?",

    choices: [
      "고장 위치를 확인하고 필요한 팀을 나눈다",
      "모든 정비사를 한곳에 보낸다",
      "기차 색깔부터 확인한다",
      "기관사에게 알아서 고치라고 한다"
    ],

    answer: 0,

    feedback:
      "정답! 어떤 문제가 있는지 확인한 뒤 알맞은 정비팀을 보내야 해요.",

    speech:
      "“각 열차의 고장 위치를 확인한 뒤 정비팀을 배치해 주세요.”라고 말해보세요.",

    progress: {
      ktx: 10,
      mugunghwa: 10
    },

    team: "inspect"
  },


  {
    phase: "3단계",

    type: "작업 지시",

    icon: "🛞",

    title: "무궁화호 바퀴 점검",

    characters: [
      "ajun",
      "wheelTeam"
    ],

    text:
      "무궁화호의 오른쪽 바퀴에서 이상이 발견됐어요. 바퀴 정비팀에게 가장 정확하게 지시한 말은 무엇일까요?",

    choices: [
      "빨리 고쳐요!",
      "무궁화호 오른쪽 바퀴를 먼저 확인해 주세요",
      "기차 좀 봐주세요",
      "아무거나 먼저 고쳐주세요"
    ],

    answer: 1,

    feedback:
      "아주 좋아요! 누구에게, 어느 열차의, 어느 부분을 확인할지 정확하게 말했어요.",

    speech:
      "“바퀴 정비팀, 무궁화호 오른쪽 바퀴를 먼저 확인해 주세요.”라고 말해보세요.",

    progress: {
      ktx: 0,
      mugunghwa: 20
    },

    team: "wheel",

    fixFault: {
      train: "mugunghwa",
      fault: "wheel"
    }
  },


  {
    phase: "4단계",

    type: "작업 지시",

    icon: "🚪",

    title: "KTX-산천 출입문 수리",

    characters: [
      "ajun",
      "doorTeam"
    ],

    text:
      "KTX-산천의 출입문 하나가 제대로 닫히지 않아요. 출입문 정비팀에게 어떻게 말하면 좋을까요?",

    choices: [
      "문 고쳐!",
      "KTX-산천 2호차 출입문을 확인해 주세요",
      "저기 이상해요",
      "다른 기차부터 보세요"
    ],

    answer: 1,

    feedback:
      "맞아요! 위치와 작업 내용을 분명하게 말하면 정비팀이 바로 이해할 수 있어요.",

    speech:
      "“출입문 정비팀, KTX-산천 2호차 출입문을 확인해 주세요.”라고 말해보세요.",

    progress: {
      ktx: 20,
      mugunghwa: 0
    },

    team: "door",

    fixFault: {
      train: "ktx",
      fault: "door"
    }
  },


  {
    phase: "5단계",

    type: "질문에 대답",

    icon: "❓",

    title: "정비사가 순서를 물어봐요",

    characters: [
      "ajun",
      "wheelTeam"
    ],

    text:
      "정비사가 “관제사님, KTX-산천과 무궁화호 중 어느 열차 작업을 먼저 계속할까요?”라고 물었어요. 무궁화호 바퀴 점검이 아직 끝나지 않았다면 어떻게 답할까요?",

    choices: [
      "아무거나 하세요",
      "무궁화호 바퀴 작업을 먼저 마쳐 주세요",
      "잘 모르겠어요",
      "KTX가 더 빠르니까 KTX부터요"
    ],

    answer: 1,

    feedback:
      "좋아요! 질문을 듣고 현재 상황에 맞는 답을 정확하게 했어요.",

    speech:
      "“무궁화호 바퀴 작업을 먼저 마쳐 주세요.”라고 말해보세요.",

    progress: {
      ktx: 0,
      mugunghwa: 15
    },

    team: "wheel"
  },


  {
    phase: "6단계",

    type: "돌발 상황",

    icon: "📡",

    title: "무전이 잘 안 들려요",

    characters: [
      "ajun",
      "radioTeam"
    ],

    text:
      "정비팀이 무전으로 보고했는데 소리가 끊겨서 내용을 정확히 듣지 못했어요. 어떻게 해야 할까요?",

    choices: [
      "대충 알아들은 척한다",
      "마지막 내용을 다시 말해 달라고 요청한다",
      "내 생각대로 작업을 시킨다",
      "정비팀에게 화를 낸다"
    ],

    answer: 1,

    feedback:
      "정답! 잘 못 들었을 때는 추측하지 않고 다시 확인하는 것이 중요해요.",

    speech:
      "“죄송합니다. 마지막 내용을 다시 한 번 말씀해 주세요.”라고 말해보세요.",

    progress: {
      ktx: 5,
      mugunghwa: 5
    },

    team: "radio"
  },


  {
    phase: "7단계",

    type: "작업 지시",

    icon: "⚡",

    title: "KTX 전기 점검",

    characters: [
      "ajun",
      "electricTeam"
    ],

    text:
      "KTX-산천의 전기 계통 점검이 필요해요. 가장 좋은 작업 지시는 무엇일까요?",

    choices: [
      "전기팀, 알아서 해주세요",
      "전기 정비팀, KTX-산천 전원 계통을 점검해 주세요",
      "전기를 켜보세요",
      "무궁화호부터 보세요"
    ],

    answer: 1,

    feedback:
      "좋아요! 담당 팀과 작업 대상을 정확히 알려줬어요.",

    speech:
      "“전기 정비팀, KTX-산천 전원 계통을 점검해 주세요.”라고 말해보세요.",

    progress: {
      ktx: 20,
      mugunghwa: 0
    },

    team: "electric",

    fixFault: {
      train: "ktx",
      fault: "electric"
    }
  },


  {
    phase: "8단계",

    type: "작업 지시",

    icon: "🛤️",

    title: "선로 상태 확인",

    characters: [
      "ajun",
      "trackTeam"
    ],

    text:
      "무궁화호 아래쪽 선로에 이상이 있는지 확인해야 해요. 어떻게 지시하는 것이 좋을까요?",

    choices: [
      "선로팀, 무궁화호 아래쪽 선로를 점검해 주세요",
      "선로가 이상해요",
      "빨리 좀 보세요",
      "KTX만 확인하세요"
    ],

    answer: 0,

    feedback:
      "맞아요! 어디를 점검할지 분명하게 전달했어요.",

    speech:
      "“선로 정비팀, 무궁화호 아래쪽 선로를 점검해 주세요.”라고 말해보세요.",

    progress: {
      ktx: 0,
      mugunghwa: 20
    },

    team: "track",

    fixFault: {
      train: "mugunghwa",
      fault: "track"
    }
  },


  {
    phase: "9단계",

    type: "돌발 상황",

    icon: "🌧️",

    title: "비가 오기 시작했어요",

    characters: [
      "ajun",
      "trackTeam"
    ],

    text:
      "수리 중 갑자기 비가 많이 오기 시작했어요. 정비팀에게 어떻게 말하면 좋을까요?",

    choices: [
      "빨리 끝내라고만 한다",
      "안전을 먼저 확인하고 미끄러운 구간을 조심해 달라고 말한다",
      "비가 와도 똑같이 작업하라고 한다",
      "모두 뛰라고 한다"
    ],

    answer: 1,

    feedback:
      "맞아요! 상황이 바뀌면 새로운 위험도 함께 알려줘야 해요.",

    speech:
      "“비가 많이 옵니다. 미끄러운 구간을 조심하고 안전을 먼저 확인해 주세요.”라고 말해보세요.",

    progress: {
      ktx: 5,
      mugunghwa: 5
    },

    team: "track"
  },


  {
    phase: "10단계",

    type: "대화 기술",

    icon: "🗣️",

    title: "지시를 다시 설명해요",

    characters: [
      "ajun",
      "doorTeam"
    ],

    text:
      "출입문 정비사가 “어느 문을 확인하라는 건지 잘 모르겠습니다.”라고 말했어요. 어떻게 다시 설명할까요?",

    choices: [
      "아까 말했잖아요!",
      "KTX-산천 2호차 오른쪽 출입문을 확인해 주세요",
      "그냥 찾아보세요",
      "모르면 하지 마세요"
    ],

    answer: 1,

    feedback:
      "아주 좋아요! 상대가 이해하지 못했을 때 더 구체적으로 다시 설명했어요.",

    speech:
      "“KTX-산천 2호차 오른쪽 출입문을 확인해 주세요.”라고 말해보세요.",

    progress: {
      ktx: 10,
      mugunghwa: 0
    },

    team: "door"
  },


  {
    phase: "11단계",

    type: "상황 보고",

    icon: "📋",

    title: "현재 상황을 보고해요",

    characters: [
      "ajun",
      "inspector"
    ],

    text:
      "정비 책임자가 현재 수리 상황을 물어봤어요. 가장 정확한 보고는 무엇일까요?",

    choices: [
      "거의 다 됐어요",
      "KTX-산천은 출입문과 전기 점검이 완료됐고, 무궁화호는 바퀴와 선로 점검이 완료됐습니다",
      "다 고쳤어요 아마도",
      "정비팀이 알아서 하고 있어요"
    ],

    answer: 1,

    feedback:
      "좋아요! 어떤 열차의 어떤 작업이 끝났는지 정확하게 보고했어요.",

    speech:
      "“KTX-산천은 출입문과 전기 점검이 완료됐고, 무궁화호는 바퀴와 선로 점검이 완료됐습니다.”라고 말해보세요.",

    progress: {
      ktx: 15,
      mugunghwa: 15
    },

    team: "inspect"
  },


  {
    phase: "12단계",

    type: "최종 판단",

    icon: "✅",

    title: "다시 출발해도 될까요?",

    characters: [
      "ajun",
      "inspector"
    ],

    text:
      "두 열차의 수리가 모두 끝났어요. 다시 운행하기 전에 무엇을 해야 할까요?",

    choices: [
      "바로 최고 속도로 출발한다",
      "최종 안전 점검과 신호 상태를 확인한 뒤 천천히 운행을 시작한다",
      "두 열차를 동시에 출발시킨다",
      "정비팀이 떠나기 전에 무조건 출발한다"
    ],

    answer: 1,

    feedback:
      "정답! 수리가 끝난 뒤에도 마지막 안전 점검과 신호 확인이 필요해요.",

    speech:
      "“최종 안전 점검 완료 후 신호를 확인하고 천천히 운행을 시작해 주세요.”라고 말해보세요.",

    progress: {
      ktx: 10,
      mugunghwa: 10
    },

    team: "inspect",

    final: true
  }

];


/* ======================================== */
/* HTML */
/* ======================================== */

const scoreEl =
  document.getElementById("score");

const streakEl =
  document.getElementById("streak");

const missionTypeEl =
  document.getElementById("missionType");

const phaseBadge =
  document.getElementById("phaseBadge");

const missionIcon =
  document.getElementById("missionIcon");

const missionTitle =
  document.getElementById("missionTitle");

const missionText =
  document.getElementById("missionText");

const characterArea =
  document.getElementById("characterArea");

const choiceArea =
  document.getElementById("choiceArea");

const feedback =
  document.getElementById("feedback");

const speechBox =
  document.getElementById("speechBox");

const speechPrompt =
  document.getElementById("speechPrompt");

const speechDoneBtn =
  document.getElementById("speechDoneBtn");

const startBtn =
  document.getElementById("startBtn");

const nextBtn =
  document.getElementById("nextBtn");

const soundBtn =
  document.getElementById("soundBtn");

const successModal =
  document.getElementById("successModal");

const restartBtn =
  document.getElementById("restartBtn");

const sceneMessage =
  document.getElementById("sceneMessage");


/* 열차 */

const ktxTrain =
  document.getElementById("ktxTrain");

const mugunghwaTrain =
  document.getElementById("mugunghwaTrain");

const ktxFaults =
  document.getElementById("ktxFaults");

const mugunghwaFaults =
  document.getElementById("mugunghwaFaults");


/* 진행도 */

const ktxProgress =
  document.getElementById("ktxProgress");

const mugunghwaProgress =
  document.getElementById("mugunghwaProgress");

const ktxPercent =
  document.getElementById("ktxPercent");

const mugunghwaPercent =
  document.getElementById("mugunghwaPercent");


/* 팀 */

const teamCards =
  document.querySelectorAll(".team-card");


/* ======================================== */
/* 상태 */
/* ======================================== */

let currentIndex =
  0;

let currentMission =
  null;

let score =
  0;

let streak =
  0;

let ktxRepair =
  0;

let mugunghwaRepair =
  0;

let awaitingSpeech =
  false;

let started =
  false;


/* ======================================== */
/* 시작 */
/* ======================================== */

function startGame() {

  started =
    true;

  currentIndex =
    0;

  score =
    0;

  streak =
    0;

  ktxRepair =
    0;

  mugunghwaRepair =
    0;

  updateScore();

  updateRepairBars();

  resetFaults();

  startBtn.classList.add(
    "hidden"
  );

  showMission();

}


/* ======================================== */
/* 미션 표시 */
/* ======================================== */

function showMission() {

  currentMission =
    missions[
      currentIndex
    ];

  awaitingSpeech =
    false;

  missionTypeEl.textContent =
    currentMission.type;

  phaseBadge.textContent =
    currentMission.phase;

  missionIcon.textContent =
    currentMission.icon;

  missionTitle.textContent =
    currentMission.title;

  missionText.textContent =
    currentMission.text;

  showCharacters(
    currentMission.characters
  );

  choiceArea.innerHTML =
    "";

  feedback.className =
    "feedback hidden";

  feedback.textContent =
    "";

  speechBox.classList.add(
    "hidden"
  );

  nextBtn.classList.add(
    "hidden"
  );

  clearTeamHighlights();


  currentMission
    .choices
    .forEach(
      (choice,index) => {

        const btn =
          document.createElement(
            "button"
          );

        btn.type =
          "button";

        btn.className =
          "choice-btn";

        btn.textContent =
          `${index + 1}. ${choice}`;

        btn.addEventListener(
          "click",
          () =>
            checkAnswer(
              index,
              btn
            )
        );

        choiceArea.appendChild(
          btn
        );

      }
    );

}


/* ======================================== */
/* 등장인물 */
/* ======================================== */

function showCharacters(
  ids
) {

  characterArea.innerHTML =
    "";

  ids.forEach(id => {

    const person =
      characters[id];

    if (!person) {
      return;
    }

    const chip =
      document.createElement(
        "span"
      );

    chip.className =
      "character-chip";

    chip.textContent =
      `${person.emoji} ${person.name}`;

    characterArea.appendChild(
      chip
    );

  });

}


/* ======================================== */
/* 답 확인 */
/* ======================================== */

function checkAnswer(
  index,
  button
) {

  if (
    awaitingSpeech
  ) {
    return;
  }

  const buttons =
    [
      ...choiceArea
        .querySelectorAll(
          ".choice-btn"
        )
    ];


  if (
    index ===
    currentMission.answer
  ) {

    button.classList.add(
      "correct"
    );

    buttons.forEach(btn => {
      btn.disabled = true;
    });

    score += 1;
    streak += 1;

    updateScore();

    feedback.textContent =
      currentMission.feedback;

    feedback.className =
      "feedback good";


    applyProgress(
      currentMission.progress
    );


    if (
      currentMission.team
    ) {

      highlightTeam(
        currentMission.team
      );

    }


    if (
      currentMission.fixFault
    ) {

      fixFault(
        currentMission.fixFault
      );

    }


    speechPrompt.textContent =
      currentMission.speech;

    speechBox.classList.remove(
      "hidden"
    );

    awaitingSpeech =
      true;

  }

  else {

    button.classList.add(
      "wrong"
    );

    button.disabled =
      true;

    streak =
      0;

    updateScore();

    feedback.textContent =
      "다시 생각해 볼까요? 누구에게, 무엇을, 어떻게 말해야 하는지 살펴보세요.";

    feedback.className =
      "feedback try";

  }

}


/* ======================================== */
/* 말하기 완료 */
/* ======================================== */

function completeSpeech() {

  if (
    !awaitingSpeech
  ) {
    return;
  }

  awaitingSpeech =
    false;

  speechBox.classList.add(
    "hidden"
  );


  if (
    currentMission.final
  ) {

    finishGame();

    return;

  }


  nextBtn.classList.remove(
    "hidden"
  );

}


/* ======================================== */
/* 다음 */
/* ======================================== */

function nextMission() {

  currentIndex += 1;

  if (
    currentIndex >=
    missions.length
  ) {

    finishGame();

    return;

  }

  showMission();

}


/* ======================================== */
/* 수리 진행도 */
/* ======================================== */

function applyProgress(
  progress
) {

  ktxRepair =
    Math.min(
      100,
      ktxRepair +
      progress.ktx
    );


  mugunghwaRepair =
    Math.min(
      100,
      mugunghwaRepair +
      progress.mugunghwa
    );


  updateRepairBars();

}


/* ======================================== */
/* 진행 표시 */
/* ======================================== */

function updateRepairBars() {

  ktxProgress.style.width =
    `${ktxRepair}%`;

  mugunghwaProgress.style.width =
    `${mugunghwaRepair}%`;


  ktxPercent.textContent =
    `${ktxRepair}%`;

  mugunghwaPercent.textContent =
    `${mugunghwaRepair}%`;

}


/* ======================================== */
/* 팀 강조 */
/* ======================================== */

function highlightTeam(
  team
) {

  clearTeamHighlights();

  const selected =
    document.querySelector(
      `.team-card[data-team="${team}"]`
    );

  if (
    selected
  ) {

    selected.classList.add(
      "active"
    );

  }

}


/* ======================================== */
/* 팀 초기화 */
/* ======================================== */

function clearTeamHighlights() {

  teamCards.forEach(
    card => {

      card.classList.remove(
        "active"
      );

    }
  );

}


/* ======================================== */
/* 고장 수리 */
/* ======================================== */

function fixFault(
  info
) {

  const container =
    info.train === "ktx"
      ? ktxFaults
      : mugunghwaFaults;


  const fault =
    container.querySelector(
      `[data-fault="${info.fault}"]`
    );


  if (
    !fault
  ) {
    return;
  }


  fault.classList.add(
    "fixed"
  );


  const emojiMap = {

    door:
      "🚪✅",

    electric:
      "⚡✅",

    wheel:
      "🛞✅",

    track:
      "🛤️✅"

  };


  fault.textContent =
    emojiMap[
      info.fault
    ];

}


/* ======================================== */
/* 고장 초기화 */
/* ======================================== */

function resetFaults() {

  const allFaults =
    document.querySelectorAll(
      ".fault"
    );


  allFaults.forEach(
    fault => {

      fault.classList.remove(
        "fixed"
      );

  });


  ktxFaults
    .querySelector(
      '[data-fault="door"]'
    )
    .textContent =
      "🚪❌";


  ktxFaults
    .querySelector(
      '[data-fault="electric"]'
    )
    .textContent =
      "⚡❌";


  mugunghwaFaults
    .querySelector(
      '[data-fault="wheel"]'
    )
    .textContent =
      "🛞❌";


  mugunghwaFaults
    .querySelector(
      '[data-fault="track"]'
    )
    .textContent =
      "🛤️❌";


  ktxTrain.classList.add(
    "damaged"
  );

  ktxTrain.classList.remove(
    "repaired"
  );


  mugunghwaTrain.classList.add(
    "damaged"
  );

  mugunghwaTrain.classList.remove(
    "repaired"
  );


  sceneMessage.textContent =
    "🚆 두 열차가 저속으로 접촉했어요!";

}


/* ======================================== */
/* 점수 */
/* ======================================== */

function updateScore() {

  scoreEl.textContent =
    score;

  streakEl.textContent =
    streak;

}


/* ======================================== */
/* 읽어주기 */
/* ======================================== */

function speakMission() {

  if (
    !currentMission
  ) {
    return;
  }

  if (
    !(
      "speechSynthesis"
      in window
    )
  ) {
    return;
  }

  window
    .speechSynthesis
    .cancel();


  const text =
    `${currentMission.title}. ${currentMission.text}`;


  const speech =
    new SpeechSynthesisUtterance(
      text
    );


  speech.lang =
    "ko-KR";

  speech.rate =
    0.9;

  speech.pitch =
    1.02;


  window
    .speechSynthesis
    .speak(
      speech
    );

}


/* ======================================== */
/* 게임 완료 */
/* ======================================== */

function finishGame() {

  ktxRepair =
    100;

  mugunghwaRepair =
    100;

  updateRepairBars();


  ktxTrain.classList.remove(
    "damaged"
  );

  ktxTrain.classList.add(
    "repaired"
  );


  mugunghwaTrain.classList.remove(
    "damaged"
  );

  mugunghwaTrain.classList.add(
    "repaired"
  );


  sceneMessage.textContent =
    "✅ 복구 완료! 안전하게 다시 출발합니다.";


  setTimeout(
    () => {

      successModal.classList.remove(
        "hidden"
      );

    },
    500
  );

}


/* ======================================== */
/* 다시 하기 */
/* ======================================== */

function restartGame() {

  successModal.classList.add(
    "hidden"
  );

  currentIndex =
    0;

  score =
    0;

  streak =
    0;

  ktxRepair =
    0;

  mugunghwaRepair =
    0;

  updateScore();

  updateRepairBars();

  resetFaults();

  showMission();

}


/* ======================================== */
/* 버튼 연결 */
/* ======================================== */

startBtn.addEventListener(
  "click",
  startGame
);

nextBtn.addEventListener(
  "click",
  nextMission
);

speechDoneBtn.addEventListener(
  "click",
  completeSpeech
);

soundBtn.addEventListener(
  "click",
  speakMission
);

restartBtn.addEventListener(
  "click",
  restartGame
);