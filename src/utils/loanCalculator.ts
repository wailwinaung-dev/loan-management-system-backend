import { addMonths } from 'date-fns';

export class LoanCalculator {
  private principal: number;
  private annualRate: number;
  private months: number;
  private paymentTerm: 'monthly' | 'quarterly' | 'yearly';

  constructor(principal: number, annualRate: number, months: number, paymentTerm: 'monthly' | 'quarterly' | 'yearly') {
    this.principal = principal;
    this.annualRate = annualRate;
    this.months = months; // Total duration in months
    this.paymentTerm = paymentTerm;
  }

  // Calculate the payment based on the term (monthly, quarterly, or yearly)
  calculatePayment(): number {
    const rateFactor = this.getRateFactor(); // Calculate based on payment term
    const totalPeriods = Math.ceil(this.months / (12 / rateFactor)); // Calculate total periods
    const adjustedRate = this.annualRate / rateFactor / 100;

    return (this.principal * adjustedRate) / (1 - Math.pow(1 + adjustedRate, -totalPeriods));
  }

  // Calculate the total interest over the term
  calculateTotalInterest(): number {
    const payment = this.calculatePayment();
    const totalPeriods = Math.ceil(this.months / (12 / this.getRateFactor()));
    return (payment * totalPeriods) - this.principal;
  }

  // Generate repayment schedule based on the payment term
  generateRepaymentSchedule(startDate: Date) {
    const schedule: Array<{
      paymentNumber: number;
      paymentDate: Date;
      paymentAmount: number;
      interestPayment: number;
      principalPayment: number;
      remainingBalance: number;
    }> = [];

    const payment = this.calculatePayment();
    let balance = this.principal;
    const rateFactor = this.getRateFactor();
    const totalPeriods = Math.ceil(this.months / (12 / rateFactor));
    const adjustedRate = this.annualRate / rateFactor / 100;

    for (let i = 0; i < totalPeriods; i++) {
      const interestPayment = balance * adjustedRate;
      const principalPayment = payment - interestPayment;
      balance -= principalPayment;

      // Adjust the payment date according to the payment term
      let paymentDate: Date;
      switch (this.paymentTerm) {
        case 'monthly':
          paymentDate = addMonths(startDate, i);
          break;
        case 'quarterly':
          paymentDate = addMonths(startDate, i * 3);
          break;
        case 'yearly':
          paymentDate = addMonths(startDate, i * 12);
          break;
        default:
          throw new Error('Invalid payment term');
      }

      schedule.push({
        paymentNumber: i + 1,
        paymentDate: paymentDate,
        paymentAmount: payment,
        interestPayment: interestPayment,
        principalPayment: principalPayment,
        remainingBalance: balance,
      });
    }

    return schedule;
  }

  // Helper method to determine the rate factor based on the payment term
  private getRateFactor(): number {
    switch (this.paymentTerm) {
      case 'monthly':
        return 12;
      case 'quarterly':
        return 4;
      case 'yearly':
        return 1;
      default:
        throw new Error('Invalid payment term');
    }
  }
}

// Usage example:
// const principal = 10000; // Loan amount
// const annualRate = 5; // 5% annual interest
// const months = 24; // Loan duration in months
// const paymentTerm = 'monthly'; // Payment term (monthly, quarterly, or yearly)
// const startDate = new Date('2024-01-01'); // Start date of the loan

// const loanCalculator = new LoanCalculator(principal, annualRate, months, paymentTerm);

// const payment = loanCalculator.calculatePayment();
// const totalInterest = loanCalculator.calculateTotalInterest();
// const repaymentSchedule = loanCalculator.generateRepaymentSchedule(startDate);

// console.log(`Payment per period: $${payment.toFixed(2)}`);
// console.log(`Total Interest Paid: $${totalInterest.toFixed(2)}`);
// console.table(repaymentSchedule);
