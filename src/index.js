// write your code here 
const API_URL = "https://dynasty-29.github.io/phase-1-mock-cc-ramen-rater/db.json";
document.addEventListener("DOMContentLoaded", () => {
    const ramenMenu = document.querySelector("#ramen-menu");
    const ramenDetail = document.querySelector("#ramen-detail");
    const ratingDisplay = document.querySelector("#rating-display");
    const commentDisplay = document.querySelector("#comment-display");
    const editForm = document.querySelector("#edit-ramen");
    const newRamenForm = document.querySelector("#new-ramen");
    let currentRamenId = null;
  
    // Fetch and display all ramen images
    fetch(API_URL)
      .then(response => response.json())
      .then(ramens => {
        if (ramens.length > 0) {
          displayRamenDetails(ramens[0]);
        }
        ramens.forEach(ramen => addRamenToMenu(ramen));
      });
  
    // Add a ramen image to the menu
    function addRamenToMenu(ramen) {
      const img = document.createElement("img");
      img.src = ramen.image;
      img.alt = ramen.name;
      img.addEventListener("click", () => displayRamenDetails(ramen));
      ramenMenu.appendChild(img);
    }
  
    // Display ramen details
    function displayRamenDetails(ramen) {
      document.querySelector(".detail-image").src = ramen.image;
      document.querySelector(".name").textContent = ramen.name;
      document.querySelector(".restaurant").textContent = ramen.restaurant;
      ratingDisplay.textContent = ramen.rating;
      commentDisplay.textContent = ramen.comment;
      currentRamenId = ramen.id;
    }
  
    // Handle new ramen form submission
    newRamenForm.addEventListener("submit", event => {
      event.preventDefault();
  
      const newRamen = {
        name: event.target["new-name"].value,
        restaurant: event.target["new-restaurant"].value,
        image: event.target["new-image"].value,
        rating: event.target["new-rating"].value,
        comment: event.target["new-comment"].value,
      };
  
      addRamenToMenu(newRamen);
  
      // Optional: Persist new ramen to server
      fetch(${API_URL}, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRamen),
      });
  
      event.target.reset();
    });
  
    // Handle edit ramen form submission
    editForm.addEventListener("submit", event => {
      event.preventDefault();
  
      const updatedRating = event.target["edit-rating"].value;
      const updatedComment = event.target["edit-comment"].value;
  
      ratingDisplay.textContent = updatedRating;
      commentDisplay.textContent = updatedComment;
  
      // Optional: Persist changes to server
      if (currentRamenId) {
        fetch(`${API_URL}${currentRamenId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rating: updatedRating, comment: updatedComment }),
        });
      }
  
      event.target.reset();
    });
  
    // Optional: Add delete functionality
    ramenDetail.addEventListener("dblclick", () => {
      if (currentRamenId) {
        fetch(`${API_URL}{currentRamenId}`, { method: "DELETE" })
          .then(() => {
            document.querySelector(`img[alt='${document.querySelector(".name").textContent}']`).remove();
            clearRamenDetails();
          });
      }
    });
  
    // Clear ramen details
    function clearRamenDetails() {
      document.querySelector(".detail-image").src = "./assets/image-placeholder.jpg";
      document.querySelector(".name").textContent = "Insert Name Here";
      document.querySelector(".restaurant").textContent = "Insert Restaurant Here";
      ratingDisplay.textContent = "Insert rating here";
      commentDisplay.textContent = "Insert comment here";
    }
  });
  
