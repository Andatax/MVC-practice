const showNewPostModal = async event => {
	event.preventDefault();
	document.querySelector("#newPostModal").classList.toggle("hidden");
};

document.querySelector("#btn-new-post").addEventListener("click", showNewPostModal);
