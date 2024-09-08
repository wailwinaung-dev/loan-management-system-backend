import { IBorrowerRepository } from '../repositories/IBorrowerRepository';
import { IBorrower } from '../models/Borrower';
import { CreateBorrowerDTO } from '../dto/CreateBorrowerDto';

export class BorrowerService {
  constructor(
   private borrowerRepository: IBorrowerRepository
  ) {}

  async createBorrower(data: CreateBorrowerDTO): Promise<IBorrower> {
    return await this.borrowerRepository.create(data);
  }

  async getBorrowers(): Promise<IBorrower[]> {
    return await this.borrowerRepository.findAll();
  }

  async getBorrowerById(id: string): Promise<IBorrower | null> {
    return await this.borrowerRepository.findById(id);
  }

  async updateBorrower(id: string, data: CreateBorrowerDTO): Promise<IBorrower | null> {
    return await this.borrowerRepository.update(id, data);
  }

  async deleteBorrower(id: string) {
    return await this.borrowerRepository.delete(id);
  }
}
