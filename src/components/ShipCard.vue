<template>
  <b-card
    @click="openDetails"
    tag="article"
    style="max-width: 250px; min-width: 250px"
    class="ship-card mb-3"
  >
    <b-card-text>{{item.name}}</b-card-text>
  </b-card>
</template>

<script>
export default {
  name: 'shipCard',
  props: {
    item: Object
  },  
  methods: {
    openDetails () {
      let tempArr = this.item.url.split('/')
      let shipId = tempArr[tempArr.length-2]
      this.$router.push({name: 'StarshipDetails', params: {id: shipId}})
    }
  }
}
</script>

<style scoped>
.card {
  transition: all .2s ease;
  cursor: pointer;
  padding: 2.5rem;
  background: #fff;
  border: 1px solid #ebecec;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0,0,0,.1);
  margin: .5rem;
  text-align: center;
  align-items: center;
}
.card:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 25px rgba(0,0,0,.1);
}
</style>