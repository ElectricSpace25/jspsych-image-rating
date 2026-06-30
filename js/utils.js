import { jsPsych } from "./init.js";
import { images } from "./config.js";

export function setupMedia() {
  return jsPsych.randomization.shuffle(
    images.NAMES.map(name => {
      const v = jsPsych.randomization.randomInt(0, images.VERSIONS.length - 1);
      return `${images.BASE_FOLDER}/${images.VERSIONS[v]}/${name}_${images.VERSIONS[v]}${images.EXTENSION}`;
    })
  );
}