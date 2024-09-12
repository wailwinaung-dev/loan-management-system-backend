import express from 'express';
import {
  createLoan,
  getLoans,
  getLoanById,
  updateLoan,
  deleteLoan,
} from '../controllers/loanController';

const router = express.Router();

router.post('/', createLoan);           // Create a new Loan
router.get('/', getLoans);              // Get all Loans
router.get('/:id', getLoanById);       // Get Loan by ID
router.patch('/:id', updateLoan);        // Update Loan by ID
router.delete('/:id', deleteLoan);     // Delete Loan by ID

export default router;
