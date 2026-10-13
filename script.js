// Player state
let energy = 3;
let currentLocation = "Base Camp";
let gameOver = false;

// Find the HTML elements
let locationDisplay = document.getElementById("location");
let energyDisplay = document.getElementById("energy");

let stageLabel = document.getElementById("stage-label");
let storyTitle = document.getElementById("story-title");
let storyDescription = document.getElementById("story-description");
let feedback = document.getElementById("feedback");

let choiceOne = document.getElementById("choice-one");
let choiceTwo = document.getElementById("choice-two");
let restButton = document.getElementById("rest-button");
let restartButton = document.getElementById("restart-button");


// Update the location and energy display
function updateStatus() {
  locationDisplay.innerHTML = currentLocation;
  energyDisplay.innerHTML = energy + " / 3";

  if (energy === 3) {
    energyDisplay.style.color = "#245c49";
  } else if (energy === 2) {
    energyDisplay.style.color = "#805000";
  } else {
    energyDisplay.style.color = "#a32c32";
  }
}


// Show an ending and stop further choices
function finishAdventure(title, description) {
  gameOver = true;

  stageLabel.innerHTML = "Your ending";
  storyTitle.innerHTML = title;
  storyDescription.innerHTML = description;

  feedback.innerHTML =
    "Restart the adventure to discover a different ending.";

  choiceOne.disabled = true;
  choiceTwo.disabled = true;
  restButton.disabled = true;

  updateStatus();
}


// First button: begin the hike or attempt the summit
function takeFirstChoice() {
  if (gameOver === true) {
    return;
  }

  if (currentLocation === "Base Camp") {
    energy = energy - 1;
    currentLocation = "Trail Fork";

    stageLabel.innerHTML = "Decision time";
    storyTitle.innerHTML = "Two paths lie ahead.";

    storyDescription.innerHTML =
      "A steep trail leads toward the summit, while a forest " +
      "path winds toward a hidden lake. The summit requires " +
      "3 energy points. The forest path requires 1.";

    feedback.innerHTML =
      "You used 1 energy point getting here. Rest if you " +
      "want enough energy for the summit.";

    choiceOne.innerHTML = "Climb to the summit";
    choiceTwo.innerHTML = "Explore the forest";

    updateStatus();

  } else if (currentLocation === "Trail Fork") {
    if (energy >= 3) {
      energy = energy - 3;
      currentLocation = "Mountain Summit";

      finishAdventure(
        "You reached the summit!",
        "Your preparation paid off. You complete the steep " +
        "climb and look out over the surrounding mountains."
      );

    } else {
      currentLocation = "Base Camp";

      finishAdventure(
        "Time to turn back.",
        "You do not have enough energy for the steep climb. " +
        "You return to base camp instead. Next time, try " +
        "resting at the fork before choosing the summit."
      );
    }
  }
}


// Second button: stay at camp or explore the forest
function takeSecondChoice() {
  if (gameOver === true) {
    return;
  }

  if (currentLocation === "Base Camp") {
    finishAdventure(
      "A quiet day at camp.",
      "You decide to stay at base camp and enjoy the mountain " +
      "views. The trails will still be there another day."
    );

  } else if (currentLocation === "Trail Fork") {
    if (energy >= 1) {
      energy = energy - 1;
      currentLocation = "Hidden Lake";

      finishAdventure(
        "You discovered the lake!",
        "You follow the forest path until the trees open " +
        "onto a peaceful lake. Your adventure ends beside " +
        "the water, surrounded by mountain views."
      );

    } else {
      currentLocation = "Base Camp";

      finishAdventure(
        "Time to return to camp.",
        "You have no energy left for the forest path. " +
        "You turn back to rest at base camp."
      );
    }
  }
}


// Restore energy without exceeding three points
function rest() {
  if (gameOver === true) {
    return;
  }

  if (energy < 3) {
    energy = energy + 1;

    feedback.innerHTML =
      "You take a break and recover 1 energy point. " +
      "You now have " + energy + " / 3 energy.";

  } else {
    feedback.innerHTML =
      "Your energy is already full. You are ready to explore!";
  }

  updateStatus();
}


// Reset the game
function restartAdventure() {
  energy = 3;
  currentLocation = "Base Camp";
  gameOver = false;

  stageLabel.innerHTML = "The beginning";
  storyTitle.innerHTML = "The mountain is waiting.";

  storyDescription.innerHTML =
    "You arrive at base camp with three energy points. " +
    "A trail leads toward a fork in the mountain. " +
    "Will you begin the climb?";

  feedback.innerHTML =
    "Walking uses energy. Resting restores one energy point, " +
    "up to a maximum of three.";

  choiceOne.innerHTML = "Begin the hike";
  choiceTwo.innerHTML = "Stay at camp";

  choiceOne.disabled = false;
  choiceTwo.disabled = false;
  restButton.disabled = false;

  updateStatus();
}


// Connect the buttons to their functions
choiceOne.addEventListener("click", takeFirstChoice);
choiceTwo.addEventListener("click", takeSecondChoice);
restButton.addEventListener("click", rest);
restartButton.addEventListener("click", restartAdventure);

// Start the game
restartAdventure();