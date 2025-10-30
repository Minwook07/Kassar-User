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
        items: [],

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
                const response = await axios.get('/api/address', {
                    headers: { Authorization: `Bearer ${this.token}` },
                });

                console.log('API Response:', response.data);

                // FIX: Access response.data.data instead of response.data
                const address = response.data.data; // Changed this line!

                if (Array.isArray(address) && address.length > 0) {
                    // Format phones
                    this.cartAddresses = address.map(addr => ({
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

            // Validate form first (using vee-validate or similar)
            if (this.vv) {
                await this.vv.$validate();
                if (this.vv.$error) {
                    console.log('Validation errors:', this.vv.$errors);
                    return;
                }
            }

            // Remove spaces from phone before sending
            const cleanPhone = this.frm_add.phone.replace(/\s+/g, '');

            // Check if this exact address already exists
            const exists = this.cartAddresses.some(addr =>
                addr.province_id == this.frm_add.province &&
                addr.district_id == this.frm_add.district &&
                addr.commune_id == this.frm_add.commune &&
                addr.village_id == this.frm_add.village &&
                addr.house_number == this.frm_add.houseNumber &&
                addr.street_number == this.frm_add.streetNumber &&
                addr.phone.replace(/\s+/g, '') == cleanPhone &&
                addr.name == this.frm_add.name &&
                addr.id != this.selected_id // ignore if updating the same address
            );

            if (exists) {
                if (this.$toast) this.$toast.error("This address already exists.");
                else alert("This address already exists.");
                return;
            }

            // Prepare payload
            const payload = {
                province_id: parseInt(this.frm_add.province) || null,
                district_id: parseInt(this.frm_add.district) || null,
                commune_id: parseInt(this.frm_add.commune) || null,
                village_id: parseInt(this.frm_add.village) || null,
                house_number: this.frm_add.houseNumber || '',
                street_number: this.frm_add.streetNumber || '',
                phone: cleanPhone,
                name: this.frm_add.name || ''
            };

            try {
                let res;

                if (this.selected_id && this.selected_id > 0) {
                    // UPDATE existing address
                    res = await axios.put(`/api/address/${this.selected_id}`, payload, {
                        headers: {
                            Authorization: `Bearer ${this.token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    console.log('Updated address:', res.data);
                } else {
                    // CREATE new address
                    res = await axios.post('/api/addresses', payload, {
                        headers: {
                            Authorization: `Bearer ${this.token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    console.log('Created address:', res.data);
                }

                // Reload addresses from backend
                await this.onLoadAddress();

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
                this.selected_id = 0;

                // Reset validation
                if (this.vv) this.vv.$reset();

                // Hide modal if exists
                if (this.mdl_address) this.mdl_address.hide();

                return true;

            } catch (err) {
                console.error("Failed to save address:", err);

                // Show validation / error messages
                if (err.response && err.response.data) {
                    const resp = err.response.data;
                    let msg = resp.message || "Failed to save address.";

                    if (resp.data) {
                        const firstField = Object.keys(resp.data)[0];
                        const firstError = resp.data[firstField][0];
                        msg += ` ${firstError}`;
                    }

                    if (this.$toast) this.$toast.error(msg);
                    else alert(msg);
                } else {
                    if (this.$toast) this.$toast.error("Failed to save address.");
                    else alert("Failed to save address.");
                }

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
                    phone: address.phone.replace(/\s+/g, ''),
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
