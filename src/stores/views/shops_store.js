import { defineStore } from "pinia";
import axios from "axios";
export const useShopStores = defineStore('views/shops_store',{
    state: () =>({
        selected_id:0,
    }),
    actions:{
        onlaodShop(){
            axios.get('http://kassar-api.test/api/shops'===-----)
            .then((res)=>{
                this.shops = res.data.data;
                console.log('Response:', response.data);
            })
        },
    }
})