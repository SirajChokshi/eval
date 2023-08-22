const $logs = document.getElementById("logs__container") as HTMLDivElement;
const $evaluateBtn = document.getElementById(
  "action_eval"
) as HTMLButtonElement;
const $editor = document.getElementById("editor") as HTMLTextAreaElement;

$evaluateBtn.onclick = () => {
  eval($editor.value);
};

const _log = window.console.log;

window.console.log = function () {
  const timeStamp = new Date().toLocaleTimeString();
  let [text, style] = Array.from(arguments);

  if (typeof text === "string" && text.startsWith("%c")) {
    text = text.replace("%c", "");
  } else {
    style = "";
  }

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

  return _log.apply(this, arguments);
};

const params = new URLSearchParams(window.location.search);
const maybeQuery = params.get("q");

if (maybeQuery) {
  $editor.value = maybeQuery;
}

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
