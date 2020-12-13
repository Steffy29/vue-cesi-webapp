<template>
  <div>
    <b-card>
      <b-row>
        <b-col>
          <b-form-group label="Classes">
            <b-form-select v-model="selectedClass" :options="classes" @change="getListByClass">
              <template #first>
                <b-form-select-option :value="null" disabled>-- Sélectionner une classe --</b-form-select-option>
              </template>
            </b-form-select>          
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Sets">
            <b-form-select v-model="selectedSet" :options="sets" @change="getListBySet">
              <template #first>
                <b-form-select-option :value="null" disabled>-- Sélectionner un set --</b-form-select-option>
              </template>
            </b-form-select>          
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Factions">
            <b-form-select v-model="selectedFaction" :options="factions" @change="getListByFaction">
              <template #first>
                <b-form-select-option :value="null" disabled>-- Sélectionner une faction --</b-form-select-option>
              </template>
            </b-form-select>          
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="Qualités">
            <b-form-select v-model="selectedQuality" :options="qualities" @change="getListByQuality">
              <template #first>
                <b-form-select-option :value="null" disabled>-- Sélectionner une qualité --</b-form-select-option>
              </template>
            </b-form-select>          
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Races">
            <b-form-select v-model="selectedRace" :options="races" @change="getListByRace">
              <template #first>
                <b-form-select-option :value="null" disabled>-- Sélectionner une race --</b-form-select-option>
              </template>
            </b-form-select>          
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Types">
            <b-form-select v-model="selectedType" :options="types" @change="getListByType">
              <template #first>
                <b-form-select-option :value="null" disabled>-- Sélectionner un type --</b-form-select-option>
              </template>
            </b-form-select>          
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>

    <b-form inline>
      <label class="mr-sm-2">Nom de carte</label>
      <b-form-input v-model="selectName" placeholder="Nom recherché"></b-form-input>
      <b-button @click="search">
        <b-icon icon="search"></b-icon>
      </b-button>
    </b-form>

    <b-card>
      <b-table
        show-empty
        :items="items"
        :fields="fields" 
        :current-page="currentPage"
        :per-page="perPage"
      >
        <template #cell(action)="data">
          <b-button size="sm" @click="showDetail(data.item)" class="mr-1">
            <b-icon icon="search"></b-icon>
          </b-button>
        </template>
      </b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="fill"
        size="sm"
        class="my-0"
      ></b-pagination>
    </b-card>

    <card-detail :card-name="cardName"></card-detail>
  </div>
</template>

<script>
import axios from 'axios'
import CardDetail from '@/components/Hearthstone/CardDetail.vue'

export default {
  name: 'Hearthstone',
  components: {
    CardDetail,
  },
  data() {
    return {
      classes: [],
      selectedClass: null,
      sets: [],
      selectedSet: null,
      factions: [],
      selectedFaction: null,
      qualities: [],
      selectedQuality: null,
      races: [],
      selectedRace: null,
      types: [],
      selectedType: null,
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
      items: [],
      fields: [
        {key: 'name', label: 'Nom'},
        {key: 'cardSet', label: 'Set'},
        {key: 'type', label: 'Type'},
        {key: 'health', label: 'Santé'},
        {key: 'text', label: 'Description'},
        {key: 'playerClass', label: 'Classe'},
        'Action',
      ],
      selectName: null,
      cardName: null,
    }
  },
  mounted() {
    const options = {
      method: 'GET',
      url: 'https://omgvamp-hearthstone-v1.p.rapidapi.com/info',
      headers: {
        'x-rapidapi-key': '72bd0046c3msh0492af774edf564p1d3f03jsn26388eeca5ac',
        'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
      }
    }

    axios.request(options).then((response) => {
      console.log(response.data)
      this.classes = response.data.classes
      this.sets = response.data.sets
      this.factions = response.data.factions
      this.qualities = response.data.qualities
      this.races = response.data.races
      this.types = response.data.types
    }).catch((error) => {
      console.error(error)
    })
  },
  methods: {
    getListByClass() {
      if (this.selectedClass === null) {
        return false
      }
      const options = {
        method: 'GET',
        url: `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/classes/${this.selectedClass}`,
        headers: {
          'x-rapidapi-key': '72bd0046c3msh0492af774edf564p1d3f03jsn26388eeca5ac',
          'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
        }
      }

      axios.request(options).then((response) => {
        console.log(response.data)
        this.items = response.data
        this.totalRows = this.items.length
      }).catch((error) => {
        console.log(error)
      })
    },
    getListByQuality() {
      if (this.selectedQuality === null) {
        return false
      }
      const options = {
        method: 'GET',
        url: `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/qualities/${this.selectedQuality}`,
        headers: {
          'x-rapidapi-key': '72bd0046c3msh0492af774edf564p1d3f03jsn26388eeca5ac',
          'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
        }
      }

      axios.request(options).then((response) => {
        console.log(response.data)
        this.items = response.data
        this.totalRows = this.items.length
      }).catch((error) => {
        console.log(error)
      })
    },
    getListByRace() {
      if (this.selectedRace === null) {
        return false
      }
      const options = {
        method: 'GET',
        url: `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/races/${this.selectedRace}`,
        headers: {
          'x-rapidapi-key': '72bd0046c3msh0492af774edf564p1d3f03jsn26388eeca5ac',
          'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
        }
      }

      axios.request(options).then((response) => {
        console.log(response.data)
        this.items = response.data
        this.totalRows = this.items.length
      }).catch((error) => {
        console.log(error)
      })
    },
    getListBySet() {
      if (this.selectedSet === null) {
        return false
      }
      const options = {
        method: 'GET',
        url: `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/sets/${this.selectedSet}`,
        headers: {
          'x-rapidapi-key': '72bd0046c3msh0492af774edf564p1d3f03jsn26388eeca5ac',
          'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
        }
      }

      axios.request(options).then((response) => {
        console.log(response.data)
        this.items = response.data
        this.totalRows = this.items.length
      }).catch((error) => {
        console.log(error)
      })
    },
    getListByFaction() {
      if (this.selectedFaction === null) {
        return false
      }
      const options = {
        method: 'GET',
        url: `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/factions/${this.selectedFaction}`,
        headers: {
          'x-rapidapi-key': '72bd0046c3msh0492af774edf564p1d3f03jsn26388eeca5ac',
          'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
        }
      }

      axios.request(options).then((response) => {
        console.log(response.data)
        this.items = response.data
        this.totalRows = this.items.length
      }).catch((error) => {
        console.log(error)
      })
    },
    getListByType() {
      if (this.selectedType === null) {
        return false
      }
      const options = {
        method: 'GET',
        url: `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/types/${this.selectedType}`,
        headers: {
          'x-rapidapi-key': '72bd0046c3msh0492af774edf564p1d3f03jsn26388eeca5ac',
          'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
        }
      }

      axios.request(options).then((response) => {
        console.log(response.data)
        this.items = response.data
        this.totalRows = this.items.length
      }).catch((error) => {
        console.log(error)
      })
    },
    search() {
      if (this.selectName === null) {
        return false
      }
      const options = {
        method: 'GET',
        url: `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/search/${this.selectName}`,
        headers: {
          'x-rapidapi-key': '72bd0046c3msh0492af774edf564p1d3f03jsn26388eeca5ac',
          'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
        }
      }

      axios.request(options).then((response) => {
        console.log(response.data)
        this.items = response.data
        this.totalRows = this.items.length
      }).catch((error) => {
        console.log(error)
      })
    },
    showDetail(item) {
      console.log('show detail',item)
      this.cardName = item.name
      this.$bvModal.show('card-detail-modal')
    },
  }
}
</script>

<style>

</style>