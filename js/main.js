// --- Imports ---
import { config } from "./config.js";
import { jsPsych, setComplete } from "./init.js";
import * as content from "./content.js";
import * as utils from "./utils.js";

// --- Variables ---
const startTime = new Date().toLocaleString();

// --- Prolific ID ---
const urlParams = new URLSearchParams(window.location.search); // Get URL to search for Prolific ID
const prolificID = urlParams.get("participant_id") || "unknown"; // If no ID in URL, ID will be "unknown"

// --- Trials ---
const imagePaths = utils.setupMedia();

const preloadImages = {
    type: jsPsychPreload,
    image: [...imagePaths],
    message: "Please wait while we load the study.",
    data: { trial_name: "preload" }
}

const screenerTrial = {
    type: jsPsychSurvey,
    survey_json: content.screenerContent,
    on_finish: function (data) {
        if (data.response.english == "No" || data.response.attention_check != "Other") {
            // Attention/Language check failed -> study will terminate with a failure code and no data saved
            jsPsych.abortExperiment();
        }
    },
    data: { trial_name: "screener" }
};

const imageRatingTrial = {
    type: jsPsychSurvey,
    survey_json: () => content.imageRatingContent(jsPsych.evaluateTimelineVariable("image")),
    data: { trial_name: "image_rating" }
};

const demographicsTrial = {
    type: jsPsychSurvey,
    survey_json: content.demographicsContent,
    data: { trial_name: "demographics" }
};

// This is a critical trial that indicates study completion, prompting the data to be saved
// It also saves the Prolific ID and start/end time
const completionTrial = {
    type: jsPsychSurvey,
    survey_json: content.completionContent,
    data: { trial_name: "info", prolific_id: prolificID, start_time: startTime },
    on_finish: function (data) {
        data.end_time = new Date().toLocaleString(); // Record final timestamp
        setComplete(true); // Mark study as completed
    },
};

if (config.DEBUG_LOGS) console.log("Example") // Sample debug log that only prints if DEBUG_LOGS is true

// --- Timeline ---
var timeline = [];

const imageTimeline = {
    timeline: [imageRatingTrial],
    timeline_variables: imagePaths.map(path => ({ image: path }))
};

timeline.push(
    screenerTrial,
    imageTimeline,
    demographicsTrial,
    completionTrial
);

jsPsych.run(timeline);