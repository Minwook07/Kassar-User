import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useProductStore = defineStore('product', () => {
  const detailProducts = ref(null);

  const fetchDetail = async (id) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const res = await axios.get(`api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    detailProducts.value = res.data.data;
  };

  return { detailProducts, fetchDetail };
});
