import axios from "axios";
import { defineStore } from "pinia";

export const useCardStore = defineStore("card_store", {
  state: () => ({
    frm_add: {
        province: '',
        district: '',
        commune: '',
        village: ''
    },
    mdl_credit: null,
    mdl_address: null,
    isAddress: null,
    provinces: [],
    districts: [],
    communes: [],
    villages: [],

    cartCounts: {},  // Store quantities for each product
    cartLists: [],   // Store the list of products in the cart
  }),
  
  getters: {
    // Calculate the total price for all items in the cart based on quantities
    totalPrice: (state) => {
      return state.cartLists.reduce((total, cartItem) => {
        const quantity = state.cartCounts[cartItem.id] || 1;  // Default to 1 if no quantity set
        return total + cartItem.product.price * quantity;
      }, 0);
    }
  },
  
  actions: {
    // Load cart data from API
    onLoadCart() {
      const token = sessionStorage.getItem("token");

      if (!token) {
        alert("Token not found! Please log in again.");
        return;
      }

      axios.get("http://localhost/kassar_api/public/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        this.cartLists = res.data.data;
      })
      .catch((error) => {
        console.error("Error loading cart:", error);
      });
    },

    // Update cart item quantity
    updateQuantity(id, quantity) {
      if (quantity < 1) return;  // Prevent setting quantity below 1
      this.cartCounts[id] = quantity;
    },

    onLoadProvince() {
        axios.get("http://localhost/kassar_api/public/api/provinces")
          .then((res) => {
            this.provinces = res.data;
          });
      },
  
      onLoadDistrict(province_id){
          axios.get(`http://localhost/kassar_api/public/api/districts/${province_id}`)
          .then((res) => {
              this.districts = res.data;
          });
      },
  
      onLoadCommune(commune_id){
          axios.get(`http://localhost/kassar_api/public/api/communes/${commune_id}`)
          .then((res) => {
              this.communes = res.data;
          });
      },
  
      onLoadVillage(district_id) {
          axios.get(`http://localhost/kassar_api/public/api/villages/${district_id}`)
          .then((res) => {
              this.villages = res.data;
          });
      }
  }
});
