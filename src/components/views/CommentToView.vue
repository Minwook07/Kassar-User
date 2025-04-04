<template>
  <div class="comments-container">
    <!-- Comments List with Scroll -->
    <div class="comments-scroll-container">
      <div class="comments-list">
        <!-- Comment Item (repeated for each comment) -->
        <div v-for="(comment, index) in comments" :key="index" class="comment">
          <div class="comment-avatar">
            <img :src="comment.avatar" alt="User avatar" />
          </div>
          <div class="comment-content">
            <div class="comment-header">
              <p class="m-0 username">{{ comment.username }}</p>
              <p class="m-0 comment-text" v-html="formatComment(comment.text)"></p>
            </div>
            <div class="comment-footer">
              <p class="m-0 timestamp">{{ comment.timestamp }}</p>
            </div>
          </div>

          <!-- Like Section -->
          <!-- <div class="like-section">
              <button class="like-btn" @click="toggleLike(index)">
                <svg :class="{ 'liked': comment.isLiked }" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              </button>
              <span class="like-count">{{ comment.likes }}</span>
            </div> -->

          <!-- 3-Dot Menu -->
          <div class="menu-container">
            <button class="menu-toggle" @click="toggleMenu(index)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div class="dropdown-menu" v-if="activeMenu === index">
              <button class="dropdown-item delete-btn" @click="deleteComment(index)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Comment Input -->
    <div class="comment-input-container">
      <div class="comment-input-wrapper">
        <input type="text" class="comment-input" placeholder="Add comment..." v-model="newComment"
          @keyup.enter="postComment" />
        <div class="comment-input-actions">
          <button class="action-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          </button>
          <button class="action-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
          </button>
        </div>
      </div>
      <button class="post-btn" :class="{ 'active': newComment.length > 0 }" :disabled="newComment.length === 0"
        @click="postComment">
        Post
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

// State for new comment
const newComment = ref('');

// State for active menu
const activeMenu = ref(null);

// Sample comments data
const comments = reactive([
  {
    username: 'Bro_Germany1945',
    text: 'ផលិផលល្អ',
    timestamp: '3d ago',
    likes: 323,
    isLiked: false,
    avatar: 'src/assets/images/no_photo.jpg'
  },
  {
    username: 'Mak Samvichar',
    text: 'ទិញម្តងរួចហើយ​គឺថាជាប់ចិត្តណាស់',
    timestamp: '1h ago',
    likes: 0,
    isLiked: false,
    avatar: 'src/assets/images/no_photo.jpg'
  },
  {
    username: 'Ah Dam',
    text: 'ឆ្ងាញ់',
    timestamp: '3d ago',
    likes: 2507,
    isLiked: false,
    avatar: 'src/assets/images/user_pf_sample.jpg'
  },
  {
    username: 'GODZILLA',
    text: 'ឆ្ងាញ់ណាស់',
    timestamp: '3d ago',
    likes: 2,
    isLiked: false,
    avatar: '/kassar.png'
  },
  {
    username: 'プレイボーイ',
    text: 'គូរអូនមិនប្រៀបបានទេនៅលើលោកនេះ <span class="emoji">💛</span> LAMM',
    timestamp: '3d ago',
    likes: 359,
    isLiked: false,
    avatar: '/placeholder.svg?height=40&width=40'
  },
  {
    username: 'anhanha998',
    text: 'Cambodia is dreaming rn <span class="emoji">😔</span>',
    timestamp: '3d ago',
    likes: 0,
    isLiked: false,
    avatar: '/placeholder.svg?height=40&width=40'
  },
  // Add more comments to demonstrate scrolling
  {
    username: 'user123',
    text: 'Great video! <span class="emoji">🔥</span>',
    timestamp: '2d ago',
    likes: 45,
    isLiked: false,
    avatar: '/placeholder.svg?height=40&width=40'
  },
  {
    username: 'traveler_2023',
    text: 'I want to visit Cambodia someday!',
    timestamp: '1d ago',
    likes: 12,
    isLiked: false,
    avatar: '/placeholder.svg?height=40&width=40'
  },
  {
    username: 'history_buff',
    text: 'The architecture is amazing <span class="emoji">😍</span>',
    timestamp: '5h ago',
    likes: 8,
    isLiked: false,
    avatar: '/placeholder.svg?height=40&width=40'
  }
]);

// Toggle like state for a comment
const toggleLike = (index) => {
  const comment = comments[index];
  if (comment.isLiked) {
    comment.likes--;
  } else {
    comment.likes++;
  }
  comment.isLiked = !comment.isLiked;
};

// Toggle menu visibility
const toggleMenu = (index) => {
  if (activeMenu.value === index) {
    activeMenu.value = null;
  } else {
    activeMenu.value = index;
  }
};

// Delete a comment
const deleteComment = (index) => {
  comments.splice(index, 1);
  activeMenu.value = null;
};

// Post a new comment
const postComment = () => {
  if (newComment.value.trim() === '') return;

  // Add the new comment to the list
  comments.unshift({
    username: 'You',
    text: newComment.value,
    timestamp: 'Just now',
    likes: 0,
    isLiked: false,
    avatar: '/placeholder.svg?height=40&width=40'
  });

  // Clear the input
  newComment.value = '';
};

// Format comment text to render HTML (for emojis)
const formatComment = (text) => {
  return text;
};

// Close menu when clicking outside
const closeMenuOnOutsideClick = (event) => {
  if (activeMenu.value !== null && !event.target.closest('.menu-container')) {
    activeMenu.value = null;
  }
};

// Add event listener for outside clicks
if (typeof window !== 'undefined') {
  window.addEventListener('click', closeMenuOnOutsideClick);
}
</script>

<style scoped>
/* Base styles */

.comments-container {
  background-color: var(--bg-color);
  color: var(--text-color);
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Scrollable comments container */

.comments-scroll-container::-webkit-scrollbar {
  width: 6px;
}

.comments-scroll-container::-webkit-scrollbar-track {
  background: var(--bg-color);
}

.comments-scroll-container::-webkit-scrollbar-thumb {
  background-color: #444;
  border-radius: 6px;
}

/* Comments list */
.comments-list {
  padding: 0 16px;
}

/* Individual comment */
.comment {
  display: flex;
  margin-bottom: 20px;
  position: relative;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
  flex-shrink: 0;
}

.comment-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #333;
}

.comment-content {
  flex: 1;
  min-width: 0;
  /* Prevents content from overflowing */
}

.comment-header {
  margin-bottom: 4px;
}

.username {
  font-weight: 700;
  margin-right: 4px;
  font-size: 14px;
}

.comment-text {
  font-size: 14px;
  word-wrap: break-word;
  line-height: 1.4;
}

.emoji {
  font-style: normal;
}

.comment-footer {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 4px;
}

.timestamp {
  margin-right: 12px;
}

/* Like section */
.like-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 12px;
}

.like-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.like-btn svg {
  stroke: var(--text-secondary);
  fill: none;
  transition: all 0.2s ease;
}

.like-btn svg.liked {
  stroke: #ff2c55;
  fill: #ff2c55;
}

.like-count {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 2px;
}

/* 3-Dot Menu */
.menu-container {
  position: relative;
  margin-left: 8px;
}

.menu-toggle {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.menu-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 10;
  min-width: 120px;
  overflow: hidden;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.delete-btn {
  color: var(--danger-color);
}

.delete-btn svg {
  stroke: var(--danger-color);
}

/* Comment input */
.comment-input-container {
  position: fixed;
  bottom: 0;
  right: 0%;
  width: 35%;
  /* max-width: 11  2%; */
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: var(--bg-color);
  border-top: 1px solid #dfdfdf;
  z-index: 10;
  margin: 0 auto;
  background-color: #fff;
}

.comment-input-wrapper {
  width: 100%;
  position: relative;
}

.comment-input {
  width: 100%;
  background-color: var(--bg-secondary);
  border: 1px solid black;
  border-radius: 20px;
  padding: 10px 16px;
  padding-right: 80px;
  color: var(--text-color);
  font-size: 14px;
}

.comment-input:focus {
  outline: none;
  border-color: #555;
}

.comment-input-actions {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 8px;
}

.action-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.post-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 14px;
  cursor: not-allowed;
  opacity: 0.5;
}

.post-btn.active {
  color: var(--primary-color);
  cursor: pointer;
  opacity: 1;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .comments-list {
    padding: 0 12px;
  }

  .comment-input-container {
    padding: 8px 12px;
  }
}
</style>