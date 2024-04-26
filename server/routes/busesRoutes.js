// routes/busesRoutes.js

import express from 'express';
import { createBus, getBuses, getBusById, updateBus, deleteBus } from '../controller/busesController.js';

const router = express.Router();

router.post('/', createBus);
router.get('/', getBuses);
router.get('/:id', getBusById);
router.put('/:id', updateBus);
router.delete('/:id', deleteBus);

export default router;