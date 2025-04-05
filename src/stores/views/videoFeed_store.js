import { defineStore } from "pinia"
import axios from "axios"
import router from "@/router"

export const useAllVideos = defineStore("views/videoFeed", {
  state: () => ({
    mdl_term: null,
    videoArr: null,
    lastVideoId: null,
    fiestVideoId: null,
    lastIndexVideoArr: null,
    commentArr: null,
  }),
  actions: {
    toggleFav(id) {
      const product = this.products.find((p) => p.id === id)
      if (product) {
        product.isFav = !product.isFav
      }
    },

    onloadVideoFilter(per_page = 8, page = 1) {
      axios.get(`/api/posts?per_page=${per_page}&page=${page}`).then((response) => {
        this.videoArr = response.data.data
      })
    },
    onloadVideo() {
      axios.get(`/api/posts?sdir=asc`).then((response) => {
        this.lastIndexVideoArr = response.data.data.length - 1
        this.videoArr = response.data.data
        this.lastVideoId = this.videoArr[0].id
      })
    },

    onloadVideoFilterId(id) {
      axios.get(`/api/posts/${id}`).then((response) => {
        this.videoArr = response.data.data
      })
    },

    addToCart(id) {
      const token = localStorage.getItem("token")

      if (!token) {
        router.push({ name: "login" })
        return
      }

      const formData = new FormData()
      formData.append("product_id", id)
      formData.append("qty", 1)

      axios
        .post("/api/cart", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // console.log(response.data);
        })
    },
    addToFavorite(id) {
      const token = localStorage.getItem("token")

      if (!token) {
        router.push({ name: "login" })
        return
      }

      const formData = new FormData()
      formData.append("product_id", id)

      axios
        .post("/api/favorites", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // console.log(response.data);
        })
    },
    onloadComment(id) {
      return axios.get(`api/comments/${id}`).then((response) => {
        this.commentArr = response.data.data
        return response.data.data
      })
    },
    postComment(id, comment) {
      const token = localStorage.getItem("token")
      return axios
        .post(
          `api/comments/${id}`,
          { comment },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        )
        .then((response) => {
          return response.data.data
        })
    },
    deleteComment(id) {
      const token = localStorage.getItem("token")
      return axios
        .delete(`api/comments/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          return response.data
        })
    },
  },
})

