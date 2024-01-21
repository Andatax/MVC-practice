const newCommentHandler = async event => {
	event.preventDefault();
	const body = document.querySelector("#newCommentBody").value.trim();
	const post_id = event.target.getAttribute("post_id");
	if (body && post_id) {
		const response = await fetch("/api/posts/comment", {
			method: "POST",
			body: JSON.stringify({ body, post_id }),
			headers: { "Content-Type": "application/json" },
		});

		if (response.ok) {
			document.querySelector("#newCommentModal").classList.toggle("hidden");
			document.location.replace("/");
		} else {
			document.querySelector("#newCommentModal").classList.toggle("hidden");
			alert("Comment was not added");
		}
	}
};
document.querySelector(".newCommentForm").addEventListener("submit", newCommentHandler);
