<template>
  <web-view :src="linkUrl"></web-view>
</template>

<script>
  export default {
    name: "linkOut",
    data(){
        return{
          linkUrl:''
        }
    },
    onReady(){
      this.linkUrl = this.$router.currentRoute.query.url + '?from=mp';
    },
  }
</script>

<style scoped>

</style>
