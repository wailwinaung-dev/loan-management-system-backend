import express from 'express';
import {
  createBorrower,
  getBorrowers,
  getBorrowerById,
  updateBorrower,
  deleteBorrower,
} from '../controllers/borrowerController';

const router = express.Router();

router.post('/borrowers', createBorrower);           // Create a new borrower
router.get('/borrowers', getBorrowers);              // Get all borrowers
router.get('/borrowers/:id', getBorrowerById);       // Get borrower by ID
router.patch('/borrowers/:id', updateBorrower);        // Update borrower by ID
router.delete('/borrowers/:id', deleteBorrower);     // Delete borrower by ID

export default router;
