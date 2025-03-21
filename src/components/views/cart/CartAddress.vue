<template>
    <div class="custom-card bg-white" style="height: 200px;">
        <div>
            <div v-if="isAddress == null">
                <div class="location-icon">
                    <i class="bi bi-geo-alt-fill text-secondary"></i>
                </div>
                <div class="text-center mt-3">
                    <h5 class="fw-bold">មិនមានអាស័យដ្ឋាននៅលើផែនទី</h5>
                    <p class="text-muted">សូមបញ្ចូលអាសយដ្ឋានរបស់អ្នកដើម្បីអាចរកឃើញ</p>
                </div>
            </div>

            <!-- form -->
            <form class="" v-else>
                <h4 class="fw-bold">អាស័យដ្ឋានរបស់អ្នក</h4>
                <div class="d-flex pt-2">
                    <div
                        class="icon-address fs-1 text-light bg-success text-center rounded-circle d-flex align-items-center justify-content-center">
                        <i class="bi bi-geo-alt-fill"></i>
                    </div>
                    <div class="text-body align-item-center pt-3 ps-3">
                        <h5 class="fw-bold">ផ្ទះលេខ57 ផ្លូវ472 សង្កាត់ ទួលទំពួង1 ខណ្ឌ ចំការមន រាជធានីភ្នំពេញ </h5>
                        <span>ម៉ាក់អាមួយ កំពង់ចាម</span>
                        <p>098 765 4321</p>
                    </div>
                </div>
            </form>
        </div>

        <!-- Floating Button -->
        <button class="floating-button border-0 shadow-lg" @click="onOpenAddAddress()">
            <i class="bi bi-plus"></i>
        </button>
    </div>
</template>

<script setup>
import { useCardStore } from '@/stores/card_store';
import { onMounted, ref, watch } from 'vue';

const cardStore = useCardStore()
const isAddress = ref(null)

onMounted(() => {

})


watch(
    () => cardStore.isAddrese, // Dependency: watches changes to cardStore.isAddrese
    (newVal) => {
        isAddress.value = newVal;
    },
    { immediate: true } // Executes the watcher immediately on component initialization
);

const onOpenAddAddress = () => {
    cardStore.mdl_address.show()
}

</script>