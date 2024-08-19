

// Put tags in
function populateTags() {
  const sections = document.querySelectorAll('.j_flex-container');

  sections.forEach(section => {
      const categories = section.getAttribute('data-category').split(',').map(cat => cat.trim());
      const tagsContainer = section.querySelector('.j_tags');

      tagsContainer.innerHTML = '';

      categories.forEach(category => {
          const tag = document.createElement('span');
          tag.className = 'j_tag';
          tag.textContent = category;
          tagsContainer.appendChild(tag);
      });
  });
}

populateTags();

// Get the top button
let mybutton = document.getElementById("Gotop");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


///subpage///
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('comment-form');
  const commentText = document.getElementById('comment-text');
  const rating = document.getElementById('rating');
  const commentsDisplay = document.getElementById('comments-display');

  // Load comments and ratings from local storage
  function loadComments() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.forEach(comment => {
      displayComment(comment.text, comment.rating);
    });
  }

  // Save comment and rating to local storage
  function saveComment(comment, rating) {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push({ text: comment, rating: rating });
    localStorage.setItem('comments', JSON.stringify(comments));
  }

  // Display a single comment
  function displayComment(comment, rating) {
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.innerHTML = `
        <p>${comment}</p>
        <p>Rating: ${'★'.repeat(rating)}</p>
    `;
    commentsDisplay.appendChild(commentDiv);
}

  // Handle form submission
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const comment = commentText.value.trim();
    const ratingValue = rating.value;

    if (comment) {
      displayComment(comment, ratingValue);
      saveComment(comment, ratingValue);
      commentText.value = '';
      rating.value = '5'; // Reset rating to default value
    }
  });

  // Load comments when the page loads
  loadComments();
});





