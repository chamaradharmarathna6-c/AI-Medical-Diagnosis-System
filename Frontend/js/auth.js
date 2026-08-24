document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-auth]");
  if (!form) return;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const output = document.querySelector("#message");
    try {
      const data = Object.fromEntries(new FormData(form));
      const path = form.dataset.auth === "register" ? "/api/auth/register" : "/api/auth/login";
      const result = await api(path, { method:"POST", body:JSON.stringify(data) });
      localStorage.setItem("medicalToken", result.access_token);
      location.href = "dashboard.html";
    } catch (error) { output.textContent = error.message; output.className = "error"; }
  });
});
