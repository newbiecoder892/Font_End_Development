document.addEventListener('DOMContentLoaded', () => {
    const t_descs = document.querySelectorAll('.t_content-desc');
    let t_descTimeout;

    function showDesc(t_desc) {
        //This function is used to set it to automatically hide the description if the mouse is not moving for more than one minute.
        clearTimeout(t_descTimeout);
        t_desc.style.opacity = '1';
        t_desc.style.visibility = 'visible';
        t_descTimeout = setTimeout(() => {
            hideDesc(t_desc);
        }, 60000); // 1 minute = 60000 milliseconds
    }

    function hideDesc(t_desc) {
        t_desc.style.opacity = '0';
        t_desc.style.visibility = 'hidden';
    }

    t_descs.forEach(t_desc => {
        const t_parentSection = t_desc.parentElement;

        t_parentSection.addEventListener('mouseenter', () => {
            showDesc(t_desc);
        });

        t_parentSection.addEventListener('mouseleave', () => {
            hideDesc(t_desc);
        });
    });
});


function toggleFlip(card) {
    let t_descTimeout;

    card.classList.toggle('flipped');
    
    function showDesc(t_desc) {
        clearTimeout(t_descTimeout); // Clear any existing timeout
        t_desc.style.opacity = '1';
        t_desc.style.visibility = 'visible';
        t_descTimeout = setTimeout(() => {
            hideDesc(t_desc);
        }, 60000); // 1 minute = 60000 milliseconds
    }

    // After flipping, if the card is no longer flipped, check the screen size and display t_content-desc if needed
    if (!card.classList.contains('flipped')) {
        const t_conDesc = card.querySelector('.t_content-desc');
        if (window.innerWidth <= 768) { // Check if screen width is small
            showDesc(t_conDesc); // To show the description without hover
        }
    }
}

function hideDesc(t_desc) {
    t_desc.style.opacity = '0';
    t_desc.style.visibility = 'hidden';
}



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
