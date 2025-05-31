// MAIN SCRIPT (in your main JavaScript file)
function loadHTML(elementId, filePath) {
	return new Promise((resolve, reject) => {
		const element = document.getElementById(elementId);
		if (!element) return reject(`Element ${elementId} not found`);

		fetch(filePath)
			.then((response) => response.text())
			.then((html) => {
				element.innerHTML = html;

				// Execute any scripts in the loaded HTML
				const scripts = element.querySelectorAll("script");
				scripts.forEach((script) => {
					const newScript = document.createElement("script");
					newScript.textContent = script.textContent;
					document.body.appendChild(newScript).remove();
				});

				resolve(element);
			})
			.catch(reject);
	});
}

document.addEventListener("DOMContentLoaded", () => {
	// First set the base URL
	const isLocal =
		window.location.hostname === "localhost" ||
		window.location.hostname === "127.0.0.1";
	const base = document.createElement("base");
	base.href = isLocal ? "/" : "/elect-club/";
	document.head.appendChild(base);

	// Then load navbar and set active class
	loadHTML("navbar", "navbar.html")
		.then(() => setActiveNavItem())
		.catch(console.error);

	loadHTML("footer", "footer.html");
});

function setActiveNavItem() {
	const pathName = window.location.pathname;
	const navItems = [
		{ id: "index", paths: ["/", "/index.html"] },
		{ id: "about", paths: ["/about.html", "/pages/about.html"] },
		{ id: "projects", paths: ["/projects.html", "/pages/projects.html"] },
		{ id: "join", paths: ["/join.html", "/pages/join.html"] },
	];

	// Remove any existing active classes
	navItems.forEach((item) => {
		const element = document.getElementById(item.id);
		if (element) element.classList.remove("active");
	});

	// Find matching item and add active class
	const activeItem = navItems.find((item) =>
		item.paths.some((path) => pathName.endsWith(path))
	);

	if (activeItem) {
		const element = document.getElementById(activeItem.id);
		if (element) {
			element.classList.add("active");
		} else {
			console.warn(`Nav element ${activeItem.id} not found`);
		}
	} else {
		console.warn(`No nav item found for ${pathName}`);
	}
}
