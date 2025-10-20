<template>
	<div class="product-list-skeleton mb-3pp">
		<div class="row g-0">
			<!-- Image Column -->
			<div class="col-12 col-md-3 col-lg-2">
				<div class="skeleton-list-image-wrapper">
					<div class="skeleton-list-image rounded"></div>
					<div class="skeleton-list-badge rounded-pill"></div>
				</div>
			</div>

			<!-- Content Column -->
			<div class="col-12 col-md-9 col-lg-10">
				<div class="skeleton-list-card-body">
					<!-- Header Info -->
					<div class="d-flex align-items-center gap-3 mb-2">
						<div class="skeleton-text-sm"></div>
						<div class="skeleton-text-sm"></div>
					</div>

					<!-- Product Title -->
					<div class="skeleton-text-lg mb-2"></div>

					<!-- Shop Name -->
					<div class="skeleton-text-sm mb-2"></div>

					<!-- Description -->
					<div class="skeleton-text-sm mb-1"></div>
					<div class="skeleton-text-sm mb-1"></div>

					<!-- Price & Actions Row -->
					<div class="d-flex justify-content-between align-items-center mt-3 gap-2">
						<div class="skeleton-text-md"></div>
						<div class="skeleton-button rounded-pill"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
// No logic needed
</script>

<style scoped>
.skeleton-list-image-wrapper {
	position: relative;
	width: 100%;
	min-height: 180px;
	overflow: hidden;
}

.skeleton-list-image {
	width: 100%;
	height: 100%;
	background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
	background-size: 200% 100%;
	animation: shimmer 1.5s infinite;
}

.skeleton-list-badge {
	position: absolute;
	top: 10px;
	left: 10px;
	width: 50px;
	height: 24px;
	background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
	background-size: 200% 100%;
	animation: shimmer 1.5s infinite;
	border-radius: 6px;
}

.skeleton-list-card-body {
	padding: 1.5rem;
}

.skeleton-text-sm {
	height: 12px;
	width: 80px;
	margin-right: 10px;
	background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
	background-size: 200% 100%;
	animation: shimmer 1.5s infinite;
	border-radius: 4px;
}

.skeleton-text-md {
	height: 16px;
	width: 100px;
	background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
	background-size: 200% 100%;
	animation: shimmer 1.5s infinite;
	border-radius: 4px;
}

.skeleton-text-lg {
	height: 20px;
	width: 140px;
	background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
	background-size: 200% 100%;
	animation: shimmer 1.5s infinite;
	border-radius: 4px;
}

.skeleton-button {
	height: 38px;
	width: 100px;
	background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
	background-size: 200% 100%;
	animation: shimmer 1.5s infinite;
	border-radius: 50px;
}

@keyframes shimmer {
	0% {
		background-position: 200% 0;
	}

	100% {
		background-position: -200% 0;
	}
}
</style>
