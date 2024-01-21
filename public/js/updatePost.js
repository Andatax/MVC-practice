const updatePostHandler = async event => {
	event.preventDefault();

	// Assuming you set the post_id attribute on the form
	// const id = document.querySelector(".updatePostForm button").getAttribute("post_id");
	const title = document.querySelector("#updatePostTitle").value.trim();
	const body = document.querySelector("#updatePostBody").value.trim();

	console.log("updatePost function executing");
	console.log("Before fetch");
	const button = document.querySelector(".updatePostForm button");
	console.log("Selected button:", button);
	const id = button.getAttribute("post_id");
	console.log("Retrieved id:", id);
	console.log("title:", title);
	console.log("body:", body);
	if (id && (title || body)) {
		console.log("Before fetch");
		const response = await fetch("/api/posts/update", {
			method: "POST",
			body: JSON.stringify({
				id,
				title,
				body,
			}),
			headers: { "Content-Type": "application/json" },
		});
		console.log("After fetch");

		if (response.ok) {
			document.querySelector("#updatePostModal").classList.toggle("hidden");
			document.location.replace("/");
		} else {
			document.querySelector("#updatePostModal").classList.toggle("hidden");
			alert("Post was not able to be updated");
		}
	}
};

document.querySelector(".updatePostForm").addEventListener("submit", updatePostHandler);
