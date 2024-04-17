const reset = document.getElementById("reset");
const easy = document.getElementById("easy");
const medium = document.getElementById("medium");
const hard = document.getElementById("hard");
const modes = Array.from(document.getElementsByClassName("mode"));
const rgb = document.getElementById("rgb");
const score = document.getElementById("score");
const wrapper = document.getElementById("wrapper");
const lives = document.getElementById("livesCount");

let color;
let gameScore = 0;

let selectedMode;

function randomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}

function modeDefiner(x) {
  wrapper.innerHTML = "";
  for (i = 0; i < x; i++) {
    const box = document.createElement("div");
    box.classList.add("box");
    box.addEventListener("click", checkColor);
    wrapper.append(box);
  }
}

function checkColor() {
  let scoreChange;
  let message;

  switch (selectedMode) {
    case "easy":
      scoreChange = this.style.backgroundColor === color ? 10 : -5;
      message = this.style.backgroundColor === color ? "Correct!" : "Wrong!";
      break;
    case "medium":
      scoreChange = this.style.backgroundColor === color ? 20 : -10;
      message = this.style.backgroundColor === color ? "Correct!" : "Wrong!";
      break;
    case "hard":
      scoreChange = this.style.backgroundColor === color ? 30 : -15;
      message = this.style.backgroundColor === color ? "Correct!" : "Wrong!";
      break;
    default:
      scoreChange = 0;
      message = "Unknown mode!";
  }

  gameScore = Math.max(0, gameScore + scoreChange);
  score.innerText = `Score: ${gameScore}`;

  if (scoreChange > 0) {
    // alert(message);
    Swal.fire({
      title: message,
      icon: "success",
    });
    play();
  } else {
    if (lives.innerText > 1) {
      lives.innerText--;
      // alert(message);
      Swal.fire({
        title: message,
        icon: "error",
      });
    } else {
      innerText = 0;
      // alert("Game Over!");
      Swal.fire({
        title: "Game Over!",
        text: "Your game is over. Click OK to return to the main page.",
        icon: "error",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "index.html"; // Redirect to the main page
        }
      });
    }
  }
}

function play() {
  const boxes = Array.from(wrapper.children);
  color = randomColor();
  rgb.innerText = color;

  const randomBoxIndex = Math.floor(Math.random() * boxes.length);
  boxes.forEach((box, index) => {
    box.style.backgroundColor =
      index === randomBoxIndex ? color : randomColor();
  });
}

modes.forEach((mode) => {
  mode.addEventListener("click", function () {
    modes.forEach((k) => {
      k.classList.remove("active");
    });
    this.classList.add("active");
    selectedMode = this.innerText.toLowerCase();

    switch (selectedMode) {
      case "easy":
        modeDefiner(3);
        play();

        break;

      case "medium":
        modeDefiner(6);
        play();

        break;

      case "hard":
        modeDefiner(9);
        play();

        break;

      default:
        break;
    }

    play();
  });
});
