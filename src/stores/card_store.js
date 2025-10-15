import axios from "axios";
import { defineStore } from "pinia";

export const useCardStore = defineStore("card_store", {
    state: () => ({
        token: localStorage.getItem("token") || sessionStorage.getItem("token"),
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
        favItems: [],
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
        setToken(token) {
            this.token = token;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        },

        clearToken() {
            this.token = null;
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
        },

        async onLoadAddress() {
            if (!this.token) return;

            try {

                // Make API request
                const response = await axios.get(`/api/address?t=${new Date().getTime()}`, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
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
            if (!this.token) return;

            axios.get('api/cart', {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
                .then((res) => {
                    this.cartLists = res.data.data;
                    this.cartLists.forEach(cartItem => {
                        this.cartCounts[cartItem.id] = parseInt(cartItem.qty, 10);
                    });
                })
        },
        onLoadFav() {
            if (!this.token) return;

            axios.get('api/favorites', { headers: { Authorization: `Bearer ${this.token}` } })
                .then((res) => {
                    this.favItems = res.data.data.data;
                    this.countFavItem = res.data.data.length;
                })
        },

        formatPrice(price) {
            if (!price) return '0';
            return Math.floor(price)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas
        },

        async updateQuantity(id, quantity) {
            if (quantity < 1 || !this.token) return;    // guard

            try {
                // Send both required fields: product_id and qty
                // We read product_id from the existing cartList entry.
                const existing = this.cartLists.find(item => item.id === id);
                if (!existing) throw new Error('Cart item not found');

                await axios.put(
                    `/api/cart/${id}`,
                    {
                        product_id: existing.product.id,
                        qty: quantity,
                    },
                    { headers: { Authorization: `Bearer ${this.token}` } }
                );

                // Only on success do we update local state:
                this.cartCounts[id] = quantity;

            } catch (err) {
                // console.error('Could not update cart qty:', err);
                // OPTIONAL: Show user a toast or modal
            }
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
