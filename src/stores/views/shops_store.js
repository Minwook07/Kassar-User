import { defineStore } from "pinia";
import axios from "axios";
export const useShopStores = defineStore('views/shops_store',{
    state: () =>({
        selected_id:0,
    }),
    actions:{
        onlaodShop(id){
            axios.get(`http://kassar-api.test/api/shops/${id}`)
            .then((res)=>{
                this.shops = res.data.data;
                console.log('Response:', response.data);
            })
        },
        setSelectShop(id){
            this.selected_id = id;
        }
    }
})