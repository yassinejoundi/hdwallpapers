import Vue from 'vue'
import Vuex from 'vuex'
import router from "../router";
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    links: []
  },
  mutations: {
    addLink(state, links){
      state.links = links
    }
  },
  actions: {
    async getData({commit}, payload){
      let linksArr=[]
      await payload.links.forEach(async(x, i)=>{
        try {
          await axios.get(`/links?link=${x}`)
            .then(res =>{
              const num = Math.floor(Math.random() * 9999)
              let rslt = res.data
              rslt.path = `${payload.folder}\\${ rslt.title.split(',')[0]}-${ num }.jpg`
              const img = new Image();
              img.src = rslt.img;
              img.onload = async()=>{ 
                let dim = {}
                if (((6000/parseInt(img.height)) * parseInt(img.width)) >= 9200) {
                    dim.height = 6000
                    dim.width = parseInt(parseInt(img.width) * ( 6000 / parseInt(img.height)))
                } else {
                    dim.height = parseInt(parseInt(img.height) * ( 9200/parseInt(img.height)))
                    dim.width = 9200
                }
                rslt.dim = dim
                linksArr.push(rslt)
                commit('addLink', linksArr)
                if ((i+1) == payload.index) {
                  
                  router.push("/result")
                }
              }
            })
        } catch (error) {
          console.log('error: ' + error)
        }
      })
    },
    async createImgs(state){
      state;
      this.state.links.forEach(async(link)=>{
        try {
          await axios.get(`/img?link=${link.img}&path=${link.path}&width=${link.dim.width}&height=${link.dim.height}`)
        } catch (error) {
          console.log('error: ' + error)
        }
      })
    }
  },
  modules: {
  }
})
