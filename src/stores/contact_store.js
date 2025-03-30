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
        selected_id: 0,
        toast_alert: '',
        contacts: []
    }),
    actions: {
        onLoadContact(){
            axios.get('/api/contacts')
            .then((res) =>{
                this.contacts = res.data.data
            })
        }
    }
})