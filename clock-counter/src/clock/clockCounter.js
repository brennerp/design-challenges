import { TimeScale } from "./timeScale.js";

const secondInMillis = 1000;
const minuteInMillis = secondInMillis * 60;
const hourInMillis = minuteInMillis * 60;
const dayInMillis = hourInMillis * 24;

export class ClockCounter {
  constructor(targetDate) {
    this._targetDate = targetDate;
    const seconds = new TimeScale("second", secondInMillis);
    const minutes = new TimeScale("minute", minuteInMillis);
    const hours = new TimeScale("hour", hourInMillis);
    const days = new TimeScale("day", dayInMillis);
    this._timeScales = {
      seconds: seconds,
      minutes: minutes,
      hours: hours,
      days: days
    };
  }

  get element() {
    return `
      <div class="clock-counter">
        <div class="flex flex-row items-center flex-wrap">
          ${this._timeScales.days.element}
          <span class="clock-counter__spacer">:</span>
          ${this._timeScales.hours.element}
        </div>
        <span class="clock-counter__spacer">:</span>
        <div class="flex flex-row items-center flex-wrap">
          ${this._timeScales.minutes.element}
          <span class="clock-counter__spacer">:</span>
          ${this._timeScales.seconds.element}
        </div>
      </div>
    `;
  }

  start() {
    this._getCountdownElements();
    this._setCountdown();
  }

  _getCountdownElements() {
    for (var prop in this._timeScales) {
      this._timeScales[prop].getLabelElement();
      this._timeScales[prop].getNumberElement();
    }
  }

  _setCountdown() {
    const countdown = setInterval(() => {
      const currentDate = new Date().getTime();
      let remainingTime = this._targetDate - currentDate;

      if (remainingTime <= 0) {
        this._timeScales.days.number = 0;
        this._timeScales.hours.number = 0;
        this._timeScales.minutes.number = 0;
        this._timeScales.seconds.number = 0;
        clearInterval(countdown);
        return;
      }

      this._timeScales.days.number = Math.floor(remainingTime / dayInMillis);

      this._timeScales.hours.number = Math.floor(
        (remainingTime % dayInMillis) / hourInMillis
      );

      this._timeScales.minutes.number = Math.floor(
        (remainingTime % hourInMillis) / minuteInMillis
      );

      this._timeScales.seconds.number = Math.floor(
        (remainingTime % minuteInMillis) / secondInMillis
      );
    }, 1000);
  }
}
