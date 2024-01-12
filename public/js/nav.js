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
	const response = await fetch("/api/dashboard", {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});
	if (response.ok) {
		document.location.replace("/dashboard");
	} else {
		response.status(500).json(err);
	}
};

document.querySelector("#logoutBtn").addEventListener("click", logout);
