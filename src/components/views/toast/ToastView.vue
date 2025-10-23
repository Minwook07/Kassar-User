<template>
	<div class="toast-container position-fixed top-0 end-0 p-3">
		<Transition name="toast-slide">
			<div v-if="toastStore.toastMessage" id="liveToast" class="toast border-0 shadow-lg show"
				:class="toastBgClass" role="alert" aria-live="assertive" aria-atomic="true">
				<div class="toast-content d-flex align-items-center gap-3 p-3">
					<div class="toast-icon">
						<i :class="toastIconClass"></i>
					</div>
					<div class="message flex-grow-1">
						<span class="text text-white fw-medium">{{ toastStore.toastMessage }}</span>
					</div>
					<div>
						<button type="button" class="btn-close btn-close-white border-0 p-0" @click="hideToast"
							aria-label="Close"></button>
					</div>
				</div>
			</div>
		</Transition>
	</div>
</template>

<script setup>
import { useToastStore } from "@/stores/toast_store";
import { ref, watch, computed } from "vue";

const toastStore = useToastStore();
const autoHideTimer = ref(null);

const hideToast = () => {
	toastStore.clearToast();
	clearTimeout(autoHideTimer.value);
};

const toastBgClass = computed(() => {
	switch (toastStore.toastType) {
		case "success": return "bg-success text-white";
		case "error": return "bg-danger text-white";
		case "warning": return "bg-warning text-dark";
		case "info": return "bg-info text-white";
		default: return "bg-primary text-white";
	}
});

const toastIconClass = computed(() => {
	switch (toastStore.toastType) {
		case "success": return "bi bi-check2-circle fs-5 text-white";
		case "error": return "bi bi-x-circle fs-5 text-white";
		case "warning": return "bi bi-exclamation-triangle fs-5 text-dark";
		case "info": return "bi bi-info-circle fs-5 text-white";
		default: return "bi bi-bell fs-5 text-white";
	}
});

watch(() => toastStore.toastMessage, (newVal) => {
	if (newVal) {
		if (autoHideTimer.value) clearTimeout(autoHideTimer.value);
		autoHideTimer.value = setTimeout(() => {
			hideToast();
		}, 3000);
	}
});
</script>


<style scoped>
.toast-container {
	z-index: 9999!important;
}

.toast {
	border-radius: 12px;
	overflow: hidden;
	width: auto;
	min-width: auto;
	max-width: 400px;
}

/* Vue transition classes */
.toast-slide-enter-active {
	animation: slideInRight 0.3s ease forwards;
}

.toast-slide-leave-active {
	animation: slideOutLeft 0.3s ease forwards;
}

@keyframes slideInRight {
	0% {
		opacity: 0;
		transform: translateX(100%);
	}

	100% {
		opacity: 1;
		transform: translateX(0);
	}
}

@keyframes slideOutLeft {
	0% {
		opacity: 1;
		transform: translateX(0);
	}

	100% {
		opacity: 0;
		transform: translateX(100%);
	}
}

.toast-content {
	display: flex;
	align-items: center;
}

.toast-icon {
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 24px;
}

.message {
	word-break: break-word;
	overflow-wrap: break-word;
}

.message .text {
	font-size: 0.95rem;
	line-height: 1.4;
}

/* Add some responsive adjustments */
@media (max-width: 576px) {
	.toast {
		min-width: 250px;
		max-width: 90vw;
	}
}
</style>