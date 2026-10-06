"use strict";

/* ==========================================
   펭귄 자판기 게임
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  console.log("🐧 Penguin Vending Game Loaded!");

  /* -----------------------------
     상품
  ----------------------------- */

  const ITEMS = {
    fish: {
      emoji: "🐟",
      name: "물고기"
    },

    juice: {
      emoji: "🧃",
      name: "주스"
    },

    icecream: {
      emoji: "🍦",
      name: "아이스크림"
    },

    cookie: {
      emoji: "🍪",
      name: "쿠키"
    },

    strawberry: {
      emoji: "🍓",
      name: "딸기"
    },

    milk: {
      emoji: "🥛",
      name: "우유"
    },

    apple: {
      emoji: "🍎",
      name: "사과"
    },

    cake: {
      emoji: "🧁",
      name: "케이크"
    }
  };


  /* -----------------------------
     캐릭터
  ----------------------------- */

  const CUSTOMERS = [
    {
      emoji: "🐧",
      sound: "펭귄 손님이 왔어요!"
    },

    {
      emoji: "🐧",
      sound: "아기 펭귄이 왔어요!"
    },

    {
      emoji: "🐻‍❄️",
      sound: "북극곰 손님이에요!"
    },

    {
      emoji: "🦭",
      sound: "물개 손님이 왔어요!"
    }
  ];


  const ACCESSORIES = [
    "",
    "🎀",
    "👑",
    "🧢",
    "👓",
    "🧣"
  ];


  /* -----------------------------
     DOM
  ----------------------------- */

  const scoreEl =
    document.getElementById("score");

  const orderIconsEl =
    document.getElementById("orderIcons");

  const customerEl =
    document.getElementById("customer");

  const customerAccessoryEl =
    document.getElementById("customerAccessory");

  const fallingItemEl =
    document.getElementById("fallingItem");

  const messageEmojiEl =
    document.getElementById("messageEmoji");

  const messageTextEl =
    document.getElementById("messageText");

  const collectedOrderEl =
    document.getElementById("collectedOrder");

  const successPopup =
    document.getElementById("successPopup");

  const rewardItem =
    document.getElementById("rewardItem");

  const nextBtn =
    document.getElementById("nextBtn");

  const soundBtn =
    document.getElementById("soundBtn");

  const dressButton =
    document.getElementById("dressButton");

  const dressPopup =
    document.getElementById("dressPopup");

  const dressClose =
    document.getElementById("dressClose");

  const dressPreview =
    document.getElementById("dressPreview");

  const miniGamePopup =
    document.getElementById("miniGamePopup");

  const miniTitle =
    document.getElementById("miniTitle");

  const miniArea =
    document.getElementById("miniArea");


  const productButtons =
    document.querySelectorAll(".product");

  const dressItems =
    document.querySelectorAll(".dressItem");


  /* -----------------------------
     게임 상태
  ----------------------------- */

  let score = 0;

  let currentOrder = [];

  let selectedItems = [];

  let gameLocked = false;

  let soundOn = true;

  let currentAccessory = "";

  let completedOrders = 0;


  /* -----------------------------
     유틸
  ----------------------------- */

  function randomFrom(array) {

    return array[
      Math.floor(Math.random() * array.length)
    ];

  }


  function shuffle(array) {

    return [...array].sort(
      () => Math.random() - 0.5
    );

  }


  /* -----------------------------
     음성
  ----------------------------- */

  function speak(text) {

    if (!soundOn) {
      return;
    }

    if (!("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(text);

    utterance.lang = "ko-KR";

    utterance.rate = 0.9;

    utterance.pitch = 1.2;

    window.speechSynthesis.speak(
      utterance
    );

  }


  soundBtn.addEventListener(
    "click",
    () => {

      soundOn = !soundOn;

      soundBtn.textContent =
        soundOn ? "🔊" : "🔇";

      if (soundOn) {
        speak("소리가 켜졌어요!");
      }

    }
  );


  /* -----------------------------
     새 손님
  ----------------------------- */

  function newCustomer() {

    gameLocked = false;

    selectedItems = [];

    collectedOrderEl.textContent = "";

    fallingItemEl.textContent = "";
    fallingItemEl.style.opacity = "0";

    const customer =
      randomFrom(CUSTOMERS);

    customerEl.textContent =
      customer.emoji;


    const accessory =
      randomFrom(ACCESSORIES);

    customerAccessoryEl.textContent =
      accessory;


    /*
      처음에는 1개 주문.
      조금 진행하면 가끔 2개.
    */

    let orderCount = 1;

    if (
      completedOrders >= 3 &&
      Math.random() < 0.45
    ) {

      orderCount = 2;

    }


    const itemKeys =
      shuffle(Object.keys(ITEMS));


    currentOrder =
      itemKeys.slice(0, orderCount);


    showOrder();


    messageEmojiEl.textContent = "👀";

    messageTextEl.textContent =
      "무엇을 먹고 싶을까요?";


    const names =
      currentOrder.map(
        key => ITEMS[key].name
      );


    setTimeout(
      () => {

        speak(
          customer.sound +
          " " +
          names.join(" 그리고 ") +
          " 주세요!"
        );

      },
      350
    );

  }


  /* -----------------------------
     주문 표시
  ----------------------------- */

  function showOrder() {

    orderIconsEl.innerHTML = "";

    currentOrder.forEach(
      key => {

        const span =
          document.createElement("span");

        span.textContent =
          ITEMS[key].emoji;

        orderIconsEl.appendChild(
          span
        );

      }
    );

  }


  /* -----------------------------
     상품 클릭
  ----------------------------- */

  productButtons.forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          if (gameLocked) {
            return;
          }

          const item =
            button.dataset.item;

          chooseProduct(
            item,
            button
          );

        }
      );

    }
  );


  function chooseProduct(
    item,
    button
  ) {

    button.classList.remove(
      "flash"
    );

    void button.offsetWidth;

    button.classList.add(
      "flash"
    );


    dropProduct(item);


    /*
      필요한 상품인지 확인
    */

    const requiredIndex =
      currentOrder.findIndex(
        orderItem =>
          orderItem === item &&
          !selectedItems.includes(
            orderItem
          )
      );


    /*
      주문이 1개일 경우
    */

    if (currentOrder.length === 1) {

      if (item === currentOrder[0]) {

        selectedItems.push(item);

        showSelectedItems();

        correctOrder();

      }

      else {

        wrongProduct();

      }

      return;

    }


    /*
      주문이 2개일 경우
    */

    const remainingOrder =
      [...currentOrder];


    selectedItems.forEach(
      selected => {

        const index =
          remainingOrder.indexOf(
            selected
          );

        if (index !== -1) {

          remainingOrder.splice(
            index,
            1
          );

        }

      }
    );


    if (
      remainingOrder.includes(item)
    ) {

      selectedItems.push(item);

      showSelectedItems();

      speak(
        ITEMS[item].name +
        "! 좋아요!"
      );


      if (
        selectedItems.length ===
        currentOrder.length
      ) {

        correctOrder();

      }

    }

    else {

      wrongProduct();

    }

  }


  /* -----------------------------
     선택 상품 표시
  ----------------------------- */

  function showSelectedItems() {

    collectedOrderEl.textContent =
      selectedItems
        .map(
          key => ITEMS[key].emoji
        )
        .join(" ");

  }


  /* -----------------------------
     상품 떨어지는 효과
  ----------------------------- */

  function dropProduct(item) {

    fallingItemEl.classList.remove(
      "dropAnimation"
    );

    void fallingItemEl.offsetWidth;

    fallingItemEl.textContent =
      ITEMS[item].emoji;

    fallingItemEl.style.opacity = "1";

    fallingItemEl.classList.add(
      "dropAnimation"
    );

  }


  /* -----------------------------
     틀림
  ----------------------------- */

  function wrongProduct() {

    messageEmojiEl.textContent =
      "🐧";

    messageTextEl.textContent =
      "다시 찾아볼까요?";

    speak(
      "앗! 다른 그림을 찾아볼까요?"
    );


    customerEl.animate(
      [
        {
          transform:
            "rotate(-8deg)"
        },

        {
          transform:
            "rotate(8deg)"
        },

        {
          transform:
            "rotate(0deg)"
        }
      ],
      {
        duration: 400
      }
    );

  }


  /* -----------------------------
     성공
  ----------------------------- */

  function correctOrder() {

    gameLocked = true;

    score +=
      currentOrder.length === 2
        ? 2
        : 1;

    completedOrders++;

    scoreEl.textContent =
      score;


    messageEmojiEl.textContent =
      "⭐";

    messageTextEl.textContent =
      "성공!";


    speak(
      "딩동댕! 정말 잘했어요!"
    );


    setTimeout(
      () => {

        showSuccess();

      },
      650
    );

  }


  /* -----------------------------
     성공 팝업
  ----------------------------- */

  function showSuccess() {

    const rewards = [
      "🎀",
      "👑",
      "🧣",
      "🌈",
      "💎",
      "🍭",
      "🎈",
      "🌸"
    ];

    rewardItem.textContent =
      randomFrom(rewards);

    successPopup.classList.remove(
      "hidden"
    );

  }


  /* -----------------------------
     다음 손님
  ----------------------------- */

  nextBtn.addEventListener(
    "click",
    () => {

      successPopup.classList.add(
        "hidden"
      );


      /*
        약 30% 확률로 미니게임
      */

      if (
        completedOrders >= 2 &&
        Math.random() < 0.30
      ) {

        startRandomMiniGame();

      }

      else {

        newCustomer();

      }

    }
  );


  /* =============================
     꾸미기
  ============================= */

  dressButton.addEventListener(
    "click",
    () => {

      dressPreview.textContent =
        currentAccessory;

      dressPopup.classList.remove(
        "hidden"
      );

    }
  );


  dressItems.forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          currentAccessory =
            button.dataset.accessory;

          dressPreview.textContent =
            currentAccessory;

          customerAccessoryEl.textContent =
            currentAccessory;

          speak("멋져요!");

        }
      );

    }
  );


  dressClose.addEventListener(
    "click",
    () => {

      dressPopup.classList.add(
        "hidden"
      );

    }
  );


  /* =============================
     미니게임
  ============================= */

  function startRandomMiniGame() {

    const games = [
      snowMiniGame,
      coinMiniGame,
      fishMiniGame
    ];

    const game =
      randomFrom(games);

    game();

  }


  /* -----------------------------
     눈 닦기
  ----------------------------- */

  function snowMiniGame() {

    miniTitle.textContent =
      "❄️ 👆";

    miniArea.innerHTML = "";

    miniGamePopup.classList.remove(
      "hidden"
    );

    speak(
      "눈이 쌓였어요! 눈을 톡톡 눌러서 치워 주세요!"
    );


    let remaining = 5;


    for (
      let i = 0;
      i < remaining;
      i++
    ) {

      const snow =
        document.createElement(
          "button"
        );

      snow.className =
        "snowPatch";

      snow.textContent =
        "❄️";

      snow.style.left =
        `${10 + Math.random() * 65}%`;

      snow.style.top =
        `${10 + Math.random() * 55}%`;


      snow.addEventListener(
        "click",
        () => {

          snow.remove();

          remaining--;

          if (remaining === 0) {

            miniSuccess();

          }

        }
      );


      miniArea.appendChild(
        snow
      );

    }

  }


  /* -----------------------------
     동전 찾기
  ----------------------------- */

  function coinMiniGame() {

    miniTitle.textContent =
      "👀 🪙";

    miniArea.innerHTML = "";

    miniGamePopup.classList.remove(
      "hidden"
    );

    speak(
      "동전이 떨어졌어요! 찾아 주세요!"
    );


    const decorations = [
      "❄️",
      "🧤",
      "🧣",
      "⭐",
      "🧊"
    ];


    for (
      let i = 0;
      i < 8;
      i++
    ) {

      const decoration =
        document.createElement(
          "div"
        );

      decoration.textContent =
        randomFrom(
          decorations
        );

      decoration.style.position =
        "absolute";

      decoration.style.fontSize =
        "50px";

      decoration.style.left =
        `${Math.random() * 80}%`;

      decoration.style.top =
        `${Math.random() * 70}%`;

      miniArea.appendChild(
        decoration
      );

    }


    const coin =
      document.createElement(
        "button"
      );

    coin.className =
      "miniCoin";

    coin.textContent =
      "🪙";

    coin.style.left =
      `${10 + Math.random() * 70}%`;

    coin.style.top =
      `${10 + Math.random() * 60}%`;


    coin.addEventListener(
      "click",
      () => {

        coin.remove();

        miniSuccess();

      }
    );


    miniArea.appendChild(
      coin
    );

  }


  /* -----------------------------
     물고기 잡기
  ----------------------------- */

  function fishMiniGame() {

    miniTitle.textContent =
      "🐟 💨";

    miniArea.innerHTML = "";

    miniGamePopup.classList.remove(
      "hidden"
    );

    speak(
      "물고기가 도망갔어요! 잡아 주세요!"
    );


    const fish =
      document.createElement(
        "button"
      );

    fish.className =
      "escapeFish";

    fish.textContent =
      "🐟";

    fish.style.top =
      `${20 + Math.random() * 45}%`;


    fish.addEventListener(
      "click",
      () => {

        fish.remove();

        miniSuccess();

      }
    );


    miniArea.appendChild(
      fish
    );

  }


  /* -----------------------------
     미니게임 성공
  ----------------------------- */

  function miniSuccess() {

    score++;

    scoreEl.textContent =
      score;

    miniTitle.textContent =
      "⭐ 🐧 ⭐";

    speak(
      "찾았다! 성공!"
    );


    setTimeout(
      () => {

        miniGamePopup.classList.add(
          "hidden"
        );

        newCustomer();

      },
      900
    );

  }


  /* =============================
     게임 시작
  ============================= */

  newCustomer();

});
