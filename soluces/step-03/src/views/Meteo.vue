<template>
  <div class="meteo">
    <b-alert show variant="danger" v-if="error">Une erreur s'est produite : {{error}}</b-alert>

    <b-form inline>
      <label class="mr-sm-2" for="input-city">Ville</label>
      <b-form-input id="input-city" v-model="city"></b-form-input>
      <b-button @click="search">
        <b-icon icon="search"></b-icon>
      </b-button>
    </b-form>

    <div class="weather" v-if="temp">
      <b-card no-body class="overflow-hidden" style="max-width: 640px;">
        <b-row>
          <b-col md="6">
            <i class="wi weather-icon" :class="icon"></i>
          </b-col>
          <b-col md="6">
            <b-card-body title="Températures">
              <b-card-text>
                <div>
                  <span class="weather-label">Réelle</span>
                  <span class="weather-temp">
                    {{temp}}
                    <i class="wi wi-celsius"></i>
                  </span>
                </div>
                <div>
                  <span class="weather-label">Ressentie</span>
                  <span class="weather-temp">
                    {{feelsLike}}
                    <i class="wi wi-celsius"></i>
                  </span>
                </div>
                <div>
                  <span class="weather-temp">
                    <i class="wi wi-humidity"></i>
                    {{humidity}}
                  </span>
                </div>
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </div>

    <div class="weather" v-if="displayMeteo">
      <h3>Météo à 5 jours</h3>
      <b-table hover striped bordered :items="items" :fields="fields">
        <template #cell(temp)="data">
          {{data.value}}
          <i class="wi wi-celsius"></i>
        </template>
        <template #cell(feelsLike)="data">
          {{data.value}}
          <i class="wi wi-celsius"></i>
        </template>
        <template #cell(humidity)="data">
          <i class="wi wi-humidity"></i>
          {{data.value}}
        </template>
        <template #cell(icon)="data">
          <i class="wi" :class="data.value"></i>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'Meteo',
  data() {
    return {
      city: '',
      icon: '',
      temp: '',
      feelsLike: '',
      humidity: '',
      error: '',
      items: [],
      fields: [
        'date', 
        {
          key: 'temp',
          label: 'Température réelle'
        },
        {
          key: 'feelsLike',
          label: 'Température ressentie'
        }, 
        {
          key: 'humidity',
          label: 'Humidité'
        },
        {
          key: 'icon',
          label: ''
        }, 
      ],
      displayMeteo: false,
    }
  },
  methods: {
    search() {
      this.error = ''
      this.getDayMeteo()
      this.forecastMeteo()
    },
    getDayMeteo() {
      const appid = '7dde7bb476d674e5ea93cd95e0e7e0a8'
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${appid}`
      axios.get(url).then((response) => {
        console.log(response.data)
        const data = response.data
        this.temp = data.main.temp
        this.feelsLike = data.main.feels_like
        this.icon = `wi-owm-${data.weather[0].id}`
        this.humidity = data.main.humidity
      }).catch((error) => {
        this.error = error
      })
    },
    forecastMeteo() {
      const appid = '7dde7bb476d674e5ea93cd95e0e7e0a8'
      const url = `http://api.openweathermap.org/data/2.5/forecast?q=${this.city}&units=metric&appid=${appid}`
      axios.get(url).then((response) => {
        const list = response.data.list
        list.forEach((el) => {
          console.log('date', el.dt_txt)
          const item = {
            date: moment(el.dt_txt).format('dddd, hh:mm'),
            temp: el.main.temp,
            feelsLike: el.main.feels_like,
            humidity: el.main.humidity,
            icon: `wi-owm-${el.weather[0].id}`,
          }
          this.items.push(item)
          this.displayMeteo = true
        })
      })
    },
  },
}
</script>

<style>
.meteo {
  margin: 20px;
}
.weather {
  margin-top: 20px;
}
.weather-temp {
  font-size: 32px;
}
.weather-label {
  font-size: 22px;
}
.weather-icon {
  font-size: 82px;
  margin-top: 30px;
  margin-left: 10px;
}
</style>