import { defineStore } from "pinia";

export const useCardStore = defineStore('vies/card_store', {
    state: () => ({
        frm: [
            // card_village: '',
            // card_commune: '',
            // card_district: '',
            // card_province: ''
            
        ],
        mdl_credit: null,
        mdl_address: null,
        isAddress: null
    }),
    actions: {
        
    }
})