<template>
  <div
    class="modal fade"
    id="mdl-share"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            ចែករំលែកទៅកាន់
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
         <div class="d-flex justify-content-center gap-3 mb-3">
          <a
            :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              pageUrl
            )}`"
            target="_blank"
            >
            <img class="share" src="@/assets/images/social-media/facebook.png" alt="">
            </a
          >
          <a class="share"
            :href="`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              pageUrl
            )}&text=Check%20this%20out!`"
            target="_blank"
          >
          <img class="share" src="@/assets/images/social-media/twitter (1).png" alt="">
          </a>
          <a
            :href="`https://wa.me/?text=Check%20out%20this%20page:%20${encodeURIComponent(
              pageUrl
            )}`"
            target="_blank"
            >
            <img class="share" src="@/assets/images/social-media/instagram.png" alt="">
            </a
          >
          <a 
            :href="`https://t.me/share/url?url=${encodeURIComponent(
              pageUrl
            )}&text=Check%20this%20out!`"
            target="_blank"
            >
            <img class="share" src="@/assets/images/social-media/telegram.png" alt="">
            </a
          >
         </div>
         <div class="link-share rounded py-2 ps-3" @click="copylink">
          {{ pageUrl }}
         </div>
        </div>
        <div class="modal-footer">
          <!-- <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Modal } from "bootstrap/dist/js/bootstrap.min";
import { useSellerStore } from "@/stores/seller_store";
import { onMounted, ref } from "vue";
const pageUrl = ref(`${window.location.origin}`);
const sellerStore = useSellerStore();
onMounted(() => {
  sellerStore.mdl_share = Modal.getOrCreateInstance(
    document.getElementById("mdl-share")
  );
});
const copyLink = () => {
  navigator.clipboard.writeText(pageUrl.value);
};

</script>
