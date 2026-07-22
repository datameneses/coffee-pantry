// Marks the nav link matching the current page as active.
document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav.site-nav a").forEach((link) => {
    if (link.getAttribute("href") === path) {
      link.classList.add("active");
    }
  });
});

// Fetches a JSON data file and renders each item into a container using templateFn.
// Shows a friendly empty state if there's no data yet, or an error hint if the
// fetch fails (common when opening the site directly via file:// instead of a local server).
function loadAndRender(jsonPath, containerId, templateFn) {
  const container = document.getElementById(containerId);
  fetch(jsonPath)
    .then((res) => res.json())
    .then((items) => {
      if (!items.length) {
        container.innerHTML = '<p class="empty-state">Nothing here yet.</p>';
        return;
      }
      container.innerHTML = items.map(templateFn).join("");
    })
    .catch((err) => {
      console.error("Failed to load", jsonPath, err);
      container.innerHTML =
        '<p class="empty-state">Could not load data. If you\'re viewing this via file://, try running a local server (e.g. <code>python3 -m http.server</code>) instead.</p>';
    });
}
