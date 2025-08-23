import axios from "axios";
import { defineStore } from "pinia";

const DEFAULT_AVATAR = '/images/default-avatar.png'

export const useInfoSetting = defineStore('views/setting_store', {
    state: () => ({
        userInfo: {
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
        showDeletePassword: false,
        mdl_delete: null,
        mdl_delete_confirm: {
            show() {
                const store = useInfoSetting();
                if (store.mdl_delete) {
                    store.mdl_delete.show();
                }
            }
        },
    }),
    getters: {
        // Always return avatar or fallback instantly
        avatarUrl: (state) => state.userInfo.avatar || DEFAULT_AVATAR
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
                    this.userInfo = res.data.data
                }).
                catch((err) => {
                    console.error('Failed to load profile:', err)
                });
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
                    this.userInfo.avatar = res.data.data.avatar;
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

                this.userInfo.avatar = '';

                return res.data;
            } catch (err) {
                console.error('Failed to remove avatar:', err);
                throw err;
            }
        }
    }
})