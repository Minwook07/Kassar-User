import axios from "axios";
import { defineStore } from "pinia";

export const useCardStore = defineStore("card_store", {
    state: () => ({
        token: localStorage.getItem("token") || sessionStorage.getItem("token"),
        selectedAddressId: null,
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
        },
        selectedAddress(state) {
            return state.cartAddresses.find(a => a.id === state.selectedAddressId) || null;
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

        formatPhone(phone) {
            if (!phone) return 'N/A';
            const digits = phone.replace(/\D/g, '');

            if (digits.length === 8) return digits.replace(/(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4');
            if (digits.length === 9) return digits.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4');
            if (digits.length === 10) return digits.replace(/(\d{3})(\d{2})(\d{2})(\d{3})/, '$1 $2 $3 $4');
            return phone;
        },

        async onLoadAddress() {
            if (!this.token) return;

            try {
                const response = await axios.get('/api/addresses', {
                    headers: { Authorization: `Bearer ${this.token}` },
                });

                // Adjust to your API response
                const addresses = response.data; // or response.data.data if nested

                if (Array.isArray(addresses) && addresses.length > 0) {

                    // Format phones
                    this.cartAddresses = addresses.map(addr => ({
                        ...addr,
                        phone: this.formatPhone(addr.phone),
                    }));

                    // Load last selected address from localStorage
                    const lastSelected = localStorage.getItem('selectedAddressId');
                    if (lastSelected && this.cartAddresses.find(a => a.id == lastSelected)) {
                        this.selectedAddressId = parseInt(lastSelected);
                    } else {
                        // Default: last address in the list
                        this.selectedAddressId = this.cartAddresses[this.cartAddresses.length - 1].id;
                        localStorage.setItem('selectedAddressId', this.selectedAddressId);
                    }

                    this.isAddress = true;
                } else {
                    this.cartAddresses = [];
                    this.selectedAddressId = null;
                    this.isAddress = false;
                }
            } catch (error) {
                console.error(error);
                this.cartAddresses = [];
                this.selectedAddressId = null;
                this.isAddress = false;
            }
        },

        selectAddress(addressId) {
            if (this.cartAddresses.find(a => a.id == addressId)) {
                this.selectedAddressId = addressId;
                localStorage.setItem('selectedAddressId', addressId);
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

        async onSaveAddress() {
            if (!this.token) return;

            const formData = new FormData();
            formData.append('province_id', this.frm_add.province);
            formData.append('district_id', this.frm_add.district);
            formData.append('commune_id', this.frm_add.commune);
            formData.append('village_id', this.frm_add.village);
            formData.append('house_number', this.frm_add.houseNumber);
            formData.append('street_number', this.frm_add.streetNumber);
            formData.append('phone', this.frm_add.phone);
            formData.append('name', this.frm_add.name);

            try {
                const res = await axios.post('/api/addresses', formData, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });

                // Add new address to state immediately
                this.cartAddresses.push(res.data);
                this.selectedAddressId = res.data.id;

                // Reset form
                this.frm_add = {
                    province: '',
                    district: '',
                    commune: '',
                    village: '',
                    houseNumber: '',
                    streetNumber: '',
                    phone: '',
                    name: ''
                };

                if (this.mdl_address) this.mdl_address.hide();

            } catch (err) {
                console.error("Failed to save address:", err);
            }
        }

    }
});
