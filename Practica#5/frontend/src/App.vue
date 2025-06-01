<template>
  <div class="container mt-4">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <button class="nav-link" :class="{active: activeTab === 'paises'}" @click="activeTab = 'paises'">Países</button>
      </li>
      <li class="nav-item">
        <button class="nav-link" :class="{active: activeTab === 'ciudades'}" @click="activeTab = 'ciudades'">Ciudades</button>
      </li>
    </ul>

    <div class="mt-3">
      <ListaPaises v-if="activeTab === 'paises'" />
      <ListaCiudades v-if="activeTab === 'ciudades'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ListaPaises from './components/ListaPaises.vue';
import ListaCiudades from './components/ListaCiudades.vue';

const activeTab = ref('paises');
</script>
