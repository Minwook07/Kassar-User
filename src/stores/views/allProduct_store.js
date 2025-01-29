import {defineStore} from "pinia";
export const useAllProducts = defineStore('views/allProduct',{
    state:()=>({
        products:[
            {id:1,name:'ក្រូចខ្វិចបាត់ដំបងពូនី 1',price:100,img:new URL('@/assets/images/5.avif', import.meta.url).href,isFav:false},
            {id:2,name:'ក្រូចខ្វិចបាត់ដំបងពូនី 2',price:200,img:new URL('@/assets/images/2.avif', import.meta.url).href,isFav:false},
            {id:3,name:'ក្រូចខ្វិចបាត់ដំបងពូនី 3',price:300,img:new URL('@/assets/images/3.avif', import.meta.url).href,isFav:false},
            {id:4,name:'ក្រូចខ្វិចបាត់ដំបងពូនី 4',price:400,img:new URL('@/assets/images/4.avif', import.meta.url).href,isFav:false},

            {id:5,name:'ក្រូចខ្វិចបាត់ដំបងពូនី 1',price:100,img:new URL('@/assets/images/5.avif', import.meta.url).href,isFav:false},
            {id:6,name:'ក្រូចខ្វិចបាត់ដំបងពូនី 2',price:200,img:new URL('@/assets/images/2.avif', import.meta.url).href,isFav:false},
            {id:7,name:'ក្រូចខ្វិចបាត់ដំបងពូនី 3',price:300,img:new URL('@/assets/images/3.avif', import.meta.url).href,isFav:false},
            {id:8 ,name:'ក្រូចខ្វិចបាត់ដំបងពូនី 4',price:400,img:new URL('@/assets/images/4.avif', import.meta.url).href,isFav:false},
        ]
    }),
    actions:{}
 
})