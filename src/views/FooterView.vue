<style scoped> 
:root {
    --bs-primary: #18A558;
    --bs-secoundary: #116530;
    --bs-supporting: #A3EBB1;
    --bs-accent: #F8C519;
    --bs-primary-hover: #158649;
    --bs-secoundary-hover: #0f5728;
    --bs-supporting-hover: #91d6a0;
    --bs-accent-hover: #e0b018;
    --bs-text-white: #ffffff;
    --bs-text-light: #dddddd;
    --bs-text-black: #000000;
}
.icon-foot i{
    display: inline-flex; /* Makes it behave like a box */
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: var(--bs-secoundary);
    border-radius: 100%;
    margin-left: 10px;
    font-size: 20px; 
    color: blue; /* Icon color */
    box-shadow: 0 0 10px 5px rgba(0, 0, 255, 0.7); 
}
</style>
<template>
    <main>
        <div class="footer py-5">
            <div class="container">
                <div class="row">
                    <div class="col-4">
                        <div class="item-foot">
                            <div class="logo-foot">
                                <img src="@/assets/images/kassar_text.png" alt="" style="width: 150px;">
                            </div>
                            <div class="text-foot">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente saepe iste libero quam molestiae nihil quo.
                            </div>
                            <div class="icon-foot">
                                <i class="bi bi-facebook"></i>
                                <i class="bi bi-facebook"></i>
                                <i class="bi bi-facebook"></i>
                                <i class="bi bi-facebook"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>