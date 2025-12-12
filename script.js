document.addEventListener("DOMContentLoaded", () => {
	const toggle = document.querySelector(".theme-toggle");
	if (!toggle) return;

	const icon = toggle.querySelector(".theme-toggle__icon");
	const body = document.body;

	function applyTheme(theme) {
		const isDark = theme === "dark";

		body.dataset.theme = isDark ? "dark" : "light";
		toggle.setAttribute("aria-pressed", String(isDark));
		icon.textContent = isDark ? "○" : "●"; // dark = hollow, light = filled
		window.localStorage.setItem("theme", theme);
	}

	// Initial state: saved theme or default to light
	const saved = window.localStorage.getItem("theme") || "light";
	applyTheme(saved);

	toggle.addEventListener("click", () => {
		const next = body.dataset.theme === "dark" ? "light" : "dark";
		applyTheme(next);
	});
});

document.addEventListener("DOMContentLoaded", () => {
	const ctl = document.querySelector(".listen-control");
	if (!ctl) return;

	const playBtn = ctl.querySelector(".listen-play");
	const stopBtn = ctl.querySelector(".listen-stop");
	let utterance = null;

	function resetUI() {
		ctl.dataset.state = "idle";
		playBtn.setAttribute("aria-pressed", "false");
		playBtn.querySelector(".icon").textContent = "▷";
		stopBtn.hidden = true;
	}

	playBtn.addEventListener("click", () => {
		const state = ctl.dataset.state;

		// If idle → start reading
		if (state === "idle") {
			ctl.dataset.state = "playing";
			playBtn.setAttribute("aria-pressed", "true");
			playBtn.querySelector(".icon").textContent = "►";
			stopBtn.hidden = false;

			// Grab the text from the nearest section
			const section = ctl.closest("section");
			const text = section ? section.innerText : "Reading.";

			utterance = new SpeechSynthesisUtterance(text);
			utterance.onend = resetUI;

			speechSynthesis.cancel(); // safety
			speechSynthesis.speak(utterance);
			return;
		}

		// If playing and “play” clicked again: do nothing.
	});

	stopBtn.addEventListener("click", () => {
		speechSynthesis.cancel();
		resetUI();
	});
});

document.addEventListener("DOMContentLoaded", () => {
	const summaryControls = document.querySelectorAll(".summarise-control");
	if (!summaryControls.length) return;

	summaryControls.forEach((summaryCtl) => {
		const btn = summaryCtl.querySelector(".summarise-btn");
		if (!btn) return;

		const icon = btn.querySelector(".icon");
		const section = summaryCtl.closest("section");
		if (!section) return;

		const fullContent = section.querySelector(".full-content");
		const summaryPanel = section.querySelector(".summary-panel");
		if (!fullContent || !summaryPanel) return;

		// Initial state: full content shown, summary hidden
		btn.setAttribute("aria-expanded", "false");
		btn.setAttribute("aria-pressed", "false");
		fullContent.hidden = false;
		summaryPanel.hidden = true;

		btn.addEventListener("click", () => {
			const expanded = btn.getAttribute("aria-expanded") === "true";
			const isNowExpanded = !expanded;

			btn.setAttribute("aria-expanded", String(isNowExpanded));
			btn.setAttribute("aria-pressed", String(isNowExpanded));
			icon.textContent = isNowExpanded ? "⊚" : "⊙";

			if (isNowExpanded) {
				fullContent.hidden = true;
				summaryPanel.hidden = false;
			} else {
				fullContent.hidden = false;
				summaryPanel.hidden = true;
			}
		});
	});
});