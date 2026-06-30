export const screenerContent = {
    title: "Welcome to the experiment!",
    elements:
        [
            {
                type: "html",
                name: "instructions",
                html: "<p>Please answer the following questions to determine your eligibility.</p>",
            },
            {
                type: "radiogroup",
                name: "english",
                title: "Are you fluent in English?",
                choices: ["Yes", "No"],
                isRequired: true
            },
            {
                type: "radiogroup",
                name: "attention_check",
                title: "Please read the following instructions carefully",
                description: "Recent research on decision making has shown that choices are affected by political party affiliation. To help us understand how people from different backgrounds make decisions, we are interested in information about you. Specifically, we want to know if you actually read any of the instructions we give at the beginning of our survey; if not, some results may not tell us very much about decision making and perception in the real world. To show that you have read the instructions, please ignore the questions about political party affiliation below and simply select \"Other\" at the bottom.",
                choices: ["Democratic", "Republican", "Independent", "Libertarian", "Green Party", "Other"],
                isRequired: true
            }
        ]
};

export function imageRatingContent(image) {
    return {
        pages: [
            {
                title: "How trustworthy is this face?",
                "elements": [
                    {
                        type: "html",
                        name: "image",
                        html: `<img src="${image}" style="width: auto; height: 280px;">`
                    },
                    {
                        "type": "rating",
                        "name": "rating",
                        "titleLocation": "hidden",
                        "displayMode": "buttons",
                        "autoGenerate": false,
                        "rateCount": 7,
                        "rateValues": [
                            {
                                "value": 1,
                                "text": " "
                            },
                            {
                                "value": 2,
                                "text": " "
                            },
                            {
                                "value": 3,
                                "text": " "
                            },
                            {
                                "value": 4,
                                "text": " "
                            },
                            {
                                "value": 5,
                                "text": " "
                            },
                            {
                                "value": 6,
                                "text": " "
                            },
                            {
                                "value": 7,
                                "text": " "
                            }
                        ],
                        "rateMax": 7,
                        "minRateDescription": "Very\nUntrustworthy",
                        "maxRateDescription": "Very\nTrustworthy",
                        "rateDescriptionLocation": "top"
                    }
                ]
            }
        ]
    }
};

export const demographicsContent = {
    title: "Demographics",
    pages: [
        {
            elements:
                [
                    {
                        type: "text",
                        name: "age",
                        title: "What is your age?",
                        inputType: "number",
                        isRequired: true
                    },
                    {
                        type: "checkbox",
                        name: "gender",
                        title: "What gender do you identify with? (Select all that apply)",
                        choices: ["Male", "Female", "Transgender", "Non-binary", "Not otherwise specified", "I do not wish to provide this information"],
                        isRequired: true
                    },
                    {
                        type: "checkbox",
                        name: "race",
                        title: "What race/ethnicity do you identify with? (Select all that apply)",
                        choices: ["American Indian or Alaska Native", "Asian", "Black or African-American", "Native Hawaiian or Other Pacific Islander", "White", "Latino", "Other"],
                        isRequired: true
                    },
                    {
                        type: "radiogroup",
                        name: "education",
                        title: "What is the highest level of education you have received?",
                        choices: ["Less than High School", "High School Diploma", "Some College", "Associate's Degree", "Bachelor's Degree", "Some Graduate School", "Master's Degree", "Doctoral Degree"],
                        isRequired: true
                    }
                ]
        },
        {
            title: "Feedback",
            completeText: "Submit",
            elements:
                [
                    {
                        type: "comment",
                        name: "feedback",
                        title: "Please let us know if any part of the study was confusing, unclear, or in need of improvement. We appreciate your feedback greatly!",
                    }
                ]
        }
    ]
};

export const completionContent = {
    title: "Study Completed",
    completeText: "Click here to return to Prolific",
    elements:
        [
            {
                type: "html",
                html: "<p>Thank you for participating in the study!</p>",
            }
        ]
};