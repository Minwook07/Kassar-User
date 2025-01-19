<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container py-2">
      <RouterLink class="navbar-brand" to="/">
        <img src="/kassar_text.png" alt="" style="width: 150px" />
      </RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarScroll"
        aria-controls="navbarScroll"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarScroll">
        <div
          class="border border-primary search-main ms-auto rounded-pill bg-white px-2 py-1"
        >
          <form class="d-flex align-items-center ms-auto" role="search">
            <input
              class="form-control shadow-none bg-transparent border-0 search-input me-2 rounded-5"
              type="search"
              placeholder="ស្វែងរកផលិតផល"
              aria-label="Search"
            />
            <button class="btn btn-outline-success border-0" type="submit">
              <i class="bi bi-search"></i>
            </button>
          </form>
        </div>
        <div class="ms-auto d-flex align-items-center gap-4">
          <RouterLink class="text-primary fs-4 mt-1" to=""
            ><i class="bi bi-heart"></i
          ></RouterLink>
          <RouterLink class="text-primary fs-4" to=""
            ><i class="bi bi-bag"></i
          ></RouterLink>
          <RouterLink class="btn btn-primary rounded-5 px-3 py-2" to="/auth"
            >ចូលគណនី</RouterLink
          >
        </div>
      </div>
    </div>
  </nav>
  <div class="bg-primary w-100 ">
    <div class="container ">
        <RouterLink class="text-white fs-4" to=""
            ><i class="bi bi-collection-play"></i></RouterLink>
          <RouterLink class="text-white" to=""
            >ប្រភេទផលិតផល</RouterLink>
          <RouterLink class="text-white rounded-5 px-3 py-2" to="/auth"
            >ទំព័រដើម</RouterLink
          >
    </div>
  </div>
</template>

<script setup></script>
