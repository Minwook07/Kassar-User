import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        frm:{
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            termsAgreement: false,
        },
        auths:[]
    }),
    actions: {
        onLoadAuth(){
            axios.get('')
            .then((res) =>{
                this.auths = res.data.data
            })
        }
    }
})
