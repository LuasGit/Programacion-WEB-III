<template>
  <div>
    <h3>Países</h3>

    <button class="btn btn-primary mb-3" @click="mostrarFormulario = true; editarPais = null; resetFormulario()">Agregar País</button>

    <div v-if="mostrarFormulario" class="card p-3 mb-3">
      <form @submit.prevent="editarPais ? actualizarPais() : crearPais()">
        <div class="mb-2">
          <label>Nombre</label>
          <input v-model="form.nombre" type="text" class="form-control" />
          <small class="text-danger" v-if="errores.nombre">{{ errores.nombre }}</small>
        </div>
        <div class="mb-2">
          <label>Capital</label>
          <input v-model="form.capital" type="text" class="form-control" />
          <small class="text-danger" v-if="errores.capital">{{ errores.capital }}</small>
        </div>
        <div class="mb-2">
          <label>Continente</label>
          <input v-model="form.continente" type="text" class="form-control" />
          <small class="text-danger" v-if="errores.continente">{{ errores.continente }}</small>
        </div>

        <button type="submit" class="btn btn-success">{{ editarPais ? 'Actualizar' : 'Crear' }}</button>
        <button type="button" class="btn btn-secondary ms-2" @click="cancelar()">Cancelar</button>
      </form>
    </div>

    <table class="table table-bordered">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Capital</th>
          <th>Continente</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pais in paises" :key="pais.id_pais">
          <td>{{ pais.id_pais }}</td>
          <td>{{ pais.nombre }}</td>
          <td>{{ pais.capital }}</td>
          <td>{{ pais.continente }}</td>
          <td>
            <button class="btn btn-warning btn-sm" @click="editar(pais)">Editar</button>
            <button class="btn btn-danger btn-sm ms-1" @click="eliminar(pais.id_pais)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const paises = ref([]);
const mostrarFormulario = ref(false);
const editarPais = ref(null);
const errores = ref({});

const form = ref({
  nombre: '',
  capital: '',
  continente: ''
});

const validar = () => {
  errores.value = {};
  const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,100}$/;
  const capitalRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,100}$/;
  const continenteRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,100}$/;

  let valido = true;

  if (!nombreRegex.test(form.value.nombre)) {
    errores.value.nombre = 'Nombre debe tener solo letras, espacios y acentos (2-100 caracteres)';
    valido = false;
  }
  if (!capitalRegex.test(form.value.capital)) {
    errores.value.capital = 'Capital debe tener solo letras, espacios y acentos (2-100 caracteres)';
    valido = false;
  }
  if (!continenteRegex.test(form.value.continente)) {
    errores.value.continente = 'Continente debe tener solo letras, espacios y acentos (2-100 caracteres)';
    valido = false;
  }
  return valido;
};

const cargarPaises = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/paises');
    paises.value = res.data;
  } catch (_error) {
    console.error(_error);
  }
};

const resetFormulario = () => {
  form.value = { nombre: '', capital: '', continente: '' };
  errores.value = {};
};

const crearPais = async () => {
  if (!validar()) return;

  try {
    await axios.post('http://localhost:3000/api/paises', form.value);
    resetFormulario();
    mostrarFormulario.value = false;
    cargarPaises();
  } catch (error) {
    console.error(error);
    alert('Error al crear país');
  }
};

const editar = (pais) => {
  editarPais.value = pais;
  form.value = { ...pais };
  mostrarFormulario.value = true;
};

const actualizarPais = async () => {
  if (!validar()) return;

  try {
    await axios.put(`http://localhost:3000/api/paises/${editarPais.value.id_pais}`, form.value);
    resetFormulario();
    mostrarFormulario.value = false;
    editarPais.value = null;
    cargarPaises();
  } catch (error) {
    console.error(error);
    alert('Error al actualizar país');
  }
};

const eliminar = async (id) => {
  if (confirm('¿Seguro que deseas eliminar este país?')) {
    try {
      await axios.delete(`http://localhost:3000/api/paises/${id}`);
      cargarPaises();
    } catch (error) {
      console.error(error);
      alert('Error al eliminar país');
    }
  }
};

const cancelar = () => {
  resetFormulario();
  mostrarFormulario.value = false;
  editarPais.value = null;
};

onMounted(() => {
  cargarPaises();
});
</script>
