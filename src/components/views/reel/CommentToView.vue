<template>
  <div class="comment-section rounded-3 p-3 bg-white mt-3">
    <p class="m-0 fw-bold fs-5">មតិ (<span> {{ allComment.commentArr ? allComment.commentArr.length : 0 }}</span>)</p>
    <hr class="my-1 mb-3">
    <div class="comments-container position-relative">
      <!-- Comments List with Scroll -->
      <div class="comments-scroll-container">
        <div class="comments-list">
          <!-- Comment Item (repeated for each comment) -->
          <div v-for="comment in allComment.commentArr" :key="comment.id" class="comment">
            <div class="comment-avatar">
              <img :src="comment.user.avatar" alt="" />
            </div>
            <div class="comment-content">
              <div class="comment-header">
                <p class="m-0 username">{{ comment.user.name }}</p>
                <p class="m-0 comment-text">{{ comment.comment }}</p>
              </div>
              <div class="comment-footer">
                <p class="m-0 timestamp">{{ comment.created_since }}</p>
              </div>
            </div>
            <div class="dropdown" v-if="comment.user.id == userId && token">
              <button class="bg-transparent border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-three-dots"></i>
              </button>
              <ul class="dropdown-menu comment-action align-items-center p-3">
                <i class="bi bi-trash text-danger"></i>
                <button class="bg-transparent border-0" @click="deleteComment(comment.id)">លុប</button>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Comment Input -->
      <div class="comment-input-container">
        <div class="comment-input-wrapper" v-if="token">
          <input type="text" class="comment-input" placeholder="បញ្ជេញមតិ..." v-model="newComment"
            @keyup.enter="postComment" />
          <div class="comment-input-actions">
          </div>
        </div>
        <button class="post-btn" :class="{ 'active': newComment.length > 0 }" :disabled="newComment.length === 0"
          @click="postComment" v-if="token">
          បញ្ជូន
        </button>
        <div v-if="!token" class="d-flex align-items-center justify-content-center w-100">
          <p class="m-0 text-secondary pe-3">សូមចូលគណនីដើម្បីបញ្ជេញមតិ</p>
          <router-link to="/login" class="btn btn-primary">ចូលគណនី</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watchEffect } from 'vue';
import { useAllVideos } from '@/stores/views/videoFeed_store';
import { useAuthStore } from '@/stores/auth_store';

const allComment = useAllVideos();
const newComment = ref('');
const activeMenu = ref(null);
const userId = ref(null);
const user = useAuthStore();
const isPosting = ref(false);
const token = ref('');
const props = defineProps({
  post_id: {
    type: [String, Number],
    required: true
  }
});

watchEffect(() => {
  if (props.post_id) {
    allComment.onloadComment(props.post_id);
  }
  userId.value = localStorage.getItem('id');
  token.value = localStorage.getItem('token') || sessionStorage.getItem('token');

})


// Delete a comment
const deleteComment = async (id) => {
  await allComment.deleteComment(id);
  // Reload comments after deletion
  await allComment.onloadComment(props.post_id);
};

const postComment = async () => {
  if (newComment.value.trim() === '' || isPosting.value) return;

  try {
    isPosting.value = true;

    // Get current user info for optimistic update
    const currentUser = {
      id: userId.value,
      name: user.user?.name || 'User',
      avatar: user.user?.avatar || '/src/assets/images/no_photo.jpg'
    };

    // Create temporary comment for immediate display
    const tempComment = {
      id: 'temp-' + Date.now(),
      user: currentUser,
      comment: newComment.value,
      created_since: 'Just now'
    };

    // Add temporary comment to the UI immediately
    if (!allComment.commentArr) {
      allComment.commentArr = [];
    }
    allComment.commentArr.push(tempComment);

    // Store the comment text before clearing input
    const commentText = newComment.value;

    // Clear the input immediately for better UX
    newComment.value = '';

    // Send to server
    await allComment.postComment(props.post_id, commentText);

    // Reload the comments to get the proper server data
    await allComment.onloadComment(props.post_id);
  } catch (error) {
  } finally {
    isPosting.value = false;
  }
};

// Close menu when clicking outside
const closeMenuOnOutsideClick = (event) => {
  if (activeMenu.value !== null && !event.target.closest('.menu-container')) {
    activeMenu.value = null;
  }
};

if (typeof window !== 'undefined') {
  window.addEventListener('click', closeMenuOnOutsideClick);
}
</script>

<style scoped>
.comments-container {
  background-color: var(--bg-color);
  color: var(--text-color);
  max-width: 600px;
  margin: 0 auto;
  position: relative;
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
  padding-bottom: 30px;
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
  position: sticky;
  /* width: 35%; */
  bottom: -17px;
  /* right: 0%; */
  /* max-width: 11  2%; */
  width: 100%;
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

.dropdown-menu.comment-action {
  box-shadow: none;
  background-color: #f9f9f9e8 !important;
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
