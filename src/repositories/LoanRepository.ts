import { ILoanRepository } from './ILoanRepository';
import { Loan, ILoan } from '../models/Loan';
import { CreateLoanDto } from '../dto/CreateLoanDto';

export class LoanRepository implements ILoanRepository {
  async create(data: CreateLoanDto): Promise<ILoan> {
    const loan = new Loan(data);
    return await loan.save();
  }

  async findAll(): Promise<ILoan[]> {
    return await Loan.find().select('-__v').populate('borrower');
  }

  async findById(id: string): Promise<ILoan | null> {
    return await Loan.findById(id).populate('borrower');
  }

  async update(id: string, data: Partial<CreateLoanDto>): Promise<ILoan | null> {
    
    const updatedLoan = await Loan.findByIdAndUpdate(id, { $set: data }, { new: true});

    if (!updatedLoan) {
      throw new Error('Loan not found');
    }

    return updatedLoan;
  }

  async delete(id: string): Promise<void> {
    await Loan.findByIdAndDelete(id);
  }

  async countByBorrowerId(borrowerId: string): Promise<number> {
    return Loan.countDocuments({ borrower: borrowerId });
  }
}
