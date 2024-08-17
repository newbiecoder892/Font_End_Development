const t_slider = document.getElementById('slider');
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

document.addEventListener('DOMContentLoaded', () => {
    const t_storedLikes = JSON.parse(localStorage.getItem('likes')) || {};

    document.querySelectorAll('.t_like-btn').forEach(button => {
        const t_id = button.getAttribute('data-id');
        const t_countSpan = document.getElementById(`${t_id}-count`);
        t_countSpan.textContent = t_storedLikes[t_id] || 0;

        button.addEventListener('click', () => {
            // Log to check if the click event is firing
            console.log(`Button with ID ${t_id} clicked`);

            // Increment like count
            let t_currentCount = parseInt(t_countSpan.textContent);
            t_currentCount += 1;
            t_countSpan.textContent = t_currentCount;

            // Log to check if the count is being updated
            console.log(`Updated count: ${t_currentCount}`);

            // Store updated like count in localStorage
            t_storedLikes[t_id] = t_currentCount;
            localStorage.setItem('likes', JSON.stringify(t_storedLikes));

            // Log to check if localStorage is being updated
            console.log(`Stored likes: ${JSON.stringify(t_storedLikes)}`);
        });
    });
});


