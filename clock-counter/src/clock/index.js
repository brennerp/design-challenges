import tachyons from "tachyons";
import "./style.scss";
import clockLabel from "./clockLabel.js";
import { ClockCounter } from "./clockCounter.js";

export default () => {
  const movingDate = new Date("Nov 19, 2018 08:00:00").getTime();

  let weWorkMovingCountdown = new ClockCounter(movingDate);

  const clockContainer = `
    <div class="clock-container">
      ${clockLabel}

      ${weWorkMovingCountdown.element}
    </div>
  `;

  document.getElementById("app").innerHTML = clockContainer;
  weWorkMovingCountdown.start();
};
