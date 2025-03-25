<template>
    <div>
        <div class="frm-auth">
            <div class="row rounded-4 shadow-lg overflow-hidden">
                <!-- Left Section -->
                <div
                    class="col-md-6 right-section d-none d-md-flex flex-column justify-content-center p-5">
                        <div class="skeleton-text w-100 mb-4"></div>
                        <div class="skeleton-text w-50 mx-auto mb-4"></div>
                        <div class="skeleton-text w-75 mx-auto mb-4"></div>
                        <div class="skeleton-logo" style="padding: 100px;"></div>
                </div>

                <!-- Right Section -->
                <div class="col-md-6 right-section p-5">
                    <div class="text-center mb-4">
                        <div class="skeleton-logo"></div>
                        <div class="skeleton-text w-50 m-auto mb-2"></div>
                        <div class="skeleton-text w-75 m-auto"></div>
                    </div>

                    <form>
                        <div class="mb-3">
                            <div class="skeleton-input w-100"></div>
                        </div>

                        <div class="mb-3">
                            <div class="skeleton-input w-100"></div>
                        </div>
                        <div class="mb-3">
                            <div class="skeleton-input w-100"></div>
                        </div>

                        <div class="d-flex align-items-center gap-2">
                            <div class="skeleton-text mb-2" style="width: 20px!important;"></div>
                            <div class="skeleton-text w-50 mb-2"></div>
                        </div>

                        <div class="text-center">
                            <div class="skeleton-button w-100 mx-auto"></div>
                        </div>
                    </form>
                    <div class="text-center mt-3">
                        <div class="skeleton-text w-75 mx-auto"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.skeleton-text {
    background-color: #e0e0e0;
    height: 20px;
    border-radius: 4px;
}

.skeleton-logo {
    background-color: #e0e0e0;
    height: 100px;
    width: 150px;
    margin: 20px auto;
    border-radius: 8px;
}

.skeleton-input {
    background-color: #e0e0e0;
    height: 40px;
    border-radius: 4px;
}

.skeleton-checkbox {
    background-color: #e0e0e0;
    height: 20px;
    width: 50px;
    border-radius: 4px;
}

.skeleton-button {
    background-color: #e0e0e0;
    height: 50px;
    border-radius: 4px;
}

.skeleton-image {
    background-color: #e0e0e0;
    height: 70px;
    width: 70px;
    border-radius: 50%;
    margin-top: 20px;
}
</style>
