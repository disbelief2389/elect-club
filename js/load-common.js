function loadHTML(elementId, filePath) {
	const element = document.getElementById(elementId);
	if (!element) {
		console.error(`Element with id ${elementId} not found`);
		return;
	}

	fetch(filePath)
		.then((response) => {
			if (!response.ok)
				throw new Error("Network error: " + response.statusText);
			return response.text();
		})
		.then((data) => (element.innerHTML = data))
		.catch((error) => console.error("Error loading HTML:", error));
}

document.addEventListener("DOMContentLoaded", () => {
	loadHTML("navbar", "navbar.html");
	loadHTML("footer", "footer.html");
});
