import express from 'express'
import * as reservationController from "../controllers/reservationController.js";
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router()
router.use(requireAuth);

router.get('/', reservationController.getAllReservations);

router.get('/:id', reservationController.getReservation);

router.post('/', reservationController.createReservation);

router.put('/:id', reservationController.updateReservation);

router.delete('/:id', reservationController.deleteReservation)

export default router


