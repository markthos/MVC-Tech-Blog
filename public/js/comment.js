// Add an event listener for each toggle button
document.querySelectorAll('[id^="toggle-comments-"]').forEach((button) => {
    button.addEventListener("click", () => {
      const postId = button.id.split("-")[2];
      const commentsContainer = document.getElementById(`comments-${postId}`);
      
      // Toggle the visibility of comments container
      if (commentsContainer.style.display === "none") {
        commentsContainer.style.display = "block";
      } else {
        commentsContainer.style.display = "none";
      }
    });
  });
  
// add event listener to comment form to submit the form

document.querySelector(`[id^=comment-form-]`).addEventListener("submit", async (event) => {
    event.preventDefault();

    const blogPost_id = event.target.id.split("-")[2];
    const comment_text = document.querySelector(`#comment-content-${blogPost_id}`).value.trim();
    console.log(blogPost_id, comment_text);

    if (comment_text && blogPost_id) {
        const response = await fetch(`/api/comment`, {
            method: "POST",
            body: JSON.stringify({ comment_text, blogPost_id }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            // redirect to login page if the user is not logged in
            // else reload the page
            if (response.redirected) {
                window.location.replace(response.url);
            } else {
                localStorage.setItem('toastMessage', 'comment created');
                document.location.reload();
            }
        }
    }
});