import { Router } from 'express';
import * as paisController from '../controllers/PaisController.js';
import * as ciudadController from '../controllers/CiudadController.js';

const router = Router();

router.get('/paises', paisController.getPaises);
router.post('/paises', paisController.createPais);
router.put('/paises/:id', paisController.updatePais);
router.delete('/paises/:id', paisController.deletePais);

router.get('/ciudades', ciudadController.getCiudades);
router.post('/ciudades', ciudadController.createCiudad);
router.put('/ciudades/:id', ciudadController.updateCiudad);
router.delete('/ciudades/:id', ciudadController.deleteCiudad);

export default router;
