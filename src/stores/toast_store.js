import { defineStore } from 'pinia';

export const useToastStore = defineStore('toast_store', {
    state: () => ({
        toastMessage: '',
        toast_alert: null,
    }),
    actions: {
        initToast(toastInstance) {
            this.toast_alert = toastInstance;
        },
        showToast(message) {
            this.toastMessage = message;
            if (this.toast_alert) {
                this.toast_alert.show();
            } else {
                console.error('Toast instance not initialized');
            }
        }
    },
});