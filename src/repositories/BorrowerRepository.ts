import { IBorrowerRepository } from './IBorrowerRepository';
import { Borrower, IBorrower } from '../models/Borrower';
import { CreateBorrowerDTO } from '../dto/CreateBorrowerDto';

export class BorrowerRepository implements IBorrowerRepository {
  async create(data: CreateBorrowerDTO): Promise<IBorrower> {
    const borrower = new Borrower(data);
    return await borrower.save();
  }

  async findAll(): Promise<IBorrower[]> {
    return await Borrower.find().select('-__v');
  }

  async findById(id: string): Promise<IBorrower | null> {
    return await Borrower.findById(id);
  }

  async update(id: string, data: CreateBorrowerDTO): Promise<IBorrower | null> {
    return await Borrower.findByIdAndUpdate(id, data, { new: true, runValidators: true, context: 'query' });
  }

  async delete(id: string): Promise<void> {
    await Borrower.findByIdAndDelete(id);
  }
}
