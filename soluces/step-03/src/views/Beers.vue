<template>
  <div class="beer-list">
    <h1>Liste des bières</h1>
    <b-table
      show-empty
      striped
      hover
      :items="beersList"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
    >
      <!-- Affichage de l'image associée au chemin -->
      <template #cell(img)="data">
        <img :src="`http://localhost:3000/${data.value}`" width="100">
      </template>

      <template #cell(actions)="data">
        <b-button size="sm" @click="getBeerDetail(data.item)" class="mr-1">
          <b-icon icon="search"></b-icon>
        </b-button>
      </template>
    </b-table>

    <b-col sm="7" md="6" class="my-1">
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="fill"
        size="sm"
        class="my-0"
      >
      </b-pagination>
    </b-col>

    <beer-detail :id="beerId"></beer-detail>
  </div>
</template>

<script>
import axios from 'axios';
import BeerDetail from '@/components/Beers/BeerDetail.vue';

export default {
  name: 'Beers',
  components: {
    BeerDetail,
  },
  data() {
    return {
      beersList: [],
      fields: [ 
        { key: 'img', label: 'Image', sortable: false },
        { key: 'name', label: 'Nom', sortable: true },
        { key: 'description', sortable: false },
        { key: 'alcohol', label: '° Alcool', sortable: true },
        { key: 'actions', label: 'Actions' },
      ],
      totalRows: 0,
      currentPage: 1,
      perPage: 5,
      beerId: null,    
    }
  },
  mounted() {
    this.getBeersList()
  },
  methods: {
    getBeersList() { 
      const url = 'http://localhost:3000/beers'
      axios.get(url).then((response) => {
        this.beersList = response.data;
        this.totalRows = this.beersList.length;
      }).catch((error) => console.log('error', error));
    },
    getBeerDetail(item) {
      this.beerId = item.id
      this.$bvModal.show('beer-detail-modal')
    },
  },
}
</script>

<style>
.beers-list {
  text-align: center;
}
</style>