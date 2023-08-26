import { DEFAULT_CODE } from "./const.js";

export class EditorImpl {
  constructor(
    private textarea: HTMLTextAreaElement,
    private renderer: HTMLPreElement,
    private params: URLSearchParams
  ) {
    this.init();
  }

  private init() {
    this.textarea.addEventListener("input", () => this.render());
    this.textarea.addEventListener("keydown", function (e) {
      if (e.key == "Tab") {
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;

        this.value =
          this.value.substring(0, start) + "\t" + this.value.substring(end);

        this.selectionStart = this.selectionEnd = start + 1;
      }
    });

    this.textarea.addEventListener("keyup", this.syncParams.bind(this));
    this.textarea.addEventListener("scroll", this.syncScroll.bind(this));

    this.textarea.value = this.params.get("q") || DEFAULT_CODE;

    this.render();
  }

  private render() {
    const raw = this.textarea.value;

    let padded = raw;

    if (raw[raw.length - 1] == "\n") {
      // pad new-lines to prevent the last line from being cut off on <pre />
      padded += " ";
    }

    // replace tags with HTML entities
    const sanitized = padded
      .replace(new RegExp("&", "g"), "&")
      .replace(new RegExp("<", "g"), "<");

    this.renderer.textContent = sanitized;

    // scroll sync in case content causes overflow
    this.syncScroll();

    if (window["hljs"]) {
      // if hljs is loaded, highlight the code
      window["hljs"].highlightBlock(this.renderer);
    }
  }

  public syncParams() {
    this.params.set("q", this.textarea.value);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${this.params.toString()}`
    );
  }

  private syncScroll() {
    this.renderer.scrollTop = this.textarea.scrollTop;
    this.renderer.scrollLeft = this.textarea.scrollLeft;
  }

  get value() {
    return this.textarea.value;
  }

  set value(value: string) {
    this.textarea.value = value;
    this.render();
  }
}
