 // Get the modal and close button
const modal = document.getElementById("movie-info-modal");
const closeBtn = document.getElementsByClassName("close")[0];

// Get the modal content elements
const modalTitle = document.getElementById("modal-movie-title");
const modalDescription = document.getElementById("modal-movie-description");

// Show the modal with movie information
function showMovieInfo(title, description) {
  modalTitle.textContent = title;
  modalDescription.textContent = description;
  modal.style.display = "block";
}

// Close the modal when the close button is clicked
closeBtn.addEventListener("click", function() {
  modal.style.display = "none";
});

// Close the modal when the user clicks outside of it
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
