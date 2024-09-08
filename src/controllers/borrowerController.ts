import { Request, Response } from 'express';
import { BorrowerService } from '../services/BorrowerService';
import { BorrowerRepository } from '../repositories/BorrowerRepository';

const borrowerRepository = new BorrowerRepository();
const borrowerService = new BorrowerService(borrowerRepository);

export const createBorrower = async (req: Request, res: Response) => {
  try {
    const borrower = await borrowerService.createBorrower(req.body);
    res.status(201).json(borrower);
  } catch (error) {
    res.status(500).json({ message: 'Error creating borrower' });
  }
};

export const getBorrowers = async (req: Request, res: Response) => {
  try {
    const borrowers = await borrowerService.getBorrowers();
    res.status(200).json(borrowers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching borrowers' });
  }
};

export const getBorrowerById = async (req: Request, res: Response) => {
  try {
    const borrower = await borrowerService.getBorrowerById(req.params.id);
    if (!borrower) {
      return res.status(404).json({ message: 'Borrower not found' });
    }
    res.status(200).json(borrower);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching borrower' });
  }
};

export const updateBorrower = async (req: Request, res: Response) => {
  try {
    const borrower = await borrowerService.updateBorrower(req.params.id, req.body);
    if (!borrower) {
      return res.status(404).json({ message: 'Borrower not found' });
    }
    res.status(200).json(borrower);
  } catch (error) {
    res.status(500).json({ message: 'Error updating borrower' });
  }
};

export const deleteBorrower = async (req: Request, res: Response) => {
  try {
    await borrowerService.deleteBorrower(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting borrower' });
  }
};