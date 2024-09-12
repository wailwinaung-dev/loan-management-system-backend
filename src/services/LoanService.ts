import { ILoanRepository } from '../repositories/ILoanRepository';
import { ILoan } from '../models/Loan';
import { CreateLoanDto } from '../dto/CreateLoanDto';
import { differenceInMonths } from 'date-fns';
import { LoanCalculator } from '../utils/loanCalculator';

export class LoanService {
  constructor(
    private loanRepository: ILoanRepository
  ) { }

  async createLoan(data: CreateLoanDto): Promise<ILoan> {

    const months: number = differenceInMonths(data.endDate, data.startDate);
    // Instantiate the class
    const loanCalculator = new LoanCalculator(data.loanAmount, data.interestRate, months, data.paymentTerm);
    // Call methods
    const totalInterest = loanCalculator.calculateTotalInterest();
    data.remainingBalance = Math.round(totalInterest + data.loanAmount);

    return await this.loanRepository.create(data);
  }

  async getLoans(): Promise<ILoan[]> {
    return await this.loanRepository.findAll();
  }

  async getLoanById(id: string): Promise<any> {

    const loan = await this.loanRepository.findById(id);
    if (loan) {
      const months: number = differenceInMonths(loan.endDate, loan.startDate);
      // Instantiate the class
      const loanCalculator = new LoanCalculator(loan.loanAmount, loan.interestRate, months, loan.paymentTerm);
      const repaymentSchedule = loanCalculator.generateRepaymentSchedule(loan.startDate)
      return {loan, repaymentSchedule};
    }

    return loan;
  }

  async updateLoan(id: string, data: CreateLoanDto): Promise<ILoan | null> {
    return await this.loanRepository.update(id, data);
  }

  async deleteLoan(id: string) {
    return await this.loanRepository.delete(id);
  }
}
