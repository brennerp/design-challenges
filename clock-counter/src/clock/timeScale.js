export class TimeScale {
  constructor(name, milliseconds) {
    this._number = 0;
    this._oldNumber = 0;
    this._name = name.toUpperCase();
    this._label = this._name;
    this._inMilliseconds = milliseconds;
    this._labelID = `clock-counter__${name}-label`;
    this._numberID = `clock-counter__${name}-number`;
  }

  set number(value) {
    if (this._oldNumber === value) {
      return;
    }
    this._oldNumber = this._number;
    this._label = value === 1 ? this._name : `${this._name}S`;
    this._number = value;
    this._update();
  }

  get number() {
    return this._number;
  }

  get element() {
    return `
      <div class="clock-counter__info">
        <span id="${this._numberID}">
          0
        </span>
        <span id="${this._labelID}">
          ${this._name}S
        </span>
      </div>
    `;
  }

  getLabelElement() {
    this._labelElement = document.getElementById(this._labelID);
  }

  getNumberElement() {
    this._numberElement = document.getElementById(this._numberID);
  }

  _update() {
    if (!this._labelElement || !this._numberElement) {
      return;
    }
    this._labelElement.innerText = `${this._label}`;
    this._numberElement.innerText = `${this._number}`;
  }
}
