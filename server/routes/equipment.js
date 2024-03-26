import express from 'express'
import * as equipmentController from "../controllers/equipmentController.js";

const router = express.Router()

router.get('/', equipmentController.getAllEquipments);

router.get('/:id', equipmentController.getEquipment);

router.post('/', equipmentController.createEquipment);

router.put('/:id', equipmentController.updateEquipment);

router.delete('/:id', equipmentController.deleteEquipment)

export default router