<template>
    <div class="result">
        <SuccessAlert v-show="success" :content="msg"/>
        <ErrorAlert v-show="error" :content="msg"/>
        <div class="result-body p-2">
            <div class="card bordered my-4" v-for="(elm, n) in list" :key="n">
                <figure @click="copyimg(n)" class="cursor-pointer">
                    <img :src="elm.img">
                </figure> 
                <div class="card-body p-2">
                    <h3 class="card-title text-accent-content cursor-pointer hover:bg-gray-600" @click="copytitle(n)">{{ elm.title }}</h3> 
                    <p class="text-accent-content cursor-pointer hover:bg-gray-600" @click="copykeys(n)">{{ elm.keywords }} </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SuccessAlert from '../components/alerts/SuccessAlert.vue'
import ErrorAlert from '../components/alerts/ErrorAlert.vue'
import { mapActions } from "vuex";
export default {
 components: {
     SuccessAlert,
     ErrorAlert
 },
 data() {
     return {
         list: this.$store.state.links,
         msg: '',
         success: false,
         error: false
     }
 },
 mounted() {
    this.sendImg()
 },
 methods: {
    ...mapActions(["createImgs"]),
    async sendImg(){
        await this.createImgs()
        console.log(this.$store.state.links)
    },
    async toClipboard(text){
        try {
            await navigator.clipboard.writeText(text)
            this.msg = 'copied to clipboard'
            this.success = true
        } catch($e) {
            this.msg = 'copied to clipboard faild'
            this.error = true
        }
        setTimeout(()=>{ this.success = this.error = false }, 5000)
    },
    async copyimg(n){
        await this.toClipboard(this.list[n].path)
    },
    async copytitle(n){
        await this.toClipboard(this.list[n].title)
    },
    async copykeys(n){
        await this.toClipboard(this.list[n].keywords)
    }
 }
}
</script>

<style scoped>
* {
    box-sizing: border-box;
}

.result-body {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.result-body > div {
    width: 30vw;
}

img {
    height: 150px;
}
</style>