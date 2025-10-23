<template>
    <CartHeader />
    <CartModalAddress />
    <CartModalDel />
    <CartDelAll />
    <ToastView />
</template>

<script setup>
import ToastView from '../toast/ToastView.vue';
import CartDelAll from './CartDelAll.vue';
import CartHeader from './CartHeader.vue';
import CartModalAddress from './CartModalAddress.vue';
import CartModalDel from './CartModalDel.vue';
</script>
