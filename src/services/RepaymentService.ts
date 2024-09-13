import { IRepaymentRepository } from '../repositories/IRepaymentRepository';
import { IRepayment } from '../models/Repayment';
import { CreateRepaymentDto } from '../dto/CreateRepaymentDto';
import { ILoanRepository } from '../repositories/ILoanRepository';
import { LoanCalculator } from '../utils/loanCalculator';
import { CreateLoanDto } from '../dto/CreateLoanDto';

export class RepaymentService {
  constructor(
    private repaymentRepository: IRepaymentRepository,
    private loanRepository: ILoanRepository
  ) { }

  async createRepayment(data: CreateRepaymentDto): Promise<IRepayment> {

    const loan = await this.loanRepository.findById(data.loan.toString());
    if (!loan) {
      throw new Error('Loan not found');
    }

    if (loan._id) {

      const principal = LoanCalculator.calculatePrincipal(loan.remainingBalance, data.amountPaid, loan.interestRate, loan.paymentTerm)
      const remainingBalance = loan.remainingBalance - principal;
      const updatedData: Partial<CreateLoanDto> = { remainingBalance: remainingBalance };
      await this.loanRepository.update(loan._id.toString(), updatedData)
    }

    return await this.repaymentRepository.create(data);
  }

  async getRepayments(): Promise<IRepayment[]> {
    return await this.repaymentRepository.findAll();
  }

  async getRepaymentById(id: string): Promise<IRepayment | null> {
    return await this.repaymentRepository.findById(id);
  }

  async updateRepayment(id: string, data: CreateRepaymentDto): Promise<IRepayment | null> {
    return await this.repaymentRepository.update(id, data);
  }

  async deleteRepayment(id: string) {
    return await this.repaymentRepository.delete(id);
  }
}
