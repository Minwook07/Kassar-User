import { defineStore } from "pinia";
export const useTeamStore = defineStore('views/team_store', {
    state: () => ({
        teams: [
            {
                id: 1,
                name: 'មិត ចិត',
                position: 'Web Developer',
                img: new URL('@/assets/images/about-us/teams/chet.JPG', import.meta.url),
                desc: 'Life is fleeting; cherish your work, love your family, treasure your friends, and pursue your happiness.'
            },
            {
                id: 2,
                name: 'ស្រឿន ចន្ធី',
                position: 'Web Developer',
                img: new URL('@/assets/images/about-us/teams/chanthy.jpg', import.meta.url),
                desc: 'Technology has rapidly transformed the way we live, work, and communicate. From smartphones that keep us connected to AI-driven systems that enhance productivity.'
            },
            {
                id: 3,
                name: 'រៀល​ សុីថា',
                position: 'Web Developer',
                img: new URL('@/assets/images/about-us/teams/sitha.jpg', import.meta.url),
                desc: 'Technology has rapidly transformed the way we live, work, and communicate. From smartphones that keep us connected to AI-driven systems that enhance productivity.'
            },
            {
                id: 4,
                name: 'មុនី ចន្ធសិទ្ធ',
                position: 'Web Developer',
                img: new URL('@/assets/images/about-us/teams/chanseth.JPG', import.meta.url),
                desc: 'Technology has rapidly transformed the way we live, work, and communicate. From smartphones that keep us connected to AI-driven systems that enhance productivity.'
            },
            {
                id: 5,
                name: 'សៀន សូនីតា',
                position: 'Web Developer',
                img: new URL('@/assets/images/about-us/teams/sonita.JPG', import.meta.url),
                desc: 'Technology has rapidly transformed the way we live, work, and communicate. From smartphones that keep us connected to AI-driven systems that enhance productivity.'
            },
            {
                id: 6,
                name: 'ក្លឹង សូរីយ៉ា',
                position: 'Web Developer',
                img: new URL('@/assets/images/about-us/teams/soriya.JPG', import.meta.url),
                desc: 'Technology has rapidly transformed the way we live, work, and communicate. From smartphones that keep us connected to AI-driven systems that enhance productivity.'
            },
            {
                id: 7,
                name: 'រ៉េន សៀកលីម',
                position: 'Web Developer',
                img: new URL('@/assets/images/about-us/teams/seaklim.png', import.meta.url),
                desc: 'Technology has rapidly transformed the way we live, work, and communicate. From smartphones that keep us connected to AI-driven systems that enhance productivity.'
            },
        ]
    }),
    actions: {}
})