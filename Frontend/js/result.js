document.addEventListener("DOMContentLoaded", () => {
  const output = document.querySelector("#result"); const result = JSON.parse(localStorage.getItem("lastResult") || "null");
  if (!result) { output.textContent="No saved assessment. Submit a prediction form first."; return; }
  output.innerHTML = `<h2>${result.disease}: ${result.prediction}</h2><p><strong>Academic risk band:</strong> ${result.risk_level}</p><p><strong>Model confidence:</strong> ${result.probability ?? "not available"}</p><h3>SHAP feature contributions</h3><ul>${result.explanation.map(x => `<li>${x.feature}: ${x.direction} (${x.contribution})</li>`).join("")}</ul><p class="notice">${result.disclaimer}</p><p>Doctor review status: <strong>${result.review_status}</strong></p>`;
});
