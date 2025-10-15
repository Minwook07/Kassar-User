<template>
	<section class="pb-5">
		<div class="container-fluid">
			<div class="row">
				<div class="col-6 col-md-4 col-lg-3 mb-3 overflow-hidden">
					<h1 class="fw-bold" data-aos="fade-down">សមាជិកក្រុម</h1>
					<div data-aos="fade-up-right" class="d-none d-lg-block" style="width: 100%; height: 200px">
						<img src="@/assets/images/about-us/farm/flower.png" alt="" class="flower" />
					</div>
				</div>
				<div data-aos="fade-up-left" class="col-6 col-md-4 col-lg-3 mb-3" v-for="team in teamStore.teams"
					:key="team.id">
					<div class="card myteam-card overflow-hidden border-0 position-relative">
						<div>
							<img class="card-img-top mb-3 rounded w-100 h-100 object-fit-cover" :src="team.img"
								alt="" />
						</div>
						<div class="position-absolute py-2 px-4 team-name bg-white">
							<div class="d-flex gap-3">
								<div class="line-team-name bg-primary py-2"></div>
								<h3 class="mb-0 fw-bold text-dark fs-5">{{ team.name }}</h3>
							</div>
						</div>
						<div class="position-absolute py-4 px-4 team-name-hover team-name">
							<div class="d-flex gap-3">
								<div class="line-team-name bg-primary py-2"></div>
								<h3 class="mb-0 fw-bold text-white fs-5">{{ team.name }}</h3>
							</div>
							<div class="team-des text-white mt-3">
								<p>{{ team.position }}</p>
								<p class="text-truncate-4">{{ team.desc }}</p>
							</div>
							<div class="team-social d-flex justify-content-center gap-1 gap-md-2">
								<router-link to="" class="text-decoration-none">
									<div
										class="socail-width bg-white rounded p-3 d-flex align-items-center justify-content-center">
										<i class="fa-solid fa-envelope text-primary fs-5"></i>
									</div>
								</router-link>
								<router-link to="" class="text-decoration-none">
									<div
										class="socail-width bg-white rounded p-3 d-flex align-items-center justify-content-center">
										<i class="fa-brands fa-facebook text-primary fs-5"></i>
									</div>
								</router-link>
								<router-link to="" class="text-decoration-none">
									<div
										class="socail-width bg-white rounded p-3 d-flex align-items-center justify-content-center">
										<i class="fa-brands fa-instagram text-primary fs-5"></i>
									</div>
								</router-link>
								<router-link to="" class="text-decoration-none">
									<div
										class="socail-width bg-white rounded p-3 d-flex align-items-center justify-content-center">
										<i class="fa-brands fa-linkedin-in text-primary fs-5"></i>
									</div>
								</router-link>
							</div>
						</div>
						<div class="position-absolute bg-primary text-white px-lg-3 px-2 py-lg-2 py-1 hover-des">
							<i class="bi bi-plus-lg fs-lg-4 fs-5"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { useTeamStore } from "@/stores/views/team_store";
const teamStore = useTeamStore();
</script>