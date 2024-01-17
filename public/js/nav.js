const logout = async () => {
	const response = await fetch("/api/sessionsUser/logout", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
	});

	if (response.ok) {
		document.location.replace("/login");
	} else {
		alert(response.statusText);
	}
};
const dashboardView = async event => {
	event.preventDefault();
	console.log("clicked");
	const response = await fetch("/dashboard", {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});
	console.log(response);
	if (response.ok) {
		document.location.replace("/dashboard");
	} else {
		response.status(500).json(err);
	}
};
const homeView = async event => {
	event.preventDefault();
	const response = await fetch("/", {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});
	if (response.ok) {
		document.location.replace("/");
	} else {
		response.status(500).json(err);
	}
};
document.querySelector("#home").addEventListener("click", homeView);
document.querySelector("#dashboard").addEventListener("click", dashboardView);
document.querySelector("#logoutBtn").addEventListener("click", logout);
