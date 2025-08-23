import axios from "axios";
import { defineStore } from "pinia";

const DEFAULT_AVATAR = '/images/default-avatar.png'

export const useInfoProfile = defineStore('views/profile_store', {
    state: () => ({
        frm: {
            id: null,
            name: '',
            email: '',
            gender: null,
            phone: null,
            avatar: '',
            roles: [],
            history: ''
        },
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
        // Always return avatar or fallback instantly
        avatarUrl: (state) => state.frm.avatar || DEFAULT_AVATAR
    },
    actions: {
        onLoadProfile() {
            const token = sessionStorage.getItem('token') || localStorage.getItem('token');

            axios.get('/api/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).
                then((res) => {
                    this.frm = res.data.data
                }).
                catch((err) => {
                    console.error('Failed to load profile:', err)
                });
        },
        async onUpdateProfile(profileData) {
            const token = sessionStorage.getItem('token') || localStorage.getItem('token');

            try {
                const res = await axios.post('/api/profile', profileData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (res.data?.data) {
                    // Update the store with new data
                    // this.frm = { ...this.frm, ...res.data.data };
                    Object.assign(this.frm, res.data.data);
                }

                return res.data;
            } catch (err) {
                console.error('Failed to update profile:', err);
                throw err;
            }
        },
        async onUpdateAvatar(blob) {
            const token = sessionStorage.getItem('token') || localStorage.getItem('token');
            const formData = new FormData();
            formData.append('avatar', blob, 'avatar.jpg');

            try {
                const res = await axios.post('/api/profile/avatar', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
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
            const token = sessionStorage.getItem('token') || localStorage.getItem('token');
            try {
                const res = await axios.delete('/api/profiles/avatar', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                this.frm.avatar = '';

                return res.data;
            } catch (err) {
                console.error('Failed to remove avatar:', err);
                throw err;
            }
        }
    }
})