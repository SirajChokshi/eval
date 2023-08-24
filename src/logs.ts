import { $logs } from "./const.js";

const _log = window.console.log;
const _error = window.console.error;

function logToHTML(text: string, style: string) {
  const timeStamp = new Date().toLocaleTimeString();
  const fullTimeStamp = new Date().toLocaleString();

  const $timestamp = document.createElement("div");
  $timestamp.innerText = timeStamp;
  $timestamp.classList.add("log__timestamp");
  $timestamp.title = fullTimeStamp;

  const $build = document.createElement("a");
  $build.innerText = "[Build]";
  $build.classList.add("log__build");
  $build.href = window.location.href;
  $build.target = "_blank";
  $build.title = "Permalink to the code that generated this log";

  const $text = document.createElement("pre");
  $text.innerText = text;

  // @ts-ignore
  $text.style = style;
  $text.classList.add("log__text");

  $logs.appendChild($build);
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

  logToHTML(text, style);

  return _log.apply(this, arguments);
};

window.console.error = function () {
  let [text, style] = Array.from(arguments);

  if (typeof text === "string" && text.startsWith("%c")) {
    text = text.replace("%c", "");
  } else {
    style = "color: red; background: pink;";
  }

  logToHTML(text, style);

  return _error.apply(this, arguments);
};

window.onerror = function () {
  const [, , , , error] = Array.from(arguments);
  console.error(error);
};
