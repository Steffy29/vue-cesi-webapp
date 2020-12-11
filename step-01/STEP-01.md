# Step 01

Fichier à modifier : Meteo.vue

## Plan

1. Récupération de la météo d'une ville
2. Affichage du résultat dans l'écran
3. Récupération de la météo à 5 jours d'une ville
4. Affichage dans un tableau

## Récupération de la météo d'une ville

On va se baser sur l'API de [OpenWeatherMap](https://openweathermap.org/) sur laquelle vous aurez créé un compte préalablement. 


### Mise à jour du template

Ajouter les infos suivantes :

```vue
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
  </div>
</template>
```

### Mise à jour du script

Ajouter les infos suivantes :

```vue
<script>
import axios from 'axios'

export default {
  name: 'Meteo',
  data() {
    return {
      city: '',
      error: '',
    }
  },
  methods: {
    search() {
      this.error = ''
      this.getDayMeteo()
    },
    getDayMeteo() {
      const appid = 'votre_app_id'
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${appid}`
      axios.get(url).then((response) => {
        console.log(response.data)
      }).catch((error) => {
        this.error = error
      })
    },
  },
}
</script>
```

### Mise à jour du style

Ajouter les infos suivantes :

```vue
<style>
.meteo {
  margin: 20px;
}
</style>
```

## Affichage du résultat dans l'écran

Maintenant qu'on a récupéré les infos, on va afficher le résultat dans l'écran.

### Mise à jour de l'écran

Ajouter les infos suivantes après `</b-form>` :

```html
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
```

### Mise à jour du script

Ajouter les infos suivantes :

```js
  data() {
    return {
      city: '',
      icon: '',
      temp: '',
      feelsLike: '',
      humidity: '',
      error: '',
    }
  },
```

ainsi que :

```js
    getDayMeteo() {
      this.icon = ''
      this.temp = ''
      const appid = 'votre_app_id'
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${appid}`
      axios.get(url).then((response) => {
        const data = response.data
        this.temp = data.main.temp
        this.feelsLike = data.main.feels_like
        this.icon = `wi-owm-${data.weather[0].id}`
        this.humidity = data.main.humidity
      }).catch((error) => {
        this.error = error
      })
    },
```

### Mise à jour du style

Ajouter les infos suivantes :

```css
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
```

## Récupération de la météo à 5 jours d'une ville

### Mise à jour du script

Ajouter les infos suivantes :

```js
    // dans data(), ajouter
      displayMeteo: false,
```

```js
    search() {
      this.error = ''
      this.dayMeteo()
      this.forecastMeteo()
    },
```

```js
    forecastMeteo() {
      const appid = 'votre_appid'
      const url = `http://api.openweathermap.org/data/2.5/forecast?q=${this.city}&units=metric&appid=${appid}`
      axios.get(url).then((response) => {
        console.log(response.data)
      })
    }
```

## Affichage dans un tableau

### Mise à jour de l'écran

Ajouter les infos suivantes :

```html
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
```

### Mise à jour du script

Ajouter le package moment :

```sh
$ yarn add moment
```

Ajouter les infos suivantes :

```js
import moment from 'moment'
```

```js
    // à ajouter dans data()
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
```

```js
    forecastMeteo() {
      const appid = 'votre_appid'
      const url = `http://api.openweathermap.org/data/2.5/forecast?q=${this.city}&units=metric&appid=${appid}`
      axios.get(url).then((response) => {
        console.log(response.data)
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
    }
```

## Pour aller plus loin

Voici des améliorations possibles à apporter au composant Meteo :

- mise en place des traductions pour les libellés
- ajout d'une pagination pour la présentation du tableau de résultats