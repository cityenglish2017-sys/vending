"use strict";

/* =====================================================
   🐧 펭귄 자판기
   script.js
===================================================== */


/* =====================================================
   게임 데이터
===================================================== */

const ITEMS = {

  fish: {
    emoji: "🐟",
    korean: "물고기"
  },

  juice: {
    emoji: "🧃",
    korean: "주스"
  },

  icecream: {
    emoji: "🍦",
    korean: "아이스크림"
  },

  cookie: {
    emoji: "🍪",
    korean: "쿠키"
  },

  strawberry: {
    emoji: "🍓",
    korean: "딸기"
  },

  milk: {
    emoji: "🥛",
    korean: "우유"
  },

  apple: {
    emoji: "🍎",
    korean: "사과"
  },

  cake: {
    emoji: "🧁",
    korean: "케이크"
  }

};


const CUSTOMERS = [
  "🐧",
  "🐧",
  "🐧",
  "🦭",
  "🐻‍❄️"
];


const RANDOM_HATS = [
  "",
  "",
  "",
  "🎀",
  "🧢",
  "👑"
];


const REWARDS = [
  "🎀",
  "👑",
  "🌸",
  "🌈",
  "🎈",
  "💎",
  "🍭",
  "🧸"
];


/* =====================================================
   게임 상태
===================================================== */

let score = 0;

let completedOrders = 0;

let currentOrder = [];

let pickedItems = [];

let gameLocked = false;

let soundEnabled = true;

let chosenDress = "";


/* =====================================================
   HTML 요소
===================================================== */

const scoreElement =
  document.getElementById("score");


const orderPictures =
  document.getElementById("orderPictures");


const customerCharacter =
  document.getElementById("customerCharacter");


const customerHat =
  document.getElementById("customerHat");


const guideEmoji =
  document.getElementById("guideEmoji");


const guideText =
  document.getElementById("guideText");


const pickedItemsElement =
  document.getElementById("pickedItems");


const deliveryItem =
  document.getElementById("deliveryItem");


const soundButton =
  document.getElementById("soundButton");


const successScreen =
  document.getElementById("successScreen");


const rewardPicture =
  document.getElementById("rewardPicture");


const nextButton =
  document.getElementById("nextButton");


const dressOpenButton =
  document.getElementById("dressOpenButton");


const dressScreen =
  document.getElementById("dressScreen");


const dressAccessory =
  document.getElementById("dressAccessory");


const dressCloseButton =
  document.getElementById("dressCloseButton");


const miniGameScreen =
  document.getElementById("miniGameScreen");


const miniGameTitle =
  document.getElementById("miniGameTitle");


const miniGameArea =
  document.getElementById("miniGameArea");


const productButtons =
  document.querySelectorAll(".productButton");


const dressChoices =
  document.querySelectorAll(".dressChoice");


/* =====================================================
   랜덤 함수
===================================================== */

function randomItem(array) {

  const index =
    Math.floor(
      Math.random() * array.length
    );

  return array[index];

}


function shuffled(array) {

  const copy =
    [...array];


  for (
    let i = copy.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(
        Math.random() * (i + 1)
      );

    [
      copy[i],
      copy[j]
    ] =
    [
      copy[j],
      copy[i]
    ];

  }


  return copy;

}


/* =====================================================
   음성
===================================================== */

function speak(text) {

  if (!soundEnabled) {
    return;
  }


  if (
    !("speechSynthesis" in window)
  ) {

    return;

  }


  window.speechSynthesis.cancel();


  const speech =
    new SpeechSynthesisUtterance(
      text
    );


  speech.lang =
    "ko-KR";


  speech.rate =
    0.9;


  speech.pitch =
    1.15;


  window.speechSynthesis.speak(
    speech
  );

}


/* =====================================================
   소리 버튼
===================================================== */

soundButton.addEventListener(
  "click",
  function () {

    soundEnabled =
      !soundEnabled;


    if (soundEnabled) {

      soundButton.textContent =
        "🔊";

      speak(
        "소리가 켜졌어요!"
      );

    }

    else {

      soundButton.textContent =
        "🔇";

      window.speechSynthesis.cancel();

    }

  }
);


/* =====================================================
   새 손님
===================================================== */

function makeNewCustomer() {

  gameLocked =
    false;


  pickedItems =
    [];


  pickedItemsElement.textContent =
    "";


  deliveryItem.textContent =
    "";


  deliveryItem.style.opacity =
    "0";


  /*
    손님 랜덤
  */

  customerCharacter.textContent =
    randomItem(CUSTOMERS);


  /*
    꾸미기를 선택했다면
    그것을 우선 사용
  */

  if (chosenDress) {

    customerHat.textContent =
      chosenDress;

  }

  else {

    customerHat.textContent =
      randomItem(RANDOM_HATS);

  }


  /*
    주문 개수

    처음에는 무조건 1개.

    3번 이상 성공하면
    가끔 2개 주문.
  */

  let orderCount = 1;


  if (
    completedOrders >= 3 &&
    Math.random() < 0.45
  ) {

    orderCount = 2;

  }


  const keys =
    shuffled(
      Object.keys(ITEMS)
    );


  currentOrder =
    keys.slice(
      0,
      orderCount
    );


  showOrder();


  guideEmoji.textContent =
    "👀";


  guideText.textContent =
    "같은 그림을 찾아봐!";


  /*
    주문 음성
  */

  const orderNames =
    currentOrder.map(
      function (key) {

        return ITEMS[key].korean;

      }
    );


  setTimeout(
    function () {

      if (
        currentOrder.length === 1
      ) {

        speak(
          orderNames[0] +
          " 주세요!"
        );

      }

      else {

        speak(
          orderNames[0] +
          " 그리고 " +
          orderNames[1] +
          " 주세요!"
        );

      }

    },
    500
  );

}


/* =====================================================
   주문 그림 표시
===================================================== */

function showOrder() {

  orderPictures.innerHTML =
    "";


  currentOrder.forEach(
    function (itemKey) {

      const picture =
        document.createElement(
          "span"
        );


      picture.textContent =
        ITEMS[itemKey].emoji;


      orderPictures.appendChild(
        picture
      );

    }
  );

}


/* =====================================================
   자판기 상품 클릭
===================================================== */

productButtons.forEach(
  function (button) {

    button.addEventListener(
      "click",
      function () {

        if (gameLocked) {
          return;
        }


        const itemKey =
          button.getAttribute(
            "data-item"
          );


        flashProduct(
          button
        );


        dropProduct(
          itemKey
        );


        checkProduct(
          itemKey
        );

      }
    );

  }
);


/* =====================================================
   상품 버튼 반짝임
===================================================== */

function flashProduct(button) {

  button.classList.remove(
    "flash"
  );


  void button.offsetWidth;


  button.classList.add(
    "flash"
  );

}


/* =====================================================
   상품 떨어지기
===================================================== */

function dropProduct(itemKey) {

  deliveryItem.classList.remove(
    "drop"
  );


  void deliveryItem.offsetWidth;


  deliveryItem.textContent =
    ITEMS[itemKey].emoji;


  deliveryItem.style.opacity =
    "1";


  deliveryItem.classList.add(
    "drop"
  );

}


/* =====================================================
   상품 정답 확인
===================================================== */

function checkProduct(itemKey) {

  /*
    아직 고르지 않은
    주문 목록 만들기
  */

  const remaining =
    [...currentOrder];


  pickedItems.forEach(
    function (picked) {

      const index =
        remaining.indexOf(
          picked
        );


      if (index !== -1) {

        remaining.splice(
          index,
          1
        );

      }

    }
  );


  /*
    정답
  */

  if (
    remaining.includes(
      itemKey
    )
  ) {

    pickedItems.push(
      itemKey
    );


    showPickedItems();


    guideEmoji.textContent =
      "👍";


    guideText.textContent =
      "좋아!";


    speak(
      ITEMS[itemKey].korean +
      "! 좋아요!"
    );


    /*
      모든 주문 완료
    */

    if (
      pickedItems.length ===
      currentOrder.length
    ) {

      setTimeout(
        completeOrder,
        450
      );

    }

  }

  /*
    오답
  */

  else {

    wrongAnswer();

  }

}


/* =====================================================
   선택한 상품 표시
===================================================== */

function showPickedItems() {

  pickedItemsElement.textContent =
    pickedItems
      .map(
        function (key) {

          return ITEMS[key].emoji;

        }
      )
      .join(" ");

}


/* =====================================================
   틀렸을 때
===================================================== */

function wrongAnswer() {

  guideEmoji.textContent =
    "🐧";


  guideText.textContent =
    "다시 찾아봐!";


  speak(
    "앗! 다른 그림을 찾아볼까요?"
  );


  customerCharacter.animate(

    [
      {
        transform:
          "rotate(-10deg)"
      },

      {
        transform:
          "rotate(10deg)"
      },

      {
        transform:
          "rotate(-7deg)"
      },

      {
        transform:
          "rotate(0deg)"
      }
    ],

    {
      duration: 450
    }

  );

}


/* =====================================================
   주문 성공
===================================================== */

function completeOrder() {

  if (gameLocked) {
    return;
  }


  gameLocked =
    true;


  completedOrders++;


  /*
    두 개 주문은 별 2개
  */

  if (
    currentOrder.length === 2
  ) {

    score += 2;

  }

  else {

    score += 1;

  }


  scoreElement.textContent =
    score;


  guideEmoji.textContent =
    "⭐";


  guideText.textContent =
    "성공!";


  speak(
    "딩동댕! 잘했어요!"
  );


  customerCharacter.animate(

    [
      {
        transform:
          "translateY(0) rotate(-8deg)"
      },

      {
        transform:
          "translateY(-20px) rotate(8deg)"
      },

      {
        transform:
          "translateY(0) rotate(-8deg)"
      }
    ],

    {
      duration: 700
    }

  );


  setTimeout(
    showSuccessScreen,
    650
  );

}


/* =====================================================
   성공 화면
===================================================== */

function showSuccessScreen() {

  rewardPicture.textContent =
    randomItem(REWARDS);


  successScreen.classList.remove(
    "hidden"
  );

}


/* =====================================================
   다음 버튼
===================================================== */

nextButton.addEventListener(
  "click",
  function () {

    successScreen.classList.add(
      "hidden"
    );


    /*
      2회 이상 성공 후
      35% 확률 미니게임
    */

    if (
      completedOrders >= 2 &&
      Math.random() < 0.35
    ) {

      startMiniGame();

    }

    else {

      makeNewCustomer();

    }

  }
);


/* =====================================================
   꾸미기 열기
===================================================== */

dressOpenButton.addEventListener(
  "click",
  function () {

    dressAccessory.textContent =
      chosenDress;


    dressScreen.classList.remove(
      "hidden"
    );

  }
);


/* =====================================================
   꾸미기 선택
===================================================== */

dressChoices.forEach(
  function (button) {

    button.addEventListener(
      "click",
      function () {

        chosenDress =
          button.getAttribute(
            "data-dress"
          );


        dressAccessory.textContent =
          chosenDress;


        customerHat.textContent =
          chosenDress;


        speak(
          "멋져요!"
        );

      }
    );

  }
);


/* =====================================================
   꾸미기 닫기
===================================================== */

dressCloseButton.addEventListener(
  "click",
  function () {

    dressScreen.classList.add(
      "hidden"
    );

  }
);


/* =====================================================
   미니게임 선택
===================================================== */

function startMiniGame() {

  const miniGames = [

    snowGame,

    coinGame,

    fishGame

  ];


  const selectedGame =
    randomItem(
      miniGames
    );


  selectedGame();

}


/* =====================================================
   미니게임 1
   눈 치우기
===================================================== */

function snowGame() {

  miniGameArea.innerHTML =
    "";


  miniGameTitle.textContent =
    "❄️ 👆";


  miniGameScreen.classList.remove(
    "hidden"
  );


  speak(
    "눈이 쌓였어요! 눈을 모두 눌러 주세요!"
  );


  let snowCount = 5;


  for (
    let i = 0;
    i < 5;
    i++
  ) {

    const snow =
      document.createElement(
        "button"
      );


    snow.className =
      "snowTarget";


    snow.textContent =
      "❄️";


    snow.style.left =
      (
        5 +
        Math.random() * 70
      ) + "%";


    snow.style.top =
      (
        5 +
        Math.random() * 60
      ) + "%";


    snow.addEventListener(
      "click",
      function () {

        snow.remove();


        snowCount--;


        if (
          snowCount === 0
        ) {

          finishMiniGame();

        }

      }
    );


    miniGameArea.appendChild(
      snow
    );

  }

}


/* =====================================================
   미니게임 2
   동전 찾기
===================================================== */

function coinGame() {

  miniGameArea.innerHTML =
    "";


  miniGameTitle.textContent =
    "👀 🪙";


  miniGameScreen.classList.remove(
    "hidden"
  );


  speak(
    "동전이 떨어졌어요! 동전을 찾아 주세요!"
  );


  const fakePictures = [
    "❄️",
    "⭐",
    "🧤",
    "🧣",
    "🧊",
    "🐚"
  ];


  /*
    가짜 그림
  */

  for (
    let i = 0;
    i < 9;
    i++
  ) {

    const fake =
      document.createElement(
        "div"
      );


    fake.textContent =
      randomItem(
        fakePictures
      );


    fake.style.position =
      "absolute";


    fake.style.fontSize =
      "50px";


    fake.style.left =
      (
        Math.random() * 80
      ) + "%";


    fake.style.top =
      (
        Math.random() * 70
      ) + "%";


    miniGameArea.appendChild(
      fake
    );

  }


  /*
    진짜 동전
  */

  const coin =
    document.createElement(
      "button"
    );


  coin.className =
    "coinTarget";


  coin.textContent =
    "🪙";


  coin.style.left =
    (
      5 +
      Math.random() * 75
    ) + "%";


  coin.style.top =
    (
      5 +
      Math.random() * 60
    ) + "%";


  coin.addEventListener(
    "click",
    function () {

      coin.remove();

      finishMiniGame();

    }
  );


  miniGameArea.appendChild(
    coin
  );

}


/* =====================================================
   미니게임 3
   물고기 잡기
===================================================== */

function fishGame() {

  miniGameArea.innerHTML =
    "";


  miniGameTitle.textContent =
    "🐟 💨";


  miniGameScreen.classList.remove(
    "hidden"
  );


  speak(
    "앗! 물고기가 도망갔어요! 잡아 주세요!"
  );


  const fish =
    document.createElement(
      "button"
    );


  fish.className =
    "fishTarget";


  fish.textContent =
    "🐟";


  fish.style.top =
    (
      15 +
      Math.random() * 50
    ) + "%";


  fish.addEventListener(
    "click",
    function () {

      fish.remove();

      finishMiniGame();

    }
  );


  miniGameArea.appendChild(
    fish
  );

}


/* =====================================================
   미니게임 성공
===================================================== */

function finishMiniGame() {

  score++;


  scoreElement.textContent =
    score;


  miniGameTitle.textContent =
    "🐧 ⭐ 🐧";


  speak(
    "성공! 별 하나를 받았어요!"
  );


  setTimeout(
    function () {

      miniGameScreen.classList.add(
        "hidden"
      );


      makeNewCustomer();

    },
    1000
  );

}


/* =====================================================
   게임 시작
===================================================== */

function startGame() {

  scoreElement.textContent =
    score;


  guideEmoji.textContent =
    "👆";


  guideText.textContent =
    "같은 그림을 찾아봐!";


  makeNewCustomer();


  console.log(
    "🐧 펭귄 자판기 게임 시작!"
  );

}


/*
  HTML이 모두 로딩된 뒤 실행
*/

if (
  document.readyState === "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    startGame
  );

}

else {

  startGame();

}
