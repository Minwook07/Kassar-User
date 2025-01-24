import { defineStore } from "pinia";

export const useDetailProducts = defineStore('views/detailproducts', {
  state: () => ({
    imgs: [
      { id: 1, img: new URL('@/assets/images/5.avif', import.meta.url).href ,is_img: true},
      { id: 2, img: new URL('@/assets/images/2.avif', import.meta.url).href , is_img: false},
      { id: 3, img: new URL('@/assets/images/3.avif', import.meta.url).href, is_img:false },
      { id: 4, img: new URL('@/assets/images/4.avif', import.meta.url).href, is_img:false },
    ],
  }),
  actions: {},
});
