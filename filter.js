
function populateTags() {
  const sections = document.querySelectorAll('.flex-container');

  sections.forEach(section => {
      const categories = section.getAttribute('data-category').split(',').map(cat => cat.trim());
      const tagsContainer = section.querySelector('.tags');

      tagsContainer.innerHTML = '';

      categories.forEach(category => {
          const tag = document.createElement('span');
          tag.className = 'tag';
          tag.textContent = category;
          tagsContainer.appendChild(tag);
      });
  });
}
document.querySelectorAll('.activity').forEach(activity => {
  activity.addEventListener('click', function() {
    // Logic to handle click event, e.g., displaying a larger version of the image
    const imgSrc = this.querySelector('.content-image img').src;
    window.open(imgSrc, '_blank'); // Opens the image in a new tab
  });
});

populateTags();

///subpage///
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('comment-form');
  const commentText = document.getElementById('comment-text');
  const rating = document.getElementById('rating');
  const commentsDisplay = document.getElementById('comments-display');

  form.addEventListener('submit', function(event) {
      event.preventDefault();

      const comment = commentText.value.trim();
      const ratingValue = rating.value;

      if (comment) {
          const commentDiv = document.createElement('div');
          commentDiv.className = 'comment';
          commentDiv.innerHTML = `<p>${comment}</p><p>Rating: ${'★'.repeat(ratingValue)}</p>`;

          commentsDisplay.appendChild(commentDiv);
          commentText.value = '';
          rating.value = '5'; // Reset rating to default value
      }
  });
});
