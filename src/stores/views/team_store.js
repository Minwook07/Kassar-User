import { defineStore } from "pinia";
export const useTeamStore = defineStore('views/team_store',{
    state:()=>({
        teams:[
            {id:1,name:'មិត ចិត', position : 'Web Developer',img: new URL('@/assets/images/about-us/teams/chet.jpg', import.meta.url), des: 'Technology has rapidly transformed the way we live, work, and communicate. From smartphones that keep us connected to AI-driven systems that enhance productivity, innovation continues to shape our daily.'},
            {id:2,name: 'ស្រឿន ចន្ធី', position: 'Web Development',img: new URL('@/assets/images/about-us/teams/chanthy.jpg', import.meta.url), des: 'Technology has rapidly transformed the way we live, work, and communicate. From smartphones that keep us connected to AI-driven systems that enhance productivity, innovation continues to shape our daily.'},
            {id:3,name: 'រៀល​ សុីថា', position: 'Web Development',img: new URL('@/assets/images/about-us/teams/sitha.jpg', import.meta.url), des: 'Technology has rapidly transformed the way we live, work, and communicate. From smartphones that keep us connected to AI-driven systems that enhance productivity, innovation continues to shape our daily.'},
            {id:4,name: 'មុនី ចន្ធសិទ្ធ', position: 'Web Development',img: new URL('@/assets/images/about-us/teams/chanseth.JPG', import.meta.url), des: 'Technology has rapidly transformed the way we live, work, and communicate. From smartphones that keep us connected to AI-driven systems that enhance productivity, innovation continues to shape our daily.'},
            {id:5,name: 'សៀន សូនីតា', position: 'Web Development',img: new URL('@/assets/images/about-us/teams/sonita.jpg', import.meta.url), des: 'Technology has rapidly transformed the way we live, work, and communicate. From smartphones that keep us connected to AI-driven systems that enhance productivity, innovation continues to shape our daily.'},
            {id:6,name: 'ក្លឹង សូរីយ៉ា', position: 'Web Development',img: new URL('@/assets/images/about-us/teams/soriya.jpg', import.meta.url), des: 'Technology has rapidly transformed the way we live, work, and communicate. From smartphones that keep us connected to AI-driven systems that enhance productivity, innovation continues to shape our daily .'},
            {id:7,name: 'រ៉េន សៀកលីម', position: 'Web Development',img: new URL('@/assets/images/about-us/teams/seaklim.png', import.meta.url), des: 'Technology has rapidly transformed the way we live, work, and communicate. From smartphones that keep us connected to AI-driven systems that enhance productivity, innovation continues to shape our daily.'},
        ]
    }),
    actions:{}
})