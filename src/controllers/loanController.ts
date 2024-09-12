import { Request, Response } from 'express';
import { LoanService } from '../services/LoanService';
import { LoanRepository } from '../repositories/LoanRepository';
import mongoose from 'mongoose';

const loanRepository = new LoanRepository();
const loanService = new LoanService(loanRepository);

export const createLoan = async (req: Request, res: Response) => {
  try {
    let { borrowerId, ...destructData} = req.body;
    let updatedData = {
        ...destructData,
        borrower: new mongoose.Types.ObjectId(borrowerId),
    }

    const loan = await loanService.createLoan(updatedData);
    res.status(201).json(loan);
  } catch (error) {

    if (error instanceof Error) {
      const errors = Object.values((error as any).errors).reduce((acc: any, err: any) => {
        acc[err.path] = err.message;
        return acc;
      }, {});

      return res.status(400).json({
        message: 'Validation Error',
        errors
      });

    }
    res.status(500).json({ message: error });
  }
};

export const getLoans = async (req: Request, res: Response) => {
  try {
    const loans = await loanService.getLoans();
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loans' });
  }
};

export const getLoanById = async (req: Request, res: Response) => {
  try {
    const loan = await loanService.getLoanById(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: 'loan not found' });
    }
    res.status(200).json(loan);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loan' });
  }
};

export const updateLoan = async (req: Request, res: Response) => {
  try {
    const loan = await loanService.updateLoan(req.params.id, req.body);
    if (!loan) {
      return res.status(404).json({ message: 'loan not found' });
    }
    res.status(200).json(loan);
  } catch (error) {

    if (error instanceof Error) {
      const errors = Object.values((error as any).errors).reduce((acc: any, err: any) => {
        acc[err.path] = err.message;
        return acc;
      }, {});

      return res.status(400).json({
        message: 'Validation Error',
        errors
      });

    }
    res.status(500).json({ message: 'Error updating loan' });
    // res.status(500).json({ message: error });
  }
};

export const deleteLoan = async (req: Request, res: Response) => {
  try {
    await loanService.deleteLoan(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting loan' });
  }
};