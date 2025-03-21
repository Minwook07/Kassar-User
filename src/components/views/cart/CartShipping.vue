<template>
    <div class="card-process py-5 mx-auto bg-white" data-aos="fade-left" data-aos-duration="500">
        <h5 class="fw-bold">ដឹកជញ្ជូន</h5>
        <small class="">កាលបរិច្ឆេទដឹកជញ្ជូន៖ 04-Sep-2025</small>
        <hr class="hr">
        <h6 class="fw-bold mb-2">កូដបញ្ចុះតម្លៃ</h6>
        <div class="d-flex mt-3 mb-2 position-relative">
            <input type="text" class="px-2 code-discount" placeholder=" បញ្ចូលកូដបញ្ចុះតម្លៃ">
            <button type="submit" class="btn btn-custom">ទទួលយក</button>
        </div>
        <small class="text-muted">បញ្ចុះតម្លៃ 5%</small>
        <hr class="hr">
        <div class="d-flex justify-content-between mb-2">
            <h6 class="fw-bold">តម្លៃ</h6>
            <h6 class="fw-bold">80000 ៛</h6>
        </div>
        <div class="d-flex justify-content-between text-muted mb-2">
            <span>បញ្ចុះតម្លៃ (5%)</span>
            <span>-15000 ៛</span>
        </div>
        <div class="d-flex justify-content-between text-muted ">
            <span>ថ្លៃដឹកជញ្ចូន</span>
            <span>ឥតគិតថ្លៃ</span>
        </div>
        <hr class="hr">
        <div class="d-flex justify-content-between fw-bold">
            <span>តម្លៃសរុប</span>
            <span>90000 ៛</span>
        </div>
        <hr class="hr">
        <!-- <button class="mt-3 btn btn-secondary btn-process w-100" disabled>ទូទាត់ <span>៛90000</span></button> -->
        <RouterLink to="/waypay" class="mt-3 btn btn-secondary btn-process w-100" >ទូទាត់
            <span>៛90000</span></RouterLink>
    </div>
</template>