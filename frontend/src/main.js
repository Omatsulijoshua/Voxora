const button = document.querySelector("#callButton");
const message = document.querySelector("#message");
const apiUrl = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");
const configDialog = document.querySelector("#configDialog");
const renderLink = document.querySelector("#renderLink");

renderLink.href = import.meta.env.VITE_RENDER_ENVIRONMENT_URL || "https://dashboard.render.com/";

document.querySelector("#configButton").addEventListener("click", () => configDialog.showModal());
document.querySelector("#closeConfig").addEventListener("click", () => configDialog.close());
configDialog.addEventListener("click", (event) => {
  if (event.target === configDialog) configDialog.close();
});

button.addEventListener("click", async () => {
  button.disabled = true;
  button.classList.add("loading");
  message.className = "message visible";
  message.textContent = "Connecting your voice agent…";

  try {
    const response = await fetch(`${apiUrl}/api/make-call`, { method: "POST" });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "The call could not be started.");
    message.className = "message visible success";
    message.textContent = "Your call is on the way—keep your phone nearby.";
  } catch (error) {
    message.className = "message visible error";
    message.textContent = error.message || "Unable to reach the voice agent. Please try again.";
  } finally {
    button.disabled = false;
    button.classList.remove("loading");
  }
});
