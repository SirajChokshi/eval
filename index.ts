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

  return _log(this, arguments);
};

const params = new URLSearchParams(window.location.search);
const maybeQuery = params.get("q");

if (maybeQuery) {
  $editor.value = maybeQuery;
}

$editor.addEventListener("keyup", () => {
  params.set("q", $editor.value);
  window.history.replaceState(
    {},
    "",
    `${window.location.pathname}?${params.toString()}`
  );
});

$editor.focus();
