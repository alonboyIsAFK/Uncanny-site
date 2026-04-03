const state = {
  turn: 0,
  sanity: 100,
  playerType: "neutral",
  flags: {
    checkedMirror: false,
    ignoredOnce: false
  }
};

const textEl = document.getElementById("text");
const choicesEl = document.getElementById("choices");

function classify(action) {
  if (action.includes("wait") || action.includes("ignore")) {
    state.playerType = "avoidant";
    state.flags.ignoredOnce = true;
  } else if (action.includes("check") || action.includes("look")) {
    state.playerType = "curious";
  }
}

function getScene() {
  state.turn++;

  if (state.turn === 1) {
    return {
      text: "The hallway is empty. The bathroom door is open.",
      choices: ["Wait and listen", "Check the mirror"]
    };
  }

  if (state.flags.checkedMirror) {
    return {
      text: "The mirror shows you exactly as before. That’s wrong.",
      choices: ["Look again", "Step back"]
    };
  }

  if (state.flags.ignoredOnce && state.playerType === "avoidant") {
    return {
      text: "Something moves closer. You don’t remember hearing it before.",
      choices: ["Turn on light", "Stay still"]
    };
  }

  return {
    text: "The room feels unchanged. You’re not sure it is.",
    choices: ["Check phone", "Do nothing"]
  };
}

function render() {
  const scene = getScene();

  textEl.innerText = scene.text;
  choicesEl.innerHTML = "";

  scene.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.innerText = choice;

    btn.onclick = () => {
      classify(choice.toLowerCase());

      if (choice.toLowerCase().includes("mirror")) {
        state.flags.checkedMirror = true;
      }

      render();
    };

    choicesEl.appendChild(btn);
  });
}

render();
