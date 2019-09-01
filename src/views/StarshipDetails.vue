<template>
  <b-row>
    <b-col>
      <div class="text-center" v-if="$store.state.isLoading">
        <b-spinner variant="primary" label="Text Centered"></b-spinner>
      </div>
      <div v-else class="text-center">
        <h1>{{shipDetails.name}}</h1>
        <p><b>Model:</b>{{shipDetails.model}}</p>
        <p><b>Manufacturer:</b>{{shipDetails.manufacturer}}</p>
        <p><b>Cost(in credits):</b>{{shipDetails.cost_in_credits}} </p>
        <p><b>Crew:</b>{{shipDetails.crew}}</p>
        <p><b>Hyperdrive Rating:</b>{{shipDetails.hyperdrive_rating}}</p>
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'starshipDetails',
  data () {
    return {
      shipDetails: {}
    }
  },
  created () {
    this.$store.commit('setLoading', true)
    this.axios.get(`https://swapi.co/api/starships/${this.$route.params.id}`)
    .then(response => {
      this.shipDetails = response.data
      this.$store.commit('setLoading', false)
    })
    .catch(e => {
      console.log(e)
    })
  }
}
</script>