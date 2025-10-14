import axios from "axios";
import { defineStore } from "pinia";

const DEFAULT_AVATAR = '/images/default-avatar.png';

const getToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
};

export const useInfoProfile = defineStore('views/profile_store', {
    state: () => ({
        token: getToken(),
        frm: {
            id: null,
            name: '',
            email: '',
            gender: null,
            phone: null,
            avatar: '',
            roles: [],
            history: '',
            shop_name: ''
        },
        isLoading: false,
        error: null,
        del_frm: {
            password: ''
        },
        showEditModal: false,
        mdl_edit: false,
        mdl_delete: null,
        mdl_edit_confirm: {
            show() {
                const store = useInfoProfile();
                store.mdl_edit = true;
            },
            hide() {
                const store = useInfoProfile();
                store.mdl_edit = false;
            }
        },
        mdl_delete_confirm: {
            show() {
                const store = useInfoProfile();
                if (store.mdl_delete) {
                    store.mdl_delete.show();
                }
            }
        },
    }),
    getters: {
        avatarUrl: (state) => state.frm.avatar || DEFAULT_AVATAR,
        isAuthenticated: (state) => !!state.token,
        displayName: (state) => {
            if (state.frm?.roles?.length && state.frm.roles[0].name === 'role_seller_user') {
                return state.frm.shop_name || state.frm.name;
            }
            return state.frm?.name || '';
        }
    },
    actions: {
        initializeToken() {
            this.token = getToken();
            if (this.token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
            }
        },

        setToken(token, remember = false) {
            this.token = token;
            const storage = remember ? localStorage : sessionStorage;
            storage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        },

        clearToken() {
            this.token = null;
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        },

        async onLoadProfile() {
            this.isLoading = true;
            this.error = null;

            try {
                const res = await axios.get('/api/profile', {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
                this.frm = { ...res.data.data.user };
                if (this.frm.gender) {
                    this.frm.gender = this.normalizeGender(this.frm.gender);
                }
                return res.data.data.user;
            } catch (err) {
                this.error = err.response?.data?.message || 'បរាជ័យក្នុងការទាញយកប្រវត្តិរូប';
                throw err;
            } finally {
                this.isLoading = false;
            }
        },

        async onUpdateProfile(profileData) {
            this.isLoading = true;
            this.error = null;

            try {
                const res = await axios.post('/api/profile', profileData, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });

                await this.onLoadProfile();
                return res.data;
            } catch (err) {
                this.error = err.response?.data?.message || 'បរាជ័យក្នុងការកែប្រែប្រវត្តិរូប';
                throw err;
            } finally {
                this.isLoading = false;
            }
        },

        async onUpdateAvatar(blob) {
            const formData = new FormData();
            formData.append('avatar', blob, 'avatar.jpg');

            try {
                const res = await axios.post('/api/profile/avatar', formData, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });

                if (res.data?.data?.avatar) {
                    this.frm.avatar = res.data.data.avatar;
                }
                return res.data;
            } catch (err) {
                console.error('Failed to update avatar:', err);
                throw err;
            }
        },

        async onRemoveAvatar() {
            try {
                const res = await axios.delete('/api/profile/avatar', {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });

                this.frm.avatar = '';
                return res.data;
            } catch (err) {
                console.error('Failed to remove avatar:', err);
                throw err;
            }
        },

        async logout() {
            if (!this.token) {
                return;
            }

            try {
                await axios.post('/api/auth/logout', {}, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    }
                });
            } catch (error) {
                console.error('Logout error:', error);
            } finally {
                // Clear token and reset state
                this.clearToken();
                this.$reset();
            }
        },

        async fetchProfile() {
            return await this.onLoadProfile();
        },

        normalizeGender(gender) {
            if (gender === 'Male' || gender === 'male' || gender === 1) return 'Male';
            if (gender === 'Female' || gender === 'female' || gender === 2) return 'Female';
            return 'Unknown';
        },

        translateGender(gender) {
            if (gender === 'Male') return 'ប្រុស';
            if (gender === 'Female') return 'ស្រី';
            return 'មិនបញ្ជាក់';
        },

        translateRole(roles) {
            if (roles === 'Regular User') return 'គណនីធម្មតា';
            if (roles === 'Seller User') return 'អ្នកលក់';
            if (roles === 'System Admin') return 'អ្នកគ្រប់គ្រង';
            return 'គណនីធម្មតា';
        }
    }
});