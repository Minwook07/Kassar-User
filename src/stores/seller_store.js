import axios from "axios";
import { defineStore } from "pinia";

export const useSellerStore = defineStore('view/seller',{
    state: () => ({
        frm:{
            first_name:'',
            last_name: '',
            phone:'',
            shop_name:'',
            card_number: '',
            card_date:'',
            card_cvv:'',
            address: '',
            description: ''
        },
        mdl_share : null,
        vv: null,
        sellers:[],
        isCredit: null,
        selected_id: 0
    }),
    actions: {
        onLoadSeller(){
            axios.get('http://localhost/kassar_api/public/api/seller_request')
            .then((res) =>{
                this.sellers = res.data.data
            })
        }
    }
})