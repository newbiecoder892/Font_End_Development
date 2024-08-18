const t_slider = document.getElementById('t_slider');
let isScrolling = false;
let startX, startY;

t_slider.addEventListener('touchstart', (e) => {
  if (e.touches.length === 1) {
    isScrolling = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }
});

t_slider.addEventListener('touchmove', (e) => {
  if (isScrolling && e.touches.length === 1) {
    const deltaX = e.touches[0].clientX - startX;
    t_slider.scrollLeft -= deltaX;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }
});

t_slider.addEventListener('touchend', () => {
  isScrolling = false;
});

if(typeof(Storage) != 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    // Retrieve stored like counts from localStorage
    const t_storedLikes = JSON.parse(localStorage.getItem('likes')) || {};

    // Variable to keep track of liked status within the session
    const t_sessionLikedStatus = {};

    document.querySelectorAll('.t_like-btn').forEach(button => {
        const t_id = button.getAttribute('data-id');
        const t_countSpan = document.getElementById(`${t_id}-count`);

        // Update like counts on page load
        t_countSpan.textContent = t_storedLikes[t_id] || 0;

        button.addEventListener('click', () => {
            // Check if the item has already been liked in this session
            if (!t_sessionLikedStatus[t_id]) {
                // Increment like count
                let t_currentCount = parseInt(t_countSpan.textContent);
                t_currentCount += 1;
                t_countSpan.textContent = t_currentCount;

                // Store updated like count in localStorage
                t_storedLikes[t_id] = t_currentCount;
                localStorage.setItem('likes', JSON.stringify(t_storedLikes));

                // Mark the item as liked in this session
                t_sessionLikedStatus[t_id] = true;

                // Update button appearance
                button.classList.add('liked');
            } else {
                // Decrement like count (unlike)
                let t_currentCount = parseInt(t_countSpan.textContent);
                t_currentCount -= 1;
                t_countSpan.textContent = t_currentCount;

                // Store updated like count in localStorage
                t_storedLikes[t_id] = t_currentCount;
                localStorage.setItem('likes', JSON.stringify(t_storedLikes));

                // Mark the item as unliked in this session
                t_sessionLikedStatus[t_id] = false;

                // Update button appearance
                button.classList.remove('liked');
            }
        });
    });
});

}



