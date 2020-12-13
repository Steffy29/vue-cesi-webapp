# Step 02

Fichier à modifier : Beers.vue

## Plan

1. Récupération de la liste des bières
2. Affichage des images dans la liste
3. Affichage du détail d'une bière sélectionnée
4. Finalisation de l'affichage

## Récupération de la liste des bières

Lors des tests, ne pas oublier de lancer le projet [Express Beers](https://steffy29.github.io/posts/2019/02/02/express-beers.html).

```sh
node index.js

Listening at http://:::3000
```

### Mise à jour de l'écran

Ajouter les infos suivantes :

```vue
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
  </div>
</template>
```

### Mise à jour du script

Ajouter les infos suivantes :

```vue
<script>
import axios from 'axios';

export default {
  name: 'Beers',
  data() {
    return {
      beersList: [], // liste des bières affichées dans le tableau
      fields: [ // définition des champs du tableau avec le nom des colonnes, leur clé et si on veut les trier
        { key: 'img', label: 'Image', sortable: false },
        { key: 'name', label: 'Nom', sortable: true },
        { key: 'description', sortable: false },
        { key: 'alcohol', label: '° Alcool', sortable: true },
        { key: 'actions', label: 'Actions' },
      ],
      totalRows: 0, // total des résultats remontés
      currentPage: 1, // numéro de la page courante
      perPage: 5, // nombre de lignes affichées par page
    };
  },
  // méthode appelée lorsque le composant est chargé dans l'application
  mounted() {
    this.getBeersList();
  },
  methods: {
    getBeersList() { 
      // URL pour appeler l'API pour récupérer la liste des bières
      const url = 'http://localhost:3000/beers';
      // Appel de l'API à l'aide d'Axios
      axios.get(url).then((response) => {
        // Initialisation de la liste de bières avec le retour de l'API
        this.beersList = response.data;
        this.totalRows = this.beersList.length;
      }).catch((error) => console.log('error', error));
    },
  },
}
</script>
```

### Mise à jour du style

Ajouter les infos suivantes :

```css
.beers-list {
  text-align: center;
}
```

## Affichage des images dans la liste

Mettre à jour le code pour afficher les images :

```html
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
    </b-table>
```

## Affichage du détail d'une bière sélectionnée

Créer un nouveau composant `BeerDetail.vue` dans le dossier `components/Beers`.

### Mise à jour du nouveau composant

Ajouter les infos suivantes :

```vue
<template>
  <b-modal id="beer-detail-modal" :title="title" size="lg">
  </b-modal>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BeerDetail',
  // Id passé depuis l'écran BeersList
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
    // Récupération du détail d'une bière
    getBeerDetail() {
      if (this.id) {
        const url = 'http://localhost:3000/beer/' + this.id;
        axios.get(url).then((response) => {
          this.beer = response.data;
          // Mise à jour du titre de la modale
          this.title = `Détail de la bière ${this.beer.name}`;
        }).catch((error) => console.log('error', error));
      }
    },
  },
  // Permet de détecter les changements des variables
  watch: {
    id() {
      // Dès que l'id de la bière sélectionnée change, on charge le détail
      this.getBeerDetail();
    }
  }
}
</script>
```

### Intégration du composant dans la liste

Modifier le code de `Beers.vue` de la faàon suivante :

```vue
<template>
  <div class="beers-list">
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
      ></b-pagination>
    </b-col>

    <beer-detail :id="beerId"></beer-detail>
  </div>
</template>
```

```vue
<script>
import axios from 'axios';
import BeerDetail from '@components/Beers/BeerDetail.vue';

export default {
  name: 'BeersList',
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
      totalRows: 1,
      currentPage: 1,
      perPage: 4,
      beerId: null,
    };
  },
  mounted() {
    this.getBeersList();
  },
  methods: {
    getBeersList() {
      const url = 'http://localhost:3000/beers';
      axios.get(url).then((response) => {
        this.beersList = response.data
        this.totalRows = this.beersList.length
      }).catch((error) => console.log('error', error))
    },
    getBeerDetail(item) {
      this.beerId = item.id
      this.$bvModal.show('beer-detail-modal')
    },
  },
}
</script>
```

### Finalisation de l'affichage

Modifier l'affichage du composant `BeerDetail.vue` pour finaliser son affichage :

```vue
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
```