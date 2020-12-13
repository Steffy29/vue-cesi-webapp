# Step 03

Fichier à modifier : Hearthstone.vue

## Plan

1. Etude de l'API de Hearthstone
2. Construction des listes déroulantes
3. Construction du tableau
4. Recherche par classe
5. Recherche par race
6. Recherche par set
7. Recherche par qualité
8. Recherche par type
9. Recherche par faction
10. Recherche par nom
11. Détail d'une carte

## Etude de l'API de Hearthstone

Tout d'abord, on va créer un compte sur [Rapid API](https://rapidapi.com/marketplace) pour pouvoir accéder à l'[API d'Hearthstone](https://rapidapi.com/omgvamp/api/hearthstone/endpoints).

Une fois le compte créé, nous allons étudier les endpoints de l'API à notre disposition :
- GET Info : Returns a list of current patch, classes, sets, types, factions, qualities, races and locales.
- GET All Cards : Returns all available Hearthstone cards including non collectible cards.
- GET Single Card : Returns card by name or ID. This may return more then one card if they share the same name. Loatheb returns both the card and the boss.
- GET Card Set : Returns all cards in a set. Example values: Blackrock Mountain, Classic.
- GET Cards by Class : Returns all the cards of a class. Example values: Mage, Paladin.
- GET Cards by Race : Returns all the cards of a certain race. Example values: Mech, Murloc.
- GET Cards by Quality : Returns all the cards of a certain quality. Example values: Legendary, Common.
- GET Cards by Type : Returns all the cards of a certain type. Example values: Spell, Weapon.
- GET Cards by Faction : Returns all the cards of a certain faction. Example values: Horde, Neutral.
- GET Card Search : Returns cards by partial name.
- GET Card Backs : Returns a list of all the card backs.

## Construction des listes déroulantes

Dans un premier temps, on va intégrer l'API qui sera appelée lors du chargement de l'écran pour récupérer les infos qeue l'on mettra dans les liste déroulantes :

```vue
<script>
import axios from 'axios'
export default {
  name: 'Hearthstone',
  mounted() {
    const options = {
      method: 'GET',
      url: 'https://omgvamp-hearthstone-v1.p.rapidapi.com/info',
      headers: {
        'x-rapidapi-key': '72bd0046c3msh0492af774edf564p1d3f03jsn26388eeca5ac',
        'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }
}
</script>
```

Mettre chaque donnée dont on aura besoin dans les listes déroulantes dans des objets :

```js
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
```

Affichons tous ces éléments dans des listes déroulantes :

```vue
<template>
  <div>
    <b-card>
      <b-row>
        <b-col>
          <b-form-group label="Classes">
            <b-form-select v-model="selectedClass" :options="classes">
              <template #first>
                <b-form-select-option :value="null" disabled>-- Sélectionner une classe --</b-form-select-option>
              </template>
            </b-form-select>          
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Sets">
            <b-form-select v-model="selectedSet" :options="sets">
              <template #first>
                <b-form-select-option :value="null" disabled>-- Sélectionner un set --</b-form-select-option>
              </template>
            </b-form-select>          
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Factions">
            <b-form-select v-model="selectedFaction" :options="factions">
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
            <b-form-select v-model="selectedQuality" :options="qualities">
              <template #first>
                <b-form-select-option :value="null" disabled>-- Sélectionner une qualité --</b-form-select-option>
              </template>
            </b-form-select>          
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Races">
            <b-form-select v-model="selectedRace" :options="races">
              <template #first>
                <b-form-select-option :value="null" disabled>-- Sélectionner une race --</b-form-select-option>
              </template>
            </b-form-select>          
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Types">
            <b-form-select v-model="selectedType" :options="types">
              <template #first>
                <b-form-select-option :value="null" disabled>-- Sélectionner un type --</b-form-select-option>
              </template>
            </b-form-select>          
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>
```

## Construction du tableau

Les résultats seront présentés dans un tableau avec une pagination, un affichage de 10 lignes par page :

```html
    <b-card>
      <b-table
        show-empty
        :items="items"
        :fields="fields" 
        :current-page="currentPage"
        :per-page="perPage"
      >
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
```

Ajouter les variables :

```js
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
      ],
```

## Recherche par classe

Lorsqu'on sélectionne une classe, on fait appel à l'API pour récupérer la liste des cartes correspondante à cette classe.

Modifier l'écran :

```html
<b-form-select v-model="selectedClass" :options="classes" @change="getListByClass">
```

Implémenter la méthode `getListByClass()` :

```js
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
  },
```

## Recherche par race

Lorsqu'on sélectionne une race, on fait appel à l'API pour récupérer la liste des cartes correspondante à cette race.

Modifier l'écran :

```html
<b-form-select v-model="selectedRace" :options="races" @change="getListByRace">
```

Implémenter la méthode `getListByRace()` :

```js
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
```

## Recherche par set

Lorsqu'on sélectionne un set, on fait appel à l'API pour récupérer la liste des cartes correspondante à ce set.

Modifier l'écran :

```html
<b-form-select v-model="selectedSet" :options="sets" @change="getListBySet">
```

Implémenter la méthode `getListBySet()` :

```js
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
```

## Recherche par qualité

Lorsqu'on sélectionne une qualité, on fait appel à l'API pour récupérer la liste des cartes correspondante à cette qualité.

Modifier l'écran :

```html
<b-form-select v-model="selectedQuality" :options="qualities" @change="getListByQuality">
```

Implémenter la méthode `getListByQuality()` :

```js
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
```

## Recherche par type

Lorsqu'on sélectionne un type, on fait appel à l'API pour récupérer la liste des cartes correspondante à ce type.

Modifier l'écran :

```html
<b-form-select v-model="selectedType" :options="types" @change="getListByType">
```

Implémenter la méthode `getListByType()` :

```js
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
```

## Recherche par faction

Lorsqu'on sélectionne une faction, on fait appel à l'API pour récupérer la liste des cartes correspondante à cette faction.

Modifier l'écran :

```html
<b-form-select v-model="selectedFaction" :options="factions" @change="getListByFaction">
```

Implémenter la méthode `getListByFaction()` :

```js
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
```

## Recherche par nom

Lorsqu'on sait un nom de carte, on appelle l'API pour récupérer la liste des cartes correspondante à ce nom.

Modifier l'écran :

```html
    <b-form inline>
      <label class="mr-sm-2">Nom de carte</label>
      <b-form-input v-model="selectName" placeholder="Nom recherché"></b-form-input>
      <b-button @click="search">
        <b-icon icon="search"></b-icon>
      </b-button>
    </b-form>
```

Implémenter la méthode `search()` après avoir ajouté la variable `selectName: null,` :

```js
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
```

## Détail d'une carte

Pour le détail d'une carte, on va créer une modale qui sera affichée lorsqu'on cliquera sur le bouton sur une des lignes du tableau.

Créer un nouveau composant `CardDetail.vue` dans le dossier `components/Hearthstone`

```vue
<template>
  <b-modal id="card-detail-modal" :title="cardName" size="lg">
    
  </b-modal>
</template>
```

Ajouter la récupération des infos de la carte sélectionnée :

```vue
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
```

Brancher les éléments dans `Hearthstone.vue` :

```html
        <template #cell(action)="data">
          <b-button size="sm" @click="showDetail(data.item)" class="mr-1">
            <b-icon icon="search"></b-icon>
          </b-button>
        </template>
```

ainsi que la modale :

```html
    <card-detail :card-name="cardName"></card-detail>
```

Modifier le script :

```js
import CardDetail from '@/components/Hearthstone/CardDetail.vue'
```

```js
  components: {
    CardDetail,
  },
```

```js
      cardName: null,
```

```js
    showDetail(item) {
      console.log('show detail',item)
      this.cardName = item.name
      this.$bvModal.show('card-detail-modal')
    },
```

Compléter l'affichage dans la modale :

```html
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
          </b-row>
        </b-col>
      </b-row>
    </b-card>    
```

Compléter en fonction de ce que vous voulez afficher dans la modale, à vous de faire preuve d'inventivité.
