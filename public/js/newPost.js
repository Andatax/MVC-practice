const newPostHandler = async event => {
	event.preventDefault();
	const title = document.querySelector("#newPostTitle").value.trim();
	const body = document.querySelector("#newPostBody").value.trim();

	if (title && body) {
		const response = await fetch("/api/posts/", {
			method: "POST",
			body: JSON.stringify({
				title,
				body,
			}),
			headers: { "Content-Type": "application/json" },
		});
		if (response.ok) {
			document.querySelector("#newPostModal").classList.toggle("hidden");
			document.location.replace("/");
		} else {
			document.querySelector("#newPostModal").classList.toggle("hidden");
			alert("Post was not able to be created");
		}
	}
};
document.querySelector(".newPostForm").addEventListener("submit", newPostHandler);
