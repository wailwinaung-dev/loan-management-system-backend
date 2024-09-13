import { IRepaymentRepository } from './IRepaymentRepository';
import { Repayment, IRepayment } from '../models/Repayment';
import { CreateRepaymentDto } from '../dto/CreateRepaymentDto';

export class RepaymentRepository implements IRepaymentRepository {
  async create(data: CreateRepaymentDto): Promise<IRepayment> {
    const loan = new Repayment(data);
    return await loan.save();
  }

  async findAll(): Promise<IRepayment[]> {
    return await Repayment.find().select('-__v').populate('loan');
  }

  async findById(id: string): Promise<IRepayment | null> {
    return await Repayment.findById(id).populate('loan');
  }

  async update(id: string, data: CreateRepaymentDto): Promise<IRepayment | null> {
    return await Repayment.findByIdAndUpdate(id, data, { new: true, runValidators: true, context: 'query' });
  }

  async delete(id: string): Promise<void> {
    await Repayment.findByIdAndDelete(id);
  }
}
