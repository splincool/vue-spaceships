<template>
  <b-row class="flex-column">
    <b-col>
      <div class="d-flex mb-3">
        <b-input-group class="mt-3">
          <b-form-input
            @keydown.enter="search"
            v-model="searchValue" 
            placeholder="Search">
          </b-form-input>
          <b-input-group-append>
            <b-button @click="search">Search</b-button>
          </b-input-group-append>
        </b-input-group>
      </div>
    </b-col>
    <b-col>
      <div class="text-center" v-if="$store.state.isLoading">
        <b-spinner variant="primary" label="Text Centered"></b-spinner>
      </div>
      <b-card-group v-else deck class="justify-content-center">
        <ShipCard
          v-for="(item, index) in ships.results" :key="index"
          :item=item
        />
      </b-card-group>
    </b-col>
    <b-col>
      <div class="pagination-block text-center" v-if="ships">
        <b-button 
          :disabled="!ships.previous"  
          class="mr-3"
          @click="prevPage()">Prev</b-button>
        <b-button 
          :disabled="!ships.next" 
          @click="nextPage()">Next</b-button>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import ShipCard from './ShipCard'
export default {
  name: 'shipsList',
  data() {
    return {
      ships: [],
      searchValue: ''
    }
  },
  created () {
    let options = {}
    if (this.$route.query && this.$route.query.search) {
      options.isSearch = true
      options.queryValue = this.$route.query.search
    }
    this.doFetch(options)
  },
  methods: {
    search () {
      if (this.searchValue) {
        if (this.searchValue !== this.$route.query.search) {
          this.$router.replace({ name: "Home", query: {search: this.searchValue}})
          this.doFetch({isSearch: true})
        }
      } else if (this.searchValue === '' && this.$route.query.search) {
        this.$router.push({ name: "Home", query: false})
        this.doFetch({isSearch: false})
      }
    },
    doFetch (options) {
      let link = `https://swapi.co/api/starships`
      if (options) {
        if (options.link) {
          link = options.link
        } else if (options.isSearch) {
          if (options.queryValue) {
            this.searchValue = options.queryValue
          }
          link = `https://swapi.co/api/starships/?search=${this.searchValue}`
        }
      }
      this.$store.commit('setLoading', true)
      this.axios.get(link)
      .then(response => {
        this.ships = response.data
        this.$store.commit('setLoading', false)
      })
      .catch(e => {
        console.log(e)
      })
    },
    prevPage () {
      if (this.ships.previous) {
        this.doFetch({link: this.ships.previous})
      }
    },
    nextPage () {
      if (this.ships.next) {
        this.doFetch({link: this.ships.next})
      }
    }
  },
  components: {
    ShipCard
  }
}
</script>

<style>
  .pagination-block {
    margin-top: 15px;
  }
  @media only screen and (max-width: 1000px) {
    .card-deck {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
    }
  }
</style>