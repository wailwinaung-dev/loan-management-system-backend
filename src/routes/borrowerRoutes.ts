import express from 'express';
import {
  createBorrower,
  getBorrowers,
  getBorrowerById,
  updateBorrower,
  deleteBorrower,
} from '../controllers/borrowerController';

const router = express.Router();

router.post('/', createBorrower);           // Create a new borrower
router.get('/', getBorrowers);              // Get all borrowers
router.get('/:id', getBorrowerById);       // Get borrower by ID
router.patch('/:id', updateBorrower);        // Update borrower by ID
router.delete('/:id', deleteBorrower);     // Delete borrower by ID

export default router;
