import axios from "axios";
import { defineStore } from "pinia";

export const useCardStore = defineStore("card_store", {
  state: () => ({
    frm_add: {
      province: '',
      district: '',
      commune: '',
      village: '',
      houseNumber: '',
      streetNumber: '',
      phone: '',
      name: ''
    },
    selected_id: 0,
    vv: null,
    mdl_credit: null,
    mdl_address: null,
    mdl_delete: null,
    mdl_delete_all: null,
    countFavItem: null,
    isAddress: null,
    provinces: [],
    districts: [],
    communes: [],
    villages: [],

    cartCounts: {},  // Store quantities for each product
    cartLists: [],   // Store the list of products in the cart
    cartAddresses: [],  // Store user addresses
  }),

  getters: {

    // Calculate the total price for all items in the cart based on quantities
    totalPrice: (state) => {
      return state.cartLists.reduce((total, cartItem) => {
        const quantity = state.cartCounts[cartItem.id] || 1;
        return total + cartItem.product.price * quantity;
      }, 0);
    },
    totalDis: (state) => {
      return state.cartLists.reduce((totald, cartItem) => {
        const quantity = state.cartCounts[cartItem.id] || 1;
        return totald + (cartItem.product.price * quantity * cartItem.product.discount_rate) / 100;
      }, 0);
    }
  },

  actions: {

    async onLoadAddress() {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    
      try {

        // Make API request
        const response = await axios.get(`/api/address?t=${new Date().getTime()}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        const addresses = response.data.addresses;
    
        if (Array.isArray(addresses) && addresses.length > 0) {
          const lastAddress = addresses[addresses.length - 1];
    
          this.cartAddresses = [lastAddress];
        }
      } catch (error) {
      }
    },

    onLoadCart() {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (token) {
        axios.get('api/cart', { headers: { Authorization: `Bearer ${token}` } })
          .then((res) => {
            this.cartLists = res.data.data;
            this.cartLists.forEach(cartItem => {
              this.cartCounts[cartItem.id] = parseInt(cartItem.qty, 10);
            });
          })
      }
    }
    ,
    onLoadFav() {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");

      if (token) {
        axios.get('api/favorites', { headers: { Authorization: `Bearer ${token}` } })
          .then((res) => {
            this.countFavItem = res.data.data.length;
          })
      }
    }
    ,

    // format maney
    formatPrice(price) {
      if (!price) return '0';
      return Math.floor(price)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas
    },

    // Update cart item quantity
    updateQuantity(id, quantity) {
      if (quantity < 1) return;  // Prevent setting quantity below 1
      this.cartCounts[id] = quantity;
    },

    async onLoadProvince() {
      try {
        const response = await axios.get("/api/provinces");
        this.provinces = response.data;
      } catch (error) {
      }
    },

    async onLoadDistrict(province_id) {
      try {
        const response = await axios.get(`/api/districts/${province_id}`);
        this.districts = response.data;
      } catch (error) {
      }
    },

    async onLoadCommune(commune_id) {
      try {
        const response = await axios.get(`/api/communes/${commune_id}`);
        this.communes = response.data;
      } catch (error) {
      }
    },

    async onLoadVillage(district_id) {
      try {
        const response = await axios.get(`/api/villages/${district_id}`);
        this.villages = response.data;
      } catch (error) {
      }
    },

  }
});
