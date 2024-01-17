// const commentsView = async event => {
// 	if (event.target.hasAttribute("post_id")) {
// 		const id = event.target.getAttribute("post_id");
// 		console.log(id);

// 		const response = await fetch(`/post/${id}`, {
// 			method: "GET",
// 			headers: { "Content-Type": "application/json" },
// 		});

// 		if (response.ok) {
// 			document.location.replace(`/post/${id}`);
// 		} else {
// 			return alert("Cannot get post");
// 		}
// 	}
// };

// document.querySelector(".postBtn").addEventListener("click", commentsView);
const commentsView = async event => {
	const buttonElement = event.target.closest(".postBtn");

	if (buttonElement && buttonElement.hasAttribute("post_id")) {
		const id = buttonElement.getAttribute("post_id");
		console.log("Post ID:", id);

		try {
			const response = await fetch(`/post/${id}`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});

			if (response.ok) {
				console.log("Successfully fetched post details:", response);
				document.location.replace(`/post/${id}`);
			} else {
				console.error("Failed to fetch post details:", response);
				alert("Cannot get post");
			}
		} catch (error) {
			console.error("Error during fetch:", error);
			alert("Error fetching post");
		}
	} else {
		console.error("No post_id attribute found on clicked element");
	}
};

document.addEventListener("click", commentsView); // Use event delegation
