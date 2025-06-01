<template>
  <div>
    <h3>Ciudades</h3>

    <button class="btn btn-primary mb-3" @click="mostrarFormulario = true; editarCiudad = null; resetFormulario()">Agregar Ciudad</button>

    <div v-if="mostrarFormulario" class="card p-3 mb-3">
      <form @submit.prevent="editarCiudad ? actualizarCiudad() : crearCiudad()">
        <div class="mb-2">
          <label>Nombre</label>
          <input v-model="form.nombre" type="text" class="form-control" />
          <small class="text-danger" v-if="errores.nombre">{{ errores.nombre }}</small>
        </div>
        <div class="mb-2">
          <label>Población</label>
          <input v-model.number="form.poblacion" type="number" min="1" class="form-control" />
        </div>
        <div class="mb-2">
          <label>Región</label>
          <input v-model="form.region" type="text" class="form-control" />
          <small class="text-danger" v-if="errores.region">{{ errores.region }}</small>
        </div>
        <div class="mb-2">
          <label>País</label>
          <select v-model="form.id_pais" class="form-select">
            <option disabled value="">Seleccione un país</option>
            <option v-for="pais in paises" :key="pais.id_pais" :value="pais.id_pais">{{ pais.nombre }}</option>
          </select>
        </div>

        <button type="submit" class="btn btn-success">{{ editarCiudad ? 'Actualizar' : 'Crear' }}</button>
        <button type="button" class="btn btn-secondary ms-2" @click="cancelar()">Cancelar</button>
      </form>
    </div>

    <table class="table table-bordered">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Población</th>
          <th>Región</th>
          <th>País</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ciudad in ciudades" :key="ciudad.id_ciudad">
          <td>{{ ciudad.id_ciudad }}</td>
          <td>{{ ciudad.nombre }}</td>
          <td>{{ ciudad.poblacion }}</td>
          <td>{{ ciudad.region }}</td>
          <td>{{ obtenerNombrePais(ciudad.id_pais) }}</td>
          <td>
            <button class="btn btn-warning btn-sm" @click="editar(ciudad)">Editar</button>
            <button class="btn btn-danger btn-sm ms-1" @click="eliminar(ciudad.id_ciudad)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const ciudades = ref([]);
const paises = ref([]);
const mostrarFormulario = ref(false);
const editarCiudad = ref(null);
const errores = ref({});

const form = ref({
  nombre: '',
  poblacion: 0,
  region: '',
  id_pais: ''
});

const resetFormulario = () => {
  form.value = { nombre: '', poblacion: 0, region: '', id_pais: '' };
  errores.value = {};
};

const validar = () => {
  errores.value = {};
  const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,100}$/;
  const regionRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{4,100}$/;
  let valido = true;

  if (!nombreRegex.test(form.value.nombre)) {
    errores.value.nombre = 'Nombre debe tener solo letras, espacios y acentos (3-100 caracteres)';
    valido = false;
  }
  if (!regionRegex.test(form.value.region)) {
    errores.value.region = 'Región debe tener solo letras, espacios y acentos (4-100 caracteres)';
    valido = false;
  }
  if (!form.value.id_pais) {
    alert('Debe seleccionar un país');
    valido = false;
  }
  return valido;
};

const cargarCiudades = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/ciudades');
    ciudades.value = res.data;
  } catch (error) {
    console.error(error);
  }
};

const cargarPaises = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/paises');
    paises.value = res.data;
  } catch (error) {
    console.error(error);
  }
};

const crearCiudad = async () => {
  if (!validar()) return;

  try {
    await axios.post('http://localhost:3000/api/ciudades', form.value);
    resetFormulario();
    mostrarFormulario.value = false;
    cargarCiudades();
  } catch (error) {
    console.error(error);
    alert('Error al crear ciudad');
  }
};

const actualizarCiudad = async () => {
  if (!validar()) return;

  try {
    await axios.put(`http://localhost:3000/api/ciudades/${editarCiudad.value.id_ciudad}`, form.value);
    resetFormulario();
    mostrarFormulario.value = false;
    editarCiudad.value = null;
    cargarCiudades();
  } catch (error) {
    console.error(error);
    alert('Error al actualizar ciudad');
  }
};

const eliminar = async (id) => {
  if (confirm('¿Seguro que deseas eliminar esta ciudad?')) {
    try {
      await axios.delete(`http://localhost:3000/api/ciudades/${id}`);
      cargarCiudades();
    } catch (error) {
      console.error(error);
      alert('Error al eliminar ciudad');
    }
  }
};

const cancelar = () => {
  resetFormulario();
  mostrarFormulario.value = false;
  editarCiudad.value = null;
};

const editar = (ciudad) => {
  editarCiudad.value = ciudad;
  form.value = { ...ciudad };
  mostrarFormulario.value = true;
};

const obtenerNombrePais = (id_pais) => {
  const pais = paises.value.find(p => p.id_pais === id_pais);
  return pais ? pais.nombre : '';
};

onMounted(() => {
  cargarPaises();
  cargarCiudades();
});
</script>
