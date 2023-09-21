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
            // Redirect to the homepage
            localStorage.setItem('toastMessage', 'comment created');
            document.location.replace("/homepage");
        }
    }
});

// add event listener to create blog post button to open the form
document.querySelector("#create-blogpost").addEventListener("click", () => {
    document.querySelector("#create-blogpost-form").style.display = "block";
});

// add event listener to create blog post form to submit the form
document.querySelector("#create-blogpost-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.querySelector("#blogpost-title").value.trim();
    const content = document.querySelector("#blogpost-content").value.trim();

    if (title && content) {
        const response = await fetch("/api/blogPost", {
            method: "POST",
            body: JSON.stringify({ title, content }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            // Redirect to the dashboard
            localStorage.setItem('toastMessage', 'blog post created');
            document.location.replace("/dashboard");
        } else {
            alert(response.statusText);
        }
    }
});

// add event listener to cancel button to close the form
document.querySelector("#cancel-blogpost").addEventListener("click", () => {
    document.querySelector("#create-blogpost-form").style.display = "none";
});


// add event listener to delete blog post button
document.querySelectorAll('[id^="delete-blogpost-"]').forEach((button) => {
    button.addEventListener("click", async (event) => {
        event.preventDefault();

        const blogPost_id = button.id.split("-")[2];

        if (blogPost_id) {
            const response = await fetch(`/api/blogPost/${blogPost_id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                // Redirect to the dashboard
                localStorage.setItem('toastMessage', 'blog post deleted');
                document.location.replace("/dashboard");
            } else {
                alert(response.statusText);
            }
        }
    });
});


