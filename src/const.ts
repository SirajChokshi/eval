// DOM
export const $logs = document.getElementById(
  "logs__container"
) as HTMLDivElement;
export const $evaluateBtn = document.getElementById(
  "action_eval"
) as HTMLButtonElement;
export const $clearBtn = document.getElementById(
  "action_clear"
) as HTMLButtonElement;
export const $shareBtn = document.getElementById(
  "action_share"
) as HTMLButtonElement;
export const $editor = document.getElementById(
  "editor-textarea"
) as HTMLTextAreaElement;
export const $editorRenderer = document.getElementById(
  "editor-renderer"
) as HTMLPreElement;

// Editor
export const DEFAULT_CODE = `// This is a JavaScript editor.
// You can type any JavaScript code here and it will be executed.
console.log("Hello World!");

// Click the "Evaluate" button to run the code.
// Logs are also available below.`;
