import { defineStore } from "pinia";

export const useCardStore = defineStore('vies/card_store', {
    state: () => ({
        frm: [
            // card_village: '',
            // card_commune: '',
            // card_district: '',
            // card_province: ''
            {id: 1, village: 'a', commune: 'a' , district: 'a', province: 'a' }
            
        ],
        mdl_credit: null,
        mdl_address: null,
        isAddrese: null,
        isCredit: null
    }),
    actions: {
        setIsAdress(state){
            this.isAddrese = state
        },
        setIsCredit(state){
            this.isCredit = state
        },
        getData(){
            // axios.get("...").then()
            return "test"
        }
        
    }
})