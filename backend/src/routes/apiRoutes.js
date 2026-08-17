import express from 'express';
import * as shipmentController from '../controllers/shipmentController.js';

const router = express.Router();


router.post('/vessels', shipmentController.createVessel);
router.post('/voyages', shipmentController.createVoyage);
//routes.post('/voyages/:voyage_id/containers', shipmentController.addContainer);

export default router;