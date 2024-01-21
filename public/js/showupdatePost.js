const showUpdatePostModal = async event => {
	event.preventDefault();
	document.querySelector("#updatePostModal").classList.toggle("hidden");
};
document.querySelector("#btn-edit-post").addEventListener("click", showUpdatePostModal);
