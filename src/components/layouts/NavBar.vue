<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container">
            <RouterLink class="navbar-brand" to="/">
                <img src="/kassar_text.png" alt="" style="width: 150px;">
            </RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll"
                aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarScroll">
                <form class="d-flex ms-auto" role="search">
                    <input class="form-control me-2 rounded-5" type="search" placeholder="ស្វែងរកផលិតផល"
                        aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">ស្វែងរក</button>
                </form>
                <div class="ms-auto">
                    <RouterLink class="btn btn-primary rounded-5 px-4" to="/auth">ចូលគណនី</RouterLink>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>

</script>