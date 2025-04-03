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
        console.log("Fetching addresses...");
    
        // Make API request
        const response = await axios.get(`/api/address?t=${new Date().getTime()}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        console.log("🚀 Full API Response:", response);
    
        // ✅ Check if `response.data` is an array
        if (Array.isArray(response.data) && response.data.length > 0) {
          const lastAddress = response.data[response.data.length - 1];
          console.log("✅ Last Address:", lastAddress);
    
          // Update the address list
          this.cartAddresses = [lastAddress];
        } else {
          console.warn("❌ No valid addresses found OR incorrect response format!");
          console.warn("🔍 Response Structure:", response.data);
        }
      } catch (error) {
        console.error("❌ Error loading address:", error);
        console.error("🔍 Error Details:", error.response ? error.response.data : error.message);
      }
    },
    

    // Load cart data from API
    async onLoadCart() {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");

      try {
        const response = await axios.get("/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Cart Data:", response.data);
        this.cartLists = response.data.data;
      } catch (error) {
        console.error("Error loading cart:", error);
      }
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
        console.error("Error loading provinces:", error);
      }
    },

    async onLoadDistrict(province_id) {
      try {
        const response = await axios.get(`/api/districts/${province_id}`);
        this.districts = response.data;
      } catch (error) {
        console.error("Error loading districts:", error);
      }
    },

    async onLoadCommune(commune_id) {
      try {
        const response = await axios.get(`/api/communes/${commune_id}`);
        this.communes = response.data;
      } catch (error) {
        console.error("Error loading communes:", error);
      }
    },

    async onLoadVillage(district_id) {
      try {
        const response = await axios.get(`/api/villages/${district_id}`);
        this.villages = response.data;
      } catch (error) {
        console.error("Error loading villages:", error);
      }
    }
  }
});
