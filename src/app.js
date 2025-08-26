import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function () {
  let currentCards = []; // stores cards like "10♦", "A♥"

  //----------------Random Card-------------------------
  function randomCard() {
    const cardContainer = document.getElementById("card-container");

    if (cardContainer.children.length >= 52) {
      alert("Maximum amount of cards reached!");
      return;
    }

    // Read the input number and convert to integer
    let inputNumberTyped = parseInt(document.getElementById("inputNumber").value);

    // Validate input
    if (isNaN(inputNumberTyped) || inputNumberTyped < 1) {
      alert("Please enter a valid number of cards (1-52)");
      return;
    }

    for (let i = 0; i < inputNumberTyped; i++) {
      let allSuits = ["♦", "♥", "♣", "♠"];
      let allNumbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

      let randomSuit = allSuits[Math.floor(Math.random() * allSuits.length)];
      let randomNumber = allNumbers[Math.floor(Math.random() * allNumbers.length)];
      let randomCardLog = randomNumber + randomSuit;

      // Prevent duplicates
      if (currentCards.includes(randomCardLog)) {
        i--; // retry this iteration
        continue;
      }

      currentCards.push(randomCardLog);

      const color = (randomSuit === "♦" || randomSuit === "♥") ? "red" : "black";

      const cardGeneral = document.createElement("div");
      cardGeneral.className = "cardGeneral";

      const cardTop = document.createElement("div");
      cardTop.className = "cardTop";
      cardTop.textContent = randomNumber;
      cardTop.style.color = color;

      const cardCenter = document.createElement("div");
      cardCenter.className = "cardCenter";
      cardCenter.textContent = randomSuit;
      cardCenter.style.color = color;

      const cardBottom = document.createElement("div");
      cardBottom.className = "cardBottom";
      cardBottom.textContent = randomNumber;
      cardBottom.style.color = color;

      cardGeneral.appendChild(cardTop);
      cardGeneral.appendChild(cardCenter);
      cardGeneral.appendChild(cardBottom);

      cardContainer.appendChild(cardGeneral);

      console.log("Added card:", randomCardLog);
    }
  }

  document.getElementById("draw").addEventListener("click", randomCard);

  //----------------Sorting Card--------------------

  function sortingCards() {
    if (currentCards.length === 0) return;

    const valueMap = {
        2: 2, 3: 3, 4: 4, 5: 5, 6: 6,
        7: 7, 8: 8, 9: 9, 10: 10,
        J: 11, Q: 12, K: 13, A: 14
    };

    // Create a copy so we don't modify original array while sorting
    let cards = [...currentCards];

    // Bubble sort
    for (let i = 0; i < cards.length - 1; i++) {
        for (let j = 0; j < cards.length - i - 1; j++) {
            let valueA = valueMap[cards[j].slice(0, -1)] || 0;
            let valueB = valueMap[cards[j + 1].slice(0, -1)] || 0;
            if (valueA > valueB) {
                // Swap
                let temp = cards[j];
                cards[j] = cards[j + 1];
                cards[j + 1] = temp;
            }
        }
    }

    const sortedContainer = document.getElementById("sorted-card-container");
    sortedContainer.innerHTML = ""; // clear old sorted cards

    // Create and append sorted card elements
    cards.forEach(card => {
        let number = card.slice(0, -1);
        let suit = card.slice(-1);
        const color = (suit === "♦" || suit === "♥") ? "red" : "black";

        const sortedCardGeneral = document.createElement("div");
        sortedCardGeneral.className = "sortedCardGeneral";

        const sortedCardTop = document.createElement("div");
        sortedCardTop.className = "sortedCardTop";
        sortedCardTop.textContent = number;
        sortedCardTop.style.color = color;

        const sortedCardCenter = document.createElement("div");
        sortedCardCenter.className = "sortedCardCenter";
        sortedCardCenter.textContent = suit;
        sortedCardCenter.style.color = color;

        const sortedCardBottom = document.createElement("div");
        sortedCardBottom.className = "sortedCardBottom";
        sortedCardBottom.textContent = number;
        sortedCardBottom.style.color = color;

        sortedCardGeneral.appendChild(sortedCardTop);
        sortedCardGeneral.appendChild(sortedCardCenter);
        sortedCardGeneral.appendChild(sortedCardBottom);

        sortedContainer.appendChild(sortedCardGeneral);
    });

    console.log("Sorted cards (bubble sort):", cards);
}


  document.getElementById("sort").addEventListener("click", sortingCards);
};
