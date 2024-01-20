const showNewCommentModal = async event => {
	event.preventDefault();
	document.querySelector("#newCommentModal").classList.toggle("hidden");
};

document.querySelector("#btn-new-comment").addEventListener("click", showNewCommentModal);
