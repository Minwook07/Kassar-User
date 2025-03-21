import axios from "axios";
import { defineStore } from "pinia";

export const useContactStore = defineStore('contact', {
    state: () => ({
        frm:{
            name: '',
            phone: '',
            email: '',
            desc: ''
        },
        vv: null,
        toast_alert: '',
        contacts: []
    }),
    actions: {
        onLoadContact(){
            axios.get('http://localhost/kassar_api/public/api/contacts')
            .then((res) =>{
                this.contacts = res.data.data
            })
        }
    }
})