import { defineStore } from 'pinia';

export const useToastStore = defineStore('toast_store', {
    state: () => ({
        toastMessage: '',
        toastType: 'success', // success | error | warning | info
    }),
    actions: {
        showToast(message, type = 'success') {
            this.toastMessage = message;
            this.toastType = type;
        },
        clearToast() {
            this.toastMessage = '';
            this.toastType = 'success';
        }
    },
});


// How to use in component
// import { useToastStore } from "@/stores/toast_store";

// const toastStore = useToastStore();

// toastStore.showToast("Saved successfully!", "success");
// toastStore.showToast("Something went wrong!", "error");
// toastStore.showToast("Be careful with this action.", "warning");
// toastStore.showToast("Here’s some info for you.", "info");