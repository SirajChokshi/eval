import {
  $clearBtn,
  $editor,
  $editorRenderer,
  $evaluateBtn,
  $shareBtn,
  $logs,
} from "./const.js";
import { EditorImpl } from "./editor.js";
import "./logs.js";

const Editor = new EditorImpl(
  $editor,
  $editorRenderer,
  new URLSearchParams(window.location.search)
);

function init() {
  console.log("%cREAD HERE", "font-size: 64px; font-weight: bold; color: red;");
  console.log(
    "%c - This application is for developers.\n - Don't run any code here that you don't understand.",
    "font-size: 28px; font-weight: bold;"
  );

  $evaluateBtn.onclick = () => {
    eval(Editor.value);
  };

  $clearBtn.onclick = () => {
    $logs.innerHTML = "";
    Editor.value = "";
    init();
  };

  $shareBtn.onclick = () => {
    Editor.syncParams();

    const url = window.location.href;

    navigator.clipboard.writeText(url).then(() => {
      $shareBtn.classList.add("copied");

      setTimeout(() => {
        $shareBtn.classList.remove("copied");
      }, 3000);
    });
  };
}

init();
