const schemas = {
  diabetes:["Pregnancies","Glucose","BloodPressure","SkinThickness","Insulin","BMI","DiabetesPedigreeFunction","Age"],
  heart:["Age","Sex","Chest pain type","BP","Cholesterol","FBS over 120","EKG results","Max HR","Exercise angina","ST depression","Slope of ST","Number of vessels fluro","Thallium"],
  kidney:["Age of the patient","Blood pressure (mm/Hg)","Specific gravity of urine","Albumin in urine","Sugar in urine","Red blood cells in urine","Pus cells in urine","Pus cell clumps in urine","Bacteria in urine","Random blood glucose level (mg/dl)","Blood urea (mg/dl)","Serum creatinine (mg/dl)","Sodium level (mEq/L)","Potassium level (mEq/L)","Hemoglobin level (gms)","Packed cell volume (%)","White blood cell count (cells/cumm)","Red blood cell count (millions/cumm)","Hypertension (yes/no)","Diabetes mellitus (yes/no)","Coronary artery disease (yes/no)","Appetite (good/poor)","Pedal edema (yes/no)","Anemia (yes/no)","Estimated Glomerular Filtration Rate (eGFR)","Urine protein-to-creatinine ratio","Urine output (ml/day)","Serum albumin level","Cholesterol level","Parathyroid hormone (PTH) level","Serum calcium level","Serum phosphate level","Family history of chronic kidney disease","Smoking status","Body Mass Index (BMI)","Physical activity level","Duration of diabetes mellitus (years)","Duration of hypertension (years)","Cystatin C level","Urinary sediment microscopy results","C-reactive protein (CRP) level","Interleukin-6 (IL-6) level"],
  liver:["age","gender","tot_bilirubin","direct_bilirubin","tot_proteins","albumin","ag_ratio","sgpt","sgot","alkphos"]
};
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-disease]"); if (!form) return;
  const disease = form.dataset.disease, fields = schemas[disease], holder = form.querySelector(".fields");
  fields.forEach((field) => holder.insertAdjacentHTML("beforeend", `<label>${field}<input name="${field}" required></label>`));
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); const message = document.querySelector("#message"); message.textContent="Generating local model assessment...";
    const values = Object.fromEntries(new FormData(form)); Object.keys(values).forEach(k => { if (!isNaN(values[k]) && values[k].trim() !== "") values[k] = Number(values[k]); });
    try { const result = await api(`/api/predict/${disease}`, {method:"POST",body:JSON.stringify({values})}); localStorage.setItem("lastResult", JSON.stringify(result)); location.href="result.html"; }
    catch (error) { message.textContent=error.message; message.className="error"; }
  });
});
