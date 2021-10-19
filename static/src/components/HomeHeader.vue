<template>
  <div class="navbar m-2 shadow-lg bg-neutral text-neutral-content rounded-box">
    <div class="px-2 mx-2 navbar-start">
        <div class="form-control">
            <input type="text" placeholder="Folder Path" class="input" v-model="folder">
        </div>
    </div> 
    <div class="px-2 mx-2 navbar-center lg:flex">
        <div class="form-control">
            <input type="text" placeholder="Link" class="input" v-model="link">
        </div>
        <button class="btn mx-1 btn-square btn-ghost" @click="addLink">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M7,7H11V9H7A3,3 0 0,0 4,12A3,3 0 0,0 7,15H11V17H7A5,5 0 0,1 2,12A5,5 0 0,1 7,7M17,7A5,5 0 0,1 22,12H20A3,3 0 0,0 17,9H13V7H17M8,11H16V13H8V11M17,12H19V15H22V17H19V20H17V17H14V15H17V12Z" />
            </svg>
        </button> 
    </div> 
    <div class="navbar-end mx-4">
        <button class="btn btn-ghost p-2" @click="start">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M13,3H11V13H13V3M17.83,5.17L16.41,6.59C18.05,7.91 19,9.9 19,12A7,7 0 0,1 12,19C8.14,19 5,15.88 5,12C5,9.91 5.95,7.91 7.58,6.58L6.17,5.17C2.38,8.39 1.92,14.07 5.14,17.86C8.36,21.64 14.04,22.1 17.83,18.88C19.85,17.17 21,14.65 21,12C21,9.37 19.84,6.87 17.83,5.17Z" />
            </svg>
            Start
        </button> 
    </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    data() {
        return {
            folder: '',
            link: '',
            links: []
        }
    },
    mounted() {
        this.folder = localStorage.getItem('folderPath')
    },
    methods: {
        ...mapActions(["getData"]),
        addLink(){
            if (!this.links.includes(this.link.trim())) {
                this.links.push(this.link.trim())
                this.$emit('updateLinks', this.links)
            }
            this.link = ''
        },
        start(){
            if (this.folder == '') {
                this.$emit('error', 'Put the folder path')
            } else if(this.links.length == 0){
                this.$emit('error', 'Put at least one Hd Wallpaper link')
            } else {
                localStorage.setItem('folderPath', this.folder);
                this.getData({ links:this.links, folder:this.folder, index: this.links.length })
                this.$emit('Load')
            }
        }
    }
}
</script>

<style>

</style>