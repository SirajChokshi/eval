const DEFAULT_CODE = `// This is a JavaScript editor.
// You can type any JavaScript code here and it will be executed.
console.log("Hello World!");

// Click the "Evaluate" button to run the code.
// Logs are also available below.`;

const $logs = document.getElementById("logs__container") as HTMLDivElement;
const $evaluateBtn = document.getElementById(
  "action_eval"
) as HTMLButtonElement;
const $clearBtn = document.getElementById("action_clear") as HTMLButtonElement;
const $editor = document.getElementById(
  "editor-textarea"
) as HTMLTextAreaElement;
const $editorRenderer = document.getElementById(
  "editor-renderer"
) as HTMLPreElement;

$evaluateBtn.onclick = () => {
  eval($editor.value);
};

const _log = window.console.log;
const _error = window.console.error;

function htmlLog(text: string, style: string) {
  const timeStamp = new Date().toLocaleTimeString();

  const $timestamp = document.createElement("div");
  $timestamp.innerText = timeStamp;
  $timestamp.classList.add("log__timestamp");

  const $text = document.createElement("pre");
  $text.innerText = text;

  // @ts-ignore
  $text.style = style;
  $text.classList.add("log__text");

  $logs.appendChild($timestamp);
  $logs.appendChild($text);

  // scroll to bottom of logs
  $logs.scrollTop = $logs.scrollHeight;
}

window.console.log = function () {
  let [text, style] = Array.from(arguments);

  if (typeof text === "string" && text.startsWith("%c")) {
    text = text.replace("%c", "");
  } else {
    style = "";
  }

  htmlLog(text, style);

  return _log.apply(this, arguments);
};

window.console.error = function () {
  let [text, style] = Array.from(arguments);

  if (typeof text === "string" && text.startsWith("%c")) {
    text = text.replace("%c", "");
  } else {
    style = "color: red; background: pink;";
  }

  htmlLog(text, style);

  return _error.apply(this, arguments);
};

function render() {
  $editorRenderer.textContent = $editor.value;
  window["hljs"].highlightBlock($editorRenderer);
}

const params = new URLSearchParams(window.location.search);
const maybeQuery = params.get("q");

if (maybeQuery) {
  $editor.value = maybeQuery;
} else {
  $editor.value = DEFAULT_CODE;
}

$editor.addEventListener("input", render);

$editor.addEventListener("keydown", function (e) {
  if (e.key == "Tab") {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;

    this.value =
      this.value.substring(0, start) + "\t" + this.value.substring(end);

    this.selectionStart = this.selectionEnd = start + 1;
  }
});

$editor.addEventListener("keyup", () => {
  params.set("q", $editor.value);
  window.history.replaceState(
    {},
    "",
    `${window.location.pathname}?${params.toString()}`
  );
});

$editor.focus();

function init() {
  render();
  console.log("%cREAD HERE", "font-size: 64px; font-weight: bold; color: red;");
  console.log(
    "%c - This application is for developers.\n - Don't run any code here that you don't understand.",
    "font-size: 28px; font-weight: bold;"
  );
}

$clearBtn.onclick = () => {
  $logs.innerHTML = "";

  $editor.value = "";
  init();
};

init();
