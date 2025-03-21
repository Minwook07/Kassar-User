import axios from "axios";
import { defineStore } from "pinia";

export const useFaqStore = defineStore('view/faq',{
    state: () => ({
        frm:{
            question: '',
            answer: ''
        },
        faqs:[]
    }),
    actions: {
        onLoadFaq(){
            axios.get('http://localhost/kassar_api/public/api/faqs')
            .then((res) =>{
                this.faqs = res.data.data
            })
        }
    }
})