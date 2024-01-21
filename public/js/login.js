const loginPost = async event => {
	event.preventDefault();
	const email = document.querySelector("#email").value.trim();
	const password = document.querySelector("#password").value.trim();
	if (email && password) {
		const response = await fetch("/api/sessionsUser/login", {
			method: "POST",
			body: JSON.stringify({ email, password }),
			headers: { "Content-Type": "application/json" },
		});
		if (response.ok) {
			document.location.replace("/");
		} else {
			alert("Failed to log in, Please try again");
		}
	}
};

const signUpView = async event => {
	event.preventDefault();
	const response = await fetch("/signup", {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});
	if (response.ok) {
		document.location.replace("/signup");
	} else {
		response.status(500).json(err);
	}
};

document.querySelector(".loginForm").addEventListener("submit", loginPost);
document.querySelector("#signUpBtn").addEventListener("click", signUpView);
