import express from 'express';
import {
  createRepayment,
  getRepayments,
  getRepaymentById,
  updateRepayment,
  deleteRepayment,
} from '../controllers/repaymentController';
import { LoanCalculator } from '../utils/loanCalculator';

const router = express.Router();

router.post('/', createRepayment);           // Create a new Repayment
router.get('/', getRepayments);              // Get all Repayments
router.get('/:id', getRepaymentById);       // Get Repayment by ID
router.patch('/:id', updateRepayment);        // Update Repayment by ID
router.delete('/:id', deleteRepayment);     // Delete Repayment by ID


export default router;
