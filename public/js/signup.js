const signUpFormHandler = async event => {
	event.preventDefault();
	const email = document.querySelector("#email").value.trim();
	const name = document.querySelector("#name").value.trim();
	const password = document.querySelector("#password").value.trim();

	if (email && password && name) {
		const response = await fetch("/api/sessionsUser/signup", {
			method: "POST",
			body: JSON.stringify({
				email,
				password,
				name,
			}),
			headers: { "Content-Type": "application/json" },
		});
		if (response.ok) {
			document.location.replace("/");
		} else {
			alert("Sing up failed, Please try again");
		}
	}
};

const signInView = async event => {
	event.preventDefault();
	const response = await fetch("/api/sessionsUser/login", {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});
	if (response.ok) {
		document.location.replace("/login");
	} else {
		response.status(500).json(err);
	}
};
document.querySelector("#signInBtn").addEventListener("click", signInView);
document.querySelector(".signUpForm").addEventListener("submit", signUpFormHandler);
