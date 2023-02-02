const red = document.querySelector(".red");
const score_element = document.querySelector("#score");
const green = document.querySelector(".green");
const round_element = document.querySelector("#round");

// Initialize the game state
let score = 0;
let round = 0;

// Creating data object to store the game state
let data = [["Round", "Distance", "Target Size", "Duration", "Score"]];
let data_temp = [];

const max_round = 60;

// Set the dimensions of the game area
const height = 768;
const width = 1024;

// Listen for clicks on the green circle
document.querySelector("#home-circle").addEventListener("click", startRound);

function getPosition(distance) {
  // Generate a random angle between 0 and 2π
  let angle = Math.random() * 2 * Math.PI;

  // Compute the x and y coordinates of the target around the center
  let x = Math.cos(angle) * distance + width / 2;
  let y = Math.sin(angle) * distance + height / 2;

  // console.log("x: " + x + ", y: " + y);

  // Return the coordinates as an object
  return { x: x, y: y };
}

function showTarget(size, distance, duration) {
  // Get the target element
  let target = document.querySelector("#target");

  // Set the size of the target
  target.style.width = size + "px";
  target.style.height = size + "px";

  // Set the position of the target
  let position = getPosition(distance);
  target.style.left = position.x + "px";
  target.style.top = position.y + "px";

  // Show the target
  target.style.display = "block";

  // Hide the target after the given duration
  setTimeout(function () {
    target.style.display = "none";
  }, duration);
}

function computeDuration(target_size) {
  // Compute the duration for which the target will be visible
  // based on the round number and the target size
  // and return it
  let duration = 100000 / Math.log(round + 1) + 1000;
  duration = duration / Math.sqrt(target_size);
  return duration;
}

function hitTarget() {
  // Increment the score
  score++;

  // Update the score in the HTML
  document.querySelector("#score").innerHTML = "Score: " + score;

  resetRound();

  // Store the score value
  data_temp.push(1);

  console.log(data_temp[0], data_temp[1], data_temp[2], data_temp[3], 1);

  // Push the data to the data object
  data.push(data_temp);
}

function startRound() {
  data_temp = [];
  // Increment the round number
  round++;

  // If the game is over, display the score and return
  if (round > max_round) {
    document.querySelector("#score").innerHTML = "Score: " + score;

    // Store the data in a csv file
    fs.writeFile(
      "people.csv",
      data.map((d) => d.join(",")).join("\n"),
      (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      }
    );

    return;
  }

  // Choose the size of the target from 10px, 30px, 50px
  let target_size = 10 + 20 * Math.floor(Math.random() * 3);

  // Choose the distance of the target from the center using a normal distribution with mean 300 and standard deviation 100
  let target_distance =
    300 + 100 * (Math.random() + Math.random() + Math.random() - 1.5);
  // console.log("target_distance: " + target_distance);

  // Compute the duration for which the target will be visible
  let duration = computeDuration(target_size);
  // console.log("duration: " + duration);

  // Show the target
  showTarget(target_size, target_distance, duration);

  // Listen for clicks on the target
  document.querySelector("#target").addEventListener("click", hitTarget);

  // Hide the green circle
  document.querySelector("#home-circle").style.display = "none";

  // Stop listening for clicks on the green circle
  document
    .querySelector("#home-circle")
    .removeEventListener("click", startRound);

  // Update the round number in the HTML
  document.querySelector("#round").innerHTML = "Round: " + round;

  // Data temp
  data_temp = [round, target_distance, target_size, duration];

  // Wait for the duration of the round and then reset the round
  setTimeout(resetRound, duration);

  // Store the score value
  data_temp.push(0);

  console.log(data_temp[0], data_temp[1], data_temp[2], data_temp[3], 0);

  // Push the data to the data object
  data.push(data_temp);
}

function resetRound() {
  // Hide the target
  document.querySelector("#target").style.display = "none";

  // Make the green circle reappear
  document.querySelector("#home-circle").style.display = "block";

  // Listen for clicks on the green circle
  document.querySelector("#home-circle").addEventListener("click", startRound);

  // Stop listening for clicks on the target
  document.querySelector("#target").removeEventListener("click", hitTarget);
}

// Store the score value