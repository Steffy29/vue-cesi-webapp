<template>
  <b-modal id="beer-detail-modal" :title="title" size="lg">
    <b-card v-if="beer !== null"
      :img-src="`http://localhost:3000/${beer.label}`"
      bg-variant="dark" text-variant="white"
      img-height="250" img-top>
      <b-row>
        <b-col>
          <img :src="`http://localhost:3000/${beer.img}`">
        </b-col>
        <b-col>
          <b-row>
            <b class="mr-1">Description : </b>{{beer.description}}
          </b-row>
          <b-row>
            <b class="mr-1">Brasseur : </b><span>{{beer.brewery}}</span>
          </b-row>
          <b-row>
            <b class="mr-1">Service : </b>{{beer.serving}}
          </b-row>
          <b-row>
            <b class="mr-1">Disponibilité : </b> {{beer.availability}}
          </b-row>
          <b-row>
            <b class="mr-1">Alcool : </b>{{beer.alcohol}} %
          </b-row>
          <b-row>
            <b class="mr-1">Type : </b>{{beer.style}}
          </b-row>
        </b-col>
      </b-row>
    </b-card>
  </b-modal>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BeerDetail',
  props: {
    id: String,
  },
  data() {
    return {
      beer: null,
      title: null,
    };
  },
  methods: {
    getBeerDetail() {
      if (this.id) {
        const url = 'http://localhost:3000/beer/' + this.id;
        axios.get(url).then((response) => {
          this.beer = response.data;
          this.title = `Détail de la bière ${this.beer.name}`;
        }).catch((error) => console.log('error', error));
      }
    },
  },
  watch: {
    id() {
      this.getBeerDetail();
    }
  }
}
</script>
