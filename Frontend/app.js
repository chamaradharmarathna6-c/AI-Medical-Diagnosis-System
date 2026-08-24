"use strict";
const API_BASE = "http://127.0.0.1:8000";

const MODEL_CONFIGS = {

  diabetes: {
    label: "Diabetes",
    endpoint: "diabetes",
    supportDisease: "diabetes",

    fields: [
      ["Pregnancies", "Pregnancies", "integer"],
      ["Glucose", "Glucose", "number"],
      ["BloodPressure", "Blood pressure", "number"],
      ["SkinThickness", "Skin thickness", "number"],
      ["Insulin", "Insulin", "number"],
      ["BMI", "BMI", "number"],
      [
        "DiabetesPedigreeFunction",
        "Diabetes pedigree function",
        "number"
      ],
      ["Age", "Age", "number"]
    ]
  },


  heart: {
    label: "Heart Disease",
    endpoint: "heart",
    supportDisease: "heart_disease",

    fields: [
      ["Age", "Age", "integer"],

      [
        "Sex",
        "Sex (0 = female, 1 = male)",
        ["0", "1"]
      ],

      [
        "Chest pain type",
        "Chest pain type (1-4)",
        ["1", "2", "3", "4"]
      ],

      ["BP", "Resting blood pressure", "integer"],

      ["Cholesterol", "Cholesterol", "integer"],

      [
        "FBS over 120",
        "Fasting blood sugar over 120",
        ["0", "1"]
      ],

      [
        "EKG results",
        "ECG result (0-2)",
        ["0", "1", "2"]
      ],

      ["Max HR", "Maximum heart rate", "integer"],

      [
        "Exercise angina",
        "Exercise angina",
        ["0", "1"]
      ],

      ["ST depression", "ST depression", "number"],

      [
        "Slope of ST",
        "ST slope (1-3)",
        ["1", "2", "3"]
      ],

      [
        "Number of vessels fluro",
        "Number of vessels (0-3)",
        ["0", "1", "2", "3"]
      ],

      [
        "Thallium",
        "Thallium (3, 6, or 7)",
        ["3", "6", "7"]
      ]
    ]
  },


  kidney: {
    label: "Kidney Disease",
    endpoint: "kidney",
    supportDisease: "chronic_kidney_disease",

    fields: [
      ["Age of the patient", "Age", "integer"],

      [
        "Blood pressure (mm/Hg)",
        "Blood pressure",
        "integer"
      ],

      [
        "Specific gravity of urine",
        "Specific gravity",
        "number"
      ],

      [
        "Albumin in urine",
        "Albumin in urine",
        ["0", "1", "2", "3", "4", "5"]
      ],

      [
        "Sugar in urine",
        "Sugar in urine",
        ["0", "1", "2", "3", "4", "5"]
      ],

      [
        "Red blood cells in urine",
        "Red blood cells",
        ["normal", "abnormal"]
      ],

      [
        "Pus cells in urine",
        "Pus cells",
        ["normal", "abnormal"]
      ],

      [
        "Pus cell clumps in urine",
        "Pus cell clumps",
        ["not present", "present"]
      ],

      [
        "Bacteria in urine",
        "Bacteria",
        ["not present", "present"]
      ],

      [
        "Random blood glucose level (mg/dl)",
        "Random blood glucose",
        "integer"
      ],

      [
        "Blood urea (mg/dl)",
        "Blood urea",
        "number"
      ],

      [
        "Serum creatinine (mg/dl)",
        "Serum creatinine",
        "number"
      ],

      [
        "Sodium level (mEq/L)",
        "Sodium level",
        "number"
      ],

      [
        "Potassium level (mEq/L)",
        "Potassium level",
        "number"
      ],

      [
        "Hemoglobin level (gms)",
        "Hemoglobin",
        "number"
      ],

      [
        "Packed cell volume (%)",
        "Packed cell volume",
        "integer"
      ],

      [
        "White blood cell count (cells/cumm)",
        "White blood cell count",
        "integer"
      ],

      [
        "Red blood cell count (millions/cumm)",
        "Red blood cell count",
        "number"
      ],

      [
        "Hypertension (yes/no)",
        "Hypertension",
        ["yes", "no"]
      ],

      [
        "Diabetes mellitus (yes/no)",
        "Diabetes mellitus",
        ["yes", "no"]
      ],

      [
        "Coronary artery disease (yes/no)",
        "Coronary artery disease",
        ["yes", "no"]
      ],

      [
        "Appetite (good/poor)",
        "Appetite",
        ["good", "poor"]
      ],

      [
        "Pedal edema (yes/no)",
        "Pedal edema",
        ["yes", "no"]
      ],

      [
        "Anemia (yes/no)",
        "Anemia",
        ["yes", "no"]
      ],

      [
        "Estimated Glomerular Filtration Rate (eGFR)",
        "eGFR",
        "number"
      ],

      [
        "Urine protein-to-creatinine ratio",
        "Urine protein-to-creatinine ratio",
        "number"
      ],

      [
        "Urine output (ml/day)",
        "Urine output",
        "integer"
      ],

      [
        "Serum albumin level",
        "Serum albumin",
        "number"
      ],

      [
        "Cholesterol level",
        "Cholesterol",
        "integer"
      ],

      [
        "Parathyroid hormone (PTH) level",
        "PTH level",
        "number"
      ],

      [
        "Serum calcium level",
        "Serum calcium",
        "number"
      ],

      [
        "Serum phosphate level",
        "Serum phosphate",
        "number"
      ],

      [
        "Family history of chronic kidney disease",
        "Family history",
        ["yes", "no"]
      ],

      [
        "Smoking status",
        "Smoking status",
        ["yes", "no"]
      ],

      [
        "Body Mass Index (BMI)",
        "BMI",
        "number"
      ],

      [
        "Physical activity level",
        "Physical activity level",
        ["low", "moderate", "high"]
      ],

      [
        "Duration of diabetes mellitus (years)",
        "Diabetes duration",
        "integer"
      ],

      [
        "Duration of hypertension (years)",
        "Hypertension duration",
        "integer"
      ],

      [
        "Cystatin C level",
        "Cystatin C",
        "number"
      ],

      [
        "Urinary sediment microscopy results",
        "Urinary sediment microscopy",
        ["normal", "abnormal"]
      ],

      [
        "C-reactive protein (CRP) level",
        "CRP",
        "number"
      ],

      [
        "Interleukin-6 (IL-6) level",
        "IL-6",
        "number"
      ]
    ]
  },


  liver: {
    label: "Liver Disease",
    endpoint: "liver",
    supportDisease: "liver_disease",

    fields: [
      ["age", "Age", "integer"],

      [
        "gender",
        "Gender",
        ["Female", "Male"]
      ],

      [
        "tot_bilirubin",
        "Total bilirubin",
        "number"
      ],

      [
        "direct_bilirubin",
        "Direct bilirubin",
        "number"
      ],

      [
        "tot_proteins",
        "Total proteins",
        "number"
      ],

      [
        "albumin",
        "Albumin",
        "number"
      ],

      [
        "ag_ratio",
        "Albumin/globulin ratio",
        "number"
      ],

      [
        "sgpt",
        "SGPT",
        "number"
      ],

      [
        "sgot",
        "SGOT",
        "number"
      ],

      [
        "alkphos",
        "Alkaline phosphatase",
        "number"
      ]
    ]
  }

};


const DISEASES = Object.entries(MODEL_CONFIGS);


function getToken() {

  return localStorage.getItem(
    "medicalToken"
  );

}


function isAuthenticated() {

  return Boolean(
    getToken()
  );

}


function logout() {

  localStorage.removeItem(
    "medicalToken"
  );

  localStorage.removeItem(
    "lastPrediction"
  );

  window.location.href =
    "index.html";

}


function requireAuth() {

  if (!isAuthenticated()) {

    window.location.href =
      "index.html";

    return false;
  }

  return true;
}



function escapeHtml(value) {

  return String(
    value ?? ""
  ).replace(
    /[&<>"']/g,
    char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[char]
  );

}


function getElement(selector) {

  return document.querySelector(
    selector
  );

}


function showMessage(
  selector,
  message,
  type = ""
) {

  const element =
    getElement(selector);

  if (!element) {
    return;
  }

  element.textContent =
    message || "";

  element.classList.remove(
    "success-message",
    "error-message"
  );

  if (type === "success") {

    element.classList.add(
      "success-message"
    );

  }

  if (type === "error") {

    element.classList.add(
      "error-message"
    );

  }

}


function renderEmpty(
  target,
  message
) {

  if (!target) {
    return;
  }

  target.innerHTML = `
    <div class="empty-state">
      ${escapeHtml(message)}
    </div>
  `;

}


function safeDate(value) {

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    return "—";

  }

  return date.toLocaleString();

}



function riskClass(value) {

  const risk =
    String(value || "")
      .trim()
      .toLowerCase();


  if (
    risk === "moderate" ||
    risk === "medium"
  ) {

    return "risk-medium";

  }


  if (risk === "low") {

    return "risk-low";

  }


  if (risk === "high") {

    return "risk-high";

  }


  if (
    risk === "very high" ||
    risk === "very_high" ||
    risk === "veryhigh"
  ) {

    return "risk-high";

  }


  return "";

}


function normaliseRisk(value) {

  const risk =
    String(value || "")
      .trim()
      .toLowerCase();


  if (risk === "moderate") {
    return "Moderate";
  }


  if (risk === "medium") {
    return "Medium";
  }


  if (risk === "high") {
    return "High";
  }


  if (risk === "very high") {
    return "Very High";
  }


  if (risk === "very_high") {
    return "Very High";
  }


  if (risk === "veryhigh") {
    return "Very High";
  }


  if (risk === "low") {
    return "Low";
  }


  return value || "";

}



async function apiFetch(
  path,
  options = {}
) {

  const headers = {

    Accept:
      "application/json",

    ...(options.headers || {})

  };


  if (
    options.body &&
    !headers["Content-Type"]
  ) {

    headers["Content-Type"] =
      "application/json";

  }


  const token =
    getToken();


  if (token) {

    headers.Authorization =
      `Bearer ${token}`;

  }


  let response;


  try {

    response =
      await fetch(
        `${API_BASE}${path}`,
        {
          ...options,
          headers
        }
      );

  } catch (error) {

    console.error(
      "API connection error:",
      error
    );


    throw new Error(
      "Cannot connect to the API server. Please make sure FastAPI is running on http://127.0.0.1:8000."
    );

  }


  let data = null;


  try {

    data =
      await response.json();

  } catch {

    data = null;

  }


  if (
    response.status === 401
  ) {

    localStorage.removeItem(
      "medicalToken"
    );


    if (
      document.body.dataset.page !==
        "login" &&
      document.body.dataset.page !==
        "register"
    ) {

      window.location.href =
        "index.html";

    }


    throw new Error(
      "Your session has expired. Please login again."
    );

  }


  if (!response.ok) {

    let detail =
      `Request failed with status ${response.status}.`;


    if (data) {

      if (
        typeof data.detail ===
        "string"
      ) {

        detail =
          data.detail;

      }

      else if (
        Array.isArray(data.detail)
      ) {

        detail =
          data.detail
            .map(item => {

              if (
                typeof item ===
                "string"
              ) {

                return item;

              }

              return (
                item?.msg ||
                item?.message ||
                JSON.stringify(item)
              );

            })
            .join(", ");

      }

      else if (
        typeof data.message ===
        "string"
      ) {

        detail =
          data.message;

      }

      else if (
        typeof data.error ===
        "string"
      ) {

        detail =
          data.error;

      }

    }


    throw new Error(
      detail
    );

  }


  return data;

}



function navigation() {

  const target =
    getElement("#site-nav");


  if (!target) {
    return;
  }


  target.className =
    "site-header";


  target.innerHTML = `

    <a
      class="brand"
      href="dashboard.html"
    >
      MedAssist AI
      <small>
        DECISION SUPPORT
      </small>
    </a>


    <nav class="nav-links">

      <a href="dashboard.html">
        Dashboard
      </a>

      <a href="prediction.html">
        New Prediction
      </a>

      <a href="history.html">
        History
      </a>

      <a href="recommendations.html">
        Recommendations
      </a>

      <a href="doctors.html">
        Doctors
      </a>

      <button
        type="button"
        id="logout-button"
      >
        Logout
      </button>

    </nav>

  `;


  const logoutButton =
    getElement(
      "#logout-button"
    );


  if (logoutButton) {

    logoutButton.addEventListener(
      "click",
      logout
    );

  }


  const currentPage =
    document.body.dataset.page;


  document
    .querySelectorAll(
      ".nav-links a"
    )
    .forEach(link => {

      const href =
        link.getAttribute(
          "href"
        );


      if (
        currentPage &&
        href &&
        href.includes(
          `${currentPage}.html`
        )
      ) {

        link.classList.add(
          "active"
        );

      }

    });

}



function populateDiseaseSelect(
  select
) {

  if (!select) {
    return;
  }


  const currentValue =
    select.value;


  select.innerHTML = `

    <option value="">
      Select condition
    </option>

    ${DISEASES
      .map(
        ([key, config]) => `
          <option
            value="${escapeHtml(key)}"
          >
            ${escapeHtml(
              config.label
            )}
          </option>
        `
      )
      .join("")}

  `;


  if (
    currentValue &&
    MODEL_CONFIGS[currentValue]
  ) {

    select.value =
      currentValue;

  }

}



function renderPredictionFields(
  config,
  target
) {

  if (
    !config ||
    !target
  ) {

    return;

  }


  target.innerHTML =
    config.fields
      .map(
        ([name, label, type]) => {

          const fieldId =
            `prediction-${name
              .replace(
                /[^a-zA-Z0-9_-]/g,
                "-"
              )}`;


          if (
            Array.isArray(type)
          ) {

            const options =
              type
                .map(
                  option => `
                    <option
                      value="${escapeHtml(
                        option
                      )}"
                    >
                      ${escapeHtml(
                        option
                      )}
                    </option>
                  `
                )
                .join("");


            return `

              <div class="form-field">

                <label
                  for="${escapeHtml(
                    fieldId
                  )}"
                >
                  ${escapeHtml(
                    label
                  )}
                </label>


                <select
                  id="${escapeHtml(
                    fieldId
                  )}"
                  name="${escapeHtml(
                    name
                  )}"
                  required
                >

                  <option value="">
                    Select...
                  </option>

                  ${options}

                </select>

              </div>

            `;

          }


          return `

            <div class="form-field">

              <label
                for="${escapeHtml(
                  fieldId
                )}"
              >
                ${escapeHtml(
                  label
                )}
              </label>


              <input
                id="${escapeHtml(
                  fieldId
                )}"
                name="${escapeHtml(
                  name
                )}"
                type="number"
                step="${
                  type === "integer"
                    ? "1"
                    : "any"
                }"
                ${
                  type === "integer"
                    ? 'min="0"'
                    : ""
                }
                required
                autocomplete="off"
              />

            </div>

          `;

        }
      )
      .join("");

}


function collectPredictionValues(
  form,
  config
) {

  const values = {};


  for (
    const [
      name,
      label,
      type
    ]
    of config.fields
  ) {

    const input =
      form.elements[name];


    if (!input) {

      throw new Error(
        `Prediction field "${label}" was not found.`
      );

    }


    const raw =
      String(
        input.value ?? ""
      ).trim();


    if (!raw) {

      throw new Error(
        `Please enter/select ${label}.`
      );

    }


    if (
      Array.isArray(type)
    ) {

      if (
        !type.includes(raw)
      ) {

        throw new Error(
          `Invalid value for ${label}.`
        );

      }


      values[name] =
        raw;


      continue;

    }


    const numberValue =
      Number(raw);


    if (
      !Number.isFinite(
        numberValue
      )
    ) {

      throw new Error(
        `${label} must be a valid number.`
      );

    }


    if (
      type === "integer" &&
      !Number.isInteger(
        numberValue
      )
    ) {

      throw new Error(
        `${label} must be a whole number.`
      );

    }


    values[name] =
      numberValue;

  }


  return values;

}


function getProbability(
  result
) {

  const raw =
    result?.probability ??
    result?.Probability ??
    result?.risk_probability ??
    result?.riskProbability ??
    null;


  if (raw == null) {
    return null;
  }


  const number =
    Number(raw);


  if (
    !Number.isFinite(
      number
    )
  ) {

    return null;

  }


  if (number > 1) {

    return `${number.toFixed(1)}%`;

  }


  return `${(
    number * 100
  ).toFixed(1)}%`;

}


function getPredictionValue(
  result
) {

  return (
    result?.prediction ??
    result?.Prediction ??
    result?.result ??
    result?.Result ??
    result?.diagnosis ??
    result?.Diagnosis ??
    "—"
  );

}


function getRiskValue(
  result
) {

  return (
    result?.risk_level ??
    result?.riskLevel ??
    result?.RiskLevel ??
    result?.Risk_Level ??
    "—"
  );

}


function getReviewStatus(
  result
) {

  return (
    result?.review_status ??
    result?.reviewStatus ??
    result?.ReviewStatus ??
    result?.Review_Status ??
    "Pending"
  );

}


function formatFeatureName(
  value
) {

  let name =
    String(
      value ?? ""
    ).trim();


  if (!name) {
    return "Feature";
  }



  name =
    name.replace(
      /^(numeric|categorical|remainder)__/i,
      ""
    );



  name =
    name.replace(
      /_(0|1|2|3|4|5|6|7)$/,
      ""
    );


  name =
    name.replace(
      /_/g,
      " "
    );


  const replacements = {

    "BloodPressure":
      "Blood Pressure",

    "SkinThickness":
      "Skin Thickness",

    "DiabetesPedigreeFunction":
      "Diabetes Pedigree Function",

    "Max HR":
      "Maximum Heart Rate",

    "FBS over 120":
      "Fasting Blood Sugar over 120",

    "EKG results":
      "ECG Results",

    "ST depression":
      "ST Depression",

    "Number of vessels fluro":
      "Number of Vessels",

    "tot bilirubin":
      "Total Bilirubin",

    "direct bilirubin":
      "Direct Bilirubin",

    "tot proteins":
      "Total Proteins",

    "ag ratio":
      "Albumin/Globulin Ratio",

    "sgpt":
      "SGPT",

    "sgot":
      "SGOT",

    "alkphos":
      "Alkaline Phosphatase"

  };


  if (
    replacements[name]
  ) {

    return replacements[name];

  }


  name =
    name.replace(
      /([a-z])([A-Z])/g,
      "$1 $2"
    );


  return name
    .replace(
      /\s+/g,
      " "
    )
    .trim();

}



function getExplanation(
  result
) {

  const explanation =
    result?.explanation ??
    result?.Explanation ??
    result?.reasons ??
    result?.Reasons ??
    result?.shap_explanation ??
    result?.shapExplanation ??
    result?.feature_importance ??
    result?.featureImportance ??
    [];




  if (
    Array.isArray(
      explanation
    )
  ) {

    return explanation;

  }


 

  if (
    explanation &&
    typeof explanation ===
      "object"
  ) {

    return Object
      .entries(
        explanation
      )
      .map(
        ([feature, value]) => ({
          feature,
          contribution: value
        })
      );

  }


  if (
    typeof explanation ===
    "string"
  ) {

    return [
      explanation
    ];

  }


  return [];

}


function renderPredictionResult(
  target,
  result
) {

  if (
    !target ||
    !result
  ) {

    return;

  }


  const probability =
    getProbability(
      result
    );


  const prediction =
    getPredictionValue(
      result
    );


  const risk =
    getRiskValue(
      result
    );


  const reviewStatus =
    getReviewStatus(
      result
    );


  const explanation =
    getExplanation(
      result
    );


  const disclaimer =
    result?.disclaimer ??
    result?.Disclaimer ??
    "AI-generated preliminary assessment — not a confirmed medical diagnosis. This academic decision-support prediction requires professional verification. Consult a qualified healthcare professional.";


  target.classList.remove(
    "hidden"
  );


  const explanationHtml =
    explanation.length
      ? explanation
          .map(item => {

           

            if (
              typeof item ===
              "string"
            ) {

              return `

                <div
                  class="explanation-item"
                >

                  <p>
                    ${escapeHtml(
                      item
                    )}
                  </p>

                </div>

              `;

            }


            

            const feature =
              item?.feature ??
              item?.Feature ??
              item?.name ??
              item?.Name ??
              item?.title ??
              item?.Title ??
              "Feature";


            

            const value =
              item?.value ??
              item?.Value ??
              item?.input_value ??
              item?.inputValue ??
              null;


           
            const contribution =
              item?.contribution ??
              item?.Contribution ??
              item?.shap_value ??
              item?.shapValue ??
              item?.importance ??
              item?.Importance ??
              item?.impact ??
              item?.Impact ??
              null;


           
            let direction =
              item?.direction ??
              item?.Direction ??
              "";


            let contributionText =
              "";


            if (
              contribution !== null &&
              contribution !== undefined &&
              contribution !== ""
            ) {

              const number =
                Number(
                  contribution
                );


              if (
                Number.isFinite(
                  number
                )
              ) {

                contributionText =
                  number > 0
                    ? `+${number.toFixed(4)}`
                    : number.toFixed(4);

              } else {

                contributionText =
                  String(
                    contribution
                  );

              }

            }


            
            if (
              !direction &&
              contribution !== null &&
              contribution !== undefined
            ) {

              const numericContribution =
                Number(
                  contribution
                );


              if (
                Number.isFinite(
                  numericContribution
                )
              ) {

                if (
                  numericContribution > 0
                ) {

                  direction =
                    "This feature increases the predicted risk.";

                }

                else if (
                  numericContribution < 0
                ) {

                  direction =
                    "This feature decreases the predicted risk.";

                }

                else {

                  direction =
                    "This feature has little effect on the prediction.";

                }

              }

            }


            return `

              <div
                class="explanation-item"
              >

                <p>

                  <strong>
                    ${escapeHtml(
                      formatFeatureName(
                        feature
                      )
                    )}
                  </strong>


                  ${
                    value !== null &&
                    value !== undefined &&
                    value !== ""
                      ? `

                        <span>
                          — Patient value:
                          ${escapeHtml(
                            value
                          )}
                        </span>

                      `
                      : ""
                  }


                  ${
                    contributionText
                      ? `

                        <span>
                          — Contribution:
                          ${escapeHtml(
                            contributionText
                          )}
                        </span>

                      `
                      : ""
                  }

                </p>


                ${
                  direction
                    ? `

                      <small>
                        ${escapeHtml(
                          direction
                        )}
                      </small>

                    `
                    : ""
                }

              </div>

            `;

          })
          .join("")

      : `

          <p class="no-explanation">
            No feature-level explanation was returned by the API.
          </p>

        `;


  target.innerHTML = `

    <div class="result-card">

      <h2>
        Preliminary Assessment
      </h2>


      <div class="result-summary">


        <div class="metric">

          <span>
            Prediction
          </span>

          <strong>
            ${escapeHtml(
              prediction
            )}
          </strong>

        </div>


        <div class="metric">

          <span>
            Probability
          </span>

          <strong>
            ${escapeHtml(
              probability ?? "—"
            )}
          </strong>

        </div>


        <div class="metric">

          <span>
            Risk level
          </span>

          <strong>

            <span
              class="risk-badge ${riskClass(
                risk
              )}"
            >
              ${escapeHtml(
                normaliseRisk(
                  risk
                ) || "—"
              )}
            </span>

          </strong>

        </div>


        <div class="metric">

          <span>
            Review status
          </span>

          <strong>
            ${escapeHtml(
              reviewStatus
            )}
          </strong>

        </div>


      </div>


      <div
        class="prediction-explanation"
      >

        <h3>
          Explanation
        </h3>

        ${explanationHtml}

      </div>


      <div class="disclaimer">

        ${escapeHtml(
          disclaimer
        )}

      </div>


    </div>

  `;

}



async function submitPrediction(
  disease,
  form,
  resultTarget,
  messageTarget
) {

  const config =
    MODEL_CONFIGS[disease];


  if (!config) {

    throw new Error(
      "Please select a valid disease."
    );

  }


  const values =
    collectPredictionValues(
      form,
      config
    );


  const response =
    await apiFetch(
      `/api/predict/${config.endpoint}`,
      {
        method: "POST",

        body: JSON.stringify({

          values,

          include_explanation:
            true

        })

      }
    );


  localStorage.setItem(
    "lastPrediction",
    JSON.stringify(
      response
    )
  );


  renderPredictionResult(
    resultTarget,
    response
  );


  if (
    messageTarget
  ) {

    messageTarget.textContent =
      "Assessment completed successfully.";


    messageTarget.classList.remove(
      "error-message"
    );


    messageTarget.classList.add(
      "success-message"
    );

  }


  return response;

}



function setupPrediction() {

  const form =
    getElement(
      "#prediction-form"
    );


  const diseaseSelect =
    getElement(
      "#prediction-disease"
    );


  const fieldsContainer =
    getElement(
      "#dynamic-fields"
    );


  const result =
    getElement(
      "#prediction-result"
    );


  const message =
    getElement(
      "#prediction-message"
    );


  if (!form) {

    console.error(
      "Prediction form #prediction-form was not found."
    );

    return;

  }


  if (!diseaseSelect) {

    console.error(
      "Prediction select #prediction-disease was not found."
    );

    return;

  }


  if (!fieldsContainer) {

    console.error(
      "Prediction container #dynamic-fields was not found."
    );

    return;

  }


  populateDiseaseSelect(
    diseaseSelect
  );


  function clearPredictionResult() {

    if (result) {

      result.innerHTML =
        "";

      result.classList.add(
        "hidden"
      );

    }


    if (message) {

      message.textContent =
        "";

      message.classList.remove(
        "success-message",
        "error-message"
      );

    }

  }


  function updateFields() {

    const disease =
      diseaseSelect.value;


    const config =
      MODEL_CONFIGS[disease];


    if (!config) {

      fieldsContainer.innerHTML =
        "";


      clearPredictionResult();

      return;

    }


    renderPredictionFields(
      config,
      fieldsContainer
    );


    clearPredictionResult();

  }


  diseaseSelect.addEventListener(
    "change",
    updateFields
  );


  updateFields();


  form.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      if (
        !form.reportValidity()
      ) {

        return;

      }


      const disease =
        diseaseSelect.value;


      if (
        !MODEL_CONFIGS[disease]
      ) {

        if (message) {

          message.textContent =
            "Please select a disease.";

          message.classList.add(
            "error-message"
          );

        }

        return;

      }


      if (result) {

        result.innerHTML =
          "";

        result.classList.remove(
          "hidden"
        );

      }


      if (message) {

        message.textContent =
          "Generating preliminary assessment...";


        message.classList.remove(
          "success-message",
          "error-message"
        );

      }


      setSubmitBusy(
        form,
        true,
        "Generating..."
      );


      try {

        await submitPrediction(
          disease,
          form,
          result,
          message
        );

      }

      catch (error) {

        console.error(
          "Prediction error:",
          error
        );


        if (message) {

          message.textContent =
            error.message ||
            "Unable to generate assessment.";


          message.classList.add(
            "error-message"
          );

        }


        if (result) {

          result.classList.remove(
            "hidden"
          );


          renderEmpty(
            result,
            error.message ||
            "Unable to generate assessment."
          );

        }

      }

      finally {

        setSubmitBusy(
          form,
          false
        );

      }

    }
  );

}



function renderDoctors(
  target,
  rows
) {

  if (!target) {
    return;
  }


  if (
    !Array.isArray(rows) ||
    rows.length === 0
  ) {

    renderEmpty(
      target,
      "No doctors were found for this disease."
    );

    return;

  }


  target.innerHTML =
    rows
      .map(item => {

        const name =
          item?.Doctor_Name ??
          item?.DoctorName ??
          item?.doctor_name ??
          item?.doctorName ??
          item?.name ??
          "Doctor";


        const specialty =
          item?.Specializes ??
          item?.specializes ??
          item?.specialty ??
          item?.Specialty ??
          "Medical Specialist";


        const location =
          item?.Location ??
          item?.location ??
          "Location not available";


        const disease =
          item?.disease ??
          item?.Disease ??
          item?.disease_name ??
          "";


        const doctorId =
          item?.Doctor_ID ??
          item?.doctor_id ??
          item?.id ??
          "";


        return `

          <article
            class="info-card doctor-card"
          >

            <h2>
              ${escapeHtml(
                name
              )}
            </h2>


            ${
              specialty
                ? `

                  <p>

                    <strong>
                      Specialty:
                    </strong>

                    ${escapeHtml(
                      specialty
                    )}

                  </p>

                `
                : ""
            }


            ${
              location
                ? `

                  <p>

                    <strong>
                      Location:
                    </strong>

                    ${escapeHtml(
                      location
                    )}

                  </p>

                `
                : ""
            }


            ${
              disease
                ? `

                  <p>

                    <strong>
                      Disease:
                    </strong>

                    ${escapeHtml(
                      disease
                    )}

                  </p>

                `
                : ""
            }


            ${
              doctorId
                ? `

                  <p>

                    <strong>
                      Doctor ID:
                    </strong>

                    ${escapeHtml(
                      doctorId
                    )}

                  </p>

                `
                : ""
            }

          </article>

        `;

      })
      .join("");

}


async function loadDoctors(
  disease,
  target
) {

  if (!target) {
    return;
  }


  renderEmpty(
    target,
    "Loading doctors..."
  );


  try {

    if (!disease) {

      throw new Error(
        "Please select a disease."
      );

    }


    const query =
      new URLSearchParams();


    query.set(
      "disease",
      disease
    );


    const response =
      await apiFetch(
        `/api/doctors?${query.toString()}`
      );


    let rows =
      response;


  

    if (
      response &&
      !Array.isArray(response)
    ) {

      rows =
        response.doctors ??
        response.data ??
        response.results ??
        [];

    }


    renderDoctors(
      target,
      rows
    );

  }

  catch (error) {

    console.error(
      "Doctors API error:",
      error
    );


    renderEmpty(
      target,
      error.message ||
      "Unable to load doctors."
    );

  }

}


function setupDoctors() {

  const diseaseSelect =
    getElement(
      "#doctor-disease"
    );


  const loadButton =
    getElement(
      "#load-doctors"
    );


  const content =
    getElement(
      "#doctor-content"
    );


  if (
    !diseaseSelect ||
    !loadButton ||
    !content
  ) {

    console.error(
      "Doctors page elements were not found."
    );

    return;

  }


  populateDiseaseSelect(
    diseaseSelect
  );


  loadButton.addEventListener(
    "click",
    event => {

      event.preventDefault();


      const config =
        MODEL_CONFIGS[
          diseaseSelect.value
        ];


      if (!config) {

        renderEmpty(
          content,
          "Please select a valid disease."
        );

        return;

      }


      loadDoctors(
        config.supportDisease,
        content
      );

    }
  );

}



async function loadDashboard() {

  const metrics =
    getElement(
      "#dashboard-metrics"
    );


  const recent =
    getElement(
      "#recent-prediction"
    );


  if (
    !metrics ||
    !recent
  ) {

    return;

  }


  renderEmpty(
    metrics,
    "Loading dashboard..."
  );


  renderEmpty(
    recent,
    "Loading recent prediction..."
  );


  try {

    const rows =
      await apiFetch(
        "/api/history"
      );


    if (
      !Array.isArray(rows) ||
      rows.length === 0
    ) {

      renderEmpty(
        metrics,
        "No predictions have been recorded yet."
      );


      renderEmpty(
        recent,
        "No predictions have been recorded yet."
      );


      return;

    }


    const newestFirst =
      [...rows].sort(
        (a, b) =>
          new Date(
            b?.created_at || 0
          ) -
          new Date(
            a?.created_at || 0
          )
      );


    const latest =
      newestFirst[0];


    const riskValues = {

      low: 1,

      moderate: 2,

      medium: 2,

      high: 3,

      "very high": 4,

      "very_high": 4

    };


    const highestRisk =
      [...rows].sort(
        (a, b) => {

          const riskB =
            riskValues[
              String(
                b?.risk_level || ""
              ).toLowerCase()
            ] || 0;


          const riskA =
            riskValues[
              String(
                a?.risk_level || ""
              ).toLowerCase()
            ] || 0;


          return riskB - riskA;

        }
      )[0];


    metrics.innerHTML = `

      <div class="metric">

        <span>
          Total predictions
        </span>

        <strong>
          ${rows.length}
        </strong>

      </div>


      <div class="metric">

        <span>
          Latest assessment
        </span>

        <strong>
          ${escapeHtml(
            latest?.disease ||
            "—"
          )}
        </strong>

      </div>


      <div class="metric">

        <span>
          Highest risk
        </span>

        <strong>

          <span
            class="risk-badge ${riskClass(
              highestRisk?.risk_level
            )}"
          >

            ${escapeHtml(
              normaliseRisk(
                highestRisk?.risk_level
              ) || "—"
            )}

          </span>

        </strong>

      </div>


      <div class="metric">

        <span>
          Latest review status
        </span>

        <strong>
          ${escapeHtml(
            latest?.review_status ||
            "—"
          )}
        </strong>

      </div>

    `;


    recent.innerHTML = `

      <div class="result-summary">

        <div class="metric">

          <span>
            ${escapeHtml(
              latest?.disease ||
              "Assessment"
            )}
          </span>


          <strong>
            ${escapeHtml(
              latest?.prediction ||
              "—"
            )}
          </strong>


          <small>

            ${escapeHtml(
              normaliseRisk(
                latest?.risk_level
              ) ||
              "Unknown"
            )}

            risk ·

            ${escapeHtml(
              latest?.review_status ||
              "—"
            )}

          </small>

        </div>

      </div>

    `;

  }

  catch (error) {

    renderEmpty(
      metrics,
      error.message ||
      "Unable to load dashboard."
    );


    renderEmpty(
      recent,
      error.message ||
      "Unable to load dashboard."
    );

  }

}



function historyRow(
  item
) {

  const rawProbability =
    item?.probability;


  let probability =
    "—";


  if (
    rawProbability !== null &&
    rawProbability !== undefined &&
    rawProbability !== ""
  ) {

    const number =
      Number(
        rawProbability
      );


    if (
      Number.isFinite(
        number
      )
    ) {

      probability =
        number <= 1
          ? `${(
              number * 100
            ).toFixed(1)}%`
          : `${number.toFixed(1)}%`;

    }

  }


  return `

    <tr>

      <td>
        ${escapeHtml(
          item?.id ?? "—"
        )}
      </td>


      <td>
        ${escapeHtml(
          item?.disease ?? "—"
        )}
      </td>


      <td>
        ${escapeHtml(
          item?.prediction ?? "—"
        )}
      </td>


      <td>
        ${escapeHtml(
          probability
        )}
      </td>


      <td>

        <span
          class="risk-badge ${riskClass(
            item?.risk_level
          )}"
        >

          ${escapeHtml(
            normaliseRisk(
              item?.risk_level
            ) || "—"
          )}

        </span>

      </td>


      <td>
        ${escapeHtml(
          item?.review_status ||
          "—"
        )}
      </td>


      <td>
        ${escapeHtml(
          safeDate(
            item?.created_at
          )
        )}
      </td>

    </tr>

  `;

}


async function loadHistory(
  target
) {

  if (!target) {
    return;
  }


  renderEmpty(
    target,
    "Loading history..."
  );


  try {

    const rows =
      await apiFetch(
        "/api/history"
      );


    if (
      !Array.isArray(rows) ||
      rows.length === 0
    ) {

      renderEmpty(
        target,
        "No predictions have been recorded yet."
      );

      return;

    }


    const newestFirst =
      [...rows].sort(
        (a, b) =>
          new Date(
            b?.created_at || 0
          ) -
          new Date(
            a?.created_at || 0
          )
      );


    target.innerHTML = `

      <div class="table-wrapper">

        <table>

          <thead>

            <tr>

              <th>
                ID
              </th>

              <th>
                Disease
              </th>

              <th>
                Prediction
              </th>

              <th>
                Probability
              </th>

              <th>
                Risk
              </th>

              <th>
                Review status
              </th>

              <th>
                Date
              </th>

            </tr>

          </thead>


          <tbody>

            ${newestFirst
              .map(
                historyRow
              )
              .join("")}

          </tbody>

        </table>

      </div>

    `;

  }

  catch (error) {

    renderEmpty(
      target,
      error.message ||
      "Unable to load prediction history."
    );

  }

}



function recommendationRisk(
  value
) {

  const risk =
    String(value || "")
      .trim()
      .toLowerCase();


  if (!risk) {
    return "";
  }


  if (
    risk === "low"
  ) {

    return "Low";

  }


  if (
    risk === "moderate" ||
    risk === "medium"
  ) {

    return "Moderate";

  }


  if (
    risk === "high"
  ) {

    return "High";

  }


  if (
    risk === "very high" ||
    risk === "very_high" ||
    risk === "veryhigh"
  ) {

    return "Very High";

  }


  return value;

}


function renderRecommendations(
  target,
  rows
) {

  if (!target) {
    return;
  }


  if (
    !Array.isArray(rows) ||
    rows.length === 0
  ) {

    renderEmpty(
      target,
      "No health recommendations were found for the selected condition and risk level."
    );

    return;

  }


  target.innerHTML =
    rows
      .map(item => {

        const disease =
          item?.Disease ??
          item?.disease ??
          "";


        const risk =
          item?.Risk_Level ??
          item?.RiskLevel ??
          item?.risk_level ??
          "";


        const ageGroup =
          item?.Age_Group ??
          item?.AgeGroup ??
          item?.age_group ??
          "";


        const diet =
          item?.Diet_Recommendation ??
          item?.DietRecommendation ??
          item?.diet_recommendation ??
          "";


        const foodsInclude =
          item?.Foods_To_Include ??
          item?.FoodsToInclude ??
          item?.foods_to_include ??
          "";


        const foodsLimit =
          item?.Foods_To_Limit ??
          item?.FoodsToLimit ??
          item?.foods_to_limit ??
          "";


        const exercise =
          item?.Exercise_Recommendation ??
          item?.ExerciseRecommendation ??
          item?.exercise_recommendation ??
          "";


        const water =
          item?.["Water_Recommendation (Liters)"] ??
          item?.Water_Recommendation ??
          item?.WaterRecommendation ??
          item?.water_recommendation ??
          "";


        const lifestyle =
          item?.Lifestyle_Recommendation ??
          item?.LifestyleRecommendation ??
          item?.lifestyle_recommendation ??
          "";


        const monitoring =
          item?.Monitoring ??
          item?.monitoring ??
          "";


        const recommendation =
          item?.Recommendation ??
          item?.recommendation ??
          "";


        return `

          <article
            class="info-card recommendation-card"
          >

            <h2>

              ${escapeHtml(
                disease ||
                "Health Recommendation"
              )}


              ${
                risk
                  ? `

                    <span
                      class="risk-badge ${riskClass(
                        risk
                      )}"
                    >

                      ${escapeHtml(
                        normaliseRisk(
                          risk
                        )
                      )}

                    </span>

                  `
                  : ""
              }

            </h2>


            ${
              ageGroup
                ? `

                  <p>

                    <strong>
                      Age group:
                    </strong>

                    ${escapeHtml(
                      ageGroup
                    )}

                  </p>

                `
                : ""
            }


            ${
              diet
                ? `

                  <p>

                    <strong>
                      Diet:
                    </strong>

                    ${escapeHtml(
                      diet
                    )}

                  </p>

                `
                : ""
            }


            ${
              foodsInclude
                ? `

                  <p>

                    <strong>
                      Foods to include:
                    </strong>

                    ${escapeHtml(
                      foodsInclude
                    )}

                  </p>

                `
                : ""
            }


            ${
              foodsLimit
                ? `

                  <p>

                    <strong>
                      Foods to limit:
                    </strong>

                    ${escapeHtml(
                      foodsLimit
                    )}

                  </p>

                `
                : ""
            }


            ${
              exercise
                ? `

                  <p>

                    <strong>
                      Exercise:
                    </strong>

                    ${escapeHtml(
                      exercise
                    )}

                  </p>

                `
                : ""
            }


            ${
              water
                ? `

                  <p>

                    <strong>
                      Water:
                    </strong>

                    ${escapeHtml(
                      water
                    )}

                  </p>

                `
                : ""
            }


            ${
              lifestyle
                ? `

                  <p>

                    <strong>
                      Lifestyle:
                    </strong>

                    ${escapeHtml(
                      lifestyle
                    )}

                  </p>

                `
                : ""
            }


            ${
              monitoring
                ? `

                  <p>

                    <strong>
                      Monitoring:
                    </strong>

                    ${escapeHtml(
                      monitoring
                    )}

                  </p>

                `
                : ""
            }


            ${
              recommendation
                ? `

                  <p>

                    <strong>
                      General recommendation:
                    </strong>

                    ${escapeHtml(
                      recommendation
                    )}

                  </p>

                `
                : ""
            }

          </article>

        `;

      })
      .join("");

}


async function loadRecommendations(
  disease,
  risk,
  target
) {

  if (!target) {
    return;
  }


  renderEmpty(
    target,
    "Loading health recommendations..."
  );


  try {

    const config =
      MODEL_CONFIGS[disease];


    if (!config) {

      throw new Error(
        "Please select a valid disease."
      );

    }


    const query =
      new URLSearchParams();


    query.set(
      "disease",
      config.supportDisease
    );


    const normalisedRisk =
      recommendationRisk(
        risk
      );


    if (normalisedRisk) {

      query.set(
        "risk_level",
        normalisedRisk
      );

    }


    const response =
      await apiFetch(
        `/api/recommendations?${query.toString()}`
      );


    let rows =
      response;


   

    if (
      response &&
      !Array.isArray(response)
    ) {

      rows =
        response.recommendations ??
        response.data ??
        response.results ??
        [];

    }


    renderRecommendations(
      target,
      rows
    );

  }

  catch (error) {

    console.error(
      "Recommendations API error:",
      error
    );


    renderEmpty(
      target,
      error.message ||
      "Unable to load health recommendations."
    );

  }

}


function setupRecommendations() {

  const disease =
    getElement(
      "#recommendation-disease"
    );


  const risk =
    getElement(
      "#recommendation-risk"
    );


  const button =
    getElement(
      "#load-recommendations"
    );


  const content =
    getElement(
      "#recommendation-content"
    );


  if (
    !disease ||
    !risk ||
    !button ||
    !content
  ) {

    console.error(
      "Recommendation page elements were not found."
    );

    return;

  }


  populateDiseaseSelect(
    disease
  );


  button.addEventListener(
    "click",
    event => {

      event.preventDefault();


      if (!disease.value) {

        renderEmpty(
          content,
          "Please select a disease."
        );

        return;

      }


      loadRecommendations(
        disease.value,
        risk.value,
        content
      );

    }
  );

}


function setSubmitBusy(
  form,
  busy,
  text = "Submit"
) {

  if (!form) {
    return;
  }


  const button =
    form.querySelector(
      '[type="submit"]'
    );


  if (!button) {
    return;
  }


  if (busy) {

    if (
      !button.dataset.originalText
    ) {

      button.dataset.originalText =
        button.textContent.trim();

    }


    button.disabled =
      true;


    button.textContent =
      text;

  }

  else {

    button.disabled =
      false;


    button.textContent =
      button.dataset.originalText ||
      "Submit";

  }

}



function setupLogin() {

  const form =
    getElement(
      "#login-form"
    );


  if (!form) {
    return;
  }


  form.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      const message =
        getElement(
          "#login-message"
        );


      if (message) {

        message.textContent =
          "";

        message.classList.remove(
          "success-message",
          "error-message"
        );

      }


      if (
        !form.reportValidity()
      ) {

        return;

      }


      setSubmitBusy(
        form,
        true,
        "Signing in..."
      );


      try {

        const formData =
          new FormData(
            form
          );


        const body =
          Object.fromEntries(
            formData.entries()
          );


        const response =
          await apiFetch(
            "/api/auth/login",
            {
              method: "POST",

              body:
                JSON.stringify(
                  body
                )
            }
          );


        if (
          !response ||
          !response.access_token
        ) {

          throw new Error(
            "Login succeeded but no access token was returned by the API."
          );

        }


        localStorage.setItem(
          "medicalToken",
          response.access_token
        );


        window.location.href =
          "dashboard.html";

      }

      catch (error) {

        console.error(
          "Login error:",
          error
        );


        if (message) {

          message.textContent =
            error.message ||
            "Unable to login.";


          message.classList.add(
            "error-message"
          );

        }

      }

      finally {

        setSubmitBusy(
          form,
          false
        );

      }

    }
  );

}


function setupRegistration() {

  const form =
    getElement(
      "#register-form"
    );


  if (!form) {
    return;
  }


  form.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      const message =
        getElement(
          "#register-message"
        );


      if (message) {

        message.textContent =
          "";


        message.classList.remove(
          "success-message",
          "error-message"
        );

      }


      if (
        !form.reportValidity()
      ) {

        return;

      }


      setSubmitBusy(
        form,
        true,
        "Creating account..."
      );


      try {

        const formData =
          new FormData(
            form
          );


        const body =
          Object.fromEntries(
            formData.entries()
          );


        const response =
          await apiFetch(
            "/api/auth/register",
            {
              method: "POST",

              body:
                JSON.stringify(
                  body
                )
            }
          );


        if (
          !response ||
          !response.access_token
        ) {

          throw new Error(
            "Registration succeeded but no access token was returned by the API."
          );

        }


        localStorage.setItem(
          "medicalToken",
          response.access_token
        );


        window.location.href =
          "dashboard.html";

      }

      catch (error) {

        console.error(
          "Registration error:",
          error
        );


        if (message) {

          message.textContent =
            error.message ||
            "Unable to create account.";


          message.classList.add(
            "error-message"
          );

        }

      }

      finally {

        setSubmitBusy(
          form,
          false
        );

      }

    }
  );

}


function initializePage() {

  const page =
    document.body?.dataset?.page ||
    "";


  console.log(
    `MedAssist AI frontend initialized: ${
      page || "unknown page"
    }`
  );


  if (
    page !== "login" &&
    page !== "register"
  ) {

    if (
      !requireAuth()
    ) {

      return;

    }


    navigation();

  }

  if (
    page === "login"
  ) {

    setupLogin();

  }


  if (
    page === "register"
  ) {

    setupRegistration();

  }


  if (
    page === "dashboard"
  ) {

    loadDashboard();

  }



  if (
    page === "history"
  ) {

    loadHistory(
      getElement(
        "#history-content"
      )
    );

  }



  if (
    page === "doctors"
  ) {

    setupDoctors();

  }



  if (
    page === "recommendations"
  ) {

    setupRecommendations();

  }



  if (
    page === "prediction"
  ) {

    setupPrediction();

  }

}




if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initializePage,
    {
      once: true
    }
  );

}

else {

  initializePage();

}