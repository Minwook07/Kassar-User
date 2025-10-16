<template>
    <section>
        <div class="container-fluid m-auto">
            <div class="follower-num row justify-content-center py-3 rounded-4 bg-light shadow-sm"
                v-if="shops_store.shops">
                <div class="col-4 d-flex justify-content-end" data-aos="fade-down-right">
                    <div>
                        <h3 class="text-center fw-bold color-style-2">
                            {{ shops_store.count_follows?.total || 0 }}
                        </h3>
                        <h5 class="fw-bold text-center">អ្នកតាមដាន</h5>
                    </div>
                </div>

                <div class="col-4" data-aos="fade-up">
                    <h3 class="text-center fw-bolder bg-warning color-style-2">31</h3>
                    <h5 class="fw-bold text-center">បានលក់</h5>
                </div>

                <div class="col-4 d-flex justify-content-start" data-aos="fade-up-left">
                    <div>
                        <h3 class="text-center fw-bold color-style-2">
                            {{ shops_store.shops?.total_quantity || 0 }}
                        </h3>
                        <h5 class="fw-bold text-center">អីវ៉ាន់ក្នុងឃ្លាំង</h5>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useShopStore } from '@/stores/views/shops_store';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const shops_store = useShopStore();
const route = useRoute();

onMounted(async () => {
  const shopId = Number(route.query.id);
  if (!shopId) return;

  const loaded = await shops_store.onloadShop(shopId);
  if (loaded) {
    // Only try to get follow info if shop loaded successfully
    await shops_store.getCountFollower(shopId);
    await shops_store.checkFollowStatus(shopId);
  }
});

</script>
