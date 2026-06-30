// --- Imports ---
import { config } from "./config.js";
import { jsPsych, setComplete } from "./init.js";
import * as content from "./content.js";

// --- Variables ---
const startTime = new Date().toLocaleString();

// --- Prolific ID ---
const urlParams = new URLSearchParams(window.location.search); // Get URL to search for Prolific ID
const prolificID = urlParams.get("participant_id") || "unknown"; // If no ID in URL, ID will be "unknown"

// --- Trials ---
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

const likertTrial = {
    type: jsPsychSurveyLikert,
    questions: [
        {
            prompt: `<img src="images/0SD/CFD_WM_001_014_N_0SD.png" style="width: auto; height: 300px;">
               <h3>How trustworthy is this face?</h3>`,
            labels: [
                "Very Untrustworthy",
                " ",
                " ",
                " ",
                " ",
                " ",
                "Very Trustworthy"
            ]
        }
    ],
    scale_width: 500,
    data: { trial_name: "trial" }
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

timeline.push(
    // screenerTrial,
    likertTrial,
    demographicsTrial,
    completionTrial
);

jsPsych.run(timeline);