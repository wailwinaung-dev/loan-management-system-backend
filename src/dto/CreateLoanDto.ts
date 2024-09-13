import { Schema } from "mongoose";

export interface CreateLoanDto {
    borrower: Schema.Types.ObjectId;  // ID of the borrower
    loanAmount: number;  // Loan amount
    loanType: 'Personal' | 'Mortgage';  // Loan type (enum)
    startDate: Date;  // Start date of the loan
    endDate: Date;  // End date of the loan
    interestRate: number;  // Interest rate
    paymentTerm: 'monthly' | 'quarterly' | 'yearly';
    remainingBalance: number
}
