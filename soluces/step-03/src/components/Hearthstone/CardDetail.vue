<template>
  <b-modal id="card-detail-modal" :title="cardName" size="lg">
    <b-card>
      <b-row>
        <b-col v-if="cardDetail.img">
          <img :src="cardDetail.img">
        </b-col>
        <b-col>
          <b-row>
            <b-col>
              <span class="mr-1">Card ID : </span>{{cardDetail.cardId}}
            </b-col>
            <b-col>
              <span class="mr-1">Card Set : </span>{{cardDetail.cardSet}}
            </b-col>
            <b-col v-if="cardDetail.dbfId">
              {{cardDetail.dbfId}}
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <span class="mr-1">Type : </span>{{cardDetail.type}}
            </b-col>
            <b-col>
              <span class="mr-1">Faction : </span>{{cardDetail.faction}}
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-card>    
  </b-modal>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CardDetail',
  props: {
    cardName: String,
  },
  data() {
    return {
      cardDetail: {},
    }
  },
  methods: {
    getCardDetail() {
      const options = {
        method: 'GET',
        url: `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/${this.cardName}`,
        headers: {
          'x-rapidapi-key': '72bd0046c3msh0492af774edf564p1d3f03jsn26388eeca5ac',
          'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
        }
      }

      axios.request(options).then((response) => {
        console.log(response.data)
        this.cardDetail = response.data[0]
      }).catch((error) => {
        console.log(error)
      })

    }
  },
  watch: {
    cardName() {
      this.getCardDetail()
    }
  },
}
</script>

<style>

</style>