import { Request, Response } from 'express';
import { RepaymentService } from '../services/RepaymentService';
import { RepaymentRepository } from '../repositories/RepaymentRepository';
import mongoose from 'mongoose';
import { LoanRepository } from '../repositories/LoanRepository';

const loanRepository = new LoanRepository();
const repaymentRepository = new RepaymentRepository();
const repaymentService = new RepaymentService(repaymentRepository, loanRepository);

export const createRepayment = async (req: Request, res: Response) => {
  try {
    let { loanId, ...destructData} = req.body;
    let updatedData = {
        ...destructData,
        loan: new mongoose.Types.ObjectId(loanId),
    }

    const repayment = await repaymentService.createRepayment(updatedData);
    res.status(201).json(repayment);
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

export const getRepayments = async (req: Request, res: Response) => {
  try {
    const repayments = await repaymentService.getRepayments();
    res.status(200).json(repayments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching repayments' });
  }
};

export const getRepaymentById = async (req: Request, res: Response) => {
  try {
    const repayment = await repaymentService.getRepaymentById(req.params.id);
    if (!repayment) {
      return res.status(404).json({ message: 'repayment not found' });
    }
    res.status(200).json(repayment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching repayment' });
  }
};

export const updateRepayment = async (req: Request, res: Response) => {
  try {
    const repayment = await repaymentService.updateRepayment(req.params.id, req.body);
    if (!repayment) {
      return res.status(404).json({ message: 'repayment not found' });
    }
    res.status(200).json(repayment);
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
    res.status(500).json({ message: 'Error updating repayment' });
    // res.status(500).json({ message: error });
  }
};

export const deleteRepayment = async (req: Request, res: Response) => {
  try {
    await repaymentService.deleteRepayment(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting repayment' });
  }
};