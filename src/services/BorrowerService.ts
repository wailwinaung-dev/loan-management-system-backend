import { IBorrowerRepository } from '../repositories/IBorrowerRepository';
import { IBorrower } from '../models/Borrower';
import { CreateBorrowerDTO } from '../dto/CreateBorrowerDto';
import { ILoanRepository } from '../repositories/ILoanRepository';

export class BorrowerService {
  constructor(
   private borrowerRepository: IBorrowerRepository,
   private loanRepository: ILoanRepository
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
    // Check the count of loans associated with this borrower
    const loanCount = await this.loanRepository.countByBorrowerId(id);

    if (loanCount > 0) {
      // If there are associated loans, prevent deletion and throw an error
      throw new Error('Cannot delete borrower. The borrower is linked with existing loans.');
    }

    return await this.borrowerRepository.delete(id);
  }
}
