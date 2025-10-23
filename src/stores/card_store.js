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

        cartCounts: {},
        cartLists: [],
        cartAddresses: [],
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

                console.log('API Response:', response.data);

                // FIX: Access response.data.data instead of response.data
                const addresses = response.data.data; // Changed this line!

                if (Array.isArray(addresses) && addresses.length > 0) {
                    // Format phones
                    this.cartAddresses = addresses.map(addr => ({
                        ...addr,
                        phone: this.formatPhone(addr.phone),
                    }));

                    console.log('Formatted addresses:', this.cartAddresses);

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
                console.error('Load address error:', error);
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
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },

        async updateQuantity(id, quantity) {
            if (quantity < 1 || !this.token) return;

            try {
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
                let res;

                if (this.selected_id && this.selected_id > 0) {
                    res = await axios.put(`/api/address/${this.selected_id}`, formData, {
                        headers: {
                            'Authorization': `Bearer ${this.token}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    console.log('Updated address:', res.data);
                } else {
                    res = await axios.post('/api/addresses', formData, {
                        headers: {
                            'Authorization': `Bearer ${this.token}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    console.log('Created address:', res.data);
                }

                await this.onLoadAddress();

                console.log('After reload - addresses:', this.cartAddresses);
                console.log('Selected ID:', this.selectedAddressId);
                console.log('isAddress:', this.isAddress);

                // Reset form and selected_id
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
                this.selected_id = 0; // Reset

                // Reset validation
                if (this.vv) {
                    this.vv.$reset();
                }

                if (this.mdl_address) this.mdl_address.hide();

                return true;

            } catch (err) {
                console.error("Failed to save address:", err);
                throw err;
            }
        },

        loadAddressForEdit(addressId) {
            const address = this.cartAddresses.find(a => a.id === addressId);
            if (address) {
                this.selected_id = address.id;
                this.frm_add = {
                    province: address.province_id || address.province?.id || '',
                    district: address.district_id || address.district?.id || '',
                    commune: address.commune_id || address.commune?.id || '',
                    village: address.village_id || address.village?.id || '',
                    houseNumber: address.house_number || '',
                    streetNumber: address.street_number || '',
                    phone: address.phone || '',
                    name: address.name || ''
                };

                // Load cascading dropdowns
                if (this.frm_add.province) {
                    this.onLoadDistrict(this.frm_add.province);
                }
                if (this.frm_add.district) {
                    this.onLoadCommune(this.frm_add.district);
                }
                if (this.frm_add.commune) {
                    this.onLoadVillage(this.frm_add.commune);
                }
            }
        }

    }
});
