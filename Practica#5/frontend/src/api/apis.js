import axios from 'axios'

const API = 'http://localhost:3000/api/medicamento'

export const getMedicamentos = async() => {
    try {
        const response = await axios.get(API)
        return response.data;
    } catch (error) {
        console.error(error)
        return []
    }
}

export const AgregarMedicamento = async(medicamento) => {
    try {
        const response = await axios.post(API, medicamento);

        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const ActualizarMedicamentos = async(medicamento) => {
    try {
        const response = await axios.put(`${API}/${medicamento.id_medicamento}`, medicamento);

        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const EliminarMedicamentos = async(id) => {
    try {
        const response = await axios.delete(`${API}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}