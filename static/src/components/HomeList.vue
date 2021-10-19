<template>
  <div class="list">
    <div class="card text-center m-2 shadow-2xl bg-accent text-accent-content" v-for="(link,n) in links" :key="n">
      <div class="card-body">
        <p> {{ link }} </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['links']
}
</script>

<style scoped>

* {
    box-sizing: border-box;
}

.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  height: calc(100vh - 80px);
  overflow-y: auto;
  overflow-x: hidden;
}

.list > div {
  width: 30vw;
  height: 100px;
  justify-content: center;
  align-items: center;
}
</style>