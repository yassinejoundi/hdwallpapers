<template>
  <div class="home">
    <ErrorAlert v-show="show" :content="msg" />
    <Head @updateLinks="newLinks($event)" @Load="load = true" @error="errorMsg($event)"/>
    <List :links="links" />
    <loading v-show="load"/> 
  </div>
</template>

<script>
import Head from '../components/HomeHeader.vue'
import List from '../components/HomeList.vue'
import loading from '../components/loading.vue'
import ErrorAlert from '../components/alerts/ErrorAlert.vue'
export default {
  name: 'Home',
  components: {
    Head,
    List,
    loading,
    ErrorAlert
  },
  data() {
    return {
      links: [],
      load: false,
      show: false,
      msg: ''
    }
  },
  methods: {
    newLinks(links){
      this.links = [...links]
    },
    errorMsg(msg){
      this.msg = msg
      this.show = true
      setInterval(() => {
        this.show = false
      }, 5000);
    }
  }
}
</script>
