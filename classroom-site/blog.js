// Simple class code (you can change this)
const CLASS_CODE = "science2026";

const codeInput = document.getElementById("classCode");
const codeSubmit = document.getElementById("codeSubmit");
const codeMessage = document.getElementById("codeMessage");
const postSubmit = document.getElementById("postSubmit");

const starRating = document.getElementById("starRating");
const ratingValue = document.getElementById("ratingValue");
const postForm = document.getElementById("postForm");
const postsContainer = document.getElementById("postsContainer");

// Handle class code
codeSubmit.addEventListener("click", () => {
  const value = codeInput.value.trim();
  if (value === CLASS_CODE) {
    postSubmit.disabled = false;
    codeMessage.textContent = "Posting unlocked. You may create a post.";
    codeMessage.style.color = "#3b7a57";
  } else {
    postSubmit.disabled = true;
    codeMessage.textContent = "Incorrect code. Please try again.";
    codeMessage.style.color = "#b76e79";
  }
});

// Handle star rating click
starRating.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "span") {
    const selected = parseInt(e.target.dataset.value, 10);
    ratingValue.value = selected;

    // Update visual stars
    Array.from(starRating.children).forEach((star) => {
      const starValue = parseInt(star.dataset.value, 10);
      if (starValue <= selected) {
        star.classList.add("active");
      } else {
        star.classList.remove("active");
      }
    });
  }
});

// Handle post submission (front-end only)
postForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (postSubmit.disabled) return;

  const title = document.getElementById("postTitle").value.trim();
  const reply = document.getElementById("postReply").value.trim();
  const rating = parseInt(ratingValue.value, 10) || 0;

  if (!title || !reply) return;

  const card = document.createElement("div");
  card.className = "post-card";

  const header = document.createElement("div");
  header.className = "post-header";

  const titleEl = document.createElement("div");
  titleEl.className = "post-title";
  titleEl.textContent = title;

  const ratingEl = document.createElement("div");
  ratingEl.className = "post-rating";
  ratingEl.textContent = rating ? "★".repeat(rating) : "No rating";

  header.appendChild(titleEl);
  header.appendChild(ratingEl);

  const body = document.createElement("p");
  body.textContent = reply;

  card.appendChild(header);
  card.appendChild(body);

  postsContainer.prepend(card);

  // Reset form
  postForm.reset();
  ratingValue.value = 0;
  Array.from(starRating.children).forEach((star) => star.classList.remove("active"));
});
