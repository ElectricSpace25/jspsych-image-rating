import { jsPsych } from "./init.js";
import { config, images } from "./config.js";

export function setupMedia() {
    const shuffled = jsPsych.randomization.shuffle(
        images.NAMES.map(name => {
            const v = jsPsych.randomization.randomInt(0, images.VERSIONS.length - 1);
            return `${images.BASE_FOLDER}/${images.VERSIONS[v]}/${name}_${images.VERSIONS[v]}${images.EXTENSION}`;
        })
    );

    // Return list or return section of list if DEBUG_IMAGES not null
    return config.DEBUG_IMAGES !== null ? shuffled.slice(0, config.DEBUG_IMAGES) : shuffled;
}