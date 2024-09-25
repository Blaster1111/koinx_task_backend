import express from 'express';
import multer from 'multer';
import { uploadCSV, calculateBalance } from '../controllers/tradeController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), uploadCSV);
router.post('/balance', calculateBalance);

export default router;
