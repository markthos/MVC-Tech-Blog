document.addEventListener("DOMContentLoaded", () => {
    const logoutLink = document.getElementById("logout-link");

    if (logoutLink) {
        logoutLink.addEventListener("click", async (event) => {
            event.preventDefault();
            console.log("logout clicked");

            try {
                const response = await fetch("/logout", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                });
                console.log("logout response", response);

                if (response.ok) {
                    // Redirect to the Landing page
                    localStorage.setItem('toastMessage', 'logged out');
                    window.location.replace("/homepage");
                } else {
                    alert(response.statusText);
                }
            } catch (err) {
                console.error("logout error", err);
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const mobilelogoutLink = document.getElementById("mobile-logout-link");

    if (mobilelogoutLink) {
        mobilelogoutLink.addEventListener("click", async (event) => {
            event.preventDefault();
            console.log("logout clicked");

            try {
                const response = await fetch("/logout", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                });
                console.log("logout response", response);

                if (response.ok) {
                    // Redirect to the login page
                    localStorage.setItem('toastMessage', 'logged out');
                    window.location.replace("/homepage");
                } else {
                    alert(response.statusText);
                }
            } catch (err) {
                console.error("logout error", err);
            }
        });
    }
});

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
  
// Add an event listener for form submission
document.querySelectorAll('[id^="add-comment-form-"]').forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      // Get the comment content from the form and the blogpost id the comment is for
      const postId = form.id.split("-")[3]; // Extract the id from the blog post id
      const commentContent = document.getElementById(`comment-content-${postId}`).value;
  
      // Send the comment data to the server
      const response = await fetch("/api/comment/:id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment_text: commentContent,
        }),
      });
  
      if (response.ok) {
        // Handle successful comment submission (e.g., refresh the comments section)
        // You can also provide user feedback here (e.g., showing a success message)
      } else {
        // Handle error response from the server (e.g., display an error message)
      }
    });
  });
  