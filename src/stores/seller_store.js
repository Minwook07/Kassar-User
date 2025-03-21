import axios from "axios";
import { defineStore } from "pinia";

export const useSellerStore = defineStore('view/seller',{
    state: () => ({
        frm:{
            shop_name: '',
            description: ''
        },
        sellers:[]
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